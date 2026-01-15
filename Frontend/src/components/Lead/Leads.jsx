import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLeads, updateStatus } from "../../features/lead/leadSlice";
import Button from "../Button";

const ITEMS_PER_PAGE = 6;

function Leads() {
  const dispatch = useDispatch();
  const { leads, loading, error } = useSelector((state) => state.lead);

  const [currentPage, setCurrentPage] = useState(1);
  const [editingLead, setEditingLead] = useState(null);

  useEffect(() => {
    dispatch(getLeads());
  }, [dispatch]);

  const totalPages = Math.ceil(leads.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedLeads = leads.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  const startEdit = (lead) => {
    setEditingLead({ id: lead._id, status: lead.status });
  };

  const handleEdit = async () => {
    await dispatch(
      updateStatus({
        id: editingLead.id,
        status: editingLead.status,
      })
    ).unwrap();
    setEditingLead(null);
  };

  if (loading) return <p className="text-center text-slate-600">Loading...</p>;

  return (
    <div className="bg-slate-50 py-12 px-4">
      <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-md p-6">
        <h2 className="text-2xl font-semibold text-slate-800 mb-6">
          Leads
        </h2>

        <ul className="space-y-4">
          {paginatedLeads.map((lead) => (
            <li
              key={lead._id}
              className="border border-slate-200 rounded-lg p-4"
            >
              {editingLead?.id === lead._id ? (
                <div className="space-y-3">
                  <p className="text-sm text-slate-700">
                    <span className="font-medium">Client:</span>{" "}
                    {lead.name}
                  </p>

                  <p className="text-sm text-slate-700">
                    <span className="font-medium">Email:</span>{" "}
                    {lead.email}
                  </p>

                  <p className="text-sm text-slate-700">
                    <span className="font-medium">Message:</span>{" "}
                    {lead.message}
                  </p>

                  <select
                    value={editingLead.status}
                    onChange={(e) =>
                      setEditingLead({
                        ...editingLead,
                        status: e.target.value,
                      })
                    }
                    className="w-full max-w-xs border rounded-lg px-3 py-2 text-sm"
                  >
                    <option value="new">New</option>
                    <option value="contacted">Contacted</option>
                    <option value="accepted">Accepted</option>
                    <option value="rejected">Rejected</option>
                  </select>

                  <Button onClick={handleEdit}>Save</Button>
                </div>
              ) : (
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div className="space-y-1 text-sm text-slate-700">
                    <p>
                      <span className="font-medium">Client:</span>{" "}
                      {lead.name}
                    </p>
                    <p>
                      <span className="font-medium">Email:</span>{" "}
                      {lead.email}
                    </p>
                    <p>
                      <span className="font-medium">Message:</span>{" "}
                      {lead.message}
                    </p>
                    <p>
                      <span className="font-medium">Status:</span>{" "}
                      <span className="capitalize">{lead.status}</span>
                    </p>
                  </div>

                  <Button
                    onClick={() => startEdit(lead)}
                    className="w-full bg-sky-500 hover:bg-sky-600 text-white font-medium py-2 rounded-lg transition px-4"
                  >
                    Edit
                  </Button>
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

        {error && (
          <p className="text-sm text-red-500 mt-4">{error}</p>
        )}
      </div>
    </div>
  );
}

export default Leads;
