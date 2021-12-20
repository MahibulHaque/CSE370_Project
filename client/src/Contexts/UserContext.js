import { useState, createContext, useContext } from "react";

const UserContext = createContext();
export const useLoggedIn = ()=> useContext(UserContext);

function UserContextProvider(props) {
  const [userLoggedIn, setUserLoggedIn] = useState(false);

  const value = { userLoggedIn, setUserLoggedIn };
  return (
    <UserContext.Provider value={value}>
      {props.children}
    </UserContext.Provider>
  );
}
export default UserContextProvider;