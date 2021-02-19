import {FormEvent, useEffect, useState} from 'react'
import {Link, useHistory, useParams} from 'react-router-dom'
import {Socket} from 'socket.io-client'

import { FaLongArrowAltLeft, FaPaperPlane } from 'react-icons/fa'

import Message from '../components/message'

import '../styles/pages/chat.css'

interface SocketType extends Socket{
    removeAllListeners: Function
} 
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
    socket: SocketType
}

let typing = false

function Chat(props:Props){
    const history = useHistory()
    const params = useParams<Params>()

    //variáveis simples
    const fId = params.fid
    const yId = props.userId
    const socket = props.socket

    //states
    const [messages, setMessages] = useState<Array<MessageType>>([])
    const [friend, setFriend] = useState<Friend>({
        id: +fId,
        name: '...',
        status: ''
    })
    const [loadStatus, setLoadStatus] = useState('noRequest')
    const [sendingMessage, setSendingMessage] = useState(false)

    //effects
    useEffect(()=>{
        //socket listeners
        socket.on('receivedMessage', handleReceivedMessage)
        socket.on('friendStatusChange', handleStatusChange)
        return function cleanup(){
            //evitar memory leak
            socket.removeAllListeners("receivedMessage")
            socket.removeAllListeners("friendStatusChange")
        }
    })
    useEffect ( () =>{
        setLoadStatus('noRequest')
    }, [params])

    //handlers
    const handleReceivedMessage = (brandNewMessage: MessageType, senderId:number, receiverId:number) =>{

        //conferindo se a mensagem deve ir para esse chat
        if ( (senderId === +fId && +receiverId === +yId) || (senderId === +yId && +receiverId === +fId)){
            let previousMessages = messages.map( message => message ) // clonando array
            previousMessages.unshift(brandNewMessage)
            setMessages(previousMessages)
            if (brandNewMessage.sender === 'you')
                setSendingMessage(false)
        }

        
    }

    const handleMessageSubmit = (event: FormEvent) =>{
        event.preventDefault()

        let newMessageDiv:any = document.getElementById('chatInput');
        if (newMessageDiv.value.trim().length === 0 )
            return false

        const data = {
            text: newMessageDiv.value,
            idReceiver: friend.id
        }
        newMessageDiv.value = ""
        socket.emit('changeTypingStatus', fId, false)
        typing = false;
        socket.emit("newMessage", data.text, +fId)

        setSendingMessage(true)

    }

    const handleInputChange = () =>{

        const newMessageDiv:any = document.getElementById('chatInput');
        const texto:String = newMessageDiv.value

        if ( typing && texto.length === 0 ){
            socket.emit('changeTypingStatus', fId, false)
            typing = false;
        }
        else if( !typing && texto.length > 0 ){
            socket.emit('changeTypingStatus', fId, true)
            typing = true
        }

    }

    const handleStatusChange = (status: string, userId:number) =>{
        if (userId === +fId)
            setFriend({
                id: friend.id,
                name: friend.name,
                status
            })
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
        
        fetch( process.env.REACT_APP_BACKEND_IP+'/allMessages/'+fId, reqConfig )
        .then( res =>{

            if (res.status === 400){
                window.location.href = '/'
            }
            else if (res.status === 404)
                window.location.href = '/404'
            else
                return res.json()
            
        })
        .then( (jsonRes) =>{
            
            if (jsonRes){
                const [name, status, messages] = jsonRes
                setFriend({
                    id: friend.id,
                    name,
                    status
                })
                setMessages(messages)
            }
           
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
                    onChange={handleInputChange}
                />
                <button type="submit" className="chatSendButton"><FaPaperPlane className="me"></FaPaperPlane></button>
            </form>
        </div>
    )
}

export default Chat