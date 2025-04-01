import React from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import SpeciesTableRow from "./SpeciesTableRow";

const SpeciesTable = ({ data, setData, categories, rolesInNature }) => {
  return (
    <TableContainer component={Paper} sx={{maxHeight: "90vh", overflow: 'auto'}}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Latin Name</TableCell>
            <TableCell>Common Name</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Advice</TableCell>
            <TableCell>Behavior</TableCell>
            <TableCell>Category</TableCell>
            <TableCell>Role in Nature</TableCell>
            <TableCell>Submit</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((species) => (
            <SpeciesTableRow key={species.ID} species={species} setData={setData} categories={categories} rolesInNature={rolesInNature} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default SpeciesTable;
