const P = "packs/fiscal/";

const HYP = "> **Hypothèses de l'exercice** : taux et barèmes connus à la date de rédaction ; prélèvement forfaitaire unique (PFU) supposé de **30 %** (12,8 % + 17,2 %) — vérifiez les taux en vigueur avant toute application réelle.\n\n";

export default {
  id: "fiscal",
  version: "2026.10.3",
  title: "Fiscalité des affaires et optimisation fiscale légale",
  branch: "Droit des affaires",
  icon: "🧾",
  color: "#8a5a14",
  order: 16,
  updatedAt: "2026-10-05",
  description:
    "Programme complet : choix du régime, IS, TVA, impôts locaux, incitations, groupes et holdings, restructurations, dirigeant et associé, transmission, international, contrôle et contentieux ; optimisation fiscale légale (frontière, leviers, exercices chiffrés, cas stratégiques, pistes créatives). Matière à vérifier à chaque loi de finances.",
  modules: [
    {
      id: "fondamentaux",
      title: "Les fondamentaux de la fiscalité de l'entreprise",
      level: 1,
      summary: "Choix du régime d'imposition, IS, TVA approfondie, impôts locaux et taxes oubliées.",
      lessons: [
        {
          id: "regimes-imposition-choix",
          title: "Choisir son régime : IR ou IS, micro ou réel, SAS ou SARL",
          duration: 18,
          src: P + "regimes-imposition-choix.md",
          objectives: ["Comparer IR et IS", "Mesurer l'effet du statut social du dirigeant", "Utiliser les options temporaires"],
          keyRefs: ["Art. 8 CGI", "Art. 206 CGI", "Art. 239 bis AA CGI", "Art. 239 bis AB CGI", "Art. 50-0 CGI", "Art. 102 ter CGI"],
          quiz: [
            { type: "qcm", q: "Sous le régime de l'IR, le bénéfice d'une société de personnes est imposé :", choices: ["Seulement s'il est distribué", "Entre les mains des associés, distribué ou non", "Au taux de 25 %", "Jamais"], answer: 1, explain: "Transparence fiscale." },
            { type: "qcm", q: "Durée maximale de l'option pour l'IR d'une société de capitaux nouvelle (239 bis AB) :", choices: ["2 exercices", "5 exercices", "10 exercices", "Illimitée"], answer: 1, explain: "Pour imputer les déficits de démarrage chez les associés." },
            { type: "qcm", q: "Les dividendes du gérant majoritaire de SARL sont soumis à cotisations sociales :", choices: ["En totalité", "Pour la fraction excédant 10 % du capital, des primes et des comptes courants", "Jamais", "Au-delà de 50 000 €"], answer: 1, explain: "Le président de SAS n'y est pas soumis." },
            { type: "qcm", q: "Abattement forfaitaire micro-BIC pour la vente de marchandises :", choices: ["34 %", "50 %", "71 %", "90 %"], answer: 2, explain: "50 % pour les prestations commerciales, 34 % en micro-BNC." },
            { type: "vf", q: "Depuis 2022, l'entrepreneur individuel peut opter pour l'IS.", answer: true, explain: "Assimilation à une EURL." },
          ],
          flashcards: [
            { q: "Pourquoi l'IS favorise-t-il la capitalisation ?", a: "Le bénéfice mis en réserve n'est taxé qu'à 15 / 25 % ; l'associé n'est imposé que sur les distributions." },
            { q: "Président de SAS / gérant majoritaire : statut social ?", a: "Assimilé salarié / travailleur non salarié (TNS)." },
          ],
          exercises: [
            {
              id: "calcul-distribution-integrale",
              type: "calcul",
              title: "Exercice chiffré : le coût fiscal d'une distribution intégrale",
              statement: HYP + "Une SAS (PME éligible au taux réduit) réalise un **bénéfice fiscal de 100 000 €**. Son président, associé unique, ne se verse aucune rémunération et décide de distribuer tout le bénéfice après impôt. Il est imposé au PFU.",
              questions: [
                { q: "Impôt sur les sociétés ?", answer: 20750, unit: "€", explain: "42 500 × 15 % = 6 375 € ; 57 500 × 25 % = 14 375 € ; total 20 750 €." },
                { q: "Dividende distribuable ?", answer: 79250, unit: "€", explain: "100 000 − 20 750 = 79 250 €." },
                { q: "PFU dû par le président ?", answer: 23775, unit: "€", explain: "79 250 × 30 % = 23 775 €." },
                { q: "Montant net perçu par le président ?", answer: 55475, unit: "€", explain: "79 250 − 23 775 = 55 475 €." },
                { q: "Taux global de prélèvement (en %, arrondi à l'unité) ?", answer: 45, tolerance: 1, unit: "%", explain: "(100 000 − 55 475) / 100 000 ≈ 44,5 %. Comparez avec une rémunération (cotisations sociales élevées mais droits sociaux) : c'est l'arbitrage salaire / dividendes." },
              ],
              model: "",
            },
          ],
        },
        {
          id: "imposition-entreprise",
          title: "IS, TVA, régimes de groupe et fiscalité du dirigeant : vue d'ensemble",
          duration: 16,
          src: P + "imposition-entreprise.md",
          objectives: ["Situer les taux et régimes principaux", "Identifier un acte anormal de gestion", "Choisir entre mère-fille et intégration"],
          keyRefs: ["Art. 219 CGI", "Art. 145 et 216 CGI", "Art. 223 A CGI", "Art. 278 CGI", "Art. 150-0 B ter CGI"],
          quiz: [
            { type: "qcm", q: "Taux normal de l'IS :", choices: ["33,1/3 %", "28 %", "25 %", "15 %"], answer: 2, explain: "Depuis 2022." },
            { type: "qcm", q: "Seuil de détention pour le régime mère-fille :", choices: ["1 %", "5 %", "10 %", "95 %"], answer: 1, explain: "5 % du capital conservés 2 ans." },
            { type: "qcm", q: "Seuil de détention pour l'intégration fiscale :", choices: ["50 %", "75 %", "95 %", "100 %"], answer: 2, explain: "Art. 223 A CGI." },
            { type: "vf", q: "L'acte anormal de gestion est une charge engagée dans un intérêt étranger à celui de l'entreprise.", answer: true, explain: "CE, plén., 21 déc. 2018, Sté Croë Suisse." },
          ],
          flashcards: [{ q: "Taux de TVA en vigueur ?", a: "20 % (normal), 10 % (intermédiaire), 5,5 % (réduit), 2,1 % (particulier)." }],
        },
        {
          id: "tva-approfondie",
          title: "La TVA approfondie : champ, territorialité, déductions, régimes, risques",
          duration: 20,
          src: P + "tva-approfondie.md",
          objectives: ["Déterminer le lieu d'imposition", "Sécuriser le droit à déduction", "Utiliser les leviers de trésorerie"],
          keyRefs: ["Art. 256 CGI", "Art. 256 C CGI", "Art. 257 bis CGI", "Art. 259 CGI", "Art. 271 CGI", "Art. 275 CGI", "Dir. 2006/112/CE"],
          quiz: [
            { type: "qcm", q: "Une prestation de services B2B est en principe taxable :", choices: ["Au lieu du prestataire", "Au lieu d'établissement du preneur", "Au lieu d'exécution", "Jamais"], answer: 1, explain: "Le preneur étranger autoliquide." },
            { type: "qcm", q: "Une holding pure qui se borne à détenir des titres :", choices: ["Récupère toute la TVA sur ses frais", "N'est pas assujettie et ne récupère pas la TVA", "Paie la TVA sur ses dividendes", "Est en groupe TVA de plein droit"], answer: 1, explain: "La holding animatrice qui facture des services est assujettie." },
            { type: "vf", q: "La transmission d'un fonds de commerce entre assujettis est dispensée de TVA.", answer: true, explain: "Art. 257 bis CGI (universalité)." },
            { type: "qcm", q: "Le groupe TVA (assujetti unique) existe depuis :", choices: ["2015", "2020", "1er janvier 2023", "Il n'existe pas en France"], answer: 2, explain: "Art. 256 C CGI." },
            { type: "qcm", q: "L'acquéreur qui savait ou aurait dû savoir qu'il participait à une fraude carrousel :", choices: ["Garde son droit à déduction", "Perd son droit à déduction", "Est exonéré", "Paie une amende fixe"], answer: 1, explain: "Jurisprudence de la CJUE." },
          ],
          flashcards: [
            { q: "Durée de régularisation de la TVA sur immobilisations ?", a: "5 ans (biens meubles), 20 ans (immeubles)." },
            { q: "Achats en franchise de TVA ?", a: "Exportateurs, dans la limite des exportations de l'année précédente (art. 275)." },
          ],
        },
        {
          id: "impots-locaux-taxes",
          title: "Impôts locaux, taxes sur l'emploi, véhicules, droits d'enregistrement : les angles morts",
          duration: 14,
          src: P + "impots-locaux-taxes.md",
          objectives: ["Recenser la charge fiscale hors IS et TVA", "Auditer ces taxes dans une acquisition"],
          keyRefs: ["Art. 1447 CGI", "Art. 1586 ter CGI", "Art. 231 CGI", "Art. 726 CGI", "Art. 719 CGI"],
          quiz: [
            { type: "qcm", q: "La taxe sur les salaires est due notamment par :", choices: ["Toutes les entreprises", "Les employeurs non assujettis à la TVA sur l'essentiel de leurs recettes", "Les micro-entrepreneurs", "Les sociétés cotées seulement"], answer: 1, explain: "Banques, assurances, associations, holdings pures…" },
            { type: "qcm", q: "Droit d'enregistrement sur une cession d'actions :", choices: ["0,1 %", "3 %", "5 %", "5,80 %"], answer: 0, explain: "Parts sociales : 3 % après abattement ; fonds : jusqu'à 5 %." },
            { type: "vf", q: "Les taxes sur l'affectation des véhicules de tourisme sont déductibles du résultat.", answer: false, explain: "Non déductibles : à réintégrer." },
            { type: "qcm", q: "La CVAE est :", choices: ["Supprimée en 2015", "En voie de suppression progressive, calendrier reporté", "Doublée en 2024", "Une taxe sur les salaires"], answer: 1, explain: "À vérifier à chaque loi de finances." },
          ],
          flashcards: [{ q: "CET ?", a: "Contribution économique territoriale = CFE (valeur locative) + CVAE (valeur ajoutée, en extinction progressive)." }],
        },
      ],
    },
    {
      id: "approfondissement",
      title: "Approfondissement : incitations, groupes, restructurations, dirigeant, transmission",
      level: 2,
      summary: "CIR, IP box, mécénat ; holdings, mère-fille, intégration ; fusions et apports ; rémunération, dividendes, plus-values ; Dutreil et transmission.",
      lessons: [
        {
          id: "incitations-fiscales",
          title: "Les incitations fiscales : CIR, CII, JEI, IP box, mécénat, amortissements, zones",
          duration: 18,
          src: P + "incitations-fiscales.md",
          objectives: ["Identifier les incitations accessibles", "Mesurer leur gain", "Sécuriser leur obtention"],
          keyRefs: ["Art. 244 quater B CGI", "Art. 44 sexies-0 A CGI", "Art. 238 CGI", "Art. 238 bis CGI", "Art. 39 A CGI"],
          quiz: [
            { type: "qcm", q: "Taux de l'IP box :", choices: ["0 %", "5 %", "10 %", "15 %"], answer: 2, explain: "Art. 238 CGI, avec ratio nexus." },
            { type: "qcm", q: "Plafond de la réduction mécénat des entreprises :", choices: ["10 000 € ou 1 ‰ du CA", "20 000 € ou 5 ‰ du CA HT (le plus élevé)", "50 % du résultat", "Aucun"], answer: 1, explain: "Excédent reportable sur 5 exercices." },
            { type: "qcm", q: "Taux de base du CIR (jusqu'à 100 M€ de dépenses) :", choices: ["10 %", "20 %", "30 %", "50 %"], answer: 2, explain: "À vérifier ; documentation scientifique indispensable." },
            { type: "vf", q: "Le parrainage avec contrepartie publicitaire proportionnée est déductible comme une charge.", answer: true, explain: "Distinct du mécénat." },
          ],
          flashcards: [{ q: "Ratio nexus ?", a: "Proportion des dépenses de R&D réalisées par l'entreprise elle-même, qui limite l'avantage de l'IP box." }],
        },
        {
          id: "groupes-holdings",
          title: "Groupes et holdings : animation, mère-fille, intégration, charges financières, flux intragroupe",
          duration: 20,
          src: P + "groupes-holdings.md",
          objectives: ["Prouver le caractère animateur", "Chiffrer mère-fille et intégration", "Sécuriser les flux intragroupe"],
          keyRefs: ["Art. 145 et 216 CGI", "Art. 223 A et s. CGI", "Art. 223 B CGI", "Art. 212 bis CGI", "Art. 39, 1-3° CGI", "Art. 256 C CGI"],
          quiz: [
            { type: "qcm", q: "Coût fiscal de la remontée d'un dividende de 1 000 000 € en régime mère-fille (IS 25 %) :", choices: ["0 €", "12 500 €", "50 000 €", "250 000 €"], answer: 1, explain: "Quote-part de 5 % = 50 000 € × 25 %." },
            { type: "qcm", q: "Le rabot des charges financières limite la déduction des charges nettes au plus élevé de :", choices: ["1 M€ ou 10 % du CA", "3 M€ ou 30 % de l'EBITDA fiscal", "5 M€ ou 50 % du résultat", "Aucune limite"], answer: 1, explain: "Art. 212 bis (ATAD)." },
            { type: "vf", q: "La qualification de holding animatrice se prouve par des éléments de fait (animation effective, moyens, décisions).", answer: true, explain: "Contrôle strict." },
            { type: "qcm", q: "L'amendement Charasse vise :", choices: ["Les management fees", "Le rachat d'une société à ses propres actionnaires de contrôle suivi de son intégration", "Les fusions", "La TVA"], answer: 1, explain: "Limitation de la déduction des charges financières." },
          ],
          flashcards: [{ q: "Conditions de l'intégration fiscale ?", a: "Mère à l'IS détenant ≥ 95 % ; exercices de 12 mois coïncidant ; option pour 5 ans." }],
          exercises: [
            {
              id: "calcul-holding-integration",
              type: "calcul",
              title: "Exercice chiffré : holding, mère-fille et intégration",
              statement: HYP + "1) Une filiale distribue **1 000 000 €** de dividendes à sa holding (régime mère-fille, IS à 25 %). 2) Dans un autre groupe, une holding de reprise supporte **200 000 €** d'intérêts d'emprunt (résultat − 200 000 €) et sa cible réalise un bénéfice de **1 000 000 €** (IS à 25 %, on néglige le taux réduit et le rabot).",
              questions: [
                { q: "Quote-part de frais et charges imposable chez la holding ?", answer: 50000, unit: "€", explain: "5 % × 1 000 000 = 50 000 €." },
                { q: "IS dû par la holding sur ces dividendes ?", answer: 12500, unit: "€", explain: "50 000 × 25 % = 12 500 € (coût de 1,25 %)." },
                { q: "Si ces dividendes avaient été versés directement à une personne physique au PFU, quel impôt ?", answer: 300000, unit: "€", explain: "1 000 000 × 30 % = 300 000 €. La holding permet de réinvestir 987 500 € au lieu de 700 000 €." },
                { q: "IS total du groupe de reprise **sans** intégration fiscale ?", answer: 250000, unit: "€", explain: "Cible : 1 000 000 × 25 % ; holding : déficit reportable, IS nul." },
                { q: "IS total **avec** intégration fiscale ?", answer: 200000, unit: "€", explain: "Résultat d'ensemble 800 000 € × 25 % = 200 000 €." },
                { q: "Économie annuelle procurée par l'intégration ?", answer: 50000, unit: "€", explain: "250 000 − 200 000 = 50 000 €." },
              ],
              model: "",
            },
          ],
        },
        {
          id: "restructurations-fiscales",
          title: "Restructurations : fusions, apports partiels, déficits, échange de titres, apport-cession",
          duration: 18,
          src: P + "restructurations-fiscales.md",
          objectives: ["Appliquer le régime de faveur des fusions", "Préserver les déficits", "Utiliser sursis et report"],
          keyRefs: ["Art. 210 A CGI", "Art. 210 B CGI", "Art. 209, II CGI", "Art. 221-5 CGI", "Art. 150-0 B CGI", "Art. 150-0 B ter CGI"],
          quiz: [
            { type: "qcm", q: "En régime de faveur, les plus-values sur biens amortissables apportés sont :", choices: ["Exonérées définitivement", "Réintégrées par l'absorbante, sur 5 ans en principe (15 ans pour les constructions)", "Imposées chez l'absorbée", "Imposées chez les associés"], answer: 1, explain: "Contrepartie : amortissements sur la valeur d'apport." },
            { type: "qcm", q: "Les déficits de l'absorbée sont transférés à l'absorbante :", choices: ["Automatiquement", "Sur agrément (209, II)", "Jamais", "Sur simple option"], answer: 1, explain: "Conditions strictes (poursuite de l'activité…)." },
            { type: "qcm", q: "En cas de cession par la holding des titres apportés dans les 3 ans, le report 150-0 B ter est maintenu si elle réinvestit au moins :", choices: ["30 %", "50 %", "60 %", "100 %"], answer: 2, explain: "Dans les deux ans, dans une activité économique." },
            { type: "vf", q: "Un changement profond d'activité peut faire perdre les déficits reportables.", answer: true, explain: "Art. 221-5 CGI." },
          ],
          flashcards: [{ q: "Sursis (150-0 B) / report (150-0 B ter) ?", a: "Sursis : apport à une société non contrôlée (échange intercalaire) ; report : apport à une société contrôlée par l'apporteur." }],
        },
        {
          id: "dirigeant-associe-fiscalite",
          title: "Le dirigeant et l'associé : rémunération, dividendes, plus-values, actionnariat, IFI",
          duration: 18,
          src: P + "dirigeant-associe-fiscalite.md",
          objectives: ["Comparer rémunération et dividendes", "Imposer une plus-value de cession", "Connaître BSPCE et management packages"],
          keyRefs: ["Art. 62 CGI", "Art. 200 A CGI", "Art. 158, 3-2° CGI", "Art. 150-0 D ter CGI", "Art. 163 bis G CGI", "Art. 167 bis CGI", "Art. 964 et s. CGI (IFI)"],
          quiz: [
            { type: "qcm", q: "Option pour le barème : abattement sur les dividendes :", choices: ["10 %", "20 %", "40 %", "50 %"], answer: 2, explain: "Avec CSG déductible ; option globale pour l'année." },
            { type: "vf", q: "L'abattement de 500 000 € pour départ à la retraite s'applique aussi aux prélèvements sociaux.", answer: false, explain: "Il ne vaut que pour l'impôt sur le revenu." },
            { type: "qcm", q: "Selon le Conseil d'État (2021), les gains de management package acquis en contrepartie des fonctions sont :", choices: ["Des plus-values", "Des traitements et salaires", "Exonérés", "Des BNC"], answer: 1, explain: "Régime spécifique créé ensuite par la loi de finances pour 2025 (à vérifier)." },
            { type: "qcm", q: "L'IFI porte sur :", choices: ["Tout le patrimoine", "Le seul patrimoine immobilier (direct ou indirect)", "Les titres de société", "Les liquidités"], answer: 1, explain: "Biens professionnels exonérés." },
          ],
          flashcards: [{ q: "BSPCE : imposition du gain ?", a: "12,8 % (30 % si moins de 3 ans dans la société) plus prélèvements sociaux." }],
        },
        {
          id: "transmission-entreprise-fiscale",
          title: "Transmettre l'entreprise : barème, Dutreil, donation avant cession, holding de reprise",
          duration: 20,
          src: P + "transmission-entreprise-fiscale.md",
          objectives: ["Calculer des droits de donation", "Mesurer l'effet du Dutreil", "Sécuriser une donation avant cession"],
          keyRefs: ["Art. 777 CGI", "Art. 779 CGI", "Art. 787 B CGI", "Art. 790 CGI", "Art. 669 CGI", "Art. 990 I CGI", "Art. 757 B CGI"],
          quiz: [
            { type: "qcm", q: "Abattement en ligne directe :", choices: ["31 865 €", "100 000 € par parent et par enfant, tous les 15 ans", "152 500 €", "Aucun"], answer: 1, explain: "Art. 779 CGI." },
            { type: "qcm", q: "Réduction de droits pour une donation en pleine propriété par un donateur de moins de 70 ans (Dutreil) :", choices: ["25 %", "50 %", "75 %", "100 %"], answer: 1, explain: "Art. 790 CGI." },
            { type: "qcm", q: "Nue-propriété, usufruitier de 61 à 70 ans (art. 669) :", choices: ["40 %", "50 %", "60 %", "70 %"], answer: 2, explain: "50 % de 51 à 60 ans." },
            { type: "vf", q: "Dans une donation avant cession, le donateur peut récupérer le prix de cession sans risque.", answer: false, explain: "Réappréhension = abus de droit." },
          ],
          flashcards: [
            { q: "Formule rapide des droits dans la tranche à 20 % ?", a: "Droits ≈ 20 % × part taxable − 1 806 €." },
            { q: "Assurance-vie : abattements ?", a: "152 500 € par bénéficiaire (primes avant 70 ans, art. 990 I) ; 30 500 € globalement après 70 ans (art. 757 B)." },
          ],
          exercises: [
            {
              id: "calcul-dutreil",
              type: "calcul",
              title: "Exercice chiffré : la puissance du pacte Dutreil",
              statement: "Un dirigeant de 65 ans donne en **pleine propriété** à ses **deux enfants**, à parts égales, les titres de sa société opérationnelle valant **4 000 000 €**. Aucune donation antérieure. Barème en ligne directe : 5 % jusqu'à 8 072 € ; 10 % jusqu'à 12 109 € ; 15 % jusqu'à 15 932 € ; 20 % jusqu'à 552 324 € ; 30 % jusqu'à 902 838 € ; 40 % jusqu'à 1 805 677 € ; 45 % au-delà. Abattement de 100 000 € par enfant. Réduction de 50 % (art. 790).",
              questions: [
                { q: "Avec Dutreil : valeur taxable par enfant avant abattement ?", answer: 500000, unit: "€", explain: "4 000 000 × 25 % / 2 = 500 000 €." },
                { q: "Part taxable par enfant après abattement ?", answer: 400000, unit: "€", explain: "500 000 − 100 000 = 400 000 €." },
                { q: "Droits par enfant **avant** réduction de 50 % ?", answer: 78194, tolerance: 5, unit: "€", explain: "403,60 + 403,70 + 573,45 + (400 000 − 15 932) × 20 % = 78 194 € (formule rapide : 20 % × 400 000 − 1 806)." },
                { q: "Droits par enfant **après** réduction de 50 % ?", answer: 39097, tolerance: 5, unit: "€", explain: "78 194 / 2 ≈ 39 097 €." },
                { q: "Sans Dutreil, droits par enfant après réduction de 50 % ?", answer: 308697, tolerance: 20, unit: "€", explain: "Part taxable 1 900 000 € : 1 380,75 + 107 278,40 + 105 154,20 + 361 135,60 + 42 445,35 = 617 394,30 € ; réduite de moitié : ≈ 308 697 €." },
              ],
              model: "",
            },
          ],
        },
      ],
    },
    {
      id: "expert",
      title: "International, contrôle et contentieux",
      level: 3,
      summary: "Fiscalité internationale, contrôle fiscal, défense et contentieux, transmission et abus de droit.",
      lessons: [
        {
          id: "fiscalite-internationale",
          title: "Fiscalité internationale de l'entreprise",
          duration: 15,
          src: P + "fiscalite-internationale.md",
          objectives: ["Comprendre les conventions fiscales et les prix de transfert", "Situer BEPS et le Pilier 2"],
          keyRefs: ["Art. 209 CGI", "Art. 57 CGI", "Art. 209 B CGI", "Dir. (UE) 2022/2523"],
          quiz: [
            { type: "qcm", q: "Le principe de territorialité de l'IS signifie que :", choices: ["Tous les bénéfices mondiaux sont imposés en France", "Seuls les bénéfices des entreprises exploitées en France sont imposés", "Les filiales étrangères sont imposées en France", "Il n'y a pas d'IS sur l'export"], answer: 1, explain: "Art. 209, I CGI." },
            { type: "qcm", q: "Le principe de pleine concurrence concerne :", choices: ["Les ententes", "Les prix de transfert entre entreprises liées", "La TVA", "Les marchés publics"], answer: 1, explain: "Art. 57 CGI." },
            { type: "qcm", q: "Seuil du Pilier 2 (impôt minimum mondial) :", choices: ["50 M€", "250 M€", "750 M€", "1 Md€"], answer: 2, explain: "Taux effectif minimal de 15 %." },
            { type: "vf", q: "Une entreprise étrangère sans établissement stable en France n'y est en principe pas imposable sur ses bénéfices d'exploitation (selon les conventions).", answer: true, explain: "Notion d'établissement stable." },
          ],
          flashcards: [{ q: "Art. 209 B CGI ?", a: "Imposition en France des bénéfices d'entités contrôlées établies dans des États à fiscalité privilégiée, sauf activité réelle." }],
        },
        {
          id: "controle-abus-transmission",
          title: "Contrôle fiscal, abus de droit et pacte Dutreil : l'essentiel",
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
          id: "controle-contentieux-defense",
          title: "Contrôle fiscal et contentieux : procédures, garanties, défense",
          duration: 20,
          src: P + "controle-contentieux-defense.md",
          objectives: ["Connaître les formes de contrôle", "Exploiter les garanties", "Conduire le contentieux dans les délais"],
          keyRefs: ["Art. L. 10 LPF", "Art. L. 16 B LPF", "Art. L. 47 A LPF", "Art. L. 55 LPF", "Art. L. 57 LPF", "Art. L. 62 LPF", "Art. L. 169 LPF", "Art. R. 196-1 LPF", "Art. L. 247 LPF"],
          quiz: [
            { type: "qcm", q: "Délai pour répondre à une proposition de rectification :", choices: ["8 jours", "30 jours (prorogeable de 30 jours)", "3 mois", "1 an"], answer: 1, explain: "Art. L. 57 LPF." },
            { type: "qcm", q: "En taxation d'office, la charge de la preuve :", choices: ["Pèse sur l'administration", "Est renversée sur le contribuable", "Est partagée", "N'existe pas"], answer: 1, explain: "D'où l'importance de déposer ses déclarations." },
            { type: "qcm", q: "Le juge des droits d'enregistrement et de l'IFI est :", choices: ["Le tribunal administratif", "Le tribunal judiciaire", "Le Conseil constitutionnel", "La CJUE"], answer: 1, explain: "Impôts directs et TVA : juge administratif." },
            { type: "vf", q: "Le contribuable peut saisir directement le tribunal sans réclamation préalable.", answer: false, explain: "Réclamation préalable obligatoire." },
          ],
          flashcards: [{ q: "Régularisation en cours de contrôle (L. 62) ?", a: "Correction des erreurs de bonne foi pendant la vérification, avec un intérêt de retard réduit." }],
        },
      ],
    },
    {
      id: "optimisation",
      title: "L'optimisation fiscale légale",
      level: 3,
      summary: "La frontière entre optimisation, abus et fraude ; les leviers par situation ; exercices chiffrés ; cas stratégiques ; combinaisons créatives et pistes de réforme.",
      lessons: [
        {
          id: "optimisation-frontiere",
          title: "Optimisation, abus de droit, fraude : la frontière et la méthode",
          duration: 18,
          src: P + "optimisation-frontiere.md",
          objectives: ["Distinguer optimisation, évasion abusive et fraude", "Connaître les instruments anti-abus", "Appliquer le test en six questions"],
          keyRefs: ["Art. L. 64 LPF", "Art. L. 64 A LPF", "Art. 205 A CGI", "Art. 1740 A bis CGI", "Art. 1649 AD CGI (DAC 6)"],
          quiz: [
            { type: "qcm", q: "La clause anti-abus générale en matière d'IS figure à :", choices: ["L. 64 LPF", "205 A CGI", "39 CGI", "787 B CGI"], answer: 1, explain: "Transposition de la directive ATAD." },
            { type: "qcm", q: "Selon Cadbury Schweppes (2006), les dispositifs anti-abus doivent viser :", choices: ["Toute filiale étrangère", "Les montages purement artificiels", "Les PME", "Les dividendes"], answer: 1, explain: "Critère de la substance." },
            { type: "vf", q: "Un conseil qui fournit intentionnellement un montage abusif peut être frappé d'une amende.", answer: true, explain: "Art. 1740 A bis CGI (loi de 2018)." },
            { type: "qcm", q: "Laquelle de ces questions ne fait PAS partie du test d'optimisation ?", choices: ["L'opération a-t-elle des motifs non fiscaux ?", "Les structures ont-elles de la substance ?", "L'économie est-elle la plus élevée possible ?", "Un rescrit est-il possible ?"], answer: 2, explain: "La robustesse prime sur l'économie maximale." },
          ],
          flashcards: [
            { q: "Optimisation / évasion / fraude ?", a: "Choix légal conforme aux textes ; détournement des textes (opération écartée) ; dissimulation volontaire (délit)." },
            { q: "Croë Suisse (CE, 2018) ?", a: "Acte anormal de gestion : opération réalisée dans un intérêt autre que celui de l'entreprise." },
          ],
        },
        {
          id: "optimisation-leviers",
          title: "Les leviers de l'optimisation légale, situation par situation",
          duration: 22,
          src: P + "optimisation-leviers.md",
          objectives: ["Connaître les leviers et leurs limites", "Chiffrer leur effet"],
          quiz: [
            { type: "qcm", q: "Économie maximale annuelle procurée par le taux réduit d'IS (15 % au lieu de 25 % sur 42 500 €) :", choices: ["2 125 €", "4 250 €", "6 375 €", "10 625 €"], answer: 1, explain: "42 500 × 10 points." },
            { type: "qcm", q: "Le carry-back permet :", choices: ["De reporter un bénéfice", "D'imputer un déficit sur le bénéfice de l'exercice précédent et d'obtenir une créance", "D'annuler l'IS", "De déduire les dividendes"], answer: 1, explain: "Limite de 1 M€." },
            { type: "vf", q: "L'épargne salariale peut bénéficier au dirigeant dans les entreprises de moins de 250 salariés.", answer: true, explain: "Sous conditions." },
            { type: "qcm", q: "Une SCI à l'IS permet :", choices: ["D'exonérer la plus-value", "D'amortir l'immeuble, mais alourdit la plus-value de sortie", "D'éviter la taxe foncière", "D'échapper aux loyers"], answer: 1, explain: "Plus-value calculée sur la valeur nette comptable." },
          ],
          flashcards: [{ q: "Sept familles de leviers ?", a: "Structure/régime ; rémunération ; groupe/holding ; investissement/innovation ; immobilier ; cession/transmission ; gestion courante." }],
          exercises: [
            {
              id: "calcul-leviers",
              type: "calcul",
              title: "Exercice chiffré : mesurer les leviers",
              statement: HYP + "Calculez l'effet de chaque levier (IS au taux normal de 25 % sauf indication).",
              questions: [
                { q: "**Mécénat** : une société au chiffre d'affaires HT de 2 000 000 € donne 30 000 € à une fondation reconnue d'utilité publique. Réduction d'impôt de l'exercice ?", answer: 12000, unit: "€", explain: "Plafond : le plus élevé de 20 000 € ou 5 ‰ × 2 000 000 = 10 000 € → 20 000 € ; réduction : 60 % × 20 000 = 12 000 € ; l'excédent de 10 000 € est reportable sur 5 exercices." },
                { q: "**IP box** : redevances nettes de licence d'un brevet 1 000 000 €, ratio nexus 100 %. IS au taux réduit ?", answer: 100000, unit: "€", explain: "10 % au lieu de 25 % : économie de 150 000 €." },
                { q: "**Carry-back** : déficit de N 300 000 €, bénéfice de N−1 500 000 € imposé à 25 %. Créance sur le Trésor ?", answer: 75000, unit: "€", explain: "300 000 × 25 % = 75 000 € (dans la limite d'1 M€)." },
                { q: "**CIR** : dépenses éligibles retenues 600 000 €. Crédit d'impôt (taux de 30 %) ?", answer: 180000, unit: "€", explain: "600 000 × 30 % = 180 000 €." },
                { q: "**Apport-cession** : la holding cède 2 ans après l'apport, pour 2 500 000 €, les titres apportés. Réinvestissement minimal pour conserver le report ?", answer: 1500000, unit: "€", explain: "60 % du produit de cession, dans les deux ans, dans une activité économique." },
                { q: "**Abattement retraite** : plus-value de 900 000 €. Impôt sur le revenu au taux de 12,8 % après abattement de 500 000 € ?", answer: 51200, unit: "€", explain: "(900 000 − 500 000) × 12,8 % = 51 200 €." },
                { q: "Même cas : prélèvements sociaux (17,2 %) ?", answer: 154800, unit: "€", explain: "Calculés sur la totalité : 900 000 × 17,2 % = 154 800 € — l'abattement ne s'applique pas aux prélèvements sociaux." },
              ],
              model: "",
            },
          ],
        },
        {
          id: "optimisation-cas-strategiques",
          title: "Construire une stratégie fiscale : méthode et cas pratiques",
          duration: 16,
          src: P + "optimisation-cas-strategiques.md",
          objectives: ["Appliquer la méthode en sept étapes", "Combiner les leviers dans une stratégie robuste", "Rédiger une consultation fiscale"],
          quiz: [
            { type: "qcm", q: "Première étape d'une stratégie fiscale :", choices: ["Choisir le dispositif le plus avantageux", "Comprendre et hiérarchiser les objectifs du client", "Créer une holding", "Demander un rescrit"], answer: 1, explain: "Le dispositif découle des objectifs." },
            { type: "vf", q: "Le pacte Dutreil est compatible avec une cession des titres par les donataires un an après la donation.", answer: false, explain: "L'engagement individuel de conservation (4 ans) serait rompu." },
            { type: "qcm", q: "Erreur classique de chronologie :", choices: ["Donation avant l'accord sur le prix", "Cession signée avant la donation", "Rescrit avant l'opération", "Pacte avant la transmission"], answer: 1, explain: "La donation doit précéder l'accord sur la chose et le prix." },
          ],
          flashcards: [{ q: "Plan d'une consultation fiscale ?", a: "Faits et objectifs ; scénario de référence chiffré ; scénarios (mécanisme, conditions, gain, risques) ; recommandation ; calendrier ; vigilance." }],
          exercises: [
            {
              id: "cas-cession-dirigeant",
              type: "cas-pratique",
              title: "Cas stratégique 1 : le dirigeant qui veut vendre",
              timerMin: 90,
              statement: HYP + `M. Durand, 62 ans, marié sous le régime de la communauté légale, deux enfants majeurs, détient avec son épouse 100 % d'une SAS industrielle (titres communs, prix de revient 100 000 €), valorisée 6 000 000 €. Un acquéreur se manifeste ; la cession pourrait intervenir dans 12 à 18 mois. M. Durand souhaite : prendre sa retraite ; conserver environ 2 000 000 € pour son couple ; transmettre une partie significative de la valeur à ses enfants ; réinvestir une partie dans une autre PME avec l'un de ses enfants.

Proposez une stratégie fiscale légale, chiffrée à grands traits, avec ses conditions, son calendrier et ses risques.`,
              rubric: [
                "Scénario de référence chiffré (plus-value de 5,9 M€ au PFU, contributions sur les hauts revenus)",
                "Donation avant cession d'une partie des titres aux enfants : purge de la plus-value, droits de donation (4 abattements de 100 000 € car titres communs, réduction de 50 %), conditions de chronologie et d'absence de réappréhension",
                "Incompatibilité du Dutreil avec une cession rapide (engagement de 4 ans)",
                "Apport-cession d'une partie à une holding (150-0 B ter) et réinvestissement de 60 % dans la nouvelle PME",
                "Abattement retraite de 500 000 € : conditions, articulation avec les autres dispositifs, prélèvements sociaux sur la totalité",
                "Droit civil : communauté (consentement du conjoint), réserve héréditaire, donation-partage",
                "Risques : abus de droit, chronologie, rescrit, calendrier des actes",
              ],
              model: `**Scénario de référence** : cession directe de 100 % pour 6 000 000 € ; plus-value 5 900 000 € ; PFU (30 %) ≈ 1 770 000 €, auxquels s'ajoutent les contributions sur les hauts revenus (contribution exceptionnelle, éventuelle contribution différentielle) ; puis droits de donation si M. et Mme Durand transmettent ensuite des liquidités à leurs enfants.

**Stratégie proposée (à valider au cas par cas)**
1. **Donation avant cession** d'environ 2 000 000 € de titres aux deux enfants (donation-partage), **avant tout accord sur la chose et le prix** avec l'acquéreur. Les titres étant communs, les deux époux donnent : 4 abattements de 100 000 € ; donateurs de moins de 70 ans, en pleine propriété : pas de réduction de 50 % hors Dutreil (la réduction de l'art. 790 est liée au Dutreil) — vérifier. Les enfants cèdent ensuite leurs titres : plus-value quasi nulle (prix de revient = valeur de donation). **Conditions** : donation réelle, enfants libres du prix, pas de réappréhension par les parents (sinon abus de droit) ; prix de cession cohérent avec la valeur déclarée.
2. **Pas de pacte Dutreil** : il impose une conservation de 4 ans par les donataires, incompatible avec la cession envisagée.
3. **Apport à une holding** contrôlée par le couple d'une partie des titres (par exemple 2 000 000 €) **avant** la cession : plus-value en **report** (150-0 B ter) ; la holding cède et **réinvestit au moins 60 %** du produit dans la nouvelle PME reprise avec un enfant (objectif économique réel). Le solde reste dans la holding (placements, mais attention aux projets de taxation des holdings patrimoniales).
4. **Cession directe** du solde des titres par M. et Mme Durand (environ 2 000 000 €) en bénéficiant, si les conditions sont réunies (fonctions de direction pendant 5 ans, détention d'au moins 25 %, départ à la retraite dans les 24 mois), de l'**abattement fixe de 500 000 €** sur l'IR ; prélèvements sociaux sur la totalité ; vérifier l'articulation avec les autres régimes (titres apportés en report non éligibles à ce titre).
5. **Calendrier** : rescrit éventuel (valeur, chronologie) ; donation-partage ; apport à la holding ; négociation et signature de la cession ; réinvestissement dans les 2 ans ; retraite.

**Points de vigilance** : chronologie (aucun engagement de cession avant la donation et l'apport), cohérence des valeurs, consentement du conjoint (titres communs), réserve héréditaire et égalité entre enfants (donation-partage), substance de la holding, suivi du réinvestissement, contributions sur les hauts revenus. Gain indicatif : plusieurs centaines de milliers d'euros d'impôt évités ou différés, de manière légale et documentée.`,
            },
            {
              id: "cas-pme-croissance",
              type: "cas-pratique",
              title: "Cas stratégique 2 : la PME en croissance",
              timerMin: 90,
              statement: HYP + `Deux associés à parts égales détiennent directement la SAS Delta (édition de logiciels, 80 salariés, bénéfice fiscal 1 500 000 €, dont une large part issue de licences de son logiciel). Ils veulent : racheter un concurrent valorisé 4 000 000 € par emprunt bancaire ; attirer trois cadres clés ; développer leur R&D ; préparer à terme leur propre rémunération et leur patrimoine.

Proposez une architecture fiscale légale et ses conditions.`,
              rubric: [
                "Création d'une holding (apport des titres en report 150-0 B ter, sans cession) ; holding animatrice avec substance",
                "Acquisition par la holding (ou par Delta) avec dette ; intégration fiscale à 95 % ; rabot des charges financières ; amendement Charasse (non applicable ici, vendeur tiers)",
                "Mère-fille pour les dividendes ; management fees réelles",
                "CIR sur la R&D et IP box sur les revenus de licence (ratio nexus)",
                "Intéressement des cadres : BSPCE si conditions remplies, actions gratuites, management package (jurisprudence 2021, régime 2025)",
                "Épargne salariale, PER ; arbitrage rémunération / dividendes des fondateurs",
                "Risques : substance, anti-abus 205 A, documentation, rescrits",
              ],
              model: `**Architecture proposée**
1. **Holding** : chaque associé apporte ses titres Delta à une holding commune (ou chacun à sa holding, puis holding commune) : plus-value en **report** (150-0 B ter) ; la holding devient **animatrice** (convention d'animation, comités, prestations réelles, personnel) — condition de nombreux régimes futurs (Dutreil, IFI).
2. **Acquisition** du concurrent par la holding, financée par emprunt ; **intégration fiscale** (holding, Delta, cible détenues à ≥ 95 %) : les intérêts de la holding s'imputent sur les bénéfices du groupe, dans la limite du **rabot** (3 M€ / 30 % de l'EBITDA fiscal : ici non contraignant). Vendeur tiers : l'**amendement Charasse** ne joue pas.
3. **Flux** : dividendes intragroupe neutralisés (quote-part de 1 % en intégration) ; **management fees** pour des services réels à prix de marché ; éventuellement **groupe TVA**.
4. **Innovation** : **CIR** sur les dépenses de R&D documentées (dossier scientifique, temps passés, rescrit si montants élevés) ; **IP box** à 10 % sur les revenus nets de licence du logiciel protégé, avec suivi du ratio nexus par actif ou famille.
5. **Cadres clés** : **BSPCE** si Delta remplit les conditions (société de moins de 15 ans, non cotée ou petite capitalisation, détention majoritaire par des personnes physiques…) — gain taxé à 12,8 % + PS ; sinon actions gratuites ou management package (attention à la requalification en salaires : CE 2021 ; régime de l'art. 163 bis H issu de la loi de finances pour 2025, à vérifier).
6. **Fondateurs** : arbitrage salaire / dividendes (PFU) ; épargne salariale (intéressement, PEE, abondement) dont ils peuvent bénéficier ; PER ; remontée des dividendes dans la holding (mère-fille) pour réinvestir à 1,25 % de coût fiscal plutôt que de distribuer.

**Vigilance** : substance de la holding (sinon perte des régimes et risque 205 A), documentation des flux intragroupe, conditions BSPCE, rescrits CIR, cohérence de la valorisation lors de l'apport.`,
            },
            {
              id: "cas-transmission-familiale",
              type: "cas-pratique",
              title: "Cas stratégique 3 : la transmission familiale",
              timerMin: 90,
              statement: HYP + `Mme Lefèvre, 68 ans, veuve, détient 100 % d'une SAS de distribution valorisée 3 000 000 €. Son fils Paul, 40 ans, y est directeur commercial ; sa fille Claire, 37 ans, médecin, ne souhaite pas s'impliquer dans l'entreprise. Mme Lefèvre souhaite : transmettre le contrôle à Paul ; respecter l'égalité entre ses enfants ; conserver des revenus ; réduire au maximum les droits ; éviter les conflits.

Proposez une stratégie de transmission légale.`,
              rubric: [
                "Pacte Dutreil (engagement réputé acquis ou conclu), fonction de direction (Paul), engagements de conservation",
                "Donation avant 70 ans en pleine propriété (réduction de 50 %) ou nue-propriété (art. 669 : 60 % à 68 ans) avec usufruit limité aux bénéfices",
                "Donation-partage : valeurs figées, égalité, soulte ou attribution d'autres biens / actions de préférence à Claire",
                "Paiement différé et fractionné des droits",
                "Revenus de Mme Lefèvre : usufruit, rémunération, holding",
                "Gouvernance : actions de préférence, pacte, statuts ; assurance-vie ; consentement de Claire",
              ],
              model: `**Stratégie proposée**
1. **Pacte Dutreil** : engagement collectif (réputé acquis si les conditions de détention et de fonction sont réunies, sinon conclu dès maintenant pour 2 ans), puis engagement individuel de 4 ans des donataires ; **Paul** exerce la **fonction de direction** (il peut devenir président ou directeur général).
2. **Donation-partage avant les 70 ans** de Mme Lefèvre. Deux options :
   - **Pleine propriété** : base taxable 25 % de la valeur (Dutreil) ; réduction de **50 %** des droits (donatrice de moins de 70 ans) ; mais Mme Lefèvre perd ses revenus.
   - **Nue-propriété avec réserve d'usufruit** : valeur de la nue-propriété à 68 ans = **60 %** (art. 669) ; Dutreil applicable si les statuts limitent le vote de l'usufruitière à l'affectation des bénéfices ; Mme Lefèvre conserve les **dividendes** ; au décès, l'usufruit s'éteint sans droits. La réduction de 50 % ne joue pas en nue-propriété : comparer les deux options chiffrées.
3. **Égalité** : la donation-partage **fige les valeurs** ; Paul reçoit le **contrôle** (actions ordinaires) ; Claire reçoit soit des **actions de préférence** sans droit de vote à dividende prioritaire (elle reste associée sans s'impliquer), soit d'autres biens, soit une **soulte** versée par Paul (financée éventuellement par une **holding de reprise** remboursée par les dividendes de la société). Claire doit **consentir** à la donation-partage.
4. **Droits** : **paiement différé** pendant 5 ans puis **fractionné** sur 10 ans, à taux réduit (Dutreil).
5. **Compléments** : assurance-vie au profit de Claire si l'équilibre l'exige (attention : primes versées après 70 ans : abattement global de 30 500 €) ; pacte d'associés (préemption, sortie conjointe, gouvernance) ; mandat de protection future.

**Vigilance** : respect des conditions Dutreil pendant toute la durée des engagements (fonction de direction, conservation), rédaction des statuts (usufruit), valorisation documentée (expert), égalité réelle (réserve héréditaire), rescrit sur l'éligibilité de l'activité.`,
            },
          ],
        },
        {
          id: "pistes-creatives-reformes",
          title: "Fiscalité créative : combinaisons légales innovantes et pistes de réforme",
          duration: 15,
          src: P + "pistes-creatives-reformes.md",
          objectives: ["Imaginer des combinaisons légales au service d'objectifs réels", "Développer un esprit critique sur la loi fiscale"],
          quiz: [
            { type: "vf", q: "Les pistes de réforme présentées dans la leçon sont applicables aujourd'hui.", answer: false, explain: "Ce sont des propositions de réflexion (de lege ferenda)." },
            { type: "qcm", q: "Une fondation actionnaire permet notamment :", choices: ["De récupérer les titres plus tard", "D'assurer la pérennité et l'indépendance de l'entreprise, la transmission étant exonérée de droits", "D'éviter l'IS", "De distribuer sans impôt aux héritiers"], answer: 1, explain: "Transfert irréversible ; gouvernance à soigner." },
            { type: "qcm", q: "La chaîne « CIR → brevet → IP box » est légitime parce que :", choices: ["Elle réduit l'impôt au maximum", "Chaque étape correspond à l'objectif du législateur (R&D réellement faite en France)", "Elle évite le contrôle", "Elle est secrète"], answer: 1, explain: "Conformité à l'objectif des textes." },
          ],
          flashcards: [{ q: "Critères d'une combinaison créative légale ?", a: "Objectifs non fiscaux réels, conformité à l'objectif des textes, substance, documentation, rescrit." }],
          exercises: [
            {
              id: "note-reforme-fiscale",
              type: "redaction",
              title: "Note de réflexion : proposer une réforme fiscale",
              statement: "Choisissez l'une des pistes de réforme de la leçon (ou une piste de votre invention) et rédigez une note d'une à deux pages : objectif de politique publique, mécanisme, coût et financement, risques d'abus et garde-fous, compatibilité avec le droit de l'Union (aides d'État, libertés de circulation) et avec la Constitution (égalité devant les charges publiques).",
              rubric: ["Objectif clairement formulé", "Mécanisme précis", "Évaluation du coût", "Risques d'abus et garde-fous", "Compatibilité européenne et constitutionnelle", "Clarté et concision"],
              model: "Pas de corrigé unique. Une bonne note identifie un problème réel (par exemple l'arbitrage artificiel salaire / dividendes), propose un mécanisme simple, en évalue le coût, anticipe les abus (seuils, conditions de durée, substance), et vérifie la compatibilité avec le principe d'égalité et le régime européen des aides d'État.",
            },
          ],
        },
      ],
    },
  ],
  decisions: [
    { id: "janfin", name: "Janfin", court: "CE", date: "27 septembre 2006", topic: "Abus de droit", solution: "L'administration peut écarter les actes qui, recherchant le bénéfice d'une application littérale des textes à l'encontre des objectifs de leurs auteurs, n'ont pu être inspirés que par le motif d'éluder l'impôt (fraude à la loi), même hors du champ de la procédure de répression des abus de droit de l'époque.", scope: "Consécration de la fraude à la loi ; inspiré la réécriture de l'art. L. 64 LPF en 2008.", status: "codifié", statusNote: "Art. L. 64 LPF (et L. 64 A pour le but principalement fiscal depuis 2020)." },
    { id: "croe-suisse", name: "Sté Croë Suisse", court: "CE, plén.", date: "21 décembre 2018", topic: "Acte anormal de gestion", solution: "Constitue un acte anormal de gestion l'acte ou l'opération que l'entreprise a décidé de réaliser dans un intérêt autre que le sien.", scope: "Définition de référence de l'acte anormal de gestion.", status: "en vigueur" },
    { id: "cadbury", name: "Cadbury Schweppes", court: "CJCE", date: "12 septembre 2006", number: "aff. C-196/04", topic: "Liberté d'établissement et anti-abus", solution: "Une législation sur les sociétés étrangères contrôlées n'est compatible avec la liberté d'établissement que si elle vise les montages purement artificiels destinés à éluder l'impôt.", scope: "Critère de la substance.", status: "en vigueur" },
    { id: "management-packages-2021", name: "Management packages", court: "CE, plén.", date: "13 juillet 2021", topic: "Imposition des dirigeants", solution: "Les gains réalisés par des dirigeants sur des instruments financiers acquis ou souscrits en contrepartie de leurs fonctions sont imposables dans la catégorie des traitements et salaires.", scope: "Requalification des management packages.", status: "infléchi", statusNote: "Régime spécifique créé par la loi de finances pour 2025 (art. 163 bis H CGI) — à vérifier." },
  ],
  reforms: [
    { date: "2018-01-01", title: "Prélèvement forfaitaire unique et baisse programmée de l'IS", summary: "Flat tax sur les revenus du capital ; IFI remplace l'ISF ; trajectoire de baisse de l'IS vers 25 % (atteint en 2022)." },
    { date: "2018-10-23", title: "Loi relative à la lutte contre la fraude", summary: "Assouplissement du verrou de Bercy, CJIP en matière fiscale, amende des conseils promoteurs de montages abusifs." },
    { date: "2019-01-01", title: "Transposition de la directive ATAD", summary: "Rabot des charges financières (212 bis), clause anti-abus générale en matière d'IS (205 A)." },
    { date: "2020-01-01", title: "Mini-abus de droit", summary: "Art. L. 64 A LPF : actes à but principalement fiscal." },
    { date: "2022-05-15", title: "Option IS de l'entrepreneur individuel", summary: "Assimilation à une EURL dans le cadre du nouveau statut de l'entrepreneur individuel." },
    { date: "2023-01-01", title: "Groupe TVA", summary: "Assujetti unique pour les entités étroitement liées (art. 256 C CGI)." },
    { date: "2024-01-01", title: "Impôt minimum mondial (Pilier 2)", summary: "Transposition de la directive (UE) 2022/2523 pour les groupes de plus de 750 M€." },
    { date: "2025-02-14", title: "Loi de finances pour 2025", summary: "Contributions exceptionnelles (grandes entreprises, hauts revenus), régime des management packages — à vérifier." },
  ],
  glossary: [
    { term: "Acte anormal de gestion", def: "Opération réalisée dans un intérêt autre que celui de l'entreprise ; ses effets fiscaux sont neutralisés (CE, 2018, Croë Suisse)." },
    { term: "Rescrit", def: "Prise de position formelle de l'administration fiscale, opposable (art. L. 80 B LPF)." },
    { term: "Pacte Dutreil", def: "Régime d'exonération partielle (75 %) de droits de mutation pour la transmission d'entreprises (art. 787 B CGI)." },
    { term: "Intégration fiscale", def: "Régime de groupe permettant la compensation des résultats des sociétés détenues à 95 %." },
    { term: "Holding animatrice", def: "Holding qui participe activement à la conduite de la politique du groupe et au contrôle de ses filiales." },
    { term: "Quote-part de frais et charges", def: "Fraction (5 % ou 1 %) des dividendes mère-fille réintégrée dans le résultat imposable." },
    { term: "Report d'imposition", def: "Imposition d'une plus-value constatée mais reportée à un événement ultérieur (150-0 B ter)." },
    { term: "Sursis d'imposition", def: "Opération intercalaire : la plus-value n'est pas constatée ; elle sera calculée lors de la cession ultérieure (150-0 B)." },
    { term: "IP box", def: "Taux réduit d'IS (10 %) sur les revenus de la propriété industrielle et des logiciels (art. 238 CGI)." },
    { term: "Carry-back", def: "Report en arrière d'un déficit sur le bénéfice de l'exercice précédent, générant une créance sur le Trésor." },
    { term: "Abus de droit", def: "Acte fictif ou à but exclusivement fiscal contraire à l'objectif des textes (art. L. 64 LPF)." },
    { term: "Substance", def: "Réalité économique d'une structure (moyens, décisions, risques), critère central de l'anti-abus." },
    { term: "DAC 6", def: "Obligation de déclarer les dispositifs transfrontières de planification fiscale à caractère potentiellement agressif." },
    { term: "Ratio nexus", def: "Rapport limitant l'avantage de l'IP box à la part de R&D réalisée par l'entreprise elle-même." },
    { term: "Exit tax", def: "Imposition des plus-values latentes sur participations lors du transfert du domicile fiscal hors de France (art. 167 bis)." },
  ],
};
