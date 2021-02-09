import {useState} from 'react'
import {Redirect, Route} from 'react-router-dom'
import isAuthenticated from '../utils/auth'
import {io, Socket} from 'socket.io-client'
import Fail from './fail'

import '../styles/global.css'

interface Auth{
    ready: boolean,
    res: boolean | void,
    userId: string | boolean
}

const AuthRoute = ( params:any ) =>{

    const {component: Component, needAuth , ...rest} = params
    const [ auth, setAuth ] = useState<Auth>({
        ready: false,
        res: false,
        userId: ''
    })
    const [ socket, setSocket ] = useState<undefined|Socket>()

    return <Route {...rest}  render={ (props:any)=>{
        if (!auth.ready){
            isAuthenticated()
            .then( (res:boolean|void|string) =>{

                if (res != undefined){

                    if (res && !socket)
                    setSocket( io('http://localhost:3300', { auth: {token: res} } ))

                    setAuth({
                        ready: true,
                        res: res !== false,
                        userId: res || ''
                    })

                }
                    
                

            }) 
            .catch( err => console.log(err) )
        }
        
        
        return (
        auth.ready

        ?
        
        ( auth.res === needAuth )
        ?
        <div className="authDiv">
            <Component {...props} userId={auth.userId.toString()} socket={socket}/>
            
        </div>
        
        :
        <Redirect  to={ needAuth ? '/' : '/menu' }/>
        
        :

        <div className="authDiv">
            <svg className='loading' height='100%' width='100%'>
                <circle
                    className='path' 
                    cx='50%' cy='50%' r='25' 
                    stroke='#07354b' strokeWidth='3' 
                    fill='transparent'
                ></circle>
            </svg>
            <Fail></Fail>
        </div>
        
        
        )
        
    } }
    />
}

export default AuthRoute