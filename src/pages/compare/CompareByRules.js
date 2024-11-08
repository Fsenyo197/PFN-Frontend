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

export default function CompareByRules({ firms }) {
  const filteredFirms = firms.filter(
    (firm) => firm.consistency_rule || firm.two_percent_rule
  );

  return (
    <TableContainer component={Paper}>
      <h2>Compare by Rules</h2>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Firm Name</TableCell>
            <TableCell>Consistency Rule</TableCell>
            <TableCell>Two Percent Rule</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredFirms.map((firm) => (
            <TableRow key={firm.id}>
              <TableCell>{firm.name}</TableCell>
              <TableCell>{firm.consistency_rule ? "Yes" : "No"}</TableCell>
              <TableCell>{firm.two_percent_rule ? "Yes" : "No"}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
