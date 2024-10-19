import React from 'react';

const Spinner = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <l-newtons-cradle style={{ fontSize: '80px', color: 'red' }}></l-newtons-cradle>
      <p style={{ marginTop: '16px', fontSize: '18px', color: 'red' }}>Just a moment...</p>
    </div>
  );
};

export default Spinner;
