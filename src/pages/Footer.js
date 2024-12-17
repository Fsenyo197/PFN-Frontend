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
      color="#666"
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
  const categories = [
    "Prop News",
    "Payouts",
    "Trading Rules",
    "Prop Firms",
    "Discount Codes",
  ];

  const compareFirms = [
    "Country",
    "Payout Options",
    "Platforms",
    "Year Established",
    "Rules",
    "Prices",
  ];

  return (
    <Box
      component="footer"
      sx={{
        bgcolor: "#02353C",
        color: "white",
        py: 3,
        width: "100%",
        position: "relative",
        left: 0,
      }}
    >
      <Box sx={{ px: 2 }}>
        {/* Centered Follow Us Section */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            mt: 4,
          }}
        >
          <Typography variant="h6" sx={{ mb: 1 }}>
            Follow Us
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              width: "100%",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                width: "150px",
              }}
            >
              <Link
                href="https://www.facebook.com/profile.php?id=61566377468031&mibextid=ZbWKwL"
                target="_blank"
                color="inherit"
                sx={{ "&:hover": { color: "#1877F2" } }}
              >
                <FacebookIcon />
              </Link>
              <Link
                href="https://twitter.com/propfirmnews"
                target="_blank"
                color="inherit"
                sx={{ "&:hover": { color: "#1DA1F2" } }}
              >
                <TwitterIcon />
              </Link>
              <Link
                href="https://t.me/propfirmnewslive"
                target="_blank"
                color="inherit"
                sx={{ "&:hover": { color: "#E1306C" } }}
              >
                <TelegramIcon />
              </Link>
            </Box>
          </Box>
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            m: 4,
            mx: { md: 8, lg: 12 },
          }}
        >
          {/* Categories Section */}
          <Box>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Categories
            </Typography>
            {categories.map((category) => (
              <Link
                key={category}
                color="inherit"
                href={`/categories/${category
                  .toLowerCase()
                  .replace(/\s+/g, "-")}`}
                sx={{
                  display: "block",
                  my: 1,
                  "&:hover": { textDecoration: "none" },
                }}
              >
                {category}
              </Link>
            ))}
          </Box>

          {/* Compare Section */}
          <Box>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Compare Platforms
            </Typography>
            {compareFirms.map((compare) => (
              <Link
                key={compare}
                color="inherit"
                href={`/compare/${compare.toLowerCase().replace(/\s+/g, "-")}`}
                sx={{
                  display: "block",
                  my: 1,
                  "&:hover": { textDecoration: "none" },
                }}
              >
                By {compare}
              </Link>
            ))}
          </Box>
        </Box>

        {/* Disclaimer Section */}
        <Box sx={{ mt: 3, mb: 3 }}>
          <Typography
            variant="body2"
            color="white"
            align="center"
            sx={{ fontSize: "0.875rem", mb: 2 }}
          >
            <strong>Disclaimer:</strong> The content provided by Prop Firm News
            is intended for general informational purposes only. It does not
            constitute professional financial advice, recommendations, or
            endorsements of any securities, investment strategies, or financial
            products. All information is based on publicly available data and is
            not guaranteed for accuracy or completeness. Users should conduct
            their own research and consult with a qualified financial advisor
            before making any investment decisions. Prop Firm News and its
            affiliates are not liable for any losses or damages resulting from
            the use of this information. Trading in financial markets involves
            significant risk, and it may not be suitable for all investors.
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
