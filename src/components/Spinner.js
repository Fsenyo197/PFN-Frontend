import { useEffect, useState } from 'react';
import { Typography } from '@mui/material';
import dynamic from 'next/dynamic';

// Dynamically import the Loader component from 'ldrs'
const LoaderComponent = dynamic(() => import('ldrs'), {
  ssr: false,
});

const Spinner = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsClient(true);
    }
  }, []);

  if (!isClient) return null;

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div>
        <LoaderComponent type="newtonsCradle" />
      </div>
      <Typography variant="h6" sx={{ ml: 2, color: "#02353C" }}>
        Just a moment...
      </Typography>
    </div>
  );
};

export default Spinner;
