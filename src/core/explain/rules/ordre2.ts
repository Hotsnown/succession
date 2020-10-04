export const ordre2 = `
repartitionSansConcoursAscendant:
  titre: Répartition sans concours avec les Parents
  formule:
    somme:
    - repartitionParSouche
    - repartitionParTete

repartitionEnConcoursAscendant:
  titre: Répartition en concours avec les Parents
  formule: 
    somme:
      - repartitionPourPereEtMere
      - repartitionPourAutres

repartitionPourPereEtMere:
  titre: Répartition pour Père ou Mère
  applicable si: estParent
  formule: 1 / nombreDeParents

repartitionPourAutres:
  titre: Répartition pour les Autres
  applicable si: nEstPasParent
  formule:
    produit:
      assiette :
        somme:
        - repartitionParSouche
        - repartitionParTete
      facteur : 1 / 2

ordre2:
  titre: Ordre 2
  applicable si: ordrePrivilegie = 2
  formule:
    somme:
      - ordre2 . degre1
      - ordre2 . degre2
      - ordre2 . degre3
      - ordre2 . degre4
      - ordre2 . degre5
      - ordre2 . degre6
  references: 
    Répartition en concours Père et Mère : https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000006430985
    Répartition par souche: https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000006431069
    Droit de retour des Père et Mère : https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000006431168

ordre2 . degre1:
  titre: Degré 1
  applicable si: degreSuccessible = 1
  formule:
    somme:
      - repartitionEnConcoursAscendant
      - repartitionSansConcoursAscendant

ordre2 . degre2:
  titre: Degré 2
  applicable si: degreSuccessible = 2
  formule:
    somme:
      - repartitionEnConcoursAscendant
      - repartitionSansConcoursAscendant

ordre2 . degre3:
  titre: Degré 3
  applicable si: degreSuccessible = 3
  formule:
    somme:
      - repartitionEnConcoursAscendant
      - repartitionSansConcoursAscendant

ordre2 . degre4:
    titre: Degré 4
    applicable si: degreSuccessible = 4
    formule:
      somme:
        - repartitionEnConcoursAscendant
        - repartitionSansConcoursAscendant

ordre2 . degre5:
  titre: Degré 5
  applicable si: degreSuccessible = 5
  formule:
    somme:
      - repartitionEnConcoursAscendant
      - repartitionSansConcoursAscendant

ordre2 . degre6:
  titre: Degré 6
  applicable si: degreSuccessible = 6
  formule:
    somme:
      - repartitionEnConcoursAscendant
      - repartitionSansConcoursAscendant
`