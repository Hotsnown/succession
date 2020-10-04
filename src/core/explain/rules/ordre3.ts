export const ordre3 = `
ordre3:
  titre: Ordre 3
  description: |
    La fente ascendante est le mécanisme divisant la masse successorale en deux parts égales, dont l'une est répartie entre les ascendants de la branche paternelle et l'autre entre les ascendants de la branche maternelle.
    La branche maternelle est composée de la mère et des ascendants de la mère. La branche paternelle est composée du père et des ascendants du père.
  applicable si: ordrePrivilegie = 3
  formule: 
    somme:
      - ordre3 . degre1
      - ordre3 . degre2
      - ordre3 . degre3
      - ordre3 . degre4
      - ordre3 . degre5
      - ordre3 . degre6
  references:
    Répartition père et mère: https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000006430967
    Fente ascendante: https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000006431160
    Branches: https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000006431041

ordre3 . degre1:
  titre: Degré 1
  applicable si: degreSuccessible = 1
  formule:
    produit: 
      assiette: repartitionParTete 
      facteur: 1 / nombreDeBranches

ordre3 . degre2:
  titre: Degré 2
  applicable si: degreSuccessible = 2
  formule:
    produit: 
      assiette: repartitionParTete 
      facteur: 1 / nombreDeBranches

ordre3 . degre3:
  titre: Degré 3
  applicable si: degreSuccessible = 3
  formule:
    produit: 
      assiette: repartitionParTete 
      facteur: 1 / nombreDeBranches

ordre3 . degre4:
    titre: Degré 4
    applicable si: degreSuccessible = 4
    formule:
      produit: 
        assiette: repartitionParTete 
        facteur: 1 / nombreDeBranches

ordre3 . degre5:
  titre: Degré 5
  applicable si: degreSuccessible = 5
  formule:
    produit: 
      assiette: repartitionParTete 
      facteur: 1 / nombreDeBranches

ordre3 . degre6:
  titre: Degré 6
  applicable si: degreSuccessible = 6
  formule:
    produit: 
      assiette: repartitionParTete 
      facteur: 1 / nombreDeBranches
      `