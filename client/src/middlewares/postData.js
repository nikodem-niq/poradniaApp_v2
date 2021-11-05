import axios from "axios";

export const postData = (url, data, setter) => {
    axios({
        method: 'post',
        url,
        headers: {
            'Content-Type': 'application/json',
            'x-access-token' : localStorage.getItem('userToken')
        },
        data
    }).then(res => {
        if(!url === '/postData/search') {
           window.location.reload();
        } 
        if(setter) {
            setter(res.data);
        }
    }).catch(err => {
        console.log(err.response.data)
    });
}