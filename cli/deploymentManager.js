const { deploymentUnits } = require('./deploymentUnits');

async function runDeployment(config) {
  const { awsRegion, envName, getCallbacks } = config;
  const artifacts = {};

  for (const unit of deploymentUnits) {
    callbacks = getCallbacks();
    callbacks.start(unit.name);

    try {
      artifacts[unit.id] = await unit.command(awsRegion, envName, artifacts);

      callbacks.success(unit.name);
    } catch (ex) {
      callbacks.error(unit.name);
      throw new Error(`${unit.name} deployment failed`);
    }
  }

  console.log(`Deployment done! Visit your application at ${artifacts.ui.websiteUrl}`);
}

module.exports = {
  runDeployment
};
