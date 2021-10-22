import styled from "styled-components";
import { logoutUser } from "../middlewares/auth";

const InputDashboard = () => {
    return (
        <h1 onClick={() => { logoutUser('/login') }}>wyloguj</h1>
    )
}

export default InputDashboard;