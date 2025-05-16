import React from "react";
import { TableRow, TableCell, TextField, Button } from "@mui/material";
import BelongingAPI from "../../api/Belonging";

const BelongingTableRow = ({ belonging, setData }) => {
  const handleInputChange = (field, value) => {
    setData((prevData) =>
      prevData.map((b) => (b.ID === belonging.ID ? { ...b, [field]: value } : b))
    );
  };

  const handleSubmit = async (ID, updatedBelonging) => {
    try {
      await BelongingAPI.updateBelonging(updatedBelonging, ID);
      console.log("Submitted Successfully");
    } catch (e) {
      console.error("Submission Unsuccessful", e);
    }
  };

  return (
    <TableRow>
      <TableCell>
        <TextField
          value={belonging.name || ""}
          onChange={(e) => handleInputChange("name", e.target.value)}
        />
      </TableCell>
      <TableCell>
        <TextField
          value={belonging.category || ""}
          onChange={(e) => handleInputChange("category", e.target.value)}
        />
      </TableCell>
      <TableCell>
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleSubmit(belonging.ID, belonging)}
        >
          Submit
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default BelongingTableRow;
