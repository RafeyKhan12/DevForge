import React, { useEffect } from "react";
import Header from "./Header/Header.jsx";
import Footer from "./Footer/Footer.jsx";
import { Outlet } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { getUser, refreshTokenThunk } from "../features/auth/authSlice.js";

function Layout() {
  const dispatch = useDispatch();
  const { authCheck } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(refreshTokenThunk())
      .then((res) => {
        if (refreshTokenThunk.fulfilled.match(res)) {
          dispatch(getUser());
        }
      })
  }, [dispatch]);

  return (
    <div className="flex flex-col min-h-screen">
      <header className="h-16 md:h-20 shrink-0">
        <Header />
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="h-40 md:h-36 shrink-0">
        <Footer />
      </footer>
    </div>
  );
}

export default Layout;
