/**
 * @route POST https://www.vrbo.com/serp/g
 * @desc To fetch API response for resntal listings
 */

const {API_URL } = require('../constants');
const apiBody = require('../apiBody.json');
const axios = require('axios');

const headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36'
}

const vrboApiResponse = async ({pageSize, q}) => {
    const modApiBody = apiBody;
    modApiBody.variables.request.paging.pageSize = pageSize;
    modApiBody.variables.request.q = q;

    try {
        const { data } = await axios.post(API_URL, modApiBody, {headers});
        return data.data.results.listings;
    } catch (err) {
        console.error(err.message);
    }
}

module.exports = {
    vrboApiResponse
};
