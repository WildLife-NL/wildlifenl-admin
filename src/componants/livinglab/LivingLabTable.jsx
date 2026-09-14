import React from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import LivingLabTableRow from "./LivingLabTableRow";

const LivingLabTable = ({ data }) => {
  return (
    <TableContainer component={Paper} sx={{maxHeight: "90vh", overflow: 'auto'}}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Points</TableCell>
            <TableCell>Boundary</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((livingLab) => (
            <LivingLabTableRow key={livingLab.ID} livingLab={livingLab} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default LivingLabTable;
