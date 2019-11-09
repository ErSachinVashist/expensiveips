import fs from "fs";

module.exports=function (data,next) {
    try{
        let ips = JSON.parse(data),ipHash={ipCounter:{}},finalHashArr=[],outputFile="resultset.json";

        ips.forEach((ip)=>{
            let ipHour=new Date(ip.timestamp).getHours();
            //Catching error if invalid data occures.
            if(isNaN(ipHour)) throw new Error("Invalid Data : "+ip.timestamp);

            //Keeping a counter for ip occurrences.
            ipHash.ipCounter[ip.ip]=ipHash.ipCounter[ip.ip]?ipHash.ipCounter[ip.ip]+1:1;

            //Making or updating hash for each ips that occues in a hourly time range.
            if(!ipHash[ipHour]){
                ipHash[ipHour]={ips:[],mostExp:ip}
            }
            ipHash[ipHour].ips.push(ip);

            //Checking expensive click for duplicate ips.
            if(ip.amount>ipHash[ipHour].mostExp.amount){
                ipHash[ipHour].mostExp=ip
            }
        });

        //Making final array of hashes.
        Object.values(ipHash).forEach(function (value) {
            if(value.mostExp && ipHash.ipCounter[value.mostExp.ip]<=10){
                finalHashArr.push(value.mostExp)
            }
        });
        //Writing result set to file.
        const saved = fs.writeFileSync(outputFile, JSON.stringify(finalHashArr), 'utf8');
        next(finalHashArr);
    }
    catch (e) {
        console.log("ERROR while reading file : ",e.message)
    }
}
