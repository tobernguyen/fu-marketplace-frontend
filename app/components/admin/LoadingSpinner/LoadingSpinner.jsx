import React from 'react';
import { ClipLoader } from 'halogen';

const LoadingSpinner = () => {
  return (
    <div className="container-fluid text-center">
      <ClipLoader color="#b1211e" size="40px" />
    </div>
  );
};

export default LoadingSpinner;
