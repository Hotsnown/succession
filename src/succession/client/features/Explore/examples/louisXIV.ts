/* prettier-ignore */
/*eslint-disable*/

import { FamilyExample } from "./interface";

const source = "https://2.bp.blogspot.com/-SC40puN2t4w/Uhu9IZ4IHdI/AAAAAAAABjA/CwovRpC7LFM/s1600/Louis%20xiv.jpg"

const louisXIVTree: FamilyExample = {
    louisXIV: {
        id: "louisXIV",
        name: "Louis XIV",
        partners: ["marieTherese"],
        children: { marieTherese: ["louisLeGrandDauphin"]},
        status: 'valid'
    },
    marieTherese: { 
        id: "marieTherese", 
        name: "Marie Thérèse",
        status: 'valid'
    },
    louisLeGrandDauphin: { 
        id: "louisLeGrandDauphin",
        name: "Louis, Le Grand Dauphin",
        partners: ["marieAnneVictoire"],
        children: { marieAnneVictoire: ["louisDeFrance", "phillipeDeFrance", "charlesDeFrance"]},
        status: 'valid'
    },
    marieAnneVictoire: { 
        id: "marieAnneVictoire", 
        name: "Marie Anne Victoire",
        status: 'valid'
    },
    louisDeFrance : {
        id: "louisDeFrance",
        name: "Louis De France",
        partners: ["marieAdelaideOfSavoy"],
        children: { marieAdelaideOfSavoy: ["louisDeFrance1", "louisXV"]},
        status: 'valid'
    },
    marieAdelaideOfSavoy: { 
        id: "marieAdelaideOfSavoy", 
        name: "Marie Adélaïde Of Savoy",
        status: 'valid'
    },
    louisDeFrance1: { 
        id: "louisDeFrance1", 
        name: "Louis De France, Duc de Bretagne",
        status: 'valid'
    },
    louisXV: { 
        id: "louisXV", 
        name: "Louis XV",
        status: 'valid'
    },
    phillipeDeFrance: {
        id: "phillipeDeFrance",
        name: "Philippe De France",
        partners: ["marieLouise", "elisabeth"],
        children: {
            marieLouise: ["louis1", "philip", "philip1", "ferdinand"],
            elisabeth: ["charlesIII", "francis", "marianna", "philip2", "mariaTheresa", "louis2", "mariaAntoinetta"]
        },
        status: 'valid'
    },
    charlesDeFrance: { 
        id: "charlesDeFrance", 
        name: "Charles de France, Duc de Berry, d'Alençon & d'Angoulême",
        status: 'valid'
    }
}

export default louisXIVTree