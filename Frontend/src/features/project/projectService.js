import api from "../../api/axios";

const createProject = async (credentials) => {
    const response = await api.post("/projects/create-project", credentials);
    return response.data
};

const editProject = async (credentials, id) => {
    const response = await api.put(`/projects/update-project-status/${id}`, credentials);
    return response.data
};

const deleteProject = async (id) => {
    const response = await api.delete(`/projects/delete-project/${id}`);
    return response.data
};

const getAllProjects = async () => {
    const response = await api.get("/projects/get-all-projects");
    return response.data
};

const getProject = async (id) => {
    const response = await api.get(`/projects/get-project/${id}`);
    return response.data
};

const getClientProject = async () => {
    const response = await api.get("/projects/get-client-projects");
    return response.data
};

export {
    createProject,
    editProject,
    deleteProject,
    getAllProjects,
    getProject,
    getClientProject
}