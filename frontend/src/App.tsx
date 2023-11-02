import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
