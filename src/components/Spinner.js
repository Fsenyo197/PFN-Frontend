import React, { useEffect } from 'react';

export const LoaderEnum = {
  CARDIO: 'cardio',
};

const Loader = ({ loader, size = 30, stroke = '3', speed = '2', color = '#02353C' }) => {
  useEffect(() => {
    const load = async () => {
      const ldrsModule = await import('ldrs');
      ldrsModule[loader].register('ldrs-icon');
    };
    load();
  }, [loader]);

  return (
    <div>
      {/* Most probably you will get an error that ldrs-icon is not found */}
      <ldrs-icon size={size.toString()} stroke={stroke} speed={speed} color={color}></ldrs-icon>
    </div>
  );
};

export default Loader;
