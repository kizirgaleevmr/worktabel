import React, { useState } from "react";
import { format } from "date-fns";
import {
    Dialog,
    Typography,
    DialogBody,
    DialogHeader,
} from "@material-tailwind/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { handleSubmitTabelToDB } from "../config/firebase";
export const ModalTabelCell = ({
    isOpen,
    setIsOpen,
    cellId,
    userId,
    cellDate,
    dayNorma,
    timeNorma,

    setAddCellValue,
    addCellValue,
}) => {
    //состояние для select
    const [selectedValue, setSelectedValue] = useState("РД");
    function handleChange(e) {
        setSelectedValue(e.target.value);
    }
    //состояние для времени
    const [timeValue, setTimeValue] = useState("08:00");

    function handleTimeChange(e) {
        setTimeValue(e.target.value);
    }
    const handleIsOpen = () => {
        setIsOpen(!isOpen);
    };
    //Функция собирает данные и отправляет в БД
    const handleSubmit = (event) => {
        event.preventDefault(); // Prevent default form submission
        const resultToSendDB = {};
        // const LS = localStorage;
        const date = format(new Date(cellDate), "yyyy-MM-dd");
        resultToSendDB.cellID = cellId;
        resultToSendDB.userID = userId;
        resultToSendDB.cellDate = date;
        resultToSendDB.dayNorma = dayNorma;
        resultToSendDB.timeNorma = timeNorma;
        resultToSendDB.time = event.target.jobTime.value;
        resultToSendDB.jobStatus = event.target.jobStatus.value;

        // LS.setItem(JSON.stringify(userId), JSON.stringify(resultToSendDB));
        // const k = LS.key(1);
        // const val = LS.getItem(k);

        handleSubmitTabelToDB(resultToSendDB, cellId);
        setIsOpen(!isOpen);
        // LS.clear();
        setAddCellValue(addCellValue + 1);
        // setTimeout(() => {
        //     setSelectedWeek(true);
        // }, 100);
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
                    <div className="mb-5 flex items-center">
                        <input
                            type="time"
                            id="jobTime"
                            name="jobTime"
                            onChange={handleTimeChange}
                            value={timeValue}
                            className="border border-gray-500 rounded-md p-2 mr-10"
                        />
                        <select
                            className="border border-gray-500 rounded-md  p-2 h-8"
                            name="jobStatus"
                            id="jobStatus"
                            value={selectedValue}
                            onChange={handleChange}
                        >
                            <option>Выберите статус</option>
                            <option value="РД">Рабочий день</option>
                            <option value="РВ">Рабочий выходной</option>
                            <option value="К">Командировка</option>
                            <option value="КВ">Командировка выходной</option>
                            <option value="Б">Больничный</option>
                            <option value="Отпуск">Отпуск</option>
                            <option value="Отгул">Отгул</option>
                        </select>
                    </div>
                    <div className="flex justify-between">
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
                    </div>
                </form>
            </DialogBody>
        </Dialog>
    );
};
