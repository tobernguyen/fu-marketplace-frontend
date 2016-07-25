import React from 'react';
import { ClipLoader } from 'halogen';

const LoadingSpinner = () => {
  return (
    <div className="container-fluid text-center">
      <ClipLoader color="#c0392b" size="40px" />
    </div>
  );
};

export default LoadingSpinner;
