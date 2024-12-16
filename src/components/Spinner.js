import React, { useState, useEffect } from "react";
import { CircularProgress, Box, Typography } from "@mui/material";

export default function Spinner({ delay = 2000 }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShow(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return show ? (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
    >
      <CircularProgress size={50} sx={{ color: "#02353C" }} />
      <Typography
        sx={{ marginTop: "12px", fontSize: "18px", color: "#02353C" }}
      >
        Just a moment...
      </Typography>
    </Box>
  ) : null;
}
