const P = "packs/methodologie/";

// Arrêt d'entraînement (fictif), rédigé dans le style de la Cour de cassation.
const ARRET = `> **Arrêt d'entraînement — décision fictive** rédigée à des fins pédagogiques dans le style de la Cour de cassation. Les règles qu'elle applique sont celles du droit positif.

**COUR DE CASSATION — Chambre commerciale, financière et économique**
Pourvoi n° 00-00.000 (fictif)

**Faits et procédure**

1. Selon l'arrêt attaqué, la société Ateliers du Rhône (le fabricant) a conclu le 4 janvier 2021 avec la société Distrib Sud (le distributeur) un contrat d'approvisionnement d'une durée de cinq ans, stipulant qu'à défaut de paiement d'une seule facture à son échéance, le contrat serait résolu de plein droit huit jours après une mise en demeure restée sans effet.

2. Le 2 août 2023, le fabricant a adressé au distributeur, à son ancien siège social qu'il savait abandonné depuis plusieurs mois, une mise en demeure de payer une facture de 312 euros échue depuis cinq jours. Le 12 août 2023, il lui a notifié la résolution du contrat.

3. Le distributeur, qui avait réglé la facture dès réception d'une copie de la mise en demeure le 20 août, l'a assigné en paiement de dommages-intérêts pour rupture abusive.

**Examen du moyen**

*Énoncé du moyen*

4. Le distributeur fait grief à l'arrêt de rejeter sa demande, alors « que le créancier ne peut se prévaloir d'une clause résolutoire de mauvaise foi ; qu'en se bornant à constater que les conditions de la clause étaient réunies, sans rechercher, comme elle y était invitée, si le fabricant ne l'avait pas mise en œuvre de mauvaise foi, la cour d'appel a privé sa décision de base légale au regard des articles 1104 et 1225 du code civil. »

*Réponse de la Cour*

Vu les articles 1104 et 1225 du code civil :

5. Selon le premier de ces textes, les contrats doivent être négociés, formés et exécutés de bonne foi ; cette disposition est d'ordre public. Selon le second, la clause résolutoire précise les engagements dont l'inexécution entraînera la résolution du contrat, et la résolution est subordonnée à une mise en demeure infructueuse, s'il n'a pas été convenu que celle-ci résulterait du seul fait de l'inexécution.

6. Il en résulte que, si le juge ne peut apprécier la gravité du manquement sanctionné par une clause résolutoire, il lui appartient de rechercher, lorsqu'il y est invité, si le créancier n'a pas mis en œuvre la clause de mauvaise foi.

7. Pour rejeter la demande du distributeur, l'arrêt retient que la clause résolutoire, claire et précise, sanctionnait le défaut de paiement d'une facture quel qu'en soit le montant, que la mise en demeure est restée sans effet dans le délai de huit jours et que le juge ne saurait substituer son appréciation à celle des parties.

8. En se déterminant ainsi, sans rechercher, comme il le lui était demandé, si le fabricant n'avait pas invoqué la clause de mauvaise foi en adressant la mise en demeure à une adresse qu'il savait abandonnée, pendant la période estivale, pour une somme minime, la cour d'appel n'a pas donné de base légale à sa décision.

**PAR CES MOTIFS**, la Cour : CASSE ET ANNULE, en toutes ses dispositions, l'arrêt rendu le 14 mars 2025, entre les parties, par la cour d'appel de… ; remet l'affaire et les parties dans l'état où elles se trouvaient avant cet arrêt et les renvoie devant la cour d'appel de…`;

export default {
  id: "methodologie",
  version: "2026.10.1",
  title: "Méthodologie juridique",
  branch: "Méthodologie",
  icon: "✒️",
  color: "#6a4fa0",
  order: 0,
  updatedAt: "2026-10-01",
  description:
    "Lire un arrêt, fiche d'arrêt, commentaire, cas pratique, dissertation, note de synthèse : méthode, exercices corrigés, trucs et astuces.",
  modules: [
    {
      id: "lire",
      title: "Lire et chercher le droit",
      level: 1,
      summary: "Décrypter un arrêt de la Cour de cassation rédigé en style direct, faire une fiche d'arrêt, trouver et citer les sources.",
      lessons: [
        {
          id: "lire-arret-cassation",
          title: "Lire un arrêt de la Cour de cassation (style direct, motivation enrichie)",
          duration: 20,
          src: P + "lire-arret-cassation.md",
          objectives: [
            "Comprendre la structure d'un arrêt rédigé en style direct",
            "Distinguer rejet et cassation, et les degrés de contrôle",
            "Mesurer l'autorité d'une décision",
          ],
          keyRefs: ["Art. L. 411-3 COJ", "Art. 1014 CPC", "Art. 455 CPC", "Art. L. 441-1 COJ"],
          quiz: [
            { type: "qcm", q: "Depuis quand la Cour de cassation rédige-t-elle ses arrêts en « style direct » ?", choices: ["1er janvier 2016", "1er octobre 2019", "1er janvier 2022", "Elle ne l'a jamais fait"], answer: 1, explain: "Le style direct (paragraphes numérotés, fin des « attendu que ») s'applique depuis le 1er octobre 2019." },
            { type: "qcm", q: "Dans un arrêt de rejet, la formule « a souverainement estimé » signifie que :", choices: ["La Cour approuve le raisonnement juridique", "La Cour refuse de contrôler une question de fait", "La Cour casse sans renvoi", "La Cour relève un moyen d'office"], answer: 1, explain: "L'appréciation souveraine relève des juges du fond : la Cour de cassation ne la contrôle pas." },
            { type: "vf", q: "Une décision de non-admission (art. 1014 CPC) a une forte portée doctrinale.", answer: false, explain: "La non-admission n'est pas motivée : elle n'a aucune portée doctrinale." },
            { type: "qcm", q: "Quelle mention signale, depuis 2021, un arrêt publié au Bulletin ?", choices: ["P", "B", "I", "D"], answer: 1, explain: "Depuis 2021 : B (Bulletin), R (Rapport), L (Lettre de chambre), C (communiqué)." },
            { type: "qcm", q: "Le manque de base légale, c'est :", choices: ["L'application d'un texte abrogé", "Des constatations de fait insuffisantes pour permettre le contrôle", "L'absence totale de motifs", "Une contradiction entre deux motifs"], answer: 1, explain: "Le manque de base légale vise l'insuffisance des constatations ; le défaut de motifs vise l'absence ou la contradiction de motifs (art. 455 CPC)." },
            { type: "vf", q: "La Cour de cassation peut moduler dans le temps les effets d'un revirement de jurisprudence.", answer: true, explain: "Elle le fait pour ne pas priver un plaideur d'un procès équitable lorsqu'il s'est fié à la jurisprudence antérieure." },
          ],
          flashcards: [
            { q: "Les quatre blocs d'un arrêt en style direct ?", a: "Faits et procédure ; Examen du moyen (énoncé) ; Réponse de la Cour ; Dispositif." },
            { q: "Schéma d'un arrêt de cassation ?", a: "Visa → règle (« Selon ce texte… ») → « Pour…, l'arrêt retient que… » → « En statuant ainsi, alors que…, la cour d'appel a violé… »." },
            { q: "« En a exactement déduit » ?", a: "Contrôle de qualification : la Cour approuve le raisonnement juridique." },
            { q: "Mentions de publication depuis 2021 ?", a: "B (Bulletin), R (Rapport annuel), L (Lettre de chambre), C (communiqué)." },
            { q: "Cassation sans renvoi : fondement ?", a: "Art. L. 411-3 COJ : la Cour statue elle-même si les faits constatés le permettent." },
          ],
        },
        {
          id: "fiche-arret",
          title: "La fiche d'arrêt",
          duration: 15,
          src: P + "fiche-arret.md",
          objectives: ["Maîtriser les cinq rubriques", "Formuler un problème de droit juste", "Préparer l'introduction d'un commentaire"],
          quiz: [
            { type: "qcm", q: "Quel est le bon problème de droit ?", choices: ["M. X devait-il payer la facture ?", "Qu'est-ce que la bonne foi ?", "Le créancier peut-il invoquer une clause résolutoire de mauvaise foi ?", "Le juge doit-il sanctionner la mauvaise foi du créancier ?"], answer: 2, explain: "Question juridique, abstraite, ouverte. La 1re est une question de fait, la 2e trop large, la 4e contient la réponse." },
            { type: "vf", q: "Dans la fiche d'arrêt, les faits doivent être recopiés avec toutes leurs dates et tous les montants.", answer: false, explain: "On qualifie juridiquement et on écarte les détails inutiles au raisonnement." },
            { type: "qcm", q: "Où trouver la thèse de la cour d'appel dans un arrêt de cassation ?", choices: ["Dans le visa", "Dans le paragraphe « Pour…, l'arrêt retient que… »", "Dans le dispositif", "Dans l'en-tête"], answer: 1, explain: "C'est le passage qui reprend le raisonnement censuré." },
            { type: "vf", q: "La solution doit indiquer l'issue (rejet ou cassation) et la règle posée.", answer: true, explain: "Idéalement en citant l'attendu de principe, puis en qualifiant la solution (confirmation, revirement…)." },
          ],
          flashcards: [
            { q: "Les cinq rubriques de la fiche d'arrêt ?", a: "Faits, procédure, prétentions (moyen), problème de droit, solution." },
            { q: "Trois défauts d'un problème de droit ?", a: "Question de fait ; question trop large ; question qui contient la réponse." },
          ],
          exercises: [
            {
              id: "fiche-guidee",
              type: "fiche-arret",
              title: "Fiche d'arrêt guidée : clause résolutoire et bonne foi",
              statement: "Établissez la fiche de l'arrêt d'entraînement ci-dessous, rubrique par rubrique. Comparez chaque rubrique avec le corrigé avant de passer à la suivante.\n\n" + ARRET,
              steps: [
                { label: "Faits", help: "Qui, quoi, qualifiés juridiquement, sans détails inutiles", model: "Un fabricant et un distributeur ont conclu un contrat d'approvisionnement de cinq ans comportant une **clause résolutoire** jouant huit jours après une mise en demeure infructueuse en cas de non-paiement d'une seule facture. Le fabricant a adressé une mise en demeure, en période estivale, à une adresse qu'il savait abandonnée, pour une somme minime, puis a notifié la résolution. Le distributeur a payé dès qu'il a eu connaissance de la mise en demeure." },
                { label: "Procédure", help: "Qui saisit qui, pour quoi ; décision de la cour d'appel et ses motifs", model: "Le distributeur a assigné le fabricant en dommages-intérêts pour rupture abusive. La cour d'appel a rejeté sa demande au motif que les conditions de la clause étaient réunies et que le juge ne peut substituer son appréciation à celle des parties. Le distributeur forme un pourvoi." },
                { label: "Prétentions (moyen)", help: "Ce que reproche le demandeur au pourvoi", model: "Le distributeur reproche à la cour d'appel de ne pas avoir recherché si le fabricant n'avait pas mis en œuvre la clause de mauvaise foi (manque de base légale au regard des art. 1104 et 1225 C. civ.)." },
                { label: "Problème de droit", help: "Question juridique abstraite", model: "Le juge saisi d'une clause résolutoire dont les conditions sont réunies doit-il rechercher si le créancier l'a mise en œuvre de bonne foi ?" },
                { label: "Solution", help: "Issue, règle, qualification", model: "**Cassation** pour manque de base légale, au visa des art. 1104 et 1225 C. civ. : « si le juge ne peut apprécier la gravité du manquement sanctionné par une clause résolutoire, il lui appartient de rechercher, lorsqu'il y est invité, si le créancier n'a pas mis en œuvre la clause de mauvaise foi ». La solution prolonge, sous l'empire du droit issu de 2016, une jurisprudence constante sur la mise en œuvre de mauvaise foi des clauses résolutoires." },
              ],
              model: "Voir les corrigés de chaque rubrique.",
            },
          ],
        },
        {
          id: "recherche-documentaire",
          title: "Chercher, vérifier et citer le droit (Légifrance, Judilibre, EUR-Lex)",
          duration: 12,
          src: P + "recherche-documentaire.md",
          objectives: ["Connaître les bases officielles gratuites", "Citer selon les usages", "Vérifier une référence, y compris fournie par une IA"],
          quiz: [
            { type: "qcm", q: "Pour connaître la rédaction d'un article applicable à un contrat conclu en 2015, vous consultez :", choices: ["La version actuelle de l'article", "La frise des versions sur Légifrance", "Un manuel récent", "Le BOFiP"], answer: 1, explain: "Légifrance donne chaque version et sa période de vigueur." },
            { type: "qcm", q: "Judilibre est :", choices: ["La base de la jurisprudence administrative", "Le moteur open data des décisions judiciaires de la Cour de cassation", "Une revue doctrinale", "Le site de la CJUE"], answer: 1, explain: "Judilibre, sur le site de la Cour de cassation, diffuse les décisions judiciaires en open data." },
            { type: "vf", q: "Une référence fournie par un assistant IA peut être utilisée sans vérification si elle comporte un numéro de pourvoi.", answer: false, explain: "Un numéro peut être erroné : remontez toujours à la source primaire." },
          ],
          flashcards: [{ q: "Format de citation d'un arrêt de la Cour de cassation ?", a: "Cass. com., 22 oct. 1996, n° 93-18.632 (formation, date, numéro de pourvoi)." }],
        },
      ],
    },
    {
      id: "exercices-classiques",
      title: "Les exercices universitaires",
      level: 2,
      summary: "Commentaire d'arrêt, cas pratique et consultation, dissertation : méthode et entraînement corrigé.",
      lessons: [
        {
          id: "commentaire-arret",
          title: "Le commentaire d'arrêt",
          duration: 20,
          src: P + "commentaire-arret.md",
          objectives: ["Analyser le sens, la valeur et la portée d'un arrêt", "Construire une introduction complète", "Bâtir un plan tiré de l'arrêt"],
          quiz: [
            { type: "qcm", q: "Sens, valeur, portée sont :", choices: ["Les trois parties du plan", "Les axes d'analyse qui irriguent tout le devoir", "Les rubriques de l'introduction", "Des notions propres à la note de synthèse"], answer: 1, explain: "Ce ne sont pas un plan : ils nourrissent les deux parties." },
            { type: "vf", q: "Une conclusion est obligatoire dans un commentaire d'arrêt.", answer: false, explain: "Elle est facultative ; si elle existe, elle ouvre une perspective." },
            { type: "qcm", q: "Lequel est un défaut grave ?", choices: ["Citer l'attendu de principe", "Paraphraser l'arrêt", "Situer l'arrêt par rapport à la réforme de 2016", "Annoncer le plan"], answer: 1, explain: "La paraphrase redit sans expliquer." },
            { type: "qcm", q: "Dans l'introduction, le problème de droit vient :", choices: ["Avant les faits", "Après la procédure et le moyen, avant la solution", "Après l'annonce du plan", "Il n'y figure pas"], answer: 1, explain: "Accroche, faits, procédure, moyen, problème, solution, intérêt, annonce du plan." },
          ],
          flashcards: [
            { q: "Les huit temps de l'introduction du commentaire ?", a: "Accroche, faits, procédure, moyen, problème de droit, solution, intérêt, annonce du plan." },
            { q: "Répartition du temps en 3 h ?", a: "1 h préparation, 15 min plan détaillé, 1 h 30 rédaction, 15 min relecture." },
          ],
          exercises: [
            {
              id: "commentaire-clause-resolutoire",
              type: "commentaire",
              title: "Commentaire : la mise en œuvre de mauvaise foi d'une clause résolutoire",
              timerMin: 180,
              statement: "Commentez l'arrêt d'entraînement suivant (3 heures). Si vous manquez de temps, rédigez l'introduction complète et le plan détaillé.\n\n" + ARRET,
              hints: [
                "L'attendu (§ 6) contient deux propositions : une limite au pouvoir du juge, puis une obligation de vérifier la bonne foi. Votre plan est là.",
                "Rapprochez l'arrêt de l'article 1104 (bonne foi, d'ordre public) et de la jurisprudence Les Maréchaux (Cass. com., 10 juill. 2007) : la bonne foi sanctionne l'usage déloyal d'une prérogative, sans toucher à la substance du contrat.",
                "Portée : la solution vaut-elle pour toutes les prérogatives unilatérales (résolution par notification de l'art. 1226, clause de non-renouvellement…) ?",
              ],
              rubric: [
                "Introduction complète (faits qualifiés, procédure, moyen, problème, solution, annonce)",
                "Problème de droit juste et abstrait",
                "Plan en deux parties tiré de l'attendu",
                "Explication du mécanisme de la clause résolutoire (art. 1225) et du rôle limité du juge",
                "Analyse de la bonne foi (art. 1104, ordre public) et de la jurisprudence Les Maréchaux",
                "Distinction appréciation de la gravité / contrôle de la bonne foi",
                "Portée : extension aux autres prérogatives unilatérales, sécurité juridique",
                "Qualité de la rédaction et des transitions",
              ],
              model: `**Proposition de plan**

**I. L'efficacité de principe de la clause résolutoire, soustraite à l'appréciation du juge**
- A. Un mécanisme de résolution conventionnelle encadré par l'article 1225 : désignation des engagements, mise en demeure infructueuse sauf stipulation contraire, résolution de plein droit.
- B. L'exclusion du contrôle de la gravité du manquement : le juge ne peut substituer son appréciation à celle des parties (différence avec la résolution judiciaire, art. 1227-1228, et la résolution par notification, art. 1226, où la gravité est requise). Ce que la cour d'appel avait exactement relevé.

**II. La neutralisation de la clause mise en œuvre de mauvaise foi**
- A. La bonne foi, limite d'ordre public à l'exercice de la prérogative (art. 1104) : l'usage déloyal est sanctionné (adresse abandonnée, période estivale, somme minime, paiement rapide) ; la jurisprudence Les Maréchaux distingue l'usage d'une prérogative de la substance des obligations.
- B. Une obligation de recherche à la charge du juge, « lorsqu'il y est invité » : portée procédurale (manque de base légale), portée de fond (extension probable à toute prérogative unilatérale), équilibre entre force obligatoire (art. 1103) et loyauté.

**Points de vigilance** : ne pas confondre clause résolutoire, résolution unilatérale par notification et résolution judiciaire ; ne pas dire que le juge apprécie la gravité ; souligner que la sanction est la paralysie de la clause (et l'indemnisation du préjudice), non la révision du contrat.`,
            },
          ],
        },
        {
          id: "cas-pratique",
          title: "Le cas pratique et la consultation",
          duration: 18,
          src: P + "cas-pratique.md",
          objectives: ["Appliquer le syllogisme juridique", "Ordonner les questions", "Raisonner par hypothèses et conclure utilement"],
          quiz: [
            { type: "qcm", q: "La « majeure » du syllogisme est :", choices: ["Les faits", "La règle de droit", "La conclusion", "La question"], answer: 1, explain: "Majeure = règle ; mineure = application aux faits ; conclusion." },
            { type: "vf", q: "La date des faits est sans importance dans un cas pratique.", answer: false, explain: "Elle détermine le droit applicable (réformes de 2016, 2021…)." },
            { type: "qcm", q: "Face à une condition douteuse, il faut :", choices: ["Trancher au hasard", "Raisonner par hypothèses", "Ignorer la question", "Renvoyer au juge sans conclure"], answer: 1, explain: "« Si… ; à défaut… » : c'est la démarche du praticien." },
          ],
          flashcards: [{ q: "Les quatre temps du syllogisme ?", a: "Problème, majeure (règle), mineure (application), conclusion." }],
          exercises: [
            {
              id: "cas-caution-dirigeant",
              type: "cas-pratique",
              title: "Cas pratique : le président caution de sa SAS",
              timerMin: 90,
              statement: `En mars 2023, la SAS Atelier Bois obtient de la Banque du Centre un prêt de 300 000 € pour financer une nouvelle ligne de production. Son président et associé majoritaire, M. Bernard, se porte **caution solidaire** du prêt à hauteur de 360 000 €. L'acte de cautionnement, signé électroniquement, comporte une mention que M. Bernard a saisie lui-même sur la tablette de la banque, indiquant le montant en chiffres seulement. À la date de l'acte, M. Bernard percevait 55 000 € de revenus annuels et possédait un appartement estimé à 210 000 €, grevé d'un emprunt restant dû de 150 000 €.

En septembre 2025, la SAS, en difficulté, fait l'objet d'une **procédure de sauvegarde**. La banque informe M. Bernard qu'elle entend le poursuivre immédiatement pour la totalité de son engagement.

M. Bernard vous consulte :
1. Son engagement de caution est-il valable ?
2. À supposer qu'il le soit, peut-il être tenu à hauteur de 360 000 € ?
3. La banque peut-elle le poursuivre dès maintenant ?`,
              hints: [
                "Cautionnement conclu en 2023 : droit issu de l'ordonnance du 15 septembre 2021 (en vigueur le 1er janvier 2022).",
                "Mention : art. 2297 C. civ. — que dit le texte en cas de montant exprimé seulement en chiffres ?",
                "Disproportion : art. 2300 C. civ. — quelle sanction depuis 2022 ?",
                "Sauvegarde : art. L. 622-28 et L. 626-11 C. com.",
              ],
              rubric: [
                "Identification du droit applicable (cautionnement conclu après le 1er janvier 2022)",
                "Mention de l'art. 2297 : apposée par la caution elle-même, montant en lettres et en chiffres, mention relative à la solidarité",
                "Sanction d'une mention irrégulière et discussion (nullité / limitation, bénéfices de discussion et division)",
                "Disproportion manifeste (art. 2300) : appréciation lors de la conclusion, revenus et patrimoine, sanction par réduction",
                "Suspension des poursuites contre la caution personne physique pendant la période d'observation (L. 622-28)",
                "Opposabilité du plan de sauvegarde par la caution personne physique (L. 626-11)",
                "Conclusions opérationnelles pour le client",
              ],
              model: `**1. Validité de l'engagement (art. 2297 C. civ.)**
Le cautionnement, conclu en 2023, relève du droit issu de l'ordonnance n° 2021-1192 du 15 septembre 2021 (applicable aux cautionnements conclus à compter du 1er janvier 2022). L'art. 2297 impose à la caution personne physique, **à peine de nullité**, d'apposer **elle-même** une mention exprimant son engagement de payer en cas de défaillance du débiteur, dans la limite d'un montant exprimé **en toutes lettres et en chiffres**. La mention n'a plus à être manuscrite : une saisie électronique par la caution elle-même convient. En revanche, le montant en chiffres seulement est irrégulier. Discussion : le texte prévoit qu'en cas de différence entre lettres et chiffres, le cautionnement vaut pour la somme en lettres ; il ne règle pas l'absence de lettres, d'où un risque sérieux de nullité, que M. Bernard peut invoquer. Par ailleurs, si la caution est solidaire, la mention doit indiquer qu'elle renonce aux bénéfices de discussion et de division ; à défaut, elle **conserve** ces bénéfices (le cautionnement n'est pas nul pour autant).
La qualité de dirigeant ne dispense pas de la mention : l'art. 2297 vise toute caution personne physique.

**2. Disproportion (art. 2300 C. civ.)**
Si le cautionnement souscrit par une personne physique envers un créancier professionnel était, **lors de sa conclusion**, **manifestement disproportionné** aux revenus et au patrimoine de la caution, il est **réduit** au montant à hauteur duquel elle pouvait s'engager à cette date. Ici : 360 000 € d'engagement pour 55 000 € de revenus et un patrimoine net d'environ 60 000 € → disproportion manifeste plausible. Sanction : réduction (et non plus déchéance totale comme sous l'ancien art. L. 332-1 C. consom.), sans « retour à meilleure fortune ». La charge de la preuve de la disproportion pèse sur la caution ; la banque se prévaudra des informations déclarées par M. Bernard (fiche patrimoniale).

**3. Poursuites pendant la sauvegarde**
Le jugement d'ouverture de la sauvegarde **suspend** jusqu'au jugement arrêtant le plan ou prononçant la liquidation toute action contre les **cautions personnes physiques** (art. L. 622-28 al. 2 C. com.). La banque ne peut donc pas poursuivre M. Bernard immédiatement. Ensuite, en sauvegarde, la caution personne physique peut **se prévaloir des dispositions du plan** (délais, remises) (art. L. 626-11) — avantage qui n'existe pas en redressement judiciaire (art. L. 631-20). La banque peut seulement prendre des mesures conservatoires.

**Conclusion pour le client** : contester la validité de la mention (lettres absentes), à titre subsidiaire invoquer la disproportion pour obtenir la réduction, et répondre à la banque que toute poursuite est suspendue pendant la période d'observation ; conserver toutes les pièces sur sa situation patrimoniale de mars 2023.`,
            },
          ],
        },
        {
          id: "dissertation",
          title: "La dissertation juridique",
          duration: 15,
          src: P + "dissertation.md",
          objectives: ["Analyser un sujet et trouver la tension", "Formuler une problématique", "Construire un plan démonstratif"],
          quiz: [
            { type: "vf", q: "La dissertation consiste à dire tout ce que l'on sait sur le thème.", answer: false, explain: "Elle répond à une problématique : c'est une démonstration." },
            { type: "qcm", q: "Que décide Cass. com., 10 juill. 2007, Les Maréchaux ?", choices: ["La bonne foi permet au juge de réviser le contrat", "La bonne foi sanctionne l'usage déloyal d'une prérogative sans atteindre la substance des droits et obligations", "La bonne foi ne s'applique qu'à la formation", "La bonne foi est supplétive"], answer: 1, explain: "Arrêt de référence sur les limites du pouvoir du juge au nom de la bonne foi." },
          ],
          flashcards: [{ q: "Les six étapes de l'introduction de dissertation ?", a: "Accroche, définitions, contexte et intérêt, délimitation, problématique, annonce du plan." }],
          exercises: [
            {
              id: "dissertation-bonne-foi",
              type: "dissertation",
              title: "Dissertation : « La bonne foi dans le droit des contrats »",
              timerMin: 180,
              statement: "Traitez le sujet suivant : **La bonne foi dans le droit des contrats.** (3 heures — à défaut, introduction complète et plan détaillé.)",
              hints: [
                "Depuis 2016, l'art. 1104 vise la négociation, la formation et l'exécution, et le déclare d'ordre public.",
                "Pensez aux applications spéciales : art. 1112 (négociations), 1112-1 (information), 1195 (imprévision), 1171 (clauses abusives) ?",
                "La limite : Les Maréchaux (2007).",
              ],
              rubric: [
                "Définitions (bonne foi subjective / objective) et délimitation",
                "Problématique précise",
                "Plan en deux parties démonstratif",
                "Art. 1104 et ses applications (1112, 1112-1, 1198…)",
                "Limite jurisprudentielle (Les Maréchaux) et articulation avec la force obligatoire (1103)",
                "Références exactes",
              ],
              model: `**Problématique possible** : la consécration de la bonne foi à tous les stades du contrat en fait-elle un instrument de révision du contrat par le juge, ou seulement un instrument de loyauté dans l'exercice des droits ?

**I. La bonne foi, exigence de loyauté généralisée**
- A. Une exigence étendue à toute la vie du contrat : négociation (art. 1112, rupture fautive des pourparlers, réparation limitée), formation (devoir d'information, art. 1112-1, d'ordre public ; dol par réticence, art. 1137 al. 2), exécution (art. 1104).
- B. Une exigence d'ordre public, aux applications multiples : sanction de la mise en œuvre déloyale d'une clause résolutoire, d'une clause de non-concurrence, d'une prérogative unilatérale ; devoir de coopération.

**II. La bonne foi, limite et non source du contrat**
- A. Le refus d'une révision au nom de la bonne foi : Les Maréchaux (2007) — pas d'atteinte à la substance des droits et obligations.
- B. Le relais de mécanismes spéciaux : imprévision (art. 1195), clauses abusives dans les contrats d'adhésion (art. 1171), contrepartie illusoire ou dérisoire (art. 1169), clause privant l'obligation essentielle de sa substance (art. 1170) : le législateur a pris le relais là où la bonne foi s'arrêtait.`,
            },
          ],
        },
      ],
    },
    {
      id: "note-synthese",
      title: "La note de synthèse",
      level: 3,
      summary: "L'épreuve reine du CRFPA et de nombreux concours : méthode, gestion des cinq heures, trucs et astuces, dossier d'entraînement complet.",
      lessons: [
        {
          id: "note-synthese-methode",
          title: "La méthode de la note de synthèse",
          duration: 20,
          src: P + "note-synthese-methode.md",
          objectives: ["Connaître les règles de l'épreuve", "Gérer les cinq heures", "Construire le tableau de synthèse et le plan"],
          quiz: [
            { type: "vf", q: "Dans une note de synthèse, on peut ajouter un arrêt important absent du dossier.", answer: false, explain: "Aucune connaissance extérieure : c'est une faute de méthode." },
            { type: "qcm", q: "Quel outil fait apparaître le plan ?", choices: ["Le résumé de chaque document", "Le tableau de synthèse thèmes × documents", "La conclusion", "L'accroche"], answer: 1, explain: "Le tableau croise thèmes et documents et révèle les regroupements." },
            { type: "qcm", q: "Les références aux documents se placent :", choices: ["En fin de note seulement", "Après chaque idée : (doc. 3)", "En note de bas de page", "On ne cite pas les documents"], answer: 1, explain: "Chaque idée est suivie de sa ou ses sources dans le dossier." },
            { type: "vf", q: "Un plan « document par document » est acceptable.", answer: false, explain: "La note doit synthétiser, pas résumer successivement." },
          ],
          flashcards: [
            { q: "Les quatre règles d'or de la note de synthèse ?", a: "Objectivité ; exhaustivité (tous les documents) ; aucune connaissance extérieure ; plan apparent avec références." },
            { q: "Répartition des 5 h ?", a: "1 h 30-2 h lecture ; 45 min tableau ; 30 min plan ; 1 h 30 rédaction ; 15 min relecture." },
          ],
        },
        {
          id: "note-synthese-astuces",
          title: "Note de synthèse : trucs et astuces de correcteur",
          duration: 12,
          src: P + "note-synthese-astuces.md",
          objectives: ["Lire vite sans rien perdre", "Choisir le bon plan", "Éviter les erreurs qui coûtent cher"],
          quiz: [
            { type: "qcm", q: "Quelle est l'erreur quasi systématiquement sanctionnée ?", choices: ["Une introduction courte", "Un document oublié", "Des titres informatifs", "L'absence de conclusion"], answer: 1, explain: "L'oubli d'un document est la faute la plus coûteuse." },
            { type: "vf", q: "Entre deux plans possibles, choisissez celui qui utilise le plus naturellement tous les documents.", answer: true, explain: "C'est le critère décisif." },
          ],
          flashcards: [{ q: "Que lire en premier dans un document ?", a: "Le paratexte : nature, auteur, date, source." }],
          exercises: [
            {
              id: "synthese-imprevision",
              type: "note-synthese",
              title: "Dossier d'entraînement : l'imprévision dans les contrats",
              timerMin: 300,
              statement: `À partir des seuls documents du dossier, rédigez une note de synthèse sur **l'imprévision dans les contrats** (environ quatre pages ; 5 heures).

> Dossier d'entraînement : les documents sont des **textes officiels** ou des **résumés et documents rédigés pour l'exercice** à partir du droit positif ; ils ne reproduisent pas de doctrine publiée.

*Version courte possible : 90 minutes, introduction et plan détaillé avec références aux documents.*`,
              documents: [
                { title: "Article 1195 du code civil (rédaction issue de l'ordonnance n° 2016-131 du 10 février 2016)", text: "« Si un changement de circonstances imprévisible lors de la conclusion du contrat rend l'exécution excessivement onéreuse pour une partie qui n'avait pas accepté d'en assumer le risque, celle-ci peut demander une renégociation du contrat à son cocontractant. Elle continue à exécuter ses obligations durant la renégociation.\n\nEn cas de refus ou d'échec de la renégociation, les parties peuvent convenir de la résolution du contrat, à la date et aux conditions qu'elles déterminent, ou demander d'un commun accord au juge de procéder à son adaptation. À défaut d'accord dans un délai raisonnable, le juge peut, à la demande d'une partie, réviser le contrat ou y mettre fin, à la date et aux conditions qu'il fixe. »" },
                { title: "Résumé — Cass. civ., 6 mars 1876, Canal de Craponne", text: "Des redevances d'arrosage avaient été fixées par des conventions du XVIe siècle. Leur montant étant devenu dérisoire au regard du coût d'entretien du canal, la cour d'appel les avait relevées. La Cour de cassation casse cette décision : il n'appartient en aucun cas aux tribunaux, si équitable que puisse leur paraître leur décision, de prendre en considération le temps et les circonstances pour modifier les conventions des parties et substituer des clauses nouvelles à celles librement acceptées. Cette solution, fondée sur la force obligatoire du contrat, a fermé pendant 140 ans la révision judiciaire pour imprévision en droit privé." },
                { title: "Résumé — CE, 30 mars 1916, Compagnie générale d'éclairage de Bordeaux", text: "Pendant la Première Guerre mondiale, le prix du charbon a quintuplé, bouleversant l'économie d'une concession de distribution du gaz. Le Conseil d'État juge que le concessionnaire doit poursuivre l'exécution du service, mais qu'il a droit à une indemnité couvrant une partie de la charge extracontractuelle résultant de circonstances imprévisibles. La théorie de l'imprévision, fondée sur la continuité du service public, s'impose ainsi en droit administratif, alors que le juge judiciaire la refuse." },
                { title: "Synthèse rédigée pour l'exercice — la réforme de 2016 et l'objectif de l'article 1195", text: "La présentation officielle de la réforme du droit des contrats explique que l'article 1195 introduit l'imprévision en droit civil afin de lutter contre les déséquilibres contractuels majeurs survenant en cours d'exécution, conformément à de nombreux droits étrangers et aux projets d'harmonisation européens. Le mécanisme se veut avant tout incitatif : la menace d'une intervention du juge doit conduire les parties à renégocier. Le texte n'étant pas d'ordre public, les parties peuvent l'aménager ou l'écarter, notamment en acceptant expressément d'assumer le risque de changement de circonstances. La réforme s'applique aux contrats conclus à compter du 1er octobre 2016." },
                { title: "Document rédigé pour l'exercice — exemple de clause de « hardship » dans un contrat d'approvisionnement", text: "« Si, après la signature du présent contrat, survient un événement extérieur à la volonté des parties, imprévisible et d'une ampleur telle que l'équilibre économique du contrat s'en trouve gravement bouleversé (notamment une variation de plus de 25 % du coût des matières premières sur trois mois consécutifs), la partie affectée pourra demander l'ouverture d'une renégociation. Les parties s'engagent à négocier de bonne foi pendant trente jours. À défaut d'accord, chaque partie pourra résilier le contrat moyennant un préavis de trois mois, à l'exclusion de toute intervention du juge sur le fond. Les parties déclarent écarter l'application de l'article 1195 du code civil. »" },
                { title: "Loi n° 2018-287 du 20 avril 2018 ratifiant l'ordonnance de 2016 — article L. 211-40-1 du code monétaire et financier (extrait)", text: "La loi de ratification a maintenu le mécanisme de l'article 1195. Elle a créé l'article L. 211-40-1 du code monétaire et financier, selon lequel l'article 1195 du code civil **n'est pas applicable** aux obligations qui résultent d'opérations sur les titres et les contrats financiers mentionnés aux I à III de l'article L. 211-1 du même code. Le législateur a jugé que, sur les marchés financiers, l'aléa est la raison d'être du contrat et que la révision judiciaire serait source d'insécurité." },
                { title: "Résumé — Cass. civ. 3e, 30 juin 2022 (trois arrêts), loyers commerciaux et fermetures administratives (crise sanitaire)", text: "Des locataires commerciaux, dont les magasins avaient été fermés au public par décision administrative pendant la crise sanitaire, refusaient de payer leurs loyers. La Cour de cassation juge que l'interdiction de recevoir du public, mesure générale et temporaire de police administrative, n'est pas constitutive d'une perte de la chose louée et n'est pas imputable au bailleur, qui n'a donc pas manqué à son obligation de délivrance. Les loyers restaient dus. La crise sanitaire a ainsi montré les limites des mécanismes classiques face à un bouleversement économique, et l'intérêt d'anticiper contractuellement les circonstances exceptionnelles." },
                { title: "Code de la commande publique, article L. 6, 3° (extrait) et note rédigée pour l'exercice", text: "Selon le 3° de l'article L. 6 du code de la commande publique, lorsque survient un évènement extérieur aux parties, imprévisible et bouleversant temporairement l'équilibre du contrat, le cocontractant, qui en poursuit l'exécution, a droit à une indemnité. La théorie jurisprudentielle de 1916 est ainsi codifiée depuis 2019. Face à la forte hausse du prix des matières premières et de l'énergie en 2022, le Conseil d'État a, dans un avis rendu en septembre 2022, rappelé les conditions dans lesquelles les contrats publics peuvent être modifiés et l'indemnité d'imprévision versée, permettant aux acheteurs publics de soutenir leurs titulaires." },
              ],
              hints: [
                "Repérez les deux familles de documents : droit privé (doc. 1, 2, 4, 5, 6, 7) et droit public (doc. 3, 8). Faut-il les opposer ou les intégrer ?",
                "L'idée transversale : l'imprévision oscille entre force obligatoire / sécurité et équité / continuité.",
                "Le doc. 5 (clause de hardship) et le doc. 6 (exclusion financière) illustrent le caractère supplétif et les limites du mécanisme.",
              ],
              rubric: [
                "Les huit documents sont exploités et cités",
                "Aucune connaissance extérieure au dossier",
                "Introduction : accroche, définition, enjeux, problématique, annonce",
                "Plan apparent en deux parties, titres informatifs",
                "Mise en relation droit privé / droit public",
                "Conditions et mécanisme gradué de l'art. 1195 exactement restitués",
                "Caractère supplétif et aménagements contractuels (doc. 4, 5) ; exclusions (doc. 6)",
                "Style neutre, longueur maîtrisée",
              ],
              model: `**Introduction (exemple)**
Rendue célèbre par les crises — la guerre de 1914 (doc. 3), la crise sanitaire (doc. 7), la flambée des prix de 2022 (doc. 8) —, l'imprévision désigne le bouleversement, par un changement de circonstances imprévisible, de l'équilibre d'un contrat en cours d'exécution. Longtemps refusée par le juge judiciaire au nom de la force obligatoire (doc. 2), admise dès 1916 par le juge administratif (doc. 3), elle est consacrée en droit privé depuis 2016 (doc. 1, 4). Le dossier invite à mesurer comment le droit concilie sécurité contractuelle et adaptation aux circonstances.

**I. Une reconnaissance progressive de l'imprévision**
- A. Une divergence historique entre les ordres de juridiction : refus judiciaire (doc. 2) / indemnité d'imprévision administrative fondée sur la continuité du service public (doc. 3), codifiée en 2019 (doc. 8).
- B. La consécration par l'article 1195 : objectif de lutte contre les déséquilibres majeurs (doc. 4) ; conditions — changement imprévisible, exécution excessivement onéreuse, risque non accepté (doc. 1).

**II. Une adaptation encadrée du contrat**
- A. Un mécanisme gradué qui privilégie la négociation : renégociation avec poursuite de l'exécution, résolution ou adaptation conventionnelle, intervention judiciaire subsidiaire (doc. 1, 4) ; le droit public privilégie l'indemnisation et la modification du contrat (doc. 8).
- B. Une règle supplétive aux frontières marquées : aménagement ou exclusion par les clauses de hardship (doc. 5), exclusion légale pour les opérations financières (doc. 6), insuffisance des mécanismes classiques révélée par la crise sanitaire (doc. 7).`,
            },
          ],
        },
      ],
    },
  ],
  glossary: [
    { term: "Attendu de principe", def: "Phrase par laquelle la Cour de cassation énonce une règle générale, souvent placée après le visa dans un arrêt de cassation." },
    { term: "Visa", def: "Mention du texte ou du principe sur lequel la Cour fonde sa décision (« Vu l'article… »)." },
    { term: "Moyen", def: "Critique juridique adressée par le demandeur au pourvoi contre la décision attaquée ; il peut comporter plusieurs branches." },
    { term: "Manque de base légale", def: "Grief tiré de l'insuffisance des constatations de fait qui empêche la Cour de contrôler l'application de la règle." },
    { term: "Défaut de motifs", def: "Absence, contradiction de motifs ou défaut de réponse à conclusions (art. 455 CPC)." },
    { term: "Cassation sans renvoi", def: "La Cour met fin au litige elle-même lorsque les faits constatés le permettent (art. L. 411-3 COJ)." },
    { term: "Non-admission", def: "Rejet non motivé d'un pourvoi qui n'est manifestement pas de nature à entraîner la cassation (art. 1014 CPC)." },
    { term: "Revirement de jurisprudence", def: "Abandon par une juridiction d'une solution qu'elle retenait jusque-là." },
    { term: "Arrêt de principe", def: "Décision qui pose une règle générale destinée à s'appliquer au-delà de l'espèce." },
    { term: "Arrêt d'espèce", def: "Décision dont la solution est étroitement liée aux faits et dont la portée est limitée." },
    { term: "Motivation enrichie", def: "Motivation développée adoptée par la Cour de cassation pour ses arrêts les plus importants (solutions possibles, précédents, conséquences)." },
    { term: "Style direct", def: "Mode de rédaction des arrêts de la Cour de cassation depuis le 1er octobre 2019 : paragraphes numérotés, abandon des « attendu que »." },
    { term: "Obiter dictum", def: "Affirmation incidente d'une décision, non nécessaire à la solution.", latin: true },
    { term: "Ratio decidendi", def: "Motif déterminant d'une décision, qui en porte la solution.", latin: true },
    { term: "Syllogisme juridique", def: "Raisonnement en trois temps : règle (majeure), faits (mineure), conclusion." },
    { term: "Contrôle de proportionnalité", def: "Vérification que l'application d'une règle ne porte pas une atteinte disproportionnée à un droit fondamental dans le cas concret." },
  ],
};
