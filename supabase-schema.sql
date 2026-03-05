-- Script SQL à exécuter dans Supabase SQL Editor
-- Ce script crée toutes les tables nécessaires pour votre portfolio

-- 1. Table des leçons
DROP TABLE IF EXISTS lessons CASCADE;
CREATE TABLE IF NOT EXISTS lessons (
  id BIGSERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE,
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  week_number INTEGER,

  journal_reflexif TEXT NOT NULL DEFAULT '',
  synthese_personnelle TEXT NOT NULL DEFAULT '',
  application_pratique TEXT NOT NULL DEFAULT '',

  maitrise_bien TEXT NOT NULL DEFAULT '',
  a_ameliorer TEXT NOT NULL DEFAULT '',
  strategie_progression TEXT NOT NULL DEFAULT '',

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Table du profil
DROP TABLE IF EXISTS profile CASCADE;
CREATE TABLE IF NOT EXISTS profile (
  id INTEGER PRIMARY KEY DEFAULT 1,
  name TEXT NOT NULL,
  title TEXT NOT NULL,
  bio TEXT,
  email TEXT,
  github_url TEXT,
  linkedin_url TEXT,
  photo_url TEXT,
  total_lessons INTEGER DEFAULT 12,
  completed_lessons INTEGER DEFAULT 0,
  in_progress_lessons INTEGER DEFAULT 0,
  average_mastery NUMERIC(3,1) DEFAULT 0,
  study_hours INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  CONSTRAINT single_profile CHECK (id = 1)
);

-- 3. Table du bilan final
CREATE TABLE IF NOT EXISTS final_assessment (
  id INTEGER PRIMARY KEY DEFAULT 1,
  appris_plus TEXT NOT NULL DEFAULT '',
  competences_reutilisables TEXT NOT NULL DEFAULT '',
  plus_grand_defi TEXT NOT NULL DEFAULT '',
  prochaines_etapes TEXT NOT NULL DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  CONSTRAINT single_assessment CHECK (id = 1)
);

-- 4. Table des contacts
CREATE TABLE IF NOT EXISTS contacts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'unread' CHECK (status IN ('unread', 'read', 'replied')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Fonction pour mettre à jour automatiquement updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 6. Triggers pour updated_at
DROP TRIGGER IF EXISTS update_lessons_updated_at ON lessons;
CREATE TRIGGER update_lessons_updated_at
  BEFORE UPDATE ON lessons
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_profile_updated_at ON profile;
CREATE TRIGGER update_profile_updated_at
  BEFORE UPDATE ON profile
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_contacts_updated_at ON contacts;
CREATE TRIGGER update_contacts_updated_at
  BEFORE UPDATE ON contacts
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- 7. Fonction pour générer automatiquement le slug
CREATE OR REPLACE FUNCTION generate_slug(title TEXT)
RETURNS TEXT AS $$
DECLARE
  slug TEXT;
BEGIN
  slug := LOWER(title);
  slug := TRANSLATE(slug,
    'àáâãäåāăąèéêëēĕėęěìíîïĩīĭįòóôõöøōŏőùúûüũūŭůçćĉċčñńņňÿýŷ',
    'aaaaaaaaaeeeeeeeeeiiiiiiiiooooooooouuuuuuuucccccnnnnyyyy'
  );
  slug := REGEXP_REPLACE(slug, '[^a-z0-9]+', '-', 'g');
  slug := TRIM(BOTH '-' FROM slug);
  RETURN slug;
END;
$$ LANGUAGE plpgsql IMMUTABLE;

-- 8. Trigger pour générer automatiquement le slug
CREATE OR REPLACE FUNCTION set_lesson_slug()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.slug IS NULL OR (TG_OP = 'UPDATE' AND NEW.title != OLD.title) THEN
    NEW.slug := generate_slug(NEW.title);
    WHILE EXISTS (SELECT 1 FROM lessons WHERE slug = NEW.slug AND id != NEW.id) LOOP
      NEW.slug := generate_slug(NEW.title) || '-' || SUBSTRING(NEW.id::TEXT FROM 1 FOR 8);
    END LOOP;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_set_lesson_slug ON lessons;
CREATE TRIGGER trigger_set_lesson_slug
  BEFORE INSERT OR UPDATE ON lessons
  FOR EACH ROW
  EXECUTE FUNCTION set_lesson_slug();

-- 9. Activer Row Level Security (RLS)
ALTER TABLE lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE profile ENABLE ROW LEVEL SECURITY;
ALTER TABLE final_assessment ENABLE ROW LEVEL SECURITY;

-- 10. Politiques RLS - Lecture publique
CREATE POLICY "Enable read access for all users" ON lessons
  FOR SELECT USING (true);

CREATE POLICY "Enable read access for all users" ON profile
  FOR SELECT USING (true);

CREATE POLICY "Enable read access for all users" ON final_assessment
  FOR SELECT USING (true);

-- 11. Politiques RLS - Écriture
CREATE POLICY "Enable insert for all users" ON lessons
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Enable update for all users" ON lessons
  FOR UPDATE USING (true);

CREATE POLICY "Enable delete for all users" ON lessons
  FOR DELETE USING (true);

CREATE POLICY "Enable insert for all users" ON profile
  FOR INSERT WITH CHECK (id = 1);

CREATE POLICY "Enable update for all users" ON profile
  FOR UPDATE USING (id = 1);

-- Contacts: tout le monde peut insérer, seuls les auth peuvent lire/modifier
ALTER TABLE contacts DISABLE ROW LEVEL SECURITY;

-- 12. Index pour les performances
CREATE INDEX IF NOT EXISTS idx_lessons_week_number ON lessons(week_number);
CREATE INDEX IF NOT EXISTS idx_lessons_slug ON lessons(slug);
CREATE INDEX IF NOT EXISTS idx_lessons_created_at ON lessons(created_at);
CREATE INDEX IF NOT EXISTS idx_contacts_email ON contacts(email);
CREATE INDEX IF NOT EXISTS idx_contacts_status ON contacts(status);
CREATE INDEX IF NOT EXISTS idx_contacts_created_at ON contacts(created_at DESC);

-- 13. Insertion des données initiales du profil
INSERT INTO profile (
  id, name, title, bio, email, github_url, linkedin_url, photo_url,
  total_lessons, completed_lessons, in_progress_lessons, average_mastery, study_hours
) VALUES (
  1,
  'El adj Souleymane Nuhu',
  'Étudiant Master 1 Big Data Analytics',
  'Passionné par l''algorithmique, la data science et le développement full-stack. Je documente mon parcours d''apprentissage à travers ce portfolio évolutif pour mieux comprendre et maîtriser les concepts fondamentaux de l''informatique.',
  'contact@example.com',
  'https://github.com/elsouleymane',
  '',
  '/images/profile.jpg',
  12, 0, 0, 0, 0
) ON CONFLICT (id) DO NOTHING;

-- 14. Insertion du bilan final vide
INSERT INTO final_assessment (id, appris_plus, competences_reutilisables, plus_grand_defi, prochaines_etapes)
VALUES (1, '', '', '', '')
ON CONFLICT (id) DO NOTHING;

-- 15. Insertion d'une leçon exemple
INSERT INTO lessons (
  title, date, week_number,
  journal_reflexif, synthese_personnelle, application_pratique,
  maitrise_bien, a_ameliorer, strategie_progression
) VALUES (
  'Introduction à la Complexité Algorithmique',
  '2025-01-15',
  1,
  'Cette semaine, j''ai découvert le concept fondamental de la complexité algorithmique et la notation Big O. Au début, j''ai eu du mal à comprendre pourquoi on ignore les constantes dans l''analyse asymptotique. Après plusieurs exercices pratiques, j''ai réalisé que l''important est de comprendre comment le temps d''exécution croît avec la taille des données.',
  'La complexité algorithmique mesure l''efficacité d''un algorithme en termes de temps et d''espace. La notation Big O (O) décrit le pire cas, Omega (Ω) le meilleur cas, et Theta (Θ) le cas moyen. Les complexités courantes sont :
  - O(1) : Constant
  - O(log n) : Logarithmique
  - O(n) : Linéaire
  - O(n²) : Quadratique
  - O(2^n) : Exponentielle',
  'J''ai appliqué ces concepts à la recherche d''étudiants dans une base de données. En passant d''une recherche linéaire à une recherche dichotomique, j''ai amélioré les performances de manière significative.',
  'Identifier les complexités simples (O(1), O(n), O(n²)) et comprendre quand utiliser une recherche dichotomique vs linéaire.',
  'Analyser les algorithmes récursifs et calculer la complexité spatiale.',
  'Résoudre 2 problèmes algorithmiques par jour sur LeetCode et utiliser VisuAlgo.net pour visualiser les algorithmes.'
) ON CONFLICT DO NOTHING;

-- Fin du script
