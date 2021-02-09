import {FaTimes} from 'react-icons/fa'
import '../styles/components/fail.css'

const Fail = () =>{

    const handleCloseModalClick = () =>{
        const div = document.querySelector('#fail')
        if (div){
            div.classList.remove('show')
            div.classList.add('hide')
        }
        
    }

    return (
        <div id="fail" className='hide'>
            <div className="failModal">
                <div className='closeModal'>
                    <FaTimes onClick={handleCloseModalClick}></FaTimes>
                </div>
                
                <h1>Erro ao conectar com servidor!</h1>
                <p onClick={()=>{window.location.reload()}} className="reload">
                    Recarregar página?
                </p>
            </div>
        </div>
    )
}

export default Fail