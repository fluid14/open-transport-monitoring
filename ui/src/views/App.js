import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import GlobalTemplate from 'templates/GlobalTemplate';
import AllVehiclesView from 'views/AllVehiclesView';
import VehicleView from 'views/VehicleView/VehicleView';
import { routes } from 'routes/routes';

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

export default App;
