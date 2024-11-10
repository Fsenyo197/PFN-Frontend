import React, { useState } from "react";
import { useFirms } from "@/pages/PropFirms";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Collapse,
  Box,
} from "@mui/material";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";

export default function CompareByRules() {
  const { rulesFirms } = useFirms();
  const [openRows, setOpenRows] = useState({});

  const toggleRow = (firmId) => {
    setOpenRows((prevOpenRows) => ({
      ...prevOpenRows,
      [firmId]: !prevOpenRows[firmId],
    }));
  };

  return (
    <TableContainer component={Paper}>
      <h2>Compare by Rules</h2>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Firm Name</TableCell>
            <TableCell>Consistency Rule</TableCell>
            <TableCell>Two Percent Rule</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rulesFirms.map((firm) => (
            <React.Fragment key={firm.id}>
              <TableRow>
                <TableCell>
                  <IconButton
                    aria-label="expand row"
                    size="small"
                    onClick={() => toggleRow(firm.id)}
                  >
                    {openRows[firm.id] ? (
                      <KeyboardArrowUp />
                    ) : (
                      <KeyboardArrowDown />
                    )}
                  </IconButton>
                </TableCell>
                <TableCell>{firm.name}</TableCell>
                <TableCell>{firm.consistency_rule ? "Yes" : "No"}</TableCell>
                <TableCell>{firm.two_percent_rule ? "Yes" : "No"}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell
                  style={{ paddingBottom: 0, paddingTop: 0 }}
                  colSpan={4}
                >
                  <Collapse in={openRows[firm.id]} timeout="auto" unmountOnExit>
                    <Box margin={1}>
                      <h4>Additional Firm Details</h4>
                      <p>Minimum Balance: {firm.min_balance}</p>
                      <p>Profit Split: {firm.profit_split}</p>
                      <p>Other Rule: {firm.other_rule}</p>
                    </Box>
                  </Collapse>
                </TableCell>
              </TableRow>
            </React.Fragment>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
