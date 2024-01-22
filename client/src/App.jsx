import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css";

import { AuthProvider } from "./context/authContext";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import NavigationBar from "./components/NavigationBar";
import AuthRoute from "./utils/protectedRoute";

function App() {
  return (
    <>
      <AuthProvider>
        <Router>
          <NavigationBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              exact
              path="/login"
              element={<AuthRoute Component={Login} />}
            />
            <Route
              path="/register"
              element={<AuthRoute Component={Register} />}
            />
          </Routes>
        </Router>
      </AuthProvider>
    </>
  );
}

export default App;
