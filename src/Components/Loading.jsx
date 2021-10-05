import * as React from 'react';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

export default function Loading() {
  return (
    <Box sx={{ color: 'grey.500',width:'100vw', height:'100vh',display:'flex',alignItems: 'center',justifyContent: 'center'}} spacing={2} direction="row">
      
      <CircularProgress />
      
    </Box>
  );
}