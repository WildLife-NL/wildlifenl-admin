import React, { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box } from "@mui/material";
import UsersAPI from "../../api/Users";
import FilterBar from "../../componants/users/FilterBar";
import UserRow from "../../componants/users/UserRow";

const ModifyUsers = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [roles, setRoles] = useState([]);
  const [responseRoles, setResponseRoles] = useState([]);
  const [currentUserID, setCurrentUserID] = useState(null);
  const [selectedRoles, setSelectedRoles] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const customOrder = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  const customSort = (a, b) => {
      console.log(a.name)
      const indexA = customOrder.indexOf(a.name[0]);
      const indexB = customOrder.indexOf(b.name[0]);
      return indexA - indexB;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const rolesResponse = await UsersAPI.getAllRoles();
        setResponseRoles(rolesResponse.data);
        setRoles(rolesResponse.data.map(role => role.name));

        const usersResponse = await UsersAPI.getAllUserProfiles();
        setData(usersResponse.data);
        setFilteredData(usersResponse.data.sort(customSort));

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

  setFilteredData(filtered.sort(customSort));
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

      <TableContainer component={Paper} sx={{maxHeight: "90vh", overflow: 'auto'}}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
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

export default ModifyUsers;