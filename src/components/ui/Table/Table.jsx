export const Table = () => {
    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg w-max">
            <div className=" bg-white dark:bg-gray-900 p-6">
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
            <table className="w-md text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="p-4"></th>
                        <th scope="col" className="px-6 py-3">
                            Дата
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Номер заявки
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
                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
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
                            Apple MacBook Pro 17"
                        </th>
                        <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            Silver
                        </td>
                        <td className="px-6 py-4">Laptop</td>
                        <td className="px-6 py-4">Laptop</td>
                        <td className="px-6 py-4">Laptop</td>
                        <td className="px-6 py-4">Laptop</td>
                        <td className="px-6 py-4">Laptop</td>
                        <td className="px-6 py-4">Laptop</td>
                        <td className="px-6 py-4">Laptop</td>
                        <td className="px-6 py-4">Laptop</td>
                        <td className="px-6 py-4">$2999</td>
                        <td className="px-6 py-4">
                            <a
                                href="#"
                                className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                            >
                                Edit
                            </a>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};
