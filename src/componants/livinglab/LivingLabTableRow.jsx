import React from "react";
import { TableRow, TableCell, Box } from "@mui/material";

const LivingLabTableRow = ({ livingLab }) => {
  return (
    <TableRow>
      <TableCell>{livingLab.name}</TableCell>
      <TableCell>{livingLab.definition?.length ?? 0}</TableCell>
      <TableCell>
        <Box sx={{ maxHeight: 100, overflow: "auto" }}>
          {livingLab.definition?.map((point, index) => (
            <div key={index}>{point.latitude}, {point.longitude}</div>
          ))}
        </Box>
      </TableCell>
    </TableRow>
  );
};

export default LivingLabTableRow;
