import "./App.css";
import { createTheme, ThemeProvider } from "@material-ui/core";
import { blue, green } from "@material-ui/core/colors";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login";

const theme = createTheme({
  palette: {
    primary: blue,
    secondary: green,
  },
  typography: {
    fontFamily: "Helvetica",
    fontSize: 20,
  },
  shape: {
    borderRadius: 1000,
  },
});

function App() {
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <Routes>
          <Route path="/" element={<Login />}></Route>
        </Routes>
      </ThemeProvider>
    </Router>
  );
}

export default App;
