import React from 'react'
import {Link} from 'react-router-dom'

import landingImgNoBg from '../images/chatHomePageNoBg.png'

import '../styles/global.css'
import '../styles/pages/pageLanding.css'

const PageLanding = () =>{
    
    return (
        <div id="homePage">
            <img src={landingImgNoBg} alt="imagem de chat"/>
            <div className="textos">
                <h1>Converse com seus amigos amigos em qualquer lugar e de forma gratuita!</h1>
                <Link to="/login" className="button">Logar</Link>
                <p>Ainda não se registrou?</p>
                <Link to="/cadastro" className="button">Cadastrar</Link>
            </div>
        </div>
    )
}

export default PageLanding