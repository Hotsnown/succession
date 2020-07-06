import { FamilyExample } from "./interface";

const ordre1: FamilyExample = {
    deCujus: {
        id: "deCujus",
        name: "deCujus",
        partners: ["deadSpouse"],
        children: { deadSpouse: ["deadSon"]}
    },
    deadSpouse: {
        id: "deadSpouse",
        name: "deadSpouse",
    },
    deadSon: {
        id: "deadSon",
        name: "deadSon",
        partners: ["deadSonSpouse"],
        children: { deadSonSpouse: [
            "grandchildren1",
            "grandchildren2",
            "grandchildren3",
        ]}
    },
    grandchildren1: {
        id: "grandchildren1",
        name: "grandchildren1"
    },
    grandchildren2: {
        id: "grandchildren2",
        name: "grandchildren2",
        partners: ["grandchildren2Spouse"],
        children: {grandchildren2Spouse: ["grandgrandchildren"]}
    },
    grandgrandchildren: {
        id: "grandgrandchildren",
        name: "grandgrandchildren"
    },
    grandchildren3: {
        id: "grandchildren3",
        name: "grandchildren3"
    }
}

export default ordre1