import axios from "axios"

export const editItem = (url, data, id, setModal) => {
    axios.put(`${url}?id=${id}`, data, { headers : { 'x-access-token' : localStorage.getItem('userToken')}}).then(res => {
        console.log(res);
        setModal(true);
        setTimeout(() => {window.location.reload(); window.location.href = '/'}, 500);
    }).catch(err => {
        console.log(err);
    })
}

export const removeItem = (id, item, setModal) => {
    switch(item) {
        case 'institution':
            axios.delete(`/updateData/removeInstitution?id=${id}`, { headers : { 'x-access-token' : localStorage.getItem('userToken')}}).then(res => {
                window.location.reload();
            }).catch(err => {
                console.log(err);
            })
            break;
        case 'employee':
            axios.delete(`/updateData/removeEmployee?id=${id}`, { headers : { 'x-access-token' : localStorage.getItem('userToken')}}).then(res => {
                window.location.reload();
            }).catch(err => {
                console.log(err);
            })
            break;
        case 'programs':
            axios.delete(`/updateData/removeProgram?id=${id}`, { headers : { 'x-access-token' : localStorage.getItem('userToken')}}).then(res => {
                window.location.reload();
            }).catch(err => {
                setModal(true);
                setTimeout(() => {
                    window.location.reload()
                }, 1000)
            })
            break;
        case 'event':
            axios.delete(`/updateData/removeEvent?id=${id}`, { headers : { 'x-access-token' : localStorage.getItem('userToken')}}).then(res => {
                window.location.reload();
            }).catch(err => {
                console.log(err);
            })
            break;
        default:
            console.log('bad "delete" parameters');
            break;
    }
}