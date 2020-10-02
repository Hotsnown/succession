import { rules } from '../main'
import Engine, { formatValue } from 'publicodes'

it('Avec deux branches', () => {
    const engine = new Engine(rules)
    engine.setSituation({
        'époux existe': 'non',
        'ordre1 applicable': 'non',
        'ordre2 applicable': 'non',
        'ordre3 applicable': 'oui',
        'nombre de branche': '2',
        'nombre de membres du degré privilégié': '3'
    })
    expect(formatValue(engine.evaluate('droits de pierre'))).toStrictEqual(1/6)
})

it('Avec une branche', () => {
    const engine = new Engine(rules)
    engine.setSituation({
        'époux existe': 'non',
        'ordre1 applicable': 'non',
        'ordre2 applicable': 'non',
        'ordre3 applicable': 'oui',
        'nombre de branche': '1',
        'nombre de membres du degré privilégié': '3'
    })
    expect(formatValue(engine.evaluate('droits de pierre'))).toStrictEqual(1/3)
})