const path = require('path');

const SERVERLESS = path.resolve('node_modules/serverless/bin/serverless.js');

function parseServerlessOutput(output) {
  return output
    .replace('Serverless: Stored outputs:', '')
    .split(/\r?\n/)
    .filter(line => line && !line.startsWith('Name'))
    .map(line => {
        const [ key, value ] = line.split('|');
        return {
          [key.trim()]: value.trim()
        }
    })
    .reduce((acc, current) => ({ ...acc, ...current }), {});
}

module.exports = {
  SERVERLESS,
  parseServerlessOutput
};
