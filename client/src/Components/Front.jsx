import React from 'react';
import eyes from '../images/eye_new.png'
import { Link } from 'react-router-dom';


const Front = () => {

   

    return (
        <>
            <div style={{ position: 'relative' }}>
                <div className="front" style={{ zIndex: '1', position: 'absolute' }}>
                    <div className="heading">
                        <div className="logo"><img src={eyes} alt="logo" /></div>
                        <div className="reti"><h1>RetinoCare</h1></div>
                    </div>
                    <div className="dr_start">
                        <h1>Diabetic Retinopathy </h1><h1>Detection</h1>
                        <button type="button" className="btn btn-danger" id="get_started" ><Link className="nav-link" to="/login">Get Started</Link></button>
                    </div>
                </div>

            </div>
        </>
    );
}


export default Front;