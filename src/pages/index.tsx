import React from 'react';
import {Outlet} from 'react-router-dom';

export default function RootPage() {
  return (
    <div style={{padding: '64px'}}>
      <Outlet />
    </div>
  );
}
