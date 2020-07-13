export const sum = (a: number, b: number) => a + b

/*export class TreeNode {
  val: number
  left: TreeNode | null
  right: TreeNode | null
  constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
    this.val = (val === undefined ? 0 : val)
    this.left = (left === undefined ? null : left)
    this.right = (right === undefined ? null : right)
  }
}
/* 
export function isCousins(root: TreeNode | null, x: number, y: number): boolean {
    const [dx, px, dy, py] = dfs(root, null, 0, x).concat(dfs(root, null, 0, y))
    return dx === dy && px === py

    function dfs(
      node: TreeNode, 
      parent: TreeNode, 
      depth: number, 
      mod: number
      ): any {
      if (node) {
        if (node.val === mod) {
          return [depth, parent]
        }
        return dfs(node.left, node, depth + 1, mod) || 
               dfs(node.right, node, depth + 1, mod)
      }
  }
} */
/*

interface Member {
  id: string;
  name: string;
  status: Status
}

type Status = 'valid' | 'invalid'

const input = [
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

class Graph {

  noOfVertices: number
  AdjList: Map<Member, Member[]>

  constructor(noOfVertices: number) {
    this.noOfVertices = noOfVertices;
    this.AdjList = new Map();
  }

  addVertex(vertex: Member) {
    this.AdjList.set(vertex, new Array<Member>());
  }

  addEdge(src: Member, dest: Member) {
    this.AdjList.get(src)!.push(dest);
  }

  printGraph() {
    var get_keys = this.AdjList.keys();

    for (var i of get_keys) {
      var get_values = this.AdjList.get(i)!;
      var conc = "";

      for (var j of get_values)
        conc += j.id + " ";

      console.log(i.id + " -> " + conc);
    }
  }

  dfs(startingNode: Member) {
    var visited = [];
    
    for (var i = 0; i < this.noOfVertices; i++) {
      visited[i] = false;
    }

    this.DFSUtil(startingNode, visited);
  }

  DFSUtil(vert: Member, visited: any) {

    visited[vert.id] = true;
    console.log(vert);

    var get_neighbours = this.AdjList.get(vert);
    console.log(get_neighbours)
    for (let i in get_neighbours) {
      var get_elem = get_neighbours[i];
      if (!visited[get_elem.id])
        this.DFSUtil(get_elem, visited);
    }
  }
}

const g = new Graph(input.length);
const vertices = input.map((_, i: number) => ({
  id: input[i].id,
  name: input[i].name,
  status: input[i].status as Status,
}))

for (var i = 0; i < input.length; i++) {
  g.addVertex(vertices[i]);
}

for (let i in input) {
  if (input[i].children !== undefined) {
    for (let children of Object.values(input[i].children)) {
      g.addEdge(vertices[i], vertices.find(vertex => vertex.id === children[0].id)!)
    }
  }
}

g.dfs({
  "id": "abe",
  "name": "Abraham J. (Grandpa) Simpson",
  "status": 'valid',
});
*/