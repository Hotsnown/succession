import { Status } from '../../../../../core/devolution/entities'
import { extendedJsonGedcomData } from './extendedJsonGedcomData'

export const ordre4: extendedJsonGedcomData = {
    indis: [
        {
            id: "deCujus",
            firstName: "deCujus",
            status: Status.Deceased,
            famc: "F1"
        },
        {
            id: "father",
            firstName: "father",
            status: Status.Deceased,
            fams: ["F1"],
            famc: "F2"
        },
        {
            id: "mother",
            firstName: "mother",
            status: Status.Deceased,
            fams: ["F1"],
        },
        {
            id: "paternal_grand_father",
            firstName: "paternal_grand_father",
            status: Status.Deceased,
            fams: ["F2"]
        },
        {
            id: "paternal_grand_mother",
            firstName: "paternal_grand_mother",
            status: Status.Deceased,
            fams: ["F2"]
        },
        {
            id: "uncle",
            firstName: "uncle",
            status: Status.Valid,
            famc: "F2",
            fams: ["F3"]
        },
        {
            id: "uncleSpouse",
            firstName: "uncleSpouse",
            status: Status.Valid,
            fams: ["F3"]
        },
        {
            id: "cousin",
            firstName: "cousin",
            status: Status.Valid,
            famc: "F3"
        }
    ],
    fams: [
        {
            id: "F1",
            children: ["deCujus"],
            husb: "father",
            wife: "mother"
        },
        {
            id: "F2",
            children: ["father", "uncle"],
            husb: "paternal_grand_father",
            wife: "paternal_grand_mother"
        },
        {
            id: "F3",
            children: ["cousin"],
            husb: "uncle",
            wife: "uncleSpouse"
        }
    ]
}