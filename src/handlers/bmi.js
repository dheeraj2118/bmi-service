const AWS = require('aws-sdk');
const middy = require('@middy/core');
const createError = require('http-errors');
const httpJsonBodyParser = require('@middy/http-json-body-parser');
const { default: bmiRequestSchema } = require('./../libs/bmi-request-schema');
const httpErrorHandler = require('@middy/http-error-handler');
const validator = require('@middy/validator');
const { v4: uuid } = require('uuid');

const { calculateBMI, getBMICategroy, getRiskCategory } = require('../libs/bmi-library');

const dynamoDB = new AWS.DynamoDB.DocumentClient();
const getBMIParams = async(event) => {
    console.log(bmiRequestSchema);
    const { height, weight, userId } = event.body;
    const bmiValue = calculateBMI(weight, height);
    const bmiCategory = getBMICategroy(bmiValue);
    const riskCategory = getRiskCategory(bmiCategory);
    const timeStamp = new Date().toISOString();
    const id = uuid();
    const bmiRecord = {
        id,
        userId,
        height,
        weight,
        bmiValue,
        bmiCategory,
        riskCategory,
        timeStamp
    };
    try {
        await dynamoDB.put({
            'TableName': process.env.BMI_TABLE,
            'Item': bmiRecord
        }).promise();
        return {
            statusCode: 200,
            body: JSON.stringify({
                id,
                height,
                weight,
                bmiCategory,
                riskCategory,
                timeStamp
            }),
        };
    } catch (err) {
        throw new createError.InternalServerError(err);
    }

};

export const handler = middy(getBMIParams)
    .use([
        httpJsonBodyParser(),
        httpErrorHandler(),
    ]).use(validator({ inputSchema: bmiRequestSchema }));