import styled from "styled-components";
import { Link } from "react-router-dom";

const ControllerBlock = props => {
    return (
        <OuterWrapper>
            <Block>
                Placówki
                <ButtonWrapper>
                    <DataButton to="/institution-add">Dodaj</DataButton>
                    <DataButton to="/institution-get">Dane</DataButton>
                </ButtonWrapper>
            </Block>
            <Block>Pracownicy</Block>
            <Block>Programy</Block>
            <Block>Wydarzenia (wyjazd terenowy)</Block>
        </OuterWrapper>
    )
}

const OuterWrapper = styled.div`
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
`

const Block = styled.div`
    width: 25%;
    height: 15rem;
    border-radius: 20px;
    margin: 2%;
    border: solid 1px black;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
`
const DataButton = styled(Link)`
    background-color: black;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    width: 3vw;
    height: 1.2rem;
    padding: 0.8rem;
    font-size: 10px;
    border: none;
    border-radius: 10px;
`
const ButtonWrapper = styled.div`
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    width: 100%;
`

export default ControllerBlock;