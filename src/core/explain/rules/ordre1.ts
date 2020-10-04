export const ordre1 = `
ordre1:
  titre: Ordre 1
  description: |
    Famille = (membres exclus + membres inclus[membres de plein droit et représentants]).
    - Si non représentant = (1 / nombre de membres de l’ordre privilégié).
    - Si représentant = (1 / nombre de membres de l’ordre fictif) où les membres de l’ordre fictif sont tous les enfants directs des ascendants du représenté (= toutes les personnes qui auraient été appelées si le représenté n’était pas mort).   
  applicable si: ordrePrivilegie = 1
  formule :
    somme:
      - ordre1 . degre1
      - ordre1 . degre2
      - ordre1 . degre3
      - ordre1 . degre4
      - ordre1 . degre5
      - ordre1 . degre6
  references:
    Catégorisation de l'ordre: https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000006430952
    Catégorisation du lien de filiation: https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000006430957
    Répartition par souche: https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000006431069

ordre1 . degre1:
  titre: Degré 1
  applicable si: degreSuccessible = 1
  formule:
    somme:
      - repartitionParTete
      - repartitionParSouche

ordre1 . degre2:
  titre: Degré 2
  applicable si: degreSuccessible = 2
  formule:
    somme:
      - repartitionParTete
      - repartitionParSouche

ordre1 . degre3:
  titre: Degré 3
  applicable si: degreSuccessible = 3
  formule:
    somme:
      - repartitionParTete
      - repartitionParSouche

ordre1 . degre4:
    titre: Degré 4
    applicable si: degreSuccessible = 4
    formule:
      somme:
        - repartitionParTete
        - repartitionParSouche

ordre1 . degre5:
  titre: Degré 5
  applicable si: degreSuccessible = 5
  formule:
    somme:
      - repartitionParTete
      - repartitionParSouche

ordre1 . degre6:
  titre: Degré 6
  applicable si: degreSuccessible = 6
  formule:
    somme:
      - repartitionParTete
      - repartitionParSouche
`