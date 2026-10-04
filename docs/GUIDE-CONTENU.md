# Guide du contenu — ajouter ou mettre à jour un domaine sans programmer

Un **domaine** (droit des contrats, droit public, droit de la santé…) est un **pack** : un fichier JSON qui décrit le programme, les leçons, les quiz, les cartes de révision, les exercices, les grands arrêts, le lexique et les réformes. L'application n'a besoin d'aucune modification de code pour afficher un nouveau pack.

## Trois façons d'ajouter un domaine

| Méthode | Pour qui | Portée |
|---|---|---|
| **Contenus → Créer avec l'assistant** | Vous, dans l'application | Programme complet généré par l'IA ; leçons rédigées à la demande. Stocké sur l'appareil (exportable). |
| **Contenus → Importer un fichier** | Vous, avec un fichier `.json` (modèle téléchargeable dans l'app) | Stocké sur l'appareil ; réimporter une version supérieure le met à jour. |
| **Déposer le pack dans le projet** | Pour le diffuser à tous vos appareils | Après publication de l'application (voir README). |

## Format d'un pack

```json
{
  "id": "droit-sante",
  "version": "2026.11.1",
  "title": "Droit de la santé",
  "branch": "Droit public",
  "icon": "⚕️",
  "color": "#2c7a7b",
  "order": 40,
  "updatedAt": "2026-11-01",
  "description": "Une phrase de présentation.",
  "modules": [
    {
      "id": "m1",
      "title": "Les fondamentaux",
      "level": 1,
      "summary": "Ce que couvre le module.",
      "lessons": [
        {
          "id": "sante-1",
          "title": "Leçon rédigée",
          "duration": 15,
          "objectives": ["…"],
          "body": "Markdown de la leçon…",
          "keyRefs": ["Art. L. 1110-1 CSP"],
          "quiz": [
            { "type": "qcm", "q": "Question ?", "choices": ["A", "B", "C", "D"], "answer": 0, "explain": "Explication." },
            { "type": "vf", "q": "Affirmation.", "answer": true, "explain": "Explication." }
          ],
          "flashcards": [{ "q": "Question", "a": "Réponse" }]
        },
        {
          "id": "sante-2",
          "title": "Leçon rédigée à la demande par l'assistant",
          "objectives": ["…"],
          "outline": ["Point 1", "Point 2"]
        }
      ]
    }
  ],
  "decisions": [
    { "id": "arret-1", "name": "Nom", "court": "CE", "date": "1er janvier 2000", "number": "n° 000000", "topic": "Thème", "solution": "…", "scope": "…", "status": "en vigueur", "statusNote": "…" }
  ],
  "glossary": [{ "term": "Terme", "def": "Définition.", "latin": false }],
  "reforms": [{ "date": "2026-01-01", "title": "Réforme", "summary": "…" }],
  "changelog": [{ "date": "2026-11-01", "text": "Création du domaine." }]
}
```

### Règles
- `id` : minuscules, chiffres et tirets ; unique. Les `id` de leçons sont uniques dans le pack (ils servent à mémoriser la progression : **ne les changez pas** lors d'une mise à jour, sinon la progression de la leçon est perdue).
- `level` : 1 (fondamentaux), 2 (approfondissement), 3 (expert).
- `version` : augmentez-la à chaque mise à jour (ex. `2026.11.1` → `2026.12.1`) ; l'application signale les domaines mis à jour.
- `status` d'un arrêt : `en vigueur`, `codifié`, `infléchi`, `abandonné`.
- QCM : `answer` est l'index de la bonne réponse **à partir de 0** (les propositions sont mélangées à l'affichage).
- Une leçon sans `body` ni `src` est **rédigée à la demande** par l'assistant à partir de `outline` et `objectives`.

## Écrire une leçon (Markdown)

Titres `##` et `###`, listes, tableaux, gras… et des **blocs pédagogiques** :

```
:::article Art. 1104 C. civ.
Les contrats doivent être négociés, formés et exécutés de bonne foi.
:::

:::arret Cass. com., 22 oct. 1996, Chronopost, n° 93-18.632
Faits, question, solution, portée.
:::
```

Blocs disponibles : `article`, `arret`, `reforme`, `retenir`, `astuce`, `attention`, `exemple`, `definition`, `methode`, `debat`.

Les numéros de pourvoi au format `n° 93-18.632` deviennent automatiquement des liens vers Judilibre.

## Exercices

```json
{
  "id": "cas-1",
  "type": "cas-pratique",
  "title": "Titre",
  "timerMin": 60,
  "statement": "Énoncé en Markdown",
  "documents": [{ "title": "Doc 1", "text": "Markdown" }],
  "hints": ["Indice 1"],
  "rubric": ["Critère 1", "Critère 2"],
  "model": "Corrigé en Markdown"
}
```

Types : `cas-pratique`, `commentaire`, `note-synthese`, `fiche-arret` (avec `steps` : `[{ "label", "help", "model" }]`), `dissertation`, `redaction`.

## Diffuser un pack à tous vos appareils (dans le projet)

Deux possibilités :

1. **Pack JSON direct** : copiez `mon-pack.json` dans `public/content/packs/mon-pack/pack.json` et ajoutez une ligne dans `public/content/manifest.json` :
   `{ "id": "mon-pack", "file": "packs/mon-pack/pack.json", "version": "1.0.0", "title": "Mon pack" }`
2. **Source confortable** (recommandé pour rédiger beaucoup) : créez `content-src/mon-pack.mjs` (voir les exemples existants : chaînes multilignes, leçons longues dans des fichiers `.md` référencés par `src`), puis lancez `npm run content`, qui vérifie le pack (identifiants, réponses des QCM, fichiers manquants) et régénère le manifeste.

Publiez ensuite l'application (voir README) : tous les appareils reçoivent la mise à jour.
