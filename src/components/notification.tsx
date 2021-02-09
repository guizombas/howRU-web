import { Link } from 'react-router-dom'

import { FaEnvelope} from 'react-icons/fa'
import '../styles/components/notification.css'

const Notification = (props: any) =>{

    const senderId = props.senderId

    return (
        <div id="notification">
            <Link onClick={props.onClick} to={"/chat/"+senderId} className="notificationModal">
                <FaEnvelope></FaEnvelope>
            </Link>
        </div>
    )
}

export default Notification