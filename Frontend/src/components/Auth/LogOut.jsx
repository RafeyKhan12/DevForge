import React from "react";
import Button from "../Button";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { logoutThunk } from "../../features/auth/authSlice";

function LogOut() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error } = useSelector((state) => state.auth);

  if (loading) return <p className="text-sm text-slate-500">Logging out…</p>;

  const handleLogOut = async () => {
    const result = await dispatch(logoutThunk());
    if (logoutThunk.fulfilled.match(result)) {
      navigate("/log-in");
    }
  };

  return (
    <div className="flex flex-col items-start gap-2">
      <Button
        onClick={handleLogOut}
        className="
          bg-red-50 text-red-600
          hover:bg-red-100 hover:text-red-700
          border border-red-200
          px-4 py-2
          rounded-lg
          text-sm font-medium
          cursor-pointer
          transition
        "
      >
        Log Out
      </Button>

      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}

export default LogOut;
