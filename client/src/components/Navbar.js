import styled from "styled-components";
import { logoutUser } from "../middlewares/auth";
import logoutImg from '../img/logout.png';
import homeImg from '../img/home.png';
import { Link } from "react-router-dom";

const Navbar = (props) => {
    const handleHover = (state) => {
        const el = document.getElementById('homeModal');
        const elTwo = document.getElementById('logoutModal');
        switch(state) {
            case 1:
                el.style.display = 'flex';
                break;
            case 0:
                el.style.display = 'none';
                break;
            case 3:
                elTwo.style.display = 'flex';
                break;
            case 2:
                elTwo.style.display = 'none';
        }
    } 

    return(
        <NavWrapper>
            <Link to="/dashboard" style={{textDecoration: 'none', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                <img  src={homeImg}/>
                {/* <ImgModal id="homeModal">Strona główna</ImgModal> */}
            </Link>
            <Link to="#" onClick={() => {logoutUser('/login')}} style={{textDecoration: 'none', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                <img  src={logoutImg}/>
                {/* <ImgModal id="logoutModal">Wyloguj się</ImgModal> */}
            </Link>
        </NavWrapper>
    )
}

const ImgModal = styled.div`
    display: flex;
    margin: 0.5rem 0;
    border-radius: 10px;
    width: 4rem;
    height: 2rem;
    opacity: 0.7;
    background-color: black;
    position: relative;
    overflow: hidden;
    font-size: 0.5rem;
    justify-content: center;
    align-items: center;
    color: white;
`

const NavWrapper = styled.nav`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    background-color: #0984e3;
    color: white;
    height: 100%;
    width: 5rem;
    position: fixed;
    z-index: 1;
    top: 0;
    left: 0;
    overflow-x: hidden;

    img {
        width: 3rem;
        height: 3rem;
        transition: 0.3s all ease;
    }

    img:hover {
        transform: scale(1.2,1.2);
    }
`

export default Navbar;