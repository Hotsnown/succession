import { Status } from '../../entities'

export interface GEDCOM {
    indis: Indi[]
    fams: Fam[]
}

interface Indi {
    id: string
    firstName: string
    status: Status
    fams?: string[]
    famc?: string
}

interface Fam {
    id: string
    children: string[]
    husb: string
    wife: string
}