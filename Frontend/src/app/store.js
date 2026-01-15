import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice.js";
import projectReducer from "../features/project/projectSlice.js";
import userReducer from "../features/users/usersSlice.js";
import serviceReducer from "../features/service/serviceSlice.js";
import leadReducer from "../features/lead/leadSlice.js";

const store = configureStore({
    reducer: {
        auth: authReducer,
        project: projectReducer,
        users: userReducer,
        service: serviceReducer,
        lead: leadReducer
    }
});

export default store;