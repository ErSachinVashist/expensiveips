'use strict';

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//Reading the input file synchronously.
var data = _fs2.default.readFileSync('clicks.json', "utf8");
try {
    var ips = JSON.parse(data),
        ipHash = { ipCounter: {} },
        finalHashArr = [],
        outputFile = "resultset.json";

    ips.forEach(function (ip) {
        var ipHour = new Date(ip.timestamp).getHours();
        //Catching error if invalid data occures.
        if (isNaN(ipHour)) throw new Error("Invalid Data : " + ip.timestamp);

        //Keeping a counter for ip occurrences.
        ipHash.ipCounter[ip.ip] = ipHash.ipCounter[ip.ip] ? ipHash.ipCounter[ip.ip] + 1 : 1;

        //Making or updating hash for each ips that occues in a hourly time range.
        if (!ipHash[ipHour]) {
            ipHash[ipHour] = { ips: [], mostExp: ip };
        }
        ipHash[ipHour].ips.push(ip);

        //Checking expensive click for duplicate ips.
        if (ip.amount > ipHash[ipHour].mostExp.amount) {
            ipHash[ipHour].mostExp = ip;
        }
    });

    //Making final array of hashes.
    Object.values(ipHash).forEach(function (value) {
        if (value.mostExp && ipHash.ipCounter[value.mostExp.ip] <= 10) {
            finalHashArr.push(value.mostExp);
        }
    });
    console.log("Output", finalHashArr);

    //Writing result set to file.
    var saved = _fs2.default.writeFileSync(outputFile, JSON.stringify(finalHashArr), 'utf8');
    console.log("Saved to", outputFile);
} catch (e) {
    console.log("ERROR while reading file : ", e.message);
}