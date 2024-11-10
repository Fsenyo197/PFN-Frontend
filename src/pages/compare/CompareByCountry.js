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

export default function CompareByCountry() {
  const { countryFirms } = useFirms();

  return (
    <TableContainer component={Paper}>
      <h2>Compare by Country</h2>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Firm Name</TableCell>
            <TableCell>Country</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {countryFirms.map((firm) => (
            <TableRow key={firm.id}>
              <TableCell>{firm.name}</TableCell>
              <TableCell>{firm.location}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
