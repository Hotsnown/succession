import simpsonTree from './data'
import treeParser from '../tree-parser'


const data = {
    "root": "abe",
    "datalist": {
      "abe": {
        "id": "abe",
        "name": "Abraham J. (Grandpa) Simpson",
        "partners": [
          "unknown",
          "mona"
        ],
        "children": {
          "unknown": "[\"herb\"]",
          "mona": "[\"homer\"]"
        },
        "status": "valid"
      },
      "unknown": "{id: \"unknown\", name: \"???\", status: \"valid\"}",
      "mona": "{id: \"mona\", name: \"Mona Penelope Simpson (née Olse…}",
      "herb": "{id: \"herb\", name: \"Herbert (Herb) Powell\", status:…}",
      "homer": "{children: {…}, id: \"homer\", name: \"Homer Jay Simps…}",
      "marge": "{id: \"marge\", name: \"Marjorie (Marge) Simpson (née …}",
      "bart": {
        "id": "bart",
        "name": "Bartholomew (Bart) JoJo Simpson",
        "status": "valid"
      },
      "lisa": "{children: {…}, id: \"lisa\", name: \"Lisa Marie Simps…}",
      "maggie": "{id: \"maggie\", name: \"Margaret (Maggie) Eve Simpson…}",
      "millhouse": "{id: \"millhouse\", name: \"Millhouse Van Houten\", sta…}",
      "millhouse_jr": "{id: \"millhouse_jr\", name: \"Millhouse Van Houten Jr…}"
    },
    "onUpdateDeCujus": "ƒ handleUpdateDeCujus() {}"
  }
it('', () => {
    //@ts-ignore
    console.log(treeParser(data.datalist, 'abe'))
})
