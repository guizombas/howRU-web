import {Link} from 'react-router-dom'

import {FaLongArrowAltLeft} from 'react-icons/fa'

import "../styles/pages/loginCadastro.css"

const Login = () => {
    return(
        <div id="loginPage">
            <form action="/menu">
                <Link to="/"><FaLongArrowAltLeft className="backArrow"></FaLongArrowAltLeft></Link>
                <h1>HowRU</h1>
                <div className="inputs">
                    <div className="fieldName">e-mail:</div>
                    <input type="email" placeholder="e-mail"/>
                    <div className="fieldName">senha:</div>
                    <input type="password" placeholder="senha" autoComplete="off"/>
                </div>    
                <button type="submit">Logar</button>           
                
            </form>
            <Link to="/cadastro">Ainda não possuo uma conta</Link>
            
        </div>
    )
}

export default Login