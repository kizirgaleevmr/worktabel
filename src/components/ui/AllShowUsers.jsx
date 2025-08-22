import { Button } from "@material-tailwind/react";
import { HorizontalCard } from "./Cards";
import { ageUser, getDateWorker } from "../utils/ageJobBirthday";
import React, { useState, useEffect } from "react";
import { fetchUsers } from "../config/firebase";
import { Pagination } from "./Pagination";

export const AllShowUsers = ({ show = "true", setShow }) => {
    //состояние для массива карт
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    //начальная страница
    const [currentPage, setCurrentPage] = useState(1);
    //сколько карт показывать
    const [usersPerPage] = useState(4);

    useEffect(() => {
        const getUsers = async () => {
            setLoading(true);
            const response = await fetchUsers();
            setUsers(response);
            //Делаем задержку на показ старринцы загрузки
            setTimeout(() => {
                setLoading(false);
            }, 2000);
        };
        getUsers();
    }, []);
    // последний индекс в полученного массива сотрудников
    const lastUsersIndex = currentPage * usersPerPage;
    //первый индекс
    const firstUsersIndex = lastUsersIndex - usersPerPage;
    //сколько сотрудников отоброжать
    const currentUsers = users.slice(firstUsersIndex, lastUsersIndex);
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // для генерации карт с сотрудниками
    const Cards = () => {
        if (loading) {
            return <h2>Loading...</h2>;
        }
        return (
            <div>
                <div className="mt-5 content__users flex flex-row gap-8 flex-wrap w-full">
                    {currentUsers.map(
                        ({
                            id,
                            otdel = "ДКИС",
                            firstName,
                            lastName,
                            surname,
                            phone,
                            email,
                            dolzhnost,
                            imgSrc,
                            userDate,
                            birthday,
                        }) => {
                            //получаем возраст
                            const age = ageUser(birthday);
                            //получаем стаж
                            const stazh = getDateWorker(userDate);
                            return (
                                <HorizontalCard
                                    key={id}
                                    otdel={otdel}
                                    firstName={firstName}
                                    lastName={lastName}
                                    surname={surname}
                                    phone={phone}
                                    dolzhnost={dolzhnost}
                                    email={email}
                                    workDate={stazh}
                                    src={imgSrc ? imgSrc : "none"}
                                    birthday={age}
                                    loading={loading}
                                />
                            );
                        }
                    )}
                </div>
                <Pagination
                    usersPerPage={usersPerPage}
                    totalUsers={users.length}
                    paginate={paginate}
                />
            </div>
        );
    };

    return (
        //меняем класс в зависимости от состояния и показываем страницу с картами
        <div className={` ${show ? "active__show_users" : "none__show_users"}`}>
            {/* показ всех ползователей в card */}
            <Cards />
            <Button
                variant="outlined"
                className="bg-emerald-500 p-2 text-white border-0"
                onClick={() => {
                    setShow(false);
                }}
            >
                Закрыть
            </Button>
        </div>
    );
};
