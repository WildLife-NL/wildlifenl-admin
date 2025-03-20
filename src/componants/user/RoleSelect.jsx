import React from "react";
import { Select, MenuItem } from "@mui/material";
import UsersAPI from "../../api/Users";

const RoleSelect = ({ user, roles, responseRoles, setData }) => {
  const handleRoleAdd = async (newRole) => {
    try {
      const roleID = responseRoles.find(role => role.name === newRole).ID;

      await UsersAPI.addRole(roleID, user.ID);
      setData(prevData =>
        prevData.map(u => u.ID === user.ID ? { ...u, roles: [...(u.roles || []), { name: newRole }] } : u)
      );
    } catch (error) {
      console.error("Error adding role", error);
    }
  };

  return (
    <Select value="" onChange={(e) => handleRoleAdd(e.target.value)} displayEmpty renderValue={() => "Select Role"}>
      {roles.map(role => (
        <MenuItem key={role} value={role} disabled={user.roles?.some(r => r.name === role)}>
          {role}
        </MenuItem>
      ))}
    </Select>
  );
};

export default RoleSelect;