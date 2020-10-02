import { rules } from '../rules'
import Engine, { formatValue } from 'publicodes'
import { setSituation } from '../facts'

it('Sans représentation', () => {
    const engine = new Engine(rules)
    engine.setSituation({
        'estRepresentant': 'non',
        'nombreDeMembresDuDegrePrivilegie': '2',
        'ordre1Applicable': 'oui',
        'epouxExiste': 'non',
        'estEpoux': 'non',
        'descendantExiste': 'non'
    })

    expect(formatValue(engine.evaluate('droitsDePierre'), { language: 'en' })).toEqual(1/2)
})

it('Avec représentation', () => {
    const engine = new Engine(rules)
    engine.setSituation({
        'estRepresentant': 'oui',
        "nombreDeMembresDeLordreFictif": '5',
        'ordre1Applicable': 'oui',
        'epouxExiste': 'non',
        'estEpoux': 'non',
        'descendantExiste': 'non'
    })

    expect(formatValue(engine.evaluate('droitsDePierre'), { language: 'en' })).toEqual(1/5)
})