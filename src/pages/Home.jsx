import MySlider from "../components/ui/Swiperr/Swiper";
import { DefaultSidebar } from "../components/ui/Sidebar";
import { useLocation } from "react-router-dom";
import React, { useState, useEffect } from "react";
export const Home = () => {
    const location = useLocation();
    const currentPath = location.pathname; // Текущий путь
    const [pathState, setPathState] = useState();

    React.useEffect(() => {
        if (currentPath !== "/home") {
            setPathState(false);
        } else {
            setPathState(true);
        }
    }, [currentPath]);
    return (
        <section id="home" className="relative border-2 border-amber-400 h-dvh">
            {pathState && <MySlider />}
            <DefaultSidebar />
        </section>
    );
};
