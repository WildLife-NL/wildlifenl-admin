import React from "react";
import { Chip } from "@mui/material";
import UsersAPI from "../../api/Users";

const RoleChips = ({ user, currentUserID, setData, responseRoles }) => {
  const handleRoleRemove = async (roleName) => {
    try {
      const role = responseRoles.find((role) => role.name === roleName);
      if (!role) return;

      await UsersAPI.removeRole(role.ID, user.ID);

      setData((prevData) =>
        prevData.map((u) =>
          u.ID === user.ID ? { ...u, roles: u.roles.filter((r) => r.name !== roleName) } : u
        )
      );
    } catch (error) {
      console.error("Error removing role", error);
    }
  };

  return (
    <>
      {user.roles?.map((role) =>
        user.ID === currentUserID && role.name === "administrator" ? (
          // Special chip for logged-in user's administrator role
          <Chip key={role.name} label="administrator" />
        ) : (
          // Regular removable chip for other roles
          <Chip key={role.name} label={role.name} onDelete={() => handleRoleRemove(role.name)} />
        )
      )}
    </>
  );
};

export default RoleChips;
