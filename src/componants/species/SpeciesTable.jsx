import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Select,
  MenuItem,
  Button
} from "@mui/material";
import SpeciesAPI from "../../api/Species";

const SpeciesTable = () => {
  const [data, setData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [rolesInNature, setRolesInNature] = useState([]);

  const natureRoles = ["Grazer", "Roofdier", "Opruimer"];
  const categoriesRoles = ["Hoefdieren", "Roofdieren", "Overig"];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await SpeciesAPI.getAllSpecies();
        setData(response.data);

        setRolesInNature(natureRoles);
        setCategories(categoriesRoles);
      } catch (error) {
        console.error("Error fetching species data", error);
      }
    };
    fetchData();
  }, []);

  const handleInputChange = (id, field, value) => {
    setData(prevData =>
      prevData.map(species =>
        species.ID === id ? { ...species, [field]: value } : species
      )
    );
  };

  const handleSubmit = async (species) => {
    try {
      await SpeciesAPI.updateSpecies(species.ID, species);
      console.log("Species updated successfully", species);
    } catch (error) {
      console.error("Error updating species", error);
    }
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Latin Name</TableCell>
            <TableCell>Common Name</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Category</TableCell>
            <TableCell>Advice</TableCell>
            <TableCell>Behavior</TableCell>
            <TableCell>Role in Nature</TableCell>
            <TableCell>Submit</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((species) => (
            <TableRow key={species.ID}>
              <TableCell>
                <TextField
                  value={species.name || ""}
                  onChange={(e) => handleInputChange(species.ID, "latinName", e.target.value)}
                />
              </TableCell>
              <TableCell>
                <TextField
                  value={species.commonName || ""}
                  onChange={(e) => handleInputChange(species.ID, "commonName", e.target.value)}
                />
              </TableCell>
              <TableCell>
                <TextField
                  multiline
                  value={species.description || ""}
                  onChange={(e) => handleInputChange(species.ID, "description", e.target.value)}
                />
              </TableCell>
              <TableCell>
                <Select
                  value={species.category || ""}
                  onChange={(e) => handleInputChange(species.ID, "category", e.target.value)}
                >
                  {categories.map((category) => (
                    <MenuItem key={category} value={category}>{category}</MenuItem>
                  ))}
                </Select>
              </TableCell>
              <TableCell>
                <TextField
                  multiline
                  value={species.advice || ""}
                  onChange={(e) => handleInputChange(species.ID, "advice", e.target.value)}
                />
              </TableCell>
              <TableCell>
                <TextField
                  multiline
                  value={species.behavior || ""}
                  onChange={(e) => handleInputChange(species.ID, "behavior", e.target.value)}
                />
              </TableCell>
              <TableCell>
                <Select
                  value={species.roleInNature || ""}
                  onChange={(e) => handleInputChange(species.ID, "roleInNature", e.target.value)}
                >
                  {rolesInNature.map((role) => (
                    <MenuItem key={role} value={role}>{role}</MenuItem>
                  ))}
                </Select>
              </TableCell>
              <TableCell>
                <Button variant="contained" color="primary" onClick={() => handleSubmit(species)}>
                  Submit
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default SpeciesTable;