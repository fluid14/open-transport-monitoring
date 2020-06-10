const util = require('util');
const exec = util.promisify(require('child_process').exec);

const { SERVERLESS, parseServerlessOutput } = require('./serverlessHelpers');

async function installDeploymentPlugins() {
  const instalationError = new Error(`${this.name} instalation failed.`);

  try {
    await exec(`cd ${this.path} && npm install`);
  } catch (ex) {
    throw instalationError;
  }
}

async function defaultDeploymentCommand(awsRegion, envName) {
  const deploymentError = new Error(`${this.name} deployment failed.`);

  try {
    await exec(`cd ${this.path} && ${SERVERLESS} deploy --region=${awsRegion} --stage=${envName}`);
  } catch (ex) {
    throw deploymentError;
  }
}

async function s3SyncDeploymentCommand(awsRegion, envName) {
  const deploymentError = new Error(`${this.name} deployment failed.`);

  try {
    await exec(`
      export AWS_REGION=${awsRegion} &&
      cd ${this.path} &&
      ${SERVERLESS} deploy --region=${awsRegion} --stage=${envName}
    `);
  } catch (ex) {
    throw deploymentError;
  }
}

async function saveOutputsDeploymentCommand(awsRegion, envName) {
  const deploymentError = new Error(`${this.name} deployment failed.`);

  try {
    await exec(`
      export AWS_REGION=${awsRegion} &&
      cd ${this.path} &&
      ${SERVERLESS} deploy --region=${awsRegion} --stage=${envName}
    `);

    const { stdout } = await exec(`
      cd ${this.path} &&
      ${SERVERLESS} output list --region=${awsRegion} --stage=${envName}
    `);

    return parseServerlessOutput(stdout);
  } catch (ex) {
    console.log(JSON.stringify(ex));
    throw deploymentError;
  }
}

async function UIDeploymentCommand(awsRegion, envName, artifacts) {
  const deploymentError = new Error(`${this.name} deployment failed.`);

  const { auth, api } = artifacts;
  const { apiKey, apiUrl } = api;
  const { userPoolClientId, userPoolId, identityPoolId } = auth;

  try {
    await exec(`
      cd ${this.path} &&
      npm install &&
      API_KEY=${apiKey}
      API_URL=${apiUrl}
      USER_POOL=${userPoolId}
      USER_POOL_CLIENT=${userPoolClientId}
      IDENTITY_POOL=${identityPoolId}
      AWS_REGION=${awsRegion}
      npm run build
    `);

    await exec(`
      export AWS_REGION=${awsRegion} &&
      cd ${this.path} &&
      ${SERVERLESS} deploy --region=${awsRegion} --stage=${envName}
    `);

    const { stdout } = await exec(`
      cd ${this.path} &&
      ${SERVERLESS} output list --region=${awsRegion} --stage=${envName}
    `);

    return parseServerlessOutput(stdout);
  } catch (ex) {
    throw deploymentError;
  }
}

module.exports = {
  installDeploymentPlugins,
  defaultDeploymentCommand,
  s3SyncDeploymentCommand,
  saveOutputsDeploymentCommand,
  UIDeploymentCommand
};
