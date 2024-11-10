import React from "react";
import { useFirms } from "@/pages/PropFirms";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

export default function CompareByYearEstablished() {
  const { establishedYearFirms } = useFirms();

  return (
    <TableContainer component={Paper}>
      <h2>Compare by Year Established</h2>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Firm Name</TableCell>
            <TableCell>Year Established</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {establishedYearFirms.map((firm) => (
            <TableRow key={firm.id}>
              <TableCell>{firm.name}</TableCell>
              <TableCell>{firm.year_established}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
