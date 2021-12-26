import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-grow: 1;
  background-repeat: repeat;
  background-size: contain;
`;

export const InnerContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
`;
export const InputSection = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  padding-block: 1rem;
`;

export const FileUploadIcon = styled.div``;
export const Inputbar = styled.textarea`
  width: 60%;
  padding: 10px;
  font-size: 1.6rem;
  border-radius: 200px;
  border: none;
  outline: none;
  resize: none;
  height: 40px;
  &::-webkit-scrollbar {
    display: none;
  }
  &:focus-within {
    border: 2px solid var(--blue-1);
  }
`;

export const MessageContainer = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  max-height: 80vh;
  width: 100%;
  margin-block: 10px;

  & .start_message{
    font-size:1.4rem;
    background-color:lightgreen;
    padding:10px;
    border-radius:20px;
    position:absolute;
    bottom:20%;
    left:50%;
  }
`;

export const InnerMessageContainer = styled.div`
    font-size:1.4rem;
    & .other-message{
        float: left;
        background-color:var(--grey-1);
        padding:10px;
        border-radius:20px;
        margin-left:40px;
        max-width:300px;
        margin-bottom:20px;
    }
    & .user-message{
        float: right;
        background-color:var(--blue-1);
        padding:10px;
        border-radius:20px;
        margin-right:40px;
        color:var(--white);
        max-width:300px;
        margin-bottom:20px;
    }

`;
