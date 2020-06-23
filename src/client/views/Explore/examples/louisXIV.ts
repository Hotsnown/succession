import { FamilyExample } from "./interface";

const source = "https://2.bp.blogspot.com/-SC40puN2t4w/Uhu9IZ4IHdI/AAAAAAAABjA/CwovRpC7LFM/s1600/Louis%20xiv.jpg"

const louisXIVTree: FamilyExample = {
    louisXIV: {
        id: "louisXIV",
        name: "Louis XIV",
        partners: ["marieTherese"],
        children: { marieTherese: ["louisLeGrandDauphin"]}
    },
    marieTherese: { id: "marieTherese", name: "Marie Thérèse"},
    louisLeGrandDauphin: { 
        id: "louisLeGrandDauphin",
        name: "Louis, Le Grand Dauphin",
        partners: ["marieAnneVictoire"],
        children: { marieAnneVictoire: ["louisDeFrance", "phillipeDeFrance", "charlesDeFrance"]}
    },
    marieAnneVictoire: { id: "marieAnneVictoire", name: "Marie Anne Victoire"},
    louisDeFrance : {
        id: "louisDeFrance",
        name: "Louis De France",
        partners: ["marieAdelaideOfSavoy"],
        children: { marieAdelaideOfSavoy: ["louisDeFrance1", "louisXV"]}
    },
    marieAdelaideOfSavoy: { id: "marieAdelaideOfSavoy", name: "Marie Adélaïde Of Savoy"},
    louisDeFrance1: { id: "louisDeFrance1", name: "Louis De France, Duc de Bretagne"},
    louisXV: { id: "louisXV", name: "Louis XV"},
    phillipeDeFrance: {
        id: "phillipeDeFrance",
        name: "Philippe De France",
        partners: ["marieLouise", "elisabeth"],
        children: {
            marieLouise: ["louis1", "philip", "philip1", "ferdinand"],
            elisabeth: ["charlesIII", "francis", "marianna", "philip2", "mariaTheresa", "louis2", "mariaAntoinetta"]
        }
    },
    charlesDeFrance: { id: "charlesDeFrance", name: "Charles de France, Duc de Berry, d'Alençon & d'Angoulême"}
}

export default louisXIVTree