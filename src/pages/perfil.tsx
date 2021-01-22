import { FormEvent, useState } from 'react'
import {Link, useHistory} from 'react-router-dom'

import {FaLongArrowAltLeft, FaEdit, FaPlus, FaComment} from 'react-icons/fa'

import '../styles/global.css'
import '../styles/pages/perfil.css'

interface User{
    name: String,
    id: number,
    yourID: number,
    tel: String,
    email: String,
    isYourFriend: Boolean, 
}

function Perfil(){
    const history = useHistory()

    
    const user:User = {
        name: "Guilherme Gabriel Silva Pereira",
        id: 8,
        yourID: 7,
        tel: "37998343632",
        email: "guigui@gmail.com",
        isYourFriend: true
    }
    const yourID = user.yourID; 

    const [isFriend, setIsFriend] = useState<Boolean>(user.isYourFriend)
    const [toEdit, setToEdit] = useState(false)
    const [name, setName] = useState(user.name)
    const [tel, setTel] = useState(user.tel)


    const handleAddFriendClick = () =>{
        //código de adicionar como amigo
        user.isYourFriend = true
        setIsFriend(true)
    }
    const handleChangeFormSubmit = (event:FormEvent) =>{
        event.preventDefault()
        //código de alterar os dados

        const name:any = document.getElementById('name')
        const tel:any = document.getElementById('tel')

        setName(name.value);
        setTel(tel.value);

        setToEdit(false)

    }
    

    return(
        <div id="perfil">
            <div className="goBack" onClick={()=>{history.goBack()}}>
                <FaLongArrowAltLeft></FaLongArrowAltLeft>
            </div>
            {
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
                        <h3>{user.email}</h3>
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
                        to={`/chat/yID=${yourID}/fID=${user.id}`}
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
