import { useEffect } from 'react';

function CustomLoader({ children, show }) {
  useEffect(() => {
    if (show) {
      document.body.classList.add('loading');
    } else {
      document.body.classList.remove('loading');
    }

    return () => document.body.classList.remove('loading');
  }, [show]);

  return (
    <>
      {show && (
        <div className='fixed inset-0 z-[999999] grid place-items-center bg-slate-950/50 backdrop-blur-sm'>
          <div className='flex flex-col items-center gap-4 text-white'>
            <div className='h-11 w-11 animate-spin rounded-full border-4 border-white/25 border-t-white' />
            <span className='text-[13px] font-semibold tracking-wide'>Please wait...</span>
          </div>
        </div>
      )}
      {children}
    </>
  );
}

export default CustomLoader;
