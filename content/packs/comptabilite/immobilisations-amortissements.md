Les biens durables ne sont pas des charges de l'exercice où on les achète : ils sont **immobilisés** à l'actif puis « consommés » progressivement par l'**amortissement**. C'est une source majeure d'écart entre trésorerie et résultat, et un terrain fiscal important.

## Qu'est-ce qu'une immobilisation ?

Un élément identifiable du patrimoine, ayant une **valeur économique positive** pour l'entreprise, dont elle a le **contrôle** et dont elle attend des **avantages économiques futurs**, destiné à servir de façon **durable** à l'activité (plus d'un exercice).

- **Incorporelles** (20) : logiciels, brevets, marques, fonds commercial.
- **Corporelles** (21) : terrains, constructions, matériel, mobilier, véhicules.
- **Financières** (26-27) : titres de participation, prêts, dépôts de garantie.

:::astuce
Par **tolérance fiscale**, les biens de faible valeur (inférieure à 500 € HT l'unité) peuvent être comptabilisés directement en charges. Les **dépenses d'entretien** sont des charges ; celles qui **prolongent la durée** d'utilisation ou augmentent la valeur d'un bien s'immobilisent.
:::

## Le coût d'entrée

Prix d'achat **hors TVA récupérable**, après remises, **plus** les frais directement attribuables à la mise en état d'utilisation (transport, installation, honoraires). Les **droits de mutation, honoraires et commissions** liés à l'acquisition peuvent être immobilisés ou passés en charges (option).

**Approche par composants** : lorsqu'un élément comporte des composants significatifs ayant des durées d'utilisation différentes (par exemple la toiture d'un immeuble), chacun est amorti sur sa propre durée.

## L'amortissement

L'amortissement constate la **consommation** des avantages économiques du bien sur sa **durée d'utilisation**.

### Le mode linéaire

Annuité constante = base amortissable / durée. La première annuité est calculée **prorata temporis**, à compter de la **mise en service**.

:::exemple Machine acquise 36 000 € HT, mise en service le 1er avril N, durée 6 ans
- Annuité pleine : 36 000 / 6 = 6 000 €.
- Annuité N (9 mois) : 6 000 × 9/12 = **4 500 €**.

| Compte | Débit | Crédit |
|---|---|---|
| 6811 Dotations aux amortissements | 4 500 | |
| 281 Amortissements des immobilisations corporelles | | 4 500 |

La valeur nette comptable (VNC) à fin N : 36 000 − 4 500 = 31 500 €.
:::

### Le mode dégressif (fiscal)

Réservé à certains biens neufs (matériels industriels notamment), il accélère l'amortissement : taux linéaire × **coefficient** (1,25 pour 3 ou 4 ans ; 1,75 pour 5 ou 6 ans ; 2,25 au-delà de 6 ans). Le prorata part du **premier jour du mois d'acquisition**.

:::exemple Même machine, en dégressif
Taux linéaire 1/6 = 16,67 % ; taux dégressif = 16,67 % × 1,75 = 29,17 % ; annuité N : 36 000 × 29,17 % × 9/12 = **7 875 €**.
:::

### L'amortissement dérogatoire

Quand l'amortissement **fiscal** (ici dégressif, 7 875 €) excède l'amortissement **comptable** économique (linéaire, 4 500 €), la différence (3 375 €) est enregistrée en **amortissement dérogatoire**, une provision réglementée inscrite dans les capitaux propres :

| Compte | Débit | Crédit |
|---|---|---|
| 6872 Dotations aux provisions réglementées | 3 375 | |
| 145 Amortissements dérogatoires | | 3 375 |

Il permet de bénéficier de l'avantage fiscal (déduction plus rapide) sans fausser l'amortissement économique. Il se reprend (7872) en fin de plan.

## La dépréciation des immobilisations

Si la valeur actuelle d'un bien devient inférieure à sa VNC (obsolescence, perte de marché), on constate une **dépréciation** (291, 6816) — réversible, contrairement à l'amortissement.

## La cession d'une immobilisation

:::exemple Cession d'un matériel acquis 20 000 €, amorti à hauteur de 12 000 €, vendu 9 000 € HT (TVA 1 800 €) payés comptant
**1. Le prix de cession**
| Compte | Débit | Crédit |
|---|---|---|
| 512 Banque | 10 800 | |
| 775 Produits des cessions d'éléments d'actif | | 9 000 |
| 44571 TVA collectée | | 1 800 |

**2. La sortie du bien** (après avoir comptabilisé l'amortissement jusqu'à la date de cession)
| Compte | Débit | Crédit |
|---|---|---|
| 281 Amortissements | 12 000 | |
| 675 Valeurs comptables des éléments d'actif cédés | 8 000 | |
| 215 Matériel | | 20 000 |

Plus-value : 9 000 − 8 000 = 1 000 €.
:::

:::attention
Le règlement ANC 2022-06 (exercices ouverts depuis 2025) a revu la frontière entre résultat courant et exceptionnel ; la présentation des cessions d'immobilisations et des provisions réglementées dans le compte de résultat doit être vérifiée au regard de la rédaction actuelle du PCG.
:::

## Synthèse

- Immobilisation : contrôle, avantages futurs, usage durable ; coût d'entrée hors TVA récupérable, frais accessoires inclus.
- Amortissement linéaire prorata temporis depuis la mise en service ; dégressif fiscal (coefficients 1,25 / 1,75 / 2,25) depuis le premier jour du mois d'acquisition.
- L'excédent d'amortissement fiscal → amortissement dérogatoire (145).
- Cession : 775 pour le prix, 675 pour la VNC ; plus-value = prix − VNC.
