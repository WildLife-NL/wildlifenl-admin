import React, { useState } from "react";
import { TextField, Button, Box } from "@mui/material";
import UserAPI from "../../api/Users";

const UserCreator = () => {
  const [formData, setFormData] = useState({
    email: "",
    name: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        console.log(formData);
        await UserAPI.addUser(formData.email, formData.name);
        alert("User added successfully!");
    } catch (error) {
        console.error("Error adding User:", error);
        alert("Failed to add User.");
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2, maxWidth: 400, margin: "auto", mt: "40vh"}}>
      <TextField label="Email" name="email" value={formData.email} onChange={handleChange} fullWidth required type="email"/>
      <TextField label="Name" name="name" value={formData.name} onChange={handleChange} fullWidth required />
      
      <Button type="submit" variant="contained" color="primary">Submit</Button>
    </Box>
  );
};

export default UserCreator;