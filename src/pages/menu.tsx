import {ChangeEvent, useState} from 'react'
import {Link} from 'react-router-dom'

import {FaPlus, FaUserCircle, FaSignOutAlt} from 'react-icons/fa'
import {FaComment} from 'react-icons/fa'
import {FaReply} from 'react-icons/fa'

import '../styles/global.css'
import '../styles/pages/menu.css'

interface Chat {
    name: String,
    lastMessage: String,
    lastSender: String,
    friendID: number
}
interface Friend {
    name: String,
    id: number
}
interface Status{
    chats: 'noRequest' | 'processing' | 'done',
    friends: 'noRequest' | 'processing' | 'done'
}

const Menu = (props:any) =>{

    const [tab, setTab] = useState(0)
    const [loadStatus, setLoadStatus] = useState<Status>({
        chats: 'noRequest',
        friends: 'noRequest'
    })
    const [chats, setChats] = useState([])
    const [friends, setFriends] = useState([])

    const handleRadioTabChange = (event: ChangeEvent<HTMLInputElement>) =>{
        setTab(parseInt(event.target.value))
    }
    const handleSignOutClick = () => {
        localStorage.clear()
        window.location.href = '/'
    }

    const yourID = props.userId 
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

    if ( loadStatus.chats === 'noRequest' ){

        setLoadStatus({
            chats: 'processing',
            friends: loadStatus.friends
        })
        
        fetch( 'http://localhost:3300/allChats', reqConfig )
        .then( res =>{

            if (res.status === 400){
                alert('Erro de autenticação')
                return window.location.href = '/'
            }
            
            return res.json()
            
        })
        .then( jsonRes =>{
            
            setChats(jsonRes.map( (chat:Chat) =>{
                return{
                    friendID: chat.friendID,
                    lastMessage: chat.lastMessage,
                    lastSender: chat.lastSender,
                    name: chat.name
                }
            }))

            setLoadStatus({
                chats: 'done',
                friends: loadStatus.friends
            })
            
        })
        .catch( err =>{
            console.log(err);
            alert('Erro no servidor')
        })

    }

    if ( loadStatus.friends === 'noRequest' ){

        setLoadStatus({
            chats: loadStatus.chats,
            friends: 'processing'
        })
        
        fetch( 'http://localhost:3300/allFriends', reqConfig )
        .then( res =>{
            

            if (res.status === 400){
                alert('Erro de autenticação')
                return window.location.href = '/'
            }
            
            return res.json()
            
        })
        .then( jsonRes =>{
            
            setFriends(jsonRes.map( (friend:Friend) =>{
                return{
                    id: friend.id,
                    name: friend.name
                }
            }))

            setLoadStatus({
                chats: loadStatus.chats,
                friends: 'done'
            })
            
        })
        .catch( err =>{
            console.log(err);
            alert('Erro no servidor')
        })


    }




    return (
        <div id="menuPage">
            
            <Link to={"/perfil/"+yourID} className="goToProfile"><FaUserCircle></FaUserCircle></Link>
            <div onClick={handleSignOutClick} className="signOut"><FaSignOutAlt></FaSignOutAlt></div>
            
            <div className="tabs">
                <input 
                    type="radio" 
                    name="tabs" 
                    id="radioTabChat"
                    value={0}
                    onChange={handleRadioTabChange}
                />
                <label 
                    htmlFor="radioTabChat"
                    id="tabChats"
                    className={"tabChats "+ ((tab===0)?"tabSelected":"")}
                >Conversas</label>
                <input 
                    type="radio" 
                    name="tabs" 
                    id="radioTabFriends"
                    value={1}
                    onChange={handleRadioTabChange}
                />
                <label
                    htmlFor="radioTabFriends"
                    id="tabFriends"
                    className={"tabFriends "+ ((tab===1)?"tabSelected":"")}
                >Amigos</label>
            </div>
            <div className="content">
                {tab===0
                ?
                <div id="chatsDiv">

                    {

                        loadStatus.chats !== 'done'
                        ?
                        <div>Loading</div>
                        :

                        chats.length>0
                        ?
                        chats.map( (chat:Chat) =>{
                            return (
                                <Link 
                                    key={chat.friendID} 
                                    to={`/chat/yID=${yourID}/fID=${chat.friendID}`}
                                    className="chat"
                                >
                                    <div className="name">
                                        {chat.name}
                                    </div>
                                    <div className="lastMessage">
                                        {chat.lastSender==="you" ? <FaReply className="sentIcon"></FaReply> : ""}
                                        
                                        {chat.lastMessage}
                                    </div>
                                </Link>
                            )
                        } )
                        
                        :
                        <div className="noChats">Você ainda não tem nenhuma conversa</div>

                        

                    }
                    
                    
                </div>
                :
                <div id="friendsDiv">

                    {

                        loadStatus.friends !== 'done'
                        ?
                        <div>Loading</div>
                        :

                        friends.length>0
                        ?
                        friends.map( (friend:Friend) =>{
                            return (
                                <div
                                    key={friend.id}
                                    className="friend"
                                >
                                    <div className="name">
                                        {friend.name}
                                    </div>
                                    <div className="buttons">
                                        <Link to={`/perfil/${friend.id}`}>
                                            <FaUserCircle className="friendButton"></FaUserCircle>
                                        </Link>
                                        <Link to={`/chat/yID=${yourID}/fID=${friend.id}`}>
                                            <FaComment className="friendButton"></FaComment>
                                        </Link>
                                    </div>
                                </div>
                            )
                        } )
                        
                        :

                        <div className="noChats">Você ainda não tem nenhum amigo adicionado</div>

                    }

                    
                        <Link to='/encontrar' className="addNewFriend">Buscar Novos Amigos <FaPlus></FaPlus></Link>

                    
                    
                </div>
                }
                
                
            </div>
        </div>
    )
}

export default Menu