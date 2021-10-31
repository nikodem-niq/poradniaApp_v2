import React, { useState } from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import { postData } from "../middlewares/postData";
import { OuterWrapper } from "../components/OuterWrapper";



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
    }

    const isFormValid = () =>{
        return  firstName != '';
    }

    return(
        <OuterWrapper>
            <Navbar/>
            <InnerWrapper>
                <Form>
                    <h1>Formularz dodania nowego pracownika TEST</h1>
                    <h1>test</h1>
                    <input type="text" onChange={handleChange} name="firstName" id="firstName" placeholder="Imię pracownika.."/>
                    <input type="text" onChange={handleChange} name="secondName" id="secondName" placeholder="Drugie imię pracownika.."/>
                    <input type="text" onChange={handleChange} name="lastName" id="lastName" placeholder="Nazwisko.."/>
                    <input type="number" onChange={handleChange} name="age" id="age" placeholder="Wiek"/>
                    <AddButton to="#" onClick={() => {postData("/postData/employee-add",{firstName, secondName, lastName, age})}}>Dodaj</AddButton>
                    
                </Form>
            </InnerWrapper>
        </OuterWrapper>
    )
}

const InnerWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: auto;
    width: 100%;
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


export default AddEmployee;