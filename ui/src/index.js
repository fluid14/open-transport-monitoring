import React from 'react';
import ReactDOM from 'react-dom';
import App from 'views/App';
import { ApolloProvider } from 'react-apollo';
import client from 'awsClient';

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root'),
);
