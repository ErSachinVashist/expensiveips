import fs from 'fs';
import logics from './logic';
//Reading the input file synchronously.
let data=fs.readFileSync('clicks.json',"utf8");
let finalHashArr=logics(data,function (finalHashArr) {
    console.log("Output",finalHashArr);
})


