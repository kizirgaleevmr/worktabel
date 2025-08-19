import React from "react";
import { Routes, Route, Navigate, Outlet, replace } from "react-router-dom";
import { Register } from "../Auth/Register";
import { Login } from "../Auth/Login";
import { Home } from "../../pages/Home";

/** Массив роутов приложения */
const routes = [
    { path: "/home", element: <Home /> },
    { path: "/", element: <Navigate to="login" /> },
    { path: "/login", element: <Login /> },
    { path: "/register", element: <Register /> },
];

/**
 * Рекурсивно отображает роуты и дочерние роуты.
 * @param {RouteItem} route - Объект роута.
 */
const renderRoute = ({ path, element, children }) => (
    <Route key={path} path={path} element={element}>
        {children && children.map(renderRoute)}
    </Route>
);

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
                <Route path="/home" element={<Home />} />
            </Route>
            <Route path="*" element={<Login />} />
        </Routes>
    );
};
