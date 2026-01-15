import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  editProjectThunk,
  getAllProjectsThunk,
} from "../../features/project/projectSlice";
import DeleteProject from "./DeleteProject.jsx";
import Button from "../Button.jsx";

const ITEMS_PER_PAGE = 6;

function Projects() {
  const dispatch = useDispatch();
  const { projects, loading, error } = useSelector((state) => state.project);

  const [currentPage, setCurrentPage] = useState(1);
  const [editingId, setEditingId] = useState(null);
  const [editedText, setEditedText] = useState({ status: "" });

  useEffect(() => {
    dispatch(getAllProjectsThunk());
  }, [dispatch]);

  const totalPages = Math.ceil(projects.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedProjects = projects.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  const startEdit = (project) => {
    setEditingId(project._id);
    setEditedText({ status: project.status });
  };

  const handleEdit = async (id) => {
    await dispatch(editProjectThunk({ id, ...editedText })).unwrap();
    setEditingId(null);
  };

  if (loading) return <p className="text-center text-slate-600">Loading...</p>;

  return (
    <div className="bg-slate-50 py-12 px-4">
      <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-md p-6">
        <h2 className="text-2xl font-semibold text-slate-800 mb-6">
          Projects
        </h2>

        <ul className="space-y-4">
          {paginatedProjects.map((project) => (
            <li
              key={project._id}
              className="border border-slate-200 rounded-lg p-4"
            >
              {editingId === project._id ? (
                <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                  <div className="space-y-1 text-sm text-slate-700">
                    <p>
                      <span className="font-medium">Title:</span>{" "}
                      {project.title}
                    </p>

                    <select
                      value={editedText.status}
                      onChange={(e) =>
                        setEditedText({ status: e.target.value })
                      }
                      className="border rounded-lg px-3 py-2 text-sm"
                    >
                      <option value="pending">Pending</option>
                      <option value="started">Started</option>
                      <option value="review">Review</option>
                      <option value="completed">Completed</option>
                    </select>

                    <p>
                      <span className="font-medium">Deadline:</span>{" "}
                      {project.deadline?.slice(0, 10)}
                    </p>
                  </div>

                  <Button
                    disabled={loading}
                    onClick={() => handleEdit(project._id)}
                  >
                    Save
                  </Button>
                </div>
              ) : (
                <div className="flex flex-col lg:flex-row lg:justify-between gap-4">
                  <div className="space-y-1 text-sm text-slate-700">
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

                  <div className="flex gap-3">
                    <Button className="w-full bg-sky-500 hover:bg-sky-600 text-white font-medium py-2 rounded-lg transition px-4" onClick={() => startEdit(project)}>
                      Edit
                    </Button>
                    <DeleteProject id={project._id} />
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>

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

        {error && (
          <p className="text-sm text-red-500 mt-4">{error}</p>
        )}
      </div>
    </div>
  );
}

export default Projects;
