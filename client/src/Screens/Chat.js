import React from 'react'
import ChatSection from '../components/ChatSection'
import GroupChatSection from '../components/GroupChatSection'
import Sidebar from '../components/Sidebar'

const Chat = ({showTextArea,groupSection}) => {
    return (
        <div style={{display:'flex'}}>
            <Sidebar />
            {!groupSection&&(
            <ChatSection showTextArea={showTextArea}/>)}
            {groupSection && (
                <GroupChatSection showTextArea={showTextArea} />
            )}
        </div>
    )
}

export default Chat
