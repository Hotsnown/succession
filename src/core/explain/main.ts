import Engine, { formatValue } from 'publicodes'

const rules = `
droits de pierre:
  formule:
    variations:
      - si: époux existe
        alors: avec époux stratégie
      - sinon: sans époux stratégie

# ---------------- FACTS ----------------

appartient à l'ordre privilégié:
  formule: oui

appartient au degré privilégié:
  formule: oui

apte à hériter:
  formule: oui

nombre de membre de l'ordre privilégié: 
  formule: 5

existence de représentant:
  formule: non

ordre1 applicable:
  formule: non

ordre2 applicable:
  formule: non

ordre3 applicable:
  formule: oui

ordre4 applicable:
  formule: non

existence de père et mère:
  formule: oui

existence de père ou mère:
  formule: oui

époux existe:
  formule: oui

descendant existe:
  formule: oui

est époux:
  formule: non

est descendant:
  formule: oui

droits de la branche:
  formule: 0.5

est père:
  formule: non

est mère:
  formule: non

est collatéral privilégié:
  formule: non

# ---------------- RULES ----------------

# Commun

répartition:
  formule: 
     variations:
      - si: existence de représentant
        alors: répartition par souche
      - sinon: répartition par tête

répartition par tête:
  applicable si:
   toutes ces conditions:
      - appartient à l'ordre privilégié
      - appartient au degré privilégié
      - apte à hériter
  formule:
    valeur: 1 / nombre de membre de l'ordre privilégié

répartition par souche:
  formule: 1

# Epoux
avec époux stratégie:
  formule:
    variations:
      - si: descendant existe
        alors: avec descendant
      - sinon: sans descendant

avec descendant:
  formule:
    variations:
      - si: est époux
        alors:  0.25
      - si: est descendant
        alors: répartition
      - sinon: 0

sans descendant:
  formule:
    variations:
      - si: est époux
        alors: 1
      - sinon: 0

# Sans époux
ordre1:
  formule:
   répartition

ordre2:
  formule:
    variations:
      - si: existence de père et mère
        alors: répartition en concours père et mère
      - si: existence de père ou mère
        alors: répartition en concours père et mère
      - sinon: répartition par tête

ordre3:
  formule:
    répartition par branche

ordre4:
  formule:
    répartition par branche

répartition en concours père et mère:
  formule:
    variations:
      - si: est père
        alors: 0.25
      - si: est mère
        alors: 0.25
      - si: est collatéral privilégié
        alors: répartition
      - sinon: 0

répartition en concours père ou mère:
  formule:
    variations:
      - si: est père
        alors: 0.5
      - si: est mère
        alors: 0.5
      - si: est collatéral privilégié
        alors: répartition
      - sinon: 0

sans époux stratégie:
  formule:
    variations:
      - si: ordre1 applicable
        alors: ordre1
      - si: ordre2 applicable
        alors: ordre2
      - si: ordre3 applicable
        alors: ordre3
      - si: ordre4 applicable
        alors: ordre4

   
répartition par branche:
  formule:
    valeur: 1 * droits de la branche / nombre de membre de l'ordre privilégié
`

export const engine = new Engine(rules)
const dépenses = engine.evaluate('droits de pierre')
export const result = `${formatValue(dépenses)}`
