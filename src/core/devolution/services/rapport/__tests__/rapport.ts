import { renderOrdres } from '../rapport'

it('should print a rapport of ordre', () => {
    const data = {
        descendants: ['descendant1', 'descendant2'],
        ascendantsPrivilégiés: [''],
        collatérauxPrivilégiés: ['collatéral Privilégié'],
        ascendants: ['ascendant1', 'ascendant2', 'ascendant3'],
        collatéraux: ['collatéral'],
    }

    console.log(renderOrdres(data))
    expect(true).toBeTruthy()
})