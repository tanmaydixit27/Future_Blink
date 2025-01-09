import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import FlowEditor from "./pages/FlowEditor";
import { CssBaseline } from "@mui/material";
import { FlowChartProvider } from "./context/FLowChartContext";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check if the user is already authenticated by verifying the token in localStorage
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true); // Set to true if the token exists
    }
  }, []);

  return (
    <FlowChartProvider>
      <Router>
        <CssBaseline />
        <Routes>
          {/* Redirect to SignIn if not authenticated */}
          <Route
            path="/"
            element={isAuthenticated ? <Dashboard /> : <Navigate to="/signin" />}
          />
          <Route
            path="/flow-editor"
            element={isAuthenticated ? <FlowEditor /> : <Navigate to="/signin" />}
          />
          <Route
            path="/signin"
            element={<SignIn setIsAuthenticated={setIsAuthenticated} />}
          />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </Router>
    </FlowChartProvider>
  );
}

export default App;
