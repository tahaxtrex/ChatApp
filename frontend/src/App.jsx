import React from "react"
import Navbar from "./components/navbar.jsx"
import { Route, Routes } from "react-router-dom"

import Home from "./pages/homepage.jsx"
import SignupPage from "./pages/signuppage.jsx"
import LoginPage from "./pages/loginpage.jsx"
import SettingsPage from "./pages/settingpage.jsx"
import ProfilePage from "./pages/profilepage.jsx"

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </div>
  );
};

export default App;

