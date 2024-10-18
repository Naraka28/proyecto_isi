import '../index.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'; // Importar QueryClient y Provider
import { Login } from './Login.tsx';
import { Users } from './Users.tsx';
import { Products } from './Products.tsx';
import { Services } from './Services.tsx';
import { Appointments } from './Appointments.tsx';
import { PersistentDrawerLeft } from '../components/Sidebar';
import { Dashboard } from './Dashboard.tsx';
import { Employees } from './Employees.tsx';


const queryClient = new QueryClient();

const router= createBrowserRouter([
  {
    path: "/",
    element: <Login />,

  },
  {
    path: "/dashboard",
    element: <PersistentDrawerLeft children={<Dashboard/>} />,
  },
  {
    path:"/users",
    element:  <PersistentDrawerLeft children={<Users />} />
  },
  {
    path:'/appointments',
    element: <PersistentDrawerLeft children={<Appointments/>}/>
  },
  {
    path:'/employees',
    element: <PersistentDrawerLeft children={<Employees/>}/>
  },
  {
    path:'/products',
    element: <PersistentDrawerLeft children={<Products/>}/>
  },
  {
    path:'/services',
    element: <PersistentDrawerLeft children={<Services/>}/>
  },

]);





createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>  {/* Envolver con QueryClientProvider */}
      <RouterProvider router={router}/>
    </QueryClientProvider>
  </StrictMode>,
)
