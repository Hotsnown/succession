import { FamilyExample } from "./interface";

const ordre1: FamilyExample = {
    deCujus: {
        id: "deCujus",
        name: "deCujus",
        partners: ["deadSpouse"],
        children: { deadSpouse: ["deadSon", "son"]},
        status: 'invalid'
    },
    deadSpouse: {
        id: "deadSpouse",
        name: "deadSpouse",
        status: 'invalid'
    },
    son: {
        id: "son",
        name: "son",
        status: "valid"
    },
    deadSon: {
        id: "deadSon",
        name: "deadSon",
        partners: ["deadSonSpouse"],
        children: { deadSonSpouse: [
            "grandchildren1",
            "grandchildren2",
            "grandchildren3",
        ]},
        status: 'invalid'
    },
    grandchildren1: {
        id: "grandchildren1",
        name: "grandchildren1",
        status: 'valid'
    },
    grandchildren2: {
        id: "grandchildren2",
        name: "grandchildren2",
        partners: ["grandchildren2Spouse"],
        children: {grandchildren2Spouse: ["grandgrandchildren"]},
        status: 'valid'
    },
    grandchildren2Spouse: {
        id: "grandchildren2Spouse",
        name: "grandchildren2Spouse",
        status: 'valid'
    },
    grandgrandchildren: {
        id: "grandgrandchildren",
        name: "grandgrandchildren",
        status: 'valid'
    },
    grandchildren3: {
        id: "grandchildren3",
        name: "grandchildren3",
        status: 'valid'
    }
}

export default ordre1