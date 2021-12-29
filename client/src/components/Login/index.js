import React, { useEffect, useRef, useState } from "react";
import { Button, IconButton, makeStyles, TextField } from "@material-ui/core";
import Axios from "axios";
import { useNavigate } from "react-router-dom";

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
import { Image } from "@material-ui/icons";

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
    borderRadius: "200px",
  },
  input: {
    display: "none",
  },
});

const Login = () => {
  const uploadInputRef = useRef(null);
  const navigate = useNavigate();

  const classes = useStyles();

  const { setUserLoggedIn, userValues } = useLoggedIn();

  const [signupForm, setSignupForm] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState(null);
  const [email, setEmail] = useState("");
  const formData = new FormData();
  const handleFile = (e) => {
    const file = e.target.files[0];
    formData.append("image", file);
  };

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
          userValues.current = response.data.result[0];
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("userID", response.data.result[0].user_id);
          localStorage.setItem("username", response.data.result[0].username);
          localStorage.setItem(
            "user_email",
            response.data.result[0].user_email
          );
          localStorage.setItem("userPic",`http://localhost:5000/${response.data.result[0].image}`)
          navigate(`/home/${response.data.result[0].user_id}`);
        }
      });
    }
  };

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    if (username && password && email) {
      formData.append("username", username);
      formData.append("user_email", email);
      formData.append("password", password);
      Axios.post("http://localhost:5000/register", formData,{
        headers:{
          'Content-type':'multipart/form-data'
        }
      }).then((response) => {
        console.log(response);
      });
    }
  };

  useEffect(() => {
    Axios.get("http://localhost:5000/login").then((response) => {
      if (response.data.loggedIn) {
        navigate(`/home/${response.data.user.user_id}`);
      }
    });
  }, [navigate]);
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
              <input
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                className={classes.input}
                id="raised-button-field"
                multiple={false}
                ref={uploadInputRef}
                onChange={handleFile}
              />
              <IconButton
                onClick={() =>
                  uploadInputRef.current && uploadInputRef.current.click()
                }
                variant="outlined"
                component="span"
                className={classes.button}
              >
                <Image color="primary" />
                Upload Image
              </IconButton>
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
