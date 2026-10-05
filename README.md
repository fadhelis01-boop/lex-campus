# LexCampus — remise à niveau en droit privé et droit des affaires

Application web installable (PWA) qui fonctionne sur PC, Mac, tablette, iPhone et Android, en ligne et hors connexion.

## Ce qu'elle contient

- **20 domaines**, du droit des contrats au droit public, plus un module complet de **comptabilité, analyse financière et fiscalité appliquée** : 111 leçons rédigées, 3 niveaux (fondamentaux, approfondissement, expert). Un domaine ajouté plus tard peut voir ses leçons rédigées à la demande par l'assistant IA.
- **Cours écrits et audio** : lecture à voix haute paragraphe par paragraphe, surlignage, vitesse réglable, reprise exacte là où l'on s'est arrêté ou depuis le début ; reprise de la lecture écrite également.
- **Pédagogie active** : 449 questions de quiz, ateliers d'écritures comptables et exercices chiffrés corrigés automatiquement, plan comptable consultable, cartes de révision à répétition espacée, test de positionnement et examen blanc par domaine, exercices rédigés avec corrigés (cas pratiques, fiche d'arrêt guidée, commentaire, dissertation, note de synthèse en conditions réelles).
- **Méthodologie** complète : lire un arrêt en style direct, fiche d'arrêt, commentaire, cas pratique, dissertation, note de synthèse (méthode + trucs et astuces), recherche documentaire.
- **Jurisprudence** : 55 grands arrêts avec leur sort actuel (en vigueur, codifié, abandonné), jeu de « l'arrêt mystère », liens Judilibre automatiques.
- **« Ce qui a changé depuis 2006 »** : frise des réformes, et encadrés dans chaque leçon.
- **Assistant juridique** (Claude, clé personnelle) : réponses sourcées par recherche sur Légifrance, Cour de cassation, Conseil d'État, EUR-Lex, CJUE, AMF, Autorité de la concurrence…, correction des copies, veille jurisprudentielle, vérification de l'actualité d'une leçon, création de nouveaux domaines.
- **Ludique** : XP, grades (d'auditeur de justice à premier président), séries de jours, badges, objectif quotidien.
- **Données sur l'appareil**, export/import pour passer d'un appareil à l'autre ; clé d'API jamais exportée.

## Démarrer en local

```bash
npm install
npm run dev
```

Puis ouvrir http://localhost:5190.

## Construire la version de production

```bash
npm run build
```

Le dossier `dist/` contient l'application complète (fichiers statiques), publiable sur n'importe quel hébergement HTTPS. L'HTTPS est indispensable pour l'installation sur iPhone et le mode hors connexion.

## Publier (pour l'utiliser sur iPhone, tablette et PC)

Au choix :

- **GitHub Pages** (gratuit, en place) : `npm run deploy` construit l'application et la publie sur la branche `gh-pages` du dépôt ; GitHub Pages la sert à l'adresse https://fadhelis01-boop.github.io/lex-campus/.
- **Netlify** ou **Vercel** : importer le dépôt (commande de build `npm run build`, dossier `dist`), ou glisser-déposer le dossier `dist/` sur Netlify Drop.

Ensuite, sur l'iPhone : ouvrir l'adresse dans Safari → Partager → « Sur l'écran d'accueil ».

## Mettre à jour

- **Contenus** : modifier les sources (`content-src/*.mjs` et les leçons `.md` dans `public/content/packs/`), lancer `npm run content` (vérification + manifeste), incrémenter `version` du domaine modifié, publier. Les appareils détectent la nouvelle version et l'affichent.
- **Application** : chaque publication estampille le service worker ; les appareils proposent « Mettre à jour ».
- **Actualité juridique entre deux mises à jour** : Veille et « Vérifier l'actualité » (assistant).

Ajouter un domaine sans programmer : voir [docs/GUIDE-CONTENU.md](docs/GUIDE-CONTENU.md).

## Assistant IA

Créer une clé sur https://console.anthropic.com (API Keys), la saisir dans Réglages. Modèle par défaut : Claude Opus 5.5 (option Sonnet 5.5 / Haiku 4.5 moins coûteux). Coût indicatif affiché après chaque réponse. Fixer un plafond de dépense mensuel dans la console. La clé reste dans le navigateur de l'appareil et n'est transmise qu'à l'API d'Anthropic.

## Structure

```
content-src/          sources des domaines (métadonnées, quiz, arrêts…)
public/content/       contenus servis : manifest.json + packs/<domaine>/pack.json + leçons .md
public/sw.js          service worker (hors connexion, mises à jour)
scripts/              compilation des contenus, génération des icônes
src/lib/              stockage, contenus, audio, IA, révisions espacées
src/pages/            écrans
docs/                 guide du contenu
```

## Limites assumées

- Les cours sont **datés** (« à jour au … ») ; le droit évolue : la fiscalité (lois de finances), la compliance européenne (CSRD, CS3D, IA) et certains textes récents sont signalés « à vérifier ».
- L'assistant cherche sur les sources officielles et doit signaler ce qu'il n'a pas vérifié, mais une IA peut se tromper : vérifier toute référence avant un usage professionnel.
- Outil de formation, pas de consultation juridique.
- Sur iPhone, la lecture audio s'interrompt quand l'écran se verrouille (limite d'iOS).
- Pas de synchronisation automatique entre appareils (pas de serveur) : export / import de la progression.
