import React from "react";
import {
    Typography,
    List,
    ListItem,
    ListItemPrefix,
    ListItemSuffix,
    Chip,
} from "@material-tailwind/react";
import {
    ArrowDownLeftIcon,
    ArrowDownRightIcon,
    XMarkIcon,
} from "@heroicons/react/24/outline";
import {
    PowerIcon,
    BookOpenIcon,
    UserGroupIcon,
    PhoneArrowDownLeftIcon,
    UserIcon,
    HomeModernIcon,
} from "@heroicons/react/24/solid";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { AlertWithList } from "./Alert";

export function DefaultSidebar() {
    const [isOpen, setIsOpen] = useState(true);
    const navigate = useNavigate();
    const [state, setState] = useState(false);

    function handleMenu() {
        setIsOpen(!isOpen);
        console.log(isOpen);
    }
    //открываем меню или закрываем
    // React.useEffect(() => {}, [isOpen]);

    //Проверяем состояние и показываем alert что пользователь вышел
    useEffect(() => {
        setTimeout(() => {
            if (state) {
                navigate("/");
            }
            setState(false);
        }, 3000);
    }, [state]);

    const handClick = () => {
        setState(true);
        sessionStorage.clear();
    };

    //Показываем алерт при входе в систему что какой пользовател вошел
    function MyAlert() {
        const [show, setShow] = useState(true);
        //Убирам alert через 3 секунды
        if (show) {
            setTimeout(() => {
                setShow(false);
            }, 3000);
        }
        if (state) {
            return (
                <AlertWithList
                    title="Сообщение"
                    text={`Пользователь ${window.sessionStorage.email} вышел`}
                    showAlert={state}
                />
            );
        }
        return (
            <AlertWithList
                title="Сообщение"
                text={`Пользователь ${window.sessionStorage.email} вошел`}
                showAlert={show}
            />
        );
    }

    return (
        <div className="flex fixed top-8 z-100">
            {!isOpen && (
                <button
                    className="!absolute left-3.5 top-3.5 text-white"
                    onClick={handleMenu}
                >
                    <ArrowDownRightIcon className="h-6 w-6 stroke-2 cursor-pointer z-101" />
                </button>
            )}
            <div
                className={`h-120 w-80 flex-1/5 p-4 bg-amber-50 shadow-xl shadow-blue-gray-900/5 l mr-6 border-t-amber-500 border-t-4 scroll-auto relative ${
                    isOpen ? "sidebar__menu_open" : "sidebar__menu_close"
                }`}
            >
                <button
                    className="!absolute right-3.5 top-3.5"
                    onClick={handleMenu}
                >
                    <XMarkIcon className="h-6 w-6 stroke-2 cursor-pointer z-101" />
                </button>
                <div className="mb-2 p-4">
                    <Typography variant="h5" color="blue-gray">
                        Меню
                    </Typography>
                </div>
                <List>
                    <Link to="/home">
                        <ListItem className="mb-3 cursor-pointer">
                            <ListItemPrefix>
                                <HomeModernIcon className="h-5 w-5 mr-4" />
                            </ListItemPrefix>
                            Главаня
                        </ListItem>
                    </Link>
                    <Link to="tabel">
                        <ListItem className="mb-3 cursor-pointer text-left">
                            <ListItemPrefix>
                                <BookOpenIcon className="h-5 w-5 mr-4" />
                            </ListItemPrefix>
                            Табыль времени
                        </ListItem>
                    </Link>
                    <Link to="sotrudniki">
                        <ListItem className="mb-3 cursor-pointer">
                            <ListItemPrefix>
                                <UserGroupIcon className="h-5 w-5 mr-4" />
                            </ListItemPrefix>
                            Сотрудники
                        </ListItem>
                    </Link>
                    <Link to="message">
                        <ListItem className="mb-3 cursor-pointer">
                            <ListItemPrefix>
                                <PhoneArrowDownLeftIcon className="h-5 w-5 mr-4" />
                            </ListItemPrefix>
                            Заявки
                            <ListItemSuffix>
                                <Chip
                                    value="14"
                                    size="sm"
                                    variant="ghost"
                                    color="blue-gray"
                                    className="rounded-full"
                                />
                            </ListItemSuffix>
                        </ListItem>
                    </Link>
                    <Link to="profile">
                        <ListItem className="mb-3 cursor-pointer">
                            <ListItemPrefix>
                                <UserIcon className="h-5 w-5 mr-4" />
                            </ListItemPrefix>
                            Профиль
                        </ListItem>
                    </Link>
                    <ListItem
                        className="mb-3 cursor-pointer"
                        onClick={handClick}
                    >
                        <ListItemPrefix>
                            <PowerIcon className="h-5 w-5 mr-4" />
                        </ListItemPrefix>
                        Выход
                    </ListItem>
                </List>
            </div>
            {MyAlert()}
            <div className="pr-20 mx-auto">
                {/* <h1>Здесь будет слайдер с открытыми заявками</h1> */}
                <Outlet />
            </div>
        </div>
    );
}
