import {createBrowserRouter, RouterProvider, Route} from 'react-router-dom';
import Error from '@/pages/error';
const router = createBrowserRouter([
  {
    path: '/',
    element: <div>Home</div>,
    errorElement: <Error />,
  },
]);

export default router;
