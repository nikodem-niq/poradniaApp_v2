import axios from "axios";

export const postInstitution = () => {
    axios({
        method: 'post',
        url: '#',
        headers: {
            'Content-Type': 'application/json'
        },
        data: { }
    }).then(res => {
        console.log(res.data);
    }).catch(err => {
        console.log(err.response.data)
    });
}