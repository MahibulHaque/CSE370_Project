import Axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Container,
  FileUploadIcon,
  InnerContainer,
  InnerMessageContainer,
  Inputbar,
  InputSection,
  MessageContainer,
} from "./ChatSectionElements";
import backgroundImage from "./jt4AoG.webp";
import { useParams } from "react-router-dom";

const ChatSection = ({ showTextArea }) => {
  const [allMessages, setAllMessages] = useState(null);

  const [messageBody, setMessageBody] = useState("");

  const handleMessageBodyChange = (e) => {
    setMessageBody(e.target.value);
  };
  const handleKeyPress = (e) => {
    if (e.key === "Enter" && messageBody !== "") {
      Axios.post("http://localhost:5000/postMessages", {
        message: messageBody,
        incoming_id: localStorage.getItem("userID"),
        outgoing_id: id,
      }).then((response) => {});
      e.target.value = "";
      setMessageBody("");
    } else {
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
          if (response.data.length > 0) {
            setAllMessages(response.data);
          }
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
                {perMessage.user_id === id && (
                  <div className="other-message">{perMessage.messageBody}</div>
                )}
              </InnerMessageContainer>
            ))}
          </MessageContainer>
          <InputSection>
            <FileUploadIcon></FileUploadIcon>
            <Inputbar
              type="text"
              placeholder="Aa"
              onChange={handleMessageBodyChange}
              onKeyDown={handleKeyPress}
            />
          </InputSection>
        </InnerContainer>
      )}
    </Container>
  );
};

export default ChatSection;
