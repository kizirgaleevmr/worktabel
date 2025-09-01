import React, { useState, useEffect } from "react";
import { daysWeek, nameMonth } from "../components/utils/date";
import { fetchUsers } from "../components/config/firebase";
import { format, getDaysInMonth, getDay } from "date-fns";
import { PaginationTabel, PaginationWeek } from "../components/ui/Pagination";
import { ModalTabelCell } from "../components/ui/ModalTabelCell";
import { fetchTabel } from "../components/config/firebase";
import { countDayTime } from "../components/utils/countDayTime";

const countMonth = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

export const Tabel = () => {
    //состояение для норма дней
    const [dayNorma, setDayNorma] = useState(21);
    //состоягние для норма дней
    const [timeNorma, setTimeNorma] = useState(dayNorma * 8);

    //состяния для указания года
    const [years, setYears] = useState(new Date().getFullYear());

    const [isOpen, setIsOpen] = React.useState(false);
    //состояние для массива c данными по дням
    const [data, setData] = useState([]);

    //состяние для массива по сотрудникам
    const [dataUsers, setDataUsers] = useState([]);

    //состяние для массива по ячейкам
    const [dataCell, setDataCell] = useState([]);

    //начальная страница месца
    const [currentPage, setCurrentPage] = useState(new Date().getMonth() + 1);

    //сколько месяцев показывать
    const [monthPerPage] = useState(1);

    //состояние для показа надписи loading
    const [loading, setLoading] = useState(false);

    //
    // последний индекс в полученного недели
    const lastDataIndex = currentPage * monthPerPage;
    //первый индекс
    const firstDataIndex = lastDataIndex - monthPerPage;
    //сколько месяцев отображать
    const currentData = data.slice(firstDataIndex, lastDataIndex);

    //начальная страница недели
    const [currentWeekPage, setWeekCurrentPage] = useState(
        getDay(years, new Date().getMonth() + 1, new Date().getDate())
    );

    //сколько дней показывать
    const [weekPerPage, setWeekPerPage] = useState(7);
    // последний индекс в полученной недели
    const lastWeekIndex = currentWeekPage * weekPerPage;
    //первый индекс
    const firstWeekIndex = lastWeekIndex - weekPerPage;
    // пагинация по неделям дням
    const paginateWeek = (pageNumber) => {
        setWeekCurrentPage(pageNumber);
    };
    //
    const [selectedWeek, setSelectedWeek] = useState("неделя");
    //получем id ячеки
    const [cellId, setCellId] = useState();
    //получаем id сотрудника
    const [userId, setUserID] = useState();
    // получаем дату ячейки
    const [cellDate, setCellDate] = useState();

    const handleClickYears = (e) => {
        setYears(e.target.innerText);
    };
    //Функция возращает значени для select
    const handleWeekChange = (event) => {
        setSelectedWeek(event.target.value);
    };
    //Функция возращает значени для select
    const handleNormaDayChange = (event) => {
        setDayNorma(event.target.value);
        setTimeNorma(Number(event.target.value) * 8);
    };

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    useEffect(() => {
        setLoading(true);
        setData(countMonth);
        //получаем всех сотрудников  и записываем их в состояние
        const allUsers = async () => {
            const users = await fetchUsers();
            setDataUsers(users);
        };

        //получаем всех сотрудников  и записываем их в состояние
        const resCellData = async () => {
            const res = await fetchTabel();
            setDataCell(res);
        };

        // проверям селект учли месяц то 31 если неделя то 7
        setTimeout(() => {
            setLoading(false);
            if (selectedWeek === "неделя") {
                // setCellClass("week");
                setWeekCurrentPage(
                    getDay(
                        new Date(
                            years,
                            new Date().getMonth(),
                            new Date().getDate()
                        )
                    )
                );
                setWeekPerPage(7);
            } else if (selectedWeek === "месяц") {
                // setCellClass("month");
                setWeekCurrentPage(1);
                setWeekPerPage(31);
            } else if (selectedWeek === "день") {
                setWeekPerPage(1);
                setWeekCurrentPage(
                    new Date(years, new Date().getMonth()).getDate()
                );
            }
        }, 10);
        resCellData();
        allUsers();
    }, [currentPage, selectedWeek, isOpen]);

    if (loading) {
        return <h2>LOADING...</h2>;
    }

    /**
     *функция возращает массив сколько дней в месяце
     * @param {number} numberMonth - индкекс месяца
     * @returns
     */
    function howMonthDay(years, numberMonth) {
        const resultDay = getDaysInMonth(new Date(years, numberMonth));

        const month = [];

        for (let i = 1; i <= resultDay; i++) {
            month.push(i);
        }
        return month;
    }

    function handleDoubleClick(event) {
        setCellId(event.target.id);
        setUserID(event.target.dataset.userId);
        setCellDate(event.target.dataset.cellDate);

        setIsOpen(true);
    }

    if (dataUsers.length !== 0) {
        return (
            <>
                <h2 className="mb-4">Табель</h2>
                <button
                    onClick={handleClickYears}
                    type="button"
                    className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
                >
                    2025
                </button>
                <button
                    onClick={handleClickYears}
                    type="button"
                    className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
                >
                    2026
                </button>
                <button
                    onClick={handleClickYears}
                    type="button"
                    className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
                >
                    2027
                </button>
                <div className="overflow-x-auto">
                    {currentData.map((item, monthInd) => {
                        return (
                            <div key={monthInd} className="text-left">
                                <h2 className="uppercase l mb-4 text-cyan-900">
                                    {nameMonth(item)} {years}
                                </h2>
                                <div className="flex items-center">
                                    <select
                                        id="day__week_month"
                                        className="border-2 border-gray-400 rounded-2xl mb-2 p-2 px-4 outline-0 mr-5"
                                        value={selectedWeek}
                                        onChange={handleWeekChange}
                                    >
                                        <option value="день">день</option>
                                        <option value="неделя">неделя</option>
                                        <option value="месяц">месяц</option>
                                    </select>
                                    <div className="mr-8">
                                        <PaginationWeek
                                            weekPerPage={weekPerPage}
                                            totalWeek={
                                                howMonthDay(years, item).length
                                            }
                                            paginateWeek={paginateWeek}
                                        />
                                    </div>
                                </div>
                                <div className="flex justify-center">
                                    <div className="mr-8">
                                        <h2 className="mb-6">Норма дней:</h2>
                                        <input
                                            type="text"
                                            id="day__week_month"
                                            className="border-2 border-gray-400 rounded-2xl mb-2 p-2 px-2 outline-0 w-15 bg-gray-100 text-fuchsia-800"
                                            value={dayNorma}
                                            onChange={handleNormaDayChange}
                                        />
                                    </div>
                                    <div>
                                        <h2 className="mb-6">Норма часов:</h2>
                                        <input
                                            type="text"
                                            disabled
                                            value={timeNorma}
                                            className="border-2 border-gray-400 rounded-2xl mb-2 p-2 px-2 outline-0 w-15 bg-gray-100 text-fuchsia-800"
                                        />
                                    </div>
                                </div>
                                <table className="mb-8 border-separate border-spacing-3    bg-white rounded-2xl p-4">
                                    <thead className="bg-slate-800 text-white ">
                                        <tr>
                                            <th></th>
                                            {howMonthDay(years, item)
                                                .slice(
                                                    firstWeekIndex,
                                                    lastWeekIndex
                                                )
                                                .map((day, dayInd) => {
                                                    return (
                                                        <th
                                                            key={
                                                                dayInd +
                                                                monthInd
                                                            }
                                                            data-color-th="false"
                                                            className="border border-gray-400 dark:border-gray-500 px-4 py-2 text-center"
                                                        >
                                                            <p
                                                                className={`mb-3 text-2xl ${
                                                                    daysWeek(
                                                                        new Date(
                                                                            years,
                                                                            item,
                                                                            day
                                                                        ).getDay()
                                                                    ) === "Вс"
                                                                        ? "red"
                                                                        : daysWeek(
                                                                              new Date(
                                                                                  years,
                                                                                  item,
                                                                                  day
                                                                              ).getDay()
                                                                          ) ===
                                                                          "Сб"
                                                                        ? "red"
                                                                        : ""
                                                                } ${
                                                                    format(
                                                                        new Date(
                                                                            years,
                                                                            item,
                                                                            day
                                                                        ),
                                                                        "dd"
                                                                    ) ===
                                                                    format(
                                                                        new Date(
                                                                            years,
                                                                            new Date().getMonth(),
                                                                            new Date().getDate()
                                                                        ),
                                                                        "dd"
                                                                    )
                                                                        ? "bg-green"
                                                                        : "bg"
                                                                }`}
                                                            >
                                                                {`${format(
                                                                    new Date(
                                                                        years,
                                                                        item,
                                                                        day
                                                                    ),
                                                                    "dd"
                                                                )}`}
                                                            </p>
                                                            <p
                                                                className={`${
                                                                    daysWeek(
                                                                        new Date(
                                                                            years,
                                                                            item,
                                                                            day
                                                                        ).getDay()
                                                                    ) === "Вс"
                                                                        ? "red"
                                                                        : daysWeek(
                                                                              new Date(
                                                                                  years,
                                                                                  item,
                                                                                  day
                                                                              ).getDay()
                                                                          ) ===
                                                                          "Сб"
                                                                        ? "red"
                                                                        : ""
                                                                }`}
                                                            >
                                                                {`${daysWeek(
                                                                    new Date(
                                                                        years,
                                                                        item,
                                                                        day
                                                                    ).getDay()
                                                                )}`}
                                                            </p>
                                                        </th>
                                                    );
                                                })}
                                        </tr>
                                    </thead>
                                    <tbody className="text-gray-800">
                                        {dataUsers.map((user, ind) => {
                                            return (
                                                <tr key={ind}>
                                                    <td
                                                        id={user.id}
                                                        key={user.id}
                                                        className={`sticky-column border-separate border border-gray-400 dark:border-gray-500 p-2 px-4 text-2xl`}
                                                    >
                                                        {user.lastName}{" "}
                                                        {user.firstName}{" "}
                                                        {user.surname}
                                                    </td>
                                                    {howMonthDay(years, item)
                                                        .slice(
                                                            firstWeekIndex,
                                                            lastWeekIndex
                                                        )
                                                        .map((day, ind) => {
                                                            return (
                                                                <td
                                                                    data-user-id={
                                                                        user.id
                                                                    }
                                                                    data-cell-date={
                                                                        new Date(
                                                                            years,
                                                                            item,
                                                                            day
                                                                        )
                                                                    }
                                                                    onDoubleClick={
                                                                        handleDoubleClick
                                                                    }
                                                                    id={`${user.id}-${years}-${item}-${day}`}
                                                                    key={
                                                                        user.id +
                                                                        ind
                                                                    }
                                                                    className={`border-separate  border border-gray-400 dark:border-gray-500 p-4 text-center`}
                                                                >
                                                                    {dataCell.map(
                                                                        (
                                                                            cellData
                                                                        ) => {
                                                                            return cellData.id ===
                                                                                user.id +
                                                                                    "-" +
                                                                                    years +
                                                                                    "-" +
                                                                                    item +
                                                                                    "-" +
                                                                                    day ? (
                                                                                <div
                                                                                    key={
                                                                                        item +
                                                                                        day
                                                                                    }
                                                                                >
                                                                                    <p
                                                                                        className={`text-teal-600 text-2xl mb-2 ${
                                                                                            cellData.jobStatus ===
                                                                                            "Рабочий выходной"
                                                                                                ? "red"
                                                                                                : ""
                                                                                        } `}
                                                                                    >
                                                                                        {
                                                                                            cellData.jobStatus
                                                                                        }{" "}
                                                                                    </p>
                                                                                    <p className="text-2xl">
                                                                                        {" " +
                                                                                            cellData.time}
                                                                                    </p>
                                                                                </div>
                                                                            ) : (
                                                                                ""
                                                                            );
                                                                        }
                                                                    )}
                                                                </td>
                                                            );
                                                        })}
                                                    <td key={years + user.id}>
                                                        {countDayTime(
                                                            dataCell,
                                                            new Date(
                                                                years,
                                                                item
                                                            ),
                                                            user.id,
                                                            dayNorma,
                                                            howMonthDay(
                                                                years,
                                                                item
                                                            )
                                                        ).map(
                                                            (
                                                                userStatistika,
                                                                ind
                                                            ) => {
                                                                return (
                                                                    <div
                                                                        className="static_text w-60 mb-1"
                                                                        key={
                                                                            user.id +
                                                                            ind
                                                                        }
                                                                    >
                                                                        {
                                                                            userStatistika
                                                                        }
                                                                    </div>
                                                                );
                                                            }
                                                        )}
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                    <tfoot></tfoot>
                                </table>
                            </div>
                        );
                    })}
                </div>
                <PaginationTabel
                    monthPerPage={monthPerPage}
                    totalMonth={countMonth.length}
                    paginate={paginate}
                />
                <ModalTabelCell
                    isOpen={isOpen}
                    setIsOpen={setIsOpen}
                    cellId={cellId}
                    userId={userId}
                    cellDate={cellDate}
                    years={years}
                    dayNorma={dayNorma}
                    timeNorma={timeNorma}
                />
            </>
        );
    }
};
