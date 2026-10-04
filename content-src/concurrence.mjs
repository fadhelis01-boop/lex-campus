const P = "packs/concurrence/";

export default {
  id: "concurrence",
  version: "2026.10.2",
  title: "Concurrence et distribution",
  branch: "Droit des affaires",
  icon: "⚔️",
  color: "#2f7d4f",
  order: 13,
  updatedAt: "2026-10-05",
  description: "Ententes, abus de position dominante, concentrations ; pratiques restrictives et rupture brutale ; franchise, concession, distribution sélective, agence commerciale.",
  modules: [
    {
      id: "marche",
      title: "Les pratiques anticoncurrentielles",
      level: 2,
      summary: "Droit de l'Union et droit français : ententes, abus, concentrations, sanctions.",
      lessons: [
        {
          id: "pratiques-anticoncurrentielles",
          title: "Ententes, abus de position dominante, concentrations",
          duration: 18,
          src: P + "pratiques-anticoncurrentielles.md",
          objectives: ["Qualifier une entente", "Identifier un abus de domination", "Anticiper un contrôle des concentrations"],
          keyRefs: ["Art. 101 TFUE", "Art. 102 TFUE", "Art. L. 420-1 C. com.", "Art. L. 420-2 C. com.", "Art. L. 430-2 C. com.", "Règl. (UE) 2022/720", "Règl. (UE) 2022/1925 (DMA)"],
          quiz: [
            { type: "qcm", q: "Plafond des amendes de concurrence :", choices: ["1 M€", "5 % du CA France", "10 % du CA mondial", "Illimité"], answer: 2, explain: "10 % du chiffre d'affaires mondial." },
            { type: "qcm", q: "Seuil de part de marché du règlement d'exemption vertical :", choices: ["10 %", "20 %", "30 %", "50 %"], answer: 2, explain: "Règlement (UE) 2022/720." },
            { type: "vf", q: "L'abus de dépendance économique est une notion du droit de l'Union.", answer: false, explain: "Spécificité française (art. L. 420-2 al. 2)." },
            { type: "qcm", q: "Le premier membre d'un cartel qui le dénonce peut obtenir :", choices: ["Une réduction de 10 %", "L'immunité totale", "Rien", "Une transaction pénale"], answer: 1, explain: "Programme de clémence." },
          ],
          flashcards: [
            { q: "Restriction par objet ?", a: "Pratique si nocive (cartel de prix, répartition de marchés) qu'elle est prohibée sans démonstration de ses effets." },
            { q: "Ordonnance du 9 mars 2017 ?", a: "Transposition de la directive 2014/104 : actions en réparation, présomption de préjudice des cartels." },
          ],
        },
      ],
    },
    {
      id: "partenaires",
      title: "Pratiques restrictives et distribution",
      level: 2,
      summary: "Rupture brutale, déséquilibre significatif, négociation commerciale ; contrats de distribution.",
      lessons: [
        {
          id: "pratiques-restrictives-negociation",
          title: "Rupture brutale, déséquilibre significatif et négociation commerciale",
          duration: 18,
          src: P + "pratiques-restrictives-negociation.md",
          objectives: ["Calculer un préavis et un préjudice de rupture brutale", "Contester une clause déséquilibrée", "Respecter le formalisme de la négociation annuelle"],
          keyRefs: ["Art. L. 442-1 C. com.", "Art. L. 442-4 C. com.", "Art. L. 441-1 C. com.", "Art. L. 441-3 C. com.", "Ord. n° 2019-359 du 24 avr. 2019"],
          quiz: [
            { type: "qcm", q: "Un préavis de quelle durée met à l'abri de toute action pour rupture brutale ?", choices: ["6 mois", "12 mois", "18 mois", "24 mois"], answer: 2, explain: "Art. L. 442-1 II (2019)." },
            { type: "qcm", q: "Le préjudice réparable en cas de rupture brutale est en principe :", choices: ["Le chiffre d'affaires perdu sur 5 ans", "La marge perdue pendant la durée du préavis manquant", "Le prix du fonds", "Les frais de licenciement"], answer: 1, explain: "Le préjudice découle de la brutalité, non de la rupture." },
            { type: "vf", q: "Le déséquilibre significatif de L. 442-1 peut porter sur le prix.", answer: true, explain: "Contrairement à l'art. 1171 C. civ." },
            { type: "qcm", q: "Date limite de conclusion de la convention annuelle fournisseur-distributeur :", choices: ["1er janvier", "1er mars", "30 juin", "31 décembre"], answer: 1, explain: "Art. L. 441-3 s." },
          ],
          flashcards: [{ q: "Relation commerciale établie ?", a: "Relation stable, régulière, significative, laissant anticiper sa continuité, même sans contrat-cadre." }],
          exercises: [
            {
              id: "cas-rupture-brutale",
              type: "cas-pratique",
              title: "Cas pratique : le sous-traitant abandonné",
              timerMin: 40,
              statement: `Depuis 2013, la PME Plastiform fabrique des pièces pour le groupe AutoParts, qui représente 70 % de son chiffre d'affaires, sans contrat-cadre, par commandes mensuelles. Le 1er septembre 2025, AutoParts lui annonce par courriel qu'elle cessera toute commande au 31 décembre 2025, ayant trouvé un fournisseur moins cher. Plastiform réalisait avec AutoParts une marge sur coûts variables de 900 000 € par an.

Plastiform peut-elle obtenir réparation ? Devant quelle juridiction ? Pour quel montant approximatif ?`,
              rubric: ["Relation commerciale établie sans contrat-cadre", "Brutalité : préavis de 4 mois au regard de 12 ans, dépendance (70 %)", "Plafond de sécurité de 18 mois", "Évaluation : marge sur coûts variables × préavis manquant", "Juridiction spécialisée (D. 442-2)", "Absence de justification (faute grave, force majeure)"],
              model: `**Qualification** : relation commerciale **établie** (12 ans de commandes régulières, significatives) même sans contrat-cadre. **Brutalité** : préavis de 4 mois, manifestement insuffisant au regard de l'ancienneté et de la **dépendance** économique (70 % du CA). Un préavis raisonnable pourrait être estimé entre 12 et 18 mois (le plafond de 18 mois mettait AutoParts à l'abri). Le motif (fournisseur moins cher) ne justifie pas une rupture sans préavis suffisant.

**Préjudice** : marge sur coûts variables pendant le préavis manquant : par ex. (15 − 4) = 11 mois × 75 000 € ≈ 825 000 €, à ajuster selon le préavis retenu ; éventuellement préjudices distincts (coûts de licenciement) si leur lien avec la brutalité est démontré.

**Juridiction** : action fondée sur L. 442-1 II, réservée aux juridictions spécialisées (art. D. 442-2) ; appel devant la cour d'appel de Paris.`,
            },
          ],
        },
        {
          id: "contrats-distribution",
          title: "Franchise, concession, distribution sélective, agence commerciale",
          duration: 16,
          src: P + "contrats-distribution.md",
          objectives: ["Respecter la loi Doubin", "Choisir le contrat de distribution adapté", "Gérer la fin d'un contrat d'agent commercial"],
          keyRefs: ["Art. L. 330-1 C. com.", "Art. L. 330-3 C. com.", "Art. L. 134-1 C. com.", "Art. L. 134-11 C. com.", "Art. L. 134-12 C. com."],
          quiz: [
            { type: "qcm", q: "Délai de remise du DIP avant signature :", choices: ["8 jours", "20 jours", "1 mois", "3 mois"], answer: 1, explain: "Art. L. 330-3." },
            { type: "vf", q: "Selon la CJUE, un intermédiaire sans pouvoir de modifier les prix ne peut pas être agent commercial.", answer: false, explain: "Trendsetteuse, 4 juin 2020 : il peut l'être." },
            { type: "qcm", q: "Usage pour l'indemnité de fin de contrat d'agent commercial :", choices: ["3 mois de commissions", "1 an", "2 ans de commissions", "5 ans"], answer: 2, explain: "Usage indicatif ; le juge apprécie le préjudice réel." },
          ],
          flashcards: [{ q: "Cas d'exclusion de l'indemnité de l'agent ?", a: "Faute grave de l'agent ; cessation à son initiative (sauf circonstances justifiées) ; cession du contrat (L. 134-13)." }],
        },
        {
          id: "concurrence-deloyale",
          src: P + "concurrence-deloyale.md",
          duration: 14,
          quiz: [
            { type: "qcm", q: "Fondement de l'action en concurrence déloyale :", choices: ["Art. L. 442-1 C. com.", "Art. 1240 C. civ.", "Code de la propriété intellectuelle", "Art. 101 TFUE"], answer: 1, explain: "Responsabilité délictuelle." },
            { type: "vf", q: "Le recrutement d'un salarié d'un concurrent est en soi fautif.", answer: false, explain: "Liberté du travail ; fautif seulement avec des manœuvres." },
            { type: "qcm", q: "Selon Cristal de Paris (2020), le préjudice peut être évalué en tenant compte :", choices: ["Du seul chiffre d'affaires de la victime", "De l'économie injustement réalisée par l'auteur", "Du capital social", "D'un forfait légal"], answer: 1, explain: "Le préjudice s'infère des actes." },
            { type: "qcm", q: "Se placer dans le sillage d'une entreprise pour profiter de ses efforts, c'est :", choices: ["Le dénigrement", "La confusion", "Le parasitisme", "L'entente"], answer: 2, explain: "Sans condition de situation de concurrence." }
          ],
          flashcards: [{ q: "Quatre familles d'actes déloyaux ?", a: "Dénigrement, confusion, désorganisation, parasitisme." }],
          title: "Concurrence déloyale et parasitisme",
          level: 1,
          objectives: ["Identifier les actes de concurrence déloyale", "Évaluer le préjudice"],
          outline: [
            "Fondement : responsabilité civile (art. 1240 C. civ.) et liberté du commerce",
            "Dénigrement, confusion, désorganisation, débauchage",
            "Parasitisme : se placer dans le sillage d'autrui",
            "Préjudice : présomption et économie injustement réalisée",
            "Articulation avec la contrefaçon et le secret des affaires",
          ],
          keyRefs: ["Art. 1240 C. civ.", "Art. L. 151-1 C. com."],
        },
      ],
    },
  ],
  decisions: [
    { id: "trendsetteuse", name: "Trendsetteuse", court: "CJUE", date: "4 juin 2020", number: "aff. C-828/18", topic: "Agent commercial", solution: "L'intermédiaire qui ne dispose pas du pouvoir de modifier les prix des marchandises peut néanmoins être qualifié d'agent commercial.", scope: "Extension du statut d'agent commercial ; alignement de la Cour de cassation (Com., 2 déc. 2020).", status: "en vigueur" },
  ],
  reforms: [
    { date: "2009-03-02", title: "Création de l'Autorité de la concurrence", summary: "Loi LME : l'Autorité succède au Conseil de la concurrence, avec le contrôle des concentrations." },
    { date: "2017-03-09", title: "Actions en réparation des pratiques anticoncurrentielles", summary: "Ordonnance transposant la directive 2014/104/UE." },
    { date: "2019-04-24", title: "Réforme des pratiques restrictives", summary: "Ordonnance n° 2019-359 : trois pratiques générales (L. 442-1), préavis de 18 mois, amende civile." },
    { date: "2022-06-01", title: "Nouveau règlement d'exemption vertical", summary: "Règlement (UE) 2022/720, applicable du 1er juin 2022." },
    { date: "2023-03-30", title: "Loi EGalim 3", summary: "Loi n° 2023-221 renforçant l'équilibre des relations commerciales entre fournisseurs et distributeurs." },
    { date: "2023-05-02", title: "Application du règlement sur les marchés numériques (DMA)", summary: "Obligations des contrôleurs d'accès (grandes plateformes)." },
  ],
  glossary: [
    { term: "Entente", def: "Accord ou pratique concertée entre entreprises ayant pour objet ou effet de restreindre la concurrence." },
    { term: "Position dominante", def: "Puissance économique permettant de se comporter indépendamment des concurrents, clients et consommateurs." },
    { term: "Clémence", def: "Exonération ou réduction d'amende pour l'entreprise qui dénonce un cartel." },
    { term: "Rupture brutale", def: "Rupture d'une relation commerciale établie sans préavis écrit suffisant (art. L. 442-1, II)." },
    { term: "DIP", def: "Document d'information précontractuelle de la loi Doubin (art. L. 330-3)." },
    { term: "Parasitisme", def: "Fait de se placer dans le sillage d'une entreprise pour profiter indûment de ses efforts et de sa notoriété." },
  ],
};
