const P = "packs/difficultes/";

export default {
  id: "difficultes",
  version: "2026.10.1",
  title: "Entreprises en difficulté",
  branch: "Droit des affaires",
  icon: "🆘",
  color: "#c0541a",
  order: 12,
  updatedAt: "2026-10-01",
  description: "Prévention et procédures amiables, sauvegarde, redressement et liquidation, classes de parties affectées, plans, sanctions — à jour de la réforme de 2021.",
  modules: [
    {
      id: "prevention",
      title: "Prévenir et négocier",
      level: 1,
      summary: "Alertes, mandat ad hoc, conciliation et prépack.",
      lessons: [
        {
          id: "prevention-amiable",
          title: "Prévention, mandat ad hoc et conciliation",
          duration: 15,
          src: P + "prevention-amiable.md",
          objectives: ["Repérer les signaux d'alerte", "Choisir entre mandat ad hoc et conciliation", "Utiliser le privilège de new money et le prépack"],
          keyRefs: ["Art. L. 611-2 C. com.", "Art. L. 611-3 C. com.", "Art. L. 611-4 C. com.", "Art. L. 611-6 C. com.", "Art. L. 611-11 C. com.", "Art. L. 611-15 C. com."],
          quiz: [
            { type: "qcm", q: "La conciliation est ouverte au débiteur en cessation des paiements depuis :", choices: ["Moins de 45 jours au plus", "Moins de 3 mois", "Moins d'un an", "Jamais"], answer: 0, explain: "Art. L. 611-4." },
            { type: "qcm", q: "Durée maximale de la conciliation :", choices: ["2 mois", "4 mois + 1 mois", "6 mois", "1 an"], answer: 1, explain: "Art. L. 611-6." },
            { type: "vf", q: "L'ouverture d'une conciliation suspend automatiquement les poursuites des créanciers.", answer: false, explain: "Non, mais le débiteur peut demander des délais de grâce (art. 1343-5 C. civ.)." },
            { type: "qcm", q: "Le privilège de conciliation bénéficie :", choices: ["À tous les créanciers", "À ceux qui apportent un nouveau financement ou bien/service dans l'accord homologué", "Aux associés", "Au Trésor"], answer: 1, explain: "Art. L. 611-11." },
          ],
          flashcards: [{ q: "Accord constaté vs homologué ?", a: "Constaté : confidentiel, force exécutoire ; homologué : jugement publié, privilège de new money, effets renforcés." }],
        },
      ],
    },
    {
      id: "procedures",
      title: "Les procédures collectives",
      level: 2,
      summary: "Ouverture, organes, période d'observation, créanciers, contrats en cours, période suspecte.",
      lessons: [
        {
          id: "procedures-collectives",
          title: "Ouverture et effets des procédures collectives",
          duration: 25,
          src: P + "procedures-collectives.md",
          objectives: ["Caractériser la cessation des paiements", "Déclarer une créance", "Gérer un contrat en cours", "Connaître les nullités de la période suspecte"],
          keyRefs: ["Art. L. 631-1 C. com.", "Art. L. 631-4 C. com.", "Art. L. 631-8 C. com.", "Art. L. 622-7 C. com.", "Art. L. 622-13 C. com.", "Art. L. 622-17 C. com.", "Art. L. 622-21 C. com.", "Art. L. 622-24 C. com.", "Art. L. 622-26 C. com.", "Art. L. 632-1 C. com."],
          quiz: [
            { type: "qcm", q: "Délai de déclaration des créances :", choices: ["1 mois après le jugement", "2 mois après la publication au BODACC", "6 mois", "1 an"], answer: 1, explain: "Art. R. 622-24 (4 mois hors France métropolitaine)." },
            { type: "qcm", q: "Une créance non déclarée est :", choices: ["Éteinte", "Inopposable à la procédure", "Transformée en créance postérieure", "Garantie par l'AGS"], answer: 1, explain: "Depuis 2005, l'extinction a été remplacée par l'inopposabilité." },
            { type: "vf", q: "Une clause résiliant le contrat du seul fait de l'ouverture d'une procédure collective est valable.", answer: false, explain: "Réputée non écrite (art. L. 622-13)." },
            { type: "qcm", q: "Faute de réponse de l'administrateur à la mise en demeure de prendre parti sur un contrat en cours :", choices: ["Le contrat continue", "Le contrat est résilié de plein droit après un mois", "Le juge décide", "Le cocontractant est payé"], answer: 1, explain: "Art. L. 622-13 III." },
            { type: "qcm", q: "La date de cessation des paiements peut être reportée au maximum :", choices: ["6 mois", "12 mois", "18 mois avant le jugement d'ouverture", "Sans limite"], answer: 2, explain: "Art. L. 631-8." },
            { type: "qcm", q: "Un paiement par dation en paiement d'une dette échue pendant la période suspecte est :", choices: ["Valable", "Nul de droit (paiement anormal)", "Annulable si le créancier connaissait la CP", "Inopposable"], answer: 1, explain: "Art. L. 632-1, 4° : paiement par un mode non communément admis." },
          ],
          flashcards: [
            { q: "Définition de la cessation des paiements ?", a: "Impossibilité de faire face au passif exigible avec l'actif disponible, compte tenu des réserves de crédit et moratoires (art. L. 631-1)." },
            { q: "Créances postérieures privilégiées (L. 622-17) ?", a: "Nées régulièrement après le jugement pour les besoins de la procédure ou de la période d'observation, ou en contrepartie d'une prestation fournie au débiteur." },
            { q: "Durée maximale de la période d'observation ?", a: "18 mois (6 + 6 + 6 exceptionnellement)." },
          ],
          exercises: [
            {
              id: "cas-fournisseur-redressement",
              type: "cas-pratique",
              title: "Cas pratique : le fournisseur face au redressement de son client",
              timerMin: 45,
              statement: `La société Métalex fournit depuis cinq ans des pièces à la SAS Mécanique 21 dans le cadre d'un contrat-cadre à durée indéterminée. Elle a livré en août 2025, avec clause de réserve de propriété figurant dans ses conditions générales acceptées par le client, des pièces non payées (60 000 €). Le contrat prévoit sa résiliation automatique « en cas d'ouverture d'une procédure collective ». Le 15 septembre 2025, Mécanique 21 est placée en redressement judiciaire ; le jugement est publié au BODACC le 25 septembre. L'administrateur demande à Métalex de continuer les livraisons.

Le dirigeant de Métalex vous demande : 1) Peut-il se faire payer les 60 000 € ? 2) Peut-il récupérer les pièces ? 3) Doit-il continuer les livraisons, et à quelles conditions ? 4) La clause de résiliation automatique joue-t-elle ?`,
              rubric: ["Interdiction de payer et déclaration des créances (délai)", "Revendication (3 mois, biens en nature, clause acceptée)", "Contrats en cours : continuation, paiement comptant, mise en demeure", "Clause ipso facto réputée non écrite", "Créances postérieures privilégiées"],
              model: `**1.** La créance de 60 000 € est **antérieure** : interdiction de payer (L. 622-7). Métalex doit la **déclarer** au mandataire judiciaire dans les deux mois de la publication au BODACC (soit avant le 25 novembre 2025), sous peine d'inopposabilité.

**2.** **Revendication** des pièces vendues avec réserve de propriété : clause écrite acceptée au plus tard à la livraison ; biens se retrouvant **en nature** chez le débiteur (non transformés ni incorporés) ; action dans les **trois mois** de la publication (avant le 25 décembre 2025), d'abord par demande à l'administrateur (L. 624-9, L. 624-16, R. 624-13). À défaut, revendication du prix de revente non encore payé.

**3.** **Contrat en cours** : l'administrateur peut exiger la poursuite (L. 622-13), en fournissant la prestation promise : les **nouvelles livraisons** doivent être **payées comptant** (sauf délais acceptés). Métalex ne peut subordonner la continuation au paiement de l'arriéré. Les créances nées des nouvelles livraisons sont des **créances postérieures** privilégiées (L. 622-17). Si l'administrateur ne paie pas, Métalex peut le mettre en demeure ; la résiliation est encourue.

**4.** La clause de résiliation automatique pour ouverture de la procédure est **réputée non écrite** (L. 622-13 I).`,
            },
          ],
        },
        {
          id: "plans-classes-sanctions",
          title: "Plans, classes de parties affectées, liquidation et sanctions",
          duration: 22,
          src: P + "plans-classes-sanctions.md",
          objectives: ["Comprendre le vote par classes", "Évaluer une offre de reprise", "Mesurer les risques du dirigeant"],
          keyRefs: ["Art. L. 626-12 C. com.", "Art. L. 626-30 à L. 626-32 C. com.", "Art. L. 642-1 C. com.", "Art. L. 642-3 C. com.", "Art. L. 643-11 C. com.", "Art. L. 651-2 C. com.", "Art. L. 653-1 C. com.", "Art. L. 654-2 C. com.", "Art. L. 650-1 C. com."],
          quiz: [
            { type: "qcm", q: "Majorité requise dans chaque classe de parties affectées :", choices: ["Majorité simple", "Deux tiers des voix exprimées", "Unanimité", "Trois quarts"], answer: 1, explain: "Art. L. 626-30-2." },
            { type: "qcm", q: "Le critère du meilleur intérêt des créanciers signifie :", choices: ["Le plan doit rembourser intégralement", "Aucun créancier dissident ne doit être moins bien traité qu'en liquidation ou dans la meilleure solution alternative", "Les créanciers choisissent le repreneur", "Le plus offrant l'emporte"], answer: 1, explain: "Condition de l'application forcée et de l'arrêté du plan." },
            { type: "qcm", q: "Durée maximale d'un plan de sauvegarde ou de redressement :", choices: ["5 ans", "10 ans", "15 ans", "Illimitée"], answer: 1, explain: "Art. L. 626-12." },
            { type: "vf", q: "Après une clôture pour insuffisance d'actif, les créanciers recouvrent en principe leur droit de poursuite.", answer: false, explain: "Art. L. 643-11, sauf exceptions." },
            { type: "qcm", q: "Les créanciers ne sont responsables des concours consentis que :", choices: ["En cas de faute simple", "En cas de fraude, d'immixtion caractérisée ou de garanties disproportionnées", "Jamais", "Toujours"], answer: 1, explain: "Art. L. 650-1." },
          ],
          flashcards: [
            { q: "Règle de priorité absolue ?", a: "Une classe dissidente doit être intégralement désintéressée avant qu'une classe de rang inférieur ne reçoive quoi que ce soit (sauf dérogations)." },
            { q: "Peines de la banqueroute ?", a: "5 ans d'emprisonnement et 75 000 € d'amende (L. 654-3), plus peines complémentaires." },
          ],
        },
        {
          id: "difficultes-salaries-ags",
          title: "Les salariés dans la procédure collective : AGS, licenciements, reprise",
          level: 3,
          objectives: ["Connaître la garantie AGS", "Maîtriser les licenciements en période d'observation et en cession"],
          outline: [
            "Superprivilège et garantie AGS : champ, plafonds",
            "Licenciements urgents en période d'observation (autorisation du juge-commissaire)",
            "Licenciements prévus par le plan de cession",
            "Transfert des contrats de travail au repreneur (art. L. 1224-1 C. trav.)",
            "Rôle du CSE et information des salariés",
          ],
        },
        {
          id: "difficultes-international",
          title: "Insolvabilité transfrontalière : le règlement (UE) 2015/848",
          level: 3,
          objectives: ["Déterminer la juridiction compétente (COMI)", "Articuler procédure principale et secondaire"],
          outline: [
            "Champ du règlement et centre des intérêts principaux (COMI)",
            "Procédure principale et procédures secondaires",
            "Reconnaissance automatique et loi applicable (lex concursus)",
            "Groupes de sociétés : coordination",
          ],
        },
      ],
    },
  ],
  decisions: [],
  reforms: [
    { date: "2006-01-01", title: "Entrée en vigueur de la loi de sauvegarde", summary: "Loi du 26 juill. 2005 : création de la sauvegarde et de la conciliation, inopposabilité des créances non déclarées." },
    { date: "2008-12-18", title: "Ordonnance de réforme de la sauvegarde", summary: "Assouplissement de l'accès à la sauvegarde, renforcement de la conciliation." },
    { date: "2014-03-12", title: "Ordonnance de 2014", summary: "Prépack cession, sauvegarde accélérée étendue, rétablissement professionnel." },
    { date: "2016-12-09", title: "Loi Sapin II : simple négligence", summary: "La simple négligence ne suffit plus à engager la responsabilité pour insuffisance d'actif." },
    { date: "2021-10-01", title: "Réforme du droit des entreprises en difficulté", summary: "Ord. n° 2021-1193 du 15 sept. 2021 : classes de parties affectées, application forcée interclasses, privilège de new money, refonte de l'ordre des paiements." },
  ],
  glossary: [
    { term: "Cessation des paiements", def: "Impossibilité de faire face au passif exigible avec l'actif disponible (art. L. 631-1)." },
    { term: "Période suspecte", def: "Période entre la date de cessation des paiements et le jugement d'ouverture, pendant laquelle certains actes sont annulables." },
    { term: "Classes de parties affectées", def: "Groupes de créanciers et détenteurs de capital votant le plan, depuis 2021." },
    { term: "Cross-class cram-down", def: "Application forcée interclasses d'un plan à une classe dissidente." },
    { term: "Prépack cession", def: "Cession préparée confidentiellement en conciliation ou mandat ad hoc, mise en œuvre dans une procédure collective." },
    { term: "Dessaisissement", def: "Perte par le débiteur en liquidation de l'administration et de la disposition de ses biens au profit du liquidateur." },
    { term: "Relevé de forclusion", def: "Autorisation de déclarer tardivement une créance, à demander dans les 6 mois (art. L. 622-26)." },
  ],
};
