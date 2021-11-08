import axios from "axios";

export const postData = async (url, data, setter, setReload, setModal, reloadPage) => {
    // console.log(data);
    axios({
        method: 'post',
        url,
        headers: {
            'Content-Type': 'application/json',
            'x-access-token' : localStorage.getItem('userToken')
        },
        data
    }).then(res => {
        if(reloadPage) {
            window.location.reload();
        }
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