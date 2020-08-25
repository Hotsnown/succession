import { engine } from '../main'
import { formatValue } from 'publicodes'

it('', () => {
    engine.setSituation({'est époux': 'oui'})
    expect(formatValue(engine.evaluate('est époux'))).toStrictEqual('Oui')
})

it('', () => {
    engine.setSituation({'est époux': 'non'})
    expect(formatValue(engine.evaluate('est époux'))).toStrictEqual('Non')
})