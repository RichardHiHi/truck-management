import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
import './App.css';
import { getToken } from './Commons/storage';
import NavigationComponent from './NavigationComponent';
import CovidTrackComponent from './Pages/CovidTrackComponent';
import CreateVehicleComponent from './Pages/CreateVehicleComponent';
import DetailUserComponent from './Pages/DetailUserComponent';
import EditVehicleComponent from './Pages/EditVehicleComponent';
import HomeComponent from './Pages/HomeComponent';
import LoginComponent from './Pages/LoginComponent';
import LogupComponent from './Pages/LogupComponent';
import VehicleComponent from './Pages/VehicleComponent';

function App() {
  const queryClient = new QueryClient();
  const PrivateRouteWithAuth = ({ component: Component, ...rest }: any) => (
    <Route
      {...rest}
      render={(props) =>
        getToken() ? <Component {...props} /> : <Redirect to='/login' />
      }
    />
  );

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div>
          <NavigationComponent />
          <Switch>
            <PrivateRouteWithAuth exact path='/' component={HomeComponent} />

            <Route exact path='/login'>
              <LoginComponent />
            </Route>
            <Route exact path='/logup'>
              <LogupComponent />
            </Route>
            <PrivateRouteWithAuth
              exact
              path='/detailUser'
              component={DetailUserComponent}
            />
            <PrivateRouteWithAuth
              exact
              path='/vehicle'
              component={VehicleComponent}
            />
            <PrivateRouteWithAuth
              exact
              path='/create-vehicle'
              component={CreateVehicleComponent}
            />

            <PrivateRouteWithAuth
              exact
              path='/edit-vehicle/:id'
              component={EditVehicleComponent}
            />

            <PrivateRouteWithAuth
              exact
              path='/covid-track'
              component={CovidTrackComponent}
            />
          </Switch>
        </div>
      </Router>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
