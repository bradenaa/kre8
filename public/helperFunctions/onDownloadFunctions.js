const fs = require('fs');
const { spawn, spawnSync } = require('child_process');
const fsp = require('fs').promises;
const path = require('path');

const onDownload = {}

//** --------- INSTALL AWS IAM AUTHENTICATOR FOR EKS ---------------------- **//
onDownload.installIAMAuthenticator = async () => {
  console.log('now installing IAM authenticator');


  //TODO: how to do node child process w await?
  try {

    const child = spawnSync('curl', ['-o', 'aws-iam-authenticator', 'https://amazon-eks.s3-us-west-2.amazonaws.com/1.11.5/2018-12-06/bin/darwin/amd64/aws-iam-authenticator']);
    const stdout = child.stdout.toString();
    const stderr = child.stderr.toString();
    console.log('stdout', stdout, 'stderr', stderr);

  } catch (err) {
    console.log(err)  
  }
}


//** --------- APPLY EXECUTE PERMISSIONS TO THE BINARY FILE ---------------- **//
onDownload.enableIAMAuthenticator = async () => {
  console.log('now enabling IAM authenticator');


  //TODO: add await
  try {
    const child = spawnSync('chmod', ['+x', './aws-iam-authenticator']);
    const stdout = child.stdout.toString();
    const stderr = child.stderr.toString();
    console.log('stdout', stdout, 'stderr', stderr);

  } catch (err) {
    console.log(err);
  }
}

//** ---- COPY AWS-IAM-AUTHENTICATOR FILE TO BIN FOLDER IN HOME DIRECTORY - **//

 
onDownload.copyToBinFolder = async () => {
  console.log('now copying to bin folder');


  //TODO: Should we use fsp?

  try {
    //Check if user has bin folder in Home directory, if not, make one.
    const doesBinFolderExist = fs.existsSync(process.env['HOME'] + '/bin');

    if (!doesBinFolderExist) {
      fs.mkdirSync(process.env['HOME'] + '/bin'), (err) => {
        if (err) console.log("mkdir error", "err");
      }
    }
    
    //Copy the AWS-iam-authenticator file into the bin folder. 
    const child = spawnSync('cp', ['./aws-iam-authenticator', process.env['HOME'] + '/bin/aws-iam-authenticator']);
    const stdout = child.stdout.toString();
    const stderr = child.stderr.toString();
    console.log('stdout', stdout, 'stderr', stderr);
  } catch (err) {
    console.log(err);
  }
}


//** ---- APPEND PATH TO BASH_PROFILE FILE - **//
onDownload.appendToBashProfile = async () => {
  console.log('now appending to bash profile');

  try {
    console.log('trying to append to bash profile')
    const textToInsert = `\nexport PATH=$HOME/bin:$PATH`;
    const bashProfileExists = fs.existsSync(process.env['HOME'] +'/.bash_profile');
    console.log('bashProfileExists:', bashProfileExists)
    if (bashProfileExists){
      await fsp.appendFile(process.env['HOME'] + '/.bash_profile', textToInsert);
      process.env['PATH'] = process.env['HOME'] + '/bin:' + process.env['PATH'];
    }else{

      console.log('profile didnt exist', textToInsert)
      await fsp.writeFile(process.env['HOME'] +'/.bash_profile', textToInsert)
    }
  } catch (err) {
    console.log(err);
  }
}



module.exports = onDownload;