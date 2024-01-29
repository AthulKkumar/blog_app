import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css";

import { AuthProvider } from "./context/authContext";

import Login from "./pages/Login/Login.jsx";
import Register from "./pages/Register/Register.jsx";
import Home from "./pages/Home";
import NavigationBar from "./components/Navbar/NavigationBar.jsx";
import AuthRoute from "./utils/protectedRoute";
import SinglePost from "./pages/SinglePost";

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
            <Route exact path="/posts/:postId" element={<SinglePost />} />
          </Routes>
        </Router>
      </AuthProvider>
    </>
  );
}

export default App;
