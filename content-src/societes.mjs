const P = "packs/societes/";

export default {
  id: "societes",
  version: "2026.10.2",
  title: "Droit des sociétés",
  branch: "Droit des affaires",
  icon: "🏢",
  color: "#1f6f78",
  order: 11,
  updatedAt: "2026-10-05",
  description: "Droit commun, SARL, SAS, SA et gouvernance, droits des associés et abus, dirigeants et responsabilités, cessions, groupes et restructurations.",
  modules: [
    {
      id: "socle",
      title: "Le socle commun et les formes sociales",
      level: 1,
      summary: "Définition, intérêt social et loi PACTE, personnalité morale, choix de la forme, SARL et SAS.",
      lessons: [
        {
          id: "droit-commun-societes",
          title: "La société : définition, intérêt social, personnalité morale, formes",
          duration: 18,
          src: P + "droit-commun-societes.md",
          objectives: ["Identifier les éléments constitutifs", "Mesurer l'apport de la loi PACTE", "Choisir une forme sociale adaptée"],
          keyRefs: ["Art. 1832 C. civ.", "Art. 1833 C. civ.", "Art. 1835 C. civ.", "Art. 1842 C. civ.", "Art. L. 210-6 C. com.", "Art. L. 210-10 C. com.", "Art. L. 235-1 C. com."],
          quiz: [
            { type: "qcm", q: "Depuis la loi PACTE, la société est gérée :", choices: ["Dans l'intérêt exclusif des associés", "Dans son intérêt social, en prenant en considération les enjeux sociaux et environnementaux", "Dans l'intérêt des salariés", "Selon sa raison d'être obligatoire"], answer: 1, explain: "Art. 1833 al. 2 C. civ." },
            { type: "vf", q: "La raison d'être est obligatoire pour toute société.", answer: false, explain: "Elle est facultative (art. 1835) ; obligatoire seulement pour la société à mission." },
            { type: "qcm", q: "Capital minimum d'une SA :", choices: ["1 €", "7 500 €", "37 000 €", "225 000 €"], answer: 2, explain: "37 000 € ; SARL et SAS : capital libre." },
            { type: "qcm", q: "Depuis Cass. com., 29 nov. 2023, la reprise d'un acte de la société en formation :", choices: ["Exige la mention « au nom de la société en formation » à peine de nullité", "Dépend de la commune intention des parties appréciée souverainement par le juge", "Est impossible", "Est automatique"], answer: 1, explain: "Revirement : abandon de l'approche formaliste." },
            { type: "qcm", q: "Depuis 2023, les formalités d'entreprise passent par :", choices: ["Les CFE", "Le guichet unique électronique (INPI)", "Les greffes exclusivement", "Les CCI"], answer: 1, explain: "Guichet unique et registre national des entreprises." },
          ],
          flashcards: [
            { q: "Art. 1833 al. 2 (PACTE) ?", a: "La société est gérée dans son intérêt social, en prenant en considération les enjeux sociaux et environnementaux de son activité." },
            { q: "Société à mission : éléments ?", a: "Raison d'être + objectifs sociaux et environnementaux statutaires + comité de mission + vérification par un OTI (art. L. 210-10)." },
            { q: "Effet de la nullité d'une société ?", a: "Pas de rétroactivité : effets d'une dissolution (art. 1844-15)." },
          ],
        },
        {
          id: "sarl-sas",
          title: "SARL et SAS : fonctionnement, décisions, cessions, clauses",
          duration: 20,
          src: P + "sarl-sas.md",
          objectives: ["Appliquer les règles légales de la SARL", "Exploiter la liberté statutaire de la SAS", "Articuler statuts et pacte d'associés"],
          keyRefs: ["Art. L. 223-14 C. com.", "Art. L. 223-25 C. com.", "Art. L. 223-29 C. com.", "Art. L. 227-5 C. com.", "Art. L. 227-6 C. com.", "Art. L. 227-9 C. com.", "Art. L. 227-13 à L. 227-19 C. com."],
          quiz: [
            { type: "qcm", q: "La révocation sans juste motif du gérant de SARL :", choices: ["Est nulle", "Peut donner lieu à dommages-intérêts", "Est impossible", "Exige l'unanimité"], answer: 1, explain: "Art. L. 223-25." },
            { type: "qcm", q: "Durée maximale d'une clause d'inaliénabilité en SAS :", choices: ["2 ans", "5 ans", "10 ans", "Illimitée"], answer: 2, explain: "Art. L. 227-13." },
            { type: "vf", q: "En SAS, l'approbation des comptes peut être confiée au président par les statuts.", answer: false, explain: "Matière réservée à la collectivité des associés (art. L. 227-9)." },
            { type: "qcm", q: "La violation d'un pacte d'associés se sanctionne en principe par :", choices: ["La nullité de la cession", "Des dommages-intérêts", "La dissolution", "Une amende"], answer: 1, explain: "Effet relatif ; exécution forcée seulement dans certains cas (promesse, pacte de préférence)." },
            { type: "qcm", q: "Un DG de SAS peut représenter la société à l'égard des tiers :", choices: ["Toujours", "Si les statuts le prévoient expressément", "Jamais", "Si l'AG l'autorise à chaque acte"], answer: 1, explain: "Art. L. 227-6 al. 3." },
          ],
          flashcards: [
            { q: "Agrément d'un tiers en SARL ?", a: "Majorité des associés représentant au moins la moitié des parts (L. 223-14), sauf majorité statutaire plus forte." },
            { q: "Matières réservées aux associés de SAS (L. 227-9) ?", a: "Capital, fusion, scission, dissolution, transformation, nomination des CAC, comptes annuels et bénéfices." },
          ],
        },
        {
          id: "societes-civiles-snc",
          src: P + "societes-civiles-snc.md",
          duration: 14,
          quiz: [
            { type: "qcm", q: "La responsabilité des associés de société civile est :", choices: ["Limitée aux apports", "Indéfinie et solidaire", "Indéfinie, non solidaire, proportionnelle aux parts", "Nulle"], answer: 2, explain: "Art. 1857." },
            { type: "qcm", q: "Avant de poursuivre un associé de SNC, le créancier doit :", choices: ["Rien", "Mettre vainement en demeure la société", "Obtenir un jugement contre la société", "Saisir le juge-commissaire"], answer: 1, explain: "Art. L. 221-1." },
            { type: "vf", q: "La cession de parts de SNC requiert l'unanimité.", answer: true, explain: "Art. L. 221-13." },
            { type: "qcm", q: "Un loyer excessif versé par la société d'exploitation à la SCI du dirigeant peut constituer :", choices: ["Une économie fiscale", "Un abus de biens sociaux et un acte anormal de gestion", "Une provision", "Rien"], answer: 1, explain: "Et une convention réglementée." }
          ],
          flashcards: [{ q: "Art. 1858 C. civ. ?", a: "Les créanciers ne poursuivent les associés qu'après vaines poursuites de la personne morale ; la déclaration à la procédure collective suffit (ch. mixte 2007)." }],
          title: "SNC, sociétés civiles et SCI",
          objectives: ["Mesurer la responsabilité indéfinie des associés", "Utiliser la SCI dans la gestion patrimoniale du chef d'entreprise"],
          outline: [
            "La SNC : associés commerçants, responsabilité indéfinie et solidaire, unanimité",
            "La société civile : objet civil, responsabilité indéfinie et proportionnelle (art. 1857), poursuites préalables de la société (art. 1858)",
            "La SCI : détention de l'immobilier d'exploitation, démembrement, fiscalité (IR / IS)",
            "Cession de parts (art. 1861), retrait (art. 1869)",
          ],
          keyRefs: ["Art. L. 221-1 C. com.", "Art. 1857 C. civ.", "Art. 1858 C. civ.", "Art. 1861 C. civ.", "Art. 1869 C. civ."],
        },
      ],
    },
    {
      id: "gouvernance",
      title: "Gouvernance, associés et dirigeants",
      level: 2,
      summary: "SA et gouvernance, droits des associés et abus, statut et responsabilités des dirigeants.",
      lessons: [
        {
          id: "sa-gouvernance",
          title: "La SA : organes, assemblées, conventions réglementées",
          duration: 18,
          src: P + "sa-gouvernance.md",
          objectives: ["Comparer les deux modes de gouvernance", "Calculer quorum et majorités", "Appliquer la procédure des conventions réglementées"],
          keyRefs: ["Art. L. 225-35 C. com.", "Art. L. 225-38 C. com.", "Art. L. 225-43 C. com.", "Art. L. 225-55 C. com.", "Art. L. 225-56 C. com.", "Art. L. 225-18-1 C. com."],
          quiz: [
            { type: "qcm", q: "Le DG d'une SA est révocable :", choices: ["Pour juste motif seulement", "À tout moment, avec dommages-intérêts si sans juste motif (sauf s'il est président)", "Par l'AGE uniquement", "Jamais pendant 6 ans"], answer: 1, explain: "Art. L. 225-55." },
            { type: "vf", q: "Depuis 2019, les abstentions sont comptées comme des votes contre en assemblée de SA.", answer: false, explain: "Loi du 19 juill. 2019 : seules les voix exprimées comptent." },
            { type: "qcm", q: "Seuil de détention d'un actionnaire déclenchant la procédure des conventions réglementées :", choices: ["5 %", "10 %", "25 %", "33 %"], answer: 1, explain: "Plus de 10 % des droits de vote." },
            { type: "qcm", q: "Proportion minimale de chaque sexe au conseil des grandes SA :", choices: ["20 %", "30 %", "40 %", "50 %"], answer: 2, explain: "Loi Copé-Zimmermann, 2011." },
            { type: "qcm", q: "Une caution donnée par une SA sans autorisation du conseil est :", choices: ["Valable", "Inopposable à la société", "Nulle de nullité absolue", "Une infraction"], answer: 1, explain: "Art. L. 225-35 al. 4." },
          ],
          flashcards: [
            { q: "Quorum et majorité en AGE de SA ?", a: "Quorum 1/4 (1re convocation), 1/5 (2e) ; majorité des 2/3 des voix exprimées." },
            { q: "Conventions interdites (L. 225-43) ?", a: "Prêts, découverts, cautions de la société au profit d'un administrateur personne physique ou d'un DG." },
          ],
        },
        {
          id: "droits-associes-abus",
          title: "Les droits des associés ; abus de majorité, de minorité, d'égalité",
          duration: 18,
          src: P + "droits-associes-abus.md",
          objectives: ["Caractériser chaque abus", "Choisir la sanction adaptée", "Protéger un minoritaire"],
          keyRefs: ["Art. 1844 C. civ.", "Art. 1844-1 C. civ.", "Art. 1844-10 C. civ.", "Art. 1843-4 C. civ.", "Art. L. 225-231 C. com.", "Art. 145 CPC"],
          quiz: [
            { type: "qcm", q: "L'abus de majorité suppose :", choices: ["Une perte pour la société", "Une décision contraire à l'intérêt social prise dans l'unique dessein de favoriser la majorité au détriment de la minorité", "Une fraude fiscale", "Une décision prise à l'unanimité"], answer: 1, explain: "Cass. com., 18 avr. 1961." },
            { type: "qcm", q: "Face à un abus de minorité, le juge peut :", choices: ["Décider que son jugement vaut vote", "Désigner un mandataire ad hoc pour voter", "Exclure le minoritaire", "Dissoudre d'office"], answer: 1, explain: "Flandin, Cass. com., 9 mars 1993." },
            { type: "qcm", q: "En cas de démembrement, le vote sur l'affectation des bénéfices appartient :", choices: ["Au nu-propriétaire", "À l'usufruitier", "Aux deux conjointement", "Au gérant"], answer: 1, explain: "Art. 1844 al. 3 (loi 2019)." },
            { type: "vf", q: "L'expert de l'art. 1843-4 peut écarter les règles de valorisation prévues par le pacte.", answer: false, explain: "Depuis 2014, il doit les appliquer." },
          ],
          flashcards: [
            { q: "Seuil de l'expertise de gestion en SA/SAS ? en SARL ?", a: "5 % du capital (L. 225-231) ; 10 % en SARL (L. 223-37)." },
            { q: "Définition de l'abus de minorité ?", a: "Attitude contraire à l'intérêt général de la société, empêchant une opération essentielle, dans l'unique dessein de favoriser ses propres intérêts (Com., 15 juill. 1992)." },
          ],
        },
        {
          id: "dirigeants-responsabilites",
          title: "Dirigeants : statut et responsabilités civile, pénale, procédures collectives",
          duration: 20,
          src: P + "dirigeants-responsabilites.md",
          objectives: ["Identifier le bon fondement selon le demandeur", "Caractériser la faute séparable", "Connaître l'ABS et le fait justificatif de groupe"],
          keyRefs: ["Art. L. 223-22 C. com.", "Art. L. 225-251 C. com.", "Art. L. 225-252 C. com.", "Art. L. 651-2 C. com.", "Art. L. 241-3 C. com.", "Art. L. 242-6 C. com."],
          quiz: [
            { type: "qcm", q: "Le dirigeant engage sa responsabilité envers un tiers en cas de :", choices: ["Toute faute de gestion", "Faute séparable de ses fonctions", "Perte de la société", "Vote en AG"], answer: 1, explain: "Seusse, Cass. com., 20 mai 2003." },
            { type: "vf", q: "Le quitus donné par l'assemblée éteint l'action sociale en responsabilité.", answer: false, explain: "Art. L. 225-253 : sans effet." },
            { type: "qcm", q: "Depuis Sapin II, en matière d'insuffisance d'actif :", choices: ["Toute faute suffit", "La simple négligence ne suffit pas", "Seule la fraude est sanctionnée", "Le dirigeant de fait est exonéré"], answer: 1, explain: "Art. L. 651-2 modifié en 2016." },
            { type: "qcm", q: "Point de départ habituel de la prescription de l'ABS :", choices: ["La commission des faits", "La présentation des comptes où apparaissent les dépenses, sauf dissimulation", "La plainte", "La cessation des fonctions"], answer: 1, explain: "Jurisprudence constante ; délai de 6 ans depuis 2017." },
            { type: "qcm", q: "L'associé peut obtenir réparation personnelle s'il prouve :", choices: ["La baisse de valeur de ses titres", "Un préjudice personnel distinct de celui de la société", "La faute de gestion seule", "Sa qualité de minoritaire"], answer: 1, explain: "La dépréciation des titres est le reflet du préjudice social." },
          ],
          flashcards: [
            { q: "Faute séparable (Seusse) ?", a: "Faute intentionnelle d'une particulière gravité, incompatible avec l'exercice normal des fonctions sociales." },
            { q: "Rozenblum (Crim., 4 févr. 1985) ?", a: "Concours au sein d'un groupe justifié par un intérêt commun, une politique de groupe, une contrepartie et sans excéder les possibilités de la société." },
            { q: "Prescription de l'action en responsabilité contre un dirigeant ?", a: "3 ans à compter du fait dommageable ou de sa révélation s'il a été dissimulé (10 ans si crime)." },
          ],
          exercises: [
            {
              id: "cas-associe-minoritaire",
              type: "cas-pratique",
              title: "Cas pratique : le minoritaire mis à l'écart",
              timerMin: 60,
              statement: `Mme Leroy détient 30 % du capital de la SAS Optika, dont M. Garnier, président, détient 70 %. Depuis quatre ans, l'assemblée affecte systématiquement les bénéfices (en moyenne 400 000 € par an) en réserve, sans projet d'investissement, alors que la rémunération de M. Garnier a triplé. Par ailleurs, la SAS a consenti un prêt de 150 000 € sans intérêt à une SCI détenue par M. Garnier. Mme Leroy, qui a demandé des explications par écrit, n'a obtenu aucune réponse.

Quelles actions conseillez-vous à Mme Leroy ?`,
              rubric: [
                "Abus de majorité : conditions (intérêt social, unique dessein) appliquées à la mise en réserve",
                "Sanctions : nullité des délibérations, dommages-intérêts",
                "Prêt à la SCI : convention réglementée (L. 227-10) et qualification d'ABS",
                "Expertise de gestion (L. 225-231 applicable à la SAS, 5 %) / art. 145 CPC",
                "Action sociale ut singuli contre le président",
                "Conseils stratégiques (négociation, sortie, prix 1843-4)",
              ],
              model: `**1. Mise en réserve systématique** — Abus de majorité possible : décision contraire à l'intérêt social (thésaurisation sans projet) et prise dans l'unique dessein de favoriser le majoritaire (qui se rémunère par sa fonction) au détriment de la minoritaire privée de dividendes (Cass. com., 18 avr. 1961 ; jurisprudence constante sur la mise en réserve). Sanctions : nullité des délibérations (art. 1844-10) et dommages-intérêts contre M. Garnier.

**2. Prêt sans intérêt à la SCI du président** — Convention réglementée en SAS (art. L. 227-10) : rapport du CAC (ou du président) et approbation par les associés ; à défaut, conséquences préjudiciables à la charge du président. Sur le plan pénal, usage du crédit de la société contraire à l'intérêt social, à des fins personnelles : **ABS** (art. L. 242-6 3° par renvoi L. 244-1) — plainte possible ; Mme Leroy, associée, peut se constituer partie civile pour son préjudice personnel distinct (attention, la jurisprudence pénale est restrictive).

**3. Information** — Expertise de gestion (art. L. 225-231, applicable à la SAS par renvoi de l'art. L. 227-1 ; 30 % > 5 %) après questions écrites restées sans réponse ; ou mesure d'instruction *in futurum* (art. 145 CPC).

**4. Responsabilité du président** — Action sociale *ut singuli* (art. L. 225-252, L. 227-8) pour obtenir réparation du préjudice de la société (perte d'intérêts, risque de non-remboursement).

**5. Stratégie** — Ces actions sont aussi des leviers de négociation pour une sortie de Mme Leroy (rachat de ses actions à un prix fixé, le cas échéant, par expert selon l'art. 1843-4 si une clause le prévoit).`,
            },
          ],
        },
      ],
    },
    {
      id: "operations",
      title: "Opérations, groupes et restructurations",
      level: 3,
      summary: "Cessions de contrôle, groupes de sociétés, fusions et restructurations, sociétés cotées.",
      lessons: [
        {
          id: "cessions-groupes",
          title: "Cessions de droits sociaux, groupes et restructurations",
          duration: 20,
          src: P + "cessions-groupes.md",
          objectives: ["Sécuriser une acquisition", "Mesurer les risques de la société mère", "Situer les opérations de restructuration"],
          keyRefs: ["Art. L. 233-1 à L. 233-3 C. com.", "Art. L. 236-1 C. com.", "Art. 1844-5 C. civ.", "Art. L. 151-3 CMF", "Art. L. 511-7 CMF"],
          quiz: [
            { type: "vf", q: "La garantie des vices cachés protège l'acquéreur de titres contre un passif social non révélé.", answer: false, explain: "Elle porte sur les titres ; d'où la garantie d'actif et de passif." },
            { type: "qcm", q: "Une filiale est une société dont une autre détient :", choices: ["Plus de 10 % du capital", "Plus de 33 % du capital", "Plus de 50 % du capital", "100 % du capital"], answer: 2, explain: "Art. L. 233-1." },
            { type: "qcm", q: "Le co-emploi suppose désormais :", choices: ["Une simple détention du capital", "Une immixtion permanente conduisant à la perte totale d'autonomie de la filiale", "Des dirigeants communs", "Une convention de trésorerie"], answer: 1, explain: "Cass. soc., 25 nov. 2020." },
            { type: "qcm", q: "L'investissement étranger non autorisé dans une activité sensible est :", choices: ["Valable", "Nul et sanctionné", "Soumis à simple déclaration a posteriori", "Libre au sein de l'UE dans tous les cas"], answer: 1, explain: "Art. L. 151-3 et s. CMF." },
          ],
          flashcards: [
            { q: "GAP ?", a: "Garantie d'actif et de passif : indemnisation de tout passif non révélé ou diminution d'actif de cause antérieure à la cession, selon plafonds, franchises et délais." },
            { q: "TUP (1844-5) ?", a: "Dissolution sans liquidation d'une société unipersonnelle détenue par une personne morale ; patrimoine transmis à l'associé unique ; opposition des créanciers." },
          ],
        },
        {
          id: "pactes-capital-investissement",
          src: P + "pactes-capital-investissement.md",
          duration: 16,
          quiz: [
            { type: "qcm", q: "Pour obtenir l'exécution forcée d'une clause de sortie, on la structure en :", choices: ["Simple obligation de faire", "Promesse unilatérale (art. 1124)", "Clause pénale", "Lettre d'intention"], answer: 1, explain: "La rétractation du promettant n'empêche pas la formation du contrat." },
            { type: "qcm", q: "La clause de sortie conjointe (tag along) permet :", choices: ["Au majoritaire de forcer la vente", "Au minoritaire de céder aux mêmes conditions que le majoritaire", "D'exclure un associé", "De bloquer les titres"], answer: 1, explain: "Le drag along est la sortie forcée." },
            { type: "vf", q: "Un pacte d'associés à durée indéterminée peut être résilié unilatéralement avec un préavis raisonnable.", answer: true, explain: "Art. 1210-1211 ; préférez une durée déterminée." },
            { type: "qcm", q: "La liquidation préférentielle repose généralement sur :", choices: ["Des actions de préférence", "Une hypothèque", "Un compte courant", "Une clause pénale"], answer: 0, explain: "Art. L. 228-11." }
          ],
          flashcards: [{ q: "Rendre un pacte opposable aux nouveaux associés ?", a: "Clause statutaire subordonnant l'agrément à l'adhésion au pacte." }, { q: "Good / bad leaver ?", a: "Promesse de vente du fondateur sortant, prix variable selon les circonstances du départ." }],
          title: "Pactes d'associés et capital-investissement : clauses et rédaction",
          objectives: ["Rédiger les clauses usuelles d'un pacte", "Connaître leur efficacité et leurs limites"],
          outline: [
            "Fonctions du pacte et articulation avec les statuts",
            "Clauses de gouvernance (comités, droits de veto)",
            "Clauses de transfert : préemption, agrément, inaliénabilité, sortie conjointe (tag along), sortie forcée (drag along), leaver",
            "Clauses de ratchet et de liquidité ; actions de préférence",
            "Efficacité : exécution forcée, promesse unilatérale, pacte de préférence",
          ],
        },
        {
          id: "societes-cotees",
          src: P + "societes-cotees.md",
          duration: 14,
          quiz: [
            { type: "qcm", q: "Délai de déclaration d'un franchissement de seuil :", choices: ["2 jours", "4 jours de bourse", "15 jours", "1 mois"], answer: 1, explain: "Art. L. 233-7." },
            { type: "qcm", q: "Seuil de l'offre publique obligatoire :", choices: ["25 %", "30 %", "33,3 %", "50 %"], answer: 1, explain: "Règlement général de l'AMF." },
            { type: "qcm", q: "Seuil du retrait obligatoire depuis la loi PACTE :", choices: ["95 %", "90 %", "85 %", "66,6 %"], answer: 1, explain: "Abaissé de 95 % à 90 % en 2019." },
            { type: "vf", q: "Le droit de vote double est automatique dans les sociétés cotées pour les actions au nominatif depuis 2 ans, sauf clause contraire.", answer: true, explain: "Loi Florange, 2014." }
          ],
          flashcards: [{ q: "Sanction du défaut de déclaration de seuil ?", a: "Privation des droits de vote excédant le seuil pendant 2 ans." }, { q: "Say on pay ?", a: "Vote contraignant des actionnaires sur la politique de rémunération (ex ante) et les éléments versés (ex post)." }],
          title: "Sociétés cotées : information, offres publiques, abus de marché",
          objectives: ["Connaître les obligations d'information permanente", "Comprendre le régime des offres publiques"],
          outline: [
            "Marchés réglementés et systèmes multilatéraux ; rôle de l'AMF",
            "Information permanente et périodique ; règlement MAR",
            "Déclarations de franchissement de seuils",
            "Offres publiques : obligatoires (seuil de 30 %), volontaires, retrait obligatoire",
            "Gouvernance des sociétés cotées : code AFEP-MEDEF, say on pay",
          ],
        },
      ],
    },
  ],
  decisions: [
    { id: "abus-majorite-1961", name: "Définition de l'abus de majorité", court: "Cass. com.", date: "18 avril 1961", topic: "Abus de majorité", solution: "Décision prise contrairement à l'intérêt général de la société et dans l'unique dessein de favoriser les membres de la majorité au détriment de la minorité.", scope: "Définition toujours appliquée.", status: "en vigueur" },
    { id: "flandin", name: "Flandin", court: "Cass. com.", date: "9 mars 1993", topic: "Abus de minorité", solution: "Le juge ne peut se substituer aux organes sociaux ; il peut désigner un mandataire chargé de représenter les minoritaires défaillants et de voter en leur nom dans le sens de l'intérêt social.", scope: "Sanction de l'abus de minorité.", status: "en vigueur" },
    { id: "seusse", name: "Seusse", court: "Cass. com.", date: "20 mai 2003", number: "n° 99-17.092", topic: "Responsabilité du dirigeant envers les tiers", solution: "Le dirigeant n'engage sa responsabilité personnelle envers les tiers que s'il commet une faute séparable de ses fonctions : faute intentionnelle d'une particulière gravité, incompatible avec l'exercice normal des fonctions sociales.", scope: "Définition de la faute séparable.", status: "en vigueur" },
    { id: "faute-penale-2010", name: "Infraction intentionnelle du dirigeant", court: "Cass. com.", date: "28 septembre 2010", number: "n° 09-66.255", topic: "Responsabilité du dirigeant envers les tiers", solution: "Le dirigeant qui commet une infraction pénale intentionnelle, séparable comme telle de ses fonctions, engage sa responsabilité civile envers les tiers.", scope: "Infraction intentionnelle = faute séparable.", status: "en vigueur" },
    { id: "rozenblum", name: "Rozenblum", court: "Cass. crim.", date: "4 février 1985", topic: "ABS et groupes", solution: "Le concours financier entre sociétés d'un groupe échappe à l'ABS s'il est dicté par un intérêt commun apprécié au regard d'une politique de groupe, comporte une contrepartie et n'excède pas les possibilités de la société qui le supporte.", scope: "Fait justificatif de groupe.", status: "en vigueur" },
    { id: "societe-formation-2023", name: "Actes de la société en formation", court: "Cass. com.", date: "29 novembre 2023", topic: "Reprise des engagements", solution: "Le juge apprécie souverainement, au vu des mentions de l'acte et des circonstances, si la commune intention des parties était que l'acte soit conclu au nom ou pour le compte de la société en formation.", scope: "Abandon de l'approche formaliste.", status: "en vigueur" },
    { id: "co-emploi-2020", name: "Co-emploi", court: "Cass. soc.", date: "25 novembre 2020", topic: "Groupes et salariés", solution: "Hors lien de subordination, une société du groupe ne peut être co-employeur que s'il existe une immixtion permanente dans la gestion économique et sociale conduisant à la perte totale d'autonomie d'action de l'employeur.", scope: "Restriction du co-emploi.", status: "en vigueur" },
    { id: "bordas", name: "Bordas", court: "Cass. com.", date: "12 mars 1985", topic: "Nom patronymique", solution: "Le nom patronymique d'un associé, devenu dénomination sociale, se détache de la personne pour devenir un signe distinctif objet d'un droit de propriété incorporelle de la société.", scope: "Le fondateur ne peut plus en disposer librement.", status: "en vigueur" },
  ],
  reforms: [
    { date: "2001-05-15", title: "Loi NRE", summary: "Dissociation possible des fonctions de président et de directeur général dans la SA." },
    { date: "2008-08-04", title: "Loi de modernisation de l'économie (LME)", summary: "Régime de l'auto-entrepreneur, assouplissement de la SAS, délais de paiement plafonnés." },
    { date: "2011-01-27", title: "Loi Copé-Zimmermann", summary: "Quota de 40 % de chaque sexe dans les conseils d'administration et de surveillance des grandes sociétés." },
    { date: "2014-07-31", title: "Ordonnance de modernisation du droit des sociétés", summary: "Réécriture de l'art. 1843-4 : l'expert doit respecter les méthodes de valorisation convenues." },
    { date: "2019-05-22", title: "Loi PACTE", summary: "Intérêt social et enjeux sociaux et environnementaux (art. 1833), raison d'être, société à mission, seuils du commissariat aux comptes." },
    { date: "2019-07-19", title: "Loi de simplification du droit des sociétés", summary: "Abstentions non comptées comme votes contre, usufruit et vote (art. 1844), assouplissements divers." },
    { date: "2023-01-01", title: "Guichet unique et registre national des entreprises", summary: "Formalités dématérialisées via l'INPI ; centralisation des informations dans le RNE." },
    { date: "2023-05-24", title: "Réforme des fusions, scissions et opérations transfrontalières", summary: "Ordonnance transposant la directive (UE) 2019/2121." },
    { date: "2024-06-13", title: "Loi « Attractivité » (financement des entreprises)", summary: "Actions de préférence à droits de vote multiples, assemblées dématérialisées, simplifications de gouvernance." },
  ],
  glossary: [
    { term: "Affectio societatis", def: "Volonté des associés de collaborer sur un pied d'égalité à l'entreprise commune.", latin: true },
    { term: "Intérêt social", def: "Intérêt propre de la personne morale, guide de la gestion (art. 1833) et critère de l'ABS et des abus de vote." },
    { term: "Raison d'être", def: "Principes dont la société se dote et pour le respect desquels elle entend affecter des moyens (art. 1835)." },
    { term: "Clause léonine", def: "Clause attribuant à un associé la totalité du profit ou l'exonérant de toute contribution aux pertes ; réputée non écrite (art. 1844-1)." },
    { term: "Conventions réglementées", def: "Conventions entre la société et ses dirigeants ou actionnaires significatifs, soumises à autorisation et/ou approbation." },
    { term: "Action ut singuli", def: "Action en responsabilité exercée par un associé pour le compte de la société.", latin: true },
    { term: "Dirigeant de fait", def: "Personne qui exerce en toute indépendance une activité positive de direction sans mandat social." },
    { term: "Garantie d'actif et de passif", def: "Engagement du cédant de titres d'indemniser les passifs non révélés de cause antérieure à la cession." },
    { term: "Earn-out", def: "Complément de prix indexé sur les performances futures de la société cédée." },
    { term: "Drag along / tag along", def: "Clauses de sortie forcée / de sortie conjointe dans un pacte d'associés." },
    { term: "TUP", def: "Transmission universelle de patrimoine d'une société unipersonnelle à son associé personne morale (art. 1844-5)." },
  ],
};
