import React, { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box } from "@mui/material";
import UsersAPI from "../api/Users";
import FilterBar from "../componants/user/FilterBar";
import UserRow from "../componants/user/UserRow";

const RoleTable = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
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
        setFilteredData(usersResponse.data);

        const myProfile = await UsersAPI.getMyUserProfile();
        setCurrentUserID(myProfile.data.ID);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };
    fetchData();
  }, []);

  const applyFilters = () => {
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
      filtered = filtered.filter(user =>
        user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredData(filtered);
  };

  useEffect(() => {
    applyFilters();
  }, [searchQuery, selectedRoles, data]);

  return (
    <Box>
      <FilterBar 
        searchQuery={searchQuery} 
        setSearchQuery={setSearchQuery} 
        selectedRoles={selectedRoles} 
        setSelectedRoles={setSelectedRoles} 
        roles={roles} 
      />

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
            {filteredData.map(user => (
              <UserRow 
                key={user.ID} 
                user={user} 
                roles={roles} 
                responseRoles={responseRoles} 
                currentUserID={currentUserID} 
                setData={setData} 
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default RoleTable;