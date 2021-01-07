import {Link} from 'react-router-dom'

import {FaLongArrowAltLeft} from 'react-icons/fa'

import "../styles/pages/loginCadastro.css"

const Register = () => {
    return(
        <div id="registerPage">
            <form action="/menu">
                <Link to="/"><FaLongArrowAltLeft className="backArrow"></FaLongArrowAltLeft></Link>
                <h1>HowRU</h1>
                <div className="inputs">
                    <div className="fieldName">e-mail:</div>
                    <input type="email" placeholder="e-mail" autoComplete="off"/>
                    <div className="fieldName">senha:</div>
                    <input type="password" placeholder="senha" autoComplete="off"/>
                    <div className="fieldName">confirmação da senha:</div>
                    <input type="password" placeholder="senha" autoComplete="off"/>
                </div>    
                <button type="submit">Cadastrar</button>           
                
            </form>
            <Link to="/login">Já possuo uma conta</Link>
            
        </div>
    )
}

export default Register