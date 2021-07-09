const { InvalidArgumentException } = require('./exception-lib');
const CATEGORY_RISK_MAPPING = {
    UnderWeight: 'MalnutritionRisk',
    NormalWeight: 'LowRisk',
    OverWeight: 'EnhancedRisk',
    ModeratelyObese: 'MediumRisk',
    SeverelyObese: 'HighRisk',
    VerySeverelyObese: 'VeryHighRisk'
};
// let unCached = 0;
const bmiCache = {};
/**
 * @param {integer} weightInKg
 * @param {integer} heightInCm
 * @returns  Decimal number indicating BMI value for given weight and height
 * @throws IllegalArgument exception when either weight, or height are given values <= 0
 */

export const calculateBMI = (weightInKg, heightInCm) => {
    try {
        if (heightInCm <= 0 || weightInKg <= 0) {
            throw new InvalidArgumentException(`Invalid values provided for height/weight expected numbers > 0, given values ${heightInCm}, ${weightInKg}`);
        }
        const heightInM = heightInCm / 100;
        return Number((weightInKg / (heightInM * heightInM)).toFixed(2));
    } catch (err) {
        if (err instanceof InvalidArgumentException) {
            throw new InvalidArgumentException(err);
        }
        throw new Error(err);
    }
};

export const getBMICategroy = (bmiValue) => {
    let category;
    if (bmiCache[bmiValue]) {
        return bmiCache[bmiValue];
    }
    if (bmiValue <= 18.4) {
        category = 'UnderWeight';
    } else if (bmiValue >= 18.5 && bmiValue <= 24.9) {
        category = 'NormalWeight';
    } else if (bmiValue >= 25 && bmiValue <= 29.9) {
        category = 'OverWeight';
    } else if (bmiValue >= 30 && bmiValue <= 34.9) {
        category = 'ModeratelyObese';
    } else if (bmiValue >= 35 && bmiValue <= 39.9) {
        category = 'SeverelyObese';
    } else {
        category = 'VerySeverelyObese';
    }
    bmiCache[bmiValue] = category;
    return category;
};

export const getRiskCategory = (bmiCategory) => {
    return CATEGORY_RISK_MAPPING[bmiCategory];
};