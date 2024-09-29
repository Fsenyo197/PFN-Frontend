import * as React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import TelegramIcon from "@mui/icons-material/Telegram";

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
        py: 3,
        width: "100%", // Full width of the viewport
        position: "relative",
        left: 0, // Ensure it starts from the left edge
      }}
    >
      <Box sx={{ px: 2 }}>
        {/* Centered Follow Us Section */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center", // Center items horizontally
            justifyContent: "center", // Center items vertically
            mt: 4, // Add top margin for spacing
          }}
        >
          <Typography variant="h6" sx={{ mb: 1 }}>
            Follow Us
          </Typography>

          {/* Social Media Icons Wrapper */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center", // Center icons
              width: "100%", // Full width
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                width: "150px", // Width for icons container
              }}
            >
              <Link
                href="https://facebook.com"
                target="_blank"
                color="inherit"
                sx={{ "&:hover": { color: "#1877F2" } }}
              >
                <FacebookIcon />
              </Link>
              <Link
                href="https://twitter.com"
                target="_blank"
                color="inherit"
                sx={{ "&:hover": { color: "#1DA1F2" } }}
              >
                <TwitterIcon />
              </Link>
              <Link
                href="https://telegram.com"
                target="_blank"
                color="inherit"
                sx={{ "&:hover": { color: "#E1306C" } }}
              >
                <TelegramIcon />
              </Link>
            </Box>
          </Box>
        </Box>

        {/* Categories Section */}
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

        {/* Disclaimer Section */}
        <Box sx={{ mt: 3, mb: 3 }}>
          <Typography
            variant="body2"
            color="white"
            align="center"
            sx={{ fontSize: "0.875rem", mb: 2 }}
          >
            <strong>Disclaimer:</strong> The content published on{" "}
            <Link
              color="inherit"
              href="https://propfirmnews.live/"
              underline="hover"
            >
              Prop Firm News
            </Link>{" "}
            is for general informational purposes only. Nothing on this website
            should be considered as professional investment advice, an offer, or
            a solicitation of any kind. Users should seek independent financial
            advice. Trading in financial markets involves risk, and the website
            and its affiliates assume no responsibility for any losses or
            damages resulting from the use or misuse of the content provided.
          </Typography>
        </Box>

        {/* Copyright Section */}
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
