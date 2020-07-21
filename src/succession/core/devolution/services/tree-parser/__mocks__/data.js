/*prettier-ignore */
/**eslint-disable */

//@ts-ignore
const simpsonsTree = [
  {
    "id": "unknown",
    "name": "???",
    "partners": [],
    "children": {},
    "status": 'valid'
  },
  {
    "id": "mona",
    "name": "Mona Penelope Simpson (née Olsen)",
    "partners": [],
    "children": {},
    "status": 'valid'
  },
  {
    "id": "herb",
    "name": "Herbert (Herb) Powell",
    "partners": [],
    "children": {},
    "status": 'valid'
  },
  {
    "id": "marge",
    "name": "Marjorie (Marge) Simpson (née Bouvier)",
    "partners": [],
    "children": {},
    "status": 'valid'
  },
  {
    "id": "bart",
    "name": "Bartholomew (Bart) JoJo Simpson",
    "partners": [],
    "children": {},
    "status": 'valid'
  },
  {
    "id": "millhouse",
    "name": "Millhouse Van Houten",
    "partners": [],
    "children": {},
    "status": 'valid'
  },
  {
    "id": "millhouse_jr",
    "name": "Millhouse Van Houten Jr.",
    "partners": [],
    "children": {},
    "status": 'valid'
  },
  {
    "id": "lisa",
    "name": "Lisa Marie Simpson",
    "partners": [
      {
        "id": "millhouse",
        "name": "Millhouse Van Houten",
        "partners": [],
        "children": {},
        "status": 'valid'
      },
    ],
    "children": {
      "millhouse": [
        {
          "id": "millhouse_jr",
          "name": "Millhouse Van Houten Jr.",
          "partners": [],
          "children": {},
          "status": 'valid'
        }
      ]
    },
    "status": 'valid'
  },
  {
    "id": "maggie",
    "name": "Margaret (Maggie) Eve Simpson",
    "partners": [],
    "children": {},
    "status": 'valid'
  },
  {
    "id": "homer",
    "name": "Homer Jay Simpson",
    "partners": [
      {
        "id": "marge",
        "name": "Marjorie (Marge) Simpson (née Bouvier)",
        "partners": [],
        "children": {},
        "status": 'valid'
      }
    ],
    "children": {
      "marge": [
        {
          "id": "bart",
          "name": "Bartholomew (Bart) JoJo Simpson",
          "partners": [],
          "children": {},
          "status": 'valid'
        },
        {
          "id": "lisa",
          "name": "Lisa Marie Simpson",
          "partners": [
            {
              "id": "millhouse",
              "name": "Millhouse Van Houten",
              "partners": [],
              "children": {},
              "status": 'valid'
            }
          ],
          "children": {
            "millhouse": [
              {
                "id": "millhouse_jr",
                "name": "Millhouse Van Houten Jr.",
                "partners": [],
                "children": {},
                "status": 'valid'
              }
            ]
          }
        },
        {
          "id": "maggie",
          "name": "Margaret (Maggie) Eve Simpson",
          "partners": [],
          "children": {},
          "status": 'valid'
        }
      ]
    },
    "status": 'valid'
  },
  {
    "id": "abe",
    "name": "Abraham J. (Grandpa) Simpson",
    "status": 'valid',
    "partners": [
      {
        "id": "unknown",
        "name": "???",
        "partners": [],
        "children": {},
        "status": 'valid'
      },
      {
        "id": "mona",
        "name": "Mona Penelope Simpson (née Olsen)",
        "partners": [],
        "children": {},
        "status": 'valid'
      }
    ],
    "children": {
      "unknown": [
        {
          "id": "herb",
          "name": "Herbert (Herb) Powell",
          "partners": [],
          "children": {},
          "status": 'valid'
        }
      ],
      "mona": [
        {
          "id": "homer",
          "name": "Homer Jay Simpson",
          "partners": [
            {
              "id": "marge",
              "name": "Marjorie (Marge) Simpson (née Bouvier)",
              "partners": [],
              "children": {},
              "status": 'valid'
            }
          ],
          "children": {
            "marge": [
              {
                "id": "bart",
                "name": "Bartholomew (Bart) JoJo Simpson",
                "partners": [],
                "children": {},
                "status": 'valid'
              },
              {
                "id": "lisa",
                "name": "Lisa Marie Simpson",
                "partners": [
                  {
                    "id": "millhouse",
                    "name": "Millhouse Van Houten",
                    "partners": [],
                    "children": {},
                    "status": 'valid'
                  }
                ],
                "children": {
                  "millhouse": [
                    {
                      "id": "millhouse_jr",
                      "name": "Millhouse Van Houten Jr.",
                      "partners": [],
                      "children": {},
                      "status": 'valid'
                    }
                  ]
                }
              },
              {
                "id": "maggie",
                "name": "Margaret (Maggie) Eve Simpson",
                "partners": [],
                "children": {},
                "status": 'valid'
              }
            ]
          }
        }
      ]
    }
  }
]

export default simpsonsTree