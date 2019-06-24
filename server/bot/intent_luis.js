//  Detects an intent using LUIS given a sentence. 
const axios = require('axios');
// comment out this line when deploying. Uncomment for local testing:
// var pvtkeys = require('../../pvt-keys/pvt-keys.js')

// NOTE FOR HEROKU/AZURE NEEDS TO BE SET AS ENV VARIABLE
// pvtkeys file is not uploaded to GIT. You need to create your own.

var luis_app_id = process.env.LUIS_APP_ID_DSIA_EN;
var luis_api_key = process.env.LUIS_API_KEY;


var luisRootURLDSIA = `https://westus.api.cognitive.microsoft.com/luis/v2.0/apps/${luis_app_id}?verbose=true&timezoneOffset=-360&subscription-key=${luis_api_key}&q=`;
//var luisRootURLDSIA = `https://westus.api.cognitive.microsoft.com/luis/v2.0/apps/eaebd6a2-40a4-4646-af70-392d12ef34ec?verbose=true&timezoneOffset=-360&subscription-key=c6b88cf03f064319956c7b0e8500061e&q=`;
var getIntentLUIS = (input) => {
    return new Promise((resolve, reject) => {
        var luisURL = luisRootURLDSIA + input;
        // console.log(`Calling LUIS`);
        // console.log(`LUISURL: ${luisURL}`);
        axios.get(luisURL).then((response) => {
            if (response.data.query === 'null') {
                throw new Error('No results returned.');
            } else {
                var luisResp = response.data;
                resolve({
                    topIntent: luisResp.topScoringIntent,
                    allIntents: luisResp.intents,
                    entities: luisResp.entities
                });
            }
        }).catch((e) => {
            if (e) {
                reject(`error: ${e}`);
            }
        });
    });
}

module.exports = {
    getIntentLUIS: getIntentLUIS
}