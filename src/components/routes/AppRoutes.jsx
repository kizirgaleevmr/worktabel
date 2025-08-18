import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
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

/** Корневой компонент приложения с роутами */
export const AppRoutes = () => <Routes>{routes.map(renderRoute)}</Routes>;
