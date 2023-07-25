import React, { lazy } from "react";

// Helper function for lazy loading
const lazyLoad = (importFunction) => {
  const LazyComponent = lazy(importFunction);
  return (props) => (
    <React.Suspense fallback={<div>Loading...</div>}>
      <LazyComponent {...props} />
    </React.Suspense>
  );
};

export default lazyLoad;
