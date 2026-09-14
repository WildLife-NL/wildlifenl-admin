import React, { useState } from "react";
import { TextField, Button, Box, Typography, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import LivingLabAPI from "../../api/LivingLab";

const emptyPoint = { latitude: "", longitude: "" };

const LivingLabCreator = () => {
  const [name, setName] = useState("");
  const [points, setPoints] = useState([{ ...emptyPoint }, { ...emptyPoint }, { ...emptyPoint }]);

  const handlePointChange = (index, field, value) => {
    setPoints(points.map((point, i) => i === index ? { ...point, [field]: value } : point));
  };

  const addPoint = () => {
    setPoints([...points, { ...emptyPoint }]);
  };

  const removePoint = (index) => {
    setPoints(points.filter((_, i) => i !== index));
  };

  const resetForm = () => {
    setName("");
    setPoints([{ ...emptyPoint }, { ...emptyPoint }, { ...emptyPoint }]);
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

      <Typography variant="subtitle1">Boundary points</Typography>

      {points.map((point, index) => (
        <Box key={index} sx={{ display: "flex", gap: 1, alignItems: "center" }}>
          <TextField
            label="Latitude"
            type="number"
            value={point.latitude}
            onChange={(e) => handlePointChange(index, "latitude", e.target.value)}
            inputProps={{ min: -90, max: 90, step: "any" }}
            fullWidth
            required
          />
          <TextField
            label="Longitude"
            type="number"
            value={point.longitude}
            onChange={(e) => handlePointChange(index, "longitude", e.target.value)}
            inputProps={{ min: -180, max: 180, step: "any" }}
            fullWidth
            required
          />
          <IconButton onClick={() => removePoint(index)} disabled={points.length <= 3} aria-label="Remove point">
            <DeleteIcon />
          </IconButton>
        </Box>
      ))}

      <Button variant="outlined" onClick={addPoint}>Add Point</Button>

      <Button type="submit" variant="contained" color="primary">Submit</Button>
    </Box>
  );
};

export default LivingLabCreator;
