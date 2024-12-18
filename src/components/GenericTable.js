import React, { useState } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TablePagination from "@mui/material/TablePagination";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import UserGuide from "./UserGuide";

const GenericTable = ({ columns = [], data = [], expandableRenderer }) => {
  const [expandedRows, setExpandedRows] = useState({});
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");

  const toggleRowExpansion = (rowId) => {
    setExpandedRows((prev) => ({
      ...prev,
      [rowId]: !prev[rowId],
    }));
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value.toLowerCase());
    setPage(0);
  };

  // Filter the data based on the search query
  const filteredData = data.filter((item) =>
    columns.some((column) => {
      const value = item[column.key];
      return (
        typeof value === "string" && value.toLowerCase().includes(searchQuery)
      );
    })
  );

  // Paginate the filtered data
  const paginatedData = filteredData.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <Box>
      {/* Search Bar and User Guide */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          margin: 2,
          marginTop: 4,
        }}
      >
        {/* Search Bar with responsive width */}
        <TextField
          label="Search preferred firm"
          variant="outlined"
          value={searchQuery}
          onChange={handleSearchChange}
          sx={{
            width: {
              xs: "70%",
              sm: "80%",
              md: "90%",
            },
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "#02353C",
              },
              "&:hover fieldset": {
                borderColor: "#02353C",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#02353C",
              },
            },
            "& .MuiInputLabel-root": {
              color: "#02353C",
            },
            "& .MuiInputLabel-root.Mui-focused": {
              color: "#02353C",
            },
            "& input": {
              color: "#02353C",
            },
          }}
        />

        {/* User Guide with larger size and label */}
        <Box sx={{ flex: 1, marginLeft: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            User Guide
          </Typography>
          <UserGuide />
        </Box>
      </Box>

      <TableContainer component={Paper} sx={{ overflowX: "auto", margin: 2 }}>
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
            {paginatedData.length > 0 ? (
              paginatedData.map((item, rowIndex) => (
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
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} align="center">
                  No matching data found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={filteredData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Box>
  );
};

export default GenericTable;
