import axios from 'axios';
import { decode } from 'jsonwebtoken';

export const loginUser = async (login, password) => {
    try {
        const loginRequest = await axios({
            method: 'post',
            url: '/user/auth',
            headers: {
                'Content-Type': 'application/json'
            },
            data: { login,password }
        })

            if(loginRequest.data.token) {
                localStorage.setItem('userToken', loginRequest.data.token);
                return true;
            } 
    } catch(err) {
        return false;
    }


}

export const logoutUser = (path) => {
    if(isLogged) {
            localStorage.removeItem('userToken');
            window.location.href = path || '/'
    } return;
}

export const isLogged = () => {
    if(!localStorage.getItem('userToken')) {
        return false;
    }
    const exp = decode(localStorage.getItem('userToken')).exp;
    if (Date.now() >= exp * 1000) {
        return false;
      } else {
          return true;
      }
}