import React, { useEffect, useState } from "react";
import { TableRow, TableCell, TextField, Button } from "@mui/material";
import LivingLabAPI from "../../api/LivingLab";
import LivingLabPointsEditor from "./LivingLabPointsEditor";

const LivingLabTableRow = ({ livingLab, setData }) => {
  const [name, setName] = useState(livingLab.name);
  const [points, setPoints] = useState(livingLab.definition || []);

  useEffect(() => {
    setName(livingLab.name);
    setPoints(livingLab.definition || []);
  }, [livingLab]);

  const handleSubmit = async () => {
    if (points.length < 3) {
      alert("A Living Lab boundary needs at least 3 points");
      return;
    }

    const definition = points.map(point => ({
      latitude: parseFloat(point.latitude),
      longitude: parseFloat(point.longitude)
    }));

    try {
      const response = await LivingLabAPI.updateLivingLab(livingLab.ID, name, definition);
      setData((prevData) => prevData.map((l) => (l.ID === livingLab.ID ? response.data : l)));
      alert("Living Lab updated successfully");
    } catch (error) {
      console.error("Error updating living lab:", error);
      alert("Failed to update Living Lab");
    }
  };

  return (
    <TableRow sx={{ verticalAlign: "top" }}>
      <TableCell>
        <TextField value={name} onChange={(e) => setName(e.target.value)} fullWidth required />
      </TableCell>
      <TableCell>{points.length}</TableCell>
      <TableCell>
        <LivingLabPointsEditor points={points} setPoints={setPoints} />
      </TableCell>
      <TableCell>
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Submit
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default LivingLabTableRow;
