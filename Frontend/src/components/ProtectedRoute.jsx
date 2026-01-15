import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router";

function ProtectedRoute({ children, role }) {
  const { isAuthenticated, loading, user, authCheck } = useSelector(
    (state) => state.auth
  );
  if (!authCheck) return <h1>Checking Authentication...</h1>;
  if(role && !user.role) return <h1>Loading User...</h1>;

  if (!isAuthenticated) {
    return <Navigate to="/log-in" replace />;
  }

  if (role && user.role !== role) {
    return <Navigate to="/unauthorized" replace />;
  }
  if (loading) return <h1>Loading...</h1>;

  return <div>{children}</div>;
}

export default ProtectedRoute;
