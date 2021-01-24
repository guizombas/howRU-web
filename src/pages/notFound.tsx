import {Link} from 'react-router-dom'
import '../styles/pages/notFound.css'
import imageCrow from '../images/corvo.gif'

const NotFound = () =>{
    return (
        <div id="page404">
            <h1>Página não encontrada</h1>
            <img src={imageCrow} alt="corvo"/>
            <Link className="toHomePage" to='/'>Página inicial</Link>
        </div>
    )
}

export default NotFound