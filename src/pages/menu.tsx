import {ChangeEvent, useState} from 'react'
import {Link} from 'react-router-dom'

import {FaPlus, FaUserCircle} from 'react-icons/fa'
import {FaComment} from 'react-icons/fa'
import {FaReply} from 'react-icons/fa'

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

const Menu = () =>{

    const [tab, setTab] = useState(0)

    const handleRadioTabChange = async (event: ChangeEvent<HTMLInputElement>) =>{
        setTab(parseInt(event.target.value))
    }

    const yourID = 7
    const chats:Array<Chat> = [
        {
            name: "Roger Machado",
            lastMessage: "Se fuder irmão",
            lastSender: "you",
            friendID: 3
        },
        {
            name: "Michele Obama",
            lastMessage: "Compra um trem pra mim quando for",
            lastSender: "friend",
            friendID: 1
        },
        {
            name: "Cazalbé de Nóbrega",
            lastMessage: "Sem graça",
            lastSender: "friend",
            friendID: 5
        },
        {
            name: "Edinho da Lapa",
            lastMessage: "Ignorante",
            lastSender: "you",
            friendID: 11
        },
        {
            name: "Fernando de Noronha",
            lastMessage: "Queria só te falar que você nunca vai me conhecer kkkkkkk",
            lastSender: "friend",
            friendID: 55
        },
    ];
    const friends:Array<Friend> = [
        {
            id:5,
            name:"Cazalbé de Nóbrega"
        },
        {
            id:2,
            name: "Cleiton da Navalha"
        },
        {
            id:11,
            name:"Edinho da Lapa"
        },
        {
            id:55,
            name:"Fernando de Noronha"
        },
        {
            id:1,
            name:"Michele Obama"
        },
        {
            id:3,
            name: "Roger Machado"
        }
    ]


    return (
        <div id="menuPage">
            <Link to={"/perfil/ID="+yourID}><FaUserCircle className="goToProfile"></FaUserCircle></Link>

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
                                        <Link to={`/perfil/ID=${friend.id}`}>
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

                        <div className="noChats">Você ainda não tem nenhuma conversa</div>

                    }

                    
                        <Link to='/encontrar' className="addNewFriend">Buscar Novos Amigos <FaPlus></FaPlus></Link>

                    
                    
                </div>
                }
                
                
            </div>
        </div>
    )
}

export default Menu