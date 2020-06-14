const awsmobile = {
  aws_project_region: process.env.AWS_REGION || 'eu-west-1',
  aws_cognito_identity_pool_id: process.env.IDENTITY_POOL,
  aws_cognito_region: process.env.AWS_REGION,
  aws_user_pools_id: process.env.USER_POOL,
  aws_user_pools_web_client_id: process.env.USER_POOL_CLIENT,
  aws_appsync_graphqlEndpoint: process.env.API_URL,
  aws_appsync_region: process.env.AWS_REGION,
  aws_appsync_authenticationType: 'API_KEY',
  aws_appsync_apiKey: process.env.API_KEY'
};

export default awsmobile;
