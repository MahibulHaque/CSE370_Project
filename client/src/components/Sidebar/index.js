import React, { useState } from "react";
import {useNavigate} from 'react-router-dom';
import { BsThreeDots } from "react-icons/bs";
import {
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  makeStyles,
  TextField,
} from "@material-ui/core";
import {
  AccountCircleRounded as AccountCircle,
  ArrowBack,
  ExitToApp,
  PersonAdd,
  Settings,
} from "@material-ui/icons";

import {
  Container,
  ProfileImage,
  ProfileTab,
  SearchHeaderTag,
  SearchResults,
  SearchTab,
  Topbar,
} from "./SidebarElements";
import Axios from "axios";

const Sidebar = () => {

  const navigate = useNavigate();

  const [searchUser, setSearchUser] = useState(null);
  const [searchResults, setSearchResults] = useState(null);
  const [showBackIcon, setShowBackIcon] = useState(false);

  const handleFocus = () => {
    setShowBackIcon(true);
  };

  const handleKeyPressed = (e) => {
    if (e.key === "Enter") {
      Axios.post("http://localhost:5000/searchUser", {
        searchQuery: searchUser,
      }).then((response) => {
        if (!response.data.message) {
          setSearchResults(response.data);
        }
      });
    }
  };


  const useStyles = makeStyles({
    menu: {
      "&:-webkit-box-shadow": "-3px 3px 20px -4px rgba(0,0,0,0.3)",
      boxShadow: "-3px 3px 20px -4px rgba(0,0,0,0.3)",
    },
    field: {
      width: "85%",
      borderRadius: "200px",
      color: "var(--grey-1)",
    },
  });

  const classes = useStyles();

  const [anchorEl, setAnchorEl] = useState(null);

  const handleOpenMenu = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  return (
    <Container>
      <Topbar>
        <ProfileTab>
          <ProfileImage>
            <AccountCircle fontSize="large" />
          </ProfileImage>
          <h1>Chats</h1>
          <IconButton aria-controls="menu" onClick={handleOpenMenu}>
            <BsThreeDots />
          </IconButton>
        </ProfileTab>
        <SearchTab>
          <section className="searchSection">
            {showBackIcon && (
              <IconButton
                onClick={() => {
                  setShowBackIcon(false);
                  setSearchResults(null);
                  setSearchUser(null);
                }}
              >
                <ArrowBack />
              </IconButton>
            )}
            <TextField
              className={classes.field}
              type="text"
              variant="outlined"
              label="Search"
              color="primary"
              onChange={(e) => {
                setSearchUser(e.target.value);
              }}
              onKeyDown={handleKeyPressed}
              onFocus={handleFocus}
            />
          </section>

          <SearchResults>
            {searchResults && (
              <SearchHeaderTag>
                Search results for '{searchUser}'
              </SearchHeaderTag>
            )}
            {searchResults?.map((searchResult, i) => (
              <div key={i} onClick={()=>{
                navigate(`/t/${searchResult.user_id}`)
              }}>{searchResult.username}</div>
            ))}
          </SearchResults>
        </SearchTab>
      </Topbar>
      <Menu
        className={classes.menu}
        anchorEl={anchorEl}
        id="menu"
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem>
          <ListItemIcon>
            <AccountCircle fontSize="small" />
          </ListItemIcon>
          Profile
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <AccountCircle fontSize="small" />
          </ListItemIcon>
          My account
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <PersonAdd fontSize="small" />
          </ListItemIcon>
          Add another account
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <ExitToApp />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </Container>
  );
};

export default Sidebar;
