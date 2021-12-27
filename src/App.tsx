import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import NavigationComponent from './NavigationComponent';
import CovidTrackComponent from './Pages/CovidTrackComponent';
import CreateVehicleComponent from './Pages/CreateVehicleComponent';
import DetailUserComponent from './Pages/DetailUserComponent';
import HomeComponent from './Pages/HomeComponent';
import LoginComponent from './Pages/LoginComponent';
import LogupComponent from './Pages/LogupComponent';
import VehicleComponent from './Pages/VehicleComponent';

function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div>
          <NavigationComponent />
          <Switch>
            <Route exact path='/'>
              <HomeComponent />
            </Route>
            <Route exact path='/login'>
              <LoginComponent />
            </Route>
            <Route exact path='/logup'>
              <LogupComponent />
            </Route>
            <Route exact path='/detailUser'>
              <DetailUserComponent />
            </Route>
            <Route exact path='/vehicle'>
              <VehicleComponent />
            </Route>
            <Route exact path='/create-vehicle'>
              <CreateVehicleComponent />
            </Route>
            <Route exact path='/create-vehicle/:id'>
              <CreateVehicleComponent />
            </Route>
            <Route exact path='/covid-track'>
              <CovidTrackComponent />
            </Route>
          </Switch>
        </div>
      </Router>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
