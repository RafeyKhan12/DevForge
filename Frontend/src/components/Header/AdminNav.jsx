import React, { useState } from "react";
import { Link } from "react-router";
import { useSelector } from "react-redux";
import LogOut from "../Auth/LogOut";
import Logo from "../Logo/Logo";

function AdminNav() {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const [open, setOpen] = useState(false);

  return (
    <nav className="h-16 md:h-20 shrink-0 bg-white border-b shadow-sm">
      <div className="max-w-7xl mx-auto h-full px-4 md:px-6 flex items-center justify-between">
        
        <Link to="/" className="flex items-center">
          <Logo />
        </Link>

        <div className="hidden md:flex gap-6 text-sm font-medium text-gray-700">
          <Link to="/services" className="hover:text-gray-900">Services</Link>
          <Link to="/projects" className="hover:text-gray-900">Projects</Link>
          <Link to="/leads" className="hover:text-gray-900">Leads</Link>
          <Link to="/users" className="hover:text-gray-900">Users</Link>
          <Link to="/profile" className="hover:text-gray-900">Profile</Link>
        </div>

        <div className="hidden md:flex items-center gap-3">
          {!isAuthenticated ? (
            <>
              <Link to="/log-in" className="text-sm text-gray-700 hover:text-gray-900">
                Log In
              </Link>
              <Link to="/sign-up" className="text-sm text-gray-700 hover:text-gray-900">
                Sign Up
              </Link>
            </>
          ) : (
            <LogOut />
          )}
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="md:hidden flex items-center justify-center w-9 h-9 rounded-md border text-gray-700"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {open ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t bg-white px-4 py-4 space-y-3 text-sm font-medium text-gray-700">
          <Link to="/services" onClick={() => setOpen(false)} className="block">Services</Link>
          <Link to="/projects" onClick={() => setOpen(false)} className="block">Projects</Link>
          <Link to="/leads" onClick={() => setOpen(false)} className="block">Leads</Link>
          <Link to="/users" onClick={() => setOpen(false)} className="block">Users</Link>
          <Link to="/profile" onClick={() => setOpen(false)} className="block">Profile</Link>

          <div className="pt-3 border-t">
            {!isAuthenticated ? (
              <div className="flex gap-4">
                <Link to="/log-in" onClick={() => setOpen(false)}>Log In</Link>
                <Link to="/sign-up" onClick={() => setOpen(false)}>Sign Up</Link>
              </div>
            ) : (
              <LogOut />
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

export default AdminNav;
