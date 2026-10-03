import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';

function Layout({ headerState }) {
  return (
    <div className={headerState ? 'survey-app-shell survey-active-shell' : 'survey-app-shell survey-landing-mode'}>
      {!headerState && <Header />}
      <div className={headerState ? 'survey-active-stage' : 'survey-landing-stage'}>
        <main className='container'>
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default Layout;
