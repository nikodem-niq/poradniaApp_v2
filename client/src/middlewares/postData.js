import axios from "axios";

export const postData = (url, data) => {
    axios({
        method: 'post',
        url,
        headers: {
            'Content-Type': 'application/json',
            'x-access-token' : localStorage.getItem('userToken')
        },
        data
    }).then(res => {
        console.log(res);
        window.location.reload();
    }).catch(err => {
        console.log(err.response.data)
    });
}