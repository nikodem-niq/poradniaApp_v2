import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useState } from "react/cjs/react.development";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import { OuterWrapper } from "../components/OuterWrapper";
import TableData from "../components/TableData";
import { fetchData } from "../middlewares/fetchData";
import { postData } from "../middlewares/postData";


const FetchPrograms = () => {
    // Posting
    const [name, setName] = useState("");
    const [isLocal, setIsLocal] = useState(false);
    const [forWho, setForWho] = useState(0);
    const [classes, setClasses] = useState("");

    const [areCheckboxesVisible, setCheckboxesVisible] = useState(false);

    const handleChange = (event) => {
        const { value, name } = event.target;
        setCheckboxesVisible(false);
        switch(name) {
            case 'nameOfProgram' : 
                setName(value);
                break;
            case 'isLocal' :
                if(value === 'lokalnie') setIsLocal(true);
                else setIsLocal(false);
                break;
            case 'forWho' : 
                if(value === 'uczniowie') {
                    setForWho(0);
                    setCheckboxesVisible(true);
                }
                else if(value === 'rodzice') setForWho(1);
                else if(value === 'nauczyciele') setForWho(2);
                break;
            default:
                console.log('bad selector - handle change');
                break;
        }
    }

    const handleCheckBox = (event) => {
        // let classes = {
        //     {
        //         class: 1,
        //         isIn: false
        //     }
        // };
        const { value, name, checked } = event.target;
        if(name == 'class1' && checked) {
            console.log();
        }
    }
    // Fetching
    const [programsData, setProgramsData] = useState([]);

    useEffect(() => {
        fetchData('/fetchData/programs-get').then(response => {
            setProgramsData(response.data.rows)
        }).catch(err => {
            console.log(err);
        })
    }, [])

    let isFormValid = () =>{
        let isValid = name != ''; 
        return isValid ? '' : 'disabled';

    }

    return (
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
                    {areCheckboxesVisible ? 
                    <div id="checkboxDiv">
                        <div>
                            <label for="class1">Klasa 1</label>
                            <input type="checkbox" id="class1" name="class1" value="class1" onChange={handleCheckBox}/>
                        </div>
                        <div>
                            <label for="class2">Klasa 2</label>
                            <input type="checkbox" id="class2" name="class2"/>
                        </div>
                    </div>
                    : ""}

                    <AddButton to="#" onClick={() => {postData("/postData/program-add",{name, isLocal, forWho})}} style={ isFormValid() ? {backgroundColor: 'red', pointerEvents: 'none'} : {backgroundColor: 'green'}}>Dodaj</AddButton>
                    {isFormValid() &&
                        <p>Wprowadz wszystkie wymagane dane!</p>
                    }
                </Form>
                <TableData whichTable="programs" data={programsData}/>
            </InnerWrapper>
        </OuterWrapper>
    )
}

const InnerWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: auto;
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

    #checkboxDiv {
        input {
            width: 1rem;
        }

        display: flex;
        flex-direction: column;
        justify-content: center;
    }
`


export default FetchPrograms;