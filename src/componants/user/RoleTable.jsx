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


  useEffect(() => {
    const fetchData = async () => {
      try {
        const rolesResponse = await UsersAPI.getAllRoles();
        console.log(rolesResponse);
        setResponseRoles(rolesResponse.data);
        setRoles(rolesResponse.data.map(role => role.name));

        const usersResponse = await UsersAPI.getAllUserProfiles();
        setData(usersResponse.data);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };
    fetchData();
  }, []);

  const handleRoleAdd = async (userID, newRole) => {
    try {
      console.log(roles);
      const role = roles.find(role => role === newRole);
      
      console.log(responseRoles);
      const roleID = responseRoles.find(role => role.name === newRole).ID
      console.log(roleID);

      if (!role) return;
      
      const test = 
      [{
        userID: userID,
        roleID: roleID
      }];
      console.log(test);

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
      const roleID = responseRoles.find(role => role.name === roleName).ID

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
            <TableCell>ID</TableCell>
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
                  <Select
                    value=""
                    onChange={(e) => handleRoleAdd(user.ID, e.target.value)}
                    displayEmpty
                  >
                    <MenuItem value="" disabled>Select Role</MenuItem>
                    {roles.map((role) => (
                      <MenuItem key={role} value={role}>{role}</MenuItem>
                    ))}
                  </Select>
                  {user.roles?.map(role => (
                    <Chip
                      key={role.name}
                      label={role.name}
                      onDelete={() => handleRoleRemove(user.ID, role.name)}
                    />
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