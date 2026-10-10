L'essentiel du travail comptable quotidien porte sur quatre familles d'opérations : les **achats**, les **ventes**, les **règlements** et la **paie**, auxquelles s'ajoute la **déclaration de TVA**. Cette leçon donne les écritures types, celles que vous retrouverez dans tout grand livre.

## Les achats et les ventes : réductions de prix

Sur une facture, on distingue :

- les **réductions commerciales** (remise, rabais, ristourne) : si elles figurent **sur la facture d'origine**, on enregistre directement le **net commercial** ; si elles sont accordées **après coup** (facture d'avoir), on utilise les comptes **609** (RRR obtenus) ou **709** (RRR accordés) ;
- les **réductions financières** (escompte pour paiement anticipé) : enregistrées dans des comptes **financiers** — **665** escomptes accordés, **765** escomptes obtenus. La TVA est calculée sur le **net financier**.

:::exemple Facture d'achat avec remise de 10 %
Prix brut 5 000 € HT, remise 10 % → net commercial 4 500 € HT ; TVA 900 € ; TTC 5 400 €.
| Compte | Débit | Crédit |
|---|---|---|
| 607 Achats de marchandises | 4 500 | |
| 44566 TVA déductible | 900 | |
| 401 Fournisseurs | | 5 400 |
:::

:::exemple Facture de vente avec escompte de 2 % pour paiement comptant
Prix 8 000 € HT ; escompte 160 € ; net financier 7 840 € ; TVA 20 % sur le net : 1 568 € ; net à payer 9 408 €.
| Compte | Débit | Crédit |
|---|---|---|
| 411 Clients | 9 408 | |
| 665 Escomptes accordés | 160 | |
| 707 Ventes de marchandises | | 8 000 |
| 44571 TVA collectée | | 1 568 |
:::

## Les règlements

- Paiement d'un fournisseur par virement : **débit 401**, **crédit 512**.
- Encaissement d'un client : **débit 512**, **crédit 411**.
- La comptabilité est **rapprochée** chaque mois du relevé bancaire (état de rapprochement) : un contrôle fondamental contre les erreurs et les fraudes.

## La paie

La paie se comptabilise en deux temps.

:::exemple Paie du mois de Mobilia
Salaires bruts 7 500 € ; cotisations salariales 1 650 € ; prélèvement à la source de l'impôt sur le revenu 300 € ; net payé aux salariés 5 550 € ; cotisations patronales 3 000 €.

**1. Salaires**
| Compte | Débit | Crédit |
|---|---|---|
| 641 Rémunérations du personnel | 7 500 | |
| 431 Sécurité sociale (part salariale) | | 1 650 |
| 4421 Prélèvement à la source | | 300 |
| 421 Personnel — rémunérations dues | | 5 550 |

**2. Charges patronales**
| Compte | Débit | Crédit |
|---|---|---|
| 645 Charges de sécurité sociale et de prévoyance | 3 000 | |
| 431 Sécurité sociale | | 3 000 |

Le coût total pour l'entreprise est de 10 500 € (brut + charges patronales) ; le salarié touche 5 550 €.
:::

Dans la pratique, les cotisations se ventilent entre plusieurs organismes (431 Urssaf, 437 retraite complémentaire, prévoyance…) et sont déclarées par la **DSN** (déclaration sociale nominative) mensuelle.

## La TVA à payer

Chaque mois (régime réel normal) ou selon un calendrier allégé (régime simplifié), l'entreprise déclare la TVA : **TVA collectée − TVA déductible = TVA à décaisser** (ou crédit de TVA si le résultat est négatif).

:::exemple Déclaration du mois
TVA collectée 12 000 € ; TVA déductible sur achats 7 000 € ; sur immobilisations 1 000 € → TVA à décaisser 4 000 €.
| Compte | Débit | Crédit |
|---|---|---|
| 44571 TVA collectée | 12 000 | |
| 44566 TVA déductible sur ABS | | 7 000 |
| 44562 TVA déductible sur immobilisations | | 1 000 |
| 44551 TVA à décaisser | | 4 000 |

Puis le paiement : débit 44551, crédit 512.
:::

:::attention Les pièges de la TVA
- **Exigibilité** : pour les **ventes de biens**, la TVA est exigible à la livraison ; pour les **prestations de services**, à l'**encaissement** (sauf option pour les débits). Un prestataire ne reverse donc la TVA que lorsqu'il est payé.
- **TVA non récupérable** : véhicules de tourisme, cadeaux au-delà d'un faible montant unitaire, dépenses de logement des dirigeants… La TVA non récupérable devient une **charge** (ou s'ajoute au coût de l'immobilisation).
- **Autoliquidation** : pour les acquisitions intracommunautaires, certaines prestations de services internationales et la sous-traitance du BTP, c'est le **client** qui déclare la TVA (collectée et déductible en même temps).
:::

## Synthèse

- Remises sur facture : on enregistre le net ; RRR ultérieurs en 609/709 ; escomptes en 665/765, TVA sur le net financier.
- Règlements : 401/512, 512/411 ; rapprochement bancaire mensuel.
- Paie : 641 (brut) contre 431, 4421, 421 ; 645 (patronal) contre 431.
- TVA à décaisser = collectée − déductible ; exigibilité différente pour biens et services ; TVA non récupérable = charge.
