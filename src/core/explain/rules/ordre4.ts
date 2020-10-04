export const ordre4 = `
ordre4:
  titre: Ordre 4
  description: |
    La fente collatérale est le mécanisme divisant la masse successorale en deux parts égales, dont l'une est répartie entre les membres de la branche paternelle et l'autre entre les membres de la branche maternelle.
    La branche maternelle est composée des collatéraux du de cujus dont l'auteur commun est la mère ou un ascendant de la mère. La branche paternelle est composée des collatéraux du de cujus dont l'auteur commun est le père ou un ascendant du père.  
  applicable si: ordrePrivilegie = 4
  formule:
    somme:
      - ordre4 . degre1
      - ordre4 . degre2
      - ordre4 . degre3
      - ordre4 . degre4
      - ordre4 . degre5
      - ordre4 . degre6

ordre4 . degre1:
  titre: Degré 1
  applicable si: degreSuccessible = 1
  formule:
    produit: 
      assiette: repartitionParTete 
      facteur: 1 / nombreDeBranches

ordre4 . degre2:
  titre: Degré 2
  applicable si: degreSuccessible = 2
  formule:
    produit: 
      assiette: repartitionParTete 
      facteur: 1 / nombreDeBranches

ordre4 . degre3:
  titre: Degré 3
  applicable si: degreSuccessible = 3
  formule:
    produit: 
      assiette: repartitionParTete 
      facteur: 1 / nombreDeBranches

ordre4 . degre4:
    titre: Degré 4
    applicable si: degreSuccessible = 4
    formule:
      produit: 
        assiette: repartitionParTete 
        facteur: 1 / nombreDeBranches

ordre4 . degre5:
  titre: Degré 5
  applicable si: degreSuccessible = 5
  formule:
    produit: 
      assiette: repartitionParTete 
      facteur: 1 / nombreDeBranches

ordre4 . degre6:
  titre: Degré 6
  applicable si: degreSuccessible = 6
  formule:
    produit: 
      assiette: repartitionParTete 
      facteur: 1 / nombreDeBranches
      `