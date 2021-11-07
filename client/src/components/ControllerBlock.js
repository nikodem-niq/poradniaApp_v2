import styled from "styled-components";
import { Link } from "react-router-dom";

const ControllerBlock = props => {
    return (
        <OuterWrapper>
            <Block>
                Placówki
                <ButtonWrapper>
                    <DataButton to="/institution">Dane</DataButton>
                </ButtonWrapper>
            </Block>
            <Block>Pracownicy
                <ButtonWrapper>
                    <DataButton to="/employee">Dane</DataButton>
                </ButtonWrapper>
            </Block>
            <Block>Programy
                <ButtonWrapper>
                    <DataButton to="/programs">Dane</DataButton>
                </ButtonWrapper>
            </Block>
            <Block>Wydarzenia (wyjazd terenowy)
                <ButtonWrapper>
                    <DataButton to="/events">Dane</DataButton>
                </ButtonWrapper>
            </Block>
            <Block>Zaawansowane wyszukiwanie
                <ButtonWrapper>
                    <DataButton to="/search">Wyszukiwanie</DataButton>
                </ButtonWrapper>
            </Block>
        </OuterWrapper>
    )
}

const OuterWrapper = styled.div`
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
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
    box-shadow: black 0.06rem 0.06rem 0.2rem;
`
export const DataButton = styled(Link)`
    background-color: black;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    width: ${props => props.width ? props.width : '5rem'};
    height: ${props => props.height ? props.height : '1.5rem'};
    padding: 1rem;
    font-size: ${props => props.fontSize ? props.fontSize : '1rem'};
    border: none;
    border-radius: 10px;

`

export const DataDownloadButton = styled(Link)`
    background-color: blue;
    display: flex;
    position: relative;
    justify-content: center;
    align-items: center;
    color: white;
    width: ${props => props.width ? props.width : '5rem'};
    height: ${props => props.height ? props.height : '1.5rem'};
    padding: 1rem;
    font-size: ${props => props.fontSize ? props.fontSize : '1rem'};
    border: none;
    border-radius: 10px;
    margin: 1rem 4rem;

`

const ButtonWrapper = styled.div`
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    width: 100%;
`

export default ControllerBlock;