import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

function Profile() {
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector((state) => state.auth);

  if (loading)
    return <p className="text-center text-slate-600">Loading...</p>;

  return (
    <div className="flex-1 bg-slate-50 px-6 md:px-16 py-12">
      <div className="max-w-xl mx-auto bg-white rounded-xl shadow-md p-6">
        <h2 className="text-2xl font-semibold text-slate-800 mb-6">
          Profile
        </h2>

        <div className="space-y-4 text-sm text-slate-700">
          <div className="flex justify-between border-b pb-2">
            <span className="font-medium">User ID</span>
            <span className="text-slate-500">
              {user?._id}
            </span>
          </div>

          <div className="flex justify-between border-b pb-2">
            <span className="font-medium">Username</span>
            <span>{user?.username}</span>
          </div>

          <div className="flex justify-between border-b pb-2">
            <span className="font-medium">Email</span>
            <span>{user?.email}</span>
          </div>

          <div className="flex justify-between">
            <span className="font-medium">Role</span>
            <span
              className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                user?.role === "admin"
                  ? "bg-red-100 text-red-600"
                  : "bg-green-100 text-green-600"
              }`}
            >
              {user?.role}
            </span>
          </div>
        </div>

        {error && (
          <p className="text-sm text-red-500 mt-4 text-center">
            {error}
          </p>
        )}
      </div>
    </div>
  );
}

export default Profile;
