import React, { useState } from 'react';
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from 'react-query';
import NavigationComponent from './NavigationComponent';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import LoginComponent from './Pages/LoginComponent';
import LogupComponent from './Pages/LogupComponent';
import { UserLogin } from './commons/interface';
import DetailUserComponent from './Pages/DetailUserComponent';
import HomeComponent from './Pages/HomeComponent';
import VehicleComponent from './Pages/VehicleComponent';
import { ReactQueryDevtools } from 'react-query/devtools';
import CreateVehicleComponent from './Pages/CreateVehicleComponent';

function App() {
  const queryClient = new QueryClient();
  const [user, setUser] = useState<UserLogin | null>(null);
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div>
          <NavigationComponent user={user} setUser={setUser} />
          <Switch>
            <Route exact path='/'>
              <HomeComponent />
            </Route>
            <Route exact path='/login'>
              <LoginComponent setUser={setUser} />
            </Route>
            <Route exact path='/logup'>
              <LogupComponent setUser={setUser} />
            </Route>
            <Route exact path='/detailUser'>
              <DetailUserComponent user={user} />
            </Route>
            <Route exact path='/vehicle'>
              <VehicleComponent />
            </Route>
            <Route exact path='/create-vehicle'>
              <CreateVehicleComponent />
            </Route>
          </Switch>
        </div>
      </Router>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
