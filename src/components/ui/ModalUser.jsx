import React, { useEffect, useState } from "react";
// import { Provider } from "@/components/ui/provider";
import {
    Input,
    Option,
    Select,
    Button,
    Dialog,
    Textarea,
    IconButton,
    Typography,
    DialogBody,
    DialogHeader,
    DialogFooter,
} from "@material-tailwind/react";
import { XMarkIcon } from "@heroicons/react/24/outline";

export function AddProductDialog({ open, setOpen }) {
    const [formState, setFormState] = useState({
        firstName: "",
        lastName: "",
        surname: "",
        file: null,
        position: "",
        useDate: "",
        note: "",
    });
    const handleOpen = () => {
        setOpen(!open);
    };

    return (
        <>
            <Dialog
                size="sm"
                open={open}
                handler={handleOpen}
                className="p-4 max-w-xl mx-auto mt-20 ml-95"
            >
                <DialogHeader className="relative m-0 block">
                    <Typography variant="h4" color="blue-gray">
                        Анкета сотрудника
                    </Typography>
                    <Typography className="mt-1 font-normal text-gray-600">
                        "ДКИС"
                    </Typography>
                    <button
                        className="!absolute right-3.5 top-3.5"
                        onClick={handleOpen}
                    >
                        <XMarkIcon className="h-6 w-6 stroke-2 cursor-pointer" />
                    </button>
                </DialogHeader>
                <DialogBody className="space-y-4 pb-6 text-left">
                    <form>
                        <div>
                            <div>
                                <label
                                    htmlFor="lastName"
                                    className="block text-gray-500 mb-2"
                                >
                                    Фамилия:
                                </label>
                                <input
                                    type="text"
                                    name="lastName"
                                    className="border-cyan-800 border-b-2 outline-0 w-full mb-4"
                                    placeholder="Иванов"
                                />
                                <label
                                    htmlFor="firstName"
                                    className="block text-gray-500 mb-2"
                                >
                                    Имя:
                                </label>
                                <input
                                    type="text"
                                    name="firstName"
                                    className="border-cyan-800 border-b-2 outline-0 w-full mb-4"
                                    placeholder="Иван"
                                />
                                <label
                                    htmlFor="surname"
                                    className="block text-gray-500 mb-2"
                                >
                                    Отчество:
                                </label>
                                <input
                                    type="text"
                                    name="surname"
                                    className="border-cyan-800 border-b-2 outline-0 w-full mb-4"
                                    placeholder="Иванович"
                                />
                            </div>
                            <div>
                                <label
                                    className="block mb-2 text-sm font-medium text-gray-500"
                                    htmlFor="file_input"
                                >
                                    Загрузить файл
                                </label>
                                <input
                                    className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 p-3 mb-2"
                                    id="file_input"
                                    type="file"
                                />
                            </div>
                        </div>
                        <div>
                            <div className="flex items-center mb-4">
                                <input
                                    id="default-radio-1"
                                    type="radio"
                                    value="Мужской"
                                    name="default-radio"
                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-600  dark:bg-gray-700 dark:border-gray-600 outline-0"
                                />
                                <label
                                    htmlFor="default-radio-1"
                                    className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-500 mr-4"
                                >
                                    Мужской
                                </label>
                                <input
                                    id="default-radio-2"
                                    type="radio"
                                    value="Женский"
                                    name="default-radio"
                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-600  dark:bg-gray-700 dark:border-gray-600 outline-0"
                                />
                                <label
                                    htmlFor="default-radio-2"
                                    className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-500"
                                >
                                    Женский
                                </label>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <div className="w-full"></div>
                            <div className="w-full"></div>
                        </div>
                        <div className="mb-4">
                            <select
                                id="underline_select"
                                className="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
                            >
                                <option selected>Выбирете должность</option>
                                <option value="инженер">Инженер</option>
                                <option value="техник">Техник</option>
                                <option value="водитель">Водитель</option>
                            </select>
                        </div>
                        <div className="mb-4">
                            <label
                                htmlFor="useDate"
                                className="block mb-2 text-sm font-medium text-gray-500"
                            >
                                Дата устройства:
                            </label>
                            <input type="date" name="useDate" id="useDate" />
                        </div>
                        <div>
                            <Typography
                                variant="small"
                                color="blue-gray"
                                className="mb-2 text-left font-medium"
                            >
                                Примечание
                            </Typography>
                            <Textarea
                                rows={7}
                                placeholder="eg. This is a white shoes with a comfortable sole."
                                className="!w-full !border-[1.5px] !border-blue-gray-200/90 !border-t-blue-gray-200/90 bg-white text-gray-600 ring-4 ring-transparent focus:!border-primary focus:!border-t-blue-gray-900 group-hover:!border-primary"
                                labelProps={{
                                    className: "hidden",
                                }}
                            />
                        </div>
                    </form>
                </DialogBody>
                <DialogFooter className="flex justify-between">
                    <button
                        type="button"
                        onClick={handleOpen}
                        className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
                    >
                        Отмена
                    </button>
                    <button
                        type="button"
                        className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
                    >
                        Добавить
                    </button>
                </DialogFooter>
            </Dialog>
        </>
    );
}
