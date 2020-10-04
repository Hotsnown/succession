import { Status } from '../../../../core/devolution/entities'
import { extendedJsonGedcomData } from './extendedJsonGedcomData'

const Ordre3: extendedJsonGedcomData = {
    indis: [
        {
            id: "deCujus",
            firstName: "deCujus",
            status: Status.Deceased,
            famc: "F1",
            death: {
                date: {
                  day: 4,
                  month: 12,
                  year: 1840
                },
              },
        },
        {
            id: "father",
            firstName: "father",
            status: Status.Valid,
            fams: ["F1"],
            famc: "F2"
        },
        {
            id: "mother",
            firstName: "mother",
            status: Status.Valid,
            fams: ["F1"],
            famc: "F3"
        },
        {
            id: "paternal_grand_father",
            firstName: "paternal_grand_father",
            status: Status.Valid,
            fams: ["F2"],
        },
        {
            id: "paternal_grand_mother",
            firstName: "paternal_grand_mother",
            status: Status.Valid,
            fams: ["F2"],
        },
        {
            id: "maternal_grand_father",
            firstName: "maternal_grand_father",
            status: Status.Valid,
            fams: ["F3"],
            famc: "F4"
        },
        {
            id: "maternal_grand_mother",
            firstName: "maternal_grand_mother",
            status: Status.Valid,
            fams: ["F3"],
        },
        {
            id: "maternal_grand_grand_father",
            firstName: "maternal_grand_father",
            status: Status.Valid,
            fams: ["F4"],
        },
        {
            id: "maternal_grand_grand_mother",
            firstName: "maternal_grand_father",
            status: Status.Valid,
            fams: ["F4"],
        },
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
            children: ["father"],
            husb: "paternal_grand_father",
            wife: "paternal_grand_mother"
        },
        {
            id: "F3",
            children: ["mother"],
            husb: "maternal_grand_father",
            wife: "paternal_grand_mother"
        },
        {
            id: "F4",
            children: ["maternal_grand_father"],
            husb: "maternal_grand_grand_father",
            wife: "maternal_grand_grand_mother"
        }
    ]
}

export default Ordre3