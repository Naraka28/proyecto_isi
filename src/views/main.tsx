import '../index.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'; // Importar QueryClient y Provider
import { Login } from './Login.tsx';
import { Users } from './Users.tsx';
import { PersistentDrawerLeft } from '../components/Sidebar';


const queryClient = new QueryClient();

const router= createBrowserRouter([
  {
    path: "/",
    element: <Login />,

  },
  {
    path: "/dashboard",
    element: <PersistentDrawerLeft />,
  },
  {
    path:"/users",
    element:<Users />
  }

]);





createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>  {/* Envolver con QueryClientProvider */}
      <RouterProvider router={router}/>
    </QueryClientProvider>
  </StrictMode>,
)
