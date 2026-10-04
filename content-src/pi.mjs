const P = "packs/pi/";

export default {
  id: "pi",
  version: "2026.10.1",
  title: "Propriété intellectuelle et secret des affaires",
  branch: "Droit des affaires",
  icon: "💡",
  color: "#a8670f",
  order: 19,
  updatedAt: "2026-10-01",
  description: "Droit d'auteur et logiciels, IA, secret des affaires ; brevets, marques, dessins et modèles ; contrefaçon.",
  modules: [
    {
      id: "creations",
      title: "Créations et informations",
      level: 1,
      summary: "Droit d'auteur dans l'entreprise, logiciels, bases de données, IA, secret des affaires.",
      lessons: [
        {
          id: "droit-auteur-secret",
          title: "Droit d'auteur, logiciels, IA et secret des affaires",
          duration: 16,
          src: P + "droit-auteur-secret.md",
          objectives: ["Sécuriser la titularité des droits dans l'entreprise", "Protéger un savoir-faire par le secret des affaires"],
          keyRefs: ["Art. L. 111-1 CPI", "Art. L. 113-9 CPI", "Art. L. 131-3 CPI", "Art. L. 123-1 CPI", "Art. L. 122-5-3 CPI", "Art. L. 151-1 C. com."],
          quiz: [
            { type: "vf", q: "Le contrat de travail emporte cession automatique des droits d'auteur du salarié à l'employeur.", answer: false, explain: "Art. L. 111-1 al. 3, sauf logiciel (L. 113-9) et œuvre collective." },
            { type: "qcm", q: "Durée des droits patrimoniaux d'auteur :", choices: ["20 ans", "50 ans après la création", "70 ans après la mort de l'auteur", "Perpétuelle"], answer: 2, explain: "Art. L. 123-1." },
            { type: "qcm", q: "Condition du secret des affaires :", choices: ["Dépôt à l'INPI", "Mesures de protection raisonnables", "Enregistrement au RCS", "Brevet préalable"], answer: 1, explain: "Art. L. 151-1." },
          ],
          flashcards: [{ q: "Formalisme de la cession de droits d'auteur (L. 131-3) ?", a: "Mention distincte de chaque droit cédé ; domaine d'exploitation délimité : étendue, destination, lieu, durée." }],
        },
      ],
    },
    {
      id: "titres",
      title: "Titres de propriété industrielle et contrefaçon",
      level: 2,
      summary: "Brevets, marques, dessins et modèles ; actions et sanctions.",
      lessons: [
        {
          id: "brevets-marques-contrefacon",
          title: "Brevets, marques, dessins et modèles ; contrefaçon",
          duration: 16,
          src: P + "brevets-marques-contrefacon.md",
          objectives: ["Choisir le bon titre", "Agir en contrefaçon"],
          keyRefs: ["Art. L. 611-10 CPI", "Art. L. 611-7 CPI", "Art. L. 711-1 CPI", "Art. L. 712-1 CPI", "Art. L. 714-5 CPI", "Art. L. 615-7 CPI", "Art. L. 716-4-10 CPI"],
          quiz: [
            { type: "qcm", q: "Durée d'un brevet :", choices: ["10 ans", "20 ans", "25 ans", "70 ans"], answer: 1, explain: "Art. L. 611-2, sous réserve des annuités." },
            { type: "qcm", q: "Déchéance d'une marque pour défaut d'usage sérieux pendant :", choices: ["2 ans", "3 ans", "5 ans", "10 ans"], answer: 2, explain: "Art. L. 714-5." },
            { type: "vf", q: "Depuis 2020, l'INPI peut prononcer la nullité ou la déchéance d'une marque.", answer: true, explain: "Ordonnance du 13 nov. 2019." },
            { type: "qcm", q: "Date d'entrée en fonction de la Juridiction unifiée du brevet :", choices: ["1er janvier 2020", "1er juin 2023", "1er janvier 2025", "Elle n'existe pas"], answer: 1, explain: "Avec le brevet européen à effet unitaire." },
          ],
          flashcards: [{ q: "Trois éléments du préjudice de contrefaçon ?", a: "Conséquences économiques négatives, préjudice moral, bénéfices réalisés par le contrefacteur (ou forfait ≥ redevances)." }],
        },
      ],
    },
  ],
  decisions: [],
  reforms: [
    { date: "2018-07-30", title: "Loi sur le secret des affaires", summary: "Transposition de la directive (UE) 2016/943 ; art. L. 151-1 s. C. com." },
    { date: "2019-11-13", title: "Paquet marques", summary: "Ordonnance : nouvelle définition de la marque, nullité et déchéance devant l'INPI (1er avril 2020)." },
    { date: "2020-04-01", title: "Opposition aux brevets devant l'INPI", summary: "Loi PACTE : procédure d'opposition ; certificat d'utilité de 10 ans." },
    { date: "2023-06-01", title: "Brevet unitaire et JUB", summary: "Entrée en fonction de la Juridiction unifiée du brevet." },
  ],
  glossary: [
    { term: "Originalité", def: "Empreinte de la personnalité de l'auteur ; condition de protection par le droit d'auteur." },
    { term: "Œuvre collective", def: "Œuvre créée à l'initiative d'une personne qui l'édite et la divulgue sous son nom, les contributions se fondant dans l'ensemble (L. 113-2)." },
    { term: "Saisie-contrefaçon", def: "Mesure probatoire autorisée par le juge pour décrire ou saisir les produits argués de contrefaçon." },
    { term: "Invention de mission", def: "Invention du salarié réalisée dans l'exécution d'une mission inventive ; elle appartient à l'employeur (L. 611-7)." },
  ],
};
