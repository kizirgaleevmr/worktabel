import React from "react";

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
                            <li className="border-2 border-gray-300 px-3 py-2 rounded-full hover:bg-emerald-400 text-white bg-sky-500">
                                {number}
                            </li>
                        </a>
                    );
                })}
            </ul>
        </div>
    );
};

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
                            <li className="border-2 border-gray-300 px-6 py-3 rounded-full hover:bg-emerald-400 text-white bg-sky-500">
                                {number}
                            </li>
                        </a>
                    );
                })}
            </ul>
        </div>
    );
};

export const PaginationWeek = ({ weekPerPage, totalWeek, paginateWeek }) => {
    const pageNumber = [];

    for (let i = 1; i <= Math.ceil(totalWeek / weekPerPage); i++) {
        pageNumber.push(i);
    }
    console.log("total", totalWeek);
    console.log("weekPerPage", weekPerPage);
    return (
        <div className="mb-4">
            <ul className="flex gap-2">
                {pageNumber.map((number) => {
                    return (
                        <a
                            href="#"
                            onClick={() => paginateWeek(number)}
                            key={number}
                        >
                            <li className="border-2 border-gray-300 px-3  py-2 rounded-full hover:bg-emerald-400 text-white bg-sky-500">
                                {number}
                            </li>
                        </a>
                    );
                })}
            </ul>
        </div>
    );
};
