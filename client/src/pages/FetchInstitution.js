import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import { OuterWrapper } from "../components/OuterWrapper";
import TableData from "../components/TableData";
import { fetchData } from "../middlewares/fetchData";
import { postData } from "../middlewares/postData";
import ModalComponent from "../components/ModalComponent";
import { validate } from "../middlewares/validate";
import { ErrorBox } from "../components/InputErrorBox";
import { editItem } from "../middlewares/updateData";




const FetchInstitution = (props) => {
    const [institutionData, setInstitutionData] = useState([]);
    const [isAscending, setDescending] = useState(false)
    const [ifReload, setReload] = useState(false);

    useEffect(() => {
            fetchData('/fetchData/institution-get').then(response => {
                setInstitutionData(response.data.rows)
                setReload(false);
            }).catch(err => {
                console.log(err);
            })
        
    }, [ifReload])

    const handleStateChange = useCallback(state => {
        setInstitutionData(state);
    }, [])

    return (
        <OuterWrapper>
            <Navbar/>
            <InnerWrapper>
                <AddInstitution key="addInstitution" ifReloadData={setReload}/>
                <TableData whichTable="institution" data={institutionData} handleSort={[handleStateChange, isAscending, setDescending]}/>
            </InnerWrapper>
        </OuterWrapper>
    )
}

export const AddInstitution = props => {

    //Editing
    const [currentlyEdited, setCurrentlyEdited] = useState('');
    const [dataToEdit, setDataToEdit] = useState([]);
    useEffect(() => {
        if(props.edit) {
            fetchData(`/fetchData/institution-get?id=${props.id}`).then(response => {
                setDataToEdit(response.data.rows[0]);
            }).catch(err => {
                console.log(err)
            })
        } 
    }, [props.edit])

    //Adding

    const [nameOfInstitution, setNameOfInstitution] = useState("");
    const [email, setEmail] = useState("");
    const [city, setCity] = useState("");
    const [postalCode, setPostalCode] = useState("");
    const [community, setCommunity] = useState("");
    const [address, setAddress] = useState("");
    const [telephone, setTelephone] = useState("");
    const [fax, setFax] = useState("");

    const [isModal, setModal] = useState(false);
    const [errors, setErrors] = useState({
        nameOfInstitution : '',
        email : '',
        city : '',
        postalCode : '',
        community : '',
        address : '',
        telephone : '',
        fax : ''
    })

    const handleReset = () => {
            setModal(false);
            setNameOfInstitution("");
            setEmail("");
            setCity("");
            setPostalCode("");
            setCommunity("");
            setAddress("");
            setTelephone("");
            setFax("");
            document.querySelector('form').reset();
        }

    const handleChange = (event) => {
        const { value, name } = event.target;
        validate(name,value,errors,setErrors)
        switch(name) {
            case 'nameOfInstitution' : 
                setNameOfInstitution(value);
                break;
            case 'email' :
                setEmail(value);
                break;
            case 'city' : 
                setCity(value);
                break;
            case 'postalCode' :
                setPostalCode(value);
                break;
            case 'community' :
                setCommunity(value);
                break;
            case 'address' :
                setAddress(value);
                break;
            case 'telephone' :
                setTelephone(value);
                break;
            case 'fax' :
                setFax(value);
                break;

            case 'editForm':
                setCurrentlyEdited(value);
                break;
            default:
                break;
        }
    }

    const isFormValid = () =>{
        let isValid = errors.nameOfInstitution === '' && errors.email === '' && errors.city === '' && errors.postalCode  === '' && errors.community === '' && errors.address === '' && errors.telephone === '' 
        return isValid ? '' : 'disabled';
    }

    return(
        <OuterWrapper>
            <Navbar/>
            <InnerWrapperTwo>
                <Form>
                    {props.edit ? <ModalComponent setModal={isModal} name={dataToEdit.name} handleReset={handleReset} edit={true}/> : <ModalComponent setModal={isModal} name={nameOfInstitution} handleReset={handleReset}/>}
                    {props.edit ? <h1>Formularz edycji placówki: <p style={{color: '#0f81d9'}}>{dataToEdit
                     ? dataToEdit.name : 'Nie znaleziono instytucji'}</p></h1> : <h1>Formularz dodania nowej placówki</h1>}
                    {props.edit ? <select name="editForm" id="editForm" onChange={handleChange}>
                        <option disabled selected>-- Wybierz co zmienić --</option>
                        <option value="nameOfInstitution">Nazwa</option>
                        <option value="email">Email</option>
                        <option value="city">Miejscowosc</option>
                        <option value="postalCode">Kod pocztowy</option>
                        <option value="community">Gmina</option>
                        <option value="address">Adres</option>
                        <option value="telephone">Telefon</option>
                        <option value="fax">Fax</option>
                    </select> : ''}
                    {!props.edit || currentlyEdited === 'nameOfInstitution' ? <input type="text" onChange={handleChange} name="nameOfInstitution" id="nameOfInstitution" placeholder={props.edit ? `Aktualnie: ${dataToEdit.name}` : "Nazwa placówki.."}/> : ''}
                    {errors.nameOfInstitution !== ''  ? <ErrorBox>{errors.nameOfInstitution}</ErrorBox> : ''}
                    {!props.edit || currentlyEdited === 'email' ? <input type="text" onChange={handleChange} name="email" id="email" placeholder={props.edit ? `Aktualnie: ${dataToEdit.email}` : "Email placówki.."}/> : ''}
                    {errors.email !== ''  ? <ErrorBox>{errors.email}</ErrorBox> : ''}
                    <div>
                        {!props.edit || currentlyEdited === 'city' ? <input type="text" onChange={handleChange} name="city" id="city" placeholder={props.edit ? `Aktualnie: ${dataToEdit.city}` : "Miejscowość placówki.."}/> : ''}
                        {!props.edit || currentlyEdited === 'postalCode' ? <input type="text" onChange={handleChange} name="postalCode" id="postalCode" placeholder={props.edit ? `Aktualnie: ${dataToEdit.postalCode}` : "Kod pocztowy placówki.."}/> : ''}
                    </div>
                        {errors.city !== ''  ? <ErrorBox>{errors.city}</ErrorBox> : ''} <br/>
                        {errors.postalCode !== ''  ? <ErrorBox>{errors.postalCode}</ErrorBox> : ''}
                    {!props.edit || currentlyEdited === 'community' ? <input type="text" onChange={handleChange} name="community" id="community" placeholder={props.edit ? `Aktualnie: ${dataToEdit.community}` : "Gmina placówki.."}/> : ''}
                    {errors.community !== ''  ? <ErrorBox>{errors.community}</ErrorBox> : ''}
                    {!props.edit || currentlyEdited === 'address' ? <input type="text" onChange={handleChange} name="address" id="address" placeholder={props.edit ? `Aktualnie: ${dataToEdit.address}` : "Adres placówki.."}/> : ''}
                    {errors.address !== ''  ? <ErrorBox>{errors.address}</ErrorBox> : ''}
                    {!props.edit || currentlyEdited === 'telephone' ? <input type="text" onChange={handleChange} name="telephone" id="telephone" placeholder={props.edit ? `Aktualnie: ${dataToEdit.telephone}` : "Telefon placówki.."}/> : ''}
                    {errors.telephone !== ''  ? <ErrorBox>{errors.telephone}</ErrorBox> : ''}
                    {!props.edit || currentlyEdited === 'fax' ? <input type="text" onChange={handleChange} name="fax" id="fax" placeholder={props.edit ? `Aktualnie: ${dataToEdit.fax}` : "FAX placówki.."}/> : ''}
                    {props.edit ? <AddButton to="#" onClick={() => {editItem("/updateData/institution-edit",{nameOfInstitution, email, city, postalCode, community, address, telephone, fax}, props.id, setModal)}} style={ isFormValid() ? {backgroundColor: 'red', pointerEvents: 'none'} : {backgroundColor: '#0f81d9'}} >Edytuj</AddButton> : <AddButton to="#" onClick={() => {postData("/postData/institution-add",{nameOfInstitution, email, city, postalCode, community, address, telephone, fax},null,props.ifReloadData, setModal)}} style={ isFormValid() ? {backgroundColor: 'red', pointerEvents: 'none'} : {backgroundColor: 'green'}} >Dodaj</AddButton>}
            
                    {isFormValid() &&
                        <p>Wprowadz wszystkie wymagane dane!</p>
                    }
                </Form>
            </InnerWrapperTwo>
        </OuterWrapper>
    )
}

const InnerWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: auto;
`

const InnerWrapperTwo = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: auto;
    width: 100%;
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

    #city {
        width: 12rem;
        margin: 0;
    }

    #city::placeholder {
        font-size: 0.8rem;
    }

    #postalCode {
        width: 8rem;
        margin: 2rem 0 2rem 1rem;
    }

    #postalCode::placeholder {
        font-size: 0.8rem;
    }

    input:focus {
        outline: none;
    }

    input::placeholder {
        font-size: 1rem;
    }
    /* justify-content: center; */
    /* align-items: center; */
`


export default FetchInstitution;