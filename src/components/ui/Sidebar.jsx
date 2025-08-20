import {
    Card,
    Typography,
    List,
    ListItem,
    ListItemPrefix,
    ListItemSuffix,
    Chip,
} from "@material-tailwind/react";
import {
    PresentationChartBarIcon,
    ShoppingBagIcon,
    UserCircleIcon,
    Cog6ToothIcon,
    InboxIcon,
    PowerIcon,
    BookOpenIcon,
    UserGroupIcon,
    PhoneArrowDownLeftIcon,
    UserIcon,
} from "@heroicons/react/24/solid";
import { Link, Outlet, Navigate, useNavigate } from "react-router-dom";
import { handleLogout } from "../../firebase";
import { useEffect, useState } from "react";
import { AlertWithList } from "./Alert";

export function DefaultSidebar() {
    const navigate = useNavigate();
    const [state, setState] = useState(false);
    useEffect(() => {
        if (state) {
            navigate("/");
        }
    }, [state]);

    const handClick = () => {
        setState(true);
    };

    return (
        <div className="flex">
            <Card className="h-[calc(100vh-2rem)] w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5 text-2xl mr-6">
                <div className="mb-2 p-4">
                    <Typography variant="h5" color="blue-gray">
                        Меню
                    </Typography>
                </div>
                <List>
                    <Link to="tabel">
                        <ListItem className="mb-3 cursor-pointer">
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
            </Card>
            <div>
                <Outlet />
            </div>
        </div>
    );
}
