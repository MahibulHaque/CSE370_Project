import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 1600px;
  width: 80%;
  flex-wrap: wrap;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;
export const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  max-width: 700px;
`;

export const HeaderTag = styled.h1`
  font-size: clamp(40px, 6vw, 90px);
  text-align: left;
  padding: 15px 0 10px;
  background: linear-gradient(to right, #007fff, #0059b2);
  -webkit-background-clip: text;
  background-clip:text;
  color:transparent;
  -webkit-text-fill-color: transparent;
`;

export const BottomTag = styled.div`
  font-size: 16px;
  color: var(--grey-1);
  padding: 5px 0px;
  margin: 0px 0px 38px;
  text-align: left;
  line-height: 2.5rem;
`;

export const Form = styled.form`
  max-width: 400px;
  width: 100%;
`;
export const ButtonHolder = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  & > div {
    font-size: 1.4rem;
    & > span {
      color: var(--blue-1);
      cursor: pointer;
    }
  }
`;

export const ImageContainer = styled.div`
  display: flex;
  & > img {
    width: 600px;
    height: auto;
  }
`;
