import Navbar from "./components/main/navbar.jsx"
import Home from "./pages/homepage.jsx"
import SignupPage from "./pages/signuppage.jsx"
import LoginPage from "./pages/loginpage.jsx"
import SettingsPage from "./pages/settingpage.jsx"
import ProfilePage from "./pages/profilepage.jsx"


import React, { useEffect } from "react"
import { Navigate, Route, Routes } from "react-router-dom"
import { useAuthStore } from "./store/userAuthStore.js"
import { useThemeStore } from "./store/useThemeStore.js"
import { LoaderCircle } from 'lucide-react'



const App = () => {

  const { authUser, checkAuth, isCheckingAuth } = useAuthStore()
  const { theme } = useThemeStore();

  useEffect(()=>{
    checkAuth()
  }, [checkAuth]);


  if (isCheckingAuth && !authUser) return (
    <div className=" flex items-center justify-center h-screen">
      <LoaderCircle className="size-20 animate-spin"/>
    </div>
  )

  // useEffect(() => {
  //   document.documentElement.setAttribute("data-theme", theme);
  // }, [theme]);

  return (
    <div>
      <Navbar />
        <Routes>
          <Route path="/home" element={authUser ? <Home /> : <Navigate to="/login" />} />
          <Route path="/" element={authUser ? <Home /> : <Navigate to="/login" />} />
          <Route path="/signup" element={!authUser ? <SignupPage /> : <Navigate to="/home" />} />
          <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to="/home" />} />
          <Route path="/settings" element={authUser ? <SettingsPage /> : <Navigate to="/login" />} />
          <Route path="/profile" element={authUser ? <ProfilePage /> : <Navigate to="/login" />} />
      </Routes>
    </div>
  );
};

export default App;

