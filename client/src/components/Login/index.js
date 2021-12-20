import React, { useEffect, useState } from "react";
import { Button, makeStyles, TextField } from "@material-ui/core";
import Axios from "axios";

import {
  Container,
  MainContainer,
  HeaderTag,
  BottomTag,
  Form,
  ButtonHolder,
  ImageContainer,
} from "./LoginElements";
import { useLoggedIn } from "../../Contexts/UserContext";

const useStyles = makeStyles({
  field: {
    marginTop: 20,
    marginBottom: 20,
    display: "block",
  },
  button: {
    paddingBlock: 10,
    paddingInline: "25px",
    fontSize: "1.4rem",
    fontWeight: 700,
    textTransform: "none",
  },
});

const Login = () => {
  const classes = useStyles();
  const { userLoggedIn, setUserLoggedIn } = useLoggedIn();

  const [signupForm, setSignupForm] = useState(false);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  Axios.defaults.withCredentials = true;
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (username && password) {
      Axios.post("http://localhost:5000/login", {
        username: username,
        password: password,
      }).then((response) => {
        if (!response.data.auth) {
          setUserLoggedIn(false);
        } else {
          console.log(response.data);
          setUserLoggedIn(true);
          localStorage.setItem("token", response.data.token);
        }
      });
    }
  };


  const handleSignupSubmit = (e) => {
    e.preventDefault();
    if (username && password && email) {
      console.log(username, email);
      Axios.post("http://localhost:5000/register", {
        username: username,
        email: email,
        password: password,
      }).then((response) => {
        console.log(response);
      });
    }
  };

  useEffect(() => {
    Axios.get("http://localhost:5000/login").then((response) => {
      console.log(response);
    });
  }, []);
  return (
    <>
      <Container>
        <MainContainer>
          <HeaderTag>Hang out anytime, anywhere</HeaderTag>
          <BottomTag>
            Muktobani makes it easy and fun to stay close to your favorite
            people.
          </BottomTag>
          {!signupForm && (
            <Form noValidate autoComplete="off" onSubmit={handleLoginSubmit}>
              <TextField
                className={classes.field}
                variant="outlined"
                label="Username"
                color="primary"
                fullWidth
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
              />
              <TextField
                className={classes.field}
                type="password"
                variant="outlined"
                label="Password"
                color="primary"
                fullWidth
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              <ButtonHolder>
                <Button
                  className={classes.button}
                  type="submit"
                  variant="contained"
                  color="primary"
                >
                  Log In
                </Button>
                <div>
                  Don't have an account?
                  <span
                    onClick={() => {
                      setSignupForm(!signupForm);
                      setPassword("");
                      setUsername("");
                    }}
                  >
                    Sign up
                  </span>
                </div>
              </ButtonHolder>
            </Form>
          )}
          {signupForm && (
            <Form noValidate autoComplete="off" onSubmit={handleSignupSubmit}>
              <TextField
                className={classes.field}
                type="text"
                variant="outlined"
                label="Username"
                color="primary"
                fullWidth
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
              />
              <TextField
                type="email"
                className={classes.field}
                variant="outlined"
                label="Email"
                color="primary"
                fullWidth
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              <TextField
                className={classes.field}
                type="password"
                variant="outlined"
                label="Password"
                color="primary"
                fullWidth
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              <ButtonHolder>
                <Button
                  className={classes.button}
                  type="submit"
                  variant="contained"
                  color="primary"
                >
                  Register
                </Button>
                <div>
                  Already have an account?
                  <span
                    onClick={() => {
                      setSignupForm(!signupForm);
                      setPassword("");
                      setUsername("");
                    }}
                  >
                    Sign In
                  </span>
                </div>
              </ButtonHolder>
            </Form>
          )}
        </MainContainer>
        <ImageContainer>
          <img
            className="hero__image"
            src="https://scontent.fdac116-1.fna.fbcdn.net/v/t39.8562-6/120973513_338186077283942_8148888802958728934_n.png?_nc_cat=1&ccb=1-5&_nc_sid=6825c5&_nc_ohc=z5-grmXufzEAX8cuI3r&_nc_ht=scontent.fdac116-1.fna&oh=00_AT_sORfB2EJg6zEV505TRtbWqxlQ3R-b4Xbp8PII29POmw&oe=61BF66E7"
            alt="hero"
          />
        </ImageContainer>
      </Container>
    </>
  );
};

export default Login;
