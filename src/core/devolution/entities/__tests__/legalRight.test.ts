import { LegalRight } from '../LegalRight'

it('should construct', () => {
    expect(LegalRight.create(5, 3)).toStrictEqual(LegalRight.create(35, 21));
    expect(LegalRight.create(0, 1)).toStrictEqual(LegalRight.create(0, 100));
})

it('should throw on zero denominator', () => {
    expect(() => LegalRight.create(1, 0)).toThrow()
})

it('testPlus', () => {
    // (7 / 3) + (6 / 5) = (35 / 15) + (18 / 15) = 53 / 15
    let a = LegalRight.create(7, 3);
    let b = LegalRight.create(6, 5);

    expect(LegalRight.create(53, 15)).toStrictEqual(a.plus(b));
    expect(LegalRight.create(53, 15)).toStrictEqual(b.plus(a));
})

it('testMinus', () => {
    // (7 / 3) - (6 / 5) = (35 / 15) - (18 / 15) = 17 / 15
    let a = LegalRight.create(7, 3);
    let b = LegalRight.create(6, 5);

    expect(LegalRight.create(17, 15)).toStrictEqual(a.minus(b));
})

it('testMultiply', () => {
    let a = LegalRight.create(3, 7);
    let b = LegalRight.create(5, 3);

    expect(LegalRight.create(7, 5)).toStrictEqual(a.times(b));
})

it('testDivide', () => {
    // (2/9) / (6/4) = (2/9) * (2/3) = 4 / 27
    let a = LegalRight.create(2, 9);
    let b = LegalRight.create(6, 4);

    expect(LegalRight.create(27, 4)).toStrictEqual(a.dividedBy(b));
})

it('testToString', () => {
    expect("3/2").toStrictEqual(LegalRight.create(6, 4).toString());
    expect("3/2").toStrictEqual(LegalRight.create(3, 2).toString());
    expect("3/2").toStrictEqual(LegalRight.create(9, 6).toString());
    expect("15/11").toStrictEqual(LegalRight.create(15, 11).toString());
})

it('should get when value is 0', () => {
    expect(LegalRight.create(0, 1).isNotZero()).toBeFalsy()
})

it('should create fraction from percentage', () => {
    expect(LegalRight.percent("0%")).toStrictEqual(LegalRight.create(0, 1))
    expect(LegalRight.percent("25%")).toStrictEqual(LegalRight.create(1, 4))
    expect(LegalRight.percent("50%")).toStrictEqual(LegalRight.create(1, 2))
    expect(LegalRight.percent("75%")).toStrictEqual(LegalRight.create(3, 4))
    expect(LegalRight.percent("100%")).toStrictEqual(LegalRight.create(1, 1))
})