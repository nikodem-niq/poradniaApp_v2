import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import { OuterWrapper } from "../components/OuterWrapper";
import TableData from "../components/TableData";
import { postData } from "../middlewares/postData";


const SearchPage = () => {


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



    // Searching
    // Form states
    const [firstDate, setFirstDate] = useState('');
    const [secondDate, setSecondDate] = useState('');
    const [employees, setEmployees] = useState('');
    const [nameOfInstitution, setNameOfInstitution] = useState('');
    const [nameOfProgram, setNameOfProgram] = useState('');
    const [typeOfProgram, setTypeOfProgram] = useState('');
    const [firstParticipiants, setFirstParticipiants] = useState(0);
    const [secondParticipiants, setSecondParticipiants] = useState(0);
    const [firstPrograms, setFirstPrograms] = useState(0);
    const [secondPrograms, setSecondPrograms] = useState(0);
    const [differentNameProgram, setDifferentNameProgram] = useState('');
    
    const handleChange = event => {
        const { name,value, selectedOptions } = event.target;
        if(name == 'firstDate') {
            setFirstDate(value);
        } else if(name == 'secondDate') {
            setSecondDate(value);
        } else if(name == 'employees') {
            setEmployees(value);
        } else if(name == 'nameOfInstitution') {
            setNameOfInstitution(value);
        }
    }

    // tu dokonczyc!!


    return (
        <OuterWrapper>
            <Navbar/>
            <InnerWrapper>
                <Form>
                    <label>Wyszukiwanie (jeśli pole nie jest wymagane ZOSTAW PUSTE!)</label>
                    <FormItem what="dateOfEvent" handleChange={handleChange}/>
                    <FormItem what="employees" handleChange={handleChange}/>
                    <FormItem what="nameOfInstitution" handleChange={handleChange}/>
                    <FormItem what="nameOfProgram" handleChange={handleChange}/>
                    <FormItem what="typeOfProgram" handleChange={handleChange}/>
                    <FormItem what="howManyParticipiants" handleChange={handleChange}/>
                    <FormItem what="howManyPrograms" handleChange={handleChange}/>
                    <FormItem what="differentNameProgram" handleChange={handleChange}/>
                    <AddButton>Szukaj</AddButton>
                </Form>
                <TableData whichTable="events" eventData={eventData} programsData={programsData} employeeData={employeeData} institutionData={institutionData}/>
            </InnerWrapper>
        </OuterWrapper>
    )
}

const FormItem = props => {
    switch(props.what) {
        case 'dateOfEvent':
            return (
                <div>
                <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    <label style={{marginTop: '3rem', marginBottom: '3rem'}}> Zakres dat </label> <br/>
                </div>
                <div style={{display: 'flex'}}>
                    <div style={{display: 'flex', flexDirection: 'column', ustifyContent: 'center', alignItems: 'center'}}>
                        <label htmlFor="firstDate">
                            Data początkowa
                        </label>
                        <input onChange={props.handleChange} type="date" name="firstDate" id="firstDate" required />    
                    </div>
                    <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                    <label htmlFor="secondDate">
                        Data końcowa
                    </label>
                    <input onChange={props.handleChange} type="date" name="secondDate" id="secondDate" required/>
                    </div>
                </div>
                </div>
            )
        case 'employees':
            return (
                <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    <label style={{marginTop: '3rem', marginBottom: '3rem'}}> Dane pracownika </label> <br/>
                    <input onChange={props.handleChange} type="text" name="employees" id="employees" placeholder="Wpisz imie/nazwisko pracownika (np. Kowalski)"/>
                </div>
            )
        case 'nameOfInstitution':
            return (
                <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    <label style={{marginTop: '3rem', marginBottom: '3rem'}}> Nazwa placówki </label> <br/>
                    <input onChange={props.handleChange} type="text" name="nameOfInstitution" id="nameOfInstitution" placeholder="Wpisz nazwe placówki (nie musi być pełna)"/>
                </div>
            )
        case 'nameOfProgram':
            return (
                <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    <label style={{marginTop: '3rem', marginBottom: '3rem'}}> Nazwa programu </label> <br/>
                    <input onChange={props.handleChange}  type="text" name="nameOfProgram" id="nameOfProgram" placeholder="Wpisz nazwe programu (nie musi być pełna)"/>
                </div>
            )
        case 'typeOfProgram':
            return (
                <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    <label style={{marginTop: '3rem', marginBottom: '3rem'}}> Typ programu </label> <br/>
                    <input onChange={props.handleChange} type="text" name="typeOfProgram" id="typeOfProgram" placeholder="Wpisz nazwe rodzaju programu (nie musi być pełna)"/>
                </div>
            )
        case 'howManyParticipiants':
            return (
                <div style={{display: 'flex'}}>
                    <div style={{display: 'flex', flexDirection: 'column', ustifyContent: 'center', alignItems: 'center'}}>
                        <label htmlFor="firstParticipiants">
                            Zakres liczby uczestników początkowy
                        </label>
                        <input onChange={props.handleChange} placeholder="Zakres początkowy.." type="number" name="firstParticipiants" id="firstParticipiants" />    
                    </div>
                    <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                    <label htmlFor="secondParticipiants">
                        Zakres liczby uczestników końcowy
                    </label>
                    <input onChange={props.handleChange} placeholder="Zakres końcowy.." type="number" name="secondParticipiants" id="secondParticipiants"/>
                    </div>
                </div>
            )
        case 'howManyPrograms':
            return (
                <div style={{display: 'flex'}}>
                    <div style={{display: 'flex', flexDirection: 'column', ustifyContent: 'center', alignItems: 'center'}}>
                        <label htmlFor="firstPrograms">
                            Zakres liczby programów początkowy
                        </label>
                        <input onChange={props.handleChange} placeholder="Zakres początkowy.." type="number" name="firstPrograms" id="firstPrograms" />    
                    </div>
                    <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                    <label htmlFor="secondPrograms">
                        Zakres liczby programów końcowy
                    </label>
                    <input onChange={props.handleChange} placeholder="Zakres końcowy.." type="number" name="secondPrograms" id="secondPrograms"/>
                    </div>
                </div>
            )
        case 'differentNameProgram':
            return (
                <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    <label style={{marginTop: '3rem', marginBottom: '3rem'}}> Inna nazwa programu </label> <br/>
                    <input onChange={props.handleChange} type="text" name="differentNameProgram" id="differentNameProgram" placeholder="Wpisz inną nazwe programu (nie musi być pełna)"/>
                </div>
            )
        default:
            return 'Wybierz co wyszukać..'
    }
}

const InnerWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: auto;
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
    margin-top: 1rem;

    label {
        font-size: 1.5rem;
    }

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


export default SearchPage;