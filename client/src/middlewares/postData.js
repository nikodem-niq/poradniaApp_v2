import axios from "axios";

export const postData = (url, data, setter, setReload) => {
    axios({
        method: 'post',
        url,
        headers: {
            'Content-Type': 'application/json',
            'x-access-token' : localStorage.getItem('userToken')
        },
        data
    }).then(res => {
        if(setReload) {
           setReload(true);
        } 
        if(setter) {
            setter(res.data);
        }
    }).catch(err => {
        console.log(err.response.data)
    });
}