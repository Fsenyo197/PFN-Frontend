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

function Footer(props) {
  const { description, title } = props;

  return (
    <Box
      component="footer"
      sx={{
        bgcolor: "#02353C", // Set background color to #02353C
        color: "white", // Text color for better contrast
        py: 6,
        width: "64", // Full width of the viewport
        position: "relative",
        left: 0, // Ensure it starts from the left edge
      }}
    >
      <Box sx={{ px: 2 }}>
        {" "}
        {/* Use Box instead of Container */}
        <Typography variant="h6" align="center" gutterBottom>
          {title}
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="inherit" // Use 'inherit' to apply the white text color
          component="p"
        >
          {description}
        </Typography>
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
