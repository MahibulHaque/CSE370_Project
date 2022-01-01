import { Button, IconButton, makeStyles, TextField } from "@material-ui/core";
import { Image } from "@material-ui/icons";
import React, { useRef, useState } from "react";
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

const GroupCreateForm = () => {
  const uploadInputRef = useRef(null);

  const classes = useStyles();

  const [name, setName] = useState("");
  const [password, setPassword] = useState(null);
  const formData = new FormData();
  const handleFile = (e) => {
    const file = e.target.files[0];
    formData.append("image", file);
  };
  const handleSignupSubmit = (e) => {
    e.preventDefault();
    if (name && password) {
      formData.append("name", name);
      formData.append("password", password);
      formData.append('creatorID',localStorage.getItem("userID"))
      formData.append('creatorName',localStorage.getItem("username"))
      Axios.post("http://localhost:5000/createGroup", formData, {
        headers: {
          "Content-type": "multipart/form-data",
        },
      }).then((response) => {
        alert(response.data.msg);
      });
      formData.delete("name")
      formData.delete("password")
      formData.delete("creatorID")
      formData.delete("creatorName")
      formData.delete("file")
    }
  };
  return (
    <>
      <form noValidate autoComplete="off" onSubmit={handleSignupSubmit}>
        <TextField
          className={classes.field}
          type="text"
          variant="outlined"
          label="Group Name"
          color="primary"
          fullWidth
          onChange={(e) => {
            setName(e.target.value);
          }}
          required
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
          required
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
          required
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

        <Button
          className={classes.button}
          type="submit"
          variant="contained"
          color="primary"
        >
          Register
        </Button>
      </form>
    </>
  );
};

export default GroupCreateForm;
