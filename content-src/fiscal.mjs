const P = "packs/fiscal/";

export default {
  id: "fiscal",
  version: "2026.10.2",
  title: "Fiscalité des affaires",
  branch: "Droit des affaires",
  icon: "🧾",
  color: "#8a5a14",
  order: 16,
  updatedAt: "2026-10-05",
  description: "IS, régimes de groupe, TVA, imposition du dirigeant ; contrôle fiscal, abus de droit, sanctions ; transmission et pacte Dutreil. Matière à vérifier à chaque loi de finances.",
  modules: [
    {
      id: "imposition",
      title: "L'imposition de l'entreprise",
      level: 1,
      summary: "IS, TVA, régimes de groupe, fiscalité du dirigeant et de l'associé.",
      lessons: [
        {
          id: "imposition-entreprise",
          title: "IS, TVA, régimes de groupe et fiscalité du dirigeant",
          duration: 16,
          src: P + "imposition-entreprise.md",
          objectives: ["Situer les taux et régimes principaux", "Identifier un acte anormal de gestion", "Choisir entre mère-fille et intégration"],
          keyRefs: ["Art. 219 CGI", "Art. 145 et 216 CGI", "Art. 223 A CGI", "Art. 278 CGI", "Art. 150-0 B ter CGI"],
          quiz: [
            { type: "qcm", q: "Taux normal de l'IS :", choices: ["33,1/3 %", "28 %", "25 %", "15 %"], answer: 2, explain: "Depuis 2022." },
            { type: "qcm", q: "Seuil de détention pour le régime mère-fille :", choices: ["1 %", "5 %", "10 %", "95 %"], answer: 1, explain: "5 % du capital conservés 2 ans." },
            { type: "qcm", q: "Seuil de détention pour l'intégration fiscale :", choices: ["50 %", "75 %", "95 %", "100 %"], answer: 2, explain: "Art. 223 A CGI." },
            { type: "vf", q: "L'acte anormal de gestion est une charge engagée dans un intérêt étranger à celui de l'entreprise.", answer: true, explain: "Jurisprudence du Conseil d'État ; réintégration dans le résultat." },
          ],
          flashcards: [{ q: "Taux de TVA en vigueur ?", a: "20 % (normal), 10 % (intermédiaire), 5,5 % (réduit), 2,1 % (particulier)." }],
        },
      ],
    },
    {
      id: "controle-transmission",
      title: "Contrôle, abus de droit et transmission",
      level: 2,
      summary: "Garanties et sanctions, abus de droit, verrou de Bercy, pacte Dutreil.",
      lessons: [
        {
          id: "controle-abus-transmission",
          title: "Contrôle fiscal, abus de droit et pacte Dutreil",
          duration: 18,
          src: P + "controle-abus-transmission.md",
          objectives: ["Sécuriser une opération (rescrit)", "Distinguer abus de droit et mini-abus", "Monter un pacte Dutreil"],
          keyRefs: ["Art. L. 64 LPF", "Art. L. 64 A LPF", "Art. L. 80 A LPF", "Art. L. 80 B LPF", "Art. 1729 CGI", "Art. 1741 CGI", "Art. 787 B CGI"],
          quiz: [
            { type: "qcm", q: "L'abus de droit de l'art. L. 64 LPF suppose un but :", choices: ["Principalement fiscal", "Exclusivement fiscal (ou la fictivité)", "Partiellement fiscal", "Économique"], answer: 1, explain: "Le but principalement fiscal relève du mini-abus de droit (L. 64 A)." },
            { type: "qcm", q: "Exonération de droits du pacte Dutreil :", choices: ["50 %", "75 %", "90 %", "100 %"], answer: 1, explain: "Art. 787 B CGI." },
            { type: "qcm", q: "Durée de l'engagement individuel de conservation :", choices: ["2 ans", "3 ans", "4 ans", "6 ans"], answer: 2, explain: "Après l'engagement collectif d'au moins 2 ans." },
            { type: "vf", q: "Depuis 2018, certains dossiers de fraude grave sont transmis automatiquement au parquet.", answer: true, explain: "Loi du 23 oct. 2018 (assouplissement du verrou de Bercy)." },
          ],
          flashcards: [{ q: "Majoration pour abus de droit ?", a: "80 % (40 % si le contribuable n'est ni l'initiateur ni le principal bénéficiaire)." }],
        },
        {
          id: "fiscalite-internationale",
          src: P + "fiscalite-internationale.md",
          duration: 15,
          quiz: [
            { type: "qcm", q: "Le principe de territorialité de l'IS signifie que :", choices: ["Tous les bénéfices mondiaux sont imposés en France", "Seuls les bénéfices des entreprises exploitées en France sont imposés", "Les filiales étrangères sont imposées en France", "Il n'y a pas d'IS sur l'export"], answer: 1, explain: "Art. 209, I CGI." },
            { type: "qcm", q: "Le principe de pleine concurrence concerne :", choices: ["Les ententes", "Les prix de transfert entre entreprises liées", "La TVA", "Les marchés publics"], answer: 1, explain: "Art. 57 CGI." },
            { type: "qcm", q: "Seuil du Pilier 2 (impôt minimum mondial) :", choices: ["50 M€", "250 M€", "750 M€", "1 Md€"], answer: 2, explain: "Taux effectif minimal de 15 %." },
            { type: "vf", q: "Une entreprise étrangère sans établissement stable en France n'y est en principe pas imposable sur ses bénéfices d'exploitation (selon les conventions).", answer: true, explain: "Notion d'établissement stable." }
          ],
          flashcards: [{ q: "Art. 209 B CGI ?", a: "Imposition en France des bénéfices d'entités contrôlées établies dans des États à fiscalité privilégiée, sauf activité réelle." }],
          title: "Fiscalité internationale de l'entreprise",
          level: 3,
          objectives: ["Comprendre les conventions fiscales et les prix de transfert", "Situer BEPS et le Pilier 2"],
          outline: [
            "Territorialité de l'IS et conventions fiscales",
            "Établissement stable",
            "Prix de transfert : principe de pleine concurrence, documentation",
            "Dispositifs anti-abus : art. 209 B CGI, ATAD",
            "Pilier 2 : impôt minimum mondial de 15 %",
          ],
        },
      ],
    },
  ],
  decisions: [],
  reforms: [
    { date: "2018-01-01", title: "Prélèvement forfaitaire unique et baisse programmée de l'IS", summary: "Flat tax sur les revenus du capital ; trajectoire de baisse de l'IS vers 25 % (atteint en 2022)." },
    { date: "2018-10-23", title: "Loi relative à la lutte contre la fraude", summary: "Assouplissement du verrou de Bercy, CJIP en matière fiscale." },
    { date: "2020-01-01", title: "Mini-abus de droit", summary: "Art. L. 64 A LPF : actes à but principalement fiscal." },
    { date: "2024-01-01", title: "Impôt minimum mondial (Pilier 2)", summary: "Transposition de la directive (UE) 2022/2523 pour les groupes de plus de 750 M€." },
  ],
  glossary: [
    { term: "Acte anormal de gestion", def: "Opération réalisée dans un intérêt étranger à celui de l'entreprise ; ses effets fiscaux sont neutralisés." },
    { term: "Rescrit", def: "Prise de position formelle de l'administration fiscale, opposable (art. L. 80 B LPF)." },
    { term: "Pacte Dutreil", def: "Régime d'exonération partielle de droits de mutation pour la transmission d'entreprises (art. 787 B CGI)." },
    { term: "Intégration fiscale", def: "Régime de groupe permettant la compensation des résultats des sociétés détenues à 95 %." },
  ],
};
