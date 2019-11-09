import fs from 'fs';
import logic from './logic.js'
import {expect} from 'chai'
describe('Testing', function() {
    let content = [
        {"ip": "22.22.22.22", "timestamp": "3/11/2016 02:02:58", "amount": 7.00},
        {"ip": "11.11.11.11", "timestamp": "3/11/2016 02:12:32", "amount": 6.50},
        {"ip": "11.11.11.11", "timestamp": "3/11/2016 02:13:11", "amount": 7.25},
        {"ip": "44.44.44.44", "timestamp": "3/11/2016 02:13:54", "amount": 8.75},
        {"ip": "22.22.22.22", "timestamp": "3/11/2016 05:02:45", "amount": 11.00},
        {"ip": "44.44.44.44", "timestamp": "3/11/2016 06:32:42", "amount": 5.00},
        {"ip": "22.22.22.22", "timestamp": "3/11/2016 06:35:12", "amount": 2.00},
        {"ip": "11.11.11.11", "timestamp": "3/11/2016 06:45:01", "amount": 12.00},
        {"ip": "11.11.11.11", "timestamp": "3/11/2016 06:59:59", "amount": 12.00},
    ],
        testFileName="test.json",
        ipInput=[]

    it('Can create a file', function (done) {
        fs.writeFile(testFileName, JSON.stringify(content), function (err) {
            if (err) {
                return done(err);
            }
            done();
        });
    });

    it('Can read from a file', function(done) {
        fs.readFile(testFileName, function(err, data) {
            if (err) {
                return done(err);
            }
            ipInput=data
            done();
        });
    });

    it('Return array as output', function(done) {

        let output=logic(ipInput,function (output) {
            if(Array.isArray(output)){
                done()
            }
            else{
                console.log('here')
                done("Expecting array but received "+typeof(output))
            }
        })
    });

    after(function () {
        fs.unlinkSync(testFileName);
    });
})
