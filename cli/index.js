const figlet = require('figlet');
const chalk = require('chalk');
const inquirer = require('inquirer');
const ora = require('ora');

const { AWS_REGIONS, setupAWSCredentials } = require('./aws');
const { runDeployment } = require('./deploymentManager');

(async function() {
  console.log(figlet.textSync('FleetSystem'));
  console.log(chalk.blue('Deployment CLI'));


  const { awsKey, awsSecret } = await inquirer.prompt([
    {type: "input", name: "awsKey", message: "Provide AWS Key"},
    {type: "password", name: "awsSecret", message: "Provide AWS Secret"},
  ]);

  const spinner = ora("Configuring AWS account").start();
  try {
    await setupAWSCredentials(awsKey, awsSecret);
    spinner.succeed();
  } catch (ex) {
    spinner.fail(ex.message);
    return;
  }

  const { awsRegion, envName } = await inquirer.prompt([
    {type: "list", name: "awsRegion", message: "Select region", choices: AWS_REGIONS },
    {type: "input", name: "envName", message: "Provide environment name (dev, uat, prod, etc...)"}
  ]);

  const deploymentSpinner = () => {
    const spinner = ora();

    return {
      start: unitname => spinner.start(`Deploying ${unitname}`),
      success: unitname =>  spinner.succeed(`${unitname} deployment succeed`),
      error: unitname => spinner.fail(`${unitname} deployment failed`)
    };
  }

  try {
    await runDeployment({
      awsRegion,
      envName,
      getCallbacks: deploymentSpinner
    })
  } catch(ex) {
    return;
  }

})();
