import React, { useState } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

const GenericTable = ({ columns = [], data = [], expandableRenderer }) => {
  const [expandedRows, setExpandedRows] = useState({});

  const toggleRowExpansion = (rowId) => {
    setExpandedRows((prev) => ({
      ...prev,
      [rowId]: !prev[rowId],
    }));
  };

  if (data.length === 0) {
    return (
      <Paper sx={{ p: 2, textAlign: "center" }}>
        <Typography variant="body1">No data available</Typography>
      </Paper>
    );
  }

  return (
    <Box>
      <TableContainer component={Paper} sx={{ overflowX: "auto" }}>
        <Table sx={{ minWidth: 650 }}>
          {/* Table Head */}
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.key}
                  align={column.align || "left"}
                  sx={{ fontWeight: 700, fontSize: 16 }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          {/* Table Body */}
          <TableBody>
            {data.map((item, rowIndex) => (
              <React.Fragment key={item.id || rowIndex}>
                {/* Main Row */}
                <TableRow
                  hover
                  onClick={() => toggleRowExpansion(item.id || rowIndex)}
                  sx={{ cursor: "pointer" }}
                >
                  {columns.map((column) => (
                    <TableCell
                      key={column.key}
                      align={column.align || "left"}
                      sx={column.cellStyle}
                    >
                      {column.render
                        ? column.render(item[column.key], item)
                        : item[column.key]}
                    </TableCell>
                  ))}
                </TableRow>

                {/* Expandable Row */}
                {expandedRows[item.id || rowIndex] && expandableRenderer && (
                  <TableRow>
                    <TableCell colSpan={columns.length}>
                      <Box padding={2}>{expandableRenderer(item)}</Box>
                    </TableCell>
                  </TableRow>
                )}
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default GenericTable;
