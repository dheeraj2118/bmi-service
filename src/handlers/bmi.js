const middy = require('@middy/core');
const httpJsonBodyParser = require('@middy/http-json-body-parser');
const httpEventNormalizer = require('@middy/http-event-normalizer');
const httpErrorHandler = require('@middy/http-error-handler');

const { calculateBMI, getBMICategroy, getRiskCategory } = require('../libs/bmi-library');

const getBMIParams = async(event) => {
    const { height, weight, userId } = event.body;
    const bmiValue = calculateBMI(weight, height);
    const bmiCategory = getBMICategroy(bmiValue);
    const riskCategory = getRiskCategory(bmiCategory);
    const timeStamp = new Date().toISOString();

    return {
        statusCode: 200,
        body: JSON.stringify({
            height,
            weight,
            bmiCategory,
            riskCategory,
            timeStamp
        }),
    };

};

module.exports.handler = middy(getBMIParams)
    .use([
        httpJsonBodyParser(),
        httpEventNormalizer(),
        httpErrorHandler()
    ])