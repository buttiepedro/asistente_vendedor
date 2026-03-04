import { Routes, Route } from "react-router-dom"
import ProtectedRoute from "./ProtectedRoutes"
import Error404 from "../pages/Error404.jsx"
import Login from "../pages/Login.jsx"
import Dashboard from "../pages/Dashboard.jsx"
import MainLayout from "../layouts/MainLayout.jsx"
import Lineas from "../pages/Lineas.jsx"

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="*" element={<Error404 />} />
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />

      <Route element={<MainLayout />}>
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/lineas" element={<Lineas />} />
        </Route>
      </Route>
    </Routes>
  )
}