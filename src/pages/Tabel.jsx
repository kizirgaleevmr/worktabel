import React, { useState, useEffect } from "react";
import { daysWeek, nameMonth } from "../components/utils/date";
import { fetchUsers } from "../components/config/firebase";
import { format, getDaysInMonth, getDay, getWeekOfMonth } from "date-fns";
import { PaginationTabel, PaginationWeek } from "../components/ui/Pagination";
import { ModalTabelCell } from "../components/ui/ModalTabelCell";
import { fetchTabel } from "../components/config/firebase";
import { countDayTime } from "../components/utils/countDayTime";
import { icons } from "../components/ui/icons";
import { deleteCellFromDB } from "../components/config/firebase";
import { ButtonBlack, ButtonOrange } from "../components/ui/Button/Button";
const countMonth = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

export const Tabel = () => {
    // состояние для обновления после внесени данных в ячейку
    const [addCellValue, setAddCellValue] = useState(0);
    //состояение для норма дней
    const [dayNorma, setDayNorma] = useState(21);
    //состоягние для норма дней
    const [timeNorma, setTimeNorma] = useState(dayNorma * 8);

    //состяния для указания года
    const [years, setYears] = useState(new Date().getFullYear());

    const [isOpen, setIsOpen] = React.useState(false);
    //состояние для массива сколько месяцев
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

    //начальная страница недели месяца
    const [currentWeekPage, setWeekCurrentPage] = useState(
        localStorage.getItem("paginate") !== null
            ? localStorage.getItem("paginate")
            : getWeekOfMonth(
                  new Date(years, new Date().getMonth(), new Date().getDate())
              )
    );

    //сколько дней показывать
    const [weekPerPage, setWeekPerPage] = useState(7);
    // последний индекс в полученной недели
    const lastWeekIndex = currentWeekPage * weekPerPage;
    //первый индекс
    const firstWeekIndex = lastWeekIndex - weekPerPage;
    // пагинация по неделям дням
    const paginateWeek = (pageNumber) => {
        //localStorage для сохранения страницы в днях
        const LS = localStorage;
        LS.setItem("paginate", pageNumber);
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

        //получаем данные из firebase Tabel
        const resCellData = async () => {
            const res = await fetchTabel();
            setDataCell(res);
        };
        // проверям селект если месяц то 31 если неделя то 7 вывод пагинации
        setTimeout(() => {
            setLoading(false);
            if (selectedWeek === "неделя") {
                setWeekCurrentPage(
                    //
                    localStorage.getItem("paginate") == null
                        ? getWeekOfMonth(
                              new Date(
                                  years,
                                  new Date().getMonth(),
                                  new Date().getDate()
                              )
                          )
                        : localStorage.getItem("paginate")
                );

                setWeekPerPage(7);
            } else if (selectedWeek === "месяц") {
                setWeekCurrentPage(1);
                setWeekPerPage(31);
            } else if (selectedWeek === "день") {
                setWeekPerPage(1);
                // setWeekCurrentPage(
                //     new Date(
                //         years,
                //         new Date().getMonth(),
                //         new Date().getDate()
                //     ).getDate()
                // );
                setWeekCurrentPage(
                    //
                    localStorage.getItem("paginate") == null
                        ? getWeekOfMonth(
                              new Date(
                                  years,
                                  new Date().getMonth(),
                                  new Date().getDate()
                              )
                          )
                        : localStorage.getItem("paginate")
                );
            }
            // localStorage.clear();
        }, 100);
        resCellData();
        allUsers();
        setAddCellValue(false);
    }, [selectedWeek, addCellValue]);

    React.useEffect(() => {}, [currentPage]);
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
        // console.log(event.target);
        setCellId(event.target.id);
        setUserID(event.target.dataset.userId);
        setCellDate(event.target.dataset.cellDate);

        setIsOpen(true);
    }

    //Функция на удаления
    function deletCell(e) {
        const elementParent =
            e.target.parentElement.parentElement.parentElement.parentElement.id;
        const isDelete = confirm("Удалить данные?");
        if (!isDelete) alert("Вы отменили действые");
        deleteCellFromDB(elementParent);
        setAddCellValue(addCellValue - 1);
    }

    if (dataUsers.length !== 0) {
        return (
            <>
                <h2 className="mb-4 text-white text-2xl">Табель</h2>
                <ButtonOrange
                    subText="2025"
                    click={handleClickYears}
                    type="button"
                />
                <ButtonOrange
                    subText="2026"
                    click={handleClickYears}
                    type="button"
                />
                <ButtonOrange
                    subText="2027"
                    click={handleClickYears}
                    type="button"
                />
                <div>
                    {currentData.map((item, monthInd) => {
                        return (
                            <div key={monthInd} className="text-left">
                                <h2 className="uppercase l mb-4 text-white text-2xl">
                                    {nameMonth(item)} {years}
                                </h2>
                                <div className="flex items-center">
                                    <div className="mr-10 text-black">
                                        <select
                                            id="day__week_month"
                                            className="border-2 border-gray-400 rounded-2xl w-auto mb-2 outline-0 text-black bg-white px-5  py-2"
                                            value={selectedWeek}
                                            onChange={handleWeekChange}
                                        >
                                            <option value="день">день</option>
                                            <option value="неделя">
                                                неделя
                                            </option>
                                            <option value="месяц">месяц</option>
                                        </select>
                                    </div>
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
                                        <h2 className="mb-6 text-white">
                                            Норма дней:
                                        </h2>
                                        <input
                                            type="text"
                                            id="day__week_month"
                                            className="border-2 border-gray-400 rounded-2xl mb-2 p-2 px-2 outline-0 w-15 bg-gray-100 text-fuchsia-800"
                                            value={dayNorma}
                                            onChange={handleNormaDayChange}
                                        />
                                    </div>
                                    <div>
                                        <h2 className="mb-6 text-white">
                                            Норма часов:
                                        </h2>
                                        <input
                                            type="text"
                                            disabled
                                            value={timeNorma}
                                            className="border-2 border-gray-400 rounded-2xl mb-2 p-2 px-2 outline-0 w-15 bg-gray-100 text-fuchsia-800"
                                        />
                                    </div>
                                </div>
                                <div className="overflow-x-auto w-500">
                                    <table className="mb-8 border-separate border-spacing-1    bg-white rounded-2xl p-4">
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
                                                                        ) ===
                                                                        "Вс"
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
                                                                            ) &&
                                                                        new Date(
                                                                            years,
                                                                            item,
                                                                            day
                                                                        ).getMonth() ===
                                                                            new Date().getMonth()
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
                                                                        ) ===
                                                                        "Вс"
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
                                                        {howMonthDay(
                                                            years,
                                                            item
                                                        )
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
                                                                        className={`border-separate  border border-gray-400 dark:border-gray-500 p-4 text-center relative`}
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
                                                                                        <button
                                                                                            className="!absolute right-0 top-2 hover:text-rose-700"
                                                                                            onClick={
                                                                                                deletCell
                                                                                            }
                                                                                        >
                                                                                            {
                                                                                                icons?.trash
                                                                                            }
                                                                                        </button>
                                                                                        <p
                                                                                            className={`text-teal-600 mb-2 ${
                                                                                                cellData.jobStatus ===
                                                                                                "РВ"
                                                                                                    ? "red"
                                                                                                    : ""
                                                                                            } `}
                                                                                        >
                                                                                            {
                                                                                                cellData.jobStatus
                                                                                            }
                                                                                        </p>
                                                                                        <p>
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
                                                        <td
                                                            key={
                                                                years + user.id
                                                            }
                                                        >
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
                                    </table>
                                </div>
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
                    setAddCellValue={setAddCellValue}
                    addCellValue={addCellValue}
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
