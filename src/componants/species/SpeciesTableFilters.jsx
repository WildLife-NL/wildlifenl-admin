import React from "react";
import { TextField, Chip, Paper, Box } from "@mui/material";

const SpeciesTableFilters = ({
  searchTerm, setSearchTerm,
  selectedCategories, setSelectedCategories,
  selectedRoles, setSelectedRoles,
  categories, rolesInNature
}) => {
  const toggleCategory = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter(c => c !== category) : [...prev, category]
    );
  };

  const toggleRole = (role) => {
    setSelectedRoles((prev) =>
      prev.includes(role) ? prev.filter(r => r !== role) : [...prev, role]
    );
  };

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
     <Paper
          sx={{
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap',
            listStyle: 'none',
            p: 0.5,
            m: 0,
          }}
        >
        <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
            Categories:
            {categories.map((category) => (
            <Chip
                key={category}
                label={category}
                color={selectedCategories.includes(category) ? "primary" : "default"}
                onClick={() => toggleCategory(category)}
            />
            ))}
        </Box>
      </Paper>
      <Paper
          sx={{
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap',
            listStyle: 'none',
            p: 0.5,
            m: 0,
          }}
        >
        <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
        Role in Nature:
        {rolesInNature.map((role) => (
            <Chip
                key={role}
                label={role}
                color={selectedRoles.includes(role) ? "primary" : "default"}
                onClick={() => toggleRole(role)}
            />
            ))}
        </Box>
      </Paper>
    </Box>

  );
};

export default SpeciesTableFilters;
