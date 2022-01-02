import "./App.css";
import { createTheme, ThemeProvider } from "@material-ui/core";
import { blue, red } from "@material-ui/core/colors";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login";

import UserContextProvider from "./Contexts/UserContext";
import Chat from "./Screens/Chat";

const theme = createTheme({
  palette: {
    primary: blue,
    secondary: red,

  },
  typography: {
    fontFamily: "Helvetica",
    fontSize: 20,
  },
  shape:{
    borderRadius:"2em"
  }

});

function App() {
  return (
    <UserContextProvider>
      <Router>
        <ThemeProvider theme={theme}>
          <Routes>
            <Route path="/" element={<Login />}></Route>
            <Route path="/home/:id"  element={<Chat showTextArea={false}/>} />
            <Route path="/t/:id"  element={<Chat showTextArea={true} groupSection={false}/>} />
            <Route path="/g/:id"  element={<Chat showTextArea={true} groupSection={true}/>} />
          </Routes>
        </ThemeProvider>
      </Router>
    </UserContextProvider>
  );
}

export default App;
