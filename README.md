# Portfolio Évolutif – Algorithmique et Complexité (M1)

Portfolio réflexif pour le cours d'Algorithmique et Complexité du Master 1.

## Structure du site

| Fichier | Contenu |
|---|---|
| `index.html` | Portail de navigation vers toutes les leçons |
| `lecon1.html` | Leçon 1 – Introduction à l'Algorithmique |
| `lecon2.html` | Leçon 2 – Notation Asymptotique (O, Ω, Θ) |
| `lecon3.html` | Leçon 3 – Algorithmes de Tri |
| `lecon4.html` | Leçon 4 – Diviser pour Régner |
| `lecon5.html` | Leçon 5 – Structures de Données Avancées |
| `lecon6.html` | Leçon 6 – Graphes et leurs Algorithmes |
| `lecon7.html` | Leçon 7 – Programmation Dynamique |
| `lecon8.html` | Leçon 8 – Algorithmes Gloutons |
| `bilan.html` | 🔎 Bilan Final du Semestre |
| `style.css` | Feuille de styles partagée |
| `portfolio.js` | Logique de sauvegarde locale (localStorage) |

## Comment utiliser le portfolio

1. **Ouvrir localement** : double-cliquez sur `index.html` dans votre navigateur.
2. **Naviguer** : cliquez sur la carte d'une leçon pour l'ouvrir.
3. **Éditer** : cliquez dans n'importe quelle zone de texte pour la modifier directement.
4. **Sauvegarder** : cliquez sur le bouton **💾 Enregistrer** — les notes sont stockées dans `localStorage` de votre navigateur et persistent entre les sessions.

> **Note** : les données sont stockées dans votre navigateur local. Pour sauvegarder définitivement vos modifications, utilisez `git commit` sur la branche de la leçon concernée.

## Workflow : une branche par leçon

Ce portfolio utilise une **branche Git par leçon** pour permettre un suivi incrémental des apprentissages.

### Branches prévues

```
main                    ← version de référence (portail + template)
feature/lecon-1         ← journal + notes de la Leçon 1
feature/lecon-2         ← journal + notes de la Leçon 2
feature/lecon-3         ← journal + notes de la Leçon 3
feature/lecon-4         ← journal + notes de la Leçon 4
feature/lecon-5         ← journal + notes de la Leçon 5
feature/lecon-6         ← journal + notes de la Leçon 6
feature/lecon-7         ← journal + notes de la Leçon 7
feature/lecon-8         ← journal + notes de la Leçon 8
```

### Ajouter le contenu d'une leçon (exemple Leçon 1)

```bash
# 1. Partir de main à jour
git checkout main
git pull origin main

# 2. Créer la branche de la leçon
git checkout -b feature/lecon-1

# 3. Éditer lecon1.html avec le contenu réel de la leçon
#    (remplacer le contenu simulé par votre vrai journal d'apprentissage)

# 4. Committer et pousser
git add lecon1.html
git commit -m "Leçon 1 : journal et synthèse complétés"
git push origin feature/lecon-1

# 5. Ouvrir une Pull Request sur GitHub pour la revue
```

### Fusionner progressivement

Chaque leçon est une PR indépendante. Fusionnez dans `main` au fil du semestre.

## Hébergement

Ce portfolio peut être hébergé sur n'importe quel serveur statique :
- **GitHub Pages** : activer dans Settings → Pages → branche `main` → dossier `/`
- **Localement** : `python3 -m http.server 8080` puis ouvrir `http://localhost:8080`

## Chaque page de leçon contient

1. **Journal d'apprentissage réflexif** (5-10 lignes) : ce que vous avez appris, vos réussites, difficultés et ressentis.
2. **Synthèse personnelle des concepts clés** : résumé avec vos propres mots des notions principales.
3. **Application pratique dans mon contexte** : comment appliquer ces concepts à un problème réel.
4. **Auto-évaluation et méta-cognition** : ce que vous maîtrisez, ce que vous devez améliorer, votre stratégie pour progresser.
