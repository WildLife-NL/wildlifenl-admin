import React, { useState } from "react";
import { TableRow, TableCell, TextField, Button, Box } from "@mui/material";
import SpeciesAPI from "../../api/Species";

const SpeciesTableRow = ({ species, setData }) => {
  const [focusedField, setFocusedField] = useState(null);

  const handleInputChange = (field, value) => {
    setData((prevData) =>
      prevData.map((s) => (s.ID === species.ID ? { ...s, [field]: value } : s))
    );
  };
  const handleSubmit = (ID, species) => {
    try{
      SpeciesAPI.updateSpecies(ID, species);
      console.log("Submitted Succesfully");
    }
    catch (e){
      console.log(e);
      console.log("Submission Unsuccesful");
    }
  }
  return (
    <TableRow sx={{ height: "auto", position: "relative", verticalAlign: "top" }}>
      <TableCell>
        <TextField value={species.name || ""} onChange={(e) => handleInputChange("name", e.target.value)} />
      </TableCell>
      <TableCell>
        <TextField value={species.commonName || ""} onChange={(e) => handleInputChange("commonName", e.target.value)} />
      </TableCell>

      {/* Multiline Fields - Expands Downwards Without Moving Other Cells */}
      {["description", "advice", "behaviour"].map((field) => (
        <TableCell key={field} sx={{ position: "relative", verticalAlign: "top" }}>
          <Box sx={{ position: "relative", width: "100%", minHeight: "40px" }}>
            <TextField
              multiline
              value={species[field] || ""}
              onChange={(e) => handleInputChange(field, e.target.value)}
              onFocus={() => setFocusedField(field)}
              onBlur={() => setFocusedField(null)}
              sx={{
                width: "100%",
                minHeight: "40px",
                overflow: "hidden",
                height: focusedField === field ? "fit-content" : "60px", // Expand only when focused
                bottom: 0, // Expands downwards
                background: "white",
                zIndex: 1,
              }}
            />
          </Box>
        </TableCell>
      ))}
      <TableCell>
        <TextField value={species.category || ""} onChange={(e) => handleInputChange("Category", e.target.value)} />
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
