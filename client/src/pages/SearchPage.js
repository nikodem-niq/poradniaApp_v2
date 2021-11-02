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
    const [searchFor, setSearchFor] = useState('');

    const handleChange = event => {
        const { name,value, selectedOptions } = event.target;
        console.log(selectedOptions[0].value);
    }

    return (
        <OuterWrapper>
            <Navbar/>
            <InnerWrapper>
                <Form>
                    <label>Co chcesz wyszukać?</label>
                    <select name="searchOptions" onChange={handleChange}>
                        <option >-- Wybierz opcje wyszukiwania --</option>
                        <option>Data wizyty</option>
                        <option>Dane pracowników</option>
                    </select>
                </Form>
                <TableData whichTable="events" eventData={eventData} programsData={programsData} employeeData={employeeData} institutionData={institutionData}/>
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