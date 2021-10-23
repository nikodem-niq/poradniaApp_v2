import React, { useState } from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import { postInstitution } from "../middlewares/postData";


const AddInstitution = props => {

    const [nameOfInstitution, setNameOfInstitution] = useState("");
    const [email, setEmail] = useState("");
    const [city, setCity] = useState("");
    const [postalCode, setPostalCode] = useState("");
    const [community, setCommunity] = useState("");
    const [address, setAddress] = useState("");
    const [telephone, setTelephone] = useState("");
    const [fax, setFax] = useState("");

    const handleChange = (event) => {
        const { value, name } = event.target;
        switch(name) {
            case 'nameOfInstitution' : 
                setNameOfInstitution(value);
                break;
            case 'email' :
                setEmail(value);
                break;
            case 'city' : 
                setCity(value);
                break;
            case 'postalCode' :
                setPostalCode(value);
                break;
            case 'community' :
                setCommunity(value);
                break;
            case 'address' :
                setAddress(value);
                break;
            case 'telephone' :
                setTelephone(value);
                break;
            case 'fax' :
                setFax(value);
                break;
            default:
                console.log('bad selector - handle change');
                break;
        }
        // console.log({nameOfInstitution,email,city,postalCode,address,telephone,fax})
    }

    return(
        <OuterWrapper>
            <Navbar/>
            <InnerWrapper>
                <Form>
                    <h1>Formularz dodania nowej placówki</h1>
                    <input type="text" onChange={handleChange} name="nameOfInstitution" id="nameOfInstitution" placeholder="Nazwa placówki.."/>
                    <input type="text" onChange={handleChange} name="email" id="email" placeholder="Email placówki.."/>
                    <div>
                        <input type="text" onChange={handleChange} name="city" id="city" placeholder="Miejscowość.."/>
                        <input type="text" onChange={handleChange} name="postalCode" id="postalCode" placeholder="Kod pocztowy.."/>
                    </div>
                    <input type="text" onChange={handleChange} name="community" id="community" placeholder="Gmina.."/>
                    <input type="text" onChange={handleChange} name="address" id="address" placeholder="Adres placówki.."/>
                    <input type="text" onChange={handleChange} name="telephone" id="telephone" placeholder="Telefon placówki.."/>
                    <input type="text" onChange={handleChange} name="fax" id="fax" placeholder="FAX placówki.."/>
                    <AddButton to="#" onClick={() => {postInstitution({nameOfInstitution, email, city, postalCode, community, address, telephone, fax})}}>Dodaj</AddButton>
                    
                </Form>
            </InnerWrapper>
        </OuterWrapper>
    )
}

const OuterWrapper = styled.div`
    display: flex;
    height: auto;
    width: 100%;
`

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

    #city {
        width: 12rem;
        margin: 0;
    }

    #city::placeholder {
        font-size: 0.8rem;
    }

    #postalCode {
        width: 8rem;
        margin: 2rem 0 2rem 1rem;
    }

    #postalCode::placeholder {
        font-size: 0.8rem;
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


export default AddInstitution;