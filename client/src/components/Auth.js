import { Route, Redirect } from 'react-router-dom';
import { isLogged } from '../middlewares/auth';

const Auth = ({component: Component, ...rest}) => {
    return (
        <Route {...rest} render={props => (
            isLogged() ?
                <Redirect to="/dashboard"/>
            : <Component {...props}/>
        )} />
    );
};

export default Auth;
