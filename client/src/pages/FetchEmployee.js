import { useCallback, useEffect } from "react";
import { Link } from "react-router-dom";
import { useState } from "react/cjs/react.development";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import { OuterWrapper } from "../components/OuterWrapper";
import TableData from "../components/TableData";
import { fetchData } from "../middlewares/fetchData";
import { postData } from "../middlewares/postData";



const FetchEmployee = () => {
    const [employeeData, setEmployeeData] = useState([]);
    const [isAscending, setDescending] = useState(false);

    useEffect(() => {
        fetchData('/fetchData/employee-get').then(response => {
            setEmployeeData(response.data.rows)
        }).catch(err => {
            console.log(err);
        })
    }, [])

    const handleStateChange = useCallback (state => {
        setEmployeeData(state);
    }, [employeeData]);

    return (
        <OuterWrapper>
            <Navbar/>
            <InnerWrapper>
                <AddEmployee/>
                <TableData whichTable="employee" data={employeeData} handleSort={[handleStateChange, isAscending, setDescending]}/>
            </InnerWrapper>
        </OuterWrapper>
    )
}

const InnerWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: auto;
`

const TableWrapper = styled.table`
    justify-content: center;
    align-items: center;
    flex-direction: column;
    display: flex;

    font-family: Arial, Helvetica, sans-serif;
    border-collapse: collapse;
    width: 100%;
    table-layout: fixed;

    td, th {
        border: 1px solid #ddd;
        padding: 8px;
    }

    td {
        width: 100%;
    }

    tr:nth-child(even){
        background-color: #dcdde1;
        border-left: solid 1px #f5f6fa;
        border-right: solid 1px #f5f6fa;
    }

    th:first-child:hover{
        background-color: red;
    }

    tr:hover {
        background-color: #487eb0;
    }

    th {
        padding-top: 12px;
        padding-bottom: 12px;
        text-align: left;
        font-size: 0.9rem;
        background-color: #04AA6D;
        color: white;
        width: 100%;
        height: 50%;
    }

    tr {
        width: 90%;
        display: flex;
        margin: 0.2rem 0;
        justify-content: center;
        align-items: center;
        background: #f5f6fa;
    }
`

const AddEmployee = props => {

    const [firstName, setFirstName] = useState("");
    const [secondName, setSecondName] = useState("");
    const [lastName, setLastName] = useState("");
    const [age, setAge] = useState("");

    const handleChange = (event) => {
        const { value, name } = event.target;
        switch(name) {
            case 'firstName' : 
                setFirstName(value);
                break;
            case 'secondName' :
                setSecondName(value);
                break;
            case 'lastName' : 
                setLastName(value);
                break;
            case 'age' :
                setAge(value);
                break;
            default:
                console.log('bad selector - handle change');
                break;
        }
    };

    const isFormValid = () =>{
        let isValid = firstName != '' && lastName != '' && age != '';
        return isValid ? '' : 'disabled';

    }

    return(
        <OuterWrapper>
            <Navbar/>
            <InnerWrapperTwo>
                <Form>
                    <h1>Formularz dodania nowego pracownika</h1>
                    <input type="text" onChange={handleChange} name="firstName" id="firstName" placeholder="Imię pracownika.."/>
                    <input type="text" onChange={handleChange} name="secondName" id="secondName" placeholder="Drugie imię pracownika.."/>
                    <input type="text" onChange={handleChange} name="lastName" id="lastName" placeholder="Nazwisko.."/>
                    <input type="number" onChange={handleChange} name="age" id="age" placeholder="Wiek"/>
                    <AddButton to="#" onClick={() => {postData("/postData/employee-add",{firstName, secondName, lastName, age})}} style={ isFormValid() ? {backgroundColor: 'red', pointerEvents: 'none'} : {backgroundColor: 'green'}}>Dodaj</AddButton>
                    {isFormValid() &&
                        <p>Wprowadz wszystkie wymagane dane!</p>
                    }
                </Form>
            </InnerWrapperTwo>
        </OuterWrapper>
    )
}

const InnerWrapperTwo = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: auto;
    width: 100%;
`

const AddButton = styled(Link)`
    background-color: ${props => props.style ? "black" : "red"};

    /* background-color: black; */
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    width: 5vw;
    height: 1.2rem;
    padding: 0.8rem;
    font-size: 18px;
    border: none;
    border-radius: 10px;
`

const DisabledButton = styled.div`
    button:disabled {
        background-color: red;
     }
`

const Form = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;

    input {
        border: none;
        width: 21rem;
        height: auto;
        border-bottom: solid 2px black; 
        margin: 2rem;
    }

    input:focus {
        outline: none;
    }

    input::placeholder {
        font-size: 1rem;
    }
    /* justify-content: center; */
    /* align-items: center; */
`

export default FetchEmployee;