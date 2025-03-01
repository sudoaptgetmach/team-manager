import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import UserList from './components/UserList';
import AddUser from './components/AddUser';
import Login from './components/Login';
import './App.css';

const Home = () => (
  <div className="home">
    <h1>Welcome to Team Manager</h1>
    <p>Manage your team efficiently with our tools.</p>
  </div>
);

const Navbar = () => (
  <nav className="navbar">
    <ul>
      <li><Link to="/">Home</Link></li>
      <li><Link to="/users">User List</Link></li>
      <li><Link to="/add-user">Add User</Link></li>
      <li><Link to="/login">Login</Link></li>
    </ul>
  </nav>
);

const Footer = () => (
  <footer className="footer">
    <p>&copy; 2025 Team Manager. All rights reserved.</p>
  </footer>
);

const App = () => {
  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <div className="content">
          <Routes>
            <Route path="/users" element={<UserList />} />
            <Route path="/add-user" element={<AddUser />} />
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Home />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
};

export default App;