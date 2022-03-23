const { v4 } = require('uuid');
const aws = require('aws-sdk');
const twitterGateway = require('../gateways/twitterGateway/twitterGateway');

const dynamodb = new aws.DynamoDB.DocumentClient();

async function createPortfolio(name, description, birthdate, twitterUsername) {
    const id = v4();
    const newPortfolio = {
        id,
        name,
        description,
        birthdate,
        twitterUsername,
    };

    await dynamodb.put({
        TableName: 'PortfolioTable',
        Item: newPortfolio
    }).promise();
}

async function getPortfolios() {
    const result = await dynamodb.scan({
        TableName: 'PortfolioTable'
    }).promise();

    const portfolios = result.Items;

    portfolios.forEach(async (portfolio) => {
        const timeline = await twitterGateway.getTimeline(portfolio.twitterUsername, 5);
        portfolio.timeline = timeline || 'no se encontro timeline';
    });

    return portfolios;
}

module.exports = {
  createPortfolio,
  getPortfolios,
}
