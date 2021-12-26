import { useState, createContext, useContext, useRef } from "react";

const UserContext = createContext();
export const useLoggedIn = ()=> useContext(UserContext);

function UserContextProvider(props) {
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  const userValues = useRef(null);

  const value = { userLoggedIn, setUserLoggedIn, userInfo, setUserInfo,userValues };
  return (
    <UserContext.Provider value={value}>
      {props.children}
    </UserContext.Provider>
  );
}
export default UserContextProvider;