import React, { useState } from "react";
import { TextField, Select, MenuItem, Button, FormControl, InputLabel, Box } from "@mui/material";
import SpeciesAPI from "../../api/Species";

const SpeciesCreator = () => {
  const [formData, setFormData] = useState({
    name: "",
    commonName: "",
    category: "",
    roleInNature: "",
    advice: "",
    behaviour: "",
    description: "",
  });

  const categories = ["Hoefdieren", "Roofdieren", "Overig"];
  const roles = ["Grazer", "Roofdier", "Opruimer"];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await SpeciesAPI.AddSpecies(formData);
      alert("Species added successfully!");
    } catch (error) {
      console.error("Error adding species:", error);
      alert("Failed to add species.");
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2, maxWidth: 400, margin: "auto" }}>
      <TextField label="Latin Name" name="name" value={formData.name} onChange={handleChange} fullWidth required />
      <TextField label="Common Name" name="commonName" value={formData.commonName} onChange={handleChange} fullWidth required />
      
      <FormControl fullWidth required>
        <InputLabel>Category</InputLabel>
        <Select name="category" value={formData.category} onChange={handleChange}>
          {categories.map((cat) => (
            <MenuItem key={cat} value={cat}>{cat}</MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl fullWidth required>
        <InputLabel>Role in Nature</InputLabel>
        <Select name="roleInNature" value={formData.roleInNature} onChange={handleChange}>
          {roles.map((role) => (
            <MenuItem key={role} value={role}>{role}</MenuItem>
          ))}
        </Select>
      </FormControl>
      
      <TextField label="Advice" name="advice" value={formData.advice} onChange={handleChange} multiline rows={3} fullWidth required />
      <TextField label="Behaviour" name="behaviour" value={formData.behaviour} onChange={handleChange} multiline rows={3} fullWidth required />
      <TextField label="Description" name="description" value={formData.description} onChange={handleChange} multiline rows={3} fullWidth required />
      
      <Button type="submit" variant="contained" color="primary">Submit</Button>
    </Box>
  );
};

export default SpeciesCreator;