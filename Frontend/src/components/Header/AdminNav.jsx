import React from "react";
import { Link } from "react-router";
import { useSelector } from "react-redux";
import LogOut from "../Auth/LogOut";
import Logo from "../Logo/Logo";

function AdminNav() {
  const { isAuthenticated } = useSelector((state) => state.auth);

  return (
    <nav className="h-16 md:h-20 shrink-0 bg-white shadow-sm flex items-center justify-between px-6 border-b">
      
      <Link to="/" className="font-semibold text-lg text-gray-800 hover:text-gray-900">
        <Logo />
      </Link>

      <div className="flex gap-6 text-sm font-medium text-gray-700">
        <Link to="/services" className="hover:text-gray-900">Services</Link>
        <Link to="/projects" className="hover:text-gray-900">Projects</Link>
        <Link to="/leads" className="hover:text-gray-900">Leads</Link>
        <Link to="/users" className="hover:text-gray-900">Users</Link>
        <Link to="/profile" className="hover:text-gray-900">Profile</Link>
      </div>

      <div className="flex items-center gap-3">
        {!isAuthenticated ? (
          <>
            <Link to="/log-in" className="text-sm text-gray-700 hover:text-gray-900">Log In</Link>
            <Link to="/sign-up" className="text-sm text-gray-700 hover:text-gray-900">Sign Up</Link>
          </>
        ) : (
          <LogOut />
        )}
      </div>
    </nav>
  );
}

export default AdminNav;
