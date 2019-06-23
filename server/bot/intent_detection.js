//  Detects an intent given a sentence. 
const intentLuis = require('./intent_luis.js');

// this could be modified to use other services for intent detection beyond LUIS
// this lite example defaults to LUIS
var getIntent = (input) => {
    return new Promise(async (resolve, reject) => {
        try {
            var luisResponse = await intentLuis.getIntentLUIS(input);
            console.log(luisResponse);
            resolve(luisResponse);
        }
        catch (e) {
            reject('Error in LUIS Service');
        }
    });
}

module.exports = {
    getIntent
};