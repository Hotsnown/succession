
export const rules = `
droitsDePierre:
  titre: Devolution
  description: |
    (§1) **Ouverture**:
    - L'article 720 dispose que les successions sont ouvertes à cause de mort au dernier domicile du défunt. [...] est décédé. Il en résulte que les articles 720 et suivants s'appliquent.
    
    (§2) **Types de dévolution**:
    - En principe, la loi organise la succession du défunt par la dévolution ab intestat.
    - Par exception, les successions peuvent être anomales ou testamentaires. Une succession est anomale en raison de la nature ou de l'origine du bien successoral. Une succession est testamentaire en présence d'une manifestation de volonté à cause de mort émanant du défunt.
    
    (§3) **Existence d'un conjoint survivant**:
    - Le conjoint survivant est la personne liée au défunt par un contrat de mariage existant au jour de l'ouverture de la succession et n'ayant pas renoncé aux droits successoraux en cas de séparation de corps.
    - Un conjoint n'est pas lié par un contrat de mariage au jour de l'ouverture de la succession quand le mariage est nul, posthume, ou dissous par divorce.
    - Le jour de la dissolution du mariage est le jour où le jugement de divorce acquiert l'autorité de chose jugée, c'est à dire en cas d'épuisement des voies de recours ou d'acquiescement au jugement.
    - En l'absence d'un conjoint survivant, les articles 733 et suivants s'appliquent. En présence d'un conjoint survivant, les articles 756 et suivants s'appliquent.

  formule:
    somme:
      - avecEpouxStrategie
      - sansEpouxStrategie
 
nombreDeMembresDuDegreSuccessible :
  titre: Nombre de Membres du Degré Privilégié

nombreDeMembresDeLordreFictif :
  titre: Nombre de Membres de L'ordre Fictif

estRepresentant:
nombreDeParents:
nombreDeBranches:
estParent:
ordre1Applicable:
ordre2Applicable:
ordre3Applicable:
ordre4Applicable:
estEpoux:
epouxExiste:
descendantExiste:
estDescendant:

nEstPasParent: 
  formule: non
 
repartitionParSouche:
  applicable si: estRepresentant
  titre: Répartition par souche
  description: Dans tous les cas où la représentation est admise, le partage s'opère par souche, comme si le représenté venait à la succession ; s'il y a lieu, il s'opère par subdivision de souche. A l'intérieur d'une souche ou d'une subdivision de souche, le partage se fait par tete.
  formule: 1 / nombreDeMembresDeLordreFictif
  références: 
    Source: https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000006431076

repartitionEnConcoursAscendant:
  formule: 1

repartitionParTete:
  titre: Répartition par tête
  description: Au sein d'un même ordre, les personnes de degré identique reçoivent une part identique.
  formule: 1 / nombreDeMembresDuDegreSuccessible
  références:
    Source: https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000006431034

repartitionEnConcoursPereEtMere:
  applicable si: estParent
  formule: 1 / nombreDeParents

repartitionSansConcoursAscendant:
  applicable si: nEstPasParent
  formule:
    produit:
      assiette :
        somme:
          - repartitionParTete
          - repartitionParSouche
      facteur : 1 / 2
    
ordre1:
  titre: Ordre 1
  description: |
    Famille = (membres exclus + membres inclus[membres de plein droit et représentants]).
    - Si non représentant = (1 / nombre de membres de l’ordre privilégié).
    - Si représentant = (1 / nombre de membres de l’ordre fictif) où les membres de l’ordre fictif sont tous les enfants directs des ascendants du représenté (= toutes les personnes qui auraient été appelées si le représenté n’était pas mort).   
  applicable si: ordre1Applicable
  formule :
    somme:
      - repartitionParTete
      - repartitionParSouche
 
ordre2:
  titre: Ordre 2
  description: 
  applicable si: ordre2Applicable
  formule:
    somme:
    - repartitionEnConcoursAscendant
    - repartitionSansConcoursAscendant

ordre3:
  titre: Ordre 3
  applicable si: ordre3Applicable
  formule: 
    produit: 
      assiette: repartitionParTete 
      facteur: 1 / nombreDeBranches
 
ordre4:
  titre: Ordre 4
  applicable si: ordre4Applicable
  formule:
    produit:
        assiette: repartitionParTete 
        facteur: 1 / nombreDeBranches
 
sansEpouxStrategie:
  formule:
    somme:
      - ordre1
      - ordre2
      - ordre3
      - ordre4
 
avecEpouxStrategie:
  applicable si: epouxExiste
  formule:
    somme:
      - avecDescendant
      - sansDescendant
 
avecDescendant:
  formule:
    variations:
      - si: estEpoux
        alors:  0.25
      - si: estDescendant
        alors: repartitionParTete
      - sinon: 0
 
sansDescendant:
  formule:
    variations:
      - si: estEpoux
        alors: 1
      - sinon: 0
`