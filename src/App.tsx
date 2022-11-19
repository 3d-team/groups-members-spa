import {Route, Routes, RouterProvider} from 'react-router-dom';

import {QueryClient, QueryClientProvider, useQuery} from 'react-query';
import router from './routes';
const queryClient = new QueryClient();

function App() {
  return <RouterProvider router={router} />;
}

export default App;
