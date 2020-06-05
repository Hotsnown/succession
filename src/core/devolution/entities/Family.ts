import { ValueObject } from '../../../shared/domain/value-objects'
import { Heir } from '.'

interface FamilyProps {
    value: Heir[]
}

export class Family extends ValueObject<FamilyProps> {

    public static create(heirs: FamilyProps): Family {
        if (heirs === undefined || heirs === null) {
            throw new Error()
        } else {
            return new Family(heirs)
        }
    }

    get value(): Heir[] {
        return this.props.value;
    }
}