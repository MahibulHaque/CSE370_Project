import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-grow: 1;
  background-repeat: repeat;
  background-size: contain;
  flex-direction:column;
`;
export const Topbar = styled.div`
    display:flex;
    width:100%;
    justify-content:space-evenly;
    align-items:center;
    height:60px;
    background-color:var(--highlight);

    &>img{
        height:40px;
        width:40px;
        border-radius:50%;
    }

    &>h1{
        font-size:1.4rem;
    }
`
export const InnerContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  flex-grow:1;
`;
export const InputSection = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  padding-block: 1rem;
  background-color: var(--highlight);
`;

export const Inputbar = styled.textarea`
  flex-grow: 1;
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

  & .start_message {
    font-size: 1.4rem;
    background-color: lightgreen;
    padding: 10px;
    border-radius: 20px;
    position: absolute;
    bottom: 20%;
    left: 50%;
  }
`;

export const InnerMessageContainer = styled.div`
  font-size: 1.4rem;
  & .everything-holder {
    display: flex;
    align-items: center;
    margin-bottom: 20px;

    & > img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      margin-inline: 20px;
    }
  }

  & .other-message {
    float: left;
    background-color: var(--grey-1);
    padding: 10px;
    border-radius: 20px;
    max-width: 300px;
  }
  & .user-message {
    float: right;
    background-color: var(--blue-1);
    padding: 10px;
    border-radius: 20px;
    margin-right: 40px;
    color: var(--white);
    max-width: 300px;
    margin-bottom: 20px;
  }
`;