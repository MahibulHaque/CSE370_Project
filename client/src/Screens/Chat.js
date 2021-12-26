import React from 'react'
import ChatSection from '../components/ChatSection'
import Sidebar from '../components/Sidebar'

const Chat = ({showTextArea}) => {
    return (
        <div style={{display:'flex'}}>
            <Sidebar />
            <ChatSection showTextArea={showTextArea}/>
        </div>
    )
}

export default Chat
