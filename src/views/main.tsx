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

const queryClient = new QueryClient();

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="login" element={<Login />} />

      <Route element={<PersistentDrawerLeft />} path="">
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="users" element={<Users />} />
        <Route path="appointments" element={<Appointments />} />
        <Route path="services" element={<Services />} />
        <Route path="products" element={<Products />} />
        <Route path="employees" element={<Employees />} />
        <Route path="reports" element={<Reports />} />
      </Route>
    </Route>
  )
);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>
);
