import "../index.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"; // Importar QueryClient y Provider
import { Login } from "./Login.tsx";
import { Users } from "./Users.tsx";
import { Products } from "./Products.tsx";
import { Services } from "./Services.tsx";
import { Appointments } from "./Appointments.tsx";
import { PersistentDrawerLeft } from "../components/Sidebar";
import { Dashboard } from "./Dashboard.tsx";
import { Employees } from "./Employees.tsx";
import { Reports } from "./Reports.tsx";
import { Inventory } from "./Inventory.tsx";

const queryClient = new QueryClient();
const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    element: <PersistentDrawerLeft />,
    children: [
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "users",
        element: <Users />,
      },
      {
        path: "appointments",
        element: <Appointments />,
      },
      {
        path: "services",
        element: <Services />,
      },
      {
        path: "products",
        element: <Products />,
      },
      {
        path: "employees",
        element: <Employees />,
      },
      {
        path: "reports",
        element: <Reports />,
      },
      {
        path: "inventory",
        element: <Inventory />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>
);
