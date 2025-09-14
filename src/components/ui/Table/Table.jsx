
import {useState} from 'react';
import { Pagination } from "../Pagination.jsx";
import {icons} from "../icons.jsx"
import {deleteCellFromDB} from "../../config/firebase.js"

export const Table = ({ data,isDalete,setIsDelete }) => {
    //для пагинации
    //начальная страница
    const [currentPage, setCurrentPage] = useState(1);
    //сколько заявок показывать
    const [perPage,setPerPage] = useState(5);

    // последний индекс в полученного массива сотрудников
    const lastUsersIndex = currentPage * perPage;
    //первый индекс
    const firstUsersIndex = lastUsersIndex - perPage;
    //сколько сотрудников отоброжать
    const currentData = data.slice(firstUsersIndex, lastUsersIndex);
    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    
    function deletZayavki(e){
        const id = e.currentTarget.parentElement.parentElement.id
        deleteCellFromDB("zayavki", id)
        setIsDelete(!isDalete)
    }
    return (
        <div className="relative shadow-md sm:rounded-lg">
            <div className=" bg-white dark:bg-gray-900 p-6 w-auto">
                <label htmlFor="table-search" className="sr-only">
                    Search
                </label>
                <div className="relative mt-1">
                    <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
                        <svg
                            className="w-4 h-4 text-gray-500 dark:text-gray-400"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 20 20"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                            />
                        </svg>
                    </div>
                    <input
                        type="text"
                        id="table-search"
                        className="block pt-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Search htmlFor items"
                    />
                </div>
            </div>
            {/* //TODO! добавить еще столбец для срочно не срочно! */}
            <section
                id="section__table"
                className="h-250 bg-white overflow-hidden overflow-y-scroll"
            >
                <table className="text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="sticky top-0 text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="p-4"></th>
                            <th scope="col" className="px-6 py-3">
                                Номер заявки
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Дата
                            </th>

                            <th scope="col" className="px-6 py-3">
                                КСА
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Кто завел
                            </th>

                            <th scope="col" className="px-6 py-3">
                                Тип
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Наименование
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Серийный номер
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Инвентарный номер
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Описание проблемы
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Дата устранения
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Кто закрыл
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Редактирование
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {data &&
                            currentData.map((zayavki,ind) => {
                                return (
                                    <tr
                                        className={`${zayavki.urgency !== 'Срочно' ? '' : "red"} bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600`}
                                        key={zayavki.id}
                                        id={zayavki.id}
                                    >
                                        {/*<td className="w-4 p-4">{ind + 1}</td>*/}
                                        <td className="w-4 p-4">
                                            <div className="flex items-center">
                                                <input
                                                    id="checkbox-table-search-1"
                                                    type="checkbox"
                                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                                />
                                                <label
                                                    htmlFor="checkbox-table-search-1"
                                                    className="sr-only"
                                                >
                                                    checkbox
                                                </label>
                                            </div>
                                        </td>
                                        <th
                                            scope="row"
                                            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                        >
                                            {zayavki["number-zayavki"]}
                                        </th>
                                        <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            {zayavki?.date}
                                        </td>
                                        <td className="px-6 py-4">
                                            {zayavki?.ksa}
                                        </td>
                                        <td className="px-6 py-4">
                                            {zayavki?.user}
                                        </td>
                                        <td className="px-6 py-4">
                                            {zayavki?.typeQeuinpment}
                                        </td>
                                        <td className="px-6 py-4">
                                            {zayavki?.qeuinpmentName}
                                        </td>
                                        <td className="px-6 py-4">
                                            {zayavki?.serial}
                                        </td>
                                        <td className="px-6 py-4">
                                            {zayavki?.inventar}
                                        </td>
                                        <td className="px-6 py-4">
                                            {zayavki?.message}
                                        </td>
                                        <td className="px-6 py-4">
                                            {zayavki?.dataClose}
                                        </td>
                                        <td className="px-6 py-4">
                                            {zayavki?.useClose}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="inline-block mr-2 text-gray-400  flex items-center hover:text-rose-700 cursor-pointer"
                                               >
                                    {icons.pencil}
                                            </span>
                                            {" "}
                                            <span className="inline-block mr-2 text-gray-400  flex items-center hover:text-rose-700 cursor-pointer"  onClick={deletZayavki}>
                                    {icons.trash}
                                </span>
                                        </td>
                                    </tr>
                                );
                            })}
                    </tbody>
                </table>

            </section>
            <div className="bg-white py-4"><Pagination
                        perPage={perPage}
                        total={data.length}
                        paginate={paginate}
                    />
                    <select name="totalZayavki" id="totalZayavki" onChange={(e) =>
                                        setPerPage(e.target.value)
                                    }
                                    value={perPage}>
                        <option>5</option>
                        <option>10</option>
                        <option>15</option>
                        <option>25</option>
                        <option>50</option>
                        <option>100</option>
                    </select>
                </div>

        </div>
    );
};
