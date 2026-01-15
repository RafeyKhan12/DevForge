import React from "react";
import { Link } from "react-router";
import { useSelector } from "react-redux";
import LogOut from "../Auth/LogOut";
import Logo from "../Logo/Logo";

function ClientNav() {
  const { isAuthenticated } = useSelector((state) => state.auth);

  return (
    <nav className="flex items-center justify-between px-6 py-4 border-b">
      <Link to="/" className="font-semibold text-lg"><Logo /></Link>

      <div className="flex gap-5 text-sm">
        <Link to="/client-services">Services</Link>
        <Link to="/client-projects">Projects</Link>
        <Link to="/contact">Contact</Link>
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

export default ClientNav;
