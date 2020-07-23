/* prettier-ignore */
/*eslint-disable*/

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
 * TODO: construct legal right from percent string (ex: LegalRight.create('50%'))
 */
export class LegalRight extends ValueObject<LegalRightProps> {

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

    public static percent(percentString: string): LegalRight {
        const result = parseInt(percentString.trim().replace('%', ''))
        const gcd = greatestCommonDivisorOf(result, 100)
        return new LegalRight({
            value: {
                numerator: result / gcd,
                denominator: 100 / gcd
            }
        })
    }

    public static zeroRight(): LegalRight {
        return new LegalRight({
            value: {
                numerator: 0,
                denominator: 1
            }
        })
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

    public plus(addend: LegalRight): LegalRight {
        return LegalRight.create(
                (this.numerator * addend.denominator) + (addend.numerator * this.denominator),
                this.denominator * addend.denominator);
    }

    public minus(subtrahend: LegalRight): LegalRight {
        return LegalRight.create(
                (this.numerator * subtrahend.denominator) - (subtrahend.numerator * this.denominator),
                this.denominator * subtrahend.denominator);
    }

    public times(factor: LegalRight): LegalRight {
        return LegalRight.create(
                this.denominator * factor.denominator,
                this.numerator * factor.numerator);
    }

    public dividedBy(divisor: LegalRight): LegalRight {
        const reciprocal = LegalRight.create(divisor.denominator, divisor.numerator);
        return this.times(reciprocal);
    }

    /**
     * Reduces this LegalRight to its simplest form by dividing the numerator and denominator by their greatest
     * common divisor.
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