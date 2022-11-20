import {Navigate, useRouteError} from 'react-router-dom';

export default function ProtectedPage() {
  const error = useRouteError();
  console.error(error);

  return <Navigate to={'/login'} />;
}
