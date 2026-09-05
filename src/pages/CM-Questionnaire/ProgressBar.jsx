import React from 'react';

function ProgressBar({ progress }) {
  return (
    <div className='bg-gray-200 rounded-lg h-[18px] mb-4'>
      <div
        className='bg-[#0970A4] h-[18px] rounded-full'
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}

export default ProgressBar;
