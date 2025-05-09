import React, { useState } from "react";
import { TextField, Button, Box } from "@mui/material";
import BelongingAPI from "../../api/Belonging";

const BelongingCreator = () => {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await BelongingAPI.addBelonging(formData);
      alert("Belonging added successfully!");
    } catch (error) {
      console.error("Error adding belonging:", error);
      alert("Failed to add belonging.");
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2, maxWidth: 400, margin: "auto", mt: "20vh", }}>
      <TextField label="Name" name="name" value={formData.name} onChange={handleChange} fullWidth required/>
      <TextField label="Category" name="category" value={formData.category} onChange={handleChange} fullWidth required/>
      <Button type="submit" variant="contained" color="primary">
        Submit
      </Button>
    </Box>
  );
};

export default BelongingCreator;