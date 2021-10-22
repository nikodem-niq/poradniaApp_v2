import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Login from './pages/AuthSite';
import InputDashboard from './pages/InputDashboard';
import { Switch,BrowserRouter, Route } from 'react-router-dom'
import PrivateRoute from './components/PrivateRoute';
import Auth from './components/Auth';


const App = () => {
  return (
    <BrowserRouter>  
        <Switch>
          <Auth component={Login} path="/login"/>
          <PrivateRoute component={InputDashboard} path="/input-dashboard"/>
        </Switch>
    </BrowserRouter>
  )
};

ReactDOM.render(
    <App />,
  document.getElementById('root')
);
