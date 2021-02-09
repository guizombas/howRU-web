import {Link} from 'react-router-dom'
import { FormEvent } from 'react'

import {FaLongArrowAltLeft} from 'react-icons/fa'

import "../styles/global.css"
import "../styles/pages/loginCadastro.css"

const Register = () => {

    const handleRegisterSubmit = (event: FormEvent) =>{
        event.preventDefault()

        let div:any

        //garante formatação limpa
        div = document.querySelector(' input[name="rpassword"] + .errWarning ')
        div.style.display = 'none'
        div = document.querySelector(' input[name="email"] + .errWarning ')
        div.style.display = 'none'

        div = document.getElementsByName('name')[0]
        const name = div.value
        div = document.getElementsByName('email')[0]
        const email = div.value
        div = document.getElementsByName('password')[0]
        const password = div.value
        div = document.getElementsByName('rpassword')[0]
        const rpassword = div.value

        if (password!==rpassword){
            div = document.querySelector(' input[name="rpassword"] + .errWarning ')
            div.style.display = 'block'
            return
        }

        const data = {
            'name':name,
            'email':email,
            'password':password
        }
        
        
        const reqConfig:RequestInit = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)

        }
            
        fetch( process.env.REACT_APP_BACKEND_IP+'/register', reqConfig )
        .then( res =>{
            
            if (res.status === 201)
                return res.json()

            div = document.querySelector(' input[name="email"] + .errWarning ')
            div.style.display = 'block'
            
        })
        .then( jsonRes=>{
            if (jsonRes){
                //Controle de sessão
                const token = jsonRes.token
                localStorage.setItem('accessToken', token)

                window.location.href = "/menu"
            }
        })
        .catch( err =>{
            console.log(err);
            const div = document.querySelector('#fail')
            if (div){
                div.classList.remove('hide')
                div.classList.add('show')
            }
        })
        

    }

    return(
        <div id="registerPage">
            <form id="registerForm" onSubmit={handleRegisterSubmit} action="/menu">

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
                    <small className="errWarning">E-mail já registrado</small>

                    <div className="fieldName">nome</div>
                    <input 
                        name="name" 
                        type="text" 
                        placeholder="nome" 
                        autoComplete="off"
                        required
                        maxLength={50}
                    />

                    <div className="fieldName">senha:</div>
                    <input 
                        name="password" 
                        type="password" 
                        placeholder="senha" 
                        autoComplete="off"
                        required
                        minLength={6}
                        maxLength={30}
                        pattern="[A-Za-z0-9]{6,}"
                        title="Pelo menos 6 caracteres alfanuméricos"
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
                    <small className="errWarning">Senhas não correspondem</small>

                </div>    
                <button type="submit">Cadastrar</button>           
                
            </form>
            <Link to="/login">Já possuo uma conta</Link>
            
        </div>
    )
}

export default Register