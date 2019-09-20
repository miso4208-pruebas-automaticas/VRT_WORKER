'use strict'
const shell = require('shelljs');
const fs = require('fs');

module.exports.generateRandom = function(req,success,error){
    var appPackage;
    var apkInstall;
    console.log(req[0]);
    switch(req.app){
        case 'HABITICA':
            appPackage = 'com.habitrpg.android.habitica';
            apkInstall = 'habitica.apk';
            break;
        case 'CALENDULA':
                appPackage = 'es.usc.citius.servando.calendula';
                apkInstall = 'calendula.apk';
                break;
        default:
            throw error({ status: "APP_NOT_FOUND" });
    }
    if(!req.code)
        throw error( {status: "CODE_IS_NULL" }); 
    const eventsNumber = req.number ? req.number : 10;
    shell.exec(`adb install ${req.path_project}/vendor/${apkInstall}`)
    shell.exec(`adb shell monkey -p ${appPackage} -v ${eventsNumber}`, function(code, stdout, stderr) {
        fs.writeFile(`${req.path_project}/reports/random/${req.code}_${req.app}.txt`, stdout, function (err) {
            if (err) throw err;
            console.log('File is created successfully.');
            success(`${req.path_project}/reports/${req.code}${req.app}.txt`);
          }); 
      });
    
}