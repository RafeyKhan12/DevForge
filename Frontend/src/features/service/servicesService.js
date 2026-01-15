import api from "../../api/axios"

const createService = async (credentials) => {
    const response = await api.post("/services/create-service", credentials);
    return response.data
};

const updateService = async (id, credentials) => {
    const response = await api.put(`/services/update-service/${id}`, credentials);
    return response.data
};

const deleteService = async (id) => {
    const response = await api.delete(`/services/delete-service/${id}`);
    return response.data
};

const getService = async (id) => {
    const response = await api.get(`/services/get-service/${id}`);
    return response.data
};

const getAllServices = async () => {
    const response = await api.get("/services/get-all-services");
    return response.data
};

export {
    createService,
    updateService,
    deleteService,
    getService,
    getAllServices
}