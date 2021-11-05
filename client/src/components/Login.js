import React, { useState } from "react";
import styled from "styled-components";
import { loginUser } from "../middlewares/auth";

const Login = () => {

    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [loginError, setLoginError] = useState(false);

    const handleChange = e => {
        switch(e.target.name) {
            case 'login':
                setLogin(e.target.value);
                break;
            case 'password':
                setPassword(e.target.value);
                break;
            default:
                console.log('handle change');
        }

    }

    const handleSubmit = async e => {
        e.preventDefault();
        const loggedIn = await loginUser(login, password);
        if(loggedIn) {
            window.location.reload();
        } else {
            setLoginError(true);
        }
    }

    return (
    <OuterWrapper>
        <h1>PPP Wodzisław Śląski</h1>
        <h2>Badania terenowe</h2>
        {loginError ? <ErrorHandler>Niepoprawny login/hasło!</ErrorHandler> : ''}
        <input type="text" name="login" id="login" onChange={handleChange} placeholder="Wpisz swój login.."/>
        <input type="password" name="password" id="password" onChange={handleChange} placeholder="Wpisz swoje hasło.."/>
        <input type="submit" name="submit" id="submit" onClick={handleSubmit} value="Zaloguj się"/>
    </OuterWrapper>
)}

const ErrorHandler = styled.div`
    width: 12rem;
    height: 1rem;
    padding: 1rem;
    display: flex;
    border-radius: 10px;
    justify-content: center;
    align-items: center;
    background-color: #e74c3c;
    color: white;
`

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
        transition: ease-in-out 0.2s all;
    }

    input[type="text"]:focus, input[type="password"]:focus {
        transform: scale(1.05,1.05);
        color: #009400;
        box-shadow: 3px 3px 3px 0.2px #009400;

    }

    input[type="submit"] {
        background: black;
        color: white;
        width: 5rem;
        height: 2rem;
    }
`

export default Login;