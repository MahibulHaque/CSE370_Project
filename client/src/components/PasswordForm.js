import { Button, makeStyles, TextField } from "@material-ui/core";
import React, { useState } from "react";
import Axios from "axios";
import { useParams } from "react-router-dom";

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

});

const PasswordForm = () => {
  const classes = useStyles();
  const [password, setpassword] = useState("");
  const {id} = useParams();

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    if (password) {
      Axios.post("http://localhost:5000/joinGroup", {
        password: password,
        group_id:id,
        user_id: localStorage.getItem("userID"),
        username:localStorage.getItem("username")
      }).then((response) => {
        alert(response.data.msg);
      });
    }
  };
  return (
    <>
      <form noValidate autoComplete="off" onSubmit={handleSignupSubmit}>
        <TextField
          classpassword={classes.field}
          type="password"
          variant="outlined"
          label="Group password"
          color="primary"
          fullWidth
          onChange={(e) => {
            setpassword(e.target.value);
          }}
          required
        />

        <Button
          classpassword={classes.button}
          type="submit"
          variant="contained"
          color="primary"
        >
          Request
        </Button>
      </form>
    </>
  );
};

export default PasswordForm;