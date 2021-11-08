import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import { OuterWrapper } from "../components/OuterWrapper";
import TableData from "../components/TableData";
import { fetchData } from "../middlewares/fetchData";
import { postData } from "../middlewares/postData";
import ModalComponent from '../components/ModalComponent';
import { ErrorBox } from "../components/InputErrorBox";
import { validate } from "../middlewares/validate";

let classesArray = new Array(16).fill(false);

const FetchPrograms = () => {
    // Posting
    const [name, setName] = useState("");
    const [isLocal, setIsLocal] = useState(false);
    const [typeOfProgram, setTypeOfProgram] = useState("");
    const [forWho, setForWho] = useState(0);
    const [classes, setClasses] = useState([]);
    const [ifReload, setReload] = useState(false);

    const [areCheckboxesVisible, setCheckboxesVisible] = useState(false);

    const [isModal, setModal] = useState(false);
    const [errors, setErrors] = useState({
        nameOfProgram : '',

    })

    const handleChange = (event) => {
        const { value, name } = event.target;
        validate(name,value,errors,setErrors)
        switch(name) {
            case 'nameOfProgram' : 
                setName(value);
                break;
            case 'isLocal' :
                if(value === 'lokalnie') setIsLocal(true);
                else setIsLocal(false);
                break;
            case 'typeOfProgram' :
                setTypeOfProgram(value);
                break;
            case 'forWho' : 
                if(value === 'uczniowie') {
                    setForWho(0);
                    setCheckboxesVisible(true);
                }
                else if(value === 'rodzice') {
                    setCheckboxesVisible(false);
                    setForWho(1);
                }
                    
                else if(value === 'nauczyciele') {
                    setCheckboxesVisible(false);
                    setForWho(2);
                }

                break;
            default:
                break;
        }
    }

    const handleCheckBox = (event) => {
        const { value, checked } = event.target;
        if(checked) {
            classesArray[value] = true;
        } else {
            classesArray[value] = false;
        }
        setClasses(classesArray.join(','));
    }

    const handleReset = () => {
        setModal(false);
        setName("");
        setTypeOfProgram("");
        setCheckboxesVisible(false);
        setForWho(0)
        setIsLocal(false)
        setClasses([]);
        classesArray = new Array(16).fill(false);
        document.querySelector('form').reset();
    }

    // Fetching
    const [programsData, setProgramsData] = useState([]);

    useEffect(() => {
        fetchData('/fetchData/programs-get').then(response => {
            setProgramsData(response.data.rows)
        }).catch(err => {
            console.log(err);
        })
    }, [name, ifReload])

    let isFormValid = () =>{
        let isValid = errors.nameOfProgram === ''; 
        return isValid ? '' : 'disabled';

    }

    return (
        <OuterWrapper>
            <Navbar/>
            <InnerWrapper>
            <Form>
                    <ModalComponent setModal={isModal} name={name} handleReset={handleReset}/>
                    <h1>Formularz dodania nowego programu</h1>
                    <input type="text" onChange={handleChange} name="nameOfProgram" id="nameOfProgram" placeholder="Nazwa programu.."/>
                    {errors.nameOfProgram !== ''  ? <ErrorBox>{errors.nameOfProgram}</ErrorBox> : ''}
                    <select onChange={handleChange} name="isLocal" id="isLocal">
                        <option disabled selected value='niepoprawna wartosc'>-- Wybierz lokalnie/teren -- </option>
                        <option value="teren">teren</option>
                        <option value="lokalnie">lokalnie</option>
                    </select>
                    <input type="text" onChange={handleChange} name="typeOfProgram" id="typeOfProgram" placeholder="Rodzaj programu.."/>
                    <select onChange={handleChange} name="forWho" id="forWho">
                        <option disabled selected value='niepoprawna wartosc'>-- Wybierz dla kogo -- </option>
                        <option value="rodzice">rodzice</option>
                        <option value="nauczyciele">nauczyciele</option>
                        <option value="uczniowie">uczniowie</option>
                    </select>
                    {areCheckboxesVisible ? 
                    <div id="checkboxDiv">
                        <div>
                            <label for="class1">Klasa 1</label>
                            <input type="checkbox" id="class1" name="class1" value="0" onChange={handleCheckBox}/>
                        </div>

                        <div>
                            <label for="class2">Klasa 2</label>
                            <input type="checkbox" id="class2" name="class2" value="1" onChange={handleCheckBox}/>
                        </div>

                        <div>
                            <label for="class3">Klasa 3</label>
                            <input type="checkbox" id="class3" name="class3" value="2" onChange={handleCheckBox}/>
                        </div>

                        <div>
                            <label for="class4">Klasa 4</label>
                            <input type="checkbox" id="class4" name="class4" value="3" onChange={handleCheckBox}/>
                        </div>

                        <div>
                            <label for="class5">Klasa 5</label>
                            <input type="checkbox" id="class5" name="class5" value="4" onChange={handleCheckBox}/>
                        </div>

                        <div>
                            <label for="class6">Klasa 6</label>
                            <input type="checkbox" id="class6" name="class6" value="5" onChange={handleCheckBox}/>
                        </div>

                        <div>
                            <label for="class7">Klasa 7</label>
                            <input type="checkbox" id="class7" name="class7" value="6" onChange={handleCheckBox}/>
                        </div>

                        <div>
                            <label for="class8">Klasa 8</label>
                            <input type="checkbox" id="class8" name="class8" value="7" onChange={handleCheckBox}/>
                        </div>

                        <div>
                            <label for="class9">Klasa 1 (liceum, technikum)</label>
                            <input type="checkbox" id="class9" name="class9" value="8" onChange={handleCheckBox}/>
                        </div>

                        <div>
                            <label for="class10">Klasa 2 (liceum, technikum)</label>
                            <input type="checkbox" id="class10" name="class10" value="9" onChange={handleCheckBox}/>
                        </div>

                        <div>
                            <label for="class11">Klasa 3 (liceum, technikum)</label>
                            <input type="checkbox" id="class11" name="class11" value="10" onChange={handleCheckBox}/>
                        </div>

                        <div>
                            <label for="class12">Klasa 4 (liceum, technikum)</label>
                            <input type="checkbox" id="class12" name="class12" value="11" onChange={handleCheckBox}/>
                        </div>

                        <div>
                            <label for="class13">Klasa 5 (technikum)</label>
                            <input type="checkbox" id="class13" name="class13" value="12" onChange={handleCheckBox}/>
                        </div>
                        <div>
                            <label for="class14">PP (Przedszkole)</label>
                            <input type="checkbox" id="class14" name="class14" value="13" onChange={handleCheckBox}/>
                        </div>
                        <div>
                            <label for="class15">0-3 Podstawowka</label>
                            <input type="checkbox" id="class15" name="class15" value="14" onChange={handleCheckBox}/>
                        </div>
                        <div>
                            <label for="class16">4-6 (Podstawowka)</label>
                            <input type="checkbox" id="class16" name="class16" value="15" onChange={handleCheckBox}/>
                        </div>
                    </div>
                    : ""}

                    <AddButton to="#" onClick={() => {postData("/postData/program-add",{name, typeOfProgram, isLocal, forWho, classes}, null, setReload, setModal)}} style={ isFormValid() ? {backgroundColor: 'red', pointerEvents: 'none'} : {backgroundColor: 'green'}}>Dodaj</AddButton>
                    {/* <AddButton style={{margin: '1rem'}} to="#" onClick={() => {handleReset()}}>Resetuj</AddButton> */}
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
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: center;
    }
`


export default FetchPrograms;