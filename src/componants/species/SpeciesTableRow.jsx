import React, { useEffect, useState } from "react";
import { TableRow, TableCell, TextField, Button, Box } from "@mui/material";
import SpeciesAPI from "../../api/Species";

const SpeciesTableRow = ({ species, setData }) => {
  const [isRowExpanded, setIsRowExpanded] = useState(false);
  const [localSpecies, setLocalSpecies] = useState(species);


  useEffect(() => {
    setLocalSpecies(species);
  }, [species]);

  const handleInputChange = (field, value) => {
    setLocalSpecies((prev) => ({ ...prev, [field]: value }));
  };

  const handleFocus = () => {
    setIsRowExpanded(true);
  };

  const handleBlur = () => {
    setIsRowExpanded(false);
  };

  const handleSubmit = (ID, updatedSpecies) => {
    try {
      SpeciesAPI.updateSpecies(ID, updatedSpecies);
      setData((prevData) => prevData.map((s) => (s.ID === ID ? updatedSpecies : s)));
      console.log("Submitted Successfully");
    } catch (e) {
      console.log(e);
      console.log("Submission Unsuccessful");
    }
  };

  return (
    <TableRow sx={{ height: "auto", position: "relative", verticalAlign: "top" }}>
      <TableCell>
        <TextField value={localSpecies.name || ""} onChange={(e) => handleInputChange("name", e.target.value)} />
      </TableCell>
      <TableCell>
        <TextField value={localSpecies.commonName || ""} onChange={(e) => handleInputChange("commonName", e.target.value)} />
      </TableCell>

      {/* Multiline Fields - All Expand When One is Focused */}
      {["description", "advice", "behaviour", "category", "roleInNature"].map((field) => (
        <TableCell key={field} sx={{ position: "relative", verticalAlign: "top"}}>
          <Box sx={{ position: "relative", width: "100%", minHeight: "40px" }}>
            <TextField
              multiline
              value={localSpecies[field] || ""}
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
        <TextField value={localSpecies.category || ""} onChange={(e) => handleInputChange("category", e.target.value)} />
      </TableCell>
      <TableCell>
        <TextField value={localSpecies.roleInNature || ""} onChange={(e) => handleInputChange("roleInNature", e.target.value)} />
      </TableCell>

      <TableCell>
        <Button variant="contained" color="primary" onClick={() => handleSubmit(localSpecies.ID, localSpecies)}>
          Submit
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default React.memo(SpeciesTableRow);
