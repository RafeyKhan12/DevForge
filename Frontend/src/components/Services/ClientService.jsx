import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllServicesThunk } from "../../features/service/serviceSlice";

const ITEMS_PER_PAGE = 9;

function ClientService() {
  const { services, loading, error } = useSelector(
    (state) => state.service
  );
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(getAllServicesThunk());
  }, [dispatch]);

  if (loading)
    return <p className="text-center text-slate-600">Loading...</p>;
  if (error)
    return <p className="text-center text-red-500">{error}</p>;

  const totalPages = Math.ceil(services.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedServices = services.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  return (
    <div className="flex-1 px-6 md:px-16 py-10 bg-slate-50">
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-md p-6">
        <h2 className="text-2xl font-semibold text-slate-800 mb-6">
          Services
        </h2>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {paginatedServices.map((service) => (
            <div
              key={service._id}
              className="border rounded-lg p-4 bg-slate-50 hover:shadow transition"
            >
              <div className="space-y-2 text-sm text-slate-700">
                <p>
                  <span className="font-medium">Name:</span>{" "}
                  {service.name}
                </p>
                <p>
                  <span className="font-medium">Description:</span>{" "}
                  {service.description}
                </p>
                <p>
                  <span className="font-medium">Price:</span> ₹
                  {service.pricing}
                </p>
                <p>
                  <span className="font-medium">Status:</span>{" "}
                  <span
                    className={`inline-block px-2 py-0.5 rounded-full text-xs ${
                      service.isActive
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {service.isActive ? "Active" : "Inactive"}
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

export default ClientService;
