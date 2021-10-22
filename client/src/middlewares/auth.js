import axios from 'axios';

export const loginUser = (login, password, path) => {
    axios({
        method: 'post',
        url: '/user/auth',
        headers: {
            'Content-Type': 'application/json'
        },
        data: { login,password }
    }).then(res => {
        console.log(res.data);
        localStorage.setItem('userToken', res.data.token);
        window.location.href = path
    }).catch(err => {
        console.log(err.response.data)
    });
}

export const logoutUser = (path) => {
    if(isLogged) {
        localStorage.removeItem('userToken');
        window.location.href = path || '/'
    } return;
}

export const isLogged = () => {
    if(localStorage.getItem('userToken')) {
        return true;
    } else return;
}