import React from 'react';
import { CircularProgress, Box, Typography } from '@mui/material';

const Spinner = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
    >
      <CircularProgress size={80} sx={{ color: '#02353C' }} />
      <Typography
        sx={{ marginTop: '16px', fontSize: '18px', color: '#02353C' }}
      >
        Just a moment...
      </Typography>
    </Box>
  );
};

export default Spinner;
