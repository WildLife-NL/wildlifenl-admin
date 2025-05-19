import React from "react";
import { Box, TextField, Chip, Button } from "@mui/material";

const FilterBar = ({ searchQuery, setSearchQuery, selectedRoles, setSelectedRoles, roles }) => {
  const toggleRoleFilter = (role) => {
    setSelectedRoles(prevRoles =>
      prevRoles.includes(role) ? prevRoles.filter(r => r !== role) : [...prevRoles, role]
    );
  };

  const resetFilters = () => {
    setSearchQuery("");
    setSelectedRoles([]);
  };

  return (
    <Box sx={{ display: "flex", gap: 2, alignItems: "center", mb: 2 }}>
      <TextField
        label="Search by name or email"
        variant="outlined"
        size="small"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
        {roles.map(role => (
          <Chip
            key={role}
            label={role}
            clickable
            color={selectedRoles.includes(role) ? "primary" : "default"}
            onClick={() => toggleRoleFilter(role)}
          />
        ))}
        <Chip
          label="No Role"
          clickable
          color={selectedRoles.includes("No Role") ? "secondary" : "default"}
          onClick={() => toggleRoleFilter("No Role")}
        />
      </Box>

      <Button variant="contained" onClick={resetFilters}>
        Reset
      </Button>
    </Box>
  );
};

export default FilterBar;