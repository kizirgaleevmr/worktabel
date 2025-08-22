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
                            <li className="border-2 border-gray-300 px-3 rounded-full hover:bg-emerald-400 text-white bg-sky-500">
                                {number}
                            </li>
                        </a>
                    );
                })}
            </ul>
        </div>
    );
};
