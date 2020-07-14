import { getSolution } from '../getSolution'

const data = {
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
  }

it('', () => {

    const deCujus = 'bart'
    const root = 'abe'

    //@ts-ignore
    const solution = getSolution(data, deCujus, root)

    const bart = solution.findMember('bart')
    const homer = solution.findMember('homer')
    const lisa = solution.findMember('lisa')
    const maggie = solution.findMember('maggie')
    const mona = solution.findMember('mona')

    expect(bart?.legalRights).toStrictEqual(0)
    expect(homer?.legalRights).toStrictEqual(0.5)
    expect(lisa?.legalRights).toStrictEqual(0)
    expect(maggie?.legalRights).toStrictEqual(0)
    expect(mona?.legalRights).toStrictEqual(0.5)
})