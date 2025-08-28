import React from "react";
import { DefaultSidebar } from "../components/ui/Sidebar";
import { useLocation } from "react-router-dom";

export const Home = () => {
    const location = useLocation();
    return (
        <section id="home" className="w-full px-2">
            <DefaultSidebar />
        </section>
    );
};
