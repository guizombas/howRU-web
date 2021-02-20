import { FormEvent, useState } from 'react'
import { Link, useHistory, useParams} from 'react-router-dom'

import {FaLongArrowAltLeft, FaEdit, FaPlus, FaComment} from 'react-icons/fa'

import '../styles/global.css'
import '../styles/pages/perfil.css'

interface User{
    name?: String,
    id: string | undefined,
    yourID: string|undefined,
    tel?: String,
    email?: String,
    isYourFriend?: Boolean,
}
interface Props{
    id: string | undefined
}

function Perfil( props:any ){
    const history = useHistory()
    const params = useParams<Props>()
    
    const [isFriend, setIsFriend] = useState<Boolean>()
    const [toEdit, setToEdit] = useState(false)
    const [name, setName] = useState<String|undefined>("")
    const [tel, setTel] = useState<String|undefined>("")
    const [email, setEmail] = useState<String|undefined>("")
    const [loadStatus, setLoadStatus] = useState('noRequest')

    const user:User = {
        id: params.id,
        yourID: props.userId
    }
    const yourID = user.yourID; 

    const handleAddFriendClick = () =>{
        //código de adicionar como amigo
        const data = {
            newFriendID: user.id
        }
        
        const reqConfig:RequestInit = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'authorization': token || ''
            },
            body: JSON.stringify(data)

        }

        fetch(process.env.REACT_APP_BACKEND_IP+'/addFriend', reqConfig)
        .then( res =>{

            if (res.status === 400){
                return window.location.href = '/'
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

        setIsFriend(true)
    }
    const handleChangeFormSubmit = (event:FormEvent) =>{
        event.preventDefault()
        //código de alterar os dados

        const name:any = document.getElementById('name')
        const tel:any = document.getElementById('tel')

        setName(name.value);
        setTel(tel.value);

        const data = {
            tel: tel.value,
            name: name.value
        }
        
        const reqConfig:RequestInit = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'authorization': token || ''
            },
            body: JSON.stringify(data)

        }

        fetch(process.env.REACT_APP_BACKEND_IP+'/updateData', reqConfig)
        .then( res =>{

            if (res.status === 400){
                return window.location.href = '/'
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

        setToEdit(false)

    }

    const token = localStorage.getItem('accessToken')
    if (!token)
        window.location.href = '/'

    const reqConfig:RequestInit = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'authorization': token || ''
        }
    }

    if ( loadStatus === 'noRequest' ){

        setLoadStatus('processing')
        
        fetch( process.env.REACT_APP_BACKEND_IP+'/profile/'+params.id, reqConfig )
        .then( res =>{

            if (res.status === 400){
                return window.location.href = '/'
            }
            if (res.status === 404)
                window.location.href = '/404'
            
            return res.json()
            
        })
        .then( (jsonRes:User) =>{
            
            setIsFriend(jsonRes.isYourFriend)
            setName(jsonRes.name)
            setTel(jsonRes.tel || '')
            setEmail(jsonRes.email)

            setLoadStatus('done')
            
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
        <div id="perfil">
            <div className="goBack" onClick={()=>{history.goBack()}}>
                <FaLongArrowAltLeft></FaLongArrowAltLeft>
            </div>
            {
                loadStatus === 'processing'
                ?
                <svg className='loading' height='100%' width='100%'>
                    <circle
                        className='path' 
                        cx='50%' cy='50%' r='25' 
                        stroke='#07354b' strokeWidth='3' 
                        fill='transparent'
                    ></circle>
                </svg>
                :
                !toEdit
                ?
                <div className="dados">
                    <div className="info">
                        <h1>
                            <span className="name">{name}</span> 
                            <span className="id">id={user.id}</span>
                        </h1>
                        <hr/>
                    </div>
                    {
                        tel
                        ?
                        <div className="info tel">
                            <p>Telefone:</p>
                            <h3>{tel}</h3>
                            <hr/>
                        </div>
                        :
                        ""
                    }
                    
                    <div className="info email">
                        <p>E-mail:</p>
                        <h3>{email}</h3>
                    </div>
                    {
                        yourID===user.id
                        ?
                        <div className="small">*Todos esses dados podem ser usados por outros usuários para que eles possam te encontrar</div>
                        :""
                    }
                </div>
            
                :
                <div>
                    <form id="changeData" onSubmit={handleChangeFormSubmit}>
                        <fieldset>
                            <label htmlFor="name">Nome:</label>
                            <input
                                id="name"
                                name="name" 
                                type="text"
                                defaultValue={ `${name}`}
                                autoComplete="off"
                                maxLength={50}
                                required
                            />
                        </fieldset>
                        <fieldset>
                            <label htmlFor="tel">Telefone:</label>
                            <input 
                                id="tel"
                                name="tel" 
                                type="text"
                                defaultValue={`${tel}`}
                                autoComplete="off" 
                                maxLength={22}
                            />
                        </fieldset>
                        <div className="buttons">
                            <div className="formButtons">
                                <button 
                                    className="button cancel" 
                                    type="button"
                                    onClick={ () => { setToEdit(false) } }
                                >Cancelar</button>
                                <button className="button confirm" type="submit">Confirmar</button>
                            </div>
                        </div>
                    </form>
                    
                </div>
            }
            
            
            <div className="buttons">

                {   
                    loadStatus === 'processing'
                    ?
                    ""
                    :
                    user.id===yourID
                    ?
                    !toEdit
                    ?
                    <button
                        className="button"
                        onClick={ () => setToEdit(true) }
                    >
                        Editar informações {<FaEdit></FaEdit>}
                    </button>
                    :
                    ""
                    :
                    isFriend
                    ?
                    <Link 
                        to={`/chat/${user.id}`}
                        className="button"
                    >
                        Enviar Mensagem {<FaComment></FaComment>}
                    </Link>
                    :
                    <button 
                        className="button"
                        onClick={handleAddFriendClick}
                    >
                        Adicionar como amigo {<FaPlus></FaPlus>}
                    </button>
                }
                


            </div>
        </div>
    )
}

export default Perfil
