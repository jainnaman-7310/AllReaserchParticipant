import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';

function Layout({ headerState }) {
  return (
    <div className='min-h-screen bg-[#f6f7f9] text-slate-900'>
      {!headerState && <Header />}
      <div className={headerState ? 'flex min-h-screen items-start px-3 py-5 sm:items-center sm:px-5 sm:py-8' : 'w-full'}>
        <main className={headerState ? 'mx-auto w-full max-w-6xl' : 'w-full'}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default Layout;
