import React from "react";
import { Routes, Route, Navigate, Outlet, replace } from "react-router-dom";
import { Register } from "../Auth/Register";
import { Login } from "../Auth/Login";
import { Home } from "../../pages/Home";
import { Tabel } from "../../pages/Tabel";
import { Users } from "../../pages/Users";
import { Message } from "../../pages/Messaeg";
import { Profile } from "../../pages/Profile";

/**Приватный роутинг */
function PrivateRoute() {
    const token = sessionStorage.accessToken;
    return token ? <Outlet /> : <Navigate to="login" />;
}

/** Корневой компонент приложения с роутами */
export const AppRoutes = () => {
    return (
        <Routes>
            <Route element={<PrivateRoute />}>
                <Route path="/home" element={<Home />}>
                    <Route path="tabel" element={<Tabel />} />
                    <Route path="sotrudniki" element={<Users />} />
                    <Route path="profile" element={<Profile />} />
                    <Route path="message" element={<Message />} />
                </Route>
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
        </Routes>
    );
};
