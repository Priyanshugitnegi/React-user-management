import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => (
  <nav className="navbar">
    <h2>User Management</h2>
    <Link to="/">Home</Link>
  </nav>
);

export default Navbar;
