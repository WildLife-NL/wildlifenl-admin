import React from "react";
import { TextField, Box } from "@mui/material";

const SpeciesTableFilters = ({
  searchTerm,
  setSearchTerm,
  categoryFilter,
  setCategoryFilter,
  roleFilter,
  setRoleFilter
}) => {
  return (
    <Box sx={{ display: "flex", gap: 2, alignItems: "center", mb: 2 }}>
      <TextField
        label="Search by Latin Name or Common Name"
        variant="outlined"
        size="small"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        sx={{ flex: 1, minWidth: "250px", maxWidth: "400px" }}
      />
      <TextField
        label="Filter by Category"
        variant="outlined"
        size="small"
        value={categoryFilter}
        onChange={(e) => setCategoryFilter(e.target.value)}
        sx={{ minWidth: "200px" }}
      />
      <TextField
        label="Filter by Role in Nature"
        variant="outlined"
        size="small"
        value={roleFilter}
        onChange={(e) => setRoleFilter(e.target.value)}
        sx={{ minWidth: "200px" }}
      />
    </Box>
  );
};

export default SpeciesTableFilters;
