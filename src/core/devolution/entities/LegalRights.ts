import { ValueObject } from '../../../shared/domain/value-objects'

interface LegalRightsProps {
    value: number
}

export class LegalRights extends ValueObject<LegalRightsProps> {

    public static create(legalrights: number): LegalRights {
        if (legalrights === undefined || legalrights === null || legalrights < 0 || legalrights > 1) {
            throw new Error('Legal rights must be comprised between 0 and 1')
        } else {
            return new LegalRights({ value: legalrights })
        }
    }

    get value(): number {
        return this.props.value;
    }
}