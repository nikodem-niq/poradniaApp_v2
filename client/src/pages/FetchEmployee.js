import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import { OuterWrapper } from "../components/OuterWrapper";
import TableData from "../components/TableData";
import { fetchData } from "../middlewares/fetchData";
import { postData } from "../middlewares/postData";
import ModalComponent from "../components/ModalComponent";
import { validate } from "../middlewares/validate";
import { ErrorBox } from "../components/InputErrorBox";



const FetchEmployee = () => {
    const [employeeData, setEmployeeData] = useState([]);
    const [isAscending, setDescending] = useState(false);
    const [ifReload, setReload] = useState(false);


    useEffect(() => {
        fetchData('/fetchData/employee-get').then(response => {
            setEmployeeData(response.data.rows)
            setReload(false);
        }).catch(err => {
            console.log(err);
        })
    }, [ifReload])

    const handleStateChange = useCallback (state => {
        setEmployeeData(state);
    }, []);

    return (
        <OuterWrapper>
            <Navbar/>
            <InnerWrapper>
                <AddEmployee ifReloadData={setReload}/>
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

// Employee add component

const AddEmployee = props => {

    const [firstName, setFirstName] = useState("");
    const [secondName, setSecondName] = useState("");
    const [lastName, setLastName] = useState("");
    const [age, setAge] = useState(0);

    const [isModal, setModal] = useState(false);
    const [errors, setErrors] = useState({
        firstName : '',
        secondName : '',
        lastName : '',
        age : '',
    })

    const handleChange = (event) => {
        const { value, name } = event.target;
        validate(name,value,errors,setErrors)
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

    const handleReset = () => {
        setModal(false);
        setFirstName("");
        setSecondName("");
        setLastName("");
        setAge("");
        document.querySelector('form').reset();
    }

    const isFormValid = () =>{
        let isValid = errors.firstName === '' && errors.lastName === '' && errors.age === '';
        return isValid ? '' : 'disabled';

    }

    return(
        <OuterWrapper>
            <Navbar/>
            <InnerWrapperTwo>
                <Form>
                    <ModalComponent setModal={isModal} name={`${firstName} ${lastName}`} handleReset={handleReset}/>
                    <h1>Formularz dodania nowego pracownika</h1>
                    <input type="text" onChange={handleChange} name="firstName" id="firstName" placeholder="Imię pracownika.."/>
                    {errors.firstName !== ''  ? <ErrorBox>{errors.firstName}</ErrorBox> : ''}
                    <input type="text" onChange={handleChange} name="secondName" id="secondName" placeholder="Drugie imię pracownika.. (nie jest konieczne)"/>
                    {errors.secondName !== ''  ? <ErrorBox>{errors.secondName}</ErrorBox> : ''}
                    <input type="text" onChange={handleChange} name="lastName" id="lastName" placeholder="Nazwisko.."/>
                    {errors.lastName !== ''  ? <ErrorBox>{errors.lastName}</ErrorBox> : ''}
                    <input type="number" onChange={handleChange} name="age" id="age" placeholder="Wiek"/>
                    {errors.age !== ''  ? <ErrorBox>{errors.age}</ErrorBox> : ''}
                    <AddButton to="#" onClick={() => {postData("/postData/employee-add",{firstName, secondName, lastName, age},null,props.ifReloadData, setModal)}} style={ isFormValid() ? {backgroundColor: 'red', pointerEvents: 'none'} : {backgroundColor: 'green'}}>Dodaj</AddButton>
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