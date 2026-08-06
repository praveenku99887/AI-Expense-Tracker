import { Routes, Route } from "react-router-dom";

import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import Expenses from "../pages/Expenses";
import UploadStatement from "../pages/UploadStatement";
import NotFound from "../pages/NotFound";

function AppRoutes() {
  return (
    <Routes>

      <Route path="/" element={<Login />} />

      <Route path="/register" element={<Register />} />

      <Route path="/dashboard" element={<Dashboard />} />

      <Route path="/expenses" element={<Expenses />} />

      <Route path="/upload" element={<UploadStatement />} />

      <Route path="*" element={<NotFound />} />

    </Routes>
  );
}

export default AppRoutes;