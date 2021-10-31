import React, { useState } from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import { postData } from "../middlewares/postData";
import { OuterWrapper } from "../components/OuterWrapper";


const AddProgram = props => {

    const [name, setName] = useState("");
    const [isLocal, setIsLocal] = useState(false);
    const [forWho, setForWho] = useState(0);

    const handleChange = (event) => {
        const { value, name } = event.target;
        switch(name) {
            case 'nameOfProgram' : 
                setName(value);
                break;
            case 'isLocal' :
                if(value === 'lokalnie') setIsLocal(true);
                else setIsLocal(false);
                break;
            case 'forWho' : 
                if(value === 'uczniowie') setForWho(0);
                else if(value === 'rodzice') setForWho(1);
                else if(value === 'nauczyciele') setForWho(2);
                break;
            default:
                console.log('bad selector - handle change');
                break;
        }
    }

    return(
        <OuterWrapper>
            <Navbar/>
            <InnerWrapper>
                <Form>
                    <h1>Formularz dodania nowego programu</h1>
                    <input type="text" onChange={handleChange} name="nameOfProgram" id="nameOfProgram" placeholder="Nazwa programu.."/>
                    <select onChange={handleChange} name="isLocal" id="isLocal">
                        <option value='niepoprawna wartosc'>-- Wybierz lokalnie/teren -- </option>
                        <option value="lokalnie">lokalnie</option>
                        <option value="teren">teren</option>
                    </select>
                    <select onChange={handleChange} name="forWho" id="forWho">
                        <option value='niepoprawna wartosc'>-- Wybierz dla kogo -- </option>
                        <option value="uczniowie">uczniowie</option>
                        <option value="rodzice">rodzice</option>
                        <option value="nauczyciele">nauczyciele</option>
                    </select>
                    <AddButton to="#" onClick={() => {postData("/postData/program-add",{name, isLocal, forWho})}}>Dodaj</AddButton>
                    
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
    /* justify-content: center; */
    /* align-items: center; */
`


export default AddProgram;