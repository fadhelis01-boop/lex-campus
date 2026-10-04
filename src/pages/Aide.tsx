import Markdown from "../components/Markdown";

const HELP = `## Comment travailler avec LexCampus

1. **Commencez par le parcours conseillé** (onglet Parcours). Dans chaque domaine, le **test de positionnement** marque comme acquis les modules que vous maîtrisez déjà : vous ne refaites pas inutilement les fondamentaux.
2. **Une leçon = 15 à 25 minutes** : lecture ou écoute, puis quiz (70 % valident la leçon), puis ajout des cartes de révision.
3. **Chaque jour, 5 minutes de révisions** (onglet Réviser) : la répétition espacée fait revenir chaque notion au bon moment.
4. **Chaque semaine, un exercice rédigé** (Méthodologie) : fiche d'arrêt, cas pratique, commentaire, note de synthèse. Le corrigé est fourni ; l'assistant peut corriger votre copie.
5. **Une fois par mois, la veille** de vos domaines prioritaires.

## Lire ou écouter

- 🎧 **Écouter la leçon** lit le cours à voix haute, paragraphe par paragraphe, avec surlignage. Le lecteur reste en bas de l'écran pendant que vous naviguez.
- La position est mémorisée : **« Reprendre l'écoute »** repart au paragraphe où vous vous êtes arrêté ; **« Écouter depuis le début »** recommence.
- En lecture, la position est aussi mémorisée : à votre retour, la leçon propose **« Reprendre la lecture »** ou **« Recommencer depuis le début »**.
- Pendant l'écoute, touchez un paragraphe pour y sauter. La vitesse se règle d'un geste (×1, ×1,15…).
- Sur iPhone, laissez l'écran allumé : iOS interrompt la synthèse vocale au verrouillage.

## L'assistant juridique

- Il répond en s'appuyant sur une **recherche dans les sources officielles** (Légifrance, Cour de cassation, Conseil d'État, Conseil constitutionnel, EUR-Lex, CJUE, AMF, Autorité de la concurrence, CNIL, BOFiP…) et affiche ses sources.
- Il lui est interdit d'inventer une référence : s'il n'a pas pu vérifier un numéro de pourvoi, il l'indique « à vérifier ».
- Malgré ces garde-fous, **une IA peut se tromper**. Vérifiez toujours, sur la source, une référence que vous allez utiliser.
- Il nécessite une clé d'API Anthropic (Réglages). Coût indicatif : quelques centimes par question, 0,15 à 0,40 $ pour rédiger une leçon complète. Fixez un plafond de dépense dans la console Anthropic.

## Rester à jour

- Chaque cours indique sa date (« à jour au … »).
- **Vérifier l'actualité** (dans une leçon) : l'assistant contrôle que les textes et arrêts cités n'ont pas été modifiés depuis.
- **Veille** : nouveautés d'un domaine sur la période choisie, rapports conservés hors connexion.
- **Mises à jour** : l'application et les contenus se mettent à jour automatiquement quand une nouvelle version est publiée ; un bandeau vous le signale.

## Installer sur vos appareils

- **iPhone / iPad** : ouvrez l'adresse dans Safari → bouton Partager ⬆️ → « Sur l'écran d'accueil ».
- **Android** : Chrome → menu ⋮ → « Installer l'application ».
- **PC / Mac** : Chrome ou Edge → icône d'installation dans la barre d'adresse.
- Une fois installée, l'application fonctionne **hors connexion** (sauf l'assistant). Dans « Contenus », le bouton « Tout rendre disponible hors connexion » télécharge tous les cours.

## Passer d'un appareil à l'autre

Vos données restent sur l'appareil (aucun compte, aucun serveur). Pour retrouver votre progression sur un autre appareil : **Réglages → Exporter ma progression**, puis sur l'autre appareil **Importer une sauvegarde** et choisir « fusionner ». Sur iPhone, le fichier exporté se range dans l'app Fichiers (ou iCloud Drive).

## Ajouter un domaine (droit public, droit de la santé…)

Sans programmation :
- **Contenus → Créer avec l'assistant** : l'IA conçoit un programme complet (3 niveaux, modules, leçons) ; chaque leçon se rédige ensuite à la demande, en vérifiant les sources.
- **Contenus → Importer un fichier** : un domaine est un fichier JSON (modèle téléchargeable). Les leçons s'écrivent en Markdown avec des blocs pédagogiques : \`:::article\`, \`:::arret\`, \`:::reforme\`, \`:::retenir\`, \`:::astuce\`, \`:::attention\`, \`:::exemple\`, \`:::definition\`, \`:::debat\`, \`:::methode\`, fermés par \`:::\`.
- Pour le diffuser à tous vos appareils : déposez le fichier dans \`public/content/packs/\` et ajoutez une ligne dans \`public/content/manifest.json\` (voir \`docs/GUIDE-CONTENU.md\`).

## Avertissement

LexCampus est un outil de formation. Son contenu, rédigé avec soin et daté, ne constitue pas une consultation juridique et ne remplace pas l'avis d'un avocat sur une situation particulière.`;

export default function Aide() {
  return (
    <div className="page">
      <h1>❔ Aide</h1>
      <Markdown text={HELP} />
    </div>
  );
}
