import React from 'react';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

const LazyLoad = () => {
  React.useEffect(() => {
    NProgress.start();
    return () => {
      NProgress.done();
    };
  });

  return '';
};

export default LazyLoad;
