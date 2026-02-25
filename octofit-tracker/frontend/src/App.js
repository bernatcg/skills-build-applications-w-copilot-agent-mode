
import React from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink, Link } from 'react-router-dom';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';
import './App.css';

const navItems = [
  { to: '/activities',  label: 'Activities',  icon: 'bi-lightning-charge-fill' },
  { to: '/leaderboard', label: 'Leaderboard', icon: 'bi-trophy-fill' },
  { to: '/teams',       label: 'Teams',       icon: 'bi-people-fill' },
  { to: '/users',       label: 'Users',       icon: 'bi-person-circle' },
  { to: '/workouts',    label: 'Workouts',    icon: 'bi-heart-pulse-fill' },
];

const quickStats = [
  { to: '/activities',  label: 'Activities',  icon: 'bi-lightning-charge-fill', color: 'primary',  bg: '#e8f0fe' },
  { to: '/leaderboard', label: 'Leaderboard', icon: 'bi-trophy-fill',           color: 'warning',  bg: '#fff8e1' },
  { to: '/teams',       label: 'Teams',       icon: 'bi-people-fill',           color: 'success',  bg: '#e6f9f0' },
  { to: '/users',       label: 'Users',       icon: 'bi-person-circle',         color: 'info',     bg: '#e0f7fa' },
  { to: '/workouts',    label: 'Workouts',    icon: 'bi-heart-pulse-fill',      color: 'danger',   bg: '#fce4ec' },
];

function HomePage() {
  return (
    <div>
      {/* Hero */}
      <div className="octofit-hero text-center mb-5">
        <img
          src="/octofit-small.png"
          alt="OctoFit"
          className="mb-3"
          onError={e => { e.target.style.display = 'none'; }}
        />
        <h1 className="display-5 fw-bold mb-2">Welcome to OctoFit Tracker</h1>
        <p className="lead mb-4 opacity-90">
          Track activities, compete on leaderboards, and crush your fitness goals with your team.
        </p>
        <Link to="/activities" className="btn btn-light btn-lg fw-semibold shadow-sm me-2">
          <i className="bi bi-lightning-charge-fill text-primary me-2"></i>Get Started
        </Link>
        <Link to="/leaderboard" className="btn btn-outline-light btn-lg fw-semibold">
          <i className="bi bi-trophy-fill me-2"></i>View Leaderboard
        </Link>
      </div>

      {/* Quick-nav cards */}
      <div className="row g-3">
        {quickStats.map(({ to, label, icon, color, bg }) => (
          <div className="col-6 col-md-4 col-lg" key={to}>
            <Link to={to} className="quick-stat-card card d-block p-3" style={{ background: bg }}>
              <div className={`quick-stat-icon text-${color} mb-2`}>
                <i className={`bi ${icon}`}></i>
              </div>
              <div className={`fw-bold text-${color}`}>{label}</div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <nav className="navbar navbar-expand-lg navbar-dark octofit-navbar mb-4">
        <div className="container">
          <Link className="navbar-brand fw-bold d-flex align-items-center gap-2" to="/">
            <i className="bi bi-activity fs-4"></i>
            OctoFit Tracker
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0 gap-1">
              {navItems.map(({ to, label, icon }) => (
                <li className="nav-item" key={to}>
                  <NavLink
                    className={({ isActive }) => `nav-link d-flex align-items-center gap-1${isActive ? ' active' : ''}`}
                    to={to}
                  >
                    <i className={`bi ${icon}`}></i>
                    {label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>

      <div className="container pb-5">
        <Routes>
          <Route path="/"            element={<HomePage />} />
          <Route path="/activities"  element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/teams"       element={<Teams />} />
          <Route path="/users"       element={<Users />} />
          <Route path="/workouts"    element={<Workouts />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
