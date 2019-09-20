'use strict'
const shell = require('shelljs');
const fs = require('fs');

module.exports.generate = function(req,success,error){
    var appPackage;
    var apkInstall;
    console.log(req[0]);
    switch(req.app){
        case 'HABITICA':
            appPackage = 'habitica';
            apkInstall = 'habitica.apk';
            break;
        case 'CALENDULA':
                appPackage = 'calendula';
                apkInstall = 'calendula.apk';
                break;
        default:
            throw error({ status: "APP_NOT_FOUND" });
    }
    if(!req.code)
        throw error( {status: "CODE_IS_NULL" }); 
    const eventsNumber = req.number ? req.number : 10;
    shell.cd(`${req.path_project}/${appPackage}`);
    shell.exec(`calabash-android gen`);
    shell.exec(`calabash-android resign ${apkInstall}`)
    shell.exec(`calabash-android run ${apkInstall}`, function(code, stdout, stderr) {
        fs.writeFile(`${req.path_project}/reports/bdd/${appPackage}/${req.code}_${req.app}.txt`, stdout, function (err) {
            if (err) throw err;
            console.log('File is created successfully.');
            success(`ok`);
          }); 
      });
    
}