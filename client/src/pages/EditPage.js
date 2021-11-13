import React from "react";
import Navbar from "../components/Navbar";
import { OuterWrapper } from "../components/OuterWrapper";
import { AddInstitution } from "./FetchInstitution";


const EditPage = (props) => {

    const handleRender = (what,id) => {
        switch(what) {
            case 'institution':
                return <AddInstitution id={id} edit={true}/>
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