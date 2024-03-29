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
import FetchEvents from './pages/FetchEvents.js';
import FetchEvents2 from './pages/FetchEvents2.js';
import FetchEvents3 from './pages/FetchEvents3.js';
import SearchPage from './pages/SearchPage';
import EditPage from './pages/EditPage';
import NotFoundPage from './pages/NotFoundPage';


const App = () => {
  return (
    <BrowserRouter>  
        <Switch>
          <Auth component={Login} path="/login"/>
          <PrivateRoute component={Dashboard} path="/dashboard"/>
          <PrivateRoute component={Dashboard} exact path="/"/>

          <PrivateRoute component={FetchInstitution} path="/institution"/>
          <PrivateRoute component={FetchEmployee} path="/employee"/>
          <PrivateRoute component={FetchPrograms} path="/programs"/>
          <PrivateRoute component={FetchEvents} path="/events"/>
          <PrivateRoute component={FetchEvents2} path="/events2"/>
          <PrivateRoute component={FetchEvents3} path="/events3"/>

          <PrivateRoute component={SearchPage} path="/search"/>

          <PrivateRoute component={EditPage} path="/edit/:what/:id"/>

          <PrivateRoute component={NotFoundPage}/>

          {/* <Route component={Dashboard} path="/dashboard"/>
          <Route component={Dashboard} exact path="/"/>

          <Route component={FetchInstitution} path="/institution"/>
          <Route component={FetchEmployee} path="/employee"/>
          <Route component={FetchPrograms} path="/programs"/>
          <Route component={FetchEvents} path="/events"/>

          <Route component={SearchPage} path="/search"/> */}

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
