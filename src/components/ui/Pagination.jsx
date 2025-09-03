import React from "react";
//для сотрудников
export const Pagination = ({ usersPerPage, totalUsers, paginate }) => {
    const pageNumber = [];

    for (let i = 1; i <= Math.ceil(totalUsers / usersPerPage); i++) {
        pageNumber.push(i);
    }
    return (
        <div className="mb-4">
            <ul className="flex justify-center gap-2">
                {pageNumber.map((number) => {
                    return (
                        <a
                            href="#"
                            onClick={() => paginate(number)}
                            key={number}
                        >
                            <li className="border-2 border-gray-300 px-7 py-2 rounded-full hover:bg-emerald-400 text-black  dark:bg-white dark:hover:bg-cyan-700">
                                {number}
                            </li>
                        </a>
                    );
                })}
            </ul>
        </div>
    );
};
//для месяцев переключает месяцы
export const PaginationTabel = ({ monthPerPage, totalMonth, paginate }) => {
    const pageNumber = [];

    for (let i = 1; i <= Math.ceil(totalMonth / monthPerPage); i++) {
        pageNumber.push(i);
    }
    return (
        <div className="mb-4">
            <ul className="flex justify-center gap-2">
                {pageNumber.map((number) => {
                    return (
                        <a
                            href="#"
                            onClick={() => paginate(number)}
                            key={number}
                        >
                            <li className="border-2 border-gray-300 px-6 py-3 rounded-full hover:bg-emerald-400 text-white dark:bg-amber-800 dark:hover:bg-amber-600">
                                {number}
                            </li>
                        </a>
                    );
                })}
            </ul>
        </div>
    );
};
//для недели дней и месяца перключает или день или неделю или показывает месяц целиком
export const PaginationWeek = ({ weekPerPage, totalWeek, paginateWeek }) => {
    const pageNumber = [];

    for (let i = 1; i <= Math.ceil(totalWeek / weekPerPage); i++) {
        pageNumber.push(i);
    }

    return (
        <div className="mb-4">
            <ul className="flex gap-2 flex-wrap flex-row w-full">
                {pageNumber.map((number) => {
                    return (
                        <a
                            href="#"
                            onClick={() => paginateWeek(number)}
                            key={number}
                        >
                            <li className="border-2 border-gray-300 px-5  py-2 rounded-full hover:bg-emerald-400 text-white dark:bg-amber-800 dark:hover:bg-amber-600">
                                {number}
                            </li>
                        </a>
                    );
                })}
            </ul>
        </div>
    );
};
