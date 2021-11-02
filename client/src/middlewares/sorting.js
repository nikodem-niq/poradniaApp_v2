import { fetchData } from "./fetchData";

export const institutionSorting = (whatToSort, order, setOrder, setData, setIdSorting, limit = 'ALL') => {
    setIdSorting(false);
    switch(whatToSort) {
        case 'idInstitution':
            setIdSorting(true);
            fetchData(`/fetchData/institution-get?column=${whatToSort}&order=${order ? 'ASC' : 'DESC'}&limit=${limit}`).then(response => {
            order ? setOrder(0) : setOrder(1);
            setData(response.data.rows)
        }).catch(err => {
            console.log(err);
        })
            break;
        case 'name':
            fetchData(`/fetchData/institution-get?column=${whatToSort}&order=${order ? 'ASC' : 'DESC'}&limit=${limit}`).then(response => {
            order ? setOrder(0) : setOrder(1);
            setData(response.data.rows)
        }).catch(err => {
            console.log(err);
        })
            break;
        case 'email':
            fetchData(`/fetchData/institution-get?column=${whatToSort}&order=${order ? 'ASC' : 'DESC'}&limit=${limit}`).then(response => {
            order ? setOrder(0) : setOrder(1);
            setData(response.data.rows)
        }).catch(err => {
            console.log(err);
        })
            break;
        case 'city':
            fetchData(`/fetchData/institution-get?column=${whatToSort}&order=${order ? 'ASC' : 'DESC'}&limit=${limit}`).then(response => {
            order ? setOrder(0) : setOrder(1);
            setData(response.data.rows)
        }).catch(err => {
            console.log(err);
        })
            break;
        case 'community':
            fetchData(`/fetchData/institution-get?column=${whatToSort}&order=${order ? 'ASC' : 'DESC'}&limit=${limit}`).then(response => {
            order ? setOrder(0) : setOrder(1);
            setData(response.data.rows)
        }).catch(err => {
            console.log(err);
        })
            break;
        case 'postalCode':
            fetchData(`/fetchData/institution-get?column=${whatToSort}&order=${order ? 'ASC' : 'DESC'}&limit=${limit}`).then(response => {
            order ? setOrder(0) : setOrder(1);
            setData(response.data.rows)
        }).catch(err => {
            console.log(err);
        })
            break;
        case 'address':
            fetchData(`/fetchData/institution-get?column=${whatToSort}&order=${order ? 'ASC' : 'DESC'}&limit=${limit}`).then(response => {
            order ? setOrder(0) : setOrder(1);
            setData(response.data.rows)
        }).catch(err => {
            console.log(err);
        })
            break;
        case 'telephone':
            fetchData(`/fetchData/institution-get?column=${whatToSort}&order=${order ? 'ASC' : 'DESC'}&limit=${limit}`).then(response => {
            order ? setOrder(0) : setOrder(1);
            setData(response.data.rows)
        }).catch(err => {
            console.log(err);
        })
            break;
        case 'fax':
            fetchData(`/fetchData/institution-get?column=${whatToSort}&order=${order ? 'ASC' : 'DESC'}&limit=${limit}`).then(response => {
            order ? setOrder(0) : setOrder(1);
            setData(response.data.rows)
        }).catch(err => {
            console.log(err);
        })
            break;
        default:
            console.log('error with sorting')
            break;
    }
};

export const employeeSorting = (whatToSort, order, setOrder, setData, setIdSorting, limit = 'ALL') => {
    setIdSorting(false);
    switch(whatToSort){
        case 'idEmployee':
            setIdSorting(true);
            fetchData(`/fetchData/employee-get?column=${whatToSort}&order=${order ? 'ASC' : 'DESC'}&limit=${limit}`).then(response => {
            order ? setOrder(0) : setOrder(1);
            setData(response.data.rows)
        }).catch(err => {
            console.log(err);
        })
            break;
        case 'firstName':
            fetchData(`/fetchData/employee-get?column=${whatToSort}&order=${order ? 'ASC' : 'DESC'}&limit=${limit}`).then(response => {
            order ? setOrder(0) : setOrder(1);
            setData(response.data.rows)
        }).catch(err => {
            console.log(err);
        })
            break;
        case 'secondName':
            fetchData(`/fetchData/employee-get?column=${whatToSort}&order=${order ? 'ASC' : 'DESC'}&limit=${limit}`).then(response => {
            order ? setOrder(0) : setOrder(1);
            setData(response.data.rows)
        }).catch(err => {
            console.log(err);
        })
            break;
        case 'lastName':
            fetchData(`/fetchData/employee-get?column=${whatToSort}&order=${order ? 'ASC' : 'DESC'}&limit=${limit}`).then(response => {
            order ? setOrder(0) : setOrder(1);
            setData(response.data.rows)
        }).catch(err => {
            console.log(err);
        })
            break;
        case 'age':
            fetchData(`/fetchData/employee-get?column=${whatToSort}&order=${order ? 'ASC' : 'DESC'}&limit=${limit}`).then(response => {
            order ? setOrder(0) : setOrder(1);
            setData(response.data.rows)
        }).catch(err => {
            console.log(err);
        })
            break;
        default:
            console.log('error with sorting')
            break;
    }
}