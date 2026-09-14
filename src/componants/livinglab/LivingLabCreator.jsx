import React, { useState } from "react";
import { TextField, Button, Box } from "@mui/material";
import LivingLabAPI from "../../api/LivingLab";
import LivingLabPointsEditor from "./LivingLabPointsEditor";

const emptyPoints = () => [
  { latitude: "", longitude: "" },
  { latitude: "", longitude: "" },
  { latitude: "", longitude: "" }
];

const LivingLabCreator = () => {
  const [name, setName] = useState("");
  const [points, setPoints] = useState(emptyPoints());

  const resetForm = () => {
    setName("");
    setPoints(emptyPoints());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (points.length < 3) {
      alert("A Living Lab boundary needs at least 3 points");
      return;
    }

    const definition = points.map(point => ({
      latitude: parseFloat(point.latitude),
      longitude: parseFloat(point.longitude)
    }));

    try {
      await LivingLabAPI.AddLivingLab(name, definition);
      alert("Living Lab added successfully");
      resetForm();
    } catch (error) {
      console.error("Error adding living lab:", error);
      alert("Failed to add Living Lab");
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2, maxWidth: 500, margin: "auto", mt: "10vh" }}>
      <TextField label="Name" name="name" value={name} onChange={(e) => setName(e.target.value)} fullWidth required />

      <LivingLabPointsEditor points={points} setPoints={setPoints} />

      <Button type="submit" variant="contained" color="primary">Submit</Button>
    </Box>
  );
};

export default LivingLabCreator;
