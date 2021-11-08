import styled from "styled-components"
import { removeItem } from "../middlewares/updateData"
import { DataButton, DataDownloadButton } from "./ControllerBlock"
import html2pdf from 'html2pdf.js';
import React, { useEffect, useState } from "react";



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
                            case 8:
                                classList.push('1 L/T');
                                break;
                            case 9:
                                classList.push('2 L/T');
                                break;
                            case 10:
                                classList.push('3 L/T');
                                break;
                            case 11:
                                classList.push('4 L/T');
                                break;
                            case 12:
                                classList.push('5 T');
                                break;
                            case 13:
                                classList.push('PP (Przedszkole)');
                                break;
                            case 14:
                                classList.push('0-3 Podst.');
                                break;
                            case 15:
                                classList.push('4-6 Podst.');
                                break;
                            default:
                                classList.push(`${i+1} pods.`);
                                break;
                        }
                    }
                }
                return `uczniowie (klasy: ${classList})`
            }
        case 1:
            return 'rodzice'
        case 2:
            return 'nauczyciele'
        }
    }

const TableData = (props) => {
    const [isLoading, setLoading] = useState(false);
    const [data, setData] = useState(props.data);

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
                        return <TableItem iterator={i+1} whichTable="institution" id={el.idInstitution} name={el.name} email={el.email} city={el.city} community={el.community} postalCode={el.postalCode} address={el.address} telephone={el.telephone} fax={el.fax}/>
                    })}
                    
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
                    {props.data.map((el, i) => {
                        return <TableItem iterator={i+1} whichTable="employee" id={el.idEmployee} name={el.firstName} secondName={el.secondName} lastName={el.lastName} age={el.age}/>
                    })}
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
                    <tr>
                        <th>Lp.</th>
                        <th>Nazwa</th>
                        <th>Lokalnie / teren</th>
                        <th>Rodzaj</th>
                        <th>Dla kogo</th>
                        <th id="actionsTableHeader">Akcje</th>

                    </tr>
                    {!data && !isLoading ? 'loading' : props.data.map((el,i) => {
                        return <TableItem iterator={i+1} whichTable="programs" id={el.idProgram} name={el.name} isLocal={el.isLocal} typeOfProgram={el.typeOfProgram} forWho={el.forWho} classes={el.classes}/>
                    })}
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
                <tr>
                    <th>Lp.</th>
                    <th>Data wizyty</th>
                    <th>Dane pracownika</th>
                    <th>Nazwa szkoły</th>
                    <th>Gmina</th>
                    <th>Nazwa zajęć</th>
                    <th>Rodzaj zajęć</th>
                    <th>Liczba uczestników</th>
                    <th>Liczba form pomocy</th>
                    <th>Inna nazwa</th>
                    <th>Dla kogo?</th>
                    <th id="actionsTableHeader">Akcje</th>

    
                </tr>
                {props.eventData.map((el,i) => {
                // const findUser = props.employeeData.filter(element => {
                //     return element.idEmployee == el.employeeId;
                // })[0]

                const findInstitution = props.institutionData.filter(element => {
                    return element.idInstitution == el.institutionId;
                })[0];

                const findProgram = props.programsData.filter(element => {
                    return element.idProgram == el.programId;
                })[0];


                    return <tr>
                        <td>{i+1}</td>
                        <td>{el.dateOfEvent}</td>
                        {/* <td>{findUser.firstName} {findUser.lastName}</td> */}
                        {/* {console.log(el.employees)} */}
                        <td>{el.employees}</td>
                        <td>{findInstitution.name}</td>
                        <td>{findInstitution.community}</td>
                        <td>{findProgram.name}</td>
                        <td>{findProgram.typeOfProgram}</td>
                        <td>{el.howManyParticipiants}</td>
                        <td>{el.howManyPrograms}</td>
                        <td>{el.differentNameProgram}</td>
                        <td>{defineForWho(findProgram.forWho, findProgram.classes)}</td>
                        <td class="actionRemoveData" style={{display: "flex", justifyContent: "space-evenly"}}>
                        {/* <DataButton width="0.5rem" height="0.3rem" fontSize="0.8rem" to="#">Edytuj</DataButton> */}
                        <DataButton class="removeBtn" onClick={() => {removeItem(el.idEvent, 'event')}} width="0.5rem" height="0.3rem" fontSize="0.8rem" to="#">Usuń</DataButton>
                        </td>
                    </tr>
                })}
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
                    <td class="actionRemoveData" style={{display: "flex", justifyContent: "space-evenly"}}>
                        {/* <DataButton width="0.5rem" height="0.3rem" fontSize="0.8rem" to="#">Edytuj</DataButton> */}
                        <DataButton onClick={() => {removeItem(props.id, 'institution')}} width="0.5rem" height="0.3rem" fontSize="0.8rem" to="#">Usuń</DataButton>
                    </td>
                </tr>
            )
        case 'employee':
            return (
                <tr>
                    <td>{props.iterator}</td>
                    <td>{props.name}</td>
                    <td>{props.secondName}</td>
                    <td>{props.lastName}</td>
                    <td>{props.age}</td>
                    <td class="actionRemoveData" style={{display: "flex", justifyContent: "space-evenly"}}>
                        {/* <DataButton width="0.5rem" height="0.3rem" fontSize="0.8rem" to="#">Edytuj</DataButton> */}
                        <DataButton onClick={() => {removeItem(props.id, 'employee')}} width="0.5rem" height="0.3rem" fontSize="0.8rem" to="#">Usuń</DataButton>
                    </td>
                </tr>
            )
        case 'programs':        
            return (
                <tr>
                    <td>{props.iterator}</td>
                    <td>{props.name}</td>
                    <td>{props.isLocal ? "lokalnie" : "teren"}</td>
                    <td>{props.typeOfProgram}</td>
                    <td>{defineForWho(props.forWho, props.classes)}</td>
                    <td class="actionRemoveData" style={{display: "flex", justifyContent: "space-evenly"}}>
                        {/* <DataButton width="0.5rem" height="0.3rem" fontSize="0.8rem" to="#">Edytuj</DataButton> */}
                        <DataButton onClick={() => {removeItem(props.id, 'programs')}} width="0.5rem" height="0.3rem" fontSize="0.8rem" to="#">Usuń</DataButton>
                    </td>
                </tr>
            )
        default:
            <tr>
                <td>błąd</td>
            </tr>
    }
}

const TableWrapper = styled.table`
    justify-content: center;
    align-items: center;
    flex-direction: column;
    display: flex;

    font-family: Arial, Helvetica, sans-serif;
    border-collapse: collapse;
    width: 100%;
    table-layout: fixed;

    td, th {
        border-left: 1px solid #ddd;
        border-right: 1px solid #ddd;
        padding: 8px;
    }

    td {
        width: 100%;
    }

    tr:nth-child(even){
        background-color: #dcdde1;
        border-left: solid 1px #f5f6fa;
        border-right: solid 1px #f5f6fa;
    }

    tr:hover {
        background-color: #0984e3;
    }

    th {
        padding-top: 1rem;
        padding-bottom: 1rem;
        text-align: left;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        align-items: center;
        font-size: 0.9rem;
        background-color: #04AA6D;
        color: white;
        width: 100%;
        height: 2.5rem;
        
        img {
            width: 1.2rem;
            height: auto;
            cursor: pointer;
        }
    }

    tr {
        width: 90%;
        display: flex;
        height: auto;
        margin: 0.2rem 0;
        justify-content: center;
        align-items: center;
        background: #f5f6fa;
    }
`


export default TableData;