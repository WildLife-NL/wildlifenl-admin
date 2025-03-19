import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Select,
  MenuItem,
  Chip,
  Box
} from "@mui/material";
import UsersAPI from "../../api/Users";

const RoleTable = () => {
  const [data, setData] = useState([]);
  const [roles, setRoles] = useState([]);
  const [responseRoles, setResponseRoles] = useState([]);
  const [currentUserID, setCurrentUserID] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const rolesResponse = await UsersAPI.getAllRoles();
        setResponseRoles(rolesResponse.data);
        setRoles(rolesResponse.data.map(role => role.name));

        const usersResponse = await UsersAPI.getAllUserProfiles();
        setData(usersResponse.data);

        // Fetch logged-in user profile
        const myProfile = await UsersAPI.getMyUserProfile();
        console.log(myProfile);
        setCurrentUserID(myProfile.data.ID);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };
    fetchData();
  }, []);

  const handleRoleAdd = async (userID, newRole) => {
    try {
      const roleID = responseRoles.find(role => role.name === newRole)?.ID;
      if (!roleID) return;

      await UsersAPI.addRole(roleID, userID);
      setData(prevData => prevData.map(user =>
        user.ID === userID ? { ...user, roles: [...(user.roles || []), { name: newRole }] } : user
      ));
    } catch (error) {
      console.error("Error adding role", error);
    }
  };

  const handleRoleRemove = async (userID, roleName) => {
    try {
      const roleID = responseRoles.find(role => role.name === roleName)?.ID;
      if (!roleID) return;

      await UsersAPI.removeRole(roleID, userID);
      setData(prevData => prevData.map(user =>
        user.ID === userID ? { ...user, roles: user.roles.filter(role => role.name !== roleName) } : user
      ));
    } catch (error) {
      console.error("Error removing role", error);
    }
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Email</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Roles</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((user) => (
            <TableRow key={user.ID}>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.name}</TableCell>
              <TableCell>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1, flexDirection: "row", justifyContent: "flex-start", width: "100%" }}>
                  {/* Role Selection Dropdown */}
                  <Select
                    value="" 
                    onChange={(e) => handleRoleAdd(user.ID, e.target.value)}
                    displayEmpty
                    renderValue={() => "Select Role"} // Placeholder text
                  >
                    {roles.map((role) => (
                      <MenuItem 
                        key={role} 
                        value={role} 
                        disabled={user.roles?.some(r => r.name === role)} // Disable if user already has the role
                      >
                        {role}
                      </MenuItem>
                    ))}
                  </Select>
                    {user.roles?.map(role => (
                      user.ID === currentUserID && role.name === "administrator" ? (
                        // Non-deletable administrator Chip for logged-in user (styled the same as others)
                        <Chip 
                          key={role.name} 
                          label={role.name} 
                          color="default"
                        />
                      ) : (
                        // Deletable Chip for other roles
                        <Chip
                          key={role.name}
                          label={role.name}
                          onDelete={() => handleRoleRemove(user.ID, role.name)}
                        />
                      )
                    ))}
                </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default RoleTable;