import api from "../../api/axios"

const getUser = async (id) => {
    const response = await api.get(`/users/get-user/${id}`);
    return response.data
};

const getAllUsers = async () => {
    const response = await api.get("/users/get-all-users");
    return response.data
};

export {
    getUser,
    getAllUsers
}