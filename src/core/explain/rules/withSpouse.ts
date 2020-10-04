export const withSpouse = `
avecEpouxStrategie:
  titre: En présence d'un Conjoint survivant
  applicable si: epouxExiste
  formule:
    somme:
      - avecEpouxStrategie . avecDescendant
      - avecEpouxStrategie . avecParents
      - avecEpouxStrategie . avecAutres
 
avecEpouxStrategie . avecDescendant:
  titre: Répartition en concours avec des Descendants
  applicable si: descendantExiste
  formule:
    variations:
      - si: estEpoux
        alors:  0.25
      - si: estDescendant
        alors: repartitionParTete
      - sinon: 0

avecEpouxStrategie . avecParents:
  titre: Répartition en cours avec les Père et Mère
  applicable si: parentExiste
  formule: 1

avecEpouxStrategie . avecAutres:
  titre: Répartition en concours avec d'autres personnes
  formule:
    variations:
      - si: estEpoux
        alors: 1
      - sinon: 0
`