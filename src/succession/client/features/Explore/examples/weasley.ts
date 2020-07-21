/* prettier-ignore */
/*eslint-disable*/

import { FamilyExample } from './interface'

export const weasleyTree: FamilyExample = {
    arthur: {
        id: "arthur",
        name: "Arthur Weasley",
        partners: ["molly"],
        children: { molly: ["bill", "charlie", "percy", "fred", "george", "ron", "ginny"]},
        status: 'valid'
    },
    molly: { 
        id: "molly", 
        name: "Molly Weasley",
        status: 'valid'
    },
    bill: { 
        id: "bill", 
        name: "Bill Weasley",
        partners: ["fleur"],
        children: { fleur: ["victoire", "dominique", "louis"]},
        status: 'valid'
     },
    fleur: { 
        id: "fleur", 
        name: "Fleur Delacourt",
        status: 'valid'
    },
    victoire: { 
        id: "victoire", 
        name: "Victoire Weasley",
        status: 'valid'
    },
    dominique: { 
        id: "dominique", 
        name: "Dominique Weasley",
        status: 'valid'
    },
    louis: { 
        id: "louis", 
        name: "Louis Weasley",
        status: 'valid'
    },
    charlie: { 
        id: "charlie", 
        name: "Charlie Weasley",
        status: 'valid'
    },
    percy: { 
        id: "percy", 
        name: "Percy Weasley",
        partners: ["audrey"],
        children: { audrey: ["molly2", "lucy"]},
        status: 'valid'
    },
    audrey: { 
        id: "audrey", 
        name: "Audrey Weasley",
        status: 'valid'
    },
    molly2: { 
        id: "molly2", 
        name: "Molly Weasley",
        status: 'valid'
    },
    lucy: { 
        id: "lucy", 
        name: "Lucy Weasley",
        status: 'valid'
    },
    fred: { 
        id: "fred", 
        name: "Fred Weasley",
        status: 'valid'
    },
    george: { 
        id: "george", 
        name: "George Weasley",
        partners: ["angelina"],
        children: { angelina: ["fred2", "roxane"]},
        status: 'valid'
    },
    angelina: { 
        id: "angelina", 
        name: "Angelina Weasley",
        status: 'valid'
    },
    fred2: { 
        id: "fred2", 
        name: "Fred Weasley",
        status: 'valid'
    },
    roxane: { 
        id: "roxane", 
        name: "Roxane Weasley",
        status: 'valid'
    },
    ron: {
        id: "ron",
        name: "Ron Weasley",
        partners: ["hermione"],
        children: { hermione: ["rose", "hugo"]},
        status: 'valid'
    },
    hermione: { 
        id: "hermione", 
        name: "Hermione Granger",
        status: 'valid'
     },
    rose: { 
        id: "rose", 
        name: "Rose Weasley",
        status: 'valid'
    },
    hugo: { 
        id: "hugo", 
        name: "Hugo Weasley",
        status: 'valid'
    },
    ginny: {
        id: "ginny",
        name: "Ginny Weasley",
        partners: ["harry"],
        children: { harry: ["james", "albus", "lily"]},
        status: 'valid'
    },
    harry: { 
        id: "harry", 
        name: "Harry Potter",
        status: 'valid'
    },
    james: { 
        id: "james", 
        name: "James Potter",
        status: 'valid'
    },
    albus: { 
        id: "albus", 
        name: "Albus Potter",
        status: 'valid'
    },
    lily: { 
        id: "lily", 
        name: "Lily Potter",
        status: 'valid'
    },
};

export default weasleyTree