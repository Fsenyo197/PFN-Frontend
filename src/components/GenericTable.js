import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  Collapse,
  Box,
} from "@mui/material";

export default function GenericTable({ headers, rows, rowKey, renderDetails }) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openRows, setOpenRows] = useState({});

  // Handle toggling of collapse when clicking on a cell
  const handleToggle = (rowId) => {
    setOpenRows((prevState) => ({
      ...prevState,
      [rowId]: !prevState[rowId],
    }));
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const paginatedRows = rows.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            {renderDetails && <TableCell />}
            {headers.map((header) => (
              <TableCell key={header}>{header}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {paginatedRows.map((row) => {
            const rowId = rowKey(row);
            return (
              <React.Fragment key={rowId}>
                <TableRow>
                  {renderDetails && (
                    <TableCell
                      onClick={() => handleToggle(rowId)} // Clicking the cell toggles the collapse
                      style={{ cursor: "pointer" }}
                    >
                      {openRows[rowId] ? "Collapse" : "Expand"}
                    </TableCell>
                  )}
                  {Object.values(row).map((value, index) => (
                    <TableCell key={index} onClick={() => handleToggle(rowId)}>
                      {value}
                    </TableCell>
                  ))}
                </TableRow>
                {renderDetails && (
                  <TableRow>
                    <TableCell
                      colSpan={headers.length + 1}
                      style={{ padding: 0 }}
                    >
                      <Collapse
                        in={openRows[rowId]}
                        timeout="auto"
                        unmountOnExit
                      >
                        <Box margin={1}>{renderDetails(row)}</Box>
                      </Collapse>
                    </TableCell>
                  </TableRow>
                )}
              </React.Fragment>
            );
          })}
        </TableBody>
      </Table>
      <TablePagination
        component="div"
        count={rows.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </TableContainer>
  );
}
