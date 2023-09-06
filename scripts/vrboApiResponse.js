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

const getDistance = (originLat, originLong, destLat, destLong) => {
    return Math.floor(Math.random() * 500);
};

const filterArray = (originLat, originLong, data) => {
    let resDistData = [];

    resData.forEach(d => {
        let dist = getDistance(originLat, originLong, d.geoCode.latitude, d.geoCode.longitude);
        d.distanceFromOrigin = dist;
        resDistData.push(d);
    });

    resDistData.sort(function compareFunction(a, b) { 
        if(a.distanceFromOrigin > b.distanceFromOrigin) return 1;
        if(a.distanceFromOrigin < b.distanceFromOrigin) return -1;
        return 0;
    })

    let closestFifty = [];

    for (let i = 0; i < 50; i++) {
        closestFifty.push(resDistData[i]);
    }

    return closestFifty;
};

const vrboApiResponse = async (input) => {
    const modApiBody = apiBody;
    modApiBody.variables.request.paging.pageSize = input.pageSize;
    modApiBody.variables.request.q = input.q;
    // if(input.page !== undefined) {
    //     modApiBody.variables.request.paging.page = input.page;
    // }

    try {
        let resData = [];
        const { data } = await axios.post(API_URL, modApiBody, {headers});
        let resultCount = data.data.results.resultCount;
        let pages = Math.floor(resultCount / 50);

        let remainingData = resultCount % 50;

        const originLat = data.data.results.geography.location.latitude;
        const originLong = data.data.results.geography.location.longitude;

        data.data.results.listings.forEach(listing => {
            resData.push(listing);
        });

        if(remainingData == 0) {
            pages = pages - 1;
        }

        for(let i = 1; i <= pages; i++) {
            modApiBody.variables.request.paging.page = i + 1;
            const { data } = await axios.post(API_URL, modApiBody, {headers});
            data.data.results.listings.forEach(listing => {
                resData.push(listing);
            });
        }

        console.log(resData.length);

        const closestFifty = filterArray(originLat, originLong, resData);
        
        return closestFifty;
    } catch (err) {
        console.error(err.message);
    }
}

module.exports = {
    vrboApiResponse
};
