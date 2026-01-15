import { createRoot } from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";
import store from "./app/store.js";
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import SignUpPage from "./pages/SignUpPage.jsx";
import LogInPage from "./pages/LogInPage.jsx";
import Home from "./pages/Home.jsx";
import React from "react";
import ServicePage from "./pages/ServicePage.jsx";
import UnauthorizedPage from "./pages/UnauthorizedPage.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import ProjectPage from "./pages/ProjectPage.jsx";
import Contact from "./components/Lead/Contact.jsx";
import LeadPage from "./pages/LeadPage.jsx";
import ClientProject from "./components/Project/ClientProject.jsx";
import ClientService from "./components/Services/ClientService.jsx";
import Users from "./components/Users/Users.jsx";
import Profile from "./components/Users/Profile.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route path="" element={<Home />} />
      <Route path="sign-up" element={<SignUpPage />} />
      <Route path="log-in" element={<LogInPage />} />
      <Route path="services" element={ <ProtectedRoute role="admin"><ServicePage /></ProtectedRoute>} />
      <Route path="projects" element={ <ProtectedRoute role="admin"><ProjectPage /></ProtectedRoute>} />
      <Route path="leads" element={ <ProtectedRoute role="admin"><LeadPage /></ProtectedRoute>} />
      <Route path="users" element={ <ProtectedRoute role="admin"><Users /></ProtectedRoute>} />
      <Route path="client-projects" element={ <ProtectedRoute role="client"><ClientProject /></ProtectedRoute>} />
      <Route path="client-services" element={ <ProtectedRoute role="client"><ClientService /></ProtectedRoute>} />
      <Route path="profile" element={ <ProtectedRoute><Profile /></ProtectedRoute>} />
      <Route path="contact" element={ <Contact /> } />
      <Route path="unauthorized" element={<UnauthorizedPage />} />
    </Route>
  )
)

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);