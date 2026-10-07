import React from "react";
import { TextField, Box } from "@mui/material";

const LivingLabTableFilters = ({ searchTerm, setSearchTerm }) => {
  return (
    <Box sx={{ display: "flex", gap: 2, alignItems: "center", mb: 2 }}>
      <TextField
        label="Search by Name"
        variant="outlined"
        size="small"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        sx={{ flex: 1, minWidth: "250px", maxWidth: "400px" }}
      />
    </Box>
  );
};

export default LivingLabTableFilters;
