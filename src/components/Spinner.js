import React from 'react';

const Spinner = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <l-newtonsCradle style={{ fontSize: '80px', color: 'red' }}></l-newtonsCradle>
      <p style={{ marginTop: '16px', fontSize: '18px' }}>Just a moment...</p>
    </div>
  );
};

export default Spinner;
