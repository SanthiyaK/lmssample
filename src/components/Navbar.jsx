"use client"

import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../hooks/useAuth"
import "./Navbar.css"

export default function Navbar({ onThemeToggle, isDark }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate("/")
    setIsMenuOpen(false)
  }

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <span className="logo-icon">📚</span>
          LearnHub
        </Link>

        <button className="menu-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu">
          <span></span>
          <span></span>
          <span></span>
        </button>

        <div className={`nav-menu ${isMenuOpen ? "active" : ""}`}>
          <Link to="/" className="nav-link" onClick={() => setIsMenuOpen(false)}>
            Home
          </Link>

          {user ? (
            <>
              <Link to={`/dashboard/${user.role}`} className="nav-link" onClick={() => setIsMenuOpen(false)}>
                Dashboard
              </Link>
              <span className="user-greeting">Hi, {user.fullName}</span>
              <button className="btn-logout" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-link" onClick={() => setIsMenuOpen(false)}>
                Login
              </Link>
              <Link to="/signup" className="nav-link btn-primary" onClick={() => setIsMenuOpen(false)}>
                Sign Up
              </Link>
            </>
          )}

          <button className="theme-toggle" onClick={onThemeToggle} aria-label="Toggle theme">
            {isDark ? "☀️" : "🌙"}
          </button>
        </div>
      </div>
    </nav>
  )
}
