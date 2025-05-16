import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import BelongingTableRow from "./BelongingTableRow";

const BelongingTable = ({ data, setData }) => {
  return (
    <TableContainer component={Paper} sx={{ maxHeight: "90vh", overflow: "auto" }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Category</TableCell>
            <TableCell>Submit</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((belonging) => (
            <BelongingTableRow
              key={belonging.ID}
              belonging={belonging}
              setData={setData}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default BelongingTable;
