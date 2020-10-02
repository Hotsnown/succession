import { rules } from '../main'
import Engine, { formatValue } from 'publicodes'

it('Avec concours des père et mère', () => {
    const engine = new Engine(rules)
    engine.setSituation({
        'époux existe': 'non',
        'ordre1 applicable': 'non',
        'ordre2 applicable': 'oui',
        'est parent': 'non',
        'est représentant': 'non',
        "nombre de membres du degré privilégié": '1'
    })
    expect(formatValue(engine.evaluate('droits de pierre'))).toStrictEqual(1/2)
})

it('Sans concours des père ou mère et avec représentation', () => {
    const engine = new Engine(rules)
    engine.setSituation({
        'époux existe': 'non',
        'ordre1 applicable': 'non',
        'ordre2 applicable': 'oui',
        'est parent': 'non',
        'est représentant': 'oui',
        "nombre de membres de l'ordre fictif": '3'
    })
    expect(formatValue(engine.evaluate('droits de pierre'))).toStrictEqual(1/3)
})