import axios from "axios";

export const postInstitution = (data) => {
    axios({
        method: 'post',
        url: '/postData/institution-add',
        headers: {
            'Content-Type': 'application/json'
        },
        data : data
    }).then(res => {
        console.log(res);
    }).catch(err => {
        console.log(err.response.data)
    });
}