import { FamilyExample } from './interface'

const ordre1AvecRepresentation: FamilyExample = {
    deCujus: {
        id: "deCujus",
        name: "deCujus",
        partners: ["deCujusSpouse"],
        children: { deCujusSpouse: ["représenté", "normalHeir"]}
    },
    normalHeir: {
        id: "normalHeir",
        name: "normalHeir",
    },
    représenté: {
        id: "représenté",
        name: "représenté",
        partners: ["représentéSpouse"],
        children: { représentéSpouse : [
            "représentant1",
            "représentant2",
            "deadReprésentant"
        ]}
    },
    représentant1: {
        id: "représentant1",
        name: "représentant1"
    },
    représentant2: {
        id: "représentant2",
        name: "représentant2"
    },
    deadReprésentant: {
        id: "deadReprésentant",
        name: "deadReprésentant",
        partners: ["deadReprésentantSpouse"],
        children: { deadReprésentantSpouse: ["subReprésentant"]}
    },
    subReprésentant: {
        id: "subReprésentant",
        name: "subReprésentant"
    }
}

export default ordre1AvecRepresentation