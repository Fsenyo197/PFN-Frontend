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

export default function CompareByPayoutOptions({ firms }) {
  return (
    <TableContainer component={Paper}>
      <h2>Compare by Payout Options</h2>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Firm Name</TableCell>
            <TableCell>Payout Options</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {firms.map((firm) => (
            <TableRow key={firm.id}>
              <TableCell>{firm.name}</TableCell>
              <TableCell>{firm.payout_options}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
