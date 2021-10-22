import styled from "styled-components";
import { logoutUser } from "../middlewares/auth";

const Navbar = (props) => {
    return(
        <NavWrapper>
            <h5 onClick={() => {logoutUser('/login')}}>logout</h5>
            <h1 onClick={() => {window.location.href = '/input-dashboard'}}>test</h1>
        </NavWrapper>
    )
}

const NavWrapper = styled.nav`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    position: relative;
    height: 100vh;
    background-color: black;
    color: white;
    width: 5rem;

`

export default Navbar;