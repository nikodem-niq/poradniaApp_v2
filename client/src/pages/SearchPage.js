import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import { OuterWrapper } from "../components/OuterWrapper";
import TableData from "../components/TableData";
import { postData } from "../middlewares/postData";

// let classesArray = new Array(24).fill(false);
const endpoints = [
    '/fetchData/institution-get',
    '/fetchData/employee-get',
    '/fetchData/programs-get',
    '/fetchData/events-get'
]

const SearchPage = () => {

    // Fetching
    const [eventData, setEventData] = useState([]);
    const [institutionData, setInstitutionData] = useState([]);
    const [employeeData, setEmployeeData] = useState([]);
    const [programsData, setProgramsData] = useState([]);

    useEffect(() => {

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
    const [community, setCommunity] = useState('');
    const [nameOfProgram, setNameOfProgram] = useState('');
    const [typeOfProgram, setTypeOfProgram] = useState('');
    const [firstParticipiants, setFirstParticipiants] = useState(0);
    const [secondParticipiants, setSecondParticipiants] = useState(0);
    const [firstPrograms, setFirstPrograms] = useState(0);
    const [secondPrograms, setSecondPrograms] = useState(0);
    const [differentNameProgram, setDifferentNameProgram] = useState('');
    const [classes, setClasses] = useState([]);

    
    // const handleCheckBox = (event) => {
    //     const { value, checked } = event.target;
    //     if(checked) {
    //         classesArray[value] = true;
    //     } else {
    //         classesArray[value] = false;
    //     }
    //     setClasses(classesArray.join(','));
    // }

    const handleChange = event => {
        event.preventDefault();
        const { name,value } = event.target;
        if(name === 'firstDate') {
            setFirstDate(value);
        } else if(name === 'secondDate') {
            setSecondDate(value);
        } else if(name === 'employees') {
            setEmployees(value);
        } else if(name === 'nameOfInstitution') {
            setNameOfInstitution(value);
        } else if(name === 'community') {
            setCommunity(value);
        } else if(name === 'nameOfProgram') {
            setNameOfProgram(value);
        } else if(name === 'typeOfProgram') {
            setTypeOfProgram(value);
        } else if(name === 'firstParticipiants') {
            setFirstParticipiants(value);
        } else if(name === 'secondParticipiants') {
            setSecondParticipiants(value);
        } else if(name === 'firstPrograms') {
            setFirstPrograms(value);
        } else if(name === 'secondPrograms') {
            setSecondPrograms(value);
        } else if(name === 'differentNameProgram') {
            setDifferentNameProgram(value);
        }
    }

    const handleSearch = () => {
        postData('/postData/search',{firstDate,secondDate,employees,nameOfInstitution,community,nameOfProgram,typeOfProgram,firstParticipiants,secondParticipiants,firstPrograms,secondPrograms,differentNameProgram, classes}, setEventData, false);
    }

    const handleReset = () => {
            document.getElementById('searchForm').reset();
            setFirstDate('');
            setSecondDate('');
            setEmployees('');
            setNameOfInstitution('');
            setCommunity('');
            setNameOfProgram('');
            setTypeOfProgram('');
            setFirstParticipiants(0);
            setSecondParticipiants(0);
            setFirstPrograms(0);
            setSecondPrograms(0);
            setDifferentNameProgram('');
            setClasses([]);
            // classesArray = new Array(24).fill(false);
            axios.all(endpoints.map((endpoint) => axios.get(endpoint, {headers: { 'x-access-token' : localStorage.getItem('userToken') }}))).then(
                axios.spread(( institution, employee, programs, events ) => {
                    setInstitutionData(institution.data.rows);
                    setEmployeeData(employee.data.rows);
                    setProgramsData(programs.data.rows);
                    setEventData(events.data.rows);
                })
              );
        }


    return (
        <OuterWrapper>
            <Navbar/>
            <InnerWrapper>
                <Form id="searchForm">
                    <label style={{marginTop: '1rem'}}>Wyszukiwanie <p style={{marginTop: '1rem', color: 'red'}}>(jeśli pole nie jest wymagane <b>ZOSTAW PUSTE!</b>)</p></label>
                    <FormItem what="dateOfEvent" handleChange={handleChange}/>
                    <FormItem what="employees" handleChange={handleChange}/>
                    <FormItem what="nameOfInstitution" handleChange={handleChange}/>
                    <FormItem what="community" handleChange={handleChange}/>
                    <FormItem what="nameOfProgram" handleChange={handleChange}/>
                    <FormItem what="typeOfProgram" handleChange={handleChange}/>
                    <FormItem what="howManyParticipiants" handleChange={handleChange}/>
                    <FormItem what="howManyPrograms" handleChange={handleChange}/>
                    <FormItem what="differentNameProgram" handleChange={handleChange}/>
                    {/* <FormItem what="classes" handleCheckBox={handleCheckBox}/> */}
                    <div style={{display: 'flex'}}>
                    <AddButton style={{margin: '1rem'}} to="#" onClick={handleSearch}>Szukaj</AddButton>
                    <AddButton style={{margin: '1rem'}} to="#" onClick={handleReset}>Resetuj wyniki</AddButton>
                    </div>
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
                    {/* <label style={{marginTop: '3rem', marginBottom: '3rem'}}> Zakres dat </label> <br/> */}
                </div>
                <div style={{display: 'flex'}}>
                    <div style={{display: 'flex', flexDirection: 'column', ustifyContent: 'center', alignItems: 'center'}}>
                        <label htmlFor="firstDate" style={{marginTop: '5rem'}}>
                            Zakres daty początkowy
                        </label>
                        <input onChange={props.handleChange} type="date" name="firstDate" id="firstDate" required />    
                    </div>
                    <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                    <label htmlFor="secondDate" style={{marginTop: '5rem'}}>
                        Zakres daty końcowy
                    </label>
                    <input onChange={props.handleChange} type="date" name="secondDate" id="secondDate" required/>
                    </div>
                </div>
                </div>
            )
        case 'employees':
            return (
                <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    {/* <label style={{marginTop: '3rem', marginBottom: '3rem'}}> Dane pracownika </label> <br/> */}
                    <input onChange={props.handleChange} type="text" name="employees" id="employees" placeholder="Wpisz imie/nazwisko pracownika (np. Kowalski)"/>
                </div>
            )
        case 'nameOfInstitution':
            return (
                <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    {/* <label style={{marginTop: '3rem', marginBottom: '3rem'}}> Nazwa placówki </label> <br/> */}
                    <input onChange={props.handleChange} type="text" name="nameOfInstitution" id="nameOfInstitution" placeholder="Wpisz nazwe placówki (nie musi być pełna)"/>
                </div>
            )
        case 'community':
            return (
                <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    {/* <label style={{marginTop: '3rem', marginBottom: '3rem'}}> Gmina </label> <br/> */}
                    <input onChange={props.handleChange}  type="text" name="community" id="community" placeholder="Wpisz gmine (nie musi być pełna)"/>
                </div>
            )
        case 'nameOfProgram':
            return (
                <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    {/* <label style={{marginTop: '3rem', marginBottom: '3rem'}}> Nazwa programu </label> <br/> */}
                    <input onChange={props.handleChange}  type="text" name="nameOfProgram" id="nameOfProgram" placeholder="Wpisz nazwe programu (nie musi być pełna)"/>
                </div>
            )
        case 'typeOfProgram':
            return (
                <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    {/* <label style={{marginTop: '3rem', marginBottom: '3rem'}}> Typ programu </label> <br/> */}
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
                    {/* <label style={{marginTop: '3rem', marginBottom: '3rem'}}> Inna nazwa programu </label> <br/> */}
                    <input onChange={props.handleChange} type="text" name="differentNameProgram" id="differentNameProgram" placeholder="Wpisz inną nazwe programu (nie musi być pełna)"/>
                </div>
            )
        // case 'classes':
        //     return (
        //         <div id="checkboxDiv">
        //         <div style={{display: 'flex', alignContent: 'center'}}>
        //             <h3>Podstawa</h3>
        //             <div>
        //                 <label for="beforeSchool1">Rok zycia 0-3</label>
        //                 <input type="checkbox" id="beforeSchool1" name="beforeSchool1" value="0" onChange={props.handleCheckBox}/>
        //             </div>
        //             <div>
        //                 <label for="beforeSchool2">PP (Przedszkole)</label>
        //                 <input type="checkbox" id="beforeSchool2" name="beforeSchool2" value="1" onChange={props.handleCheckBox}/>
        //             </div>
        //             <div>
        //                 <label for="class1">Klasa 1</label>
        //                 <input type="checkbox" id="class1" name="class1" value="2" onChange={props.handleCheckBox}/>
        //             </div>

        //             <div>
        //                 <label for="class2">Klasa 2</label>
        //                 <input type="checkbox" id="class2" name="class2" value="3" onChange={props.handleCheckBox}/>
        //             </div>

        //             <div>
        //                 <label for="class3">Klasa 3</label>
        //                 <input type="checkbox" id="class3" name="class3" value="4" onChange={props.handleCheckBox}/>
        //             </div>

        //             <div>
        //                 <label for="class4">Klasa 4</label>
        //                 <input type="checkbox" id="class4" name="class4" value="5" onChange={props.handleCheckBox}/>
        //             </div>

        //             <div>
        //                 <label for="class5">Klasa 5</label>
        //                 <input type="checkbox" id="class5" name="class5" value="6" onChange={props.handleCheckBox}/>
        //             </div>

        //             <div>
        //                 <label for="class6">Klasa 6</label>
        //                 <input type="checkbox" id="class6" name="class6" value="7" onChange={props.handleCheckBox}/>
        //             </div>

        //             <div>
        //                 <label for="class7">Klasa 7</label>
        //                 <input type="checkbox" id="class7" name="class7" value="8" onChange={props.handleCheckBox}/>
        //             </div>

        //             <div>
        //                 <label for="class8">Klasa 8</label>
        //                 <input type="checkbox" id="class8" name="class8" value="9" onChange={props.handleCheckBox}/>
        //             </div>
        //         </div>
        //         {/* 
                
        //         LICEUM:
                
        //         */}
        //         <div style={{display: 'flex', alignContent: 'center'}}>
        //             <h3>Licea i technika</h3>
        //             <div>
        //                 <label for="class9">Klasa 1 (liceum)</label>
        //                 <input type="checkbox" id="class9" name="class9" value="10" onChange={props.handleCheckBox}/>
        //             </div>

        //             <div>
        //                 <label for="class10">Klasa 2 (liceum)</label>
        //                 <input type="checkbox" id="class10" name="class10" value="11" onChange={props.handleCheckBox}/>
        //             </div>

        //             <div>
        //                 <label for="class11">Klasa 3 (liceum)</label>
        //                 <input type="checkbox" id="class11" name="class11" value="12" onChange={props.handleCheckBox}/>
        //             </div>

        //             <div>
        //                 <label for="class12">Klasa 4 (liceum)</label>
        //                 <input type="checkbox" id="class12" name="class12" value="13" onChange={props.handleCheckBox}/>
        //             </div>

        //          {/* 
                 
        //         Technikum
                 
        //          */}

        //             <div>
        //                 <label for="class13">Klasa 1 (technikum)</label>
        //                 <input type="checkbox" id="class13" name="class13" value="14" onChange={props.handleCheckBox}/>
        //             </div>                         
        //             <div>
        //                 <label for="class14">Klasa 2 (technikum)</label>
        //                 <input type="checkbox" id="class14" name="class14" value="15" onChange={props.handleCheckBox}/>
        //             </div>                         
        //             <div>
        //                 <label for="class15">Klasa 3 (technikum)</label>
        //                 <input type="checkbox" id="class15" name="class15" value="16" onChange={props.handleCheckBox}/>
        //             </div>                         
        //             <div>
        //                 <label for="class16">Klasa 4 (technikum)</label>
        //                 <input type="checkbox" id="class16" name="class16" value="17" onChange={props.handleCheckBox}/>
        //             </div>                         
        //             <div>
        //                 <label for="class17">Klasa 5 (technikum)</label>
        //                 <input type="checkbox" id="class17" name="class17" value="18" onChange={props.handleCheckBox}/>
        //             </div>                         
        //         </div>

        //         {/* 
                
        //         BRANZOWE SZKOLY
                
        //         */}

        //         <div style={{display: 'flex', alignContent: 'center'}}>
        //             <h3>Klasy branzowe</h3>
        //             <div>
        //                 <label for="class18">Klasa 1, I stopień(branzowa)</label>
        //                 <input type="checkbox" id="class18" name="class18" value="19" onChange={props.handleCheckBox}/>
        //             </div>

        //             <div>
        //                 <label for="class19">Klasa 2, I stopień(branzowa)</label>
        //                 <input type="checkbox" id="class19" name="class19" value="20" onChange={props.handleCheckBox}/>
        //             </div>

        //             <div>
        //                 <label for="class20">Klasa 3, I stopień(branzowa)</label>
        //                 <input type="checkbox" id="class20" name="class20" value="21" onChange={props.handleCheckBox}/>
        //             </div>

        //             <div>
        //                 <label for="class21">Klasa 1, II stopień (branzowa)</label>
        //                 <input type="checkbox" id="class21" name="class21" value="22" onChange={props.handleCheckBox}/>
        //             </div>

        //             <div>
        //                 <label for="class22">Klasa 2, II stopień (branzowa)</label>
        //                 <input type="checkbox" id="class22" name="class22" value="23" onChange={props.handleCheckBox}/>
        //             </div>
        //         </div>
        //     </div>
        //     )
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

    #checkboxDiv {
        input {
            width: 1rem;
        }

        input[type='checkbox'] {
            padding: 0;
            margin: 0.5rem 0.5rem;
        }

        display: flex;

        div {
            width: 100%;
            margin: 0 2rem;
            height: auto;
            display: flex;
            flex-direction: column;
            /* justify-content: flex-start; */
            /* align-items: center; */
            font-size: 0.9rem;
        }
    }

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