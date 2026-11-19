import React from "react";
import { TextField, Button, Box, Typography, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const LivingLabPointsEditor = ({ points, setPoints, minPoints = 3 }) => {
  const handlePointChange = (index, field, value) => {
    setPoints(points.map((point, i) => i === index ? { ...point, [field]: value } : point));
  };

  const addPoint = () => {
    setPoints([...points, { latitude: "", longitude: "" }]);
  };

  const removePoint = (index) => {
    setPoints(points.filter((_, i) => i !== index));
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
      <Typography variant="subtitle1">Boundary points</Typography>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 1, maxHeight: 300, overflow: "auto", pr: 1 }}>
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
            <IconButton onClick={() => removePoint(index)} disabled={points.length <= minPoints} aria-label="Remove point">
              <DeleteIcon />
            </IconButton>
          </Box>
        ))}
      </Box>

      <Button variant="outlined" onClick={addPoint}>Add Point</Button>
    </Box>
  );
};

export default LivingLabPointsEditor;
