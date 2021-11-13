import React, { useEffect, useState } from 'react';
import Modal from 'react-awesome-modal';
import styled from 'styled-components';

const ModalComponent = props => {
    
    const [isVisible, setVisible] = useState(false);

    const closeModal = () => {
        setVisible(false);
    }

    useEffect(() => {
        setVisible(props.setModal)
    }, [props.setModal])

    return (
        <section>
            {!props.error ? <Modal visible={isVisible} width="400" height="200" effect="fadeInDown" onClickAway={() => {closeModal(); props.handleReset()}}>
            <InnerModal>
                {props.edit  ? <h3>Pomyślnie zmieniono: <br/>{props.name}</h3> : <h3>Pomyślnie dodano: <br/>{props.name}</h3>} 
                <CloseButton onClick={() => {closeModal();props.handleReset()}} width="5rem" height="1.2rem" fontSize="0.8rem" to="#">Zamknij</CloseButton>
            </InnerModal>
        </Modal> : <Modal visible={isVisible} width="400" height="200" effect="fadeInDown" onClickAway={() => {closeModal(); props.handleReset()}}>
            <InnerModal>
                <h3 style={{color: 'red', fontWeight: 'bold'}}>Przed usunięciem tego wyniku, usuń wiersze w tabeli WYDARZENIA w których on występuje!</h3>
                <CloseButton onClick={() => {closeModal()}} width="5rem" height="1.2rem" fontSize="0.8rem" to="#">Zamknij</CloseButton>
            </InnerModal>
        </Modal> }
    </section>
    )
}

const InnerModal = styled.div`
    display: flex;
    padding: 1rem;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    h3 {
        color: green;
    }
`

const CloseButton = styled.a`
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
    margin-top: 2rem;
    cursor: pointer;
`

export default ModalComponent;