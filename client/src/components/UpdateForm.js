import { Button, makeStyles, TextField } from "@material-ui/core";
import React, { useState } from "react";
import Axios from "axios";

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

const UpdateForm = () => {
  const classes = useStyles();
  const [name, setName] = useState("");

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    if (name) {
      Axios.put("http://localhost:5000/updateName", {
        newName: name,
        id: localStorage.getItem("userID"),
      }).then((response) => {
        alert(response.data.msg);
      });
    }
  };
  return (
    <>
      <form noValidate autoComplete="off" onSubmit={handleSignupSubmit}>
        <TextField
          className={classes.field}
          type="text"
          variant="outlined"
          label="New Name"
          color="primary"
          fullWidth
          onChange={(e) => {
            setName(e.target.value);
          }}
          required
        />

        <Button
          className={classes.button}
          type="submit"
          variant="contained"
          color="primary"
        >
          Update
        </Button>
      </form>
    </>
  );
};

export default UpdateForm;
