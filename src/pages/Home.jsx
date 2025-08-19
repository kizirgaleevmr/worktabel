import React from "react";
import { DefaultSidebar } from "../components/ui/Sidebar";
import { Outlet, Route, Routes, useLocation } from "react-router-dom";
import { Tabel } from "./Tabel";

const route = [{ path: "/home/tabel", element: <Tabel /> }];

export const Home = () => {
    const location = useLocation();
    console.log(location);
    return (
        <section id="home" className="max-w-7xl px-2">
            <DefaultSidebar />
        </section>
    );
};
