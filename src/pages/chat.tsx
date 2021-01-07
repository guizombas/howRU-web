import {FormEvent, useState} from 'react'
import {Link, useHistory, useParams} from 'react-router-dom'

import { FaLongArrowAltLeft, FaPaperPlane } from 'react-icons/fa'

import Message from '../components/message'

import '../styles/pages/chat.css'


interface Params{
    yid: string,
    fid: string
}
interface MessageType{
    id: number,
    text: string,
    sender: string
}

function Chat(){
    const history = useHistory()
    const params = useParams<Params>()

    const friend = {
        name: "Fulano da Silva Pereira Rodrigues",
        status: "Offline",
        id: params.fid
    }

    const allMessages = [
        {
            id: 1,
            text: "Falou então mano",
            sender: "friend"
        },
        {
            id: 11,
            text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur, odio.",
            sender: "you"
        },
        {
            id: 2,
            text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur, odio. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Reprehenderit facere animi beatae voluptas. Expedita qui, voluptatem veniam, ut sequi, cum excepturi delectus eius non commodi illum dolorum ab assumenda quis ducimus nulla sit impedit! Quae, est ullam asperiores quo, esse nisi expedita rerum placeat recusandae tenetur architecto, excepturi assumenda. Atque.",
            sender: "you"
        },
        {
            id: 3,
            text: "Lorem ipsum dolor sit amet consectetur adipisicing elit.quatur, odio.",
            sender: "friend"
        },
        {
            id: 4,
            text: "Lorem ipsum dolor sing elit. Consequatur, odio.",
            sender: "you"
        },
        {
            id: 5,
            text: "Lorem ipsum dolor sit amet consectetur adipisicing elit odio.",
            sender: "friend"
        },
        {
            id: 6,
            text: "it amet consectetur adipisicing elit. Consequatur, odio.",
            sender: "friend"
        },
        {
            id: 7,
            text: "Lorem ipsum dolor sit amet consectetur adipisicing uatur, odio.",
            sender: "you"
        },
        {
            id: 8,
            text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur, odio.",
            sender: "you"
        },
        {
            id: 9,
            text: "coe",
            sender: "friend"
        },
        {
            id: 10,
            text: "coe menor",
            sender: "you"
        },
    ]

    const [messages, setMessages] = useState(allMessages)

    console.log("arrozDoce")

    const handleMessageSubmit = (event: FormEvent) =>{
        event.preventDefault()

        let previousMessages = messages.map( message => message ) // clonando array
        let newMessageDiv:any = document.getElementById('chatInput');
        const newMessage:MessageType = {
            id: 56,
            text: newMessageDiv.value,
            sender: "you"
        }
        newMessageDiv.value = ""
        
        previousMessages.unshift(newMessage)
        setMessages(previousMessages)

    }

    return(
        <div id="chatPage">

            <div className="chatHeader">
                <FaLongArrowAltLeft className="goBack" onClick={ () => history.goBack() }></FaLongArrowAltLeft>
                <Link to={"/perfil/ID="+friend.id} className="nameStatus">
                    <div className="name">{friend.name}</div>
                    <div className="status">{friend.status}</div>
                </Link>
            </div>

            <div className="chatBody">
                {
                    messages.map( message =>{
                        return(
                            <Message
                                key={message.id}
                                sender={message.sender}
                                text={message.text}
                            ></Message>
                        )
                    } )
                }
            </div>

            <form className="chatFooter" onSubmit={handleMessageSubmit}>
                <input 
                    type="text" 
                    className="chatInput"
                    id="chatInput"
                    placeholder="Digite sua mensagem"
                    autoComplete="off"
                />
                <button type="submit" className="chatSendButton"><FaPaperPlane className="me"></FaPaperPlane></button>
            </form>
        </div>
    )
}

export default Chat