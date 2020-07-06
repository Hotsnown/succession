import { FamilyExample } from './interface'

export const simpsonsTree: FamilyExample = {
    abe: {
        id: "abe",
        name: "Abraham J. (Grandpa) Simpson",
        partners: ["unknown", "mona"],
        children: { unknown: ["herb"], mona: ["homer"] },
        status: 'valid'
    },
    unknown: { 
        id: "unknown", 
        name: "???" ,
        status: 'valid'
    },
    mona: { 
        id: "mona", 
        name: "Mona Penelope Simpson (née Olsen)",
        status: 'valid'
    },
    herb: { 
        id: "herb", 
        name: "Herbert (Herb) Powell",
        status: 'valid'
    },
    homer: {
        id: "homer",
        name: "Homer Jay Simpson",
        partners: ["marge"],
        children: { marge: ["bart", "lisa", "maggie"] },
        status: 'valid'
    },
    marge: { 
        id: "marge", 
        name: "Marjorie (Marge) Simpson (née Bouvier)",
        status: 'valid'
    },
    bart: { 
        id: "bart", 
        name: "Bartholomew (Bart) JoJo Simpson",
        status: 'valid'
    },
    lisa: {
        id: "lisa",
        name: "Lisa Marie Simpson",
        partners: ["millhouse"],
        children: { millhouse: ["millhouse_jr"] },
        status: 'valid'
    },
    maggie: { 
        id: "maggie", 
        name: "Margaret (Maggie) Eve Simpson",
        status: 'valid'
    },
    millhouse: { 
        id: "millhouse", 
        name: "Millhouse Van Houten",
        status: 'valid'
    },
    millhouse_jr: { 
        id: "millhouse_jr", 
        name: "Millhouse Van Houten Jr.",
        status: 'valid'
    }
};

export default simpsonsTree