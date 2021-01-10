import {Link} from 'react-router-dom'
import { FormEvent } from 'react'

import {FaLongArrowAltLeft} from 'react-icons/fa'

import "../styles/global.css"
import "../styles/pages/loginCadastro.css"

const Register = () => {

    const handleRegisterSubmit = (event: FormEvent) =>{

        let div:any

        div = document.getElementsByName('email')[0]
        const email = div.value
        div = document.getElementsByName('name')[0]
        const name = div.value
        div = document.getElementsByName('password')[0]
        const password = div.value
        div = document.getElementsByName('rpassword')[0]
        const rpassword = div.value

        


            
        

        event.preventDefault()
    }

    return(
        <div id="registerPage">
            <form onSubmit={handleRegisterSubmit} action="/menu">

                <Link to="/"><FaLongArrowAltLeft className="backArrow"></FaLongArrowAltLeft></Link>
                <h1>HowRU</h1>

                <div className="inputs">

                    <div className="fieldName">e-mail:</div>
                    <input 
                        name="email" 
                        type="email" 
                        placeholder="e-mail" 
                        autoComplete="off"
                        required
                        maxLength={50}
                    />

                    <div className="fieldName">nome</div>
                    <input 
                        name="name" 
                        type="text" 
                        placeholder="nome" 
                        autoComplete="off"
                        required
                        maxLength={50}
                    />
                    <small>* Pode ser alterado posteriormente</small>

                    <div className="fieldName">senha:</div>
                    <input 
                        name="password" 
                        type="password" 
                        placeholder="senha" 
                        autoComplete="off"
                        required
                        maxLength={30}
                    />

                    <div className="fieldName">confirmação da senha:</div>
                    <input 
                        name="rpassword" 
                        type="password" 
                        placeholder="senha" 
                        autoComplete="off"
                        required
                        maxLength={30}
                    />
                </div>    
                <button type="submit">Cadastrar</button>           
                
            </form>
            <Link to="/login">Já possuo uma conta</Link>
            
        </div>
    )
}

export default Register