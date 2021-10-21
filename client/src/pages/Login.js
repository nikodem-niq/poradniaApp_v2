import React, { useState } from "react";
import styled from "styled-components";
import axios from 'axios';

const Login = () => {

    const [state, setState] = useState({
        login: "",
        password: ""
    });

    const handleChange = e => {
        const { name, value } = e.target;
        setState({
            ...setState,
            [name] : value
        })
    }

    const handleSubmit = e => {
        e.preventDefault();
        axios.get('/fetchData/test').then(res => {
            console.log(res.data)
        });

    }

    return (
    <OuterWrapper>
        <h1>PPP Wodzisław Śląski</h1>
        <h2>Badania terenowe</h2>
        <input type="text" name="login" id="login" onChange={handleChange} placeholder="Wpisz swój login.."/>
        <input type="password" name="password" id="password" onChange={handleChange} placeholder="Wpisz swoje hasło.."/>
        <input type="submit" name="submit" id="submit" onClick={handleSubmit} value="Zaloguj się"/>
    </OuterWrapper>
)}

const OuterWrapper = styled.form`
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    input {
        width: 10rem;
        height: 2rem;
        padding: 0.5rem;
        margin: 1rem;
        border-radius: 4px;
        border: black solid 0.2px;
        box-shadow: 3px 3px 3px 0.2px gray;
    }

    input[type="submit"] {
        background: black;
        color: white;
        width: 5rem;
        height: 2rem;
    }
`

export default Login;