import {Link} from 'react-router-dom'

import {FaLongArrowAltLeft} from 'react-icons/fa'

import "../styles/pages/loginCadastro.css"
import { FormEvent } from 'react'

const Login = () => {

    const handleLoginSubmit = (event: FormEvent) =>{

        event.preventDefault()

        let div:any;

        //reseta estilização
        div = document.querySelector(' input[name="password"] + .errWarning ')
        div.style.display = 'none'
        div = document.querySelector(' input[name="email"] + .errWarning ')
        div.style.display = 'none'

        div = document.getElementsByName('email')[0]
        const email = div.value
        div = document.getElementsByName('password')[0]
        const password = div.value

        const data = {
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

        fetch( 'http://localhost:3300/login', reqConfig )
        .then( res =>{

            if (res.status === 200)
                return res.json()

            if (res.status === 404)
                div = document.querySelector(' input[name="email"] + .errWarning ')
            else
                div = document.querySelector(' input[name="password"] + .errWarning ')
            
            div.style.display = 'block'

        } )
        .then( jsonRes =>{

            if (jsonRes){
                //controle de sessão
                const token = jsonRes.token
                localStorage.setItem('accessToken', token)

                window.location.href = '/menu'
            }

        } )
        .catch( err =>{
            console.log(err);
            alert('Erro no servidor')
            
        })
    }
    

    return(
        <div id="loginPage">

            <form onSubmit={handleLoginSubmit}>

                <Link to="/"><FaLongArrowAltLeft className="backArrow"></FaLongArrowAltLeft></Link>
                <h1>HowRU</h1>
                <div className="inputs">

                    <div className="fieldName">e-mail:</div>
                    <input name="email" type="email" placeholder="e-mail" required/>
                    <small className="errWarning">E-mail não registrado</small>

                    <div className="fieldName">senha:</div>
                    <input name="password" type="password" placeholder="senha" autoComplete="off" required/>
                    <small className="errWarning">Senha incorreta</small>


                </div>    
                <button type="submit">Logar</button>           
                
            </form>
            <Link to="/cadastro">Ainda não possuo uma conta</Link>
            
        </div>
    )
}

export default Login