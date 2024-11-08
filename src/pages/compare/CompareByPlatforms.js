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

export default function CompareByPlatforms({ firms }) {
  const filteredFirms = firms.filter(
    (firm) => firm.trading_platforms.length > 0
  );

  return (
    <TableContainer component={Paper}>
      <h2>Compare by Platforms</h2>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Firm Name</TableCell>
            <TableCell>Trading Platforms</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredFirms.map((firm) => (
            <TableRow key={firm.id}>
              <TableCell>{firm.name}</TableCell>
              <TableCell>{firm.trading_platforms.join(", ")}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
