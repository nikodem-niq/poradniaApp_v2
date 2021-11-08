import axios from "axios";

export const postData = async (url, data, setter, setReload, setModal, isAddedSuccessfully) => {
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
        if(setModal) {
            setModal(true)
        }

    }).catch(err => {
        console.log(err.response.data)
    });
}