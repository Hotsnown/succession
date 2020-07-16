import { ValueObject } from '../../shared/domain/value-objects'

interface LegalRightProps {
    value: {
        numerator: number
        denominator: number
    }
}

/**
 * Instances represent LegalRights as mathematic fractions. All instances
 * are immutable.
 */
export class LegalRight extends ValueObject<LegalRightProps> {

    /**
     * Constructor that allows you to specify whether or not to reduce the LegalRight.
     * @param numerator the numerator for the LegalRight. Must be >= 0.
     * @param denominator the denominator for the LegalRight. Must be > 0.
     * @param reduce true to reduce the LegalRight, false to leave it as is.
     */
    public static create(numerator: number, denominator: number, reduce: boolean = true) {
        if (numerator < 0) {
            throw new Error("Invalid Argument : Numerator must be non-negative, was " + numerator);
        }

        if (denominator <= 0) {
            throw new Error("Invalid Argument : Denominator must be positive, was " + denominator);
        }

        if (reduce) {
            const gcd: number = greatestCommonDivisorOf(numerator, denominator);
            return new LegalRight({
                value : {
                    numerator: numerator / gcd, 
                    denominator: denominator / gcd
                }
            })
        } else {
            return new LegalRight({
                value: {
                    numerator: numerator,
                    denominator: denominator
                }
            })
        }
    }

    get numerator(): number {
        return this.props.value.numerator
    }
    get denominator(): number {
        return this.props.value.denominator
    }

    public toString(): string {
        return this.numerator.valueOf() + "/" + this.denominator.valueOf();
    }

    /**
     * Adds another LegalRight to this one. The resulting denominator will be the product of the two addends'
     * denominators.
     * @param addend the LegalRight to add to this one. May not be null.
     * @return a new LegalRight instance that contains the result of the addition. Will never return null.
     */
    public plus(addend: LegalRight): LegalRight {
        return LegalRight.create(
                (this.numerator * addend.denominator) + (addend.numerator * this.denominator),
                this.denominator * addend.denominator);
    }

    /**
     * Subtracts another LegalRight from this one. The resulting denominator will be the product of the denominators
     * of the minuend (this LegalRight) and subtrahend (parameter LegalRight).
     * @param subtrahend the LegalRight to subtract from this one. May not be null.
     * @return a new LegalRight instance that contains the result of the addition. Will never return null.
     */
    public minus(subtrahend: LegalRight): LegalRight {
        return LegalRight.create(
                (this.numerator * subtrahend.denominator) - (subtrahend.numerator * this.denominator),
                this.denominator * subtrahend.denominator);
    }

    /**
     * Multiplies this LegalRight by another LegalRight.
     * @param factor the LegalRight to multiply this one by. May not be null.
     * @return a new instance of a LegalRight containing the result of the multiplication. Will never return null.
     */
    public times(factor: LegalRight): LegalRight {
        return LegalRight.create(
                this.denominator * factor.denominator,
                this.numerator * factor.numerator);
    }

    /**
     * Divides this LegalRight by another LegalRight.
     * @param divisor the LegalRight to divide this one by. May not be null.
     * @return a new instance of a LegalRight containing the result of the division. Will never return null.
     */
    public dividedBy(divisor: LegalRight): LegalRight {
        const reciprocal = LegalRight.create(divisor.denominator, divisor.numerator);
        return this.times(reciprocal);
    }

    /**
     * Reduces this LegalRight to its simplest form by dividing the numerator and denominator by their greatest
     * common divisor.
     * @return a new instance of the LegalRight in reduced form. Will never return null.
     */
    public reduce(): LegalRight {
        const gcd = greatestCommonDivisorOf(this.numerator, this.denominator);
        return LegalRight.create(this.numerator / gcd, this.denominator / gcd);
    }

    public isNotZero(): boolean {
        return this.numerator !== 0
    }

    public valueOf(): number {
        return this.numerator / this.denominator
    }
}

function greatestCommonDivisorOf(firstNumber: number, secondNumber: number): number {
    if (secondNumber == 0) {
        return firstNumber;
    }
    return greatestCommonDivisorOf(secondNumber, firstNumber % secondNumber);
}