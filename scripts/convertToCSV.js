const createCsvWriter = require('csv-writer').createObjectCsvWriter;

const removeNullRentNights = listings => {
    let newListings = [];

    listings.forEach(listing => {
        if(listing.rateSummary.rentNights !== null) {
            newListings.push(listing)
        }
    });

    return newListings
};

const formatListings = listings => {
    let csvDatas = [];

    listings.forEach(listing => {
        const csvData = {
            listingId: listing.listingId,
            headline: listing.propertyMetadata.headline,
            rateSummary: listing.rateSummary
        }

        csvDatas.push(csvData);
    });

    return csvDatas;
};

const getTodaysDate = () => {
    const datetime = new Date();
    let month = datetime.getMonth() + 1;

    if(month.toString().length === 1) {
        month = `0${month}`;
    } else {
        month = `${month}`;
    }

    const now = new Date(`${datetime.getFullYear()}-${month}-${datetime.getDate()}`);

    return now;
};

const getDayDifference = (now, date) => { 
    let x = Math.round(now.getTime() - date.getTime());
    x = x / (1000*60*60*24);
    return x;
};

const convertDataToCSVData = data => {
    let newData = [];
    let minDayDiff = 100000;

    let now = getTodaysDate();

    data.forEach(d => {
        const beginDate = d.rateSummary.beginDate;
        let dayDiff = getDayDifference(now, new Date(beginDate));

        minDayDiff = Math.min(minDayDiff, dayDiff);
        
        let obj = {
            listingId: d.listingId,
            headline: d.headline,
        }

        let newRentNights = [];

        d.rateSummary.rentNights.forEach(rentNight => {
            if(dayDiff !== 0) {
                dayDiff--;
            } else {
                newRentNights.push(rentNight);
            }
        });

        obj.rentNights = newRentNights;

        newData.push(obj);
    });

    let maxArraySize = 730 - minDayDiff;

    newData.forEach(d => {
        for(let i = d.rentNights.length; i < maxArraySize; i++) {
            d.rentNights.push(0);
        }
    });

    let csvData = [];
    
    newData.forEach(d => {
        let nowDate = getTodaysDate();
        let obj = {
            listingId: d.listingId,
            headline: d.headline,
        }
        
        d.rentNights.forEach(rentNight => {
            obj[nowDate] = rentNight;
            nowDate.setDate(nowDate.getDate() + 1);
        });

        csvData.push(obj);
    })

    return csvData;
};

const createCSVFile = async (csvData) => {
    let header = [
        {id: 'listingId', title: 'listingId'},
        {id: 'headline', title: 'headline'}
    ]

    let nowDate = getTodaysDate();

    for(let i = 0; i < 730; i++) {
        const obj = {
            id: `${nowDate}`, title: `${nowDate.getMonth() + 1}/${nowDate.getDate()}/${nowDate.getFullYear()}`
        };

        header.push(obj);

        nowDate.setDate(nowDate.getDate() + 1);
    }

    const csvWriter = createCsvWriter({
        path: './output.csv',
        header: header 
    });
    
    try {
        await csvWriter.writeRecords(csvData);
        console.log('...Done');
    } catch (err) {
        console.error(err.message);
    }
};

const convertToCSV = listings => {
    // Funtion to remove null Rent Nights
    const newListings = removeNullRentNights(listings);
    // Function to format Listings to desired data
    const data = formatListings(newListings);
    // Function to convert data into a format that can be piped into a csv file
    const csvData = convertDataToCSVData(data);
    // Pipe csvData to a csv file
    createCSVFile(csvData);   
};

module.exports = {
    convertToCSV
}
