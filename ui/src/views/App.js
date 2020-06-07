import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import GlobalTemplate from 'templates/GlobalTemplate';
import AllVehiclesView from 'views/AllVehiclesView/AllVehiclesView';
import VehicleView from 'views/VehicleView/VehicleView';
import { routes } from 'routes/routes';
import awsmobile from 'aws-exports';
import Amplify, { I18n } from 'aws-amplify';
import { withAuthenticator } from 'aws-amplify-react';
import './authenticator.css';
import dict from 'translations/pl/authentication';

Amplify.configure(awsmobile);

I18n.putVocabularies(dict);
I18n.setLanguage('pl');

class App extends React.Component {
  state = {
    user: '',
  };

  render() {
    const { user } = this.state;
    return (
      <BrowserRouter>
        <GlobalTemplate user={user}>
          <Switch>
            <Route exact path={routes.home} render={() => <Redirect to={routes.allVehicles} />} />
            <Route exact path={routes.allVehicles} component={AllVehiclesView} />
            <Route exact path={routes.vehicle} component={VehicleView} />
          </Switch>
        </GlobalTemplate>
      </BrowserRouter>
    );
  }
}

export default withAuthenticator(App);
