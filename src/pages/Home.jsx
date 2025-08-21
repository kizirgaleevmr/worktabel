import React from "react";
import { DefaultSidebar } from "../components/ui/Sidebar";
import { Outlet, Route, Routes, useLocation } from "react-router-dom";
import { Tabel } from "./Tabel";

const route = [{ path: "/home/tabel", element: <Tabel /> }];

export const Home = () => {
    const location = useLocation();
    return (
        <section id="home" className="max-w-full px-2">
            <DefaultSidebar />
        </section>
    );
};
