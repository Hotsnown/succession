import { Status } from '../../../../core/devolution/entities'
import { extendedJsonGedcomData } from './extendedJsonGedcomData'

const Ordre1: extendedJsonGedcomData = {
    indis: [
        {
            id: "deCujus",
            firstName: "deCujus",
            status: Status.Deceased,
            fams: ["F1"]
        },
        {
            id: "deadSpouse",
            firstName: "deadSpouse",
            status: Status.Deceased,
            fams: ["F1"]
        },
        {
            id: "son",
            firstName: "son",
            status: Status.Valid,
            famc: "F1"
        },
        {
            id: "deadSon",
            status: Status.Deceased,
            firstName: "deadSon",
            famc: "F1",
            fams: ["F2"]
        },
        {
            id: "deadSonSpouse",
            status: Status.Valid,
            firstName: "deadSonSpouse",
            fams: ["F2"]
        },
        {
            id: "grandchildren1",
            status: Status.Valid,
            firstName: "grandchildren1",
            famc: "F2"
        },
        {
            id: "grandchildren2",
            status: Status.Valid,
            firstName: "grandchildren2",
            famc: "F2",
            fams: ["F3"]
        },
        {
            id: "grandchildren3",
            status: Status.Valid,
            firstName: "grandchildren3",
            famc: "F2"
        },
        {
            id: "grandchildren2Spouse",
            status: Status.Valid,
            firstName: "grandchildren2Spouse",
            fams: ["F3"]
        },
        {
            id: "grandgrandchildren",
            status: Status.Valid,
            firstName: "grandgrandchildren",
            famc: "F3"
        }
    ],
    fams: [
        {
            id: "F1",
            children: ["son", "deadSon"],
            husb: "deCujus",
            wife: "deadSpouse"
        },
        {
            id: "F2",
            children: ["grandchildren1", "grandchildren2", "grandchildren3"],
            husb: "deadSon",
            wife: "deadSonSpouse"
        },
        {
            id: "F3",
            children: ["grandgrandchildren"],
            husb: "grandchildren2",
            wife: "grandchildren2Spouse"
        }
    ]
}

export default Ordre1