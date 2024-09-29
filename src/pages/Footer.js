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
            The content published on Prop Firm News is provided for general
            informational purposes only and should not be construed as
            professional investment advice. None of the articles, reports,
            opinions, or other materials available on this website constitute an
            offer, recommendation, or endorsement of any particular security,
            investment, company, financial product, or trading strategy. Prop
            Firm News does not offer personalized financial advice or make any
            investment recommendations. The information presented is based on
            publicly available data and should not be relied upon as the sole
            basis for making investment decisions. Users are encouraged to seek
            independent financial advice from a qualified professional before
            making any investment. Risk Disclosure The use of information
            contained on this website is at your own risk. Prop Firm News and
            its affiliates assume no responsibility for any losses, damages, or
            adverse outcomes resulting from reliance on the information
            provided. Trading in financial markets involves significant risk,
            including the potential loss of capital, and may not be suitable for
            all investors. No Offer or Solicitation Nothing contained on this
            website should be interpreted as an offer to buy or sell any
            security, commodity, futures, forex, or financial product, nor as a
            solicitation of any offer to engage in any trading activity. Prop
            Firm News is not responsible for the accuracy, completeness, or
            reliability of third-party content, including news articles, market
            data, and analysis. By accessing and using this website, you
            acknowledge that Prop Firm News is not liable for any decisions made
            or actions taken based on the information provided herein. This
            version adds more specific details and clarifies that the website is
            not responsible for the accuracy of third-party information, while
            also encouraging users to seek independent advice.
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
