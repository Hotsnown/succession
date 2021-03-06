import { Status } from '../../../../core/devolution/entities'
import { extendedJsonGedcomData } from './extendedJsonGedcomData'

const Ordre2: extendedJsonGedcomData = {
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
            status: Status.Deceased,
            fams: ["F1"],
            death: {
                date: {
                  day: 4,
                  month: 12,
                  year: 1840
                },
              },
        },
        {
            id: "mother",
            firstName: "mother",
            status: Status.Deceased,
            fams: ["F1"],
            death: {
                date: {
                  day: 4,
                  month: 12,
                  year: 1840
                },
              },
        },
        {
            id: "sibling1",
            firstName: "sibling1",
            status: Status.Valid,
            fams: ["F2"],
            famc: "F1"
        },
        {
            id: "sibling1Spouse",
            firstName: "sibling1Spouse",
            status: Status.Valid,
            fams: ["F2"]
        },
        {
            id: "nephew",
            firstName: "nephew",
            status: Status.Valid,
            famc: "F2"
        },
        {
            id: "sibling2",
            firstName: "sibling2",
            status: Status.Valid,
            famc: "F1"
        }
    ],
    fams: [
        {
            id: "F1",
            husb: "father",
            wife: "mother",
            children: ["deCujus", "sibling1", "sibling2"]
        },
        {
            id: "F2",
            husb: "sibling1",
            wife: "sibling1Spouse",
            children: ["nephew"]
        }
    ]
}

export default Ordre2