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

function NavBar() {
  const [speciesOpen, setSpeciesOpen] = useState(false);

  const toggleSpeciesMenu = () => {
    setSpeciesOpen(!speciesOpen);
  };
  const logOut = () => {
    localStorage.removeItem("authToken");
    window.location.replace("/Login");
  }

  return (
    <nav className="navBar">
        <List sx={{ width: "100%", maxWidth: 300, minWidth: 250, minHeight: "95vh", position: "relative"}}>
          {/* Users */}
          <ListItemButton component={NavLink} to="/Users">
            <ListItemIcon sx={{ color: "white" }}> {/* Icon color */}
              <GroupIcon />
            </ListItemIcon>
            <ListItemText primary="Users" sx={{ color: "white" }} />
          </ListItemButton>

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
                to="/EditSpecies"
                sx={{ pl: 4 }}
              >
                <ListItemIcon sx={{ color: "white" }}>
                  <EditIcon />
                </ListItemIcon>
                <ListItemText primary="Edit Species" sx={{ color: "white" }} />
              </ListItemButton>

              <ListItemButton
                component={NavLink}
                to="/CreateSpecies"
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
          </List>
    </nav>
  );
}

export default NavBar;
