

import '../styles/components/message.css'

interface Props{
    text: String,
    sender: String
}

const Message = ( props: Props ) => {

    const text = props.text
    const sender = props.sender

    return (
        <div className={"message sentBy"+sender}>
            <div className="messageBaloon">
                {text}
            </div>
        </div>
    )
}

export default Message