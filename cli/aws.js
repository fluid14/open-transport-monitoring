const util = require('util');
const exec = util.promisify(require('child_process').exec);

const { SERVERLESS } = require('./serverlessHelpers');

const AWS_REGIONS = [
  'ap-south-1',
  'ap-southeast-1',
  'ap-southeast-2',
  'ap-northeast-1',
  'ap-northeast-2',
  'eu-central-1',
  'eu-west-1',
  'eu-west-2',
  'us-east-1',
  'us-east-2',
  'us-west-2'
];

async function setupAWSCredentials(awsKey, awsSecret) {
  try {
    await exec(`${SERVERLESS} config credentials --provider aws --key ${awsKey} --secret ${awsSecret} -o`);
  } catch(ex) {
    throw new Error('AWS credentials setup failed.');
  }
}

module.exports = {
  AWS_REGIONS,
  setupAWSCredentials
};
