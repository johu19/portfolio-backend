const { BAD_REQUEST, OK } = require('http-status-codes');
const portfolioService = require('../services/portfolioService');

const createPortfolio = async (event) => {
    const params = JSON.parse(event.body);
    const { portfolioName, description, birthdate, twitterUsername } = params;
    
    if (!portfolioName || !description || !birthdate || !twitterUsername) {
        return {
            statusCode: BAD_REQUEST,
            body: 'One or more fields are missing.'
        };
    }

    await portfolioService.createPortfolio(portfolioName, description, birthdate, twitterUsername);

    return {
        status: OK,
        body: 'Portfolio created successfully.'
    };
};

const getPortfolios = async () => {
    const portfolios = await portfolioService.getPortfolios();

    return {
        status: OK,
        body: { portfolios },
    };
}

const getPortfolio = async (event) => {
    const { id } = event.pathParameters;
    try {
        const portfolio = await portfolioService.getPortfolio(id);
        return {
            status: OK,
            body: portfolio,
        };
    } catch (error) {
        return {
            status: BAD_REQUEST,
            body: JSON.stringify(error),
        };
    }
}

const updatePortfolio = async (event) => {
    const { id } = event.pathParameters;
    const params = JSON.parse(event.body);
    const { portfolioName, description, birthdate, twitterUsername } = params;
    try {
        await portfolioService.updatePortfolio(id, portfolioName, description, birthdate, twitterUsername);
        return {
            status: OK,
            body: 'Porfolio updated successfully.'
        };   
    } catch (error) {
        return {
            status: BAD_REQUEST,
            body: JSON.stringify(error)
        };
    }
}

module.exports = {
  createPortfolio,
  getPortfolios,
  getPortfolio,
  updatePortfolio,
}
