
export const default1 = `
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
  
  references:
    - Article 720: https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000006430690
 
repartitionParSouche:
  applicable si: estRepresentant
  titre: Répartition par souche
  description: |
    En principe, les héritiers les plus éloignés sont exclus par les héritiers d'un degré plus proche. Par exception, la représentation  est la fiction légale par laquelle un héritier exerce les droits d'un autre héritier qui, quoique d'un degré plus proche, ne vient pas à la succession. Le représentant est l'héritier qui exerce ses droits. Le représenté est l'héritier qui s'abstient.
    La représentation n'est applicable qu'en présence d'une dévolution légale, pas en cas de dévolution testamentaire.
    Le représenté est un descendant ou un collatéral privilégié. Le représenté est prédécédé (754), indigne (755) ou renonçant (754)
    Le représentant est un descendant du défunt (752) ou un descendant d'un collatéral privilégié (752-2). Le représentant doit être personnellement apte à recueillir la succession du défunt. Indifférence à la renonciation du représenté (754)
  formule: 1 / nombreDeMembresDeLordreFictif
  références: 
    Source: https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000006431076

repartitionParTete:
  titre: Répartition par tête
  applicable si: nEstPasRepresentant
  description: |
    En principe, à l'intérieur de l'ordre favorable, l'héritier le plus proche exclut l'héritier le plus éloigné. Cette proximité est mesurée par le degré séparant le de cujus et l'héritier visé, dont le calcul dépend de la nature directe ou collatérale de la ligne.
    Au sein d'un même ordre, les personnes de degré identique reçoivent une part identique.
  formule: 1 / nombreDeMembresDuDegreSuccessible
  références:
    Source: https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000006431034

sansEpouxStrategie:
  titre: En l'absence d'un Conjoint survivant
  formule:
    somme:
      - ordre1
      - ordre2
      - ordre3
      - ordre4
  references:
    Des droits des parents en l'absence de conjoint successible. (Articles 733 à 755): https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000006430946
`