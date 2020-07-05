import { FamilyExample } from './interface'

export const weasleyTree: FamilyExample = {
    arthur: {
        id: "arthur",
        name: "Arthur Weasley",
        partners: ["molly"],
        children: { molly: ["bill", "charlie", "percy", "fred", "george", "ron", "ginny"]}
    },
    molly: { id: "molly", name: "Molly Weasley" },
    bill: { 
        id: "bill", 
        name: "Bill Weasley",
        partners: ["fleur"],
        children: { fleur: ["victoire", "dominique", "louis"]}
     },
    fleur: { id: "fleur", name: "Fleur Delacourt" },
    victoire: { id: "victoire", name: "Victoire Weasley"},
    dominique: { id: "dominique", name: "Dominique Weasley"},
    louis: { id: "louis", name: "Louis Weasley"},
    charlie: { id: "charlie", name: "Charlie Weasley" },
    percy: { 
        id: "percy", 
        name: "Percy Weasley",
        partners: ["audrey"],
        children: { audrey: ["molly2", "lucy"]}
    },
    audrey: { id: "audrey", name: "Audrey Weasley" },
    molly2: { id: "molly2", name: "Molly Weasley" },
    lucy: { id: "lucy", name: "Lucy Weasley" },
    fred: { id: "fred", name: "Fred Weasley" },
    george: { 
        id: "george", 
        name: "George Weasley",
        partners: ["angelina"],
        children: { angelina: ["fred2", "roxane"]}
    },
    angelina: { id: "angelina", name: "Angelina Weasley" },
    fred2: { id: "fred2", name: "Fred Weasley" },
    roxane: { id: "roxane", name: "Roxane Weasley" },
    ron: {
        id: "ron",
        name: "Ron Weasley",
        partners: ["hermione"],
        children: { hermione: ["rose", "hugo"]}
    },
    hermione: { id: "hermione", name: "Hermione Granger" },
    rose: { id: "rose", name: "Rose Weasley" },
    hugo: { id: "hugo", name: "Hugo Weasley" },
    ginny: {
        id: "ginny",
        name: "Ginny Weasley",
        partners: ["harry"],
        children: { harry: ["james", "albus", "lily"]}
    },
    harry: { id: "harry", name: "Harry Potter" },
    james: { id: "james", name: "James Potter" },
    albus: { id: "albus", name: "Albus Potter" },
    lily: { id: "lily", name: "Lily Potter" },
};

export default weasleyTree