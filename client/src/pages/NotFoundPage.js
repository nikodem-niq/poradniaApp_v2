import React from "react";
import Navbar from "../components/Navbar";


const NotFoundPage = () => {
    return (
        <div>
            <Navbar/>
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <h1>Nie znaleziono strony. <br/> Wróć na strone główną.</h1>
            </div>
        </div>
    )
}

export default NotFoundPage;