import api from "../../api/axios";

const register = async (credentials) => {
  const res = await api.post("/users/register", credentials);
  return res.data;
};

const login = async (credentials) => {
  const res = await api.post("/users/log-in", credentials);
  return res.data;
};

const logout = async () => {
  const res = await api.post("/users/log-out");
  return res.data;
};

const refreshToken = async () => {
  const res = await api.post("/users/refresh-token");
  return res.data;
};

const getMe = async () => {
  const res = await api.get("/users/me");
  return res.data;
};

export {
  register,
  login,
  logout,
  refreshToken,
  getMe,
};
