import React, { useState } from "react";
import { TableRow, TableCell, TextField, Button, Box } from "@mui/material";
import SpeciesAPI from "../../api/Species";

const SpeciesTableRow = ({ species, setData }) => {
  const [isRowExpanded, setIsRowExpanded] = useState(false);

  const handleInputChange = (field, value) => {
    setData((prevData) =>
      prevData.map((s) => (s.ID === species.ID ? { ...s, [field]: value } : s))
    );
  };

  const handleFocus = () => {
    setIsRowExpanded(true);
  };

  const handleBlur = () => {
    setIsRowExpanded(false);
  };

  const handleSubmit = (ID, species) => {
    try {
      SpeciesAPI.updateSpecies(ID, species);
      console.log("Submitted Successfully");
    } catch (e) {
      console.log(e);
      console.log("Submission Unsuccessful");
    }
  };

  return (
    <TableRow sx={{ height: "auto", position: "relative", verticalAlign: "top" }}>
      <TableCell>
        <TextField value={species.name || ""} onChange={(e) => handleInputChange("name", e.target.value)} />
      </TableCell>
      <TableCell>
        <TextField value={species.commonName || ""} onChange={(e) => handleInputChange("commonName", e.target.value)} />
      </TableCell>

      {/* Multiline Fields - All Expand When One is Focused */}
      {["description", "advice", "behaviour"].map((field) => (
        <TableCell key={field} sx={{ position: "relative", verticalAlign: "top"}}>
          <Box sx={{ position: "relative", width: "100%", minHeight: "40px" }}>
            <TextField
              multiline
              value={species[field] || ""}
              onChange={(e) => handleInputChange(field, e.target.value)}
              onFocus={handleFocus}
              onBlur={handleBlur}
              sx={{
                width: "100%",
                minHeight: "40px",
                overflow: "hidden",
                height: isRowExpanded ? "fit-content" : "60px", // Expand all when one is focused
                bottom: 0,
                background: "white",
                zIndex: 1,
                }}
              />
          </Box>
        </TableCell>
      ))}
      <TableCell>
        <TextField value={species.category || ""} onChange={(e) => handleInputChange("category", e.target.value)} />
      </TableCell>
      <TableCell>
        <TextField value={species.roleInNature || ""} onChange={(e) => handleInputChange("roleInNature", e.target.value)} />
      </TableCell>

      <TableCell>
        <Button variant="contained" color="primary" onClick={() => handleSubmit(species.ID, species)}>
          Submit
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default SpeciesTableRow;
