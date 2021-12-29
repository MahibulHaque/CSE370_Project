import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BsThreeDots } from "react-icons/bs";
import {MdGroupAdd} from 'react-icons/md'
import {
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  makeStyles,
  TextField,
  ListItem,
} from "@material-ui/core";
import {
  AccountCircleRounded as AccountCircle,
  ArrowBack,
  ExitToApp,
  PersonAdd,
  Settings,
} from "@material-ui/icons";

import {
  BottomSection,
  Container,
  ProfileImage,
  ProfileTab,
  SearchHeaderTag,
  SearchResults,
  SearchTab,
  SuggestedUser,
  Topbar,
} from "./SidebarElements";
import Axios from "axios";

const Sidebar = () => {
  const navigate = useNavigate();
  const image = localStorage.getItem("userPic");
  const user_id = localStorage.getItem("userID");
  const [suggestedUser, setSuggestedUser] = useState(null);
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
      e.target.value = "";
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

  useEffect(() => {
    Axios.get(`http://localhost:5000/suggestedUser/${user_id}`).then(
      (response) => {
        setSuggestedUser(response.data);
      }
    );
  }, [user_id]);

  return (
    <Container>
      <Topbar>
        <ProfileTab>
          <ProfileImage src={image} alt="img"/>
          <h1>Chats</h1>
          <IconButton>
            <MdGroupAdd />
          </IconButton>
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
              <div
                key={i}
                onClick={() => {
                  navigate(`/t/${searchResult.user_id}`);
                }}
              >
                {searchResult.username}
              </div>
            ))}
          </SearchResults>
        </SearchTab>
      </Topbar>
      <BottomSection>
        <SuggestedUser>
          <h1>Suggested Users</h1>
          {suggestedUser?.map((user,i)=>(
            <div key={i} className="suggested_name_holder"><img src={`http://localhost:5000/${user.image}`}alt="Profile Pic"/>{user.username}</div>
          ))}
        </SuggestedUser>
      </BottomSection>
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
