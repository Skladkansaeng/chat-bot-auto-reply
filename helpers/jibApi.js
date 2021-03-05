let querystring = require('querystring');
let request = require('request');

const jibCaller = (tel, callback) => {

    let form = {
        tel
    };

    let formData = querystring.stringify(form);
    let contentLength = formData.length;

    request({
        headers: {
            'Content-Length': contentLength,
            'Content-Type': 'application/x-www-form-urlencoded',
            'User-Agent': 'PostmanRuntime/7.26.10',
        },
        uri: 'https://www.jib.co.th/web/claim/claim_load',
        body: formData,
        method: 'POST'
    }, callback);
}

module.exports = { jibCaller }