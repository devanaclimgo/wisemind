import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Signup from "./pages/SignUp";
import CreateWeek from "./pages/CreateWeek";
import WeekDetails from "./pages/WeekDetails";
import ErrorBoundary from "./components/ErrorBoundary";
import "./index.css";
import LandingPage from "./pages/LandingPage";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <ErrorBoundary>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/weeks/new" element={<CreateWeek />} />
        <Route path="/weeks/:id" element={<WeekDetails />} />
      </Routes>
    </ErrorBoundary>
  </BrowserRouter>,
);