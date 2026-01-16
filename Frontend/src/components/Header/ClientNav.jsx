import React, { useState } from "react";
import { Link } from "react-router";
import { useSelector } from "react-redux";
import LogOut from "../Auth/LogOut";
import Logo from "../Logo/Logo";

function ClientNav() {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-white border-b">
      <div className="h-16 flex items-center justify-between px-4 md:px-6">
        <Link to="/" className="font-semibold text-lg">
          <Logo />
        </Link>

        <div className="hidden md:flex gap-6 text-sm text-gray-700">
          <Link to="/client-services" className="hover:text-gray-900">Services</Link>
          <Link to="/client-projects" className="hover:text-gray-900">Projects</Link>
          <Link to="/contact" className="hover:text-gray-900">Contact</Link>
          <Link to="/profile" className="hover:text-gray-900">Profile</Link>
        </div>

        <div className="hidden md:flex items-center gap-3">
          {!isAuthenticated ? (
            <>
              <Link to="/log-in" className="text-sm hover:text-gray-900">Log In</Link>
              <Link to="/sign-up" className="text-sm hover:text-gray-900">Sign Up</Link>
            </>
          ) : (
            <LogOut />
          )}
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-gray-700 text-2xl"
        >
          ☰
        </button>
      </div>

      {open && (
        <div className="md:hidden px-4 pb-4 flex flex-col gap-4 text-sm text-gray-700">
          <Link to="/client-services" onClick={() => setOpen(false)}>Services</Link>
          <Link to="/client-projects" onClick={() => setOpen(false)}>Projects</Link>
          <Link to="/contact" onClick={() => setOpen(false)}>Contact</Link>
          <Link to="/profile" onClick={() => setOpen(false)}>Profile</Link>

          <div className="pt-2 border-t">
            {!isAuthenticated ? (
              <div className="flex flex-col gap-2">
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

export default ClientNav;
