import axios from "axios";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useState } from "react/cjs/react.development";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import { OuterWrapper } from "../components/OuterWrapper";
import TableData from "../components/TableData";
import { fetchData } from "../middlewares/fetchData";
import { postData } from "../middlewares/postData";


const FetchEvents = () => {
    // Posting
    const [dateOfEvent, setDateOfEvent] = useState("");
    const [employeeId, setEmployeeId] = useState(0);
    const [institutionId, setInstitutionId] = useState("");
    const [programId, setProgramId] = useState("");
    const [typeOfProgram, setTypeOfProgram] = useState("");
    const [howManyParticipiants, setHowManyParticipiants] = useState("");
    const [howManyPrograms, setHowManyPrograms] = useState("");
    const [differentNameProgram, setDifferentNameProgram] = useState("");

    const [employeeCount, setEmployeeCount] = useState(0);

    const handleChange = (event) => {
        if(event.target.name == 'employeeId') {
            setEmployeeId(event.target.selectedOptions[0].getAttribute('data-id'));
            console.log(event.target.value)
        } else if(event.target.name == 'dateOfEvent') {
            setDateOfEvent(event.target.value.toString())
        } else if(event.target.name == 'institutionId') {
            setInstitutionId(event.target.selectedOptions[0].getAttribute('data-id'))
        } else if(event.target.name == 'programsId') {
            setProgramId(event.target.selectedOptions[0].getAttribute('data-id'))
        } else if(event.target.name == 'typeOfProgram') {
            setTypeOfProgram(event.target.value);
        } else if(event.target.name == 'howManyParticipiants') {
            setHowManyParticipiants(event.target.value);
        } else if(event.target.name == 'howManyPrograms') {
            setHowManyPrograms(event.target.value);
        } else if(event.target.name == 'differentNameProgram') {
            setDifferentNameProgram(event.target.value);
        }
        else if(event.target.name == 'quantityOfWorkers') {
            if(!isNaN(parseInt(event.target.value))){
                setEmployeeCount(parseInt(event.target.value));
            }
            if(event.target.value == ''){
                setEmployeeCount(0);
            }
        }
    }


    // Fetching
    const [eventData, setEventData] = useState([]);
    const [institutionData, setInstitutionData] = useState([]);
    const [employeeData, setEmployeeData] = useState([]);
    const [programsData, setProgramsData] = useState([]);

    useEffect(() => {
        const endpoints = [
            '/fetchData/institution-get',
            '/fetchData/employee-get',
            '/fetchData/programs-get',
            '/fetchData/events-get'
        ]

        axios.all(endpoints.map((endpoint) => axios.get(endpoint, {headers: { 'x-access-token' : localStorage.getItem('userToken') }}))).then(
            axios.spread(( institution, employee, programs, events ) => {
                setInstitutionData(institution.data.rows);
                setEmployeeData(employee.data.rows);
                setProgramsData(programs.data.rows);
                setEventData(events.data.rows);
            })
          );


    }, [])

    const isFormValid = () =>{
        let isValid = dateOfEvent !== '' && employeeId !== '' && institutionId !== '' && programId !== '' && typeOfProgram !== '' && howManyParticipiants !== '' && howManyPrograms  !== '' && differentNameProgram !== ''; 
        return isValid ? '' : 'disabled';

    }


    return (
        <OuterWrapper>
            <Navbar/>
            <InnerWrapper>
            <Form>
                    <h1>Formularz dodania nowego wydarzenia</h1>
                    <label htmlFor="dateOfEvent">Data wizyty</label>
                    <input type="date" onChange={handleChange} name="dateOfEvent" id="dateOfEvent" placeholder="Data wizyty.."/>
                    <input type="text" onChange={handleChange} name="quantityOfWorkers" id="quantityOfWorkers" placeholder="Ilu pracownikow w wydarzeniu?"/>

                    {/* <select name="employeeId" id="employeeId" onChange={handleChange}>
                        <option>-- Wybierz pracownika --</option>
                        {employeeData.map((el) => {
                            return <SelectItem key={el.idEmployee} id={el.idEmployee} name={el.firstName} lastName={el.lastName}/>
                        })}
                    </select> */}
                    {[...Array(parseInt(employeeCount))].map((v,i) => {
                        return <SelectEmployee i={i} employeeData={employeeData} handleChange={handleChange}/>
                    })}
                    <select name="institutionId" id="institutionId" onChange={handleChange}>
                        <option>-- Wybierz szkołe --</option>
                        {institutionData.map((el) => {
                            return <SelectItem key={el.idInstitution} id={el.idInstitution} name={el.name} community={el.community}/>
                        })}
                    </select>
                    <select name="programsId" id="programsId" onChange={handleChange}>
                        <option>-- Wybierz program --</option>
                        {programsData.map((el) => {
                            return <SelectItem key={el.idProgram} id={el.idProgram} name={el.name}/>
                        })}
                    </select>
                    <input type="text" onChange={handleChange} name="typeOfProgram" id="typeOfProgram" placeholder="Rodzaj zajęć.."/>
                    <input type="number" onChange={handleChange} name="howManyParticipiants" id="howManyParticipiants" placeholder="Ilu uczestników.."/>
                    <input type="number" onChange={handleChange} name="howManyPrograms" id="howManyPrograms" placeholder="Ile form pomocy.."/>
                    <input type="text" onChange={handleChange} name="differentNameProgram" id="differentNameProgram" placeholder="Inna nazwa programu.."/>

                    <AddButton to="#" onClick={() => {postData("/postData/event-add",{dateOfEvent, employeeId, institutionId, programId, typeOfProgram, howManyParticipiants, howManyPrograms, differentNameProgram})}} style={ isFormValid() ? {backgroundColor: 'red', pointerEvents: 'none'} : {backgroundColor: 'green'}}>Dodaj</AddButton>
                    {isFormValid() &&
                        <p>Wprowadz wszystkie wymagane dane!</p>
                    }
                </Form>
                <TableData whichTable="events" eventData={eventData} programsData={programsData} employeeData={employeeData} institutionData={institutionData}/>
            </InnerWrapper>
        </OuterWrapper>
    )
}

const SelectItem = props => {

    return (
        <option data-id={props.id} data-community={props.community}> {props.name} {props.lastName}</option>
    )
}


const SelectEmployee = props => {
    return (<select name="employeeId" className="employeeId" onChange={props.handleChange}>
    <option>-- Wybierz pracownika nr. {props.i+1} --</option>
    {props.employeeData.map((el) => {
        return <SelectItem key={el.idEmployee} id={el.idEmployee} name={el.firstName} lastName={el.lastName}/>
    })}
    </select>)
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
        padding-top: 8px;
        padding-bottom: 8px;
    }

    td {
        width: 100%;
        font-size: 0.8rem;
    }

    tr:nth-child(even){
        background-color: #dcdde1;
    }

    tr:nth-child(even) td {
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
        font-size: 0.8rem;
        background-color: #04AA6D;
        color: white;
        width: 100%;
        height: 70%;
    }

    tr {
        width: 95%;
        display: flex;
        margin: 0.2rem 0;
        justify-content: center;
        align-items: center;
        background: #f5f6fa;
    }
`

const AddButton = styled(Link)`
    background-color: black;
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

const Form = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;

    input, select {
        border: none;
        width: 21rem;
        height: auto;
        border-bottom: solid 2px black; 
        margin: 2rem;
    }

    input:focus, select:focus {
        outline: none;
    }

    input::placeholder, select::placeholder {
        font-size: 1rem;
    }
`


export default FetchEvents;