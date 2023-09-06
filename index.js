const input = require('./input.json');
const { vrboApiResponse } = require('./scripts/vrboApiResponse')
const { convertToCSV } = require('./scripts/convertToCSV')

const main = async () => {
    console.time('VRBO API Call');
    try {
        // Call the VRBO API
        const res = await vrboApiResponse(input);
        if(res === undefined) {
            throw new Error('Api Response failed');
        }

        // Pipe response to CSV file
        // convertToCSV(res);
    } catch (err) {
        console.error(err.message);
    }
    console.timeEnd('VRBO API Call');
};

main();
