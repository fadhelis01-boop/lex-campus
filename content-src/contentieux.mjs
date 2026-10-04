const P = "packs/contentieux/";

export default {
  id: "contentieux",
  version: "2026.10.1",
  title: "Contentieux, arbitrage et international",
  branch: "Droit des affaires",
  icon: "🌍",
  color: "#4a4a8a",
  order: 21,
  updatedAt: "2026-10-01",
  description: "Juridictions commerciales, référés, art. 145 CPC, modes amiables ; loi applicable (Rome I), CVIM, juge compétent (Bruxelles I bis), arbitrage interne et international.",
  modules: [
    {
      id: "proces",
      title: "Le procès d'affaires",
      level: 1,
      summary: "Juridictions, référés, preuve anticipée, amiable, exécution.",
      lessons: [
        {
          id: "procedure-modes-amiables",
          title: "Juridictions, référés et modes amiables",
          duration: 14,
          src: P + "procedure-modes-amiables.md",
          objectives: ["Orienter un litige vers la bonne juridiction", "Utiliser référé et art. 145 CPC", "Intégrer l'amiable dans la stratégie"],
          keyRefs: ["Art. 145 CPC", "Art. 750-1 CPC", "Art. 872 et 873 CPC", "Art. 834 et 835 CPC", "Art. 514 CPC"],
          quiz: [
            { type: "qcm", q: "L'art. 145 CPC permet :", choices: ["D'obtenir une provision", "D'ordonner une mesure d'instruction avant tout procès s'il existe un motif légitime", "De saisir la Cour de cassation", "D'exécuter un jugement"], answer: 1, explain: "Mesure d'instruction in futurum." },
            { type: "vf", q: "Depuis 2020, les décisions de première instance sont en principe exécutoires de droit à titre provisoire.", answer: true, explain: "Art. 514 CPC." },
            { type: "qcm", q: "La méconnaissance d'une clause de médiation préalable obligatoire entraîne :", choices: ["Une amende", "Une fin de non-recevoir", "La nullité du contrat", "Rien"], answer: 1, explain: "Non régularisable en cours d'instance." },
          ],
          flashcards: [{ q: "ARA ?", a: "Audience de règlement amiable devant un autre juge du tribunal judiciaire (décret du 29 juill. 2023)." }],
        },
      ],
    },
    {
      id: "international",
      title: "Le contrat international",
      level: 3,
      summary: "Loi applicable, CVIM, compétence, arbitrage.",
      lessons: [
        {
          id: "arbitrage-international",
          title: "Loi applicable, juge compétent, CVIM et arbitrage",
          duration: 18,
          src: P + "arbitrage-international.md",
          objectives: ["Rédiger les clauses de loi et de for", "Éviter le piège de la CVIM", "Choisir l'arbitrage à bon escient"],
          keyRefs: ["Règl. (CE) n° 593/2008 (Rome I)", "Règl. (UE) n° 1215/2012 (Bruxelles I bis)", "Convention de Vienne du 11 avr. 1980", "Art. 1448 CPC", "Art. 1520 CPC"],
          quiz: [
            { type: "qcm", q: "Contrat de vente entre un vendeur français et un acheteur allemand stipulant « droit français » sans autre précision :", choices: ["Le Code civil s'applique seul", "La CVIM s'applique", "Le droit allemand s'applique", "Aucune loi"], answer: 1, explain: "La CVIM fait partie du droit français ; il faut l'exclure expressément (art. 6)." },
            { type: "qcm", q: "Recours contre une sentence arbitrale internationale rendue en France :", choices: ["Appel", "Recours en annulation (cinq cas)", "Pourvoi direct", "Aucun"], answer: 1, explain: "Art. 1520 CPC." },
            { type: "vf", q: "Une clause attributive de juridiction au profit d'un tribunal d'un État membre est valable quel que soit le domicile des parties.", answer: true, explain: "Art. 25 Bruxelles I bis." },
          ],
          flashcards: [{ q: "Loi applicable à défaut de choix (Rome I) ?", a: "Règles par type de contrat (art. 4, 1), sinon résidence habituelle du débiteur de la prestation caractéristique, sauf liens manifestement plus étroits." }],
        },
      ],
    },
  ],
  decisions: [],
  reforms: [
    { date: "2009-12-17", title: "Application du règlement Rome I", summary: "Loi applicable aux obligations contractuelles." },
    { date: "2011-01-13", title: "Réforme du droit de l'arbitrage", summary: "Décret n° 2011-48 : art. 1442 s. CPC modernisés." },
    { date: "2015-01-10", title: "Application de Bruxelles I bis", summary: "Suppression de l'exequatur entre États membres." },
    { date: "2020-01-01", title: "Réforme de la procédure civile", summary: "Tribunal judiciaire, exécution provisoire de droit, tentative préalable de résolution amiable." },
    { date: "2023-11-01", title: "Audience de règlement amiable et césure", summary: "Décret du 29 juill. 2023 relatif à la politique de l'amiable." },
  ],
  glossary: [
    { term: "Compétence-compétence", def: "Principe selon lequel l'arbitre statue en priorité sur sa propre compétence." },
    { term: "Exequatur", def: "Décision rendant exécutoire une sentence arbitrale ou un jugement étranger." },
    { term: "Prestation caractéristique", def: "Prestation qui caractérise le contrat (livraison, service), critère de rattachement de Rome I." },
    { term: "Incoterms", def: "Règles de la CCI répartissant frais, risques et formalités dans la vente internationale." },
  ],
};
