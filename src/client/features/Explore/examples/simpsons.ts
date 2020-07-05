import { FamilyExample } from './interface'

export const simpsonsTree: FamilyExample = {
    abe: {
        id: "abe",
        name: "Abraham J. (Grandpa) Simpson",
        partners: ["unknown", "mona"],
        children: { unknown: ["herb"], mona: ["homer"] }
    },
    unknown: { 
        id: "unknown", 
        name: "???" 
    },
    mona: { 
        id: "mona", 
        name: "Mona Penelope Simpson (née Olsen)" 
    },
    herb: { 
        id: "herb", 
        name: "Herbert (Herb) Powell" 
    },
    homer: {
        id: "homer",
        name: "Homer Jay Simpson",
        partners: ["marge"],
        children: { marge: ["bart", "lisa", "maggie"] }
    },
    marge: { 
        id: "marge", 
        name: "Marjorie (Marge) Simpson (née Bouvier)" 
    },
    bart: { 
        id: "bart", name: "Bartholomew (Bart) JoJo Simpson" },
    lisa: {
        id: "lisa",
        name: "Lisa Marie Simpson",
        partners: ["millhouse"],
        children: { millhouse: ["millhouse_jr"] }
    },
    maggie: { 
        id: "maggie", 
        name: "Margaret (Maggie) Eve Simpson" 
    },
    millhouse: { 
        id: "millhouse", 
        name: "Millhouse Van Houten" 
    },
    millhouse_jr: { 
        id: "millhouse_jr", 
        name: "Millhouse Van Houten Jr." 
    }
};

export default simpsonsTree