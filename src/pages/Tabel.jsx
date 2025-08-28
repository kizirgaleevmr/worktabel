import { useState, useEffect } from "react";
import { daysWeek, nameMonth } from "../components/utils/date";
import { fetchUsers } from "../components/config/firebase";
import { format, getDaysInMonth, getDay } from "date-fns";
import { PaginationTabel, PaginationWeek } from "../components/ui/Pagination";

const today =
    `${nameMonth(new Date().getMonth())}` +
    " " +
    `${daysWeek(new Date().getDay())}` +
    " " +
    `${new Date().getFullYear()}`;

const countMonth = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

export const Tabel = () => {
    //состояние для массива c данными по дням
    const [data, setData] = useState([]);

    //состяние для массива по сотрудникам
    const [dataUsers, setDataUsers] = useState([]);

    //состояние для показа дней недели месяца number
    const [month, setMonth] = useState(0);

    //начальная страница
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

    //массив дней в месяце
    const [week, setWeek] = useState(month);

    //начальная страница недели
    const [currentWeekPage, setWeekCurrentPage] = useState(
        getDay(
            new Date().getFullYear(),
            new Date().getMonth() + 1,
            new Date().getDate()
        )
    );

    //сколько дней показывать
    const [weekPerPage, setWeekPerPage] = useState(7);
    // последний индекс в полученной недели
    const lastWeekIndex = currentWeekPage * weekPerPage;
    //первый индекс
    const firstWeekIndex = lastWeekIndex - weekPerPage;

    //состояние для класса ячейки
    const [cellClass, setCellClass] = useState();
    const paginateWeek = (pageNumber) => {
        setWeekCurrentPage(pageNumber);
    };

    const [selectedWeek, setSelectedWeek] = useState("неделя"); // Default selected fruit

    //Функция возращает значени для select
    const handleWeekChange = (event) => {
        setSelectedWeek(event.target.value);
    };

    const paginate = (pageNumber) => {
        setMonth(pageNumber);
        setCurrentPage(pageNumber);
    };

    /**
     *функция возращает сколько дней в месяце
     * @param {number} numberMonth - индкекс месяца
     * @returns
     */
    function howMonthDay(numberMonth) {
        const resultDay = getDaysInMonth(
            new Date(new Date().getFullYear(), numberMonth)
        );

        const month = [];

        for (let i = 1; i <= resultDay; i++) {
            month.push(i);
        }
        return month;
    }
    useEffect(() => {
        setLoading(true);
        setData(countMonth);
        //получаем всех сотрудников  и записываем их в состояние
        const allUsers = async () => {
            const users = await fetchUsers();
            setDataUsers(users);
        };
        // проверям селект учли месяц то 31 если неделя то 7
        setTimeout(() => {
            setLoading(false);
            console.log(selectedWeek);
            if (selectedWeek === "неделя") {
                setCellClass("week");
                setWeekCurrentPage(
                    getDay(
                        new Date().getFullYear(),
                        new Date().getMonth() + 1,
                        new Date().getDate()
                    )
                );
                setWeekPerPage(7);
            } else if (selectedWeek === "месяц") {
                setCellClass("month");
                setWeekCurrentPage(1);
                setWeekPerPage(31);
            } else if (selectedWeek === "день") {
                setWeekPerPage(1);
                setWeekCurrentPage(new Date().getDate());
                setCellClass("day");
            }
        }, 1000);
        allUsers();
    }, [currentPage, selectedWeek]);

    if (loading) {
        return <h2>LOADING...</h2>;
    }

    /**
     *функция возращает массив сколько дней в месяце
     * @param {number} numberMonth - индкекс месяца
     * @returns
     */
    function howMonthDay(numberMonth) {
        const resultDay = getDaysInMonth(
            new Date(new Date().getFullYear(), numberMonth)
        );

        const month = [];

        for (let i = 1; i <= resultDay; i++) {
            month.push(i);
        }
        return month;
    }

    if (dataUsers.length !== 0) {
        return (
            <>
                <h2>Табель</h2>
                <div>
                    {currentData.map((item, monthInd) => {
                        return (
                            <div key={monthInd} className="text-left m-">
                                <h2 className="uppercase text-3xl mb-4 text-cyan-900">
                                    {nameMonth(item)} {new Date().getFullYear()}
                                </h2>
                                <select
                                    id="day__week_month"
                                    className="text-2xl border-2 border-gray-400 rounded-2xl mb-2 p-2 px-4 outline-0"
                                    value={selectedWeek}
                                    onChange={handleWeekChange}
                                >
                                    <option value="день">день</option>
                                    <option value="неделя">неделя</option>
                                    <option value="месяц">месяц</option>
                                </select>
                                <div>
                                    <PaginationWeek
                                        weekPerPage={weekPerPage}
                                        totalWeek={howMonthDay(item).length}
                                        paginateWeek={paginateWeek}
                                    />
                                </div>
                                <table className="mb-8 border-separate border-spacing-1 border  text-white border-gray-400 dark:border-gray-500 bg-slate-600 rounded-2xl p-4">
                                    <thead className="bg-slate-800">
                                        <tr>
                                            <th></th>
                                            {howMonthDay(item)
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
                                                            className="border border-gray-400 dark:border-gray-500 p-2 px-5 text-center text-2xl"
                                                        >
                                                            <p>
                                                                {`${format(
                                                                    new Date(
                                                                        new Date().getFullYear(),
                                                                        item,
                                                                        day
                                                                    ),
                                                                    "dd"
                                                                )}`}
                                                            </p>
                                                            <p>
                                                                {`${daysWeek(
                                                                    new Date(
                                                                        new Date().getFullYear(),
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
                                    <tbody>
                                        {dataUsers.map((user, ind) => {
                                            return (
                                                <tr key={ind}>
                                                    <td
                                                        id={user.id}
                                                        key={user.id}
                                                        className={`text-2xl border-separate  border border-gray-400 dark:border-gray-500 p-2 px-4 w-60 ${cellClass} w-150`}
                                                    >
                                                        {user.lastName}{" "}
                                                        {user.firstName}{" "}
                                                        {user.surname}
                                                    </td>
                                                    {howMonthDay(item)
                                                        .slice(
                                                            firstWeekIndex,
                                                            lastWeekIndex
                                                        )
                                                        .map((el, ind) => {
                                                            return (
                                                                <td
                                                                    id={`${
                                                                        user.id
                                                                    }-${new Date().getFullYear()}-${item}-${el}`}
                                                                    key={
                                                                        user.id +
                                                                        ind
                                                                    }
                                                                    className={`border-separate  border border-gray-400 dark:border-gray-500 p-2 px-4 w-60 ${cellClass}`}
                                                                >
                                                                    {el}
                                                                </td>
                                                            );
                                                        })}
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
            </>
        );
    }
};
