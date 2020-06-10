const path = require('path');

const {
  defaultDeploymentCommand,
  installDeploymentPlugins,
  s3SyncDeploymentCommand,
  saveOutputsDeploymentCommand,
  UIDeploymentCommand
} = require('./deploymentFunctions');

const deploymentUnits = [
  // {
  //   id: 'serverless_plugins',
  //   path: path.resolve('../backend'),
  //   name: 'Deployment plugins',
  //   command: installDeploymentPlugins
  // },
  // {
  //   id: 'bucket_layer',
  //   path: path.resolve('../backend/layers/bucket'),
  //   name: 'Bucket Layer',
  //   command: defaultDeploymentCommand
  // },
  // {
  //   id: 'device_layer',
  //   path: path.resolve('../backend/layers/device'),
  //   name: 'Device Layer',
  //   command: defaultDeploymentCommand
  // },
  // {
  //   id: 'http_layer',
  //   path: path.resolve('../backend/layers/http'),
  //   name: 'HTTP Layer',
  //   command: defaultDeploymentCommand
  // },
  // {
  //   id: 'queue_layer',
  //   path: path.resolve('../backend/layers/queue'),
  //   name: 'Queue Layer',
  //   command: defaultDeploymentCommand
  // },
  // {
  //   id: 'sql_layer',
  //   path: path.resolve('../backend/layers/sql'),
  //   name: 'SQL Layer',
  //   command: defaultDeploymentCommand
  // },
  // {
  //   id: 'device_service',
  //   path: path.resolve('../backend/device'),
  //   name: 'Device Service',
  //   command: s3SyncDeploymentCommand
  // },
  // {
  //   id: 'vehicle_service',
  //   path: path.resolve('../backend/vehicle'),
  //   name: 'Vehicle Service',
  //   command: defaultDeploymentCommand
  // },
  // {
  //   id: 'events_service',
  //   path: path.resolve('../backend/events'),
  //   name: 'Events Service',
  //   command: defaultDeploymentCommand
  // },
  {
    id: 'auth',
    path: path.resolve('../backend/auth'),
    name: 'Auth',
    command: saveOutputsDeploymentCommand
  },
  {
    id: 'api',
    path: path.resolve('../backend/api'),
    name: 'API',
    command: saveOutputsDeploymentCommand
  },
  {
    id: 'ui',
    path: path.resolve('../ui'),
    name: 'UI',
    command: UIDeploymentCommand
  }
];

module.exports = {
  deploymentUnits
};
