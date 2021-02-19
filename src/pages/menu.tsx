import {ChangeEvent, useEffect, useState} from 'react'
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
interface MessageType{
    id: number,
    text: string,
    sender: string
}
interface Status{
    chats: 'noRequest' | 'processing' | 'done',
    friends: 'noRequest' | 'processing' | 'done'
}

const Menu = (props:any) =>{

    //states
    const [tab, setTab] = useState(0)
    const [loadStatus, setLoadStatus] = useState<Status>({
        chats: 'noRequest',
        friends: 'noRequest'
    })
    const [chats, setChats] = useState<Array<Chat>>([])
    const [friends, setFriends] = useState([])

    

    //handlers
    const handleRadioTabChange = (event: ChangeEvent<HTMLInputElement>) =>{
        setTab(parseInt(event.target.value))
    }
    const handleSignOutClick = () => {
        localStorage.clear()
        window.location.href = '/'
    }
    const handleReceivedMessage = (brandNewMessage: MessageType, senderId:number, receiverId:number) =>{
        
        let senderIndex
        console.log(chats);
        
        const updateChats = chats.filter( (chat:Chat, index)=>{
            console.log(index);
            
            const isNotTheSender = chat.friendID !== senderId
            if (!isNotTheSender){
                senderIndex = index
            }

            return isNotTheSender
        })
        
        const newChat:Chat = {
            friendID: senderId,
            lastMessage: brandNewMessage.text,
            lastSender: 'friend',
            name:  senderIndex!==undefined ? chats[senderIndex].name : "-> Nova Conversa <-" 
        }
        console.log(newChat);
        
        updateChats.unshift(newChat)
        setChats(updateChats)
    }

    //effects
    const socket = props.socket
    useEffect(()=>{
        //socket listeners
        socket.on('receivedMessage', handleReceivedMessage)
        
        return function cleanup(){
            //evitar memory leak
            socket.removeAllListeners("receivedMessage")
            
        }
    })

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
        
        fetch( process.env.REACT_APP_BACKEND_IP+'/allChats', reqConfig )
        .then( res =>{

            if (res.status === 400){
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
            const div = document.querySelector('#fail')
            if (div){
                div.classList.remove('hide')
                div.classList.add('show')
            }
        })

    }

    if ( loadStatus.friends === 'noRequest' ){

        setLoadStatus({
            chats: loadStatus.chats,
            friends: 'processing'
        })
        
        fetch(  process.env.REACT_APP_BACKEND_IP+ '/allFriends', reqConfig )
        .then( res =>{
            

            if (res.status === 400){
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
            const div = document.querySelector('#fail')
            if (div){
                div.classList.remove('hide')
                div.classList.add('show')
            }
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
                        <svg className='loading' height='100%' width='100%'>
                            <circle
                                className='path' 
                                cx='50%' cy='50%' r='25' 
                                stroke='#07354b' strokeWidth='3' 
                                fill='transparent'
                            ></circle>
                        </svg>
                        :

                        chats.length>0
                        ?
                        chats.map( (chat:Chat) =>{
                            return (
                                <Link 
                                    key={chat.friendID} 
                                    to={`/chat/${chat.friendID}`}
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
                        <svg className='loading' height='100%' width='100%'>
                            <circle
                                className='path' 
                                cx='50%' cy='50%' r='25' 
                                stroke='#07354b' strokeWidth='3' 
                                fill='transparent'
                            ></circle>
                        </svg>
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
                                        <Link to={`/chat/${friend.id}`}>
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