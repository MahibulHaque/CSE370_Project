import Axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Container,
  InnerContainer,
  InnerMessageContainer,
  Inputbar,
  InputSection,
  MessageContainer,
  Topbar,
} from "./GroupSectionElements";
import backgroundImage from "./jt4AoG.webp";
import { useParams } from "react-router-dom";
import { FaLock } from "react-icons/fa";
import {
  AddCircle,
  InsertPhoto,
  Gif,
  Layers,
  ThumbUp,
} from "@material-ui/icons";
import { Button, IconButton } from "@material-ui/core";
import DialogComponentPassword from "../DialogComponentPassword";
import PasswordForm from "../PasswordForm";

const GroupChatSection = ({ showTextArea }) => {
  const [groupInfo, setGrpInfo] = useState(null);
  const [allMessages, setAllMessages] = useState(null);
  const [starterMessage, setStarterMessage] = useState(null);

  const [messageBody, setMessageBody] = useState("");

  const [inGroup, setInGroup] = useState(false);

  const [openPasswordPopup, setOpenPasswordPopup] = useState(false);

  const handleMessageBodyChange = (e) => {
    setMessageBody(e.target.value);
  };
  const handleKeyPress = (e) => {
    if (e.keyCode === 13 && messageBody.length > 0 && !e.shiftKey) {
      Axios.post("http://localhost:5000/postGroupMessage", {
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
    Axios.get(`http://localhost:5000/getGroupInfo/${id}`).then((response) => {
      setGrpInfo(response.data[0]);
      console.log(response);
    });
  }, [id]);

  useEffect(() => {
    Axios.post(`http://localhost:5000/groupUser/${id}`, {
      userID: localStorage.getItem("userID"),
    }).then((response) => {
      console.log(response);
      if (response.data.Ingrp) {
        setInGroup(true);
      } else {
        setInGroup(false);
      }
    });
  }, [id]);

  useEffect(() => {
    const intervalTime = setInterval(() => {
      Axios.get(`http://localhost:5000/getGroupMessages/${id}`, {}).then(
        (response) => {
          if (response.status === 201) {
            setStarterMessage(null);
            if (response.data.length > 0) {
              setAllMessages(response.data);
            }
          } else if (response.status === 200) {
            setAllMessages(null);
            setStarterMessage(response.data.msg);
          }
        }
      );
    }, 2000);

    return () => clearInterval(intervalTime);
  }, [id, allMessages]);

  return (
    <Container style={{ backgroundImage: `url(${backgroundImage})` }}>
      <Topbar>
        <img
          src={`http://localhost:5000/${groupInfo?.group_image}`}
          alt="Group_image"
        />
        <h1>{groupInfo?.group_name}</h1>
        {!inGroup && (
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              setOpenPasswordPopup(true);
            }}
          >
            Join
          </Button>
        )}
      </Topbar>
      <DialogComponentPassword
        title="Join group"
        openPasswordPopup={openPasswordPopup}
        setOpenPasswordPopup={setOpenPasswordPopup}
      >
        <PasswordForm />
      </DialogComponentPassword>
      {(inGroup &&
        showTextArea) && (
          <InnerContainer>
            <MessageContainer>
              {allMessages?.map((perMessage, i) => (
                <InnerMessageContainer key={i}>
                  {perMessage.incoming_msg_id === localStorage.getItem("userID") && (
                    <div className="user-message">{perMessage.messageBody}</div>
                  )}
                  {perMessage.incoming_msg_id !== localStorage.getItem("userID") && (
                    <div className="everything-holder">
                      <img
                        src={`http://localhost:5000/${perMessage.image}`}
                        alt="Profile"
                      />
                      <div className="other-message">
                        {perMessage.messageBody}
                      </div>
                    </div>
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

export default GroupChatSection;
