import styled from "styled-components";
import ControllerBlock from "../components/ControllerBlock";
import Navbar from "../components/Navbar";

const InputDashboard = () => {
    return (
        <OuterWrapper>
            <Navbar/>
            <ControllerBlock/>
        </OuterWrapper>
    )
}

const OuterWrapper = styled.div`
    display: flex;
    height: auto;
    width: 100%;
`

export default InputDashboard;