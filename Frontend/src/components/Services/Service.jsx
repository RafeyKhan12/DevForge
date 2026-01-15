import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  editServiceThunk,
  getAllServicesThunk,
} from "../../features/service/serviceSlice";
import DeleteService from "./DeleteService";
import Button from "../Button";
import Input from "../Input";

const ITEMS_PER_PAGE = 10;

function Service() {
  const dispatch = useDispatch();
  const { services, loading, error } = useSelector((state) => state.service);

  const [editingId, setEditingId] = useState(null);
  const [editedText, setEditedText] = useState({
    name: "",
    description: "",
    pricing: 0,
    isActive: true,
  });

  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(getAllServicesThunk());
  }, [dispatch]);

  const totalPages = Math.ceil(services.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedServices = services.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  const startEdit = (service) => {
    setEditingId(service._id);
    setEditedText({
      name: service.name,
      description: service.description,
      pricing: service.pricing,
      isActive: service.isActive,
    });
  };

  const handleEdit = async (id) => {
    await dispatch(editServiceThunk({ id, ...editedText })).unwrap();
    setEditingId(null);
  };

  return (
    <div className="bg-slate-50 py-12 px-4">
      <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-md p-6">
        <h2 className="text-2xl font-semibold text-slate-800 mb-6">Services</h2>

        <ul className="space-y-4">
          {paginatedServices.map((service) => (
            <li
              key={service._id}
              className="border border-gray-200 rounded-xl p-4"
            >
              {editingId === service._id ? (
                <div className="space-y-3">
                  <Input
                    value={editedText.name}
                    onChange={(e) =>
                      setEditedText({
                        ...editedText,
                        name: e.target.value,
                      })
                    }
                  />
                  <Input
                    value={editedText.description}
                    onChange={(e) =>
                      setEditedText({
                        ...editedText,
                        description: e.target.value,
                      })
                    }
                  />
                  <Input
                    type="number"
                    value={editedText.pricing}
                    onChange={(e) =>
                      setEditedText({
                        ...editedText,
                        pricing: Number(e.target.value),
                      })
                    }
                  />
                  <select
                    className="w-full border rounded-lg p-2 text-sm"
                    value={String(editedText.isActive)}
                    onChange={(e) =>
                      setEditedText({
                        ...editedText,
                        isActive: e.target.value === "true",
                      })
                    }
                  >
                    <option value="true">Active</option>
                    <option value="false">Inactive</option>
                  </select>

                  <div className="flex justify-end">
                    <Button onClick={() => handleEdit(service._id)}>
                      Confirm
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-2 text-sm text-slate-700">
                  <p>
                    <span className="font-medium">Name:</span> {service.name}
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

                  <div className="flex gap-3 pt-3">
                    <Button
                      className="w-full bg-sky-500 hover:bg-sky-600 text-white font-medium py-2 rounded-lg transition px-4"
                      onClick={() => startEdit(service)}
                    >
                      Edit
                    </Button>
                    <DeleteService id={service._id} />
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

        {error && <p className="text-red-500 text-sm mt-4">{error}</p>}
      </div>
    </div>
  );
}

export default Service;
