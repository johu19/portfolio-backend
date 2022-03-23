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
    const portfoliosWithTwitterInfo = [];

    for (let i = 0; i < portfolios.length; i += 1) {
        const portfolio = { ...portfolios[i] };
        const timeline = await twitterGateway.getTimeline(portfolio.twitterUsername, 5);
        portfolio.timeline = timeline || 'no se encontro timeline';
        portfoliosWithTwitterInfo.push(portfolio);
    }

    return portfoliosWithTwitterInfo;
}

async function getPortfolio(id) {
    const result = await dynamodb.get({
        TableName: 'PortfolioTable',
        Key: { id }
    }).promise();

    const portfolio = result.Item;
    return portfolio;
}

async function updatePortfolio(id, name, description, birthdate, twitterUsername) {
    await dynamodb.update({
        TableName: 'PortfolioTable',
        Key: { id },
        UpdateExpression: 'set name = :name, description = :description, birthdate = :birthdate, twitterUsername = :twitterUsername',
        ExpressionAttributeValues: {
            ':name': name,
            ':description': description,
            ':birthdate': birthdate,
            ':twitterUsername': twitterUsername,
        },
        ReturnValues: 'ALL_NEW',
    }).promise();
}

module.exports = {
  createPortfolio,
  getPortfolios,
  getPortfolio,
  updatePortfolio,
}
