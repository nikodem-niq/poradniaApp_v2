import styled from "styled-components"
import { removeItem } from "../middlewares/updateData"
import { DataButton, DataDownloadButton } from "./ControllerBlock"
import html2pdf from 'html2pdf.js';
import React, { useEffect, useState } from "react";
import ModalComponent from "./ModalComponent";



const defineForWho = (data,classes) => {
    switch(data) {
        case 0:
            if(classes) {
                // console.log(classes)
                let classList = [];
                let splittedClass = classes.split(',');
                for(let i=0; i<classes.length; i++) {
                    if(splittedClass[i] === true || splittedClass[i] === 'true') {
                        switch(i) {
                            case 0:
                                classList.push('Rok zycia 0-3.');
                                break;
                            case 1:
                                classList.push('Przedszkole (PP)')
                                break;
                            case 2:
                                classList.push('Rok zycia 6')
                                break;
                            case 11:
                                classList.push('I Liceum')
                                break;                                
                            case 12:
                                classList.push('II Liceum')
                                break;                                
                            case 13:
                                classList.push('III Liceum')
                                break;                                
                            case 14:
                                classList.push('IV Liceum')
                                break;     

                            case 15:
                                classList.push('I Technikum')
                                break;                                
                            case 16:
                                classList.push('II Technikum')
                                break;                                
                            case 17:
                                classList.push('III Technikum')
                                break;                                
                            case 18:
                                classList.push('IV Technikum')
                                break;                                
                            case 19:
                                classList.push('V Technikum')
                                break;  
                                
                            case 20:
                                classList.push('I - I Branzowa')
                                break;                                
                            case 21:
                                classList.push('I - II Branzowa')
                                break;                                
                            case 22:
                                classList.push('I - III Branzowa')
                                break;                                
                            case 23:
                                classList.push('II - I Branzowa')
                                break;                                
                            case 24:
                                classList.push('II - II Branzowa')
                                break;   
                                
                                
                            default:
                                classList.push(`${i-2} pods.`);
                                break;
                        }
                    }
                }
                return `uczniowie (klasy: ${classList})`
            }
            break;
        case 1:
            return 'rodzice'
        case 2:
            return 'nauczyciele'
        default:
            break;
        }
    }

const TableData = (props) => {
    const [isLoading, setLoading] = useState(false);
    const [data, setData] = useState(props.data);
    const [isModal, setModal] = useState(false);

    useEffect(() => {
        setData(props.data)
        setLoading(false);
    }, [props.data])

    const printData = (from) => {
        const data = document.getElementById('tableWithData');
        const actionsTableHeader = document.getElementById('actionsTableHeader');
        const actionsTableHeaderItems = document.querySelectorAll('.actionRemoveData');
            const opt = {
                margin: 0,
                filename: `dane_${from}.pdf`,
                image: {type: 'png',quality: 0.98},
                html2canvas: {scale: 1},
                jsPDF: {
                  unit: 'pt',
                  format: [1500, 1500],
                  orientation: 'landscape'
                }
            }
            actionsTableHeader.style.display = 'none';
            for(let i=0; i<actionsTableHeaderItems.length; i++) {
                actionsTableHeaderItems[i].style.display = 'none';
            }
            setTimeout(() => {
                actionsTableHeader.style.display = 'block';
                for(let i=0; i<actionsTableHeaderItems.length; i++) {
                    actionsTableHeaderItems[i].style.display = 'block';
                }
            },1500)
            html2pdf().from(data).set(opt).save();
    }

    switch(props.whichTable) {
        case 'institution':
            return (
                <div>
                    <div style={{display: 'flex', justifyContent: 'center'}}>
                        <h1 >Zestawienie danych</h1>
                    </div>
                    <div style={{display: 'flex', justifyContent: 'flex-end'}}>
                        <DataDownloadButton onClick={() => {printData('instytucje')}} width="5rem" height="1.2rem" fontSize="0.8rem" to="#">Pobierz PDF</DataDownloadButton>
                    </div>
                <TableWrapper id="tableWithData">
                <table>
                    <tr>
                        <th>
                            <p>Lp.</p>
                            {/* <img src={sort} onClick={() => {
                                setLoading(true);
                                setIdSorting(true);
                                institutionSorting('idInstitution', props.handleSort[1], props.handleSort[2], setData, setIdSorting)
                                setLoading(false);
                            }} /> */}
                        </th>
                        <th>
                        <p>Nazwa</p>
                            {/* <img src={sort} onClick={() => {
                                setLoading(true);
                                institutionSorting('name', props.handleSort[1], props.handleSort[2], setData, setIdSorting)
                                setLoading(false);
                            }} /> */}
                        </th>
                        <th>
                        <p>Email</p>
                            {/* <img src={sort} onClick={() => {
                                setLoading(true);
                                institutionSorting('email', props.handleSort[1], props.handleSort[2], setData, setIdSorting)
                                setLoading(false);
                            }} /> */}
                        </th>
                        <th>
                        <p>Miejscowość</p>
                            {/* <img src={sort} onClick={() => {
                                setLoading(true);
                                institutionSorting('city', props.handleSort[1], props.handleSort[2], setData, setIdSorting)
                                setLoading(false);
                            }} /> */}
                        </th>
                        <th>
                        <p>Gmina</p>
                            {/* <img src={sort} onClick={() => {
                                setLoading(true);
                                institutionSorting('community', props.handleSort[1], props.handleSort[2], setData, setIdSorting)
                                setLoading(false);
                            }} /> */}
                        </th>
                        <th>
                        <p>Kod pocztowy</p>
                            {/* <img src={sort} onClick={() => {
                                setLoading(true);
                                institutionSorting('postalCode', props.handleSort[1], props.handleSort[2], setData, setIdSorting)
                                setLoading(false);
                            }} /> */}
                        </th>
                        <th>
                        <p>Adres</p>
                            {/* <img src={sort} onClick={() => {
                                setLoading(true);
                                institutionSorting('address', props.handleSort[1], props.handleSort[2], setData, setIdSorting)
                                setLoading(false);
                            }} /> */}
                        </th>
                        <th>
                        <p>Telefon</p>
                            {/* <img src={sort} onClick={() => {
                                setLoading(true);
                                institutionSorting('telephone', props.handleSort[1], props.handleSort[2], setData, setIdSorting)
                                setLoading(false);
                            }} /> */}
                        </th>
                        <th>
                        <p>FAX</p>
                            {/* <img src={sort} onClick={() => {
                                setLoading(true);
                                institutionSorting('fax', props.handleSort[1], props.handleSort[2], setData, setIdSorting)
                                setLoading(false);
                            }} /> */}
                        </th>
                        <th id="actionsTableHeader">Akcje</th>
                    </tr>
                    {!data && !isLoading ? 'loading' : data.map((el,i) => {
                        // return <TableItem iterator={!props.handleSort[1] ? i+1 : data.length-i} whichTable="institution" id={el.idInstitution} name={el.name} email={el.email} city={el.city} community={el.community} postalCode={el.postalCode} address={el.address} telephone={el.telephone} fax={el.fax}/>
                        return <TableItem setModal={isModal} setStateModal={setModal} iterator={i+1} key={i} whichTable="institution" id={el.idInstitution} name={el.name} email={el.email} city={el.city} community={el.community} postalCode={el.postalCode} address={el.address} telephone={el.telephone} fax={el.fax}/>
                    })}
                    </table>
                </TableWrapper>
                </div>
            ) 
        case 'employee':
            return (
                <div>
                <div style={{display: 'flex', justifyContent: 'center'}}>
                    <h1 >Zestawienie danych</h1>
                </div>
                <div style={{display: 'flex', justifyContent: 'flex-end'}}>
                    <DataDownloadButton onClick={() => {printData('pracownicy')}} width="5rem" height="1.2rem" fontSize="0.8rem" to="#">Pobierz PDF</DataDownloadButton>
                </div>
                <TableWrapper id="tableWithData">
                <table>
                    <thead>
                    <tr>
                        <th><p>Lp.</p>
                        {/* <img src={sort} onClick={() => {
                                setLoading(true);
                                setIdSorting(true);
                                console.log(data)
                                employeeSorting('idEmployee', props.handleSort[1], props.handleSort[2], setData, setIdSorting)
                                console.log(data)
                                setLoading(false);
                            }} /> */}
                        </th>
                        <th><p>Imię</p>
                        {/* <img src={sort} onClick={() => {
                                setLoading(true);
                                employeeSorting('firstName', props.handleSort[1], props.handleSort[2], setData, setIdSorting)
                                setLoading(false);
                            }} /> */}
                        </th>
                        <th><p>Drugie imię</p>
                        {/* <img src={sort} onClick={() => {
                                setLoading(true);
                                employeeSorting('secondName', props.handleSort[1], props.handleSort[2], setData, setIdSorting)
                                setLoading(false);
                            }} /> */}
                        </th>
                        <th><p>Nazwisko</p>
                        {/* <img src={sort} onClick={() => {
                                setLoading(true);
                                employeeSorting('lastName', props.handleSort[1], props.handleSort[2], setData, setIdSorting)
                                setLoading(false);
                            }} /> */}
                        </th>
                        <th><p>Wiek</p>
                        {/* <img src={sort} onClick={() => {
                                setLoading(true);
                                employeeSorting('age', props.handleSort[1], props.handleSort[2], setData, setIdSorting)
                                setLoading(false);
                            }} /> */}
                        </th>
                        <th id="actionsTableHeader">Akcje</th>
                    </tr>
                    </thead>
                    {props.data.map((el, i) => {
                        return <TableItem iterator={i+1} key={i} setModal={isModal} setStateModal={setModal} whichTable="employee" id={el.idEmployee} name={el.firstName} secondName={el.secondName} lastName={el.lastName} age={el.age}/>
                    })}
                </table>
                </TableWrapper>
                </div>
            )
        case 'programs':
            return (
                <div>
                <div style={{display: 'flex', justifyContent: 'center'}}>
                    <h1 >Zestawienie danych</h1>
                </div>
                <div style={{display: 'flex', justifyContent: 'flex-end'}}>
                    <DataDownloadButton onClick={() => {printData('programy')}} width="5rem" height="1.2rem" fontSize="0.8rem" to="#">Pobierz PDF</DataDownloadButton>
                </div>
                <TableWrapper id="tableWithData">
                    <table>
                    <thead>
                    <tr>
                        <th>Lp.</th>
                        <th>Nazwa</th>
                        <th>Lokalnie / teren</th>
                        <th>Rodzaj</th>
                        <th id="actionsTableHeader">Akcje</th>

                    </tr>
                    </thead>
                    {!data && !isLoading ? 'loading' : props.data.map((el,i) => {
                        return <TableItem iterator={i+1} key={i} setModal={isModal} setStateModal={setModal} whichTable="programs" id={el.idProgram} name={el.name} isLocal={el.isLocal} typeOfProgram={el.typeOfProgram} forWho={el.forWho} classes={el.classes}/>
                    })}
                    </table>
                </TableWrapper>
                </div>
            )
            case 'events': 
            return (
                <div>
                <div style={{display: 'flex', justifyContent: 'center'}}>
                    <h1 >Zestawienie danych</h1>
                </div>
                <div style={{display: 'flex', justifyContent: 'flex-end'}}>
                    <DataDownloadButton onClick={() => {printData('wydarzenia')}} width="5rem" height="1.2rem" fontSize="0.8rem" to="#">Pobierz PDF</DataDownloadButton>
                </div>
                <TableWrapper id="tableWithData">
                <table>
                <thead>
                <tr>
                    <th>Lp.</th>
                    <th>Data wizyty <h6>(DD-MM-RRRR)</h6> </th>
                    <th>Dane pracownika</th>
                    <th>Nazwa szkoły</th>
                    <th>Gmina</th>
                    <th>Nazwa zajęć</th>
                    <th>Rodzaj zajęć</th>
                    <th>Dla kogo</th>
                    <th>Liczba uczestników</th>
                    <th>Liczba form pomocy</th>
                    <th>Inna nazwa</th>
                    <th id="actionsTableHeader">Akcje</th>

    
                </tr>
                </thead>
                {props.eventData.map((el,i) => {
                // const findUser = props.employeeData.filter(element => {
                //     return element.idEmployee == el.employeeId;
                // })[0]

                const findInstitution = props.institutionData.filter(element => {
                    return element.idInstitution === el.institutionId;
                })[0];

                const findProgram = props.programsData.filter(element => {
                    return element.idProgram === el.programId;
                })[0];


                    return <tbody><tr>
                        <td>{i+1}</td>
                        <td>{el.dateOfEvent}</td>
                        {/* <td>{findUser.firstName} {findUser.lastName}</td> */}
                        {/* {console.log(el.employees)} */}
                        <td>{el.employees}</td>
                        <td>{findInstitution.name}</td>
                        <td>{findInstitution.community}</td>
                        <td>{findProgram.name}</td>
                        <td>{findProgram.typeOfProgram}</td>
                        <td>{defineForWho(el.forWho, el.classes)}</td>
                        {/* {console.log(props.forWho)} */}
                        <td>{el.howManyParticipiants}</td>
                        <td>{el.howManyPrograms}</td>
                        <td>{el.differentNameProgram}</td>
                        {/* <td>{defineForWho(findProgram.forWho, findProgram.classes)}</td> */}
                        <td class="actionRemoveData" style={{display: "flex", justifyContent: "space-evenly"}}>
                        {/* <DataButton width="0.5rem" height="0.3rem" fontSize="0.8rem" to="#">Edytuj</DataButton> */}
                        <DataButton className="removeBtn" style={{margin: '0rem 0.3rem'}} onClick={() => {removeItem(el.idEvent, 'event')}} width="0.5rem" height="0.3rem" fontSize="0.8rem" to="#">Usuń</DataButton>
                        <DataButton className="updateBtn" width="0.5rem" height="0.3rem" fontSize="0.8rem" to={`/edit/event/${el.idEvent}`}>Edytuj</DataButton>
                        </td>
                    </tr>
                    </tbody>
                })}
            </table>
            </TableWrapper>
            </div>
            )
        default:
            return (
                <h1>Błąd renderowania tabeli</h1>
            )
    }
}



const TableItem = props => {
    switch(props.whichTable) {
        case 'institution':
            return (
                <tbody>
                <tr>
                    <td>{props.iterator}</td>
                    <td>{props.name}</td>
                    <td>{props.email}</td>
                    <td>{props.city}</td>
                    <td>{props.community}</td>
                    <td>{props.postalCode}</td>
                    <td>{props.address}</td>
                    <td>{props.telephone}</td>
                    <td>{props.fax}</td>
                    <td className="actionRemoveData" style={{display: "flex", justifyContent: "space-evenly"}}>
                        <DataButton onClick={() => {removeItem(props.id, 'institution')}} width="0.5rem" height="0.3rem" fontSize="0.8rem" to="#">Usuń</DataButton>
                        <DataButton className="updateBtn" width="0.5rem" height="0.3rem" fontSize="0.8rem" to={`/edit/institution/${props.id}`}>Edytuj</DataButton>
                    </td>
                </tr>
                </tbody>
            )
        case 'employee':
            return (
                <tbody>
                <tr>
                    <td>{props.iterator}</td>
                    <td>{props.name}</td>
                    <td>{props.secondName}</td>
                    <td>{props.lastName}</td>
                    <td>{props.age}</td>
                    <td className="actionRemoveData" style={{display: "flex", justifyContent: "space-evenly"}}>
                        {/* <DataButton width="0.5rem" height="0.3rem" fontSize="0.8rem" to="#">Edytuj</DataButton> */}
                        <DataButton onClick={() => {removeItem(props.id, 'employee')}} width="0.5rem" height="0.3rem" fontSize="0.8rem" to="#">Usuń</DataButton>
                    </td>
                </tr>
                </tbody>
            )
        case 'programs':        
            return (
                <tbody>
                <ModalComponent setModal={props.setModal} error={`Na początku usuń dany program z wydarzeń!`}/>
                <tr>
                    <td>{props.iterator}</td>
                    <td>{props.name}</td>
                    <td>{props.isLocal ? "lokalnie" : "teren"}</td>
                    <td>{props.typeOfProgram}</td>
                    <td className="actionRemoveData" style={{display: "flex", justifyContent: "space-evenly"}}>
                        {/* <DataButton width="0.5rem" height="0.3rem" fontSize="0.8rem" to="#">Edytuj</DataButton> */}
                        <DataButton onClick={() => {removeItem(props.id, 'programs', props.setStateModal)}} width="0.5rem" height="0.3rem" fontSize="0.8rem" to="#">Usuń</DataButton>
                    </td>
                </tr>
                </tbody>
            )
        default:
            <tr>
                <td>błąd</td>
            </tr>
    }
}

// const TableWrapper = styled.table`
//     td, th {
//         border-left: 1px solid #ddd;
//         border-right: 1px solid #ddd;
//         padding: 8px;
//     }

//     td {
//         width: 100%;
//     }
//     tbody {
//         width: 100%;
//         display: flex;
//         justify-content: center;
//         align-items: center;
//     }
//     tbody td {
//         width: 100%;
//         min-width: 7em;
//         max-width: 7em;
//         /* font-size: 16px; */
//         font-size: 1.2vw;
//         overflow-wrap: break-word; 
//     }
//     thead {
//         width: 100%;
//         display: flex;
//         justify-content: center;
//         align-items: center;
//     }
//     thead td {
//         width: 100%;
//         min-width: 7em;
//         max-width: 7em;
//     }
//     tr:nth-child(even){
//         background-color: #dcdde1;
//         border-left: solid 1px #f5f6fa;
//         border-right: solid 1px #f5f6fa;
//     }

//     tr:hover {
//         background-color: #0984e3;
//     }

//     th {
//         padding-top: 1rem;
//         padding-bottom: 1rem;
//         text-align: left;
//         display: flex;
//         flex-direction: column;
//         justify-content: space-evenly;
//         align-items: center;
//         font-size: 0.9rem;
//         background-color: #04AA6D;
//         color: white;
//         width: 100%;
//         height: 2.5rem;
        
//         img {
//             width: 1.2rem;
//             height: auto;
//             cursor: pointer;
//         }
//     }

//     tr {
//         width: 95%;
//         display: flex;
//         height: auto;
//         margin: 0.2rem 0;
//         justify-content: center;
//         align-items: center;
//         background: #f5f6fa;
//     }

//     justify-content: center;
//     align-items: center;
//     flex-direction: column;
//     display: flex;

//     font-family: Arial, Helvetica, sans-serif;
//     border-collapse: collapse;
//     width: 100%;
//     table-layout: fixed;
// `

const TableWrapper = styled.div`
table {
  border: 1px solid #ccc;
  border-collapse: collapse;
  margin: 0;
  padding: 0;
  width: 100%;
  table-layout: fixed;
}

table caption {
  font-size: 1.5em;
  margin: .5em 0 .75em;
}

table tr {
  background-color: #f8f8f8;
  border: 1px solid #ddd;
  padding: .35em;
}

table th,
table td {
  padding: .625em;
  text-align: center;
  overflow-wrap: break-word; 

}

table th {
  font-size: .7em;
  letter-spacing: .08em;
  text-transform: uppercase;
}

table tr:nth-child(even){
    background-color: #dcdde1;
    border-left: solid 1px #f5f6fa;
    border-right: solid 1px #f5f6fa;
}

tr:hover {
    background-color: #dcdde1;
}

th > tr:first-child {
    font-size: 2rem;
}




@media screen and (max-width: 600px) {
  table {
    border: 0;
  }

  table caption {
    font-size: 1.3em;
  }
  
  table thead {
    border: none;
    clip: rect(0 0 0 0);
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
    width: 1px;
  }
  
  table tr {
    border-bottom: 3px solid #ddd;
    display: block;
    margin-bottom: .625em;
  }
  
  table td {
    border-bottom: 1px solid #ddd;
    display: block;
    font-size: .8em;
    text-align: right;
  }
  
  table td::before {

    content: attr(data-label);
    float: left;
    font-weight: bold;
    text-transform: uppercase;
  }
  
  table td:last-child {
    border-bottom: 0;
  }
}



`




export default TableData;