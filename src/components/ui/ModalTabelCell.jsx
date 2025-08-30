import React, { useState } from "react";
import { format } from "date-fns";
import {
    Dialog,
    
    Typography,
    DialogBody,
    DialogHeader,
    DialogFooter,
} from "@material-tailwind/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { handleSubmitTabelToDB, fetchTabel } from "../config/firebase";
export const ModalTabelCell = ({
    isOpen,
    setIsOpen,
    cellId,
    userId,
    cellDate,
    years,
    dayNorma,
    timeNorma,
}) => {
    const handleIsOpen = () => {
        setIsOpen(!isOpen);
    };
    //Функция собирает данные и отправляет в БД
    const handleSubmit = (event) => {
        event.preventDefault(); // Prevent default form submission
        const resultToSendDB = {};
        const LS = localStorage;
        const date = format(new Date(cellDate), "yyyy-MM-dd");
        resultToSendDB.cellID = cellId;
        resultToSendDB.userID = userId;
        resultToSendDB.cellDate = date;
        resultToSendDB.dayNorma = dayNorma;
        resultToSendDB.timeNorma = timeNorma;
        resultToSendDB.time = event.target.jobTime.value;
        resultToSendDB.jobStatus = event.target.jobStatus.value;
        LS.setItem(JSON.stringify(userId), JSON.stringify(resultToSendDB));

        const k = LS.key(1);
        const val = LS.getItem(k);
        console.log(resultToSendDB);
        handleSubmitTabelToDB(resultToSendDB, years, userId, cellId);
        setIsOpen(!isOpen);
        // LS.clear();
    };

    return (
        <Dialog
            size="sm"
            open={isOpen}
            handler={handleIsOpen}
            className="p-4 mt-9 ml-95 shadow-slate-700 shadow-lg w-100"
        >
            <DialogHeader className="relative m-0 block">
                <Typography variant="h4" color="blue-gray">
                    Учет времени
                </Typography>
                <button
                    className="!absolute right-3.5 top-3.5"
                    onClick={handleIsOpen}
                >
                    <XMarkIcon className="h-6 w-6 stroke-2 cursor-pointer" />
                </button>
            </DialogHeader>
            <DialogBody className="space-y-4 pb-6 text-left">
                <form onSubmit={handleSubmit}>
                    <input
                        type="time"
                        id="jobTime"
                        name="jobTime"
                        className="border border-gray-500 rounded-2xl p-2 mr-10"
                        // onChange={(e) =>
                        //     setInputValue({
                        //         ...inputValue,
                        //         [e.target.id]: e.target.value,
                        //     })
                        // }
                    />
                    <select
                        className="border border-gray-500 rounded-2xl p-2"
                        name="jobStatus"
                        id="jobStatus"
                        // onChange={(e) => setInputValue(e.target.value)}
                    >
                        <option>Выберите статус</option>
                        <option>Рабочий день</option>
                        <option>Рабочий выходной</option>
                        <option>Командировка</option>
                        <option>Больничный</option>
                        <option>Отпуск</option>
                        <option>Отгул</option>
                    </select>
                    <button
                        type="button"
                        onClick={handleIsOpen}
                        className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
                    >
                        Отмена
                    </button>
                    <button
                        type="submit"
                        className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
                    >
                        Добавить
                    </button>
                </form>
            </DialogBody>
        </Dialog>
    );
};
