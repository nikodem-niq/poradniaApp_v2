import axios from "axios"

export const removeItem = (id, item) => {
    switch(item) {
        case 'institution':
            axios.delete(`/updateData/removeInstitution?id=${id}`, { headers : { 'x-access-token' : localStorage.getItem('userToken')}}).then(res => {
                console.log(res);
                window.location.reload();
            }).catch(err => {
                console.log(err);
            })
            break;
        case 'employee':
            axios.delete(`/updateData/removeEmployee?id=${id}`, { headers : { 'x-access-token' : localStorage.getItem('userToken')}}).then(res => {
                console.log(res);
                window.location.reload();
            }).catch(err => {
                console.log(err);
            })
            break;
        case 'programs':
            axios.delete(`/updateData/removeProgram?id=${id}`, { headers : { 'x-access-token' : localStorage.getItem('userToken')}}).then(res => {
                console.log(res);
                window.location.reload();
            }).catch(err => {
                console.log(err);
            })
            break;
        case 'event':
            axios.delete(`/updateData/removeEvent?id=${id}`, { headers : { 'x-access-token' : localStorage.getItem('userToken')}}).then(res => {
                console.log(res);
                window.location.reload();
            }).catch(err => {
                console.log(err);
            })
            break;
        case 'default':
            console.log('bad "delete" parameters');
            break;
    }
}