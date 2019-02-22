const fs = require('fs');
const { spawn } = require('child_process');
const fsp = require('fs').promises;

const path = require('path');

//** --------- .ENV Variables -------------- 
const REGION = process.env.REGION;

//** --------- IMPORT AWS SDK ELEMENTS --------- 
const EKS = require('aws-sdk/clients/eks');
const IAM = require('aws-sdk/clients/iam');
const CloudFormation = require('aws-sdk/clients/cloudformation');

//** --------- INITIALIZE SDK IMPORTS ------ 
const iam = new IAM()
const eks = new EKS({ region: REGION});
const cloudformation = new CloudFormation({ region: REGION});

//** --------- IMPORT LOCAL RESOURCES ------ 
const awsParameters = require(__dirname + '/awsParameters');

const awsHelperFunctions = {};


//** -- Timeout Function blocks excution thread for ms Miliseconds ------ 
awsHelperFunctions.timeout = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms));
} 

//** -- Function to check the Filesystem for a specific directory --- 
awsHelperFunctions.checkFileSystemForDirectoryAndMkDir = (folderName) => {
  const fileExists = fs.existsSync(process.env['HOME'] + `/${folderName}`);
  if (!fileExists) {
    fs.mkdirSync(process.env['HOME'] + `/${folderName}`), (err) => {
      if (err) console.log("mkdir error", folderName, err);
    };  
  }
}

//** -- Function to read and check AWS_MASTER file --- 
awsHelperFunctions.checkAWSMasterFile = async (key, value) => {

  let valueToReturn;

  try {

    const fileExists = fs.existsSync(__dirname + `/../sdkAssets/private/AWS_MASTER_DATA.json`); 

    if (fileExists) {
      console.log("file exists");
      const awsMasterFileContents = fs.readFileSync(__dirname + `/../sdkAssets/private/AWS_MASTER_DATA.json`, 'utf-8');
      console.log("awsMasterFile check ", awsMasterFileContents);
      const parsedAWSMasterFileContents = JSON.parse(awsMasterFileContents);

      if (parsedAWSMasterFileContents[key] === value) {
        console.log("key already exists")
        valueToReturn = true;
      } else {
        console.log("key did not exist")
        valueToReturn = false;
      }
    } else {
      const dataForAWSMasterDataFile = { [key]: value };
      const stringifiedDataForAWSMasterDataFile = JSON.stringify(dataForAWSMasterDataFile);
      const awsMasterFile = await fsp.writeFile(__dirname + `/../sdkAssets/private/AWS_MASTER_DATA.json`, stringifiedDataForAWSMasterDataFile);

      console.log("file did not exist. Created file and wrote initial data to file: ", stringifiedDataForAWSMasterDataFile);

      valueToReturn = false;
    }
  } catch (err) {
    console.log(err);
  }

  console.log("valueToReturn: ", valueToReturn);
  return valueToReturn;
}

//if checkAWSMasterFile returns false, append text
awsHelperFunctions.appendAWSMasterFile = async (data) => {

  try {
    console.log("Data to append to file", typeof data, data);
    
    const awsMasterFileContents = fs.readFileSync(__dirname + `/../sdkAssets/private/AWS_MASTER_DATA.json`, 'utf-8');

    const parsedAWSMasterFileContents = JSON.parse(awsMasterFileContents);

    for (let key in data) {
      parsedAWSMasterFileContents[key] = data[key];
    }

    const stringifiedAWSMasterFileContents = JSON.stringify(parsedAWSMasterFileContents);

    const awsUpdatedMasterFile = await fsp.writeFile(__dirname + `/../sdkAssets/private/AWS_MASTER_DATA.json`, stringifiedAWSMasterFileContents);

    console.log("data added to master file");

    return parsedAWSMasterFileContents;

  } catch (err) {
    console.log(err);
  }
}

module.exports = awsHelperFunctions;