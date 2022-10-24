import axios from "axios";
import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { OuterWrapper } from "../components/OuterWrapper";
import FetchEvents from "./FetchEvents";
import FetchEvents2 from "./FetchEvents2";
import { AddInstitution } from "./FetchInstitution";


const EditPage = (props) => {

    const handleRender = (what,id) => {
        switch(what) {
            case 'institution':
                return <AddInstitution id={id} edit={true}/>
            case 'event':
                    return <FetchEvents id={id} edit={true}/>
            case 'event2':
                    return <FetchEvents2 id={id} edit={true}/>
            default:
                break;
        }
    }

    return (
        <OuterWrapper>
            <Navbar/>
            {handleRender(props.match.params.what, props.match.params.id)}
        </OuterWrapper>
    )
}

export default EditPage;