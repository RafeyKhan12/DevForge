import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsersThunk } from "../../features/users/usersSlice";

const ITEMS_PER_PAGE = 6;

function Users() {
  const { users, loading, error } = useSelector((state) => state.users);
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(getAllUsersThunk());
  }, [dispatch]);

  if (loading) return <p className="text-center text-slate-600">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  const totalPages = Math.ceil(users.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedUsers = users.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  return (
    <div className="flex-1 px-6 md:px-16 py-10 bg-slate-50">
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-md p-6">
        <h2 className="text-2xl font-semibold text-slate-800 mb-6">
          Users
        </h2>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {paginatedUsers.map((user) => (
            <div
              key={user._id}
              className="border rounded-lg p-4 bg-slate-50 hover:shadow transition"
            >
              <div className="space-y-2 text-sm text-slate-700">
                <p>
                  <span className="font-medium">ID:</span>{" "}
                  {user._id.slice(0, 10)}...
                </p>

                <p>
                  <span className="font-medium">Username:</span>{" "}
                  {user.username}
                </p>

                <p>
                  <span className="font-medium">Email:</span>{" "}
                  {user.email}
                </p>

                <p>
                  <span className="font-medium">Role:</span>{" "}
                  <span
                    className={`inline-block px-2 py-0.5 rounded text-xs ${
                      user.role === "admin"
                        ? "bg-red-100 text-red-600"
                        : "bg-green-100 text-green-600"
                    }`}
                  >
                    {user.role}
                  </span>
                </p>
              </div>
            </div>
          ))}
        </div>

        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-8">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => p - 1)}
              className="px-3 py-1 text-sm rounded border disabled:opacity-40"
            >
              Prev
            </button>

            {[...Array(totalPages)].map((_, index) => {
              const page = index + 1;
              return (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-3 py-1 text-sm rounded border ${
                    page === currentPage
                      ? "bg-slate-800 text-white"
                      : "bg-white"
                  }`}
                >
                  {page}
                </button>
              );
            })}

            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => p + 1)}
              className="px-3 py-1 text-sm rounded border disabled:opacity-40"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Users;
