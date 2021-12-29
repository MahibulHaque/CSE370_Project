import Axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Container,
  InnerContainer,
  InnerMessageContainer,
  Inputbar,
  InputSection,
  MessageContainer,
} from "./ChatSectionElements";
import backgroundImage from "./jt4AoG.webp";
import { useParams } from "react-router-dom";
import { FaLock } from "react-icons/fa";
import { AddCircle, InsertPhoto,Gif, Layers, ThumbUp } from "@material-ui/icons";
import { IconButton } from "@material-ui/core";

const ChatSection = ({ showTextArea }) => {
  const [allMessages, setAllMessages] = useState(null);
  const [starterMessage, setStarterMessage] = useState(null);

  const [messageBody, setMessageBody] = useState("");

  const handleMessageBodyChange = (e) => {
    setMessageBody(e.target.value);
  };
  const handleKeyPress = (e) => {
    if (e.keyCode === 13 && messageBody.length > 0 && !e.shiftKey) {
      Axios.post("http://localhost:5000/postMessages", {
        message: messageBody,
        incoming_id: localStorage.getItem("userID"),
        outgoing_id: id,
      }).then((response) => {});
      e.target.value = "";
      setMessageBody("");
    }
  };

  const { id } = useParams();

  useEffect(() => {
    const intervalTime = setInterval(() => {
      Axios.post("http://localhost:5000/getMessages", {
        incoming_id: localStorage.getItem("userID"),
        outgoing_id: id,
      }).then((response) => {
        if (response.status === 201) {
          setStarterMessage(null);
          if (response.data.length > 0) {
            setAllMessages(response.data);
          }
        } else if (response.status === 200) {
          setAllMessages(null);
          setStarterMessage(response.data);
        }
      });
    }, 2000);

    return () => clearInterval(intervalTime);
  }, [id, allMessages]);

  return (
    <Container style={{ backgroundImage: `url(${backgroundImage})` }}>
      {showTextArea && (
        <InnerContainer>
          <MessageContainer>
            {allMessages?.map((perMessage, i) => (
              <InnerMessageContainer>
                {perMessage.user_id !== id && (
                  <div className="user-message">{perMessage.messageBody}</div>
                )}
                {perMessage.user_id === id && (<div className="everything-holder"><img src={`http://localhost:5000/${perMessage.image}`} alt="image"/>
                  <div className="other-message">{perMessage.messageBody}</div></div>
                  
                )}
              </InnerMessageContainer>
            ))}
            {starterMessage !== null && (
              <div className="start_message">
                <span style={{ marginRight: "5px" }}>
                  <FaLock style={{ width: "12px", height: "auto" }} />
                </span>
                {starterMessage}! No message available.
              </div>
            )}
          </MessageContainer>
          <InputSection>
            <IconButton>
              <AddCircle color="primary" fontSize="medium" />
            </IconButton>
            <IconButton>
              <InsertPhoto color="primary" fontSize="medium" />
            </IconButton>
            <IconButton>
              <Layers color="primary" fontSize="medium" />
            </IconButton>
            <IconButton>
              <Gif color="primary" fontSize="large" />
            </IconButton>
            <Inputbar
              type="text"
              placeholder="Aa"
              onChange={handleMessageBodyChange}
              onKeyDown={handleKeyPress}
            />
            <IconButton>
              <ThumbUp color="primary" fontSize="medium" />
            </IconButton>
          </InputSection>
          
        </InnerContainer>
      )}
    </Container>
  );
};

export default ChatSection;
