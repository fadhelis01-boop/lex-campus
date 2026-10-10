Toute la comptabilité repose sur un principe inventé il y a plus de cinq siècles : la **partie double**. Chaque opération est enregistrée deux fois, au **débit** d'un ou plusieurs comptes et au **crédit** d'un ou plusieurs autres, pour un même montant total. Une fois ce mécanisme compris, tout le reste n'est qu'application.

## Le compte

Un compte est un tableau à deux colonnes : à gauche le **débit**, à droite le **crédit**. Les mots ne signifient pas « dette » ou « crédit bancaire » : ce sont seulement les noms des colonnes.

:::retenir Les quatre règles qui suffisent
- Un compte d'**actif** (banque, client, matériel, stock) **augmente au débit** et diminue au crédit.
- Un compte de **passif** ou de **capitaux propres** (capital, emprunt, fournisseur) **augmente au crédit** et diminue au débit.
- Un compte de **charge** (classe 6) s'enregistre **au débit**.
- Un compte de **produit** (classe 7) s'enregistre **au crédit**.
:::

:::astuce Le réflexe qui évite les erreurs
Pour chaque opération, posez-vous deux questions : **qu'est-ce qui entre (ou qu'est-ce qu'on consomme) ?** → débit ; **d'où ça vient (ou qu'est-ce qu'on doit) ?** → crédit. Le banquier qui « crédite » votre compte le fait dans *sa* comptabilité, où votre dépôt est une dette envers vous : c'est pourquoi, dans *votre* comptabilité, la banque augmente au débit.
:::

## Le plan comptable

Les comptes sont numérotés selon le **plan comptable général** : le premier chiffre donne la **classe**.

| Classe | Contenu | Document |
|---|---|---|
| 1 | Capitaux (capital, réserves, résultat, emprunts, provisions) | Bilan (passif) |
| 2 | Immobilisations (et leurs amortissements) | Bilan (actif) |
| 3 | Stocks | Bilan (actif) |
| 4 | Tiers (clients, fournisseurs, État, personnel, associés) | Bilan |
| 5 | Financiers (banque, caisse) | Bilan |
| 6 | Charges | Compte de résultat |
| 7 | Produits | Compte de résultat |

Exemples : 101 Capital, 164 Emprunts, 218 Autres immobilisations corporelles, 401 Fournisseurs, 411 Clients, 44566 TVA déductible, 44571 TVA collectée, 512 Banque, 607 Achats de marchandises, 707 Ventes de marchandises. La rubrique **Plan comptable** de l'application les rassemble tous.

## Journal, grand livre, balance

1. **Journal** : chaque opération y est inscrite chronologiquement, sous forme d'**écriture** (date, comptes débités et crédités, montants, libellé, pièce justificative). L'écriture est toujours **équilibrée**.
2. **Grand livre** : les écritures sont reportées compte par compte.
3. **Balance** : liste de tous les comptes avec leurs totaux et soldes ; total des soldes débiteurs = total des soldes créditeurs. C'est le point de départ des comptes annuels.

## Les premières écritures de Mobilia

:::exemple Apport du capital (50 000 € versés en banque)
| Compte | Débit | Crédit |
|---|---|---|
| 512 Banque | 50 000 | |
| 101 Capital | | 50 000 |

La banque (actif) augmente → débit ; le capital (ressource) augmente → crédit.
:::

:::exemple Achat de marchandises à crédit : 10 000 € HT, TVA 20 %
| Compte | Débit | Crédit |
|---|---|---|
| 607 Achats de marchandises | 10 000 | |
| 44566 TVA déductible sur autres biens et services | 2 000 | |
| 401 Fournisseurs | | 12 000 |

On consomme des achats (charge) et on détient une créance de TVA sur l'État → débits ; on doit 12 000 € au fournisseur → crédit.
:::

:::exemple Vente de marchandises à crédit : 15 000 € HT, TVA 20 %
| Compte | Débit | Crédit |
|---|---|---|
| 411 Clients | 18 000 | |
| 707 Ventes de marchandises | | 15 000 |
| 44571 TVA collectée | | 3 000 |
:::

:::attention
La TVA collectée est une **dette** envers l'État (crédit), la TVA déductible une **créance** sur l'État (débit). Ni l'une ni l'autre ne touche le compte de résultat.
:::

## Synthèse

- Partie double : chaque écriture débite et crédite pour un même total.
- Actif et charges augmentent au débit ; passif, capitaux propres et produits augmentent au crédit.
- Classes 1 à 5 : bilan ; 6 et 7 : compte de résultat.
- Journal → grand livre → balance → comptes annuels.

L'atelier d'écritures ci-dessous vous fait passer les six premières opérations de Mobilia, avec correction automatique.
