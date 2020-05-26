const simpsonsTree = [
  {
    "id": "unknown",
    "name": "???",
    "partners": [],
    "children": {}
  },
  {
    "id": "mona",
    "name": "Mona Penelope Simpson (née Olsen)",
    "partners": [],
    "children": {}
  },
  {
    "id": "herb",
    "name": "Herbert (Herb) Powell",
    "partners": [],
    "children": {}
  },
  {
    "id": "marge",
    "name": "Marjorie (Marge) Simpson (née Bouvier)",
    "partners": [],
    "children": {}
  },
  {
    "id": "bart",
    "name": "Bartholomew (Bart) JoJo Simpson",
    "partners": [],
    "children": {}
  },
  {
    "id": "millhouse",
    "name": "Millhouse Van Houten",
    "partners": [],
    "children": {}
  },
  {
    "id": "millhouse_jr",
    "name": "Millhouse Van Houten Jr.",
    "partners": [],
    "children": {}
  },
  {
    "id": "lisa",
    "name": "Lisa Marie Simpson",
    "partners": [
      {
        "id": "millhouse",
        "name": "Millhouse Van Houten",
        "partners": [],
        "children": {}
      }
    ],
    "children": {
      "millhouse": [
        {
          "id": "millhouse_jr",
          "name": "Millhouse Van Houten Jr.",
          "partners": [],
          "children": {}
        }
      ]
    }
  },
  {
    "id": "maggie",
    "name": "Margaret (Maggie) Eve Simpson",
    "partners": [],
    "children": {}
  },
  {
    "id": "homer",
    "name": "Homer Jay Simpson",
    "partners": [
      {
        "id": "marge",
        "name": "Marjorie (Marge) Simpson (née Bouvier)",
        "partners": [],
        "children": {}
      }
    ],
    "children": {
      "marge": [
        {
          "id": "bart",
          "name": "Bartholomew (Bart) JoJo Simpson",
          "partners": [],
          "children": {}
        },
        {
          "id": "lisa",
          "name": "Lisa Marie Simpson",
          "partners": [
            {
              "id": "millhouse",
              "name": "Millhouse Van Houten",
              "partners": [],
              "children": {}
            }
          ],
          "children": {
            "millhouse": [
              {
                "id": "millhouse_jr",
                "name": "Millhouse Van Houten Jr.",
                "partners": [],
                "children": {}
              }
            ]
          }
        },
        {
          "id": "maggie",
          "name": "Margaret (Maggie) Eve Simpson",
          "partners": [],
          "children": {}
        }
      ]
    }
  },
  {
    "id": "abe",
    "name": "Abraham J. (Grandpa) Simpson",
    "partners": [
      {
        "id": "unknown",
        "name": "???",
        "partners": [],
        "children": {}
      },
      {
        "id": "mona",
        "name": "Mona Penelope Simpson (née Olsen)",
        "partners": [],
        "children": {}
      }
    ],
    "children": {
      "unknown": [
        {
          "id": "herb",
          "name": "Herbert (Herb) Powell",
          "partners": [],
          "children": {}
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
              "children": {}
            }
          ],
          "children": {
            "marge": [
              {
                "id": "bart",
                "name": "Bartholomew (Bart) JoJo Simpson",
                "partners": [],
                "children": {}
              },
              {
                "id": "lisa",
                "name": "Lisa Marie Simpson",
                "partners": [
                  {
                    "id": "millhouse",
                    "name": "Millhouse Van Houten",
                    "partners": [],
                    "children": {}
                  }
                ],
                "children": {
                  "millhouse": [
                    {
                      "id": "millhouse_jr",
                      "name": "Millhouse Van Houten Jr.",
                      "partners": [],
                      "children": {}
                    }
                  ]
                }
              },
              {
                "id": "maggie",
                "name": "Margaret (Maggie) Eve Simpson",
                "partners": [],
                "children": {}
              }
            ]
          }
        }
      ]
    }
  }
]

export default simpsonsTree