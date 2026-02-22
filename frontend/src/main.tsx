import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dahboard";
import Signup from "./pages/SignUp";
import CreateWeek from "./pages/CreateWeek";
import WeekDetails from "./pages/WeekDetails";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/weeks/new" element={<CreateWeek />} />
      <Route path="/weeks/:id" element={<WeekDetails />} />
    </Routes>
  </BrowserRouter>
);