import React from 'react';

function LazyLoad() {
  return (
    <div className='fixed left-0 top-0 z-[999999] h-0.5 w-full overflow-hidden bg-slate-200'>
      <div className='h-full w-1/3 animate-pulse rounded-full bg-teal-700' />
    </div>
  );
}

export default LazyLoad;
