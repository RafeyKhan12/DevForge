import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getClientProjectThunk } from "../../features/project/projectSlice";

const ITEMS_PER_PAGE = 9;

function ClientProject() {
  const { projects, loading, error } = useSelector((state) => state.project);
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(getClientProjectThunk());
  }, [dispatch]);

  if (loading) return <p className="text-center text-slate-600">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  const totalPages = Math.ceil(projects.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedProjects = projects.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  return (
    <div className="flex-1 px-6 md:px-16 py-10 bg-slate-50">
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-md p-6">
        <h2 className="text-2xl font-semibold text-slate-800 mb-6">
          Projects
        </h2>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {paginatedProjects.map((project) => (
            <div
              key={project._id}
              className="border rounded-lg p-4 bg-slate-50 hover:shadow transition"
            >
              <div className="space-y-2 text-sm text-slate-700">
                <p>
                  <span className="font-medium">Title:</span>{" "}
                  {project.title}
                </p>
                <p>
                  <span className="font-medium">Status:</span>{" "}
                  <span className="capitalize">{project.status}</span>
                </p>
                <p>
                  <span className="font-medium">Deadline:</span>{" "}
                  {project.deadline?.slice(0, 10)}
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

            {[...Array(totalPages)].map((_, i) => {
              const page = i + 1;
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

export default ClientProject;
