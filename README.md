# 🚀 AlgoMaster Pro - Portfolio Évolutif avec Supabase

Portfolio moderne et professionnel avec **persistance des données** via Supabase pour le cours d'Algorithmique et Complexité - Master Big Data Analytics UVCI.

## ✨ Fonctionnalités

### 🎨 Effets Visuels
- ✅ **Background 3D animé** avec Three.js (étoiles, grilles ondulantes, orbes flottantes)
- ✅ **Curseur personnalisé animé** avec traînée et effets de particules
- ✅ **Photo de profil** avec bordure animée
- ✅ **Effets de glassmorphism** avancés
- ✅ **Animations Framer Motion** ultra-fluides
- ✅ **Dégradés animés** et effets de lueur

### 💾 Persistance des Données avec Supabase
- ✅ **Base de données PostgreSQL** via Supabase
- ✅ **Leçons sauvegardées** et accessibles à tous les visiteurs
- ✅ **Profil dynamique** mis à jour en temps réel
- ✅ **Formulaire de contact** fonctionnel
- ✅ **Interface d'administration** protégée

## 📦 Technologies

- **Framework**: Next.js (React)
- **Base de données**: Supabase (PostgreSQL)
- **Langage**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **3D**: Three.js + React Three Fiber
- **Notifications**: React Hot Toast
- **Icônes**: Lucide React
- **Déploiement**: Vercel

## 🚀 Installation

### Prérequis
- Node.js 18+
- Compte Supabase (gratuit)
- Compte Vercel (gratuit, optionnel)

### Étape 1 : Installation des dépendances
```bash
npm install
```

### Étape 2 : Configuration Supabase
1. Créez un projet sur [supabase.com](https://supabase.com)
2. Dans **SQL Editor**, exécutez le contenu de `supabase-schema.sql`
3. Dans **Settings > API**, récupérez votre `Project URL` et `anon key`
4. Créez un fichier `.env.local` :
```env
NEXT_PUBLIC_SUPABASE_URL=votre_url_ici
NEXT_PUBLIC_SUPABASE_ANON_KEY=votre_cle_ici
```

### Étape 3 : Lancer le projet
```bash
npm run dev
```

Ouvrez http://localhost:3000 🎉

## 📱 Structure du Projet

```
algomasterm1/
├── app/
│   ├── page.tsx                # Page d'accueil
│   ├── layout.tsx              # Layout global
│   ├── globals.css             # Styles globaux
│   ├── about/page.tsx          # Page À propos
│   ├── contact/page.tsx        # Page Contact
│   ├── lessons/
│   │   ├── page.tsx            # Redirection leçons
│   │   └── [slug]/page.tsx     # Page détaillée de leçon
│   ├── admin/
│   │   ├── login/page.tsx      # Connexion admin
│   │   └── dashboard/page.tsx  # Dashboard admin
│   └── api/contact/route.ts    # API contact
│
├── components/
│   ├── ModernBackground.tsx    # Background 3D Three.js
│   ├── CustomCursor.tsx        # Curseur animé
│   ├── ProfilePhoto.tsx        # Photo avec bordure animée
│   ├── LessonTimeline.tsx      # Timeline des leçons
│   ├── LessonModal.tsx         # Modal d'ajout/édition de leçon
│   ├── MarkdownRenderer.tsx    # Rendu Markdown avec syntax highlighting
│   └── Footer.tsx              # Pied de page
│
├── lib/
│   ├── supabase.ts            # Client Supabase et fonctions
│   ├── supabase-auth.ts       # Authentification Supabase
│   └── transformers.ts        # Transformateurs de données
│
├── public/images/              # Images (photo de profil, etc.)
├── supabase-schema.sql         # Script SQL pour les tables
├── package.json
├── tsconfig.json
└── README.md
```

## 🌐 Déploiement sur Vercel

1. Push sur GitHub
2. Importez sur [vercel.com](https://vercel.com)
3. Ajoutez les variables d'environnement
4. Cliquez sur **Deploy**

---

**Fait avec ❤️ pour le Master Big Data Analytics UVCI**
*Cours : Algorithmique et Complexité*
