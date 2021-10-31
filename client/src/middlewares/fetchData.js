import axios from "axios";

export const fetchData = async (url) => {
    return await axios({
        method: 'get',
        url,
        headers: {
            'Content-Type': 'application/json',
            'x-access-token' : localStorage.getItem('userToken')
        },
    })
}