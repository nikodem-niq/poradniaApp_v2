import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Login from './pages/AuthSite';
import Dashboard from './pages/Dashboard';
import { Switch,BrowserRouter } from 'react-router-dom'
import PrivateRoute from './components/PrivateRoute';
import Auth from './components/Auth';
import FetchInstitution from './pages/FetchInstitution';
import FetchEmployee from './pages/FetchEmployee';
import FetchPrograms from './pages/FetchPrograms';
import FetchEvents from './pages/FetchEvents';
import SearchPage from './pages/SearchPage';


const App = () => {
  return (
    <BrowserRouter>  
        <Switch>
          <Auth component={Login} path="/login"/>
          <PrivateRoute component={Dashboard} path="/dashboard"/>

          <PrivateRoute component={FetchInstitution} path="/institution"/>
          <PrivateRoute component={FetchEmployee} path="/employee"/>
          <PrivateRoute component={FetchPrograms} path="/programs"/>
          <PrivateRoute component={FetchEvents} path="/events"/>

          <PrivateRoute component={SearchPage} path="/search"/>

        </Switch>
    </BrowserRouter>
  )
};

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
