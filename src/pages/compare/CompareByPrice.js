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

export default function CompareByPrice() {
  const { priceFirms } = useFirms();

  return (
    <TableContainer component={Paper}>
      <h2>Compare by Price</h2>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Firm Name</TableCell>
            <TableCell>Price</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {priceFirms.map((firm) => (
            <TableRow key={firm.id}>
              <TableCell>{firm.name}</TableCell>
              <TableCell>{firm.price}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
