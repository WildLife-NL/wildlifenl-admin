import { useState } from "react";
import { Navigate, NavLink } from "react-router-dom";
import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  Box,
} from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import GroupIcon from "@mui/icons-material/Group";
import PetsIcon from "@mui/icons-material/Pets";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import LogoutIcon from '@mui/icons-material/Logout';
import HomeIcon from '@mui/icons-material/Home';

function NavBar() {
  const [speciesOpen, setSpeciesOpen] = useState(false);
  const [usersOpen, setUsersOpen] = useState(false);

  const toggleSpeciesMenu = () => {
    setSpeciesOpen(!speciesOpen);
    if(usersOpen){setUsersOpen(!usersOpen);}
  };
  const toggleUsersMenu = () => {
    setUsersOpen(!usersOpen);
    if(speciesOpen){setSpeciesOpen(!speciesOpen);}
  };
  const goHome = () => {
    if(usersOpen){setUsersOpen(!usersOpen);}
    if(speciesOpen){setSpeciesOpen(!speciesOpen);}
  }
  const logOut = () => {
    localStorage.removeItem("authToken");
    window.location.replace("/Login");
  }

  return (
    <nav className="navBar">
      <ListItemButton onClick={goHome} component={NavLink} to="/">
        <ListItemIcon sx={{ color: "white"}}>
          <HomeIcon />
        </ListItemIcon>
        <ListItemText primary="Home" sx={{ color: "white" }} />
      </ListItemButton>
      {/* Users Parent Menu */}
      <ListItemButton onClick={toggleUsersMenu}>
        <ListItemIcon sx={{ color: "white" }}>
          <GroupIcon />
        </ListItemIcon>
        <ListItemText primary="Users" sx={{ color: "white" }} />
        {usersOpen ? (
          <ExpandLess sx={{ color: "white" }} />
        ) : (
          <ExpandMore sx={{ color: "white" }} />
        )}
      </ListItemButton>

      {/* Users Sub-menu */}
      <Collapse in={usersOpen} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton
            component={NavLink}
            to="/ModifyUsers"
            sx={{ pl: 4 }}
          >
            <ListItemIcon sx={{ color: "white" }}>
              <EditIcon />
            </ListItemIcon>
            <ListItemText primary="Modify Users" sx={{ color: "white" }} />
          </ListItemButton>

          <ListItemButton
            component={NavLink}
            to="/AddUser"
            sx={{ pl: 4 }}
          >
            <ListItemIcon sx={{ color: "white" }}>
              <AddIcon />
            </ListItemIcon>
            <ListItemText primary="Add User" sx={{ color: "white" }} />
          </ListItemButton>
        </List>
      </Collapse>   

      {/* Species Parent Menu */}
      <ListItemButton onClick={toggleSpeciesMenu}>
        <ListItemIcon sx={{ color: "white" }}>
          <PetsIcon />
        </ListItemIcon>
        <ListItemText primary="Species" sx={{ color: "white" }} />
        {speciesOpen ? (
          <ExpandLess sx={{ color: "white" }} />
        ) : (
          <ExpandMore sx={{ color: "white" }} />
        )}
      </ListItemButton>

      {/* Species Sub-menu */}
      <Collapse in={speciesOpen} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton
            component={NavLink}
            to="/ModifySpecies"
            sx={{ pl: 4 }}
          >
            <ListItemIcon sx={{ color: "white" }}>
              <EditIcon />
            </ListItemIcon>
            <ListItemText primary="Modify Species" sx={{ color: "white" }} />
          </ListItemButton>

          <ListItemButton
            component={NavLink}
            to="/AddSpecies"
            sx={{ pl: 4 }}
          >
            <ListItemIcon sx={{ color: "white" }}>
              <AddIcon />
            </ListItemIcon>
            <ListItemText primary="Add Species" sx={{ color: "white" }} />
          </ListItemButton>
        </List>
      </Collapse>            
      <ListItemButton onClick={logOut} sx={{position: "absolute", bottom: 0}}>
        <ListItemIcon sx={{ color: "white"}}>
          <LogoutIcon />
        </ListItemIcon>
        <ListItemText primary="Logout" sx={{ color: "white" }} />
      </ListItemButton>
    </nav>
  );
}

export default NavBar;
