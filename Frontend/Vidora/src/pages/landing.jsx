import React from 'react'
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import "../App.css"
function LandingPage() {
    const navigate = useNavigate();

    return (
        <div className='landingPageContainer'>
            <nav>
               <div className='navheader'>
                <h2>Vidora</h2>
               </div>
               
               <div className='navlist'>
                  <p className='navLink' onClick={() => navigate('/guest')}>Join As Guest</p>
                  <p className='navLink' onClick={() => navigate('/signup')}>Register</p>
                  <button className='navButton' onClick={() => navigate('/auth')}>Login</button>
               </div>
            </nav>

            <div className="landingMainContainer">
                <div>
                    <h1><span style={{color:"#960fbc"}}>Connect</span> With Your <br/> Loved Ones</h1>

                    <p>Cover a distance with Vidora</p>
                    <div role='button'>
                        <Link to="/auth">Get Started</Link>
                    </div>
                </div>
                <div>
                    <img src='/mobile.png' alt='img'/>
                </div>
            </div>
        </div>
    )
}

export default LandingPage
