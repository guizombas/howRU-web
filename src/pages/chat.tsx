import {FormEvent, useState} from 'react'
import {Link, useHistory, useParams} from 'react-router-dom'
import {Socket} from 'socket.io-client'

import { FaLongArrowAltLeft, FaPaperPlane } from 'react-icons/fa'

import Message from '../components/message'

import '../styles/pages/chat.css'


interface Params{
    fid: string
}
interface MessageType{
    id: number,
    text: string,
    sender: string
}
interface Friend{
    name: string,
    status: string,
    id: number
}
interface Props{
    userId: number,
    socket: Socket
}

function Chat(props:Props){
    const history = useHistory()
    const params = useParams<Params>()

    const fId = params.fid
    const socket = props.socket
    

    const [messages, setMessages] = useState<Array<MessageType>>([])
    const [friend, setFriend] = useState<Friend>({
        id: +fId,
        name: '...',
        status: ''
    })
    const [loadStatus, setLoadStatus] = useState('noRequest')
    const [sendingMessage, setSendingMessage] = useState(false)

    const handleMessageSubmit = (event: FormEvent) =>{
        event.preventDefault()

        let previousMessages = messages.map( message => message ) // clonando array
        let newMessageDiv:any = document.getElementById('chatInput');

        if (newMessageDiv.value.trim().length === 0 )
            return false

        const token = localStorage.getItem('accessToken')

        const data = {
            text: newMessageDiv.value,
            idReceiver: friend.id
        }
        newMessageDiv.value = ""
        const reqConfig:RequestInit = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'authorization': token || ''
            },
            body: JSON.stringify(data)
        }
        socket.emit("newMessage", data.text, fId)
/*
        fetch(`${process.env.REACT_APP_BACKEND_IP}/newMessage`, reqConfig)
        .then( res =>{

            if (res.status === 400){
                alert('Erro de autenticação')
                window.location.href = '/'
            }
            else if (res.status === 201){

                const newMessage:MessageType = {
                    id: new Date().getTime(),
                    text: data.text,
                    sender: "you"
                }
                previousMessages.unshift(newMessage)
                setMessages(previousMessages)
                setSendingMessage(false)

            }

        })
        .catch( err =>{
            console.log(err);
            alert('Erro no servidor')
            
        })
*/
        setSendingMessage(true)

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

    socket.on('receivedMessage', (brandNewMessage: MessageType)=>{
        let previousMessages = messages.map( message => message ) // clonando array
        previousMessages.unshift(brandNewMessage)
        setMessages(previousMessages)
        if (brandNewMessage.sender === 'you')
            setSendingMessage(false)
    })

    if ( loadStatus === 'noRequest' ){

        setLoadStatus('processing')
        
        fetch( process.env.REACT_APP_BACKEND_IP+'/allMessages/'+fId, reqConfig )
        .then( res =>{

            if (res.status === 400){
                alert('Erro de autenticação')
                window.location.href = '/'
            }
            else if (res.status === 404)
                window.location.href = '/404'
            else
                return res.json()
            
        })
        .then( (jsonRes) =>{
            
            if (jsonRes){
                const [name, messages] = jsonRes
                setFriend({
                    id: friend.id,
                    name: name,
                    status: 'offline'
                })
                setMessages(messages)
            }
           
            setLoadStatus('done')
            
        })
        .catch( err =>{
            console.log(err);
            alert('Erro no servidor')
        })

    }

    return(
        <div id="chatPage">

            <div className="chatHeader">
                <FaLongArrowAltLeft className="goBack" onClick={ () => history.goBack() }></FaLongArrowAltLeft>
                <Link to={"/perfil/"+friend.id} className="nameStatus">
                    <div className="name">{friend.name}</div>
                    <div className="status">{friend.status}</div>
                </Link>
            </div>

            <div className="chatBody">

                {
                sendingMessage
                ?
                <div>Enviando</div>
                :
                ''
                }

                {
                loadStatus !== 'done'
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