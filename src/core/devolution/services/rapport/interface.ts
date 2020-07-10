export type RapportData = SansConjointData | AvecConjointData

export interface SansConjointData {
    ordres: OrdreData
    aptitude: Aptitude[]
}

export interface AvecConjointData {
    ordres: OrdreData
    degrés: DegréData[]
    aptitude: Aptitude[]
    correctifs: CorrectifData
    droits: DroitData[]
}

export interface OrdreData {
    descendants: string[];
    ascendantsPrivilégiés: string[];
    collatérauxPrivilégiés: string[];
    ascendants: string[];
    collatéraux: string[];
}

export interface DegréData {
    name: string;
    degré: number;
}

export interface CorrectifData {

}

export interface Aptitude {

}

export interface DroitData {
    name: string;
    droit: number;
}