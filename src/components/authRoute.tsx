import {useState} from 'react'
import {Redirect, Route} from 'react-router-dom'
import isAuthenticated from '../utils/auth'


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

    return <Route {...rest}  render={ (props:any)=>{
        
        if (!auth.ready){
            isAuthenticated()
            .then( (res:boolean|void|string) =>{
                
                setAuth({
                    ready: true,
                    res: res !== false,
                    userId: res || ''
                }) 

            }) 
            .catch( err => console.log(err) )
        }
        
        
        return (
        auth.ready

        ?
        
        ( auth.res === needAuth )
        ?
        <Component {...props} userId={auth.userId.toString()}/>
        :
        <Redirect  to={ needAuth ? '/' : '/menu' }/>
        
        :

        <div> Loading </div>
        
        )
        
    } }
    />
}

export default AuthRoute