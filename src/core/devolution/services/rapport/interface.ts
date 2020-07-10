export type RapportData = SansConjointData | AvecConjointData

interface SansConjointData {
    ordres: OrdreData
    aptitude: Aptitude[]
}

interface AvecConjointData {
    ordres: OrdreData
    degrés: DegréData[]
    aptitude: Aptitude[]
    correctifs: CorrectifData
    droits: DroitData[]
}

interface OrdreData {
    descendants: string[];
    ascendantsPrivilégiés: string[];
    collatérauxPrivilégiés: string[];
    ascendants: string[];
    collatéraux: string[];
}

interface DegréData {
    name: string;
    degré: number;
}

interface CorrectifData {

}

interface Aptitude {

}

interface DroitData {
    name: string;
    droit: number;
}