const { BAD_REQUEST, OK } = require('http-status-codes');
const portfolioService = require('../services/portfolioService');

const createPortfolio = async (event) => {
    const params = JSON.parse(event.body);
    const { name, description, birthdate, twitterUsername } = params;
    
    if (!name || !description || !birthdate || !twitterUsername) {
        return {
            statusCode: BAD_REQUEST,
            body: 'One or more fields are missing.'
        };
    }

    await portfolioService.createPortfolio(name, description, birthdate, twitterUsername);

    return {
        status: OK,
        body: 'Portfolio created successfully'
    };
};

const getPortfolios = async () => {
    const portfolios = await portfolioService.getPortfolios();

    return {
        status: OK,
        body: { portfolios }
    };
}

module.exports = {
  createPortfolio,
  getPortfolios, 
}
