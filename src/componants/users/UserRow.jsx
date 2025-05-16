import React from "react";
import { TableRow, TableCell, Box } from "@mui/material";
import RoleSelect from "./RoleSelect";
import RoleChips from "./RoleChips";

const UserRow = ({ user, roles, responseRoles, currentUserID, setData }) => {
  return (
    <TableRow>
      <TableCell>{user.name}</TableCell>
      <TableCell>{user.email}</TableCell>
      <TableCell>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <RoleSelect user={user} roles={roles} responseRoles={responseRoles} setData={setData} />
          <RoleChips user={user} currentUserID={currentUserID} setData={setData} responseRoles={responseRoles} />
        </Box>
      </TableCell>
    </TableRow>
  );
};

export default UserRow;