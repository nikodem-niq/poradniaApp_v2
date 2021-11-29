import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import { OuterWrapper } from "../components/OuterWrapper";
// import TableData from "../components/TableData";
import { postData } from "../middlewares/postData";
import ModalComponent from "../components/ModalComponent";
import { ErrorBox } from "../components/InputErrorBox";
import { validate } from "../middlewares/validate";
import { editItem } from "../middlewares/updateData"
import { removeItem } from "../middlewares/updateData"
import { DataButton } from "../components/ControllerBlock"
import FadingBalls from "react-cssfx-loading/lib/FadingBalls";


import { DataGrid, plPL, GridToolbar } from '@mui/x-data-grid';
import { defineForWho } from '../middlewares/defineForWho';


const employeesNames = [];
let classesArray = new Array(25).fill(false);

const FetchEvents = props => {
    const [isLoading, setLoading] = useState(true);
    // Posting
    const [dateOfEvent, setDateOfEvent] = useState("");
    const [employees, setEmployee] = useState("");
    const [institutionId, setInstitutionId] = useState("");
    const [programId, setProgramId] = useState("");
    const [forWho, setForWho] = useState("");
    const [classes, setClasses] = useState("");
    const [howManyParticipiants, setHowManyParticipiants] = useState("");
    const [howManyPrograms, setHowManyPrograms] = useState("");
    const [differentNameProgram, setDifferentNameProgram] = useState("");

    const [employeeCount, setEmployeeCount] = useState(0);

    const [ifReload, setReload] = useState(false);
    const [areCheckboxesVisible, setCheckboxesVisible] = useState(false); // FOR DEV ONLY

    const [errors, setErrors] = useState({
        dateOfEvent : '',
        howManyParticipiants : '',
        howManyPrograms : '',
    })

    const [currentlyEdited, setCurrentlyEdited] = useState('');
    const [dataToEdit, setDataToEdit] = useState([]);




    const handleChange = (event) => {
        validate(event.target.name,event.target.value,errors,setErrors)
        if(event.target.name === 'employeeId') {
            employeesNames.push(event.target.value);
            const uniqueNames = Array.from(new Set(employeesNames)).join(', ');
            setEmployee(uniqueNames);
        } else if(event.target.name === 'dateOfEvent') {
            setDateOfEvent(event.target.value.toString())
        } else if(event.target.name === 'institutionId') {
            setInstitutionId(event.target.selectedOptions[0].getAttribute('data-id'))
        } else if(event.target.name === 'programsId') {
            setProgramId(event.target.selectedOptions[0].getAttribute('data-id'))
        } else if(event.target.name === 'forWho') { 
            if(event.target.value === 'uczniowie') {
                setForWho(0);
                setCheckboxesVisible(true);
            }
            else if(event.target.value === 'rodzice') {
                setCheckboxesVisible(false);
                setForWho(1);
            }
                
            else if(event.target.value === 'nauczyciele') {
                setCheckboxesVisible(false);
                setForWho(2);
            }
        }
        else if(event.target.name === 'howManyParticipiants') {
            setHowManyParticipiants(event.target.value);
        } else if(event.target.name === 'howManyPrograms') {
            setHowManyPrograms(event.target.value);
        } else if(event.target.name === 'differentNameProgram') {
            setDifferentNameProgram(event.target.value);
        }
        else if(event.target.name === 'quantityOfWorkers') {
            if(!isNaN(parseInt(event.target.value))){
                setEmployeeCount(parseInt(event.target.value));
            }
            if(event.target.value === ''){
                setEmployeeCount(0);
            }
        }
        else if(event.target.name === 'editForm') {
            setCurrentlyEdited(event.target.value);
        }
    }

    const handleCheckBox = (event) => {
        const { value, checked } = event.target;
        if(checked) {
            classesArray[value] = true;
        } else {
            classesArray[value] = false;
        }
        setClasses(classesArray.join(','));
    }


    // Fetching
    const [eventData, setEventData] = useState([]);
    const [institutionData, setInstitutionData] = useState([]);
    const [employeeData, setEmployeeData] = useState([]);
    const [programsData, setProgramsData] = useState([]);

    const [isModal, setModal] = useState(false);

    const handleReset = () => {
        setModal(false);
        setDateOfEvent("");
        setEmployee("");
        employeesNames.splice(0,employeesNames.length);
        setInstitutionId("");
        setProgramId("");
        setHowManyParticipiants("");
        setHowManyPrograms("");
        setDifferentNameProgram("");
        setClasses([]);
        classesArray = new Array(25).fill(false);
        document.getElementById('firstOptionInstitution').disabled = false;
        document.getElementById('firstOptionProgram').disabled = false;
        document.getElementById('firstOptionEmployee').disabled = false;
        document.querySelector('form').reset();
        document.getElementById('firstOptionInstitution').disabled = true;
        document.getElementById('firstOptionProgram').disabled = true;
        document.getElementById('firstOptionEmployee').disabled = true;
    }

    useEffect(() => {

        const endpoints = [
            '/fetchData/institution-get',
            '/fetchData/employee-get',
            '/fetchData/programs-get',
            '/fetchData/events-get'
        ]



        axios.all(endpoints.map((endpoint) => axios.get(endpoint, {headers: { 'x-access-token' : localStorage.getItem('userToken') }}))).then(
            axios.spread(( institution, employee, programs, events ) => {
                setLoading(true);
                setInstitutionData(institution.data.rows);
                setEmployeeData(employee.data.rows);
                setProgramsData(programs.data.rows);
                events.data.rows.map((row, i) => {
                    row['id'] = i+1;
                    row['definedForWho'] = defineForWho(row.forWho, row.classes)
                    row['institutionName'] = institution.data.rows.filter((el) => {
                        return el.idInstitution === row.institutionId;
                    })[0].name
                    row['institutionCommunity'] = institution.data.rows.filter((el) => {
                        return el.idInstitution === row.institutionId;
                    })[0].community
                    row['programName'] = programs.data.rows.filter((el) => {
                        return el.idProgram === row.programId;
                    })[0].name
                    row['programType'] = programs.data.rows.filter((el) => {
                        return el.idProgram === row.programId;
                    })[0].typeOfProgram
                })
                setEventData(events.data.rows);
                setLoading(false);
            })
          );


        setReload(false);
    }, [props.edit, ifReload])

    const columns = [
        { field: "id", headerName: "Lp", width: 80 },
        {
          field: "dateOfEvent",
          headerName: "Data wizyty",
          width: 100,
        },
        { field: "employees", headerName: "Dane pracowników", minWidth: 400, },
        { field: "institutionName", headerName: "Nazwa szkoły", width: 300 },
        { field: "institutionCommunity", headerName: "Gmina", width: 150 },
        { field: "programName", headerName: "Nazwa zajęć", width: 150 },
        { field: "programType", headerName: "Rodzaj zajęć", minWidth: 300 },
        { field: "definedForWho", headerName: "Dla kogo", width: 350 },
        { field: "howManyParticipiants", headerName: "Liczba uczestników", width: 90 },
        { field: "howManyPrograms", headerName: "Liczba form pomocy", width: 90 },
        { field: "differentNameProgram", headerName: "Inna nazwa", width: 120 },
        {
          field: "action",
          headerName: "Action",
          width: 150,
          renderCell: (params) => {
            return (
              <>
                {/* <DataButton className="removeBtn" style={{margin: '0rem 0.3rem'}} onClick={() => {console.log(params.row.idEvent)}} width="0.5rem" height="0.3rem" fontSize="0.8rem" to="#">sprawdz params</DataButton> */}
                <DataButton className="removeBtn" style={{margin: '0rem 0.3rem'}} onClick={() => {removeItem(params.row.idEvent, 'event')}} width="0.5rem" height="0.3rem" fontSize="0.8rem" to="#">Usuń</DataButton>
                <DataButton className="updateBtn" width="0.5rem" height="0.3rem" fontSize="0.8rem" to={`/edit/event/${params.row.idEvent}`}>Edytuj</DataButton>
              </>
            );
          },
        },
      ];

    

    const isFormValid = () =>{
        let isValid = errors.dateOfEvent === '' && employees !== '' && institutionId !== '' && programId !== '' && errors.howManyParticipiants === '' && errors.howManyPrograms === ''; 
        return isValid ? '' : 'disabled';
    }

    if(isLoading) {
        return (
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'}}><FadingBalls color="#3a43cc" width="20px" height="20px" duration="2s" /></div>
        )
    } else {
  return (

        <div>
            {props.edit ?  <OuterWrapper> 
            <Navbar/>
            <InnerWrapper>
            <Form>
                    <ModalComponent setModal={isModal} name={`Wydarzenie`} handleReset={handleReset} edit={true}/>
                    <h1>Formularz edycji wydarzenia</h1>
                    <select name="editForm" id="editForm" onChange={handleChange}>
                        <option disabled selected>-- Wybierz co zmienić --</option>
                        <option value="dateOfEvent">Data</option>
                        <option value="employees">Pracownicy</option>
                        <option value="institutionId">Placowka</option>
                        <option value="programId">Program</option>
                        <option value="forWho">Dla kogo?</option>
                        <option value="howManyParticipiants">Ilu korzystających</option>
                        <option value="howManyPrograms">Ile form pomocy</option>
                        <option value="differentNameProgram">Inna nazwa</option>
                    </select>
                    {currentlyEdited === 'dateOfEvent' ? <div><label htmlFor="dateOfEvent">Data wizyty</label>                     <input type="date" onChange={handleChange} name="dateOfEvent" id="dateOfEvent" placeholder="Data wizyty.."/> </div> : ''}
                    {errors.dateOfEvent !== ''  ? <ErrorBox>{errors.dateOfEvent}</ErrorBox> : ''}
                    {currentlyEdited === 'employees' ? <input type="text" onChange={handleChange} name="quantityOfWorkers" id="quantityOfWorkers" placeholder="Ilu pracownikow w wydarzeniu?"/> : ''}

                    {currentlyEdited === 'employees' ? [...Array(parseInt(employeeCount))].map((v,i) => {
                        return <SelectEmployee i={i} employeeData={employeeData} handleChange={handleChange}/>
                    }) : ''}
                    {currentlyEdited === 'institutionId' ?                     <select name="institutionId" id="institutionId" onChange={handleChange}>
                        <option disabled selected id="firstOptionInstitution">-- Wybierz szkołe --</option>
                        {institutionData.map((el) => {
                            return <SelectItem key={el.idInstitution} id={el.idInstitution} name={el.name} community={el.community}/>
                        })}
                    </select> : ''}
                    {currentlyEdited === 'programId' ?                     <select name="programsId" id="programsId" onChange={handleChange}>
                        <option disabled selected id="firstOptionProgram">-- Wybierz program --</option>
                        {programsData.map((el) => {
                            return <SelectItem key={el.idProgram} id={el.idProgram} name={el.name}/>
                        })}
                    </select> : ''}
                    {currentlyEdited === 'forWho' ?                     <select onChange={handleChange} name="forWho" id="forWho">
                        <option disabled selected value='niepoprawna wartosc'>-- Wybierz dla kogo -- </option>
                        <option value="rodzice">rodzice</option>
                        <option value="nauczyciele">nauczyciele</option>
                        <option value="uczniowie">uczniowie</option>
                    </select> : ''}
                    {areCheckboxesVisible && currentlyEdited === 'forWho' ? 
                    <div id="checkboxDiv">
                        <div style={{display: 'flex', alignContent: 'center'}}>
                            <h3>Podstawa</h3>
                            <div>
                                <label htmlFor="beforeSchool1">Rok zycia 0-3</label>
                                <input type="checkbox" id="beforeSchool1" name="beforeSchool1" value="0" onChange={handleCheckBox}/>
                            </div>
                            <div>
                                <label htmlFor="beforeSchool2">PP (Przedszkole)</label>
                                <input type="checkbox" id="beforeSchool2" name="beforeSchool2" value="1" onChange={handleCheckBox}/>
                            </div>
                            <div>
                                <label htmlFor="beforeSchool3">Rok zycia 6</label>
                                <input type="checkbox" id="beforeSchool3" name="beforeSchool3" value="2" onChange={handleCheckBox}/>
                            </div>
                            <div>
                                <label htmlFor="class1">Klasa 1</label>
                                <input type="checkbox" id="class1" name="class1" value="3" onChange={handleCheckBox}/>
                            </div>

                            <div>
                                <label htmlFor="class2">Klasa 2</label>
                                <input type="checkbox" id="class2" name="class2" value="4" onChange={handleCheckBox}/>
                            </div>

                            <div>
                                <label htmlFor="class3">Klasa 3</label>
                                <input type="checkbox" id="class3" name="class3" value="5" onChange={handleCheckBox}/>
                            </div>

                            <div>
                                <label htmlFor="class4">Klasa 4</label>
                                <input type="checkbox" id="class4" name="class4" value="6" onChange={handleCheckBox}/>
                            </div>

                            <div>
                                <label htmlFor="class5">Klasa 5</label>
                                <input type="checkbox" id="class5" name="class5" value="7" onChange={handleCheckBox}/>
                            </div>

                            <div>
                                <label htmlFor="class6">Klasa 6</label>
                                <input type="checkbox" id="class6" name="class6" value="8" onChange={handleCheckBox}/>
                            </div>

                            <div>
                                <label htmlFor="class7">Klasa 7</label>
                                <input type="checkbox" id="class7" name="class7" value="9" onChange={handleCheckBox}/>
                            </div>

                            <div>
                                <label htmlFor="class8">Klasa 8</label>
                                <input type="checkbox" id="class8" name="class8" value="10" onChange={handleCheckBox}/>
                            </div>
                        </div>
                        {/* 
                        
                        LICEUM:
                        
                        */}
                        <div style={{display: 'flex', alignContent: 'center'}}>
                            <h3>Licea i technika</h3>
                            <div>
                                <label htmlFor="class9">Klasa 1 (liceum)</label>
                                <input type="checkbox" id="class9" name="class9" value="11" onChange={handleCheckBox}/>
                            </div>

                            <div>
                                <label htmlFor="class10">Klasa 2 (liceum)</label>
                                <input type="checkbox" id="class10" name="class10" value="12" onChange={handleCheckBox}/>
                            </div>

                            <div>
                                <label htmlFor="class11">Klasa 3 (liceum)</label>
                                <input type="checkbox" id="class11" name="class11" value="13" onChange={handleCheckBox}/>
                            </div>

                            <div>
                                <label htmlFor="class12">Klasa 4 (liceum)</label>
                                <input type="checkbox" id="class12" name="class12" value="14" onChange={handleCheckBox}/>
                            </div>

                         {/* 
                         
                        Technikum
                         
                         */}

                            <div>
                                <label htmlFor="class13">Klasa 1 (technikum)</label>
                                <input type="checkbox" id="class13" name="class13" value="15" onChange={handleCheckBox}/>
                            </div>                         
                            <div>
                                <label htmlFor="class14">Klasa 2 (technikum)</label>
                                <input type="checkbox" id="class14" name="class14" value="16" onChange={handleCheckBox}/>
                            </div>                         
                            <div>
                                <label htmlFor="class15">Klasa 3 (technikum)</label>
                                <input type="checkbox" id="class15" name="class15" value="17" onChange={handleCheckBox}/>
                            </div>                         
                            <div>
                                <label htmlFor="class16">Klasa 4 (technikum)</label>
                                <input type="checkbox" id="class16" name="class16" value="18" onChange={handleCheckBox}/>
                            </div>                         
                            <div>
                                <label htmlFor="class17">Klasa 5 (technikum)</label>
                                <input type="checkbox" id="class17" name="class17" value="19" onChange={handleCheckBox}/>
                            </div>                         
                        </div>

                        {/* 
                        
                        BRANZOWE SZKOLY
                        
                        */}

                        <div style={{display: 'flex', alignContent: 'center'}}>
                            <h3>Klasy branzowe</h3>
                            <div>
                                <label htmlFor="class18">Klasa 1, I stopień(branzowa)</label>
                                <input type="checkbox" id="class18" name="class18" value="20" onChange={handleCheckBox}/>
                            </div>

                            <div>
                                <label htmlFor="class19">Klasa 2, I stopień(branzowa)</label>
                                <input type="checkbox" id="class19" name="class19" value="21" onChange={handleCheckBox}/>
                            </div>

                            <div>
                                <label htmlFor="class20">Klasa 3, I stopień(branzowa)</label>
                                <input type="checkbox" id="class20" name="class20" value="22" onChange={handleCheckBox}/>
                            </div>

                            <div>
                                <label htmlFor="class21">Klasa 1, II stopień (branzowa)</label>
                                <input type="checkbox" id="class21" name="class21" value="23" onChange={handleCheckBox}/>
                            </div>

                            <div>
                                <label htmlFor="class22">Klasa 2, II stopień (branzowa)</label>
                                <input type="checkbox" id="class22" name="class22" value="24" onChange={handleCheckBox}/>
                            </div>
                        </div>
                    </div>
                    : ""}                                        
                    {/* <input type="text" onChange={handleChange} name="typeOfProgram" id="typeOfProgram" placeholder="Rodzaj zajęć.."/> */}
                    {currentlyEdited === 'howManyParticipiants' ? <input type="number" onChange={handleChange} name="howManyParticipiants" id="howManyParticipiants" placeholder="Ilu uczestników.."/> : ''}
                    {errors.howManyParticipiants !== ''  ? <ErrorBox>{errors.howManyParticipiants}</ErrorBox> : ''}
                    {currentlyEdited === 'howManyPrograms' ? <input type="number" onChange={handleChange} name="howManyPrograms" id="howManyPrograms" placeholder="Ile form pomocy.."/> : ''}
                    {errors.howManyPrograms !== ''  ? <ErrorBox>{errors.howManyPrograms}</ErrorBox> : ''}
                    {currentlyEdited === 'differentNameProgram' ? <input type="text" onChange={handleChange} name="differentNameProgram" id="differentNameProgram" placeholder="Inna nazwa programu.."/> : ''}

                    <AddButton to="#" onClick={() => { editItem("/updateData/event-edit",{dateOfEvent, employees, institutionId, programId, forWho, classes, howManyParticipiants, howManyPrograms, differentNameProgram}, props.id, setModal)}} style={ {backgroundColor: '#0f81d9'}}>Edytuj</AddButton>
                    {/* {isFormValid() &&
                        <p>Wprowadz wszystkie wymagane dane!</p>
                    } */}
                </Form>
            </InnerWrapper>
        </OuterWrapper> : 
        
        // Standard Form !!!!!!!
        
        <OuterWrapper>
            <Navbar/>
            <InnerWrapper>
            <Form>
                    <ModalComponent setModal={isModal} name={`Wydarzenie w dniu: ${dateOfEvent}`} handleReset={handleReset}/>
                    <h1>Formularz dodania nowego wydarzenia</h1>
                    <label htmlFor="dateOfEvent">Data wizyty</label>
                    <input type="date" onChange={handleChange} name="dateOfEvent" id="dateOfEvent" placeholder="Data wizyty.."/>
                    {errors.dateOfEvent !== ''  ? <ErrorBox>{errors.dateOfEvent}</ErrorBox> : ''}
                    <input type="text" onChange={handleChange} name="quantityOfWorkers" id="quantityOfWorkers" placeholder="Ilu pracownikow w wydarzeniu?"/>

                    {[...Array(parseInt(employeeCount))].map((v,i) => {
                        return <SelectEmployee i={i} employeeData={employeeData} handleChange={handleChange}/>
                    })}
                    <select name="institutionId" id="institutionId" onChange={handleChange}>
                        <option disabled selected id="firstOptionInstitution">-- Wybierz szkołe --</option>
                        {institutionData.map((el) => {
                            return <SelectItem key={el.idInstitution} id={el.idInstitution} name={el.name} community={el.community}/>
                        })}
                    </select>
                    <select name="programsId" id="programsId" onChange={handleChange}>
                        <option disabled selected id="firstOptionProgram">-- Wybierz program --</option>
                        {programsData.map((el) => {
                            return <SelectItem key={el.idProgram} id={el.idProgram} name={el.name}/>
                        })}
                    </select>
                    <select onChange={handleChange} name="forWho" id="forWho">
                        <option disabled selected value='niepoprawna wartosc'>-- Wybierz dla kogo -- </option>
                        <option value="rodzice">rodzice</option>
                        <option value="nauczyciele">nauczyciele</option>
                        <option value="uczniowie">uczniowie</option>
                    </select>
                    {areCheckboxesVisible ? 
                    <div id="checkboxDiv">
                        <div style={{display: 'flex', alignContent: 'center'}}>
                            <h3>Podstawa</h3>
                            <div>
                                <label htmlFor="beforeSchool1">Rok zycia 0-3</label>
                                <input type="checkbox" id="beforeSchool1" name="beforeSchool1" value="0" onChange={handleCheckBox}/>
                            </div>
                            <div>
                                <label htmlFor="beforeSchool2">PP (Przedszkole)</label>
                                <input type="checkbox" id="beforeSchool2" name="beforeSchool2" value="1" onChange={handleCheckBox}/>
                            </div>
                            <div>
                                <label htmlFor="beforeSchool3">Rok zycia 6</label>
                                <input type="checkbox" id="beforeSchool3" name="beforeSchool3" value="2" onChange={handleCheckBox}/>
                            </div>
                            <div>
                                <label htmlFor="class1">Klasa 1</label>
                                <input type="checkbox" id="class1" name="class1" value="3" onChange={handleCheckBox}/>
                            </div>

                            <div>
                                <label htmlFor="class2">Klasa 2</label>
                                <input type="checkbox" id="class2" name="class2" value="4" onChange={handleCheckBox}/>
                            </div>

                            <div>
                                <label htmlFor="class3">Klasa 3</label>
                                <input type="checkbox" id="class3" name="class3" value="5" onChange={handleCheckBox}/>
                            </div>

                            <div>
                                <label htmlFor="class4">Klasa 4</label>
                                <input type="checkbox" id="class4" name="class4" value="6" onChange={handleCheckBox}/>
                            </div>

                            <div>
                                <label htmlFor="class5">Klasa 5</label>
                                <input type="checkbox" id="class5" name="class5" value="7" onChange={handleCheckBox}/>
                            </div>

                            <div>
                                <label htmlFor="class6">Klasa 6</label>
                                <input type="checkbox" id="class6" name="class6" value="8" onChange={handleCheckBox}/>
                            </div>

                            <div>
                                <label htmlFor="class7">Klasa 7</label>
                                <input type="checkbox" id="class7" name="class7" value="9" onChange={handleCheckBox}/>
                            </div>

                            <div>
                                <label htmlFor="class8">Klasa 8</label>
                                <input type="checkbox" id="class8" name="class8" value="10" onChange={handleCheckBox}/>
                            </div>
                        </div>
                        {/* 
                        
                        LICEUM:
                        
                        */}
                        <div style={{display: 'flex', alignContent: 'center'}}>
                            <h3>Licea i technika</h3>
                            <div>
                                <label htmlFor="class9">Klasa 1 (liceum)</label>
                                <input type="checkbox" id="class9" name="class9" value="11" onChange={handleCheckBox}/>
                            </div>

                            <div>
                                <label htmlFor="class10">Klasa 2 (liceum)</label>
                                <input type="checkbox" id="class10" name="class10" value="12" onChange={handleCheckBox}/>
                            </div>

                            <div>
                                <label htmlFor="class11">Klasa 3 (liceum)</label>
                                <input type="checkbox" id="class11" name="class11" value="13" onChange={handleCheckBox}/>
                            </div>

                            <div>
                                <label htmlFor="class12">Klasa 4 (liceum)</label>
                                <input type="checkbox" id="class12" name="class12" value="14" onChange={handleCheckBox}/>
                            </div>

                         {/* 
                         
                        Technikum
                         
                         */}

                            <div>
                                <label htmlFor="class13">Klasa 1 (technikum)</label>
                                <input type="checkbox" id="class13" name="class13" value="15" onChange={handleCheckBox}/>
                            </div>                         
                            <div>
                                <label htmlFor="class14">Klasa 2 (technikum)</label>
                                <input type="checkbox" id="class14" name="class14" value="16" onChange={handleCheckBox}/>
                            </div>                         
                            <div>
                                <label htmlFor="class15">Klasa 3 (technikum)</label>
                                <input type="checkbox" id="class15" name="class15" value="17" onChange={handleCheckBox}/>
                            </div>                         
                            <div>
                                <label htmlFor="class16">Klasa 4 (technikum)</label>
                                <input type="checkbox" id="class16" name="class16" value="18" onChange={handleCheckBox}/>
                            </div>                         
                            <div>
                                <label htmlFor="class17">Klasa 5 (technikum)</label>
                                <input type="checkbox" id="class17" name="class17" value="19" onChange={handleCheckBox}/>
                            </div>                         
                        </div>

                        {/* 
                        
                        BRANZOWE SZKOLY
                        
                        */}

                        <div style={{display: 'flex', alignContent: 'center'}}>
                            <h3>Klasy branzowe</h3>
                            <div>
                                <label htmlFor="class18">Klasa 1, I stopień(branzowa)</label>
                                <input type="checkbox" id="class18" name="class18" value="20" onChange={handleCheckBox}/>
                            </div>

                            <div>
                                <label htmlFor="class19">Klasa 2, I stopień(branzowa)</label>
                                <input type="checkbox" id="class19" name="class19" value="21" onChange={handleCheckBox}/>
                            </div>

                            <div>
                                <label htmlFor="class20">Klasa 3, I stopień(branzowa)</label>
                                <input type="checkbox" id="class20" name="class20" value="22" onChange={handleCheckBox}/>
                            </div>

                            <div>
                                <label htmlFor="class21">Klasa 1, II stopień (branzowa)</label>
                                <input type="checkbox" id="class21" name="class21" value="23" onChange={handleCheckBox}/>
                            </div>

                            <div>
                                <label htmlFor="class22">Klasa 2, II stopień (branzowa)</label>
                                <input type="checkbox" id="class22" name="class22" value="24" onChange={handleCheckBox}/>
                            </div>
                        </div>
                    </div>
                    : ""}                                        
                    {/* <input type="text" onChange={handleChange} name="typeOfProgram" id="typeOfProgram" placeholder="Rodzaj zajęć.."/> */}
                    <input type="number" onChange={handleChange} name="howManyParticipiants" id="howManyParticipiants" placeholder="Ilu uczestników.."/>
                    {errors.howManyParticipiants !== ''  ? <ErrorBox>{errors.howManyParticipiants}</ErrorBox> : ''}
                    <input type="number" onChange={handleChange} name="howManyPrograms" id="howManyPrograms" placeholder="Ile form pomocy.."/>
                    {errors.howManyPrograms !== ''  ? <ErrorBox>{errors.howManyPrograms}</ErrorBox> : ''}
                    <input type="text" onChange={handleChange} name="differentNameProgram" id="differentNameProgram" placeholder="Inna nazwa programu.."/>

                    <AddButton to="#" onClick={() => { postData("/postData/event-add",{dateOfEvent, employees, institutionId, programId, forWho, classes, howManyParticipiants, howManyPrograms, differentNameProgram}, null, setReload, setModal, true)}} style={ isFormValid() ? {backgroundColor: 'red', pointerEvents: 'none'} : {backgroundColor: 'green'}}>Dodaj</AddButton>
                    {isFormValid() &&
                        <p>Wprowadz wszystkie wymagane dane!</p>
                    }
                </Form>
                {/* <TableData whichTable="events" eventData={eventData} programsData={programsData} employeeData={employeeData} institutionData={institutionData}/> */}
                <div id="dataGridTable" style={{width: '100%', height: '800px'}}>

                    <DataGrid
                    rows={eventData}
                    disableSelectionOnClick
                    columns={columns}
                    pageSize={48}
                    isLoading={isLoading}
                    disableColumnResize={false}
                    localeText={{
                        toolbarDensity: 'Size',
                        toolbarDensityLabel: 'Size',
                        toolbarDensityCompact: 'Small',
                        toolbarDensityStandard: 'Medium',
                        toolbarDensityComfortable: 'Large',
                      }}
                      components={{
                        Toolbar: GridToolbar,
                      }}
                    // localeText={plPL.props.MuiDataGrid.localeText}
                    />
                </div>
            </InnerWrapper>
        </OuterWrapper>}
        </div>
    )}
}

const SelectItem = props => {

    return (
        <option data-id={props.id} data-community={props.community}> {props.name} {props.lastName}</option>
    )
}


const SelectEmployee = props => {
    return (<select name="employeeId" className="employeeId" onChange={props.handleChange}>
    <option disabled selected id="firstOptionEmployee">-- Wybierz pracownika nr. {props.i+1} --</option>
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


    #dataGridTable {
        font-size: 12px;
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
`


export default FetchEvents;