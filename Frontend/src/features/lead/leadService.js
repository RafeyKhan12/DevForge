import api from "../../api/axios"

const createLead = async (credentials) => {
    const response = await api.post("/leads/create-lead", credentials);
    return response.data
};

const getAllLeads = async () => {
    const response = await api.get("/leads/get-leads");
    return response.data
};

const updateLeadStatus = async (id, credentials) => {
    const response = await api.put(`/leads/update-lead-status/${id}`, credentials);
    return response.data
};

export {
    createLead,
    getAllLeads,
    updateLeadStatus
}