import * as React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://propfirmnews.live/">
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
        <Typography variant="h6" align="center" gutterBottom>
          Quick Links
        </Typography>
        <Box
          sx={{ display: "flex", justifyContent: "center", flexWrap: "wrap" }}
        >
          <Link color="inherit" href="/" sx={{ mx: 2 }}>
            Home
          </Link>
          {categories.map((category) => (
            <Link
              key={category}
              color="inherit"
              href={`/category/${category.toLowerCase()}`}
              sx={{ mx: 2 }}
            >
              {category}
            </Link>
          ))}
          <Link color="inherit" href="/sitemap" sx={{ mx: 2 }}>
            Sitemap
          </Link>
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
