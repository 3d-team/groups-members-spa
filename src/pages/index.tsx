import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

export default function RootPage() {
  useEffect(() => {
    document.title = 'Classroom'
  }, []);

  return (
    <div>
      <Outlet />
    </div>
  );
}
