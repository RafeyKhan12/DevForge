import React from "react";
import { useSelector } from "react-redux";
import AdminNav from "./AdminNav";
import ClientNav from "./ClientNav";

function Header() {
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  if (isAuthenticated && user?.role === "admin") {
    return <AdminNav />;
  }

  return <ClientNav />;
}

export default Header;
