import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';

function Layout({ headerState }) {
  return (
    <>
      {!headerState && <Header />}
      <div className={headerState ? 'w-full h-screen flex flex-col justify-center items-center px-4' : ''}>
        <main className='container'>
          <Outlet />
        </main>
      </div>
    </>
  );
}

export default Layout;
