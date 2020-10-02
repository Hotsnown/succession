import Engine from "publicodes"

export interface Facts {
    nombreDeMembresDuDegreSuccessible : number,
    nombreDeMembresDeLordreFictif : number,
    estRepresentant: booleanfr,
    nombreDeParents: NombreDeParents,
    nombreDeBranches: NombreDeBranche,
    estParent: booleanfr,
    ordre1Applicable: booleanfr,
    ordre2Applicable: booleanfr,
    ordre3Applicable: booleanfr,
    ordre4Applicable: booleanfr,
    estEpoux: booleanfr,
    epouxExiste: booleanfr,
    descendantExiste: booleanfr
    estDescendant: booleanfr
}

type NombreDeBranche = 1 | 2
type NombreDeParents = 1 | 2
export type booleanfr = 'oui' | 'non'

export function setSituation (facts: Facts, engine: Engine<string>) {
    return engine.setSituation({facts})
}