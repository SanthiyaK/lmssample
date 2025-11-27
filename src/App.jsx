"use client"

import { BrowserRouter, Routes, Route } from "react-router-dom"
import { useState } from "react"
import { AuthProvider } from "./context/AuthContext"
import { ProtectedRoute } from "./components/ProtectedRoute"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import StudentDashboard from "./pages/dashboards/StudentDashboard"
import InstructorDashboard from "./pages/dashboards/InstructorDashboard"
import AdminDashboard from "./pages/dashboards/AdminDashboard"
import NotFound from "./pages/NotFound"
import Courses from "./pages/Courses"
import CourseDetail from "./pages/CourseDetail"
import CreateCourse from "./pages/CreateCourse"
import "./App.css"

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      <Route path="/courses" element={<Courses />} />
      <Route path="/courses/:courseId" element={<CourseDetail />} />
      <Route path="/create-course" element={<CreateCourse />} />

      <Route
        path="/dashboard/student"
        element={
          <ProtectedRoute requiredRole="student">
            <StudentDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard/instructor"
        element={
          <ProtectedRoute requiredRole="instructor">
            <InstructorDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard/admin"
        element={
          <ProtectedRoute requiredRole="admin">
            <AdminDashboard />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

function App() {
  const [isDark, setIsDark] = useState(false)

  const toggleTheme = () => {
    setIsDark(!isDark)
    document.documentElement.classList.toggle("dark", !isDark)
  }

  return (
    <AuthProvider>
      <BrowserRouter>
        <div className={`app-container ${isDark ? "dark" : "light"}`}>
          <Navbar onThemeToggle={toggleTheme} isDark={isDark} />
          <main className="main-content">
            <AppRoutes />
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
