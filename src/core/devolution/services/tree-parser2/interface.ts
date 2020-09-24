export interface GEDCOM {
    indis: Indi[]
    fams: Fam[]
}

interface Indi {
    id: string
    firstName: string
    fams?: string[]
    famc?: string
}

interface Fam {
    id: string
    children: string[]
    husb: string
    wife: string
}

const example: GEDCOM = {
    "indis": [
      {
        "id": "deCujus",
        "firstName": "deCujus",
        "fams": [
          "F1"
        ]
      },
      {
        "id": "deadSpouse",
        "firstName": "deadSpouse",
        "fams": [
          "F1"
        ]
      },
      {
        "id": "son",
        "firstName": "son",
        "famc": "F1"
      },
      {
        "id": "deadSon",
        "firstName": "deadSon",
        "famc": "F1",
        "fams": [
          "F2"
        ]
      },
      {
        "id": "deadSonSpouse",
        "firstName": "deadSonSpouse",
        "fams": [
          "F2"
        ]
      },
      {
        "id": "grandchildren1",
        "firstName": "grandchildren1",
        "famc": "F2"
      },
      {
        "id": "grandchildren2",
        "firstName": "grandchildren2",
        "famc": "F2",
        "fams": [
          "F3"
        ]
      },
      {
        "id": "grandchildren3",
        "firstName": "grandchildren3",
        "famc": "F2"
      },
      {
        "id": "grandchildren2Spouse",
        "firstName": "grandchildren2Spouse",
        "fams": [
          "F3"
        ]
      },
      {
        "id": "grandgrandchildren",
        "firstName": "grandgrandchildren",
        "famc": "F3"
      }
    ],
    "fams": [
      {
        "id": "F1",
        "children": [
          "son",
          "deadSon"
        ],
        "husb": "deCujus",
        "wife": "deadSpouse"
      },
      {
        "id": "F2",
        "children": [
          "grandchildren1",
          "grandchildren2",
          "grandchildren3"
        ],
        "husb": "deadSon",
        "wife": "deadSonSpouse"
      },
      {
        "id": "F3",
        "children": [
          "grandgrandchildren"
        ],
        "husb": "grandchildren2",
        "wife": "grandchildren2Spouse"
      }
    ]
  }