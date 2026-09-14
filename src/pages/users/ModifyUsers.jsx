import React, { useEffect, useState, useMemo } from "react";
import { Box, Paper } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import UsersAPI from "../../api/Users";
import FilterBar from "../../componants/users/FilterBar";
import RoleSelect from "../../componants/users/RoleSelect";
import RoleChips from "../../componants/users/RoleChips";

const ModifyUsers = () => {
  const [data, setData] = useState([]);
  const [roles, setRoles] = useState([]);
  const [responseRoles, setResponseRoles] = useState([]);
  const [currentUserID, setCurrentUserID] = useState(null);
  const [selectedRoles, setSelectedRoles] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const rolesResponse = await UsersAPI.getAllRoles();
        setResponseRoles(rolesResponse.data);
        setRoles(rolesResponse.data.map(role => role.name));

        const usersResponse = await UsersAPI.getAllUserProfiles();
        setData(usersResponse.data);

        const myProfile = await UsersAPI.getMyUserProfile();
        setCurrentUserID(myProfile.data.ID);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };
    fetchData();
  }, []);

  const filteredData = useMemo(() => {
    let filtered = data;

    // Role filtering (including users with no roles)
    if (selectedRoles.length > 0) {
      filtered = filtered.filter(user =>
        user.roles
          ? user.roles.some(role => selectedRoles.includes(role.name))
          : selectedRoles.includes("No Role")
      );
    }

    // Search filtering by email or name
    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(user =>
        user.email.toLowerCase().includes(query) ||
        user.name.toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [data, selectedRoles, searchQuery]);

  const columns = useMemo(() => [
    { field: "name", headerName: "Name", flex: 1, minWidth: 160 },
    { field: "email", headerName: "Email", flex: 1.5, minWidth: 220 },
    {
      field: "roles",
      headerName: "Roles",
      flex: 2,
      minWidth: 280,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, flexWrap: "wrap", py: 1 }}>
          <RoleSelect user={params.row} roles={roles} responseRoles={responseRoles} setData={setData} />
          <RoleChips user={params.row} currentUserID={currentUserID} setData={setData} responseRoles={responseRoles} />
        </Box>
      ),
    },
  ], [roles, responseRoles, currentUserID]);

  return (
    <Box>
      <FilterBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedRoles={selectedRoles}
        setSelectedRoles={setSelectedRoles}
        roles={roles}
      />

      <Paper sx={{ height: "90vh", width: "100%" }}>
        <DataGrid
          rows={filteredData}
          columns={columns}
          getRowId={(row) => row.ID}
          getRowHeight={() => "auto"}
          initialState={{
            sorting: { sortModel: [{ field: "name", sort: "asc" }] },
            pagination: { paginationModel: { pageSize: 25 } },
          }}
          pageSizeOptions={[25, 50, 100]}
          disableRowSelectionOnClick
        />
      </Paper>
    </Box>
  );
};

export default ModifyUsers;
