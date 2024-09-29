import * as React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";

function Copyright() {
  return (
    <Typography
      variant="body2"
      color="white"
      align="center"
      sx={{ fontSize: "0.875rem", mt: 2 }}
    >
      {"Copyright © "}
      <Link
        color="inherit"
        href="https://propfirmnews.live/"
        underline="hover"
        sx={{ fontWeight: "bold" }}
      >
        Prop Firm News
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

function Footer() {
  const categories = ["News", "Prices", "Payouts", "Rules", "Platforms"]; // Add your dynamic categories if needed

  return (
    <Box
      component="footer"
      sx={{
        bgcolor: "#02353C", // Set background color to #02353C
        color: "white", // Text color for better contrast
        py: 6,
        width: "100%", // Full width of the viewport
        position: "relative",
        left: 0, // Ensure it starts from the left edge
      }}
    >
      <Box sx={{ px: 2 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column", // Set flex direction to column
            mb: 2,
          }}
        >
          <Link
            color="inherit"
            href="/"
            sx={{
              my: 1, // Add vertical margin for spacing
              fontWeight: "bold",
              "&:hover": { textDecoration: "none" },
            }}
          >
            Home
          </Link>
          {categories.map((category) => (
            <Link
              key={category}
              color="inherit"
              href={`/categories/${category.toLowerCase()}`}
              sx={{ my: 1, "&:hover": { textDecoration: "none" } }} // Add vertical margin for spacing
            >
              {category}
            </Link>
          ))}
        </Box>
        <Copyright />
      </Box>
    </Box>
  );
}

Footer.propTypes = {
  description: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default Footer;
