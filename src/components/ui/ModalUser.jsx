import React, { useEffect, useState } from "react";
// import { Provider } from "@/components/ui/provider";
import {
    Dialog,
    Textarea,
    Typography,
    DialogBody,
    DialogHeader,
    DialogFooter,
} from "@material-tailwind/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { handleSubmitToDB, uploadImage } from "../config/firebase";
import { AlertWithList } from "../ui/Alert";
import { base64Coding } from "../utils/base64";

export function AddUserDialog({ open, setOpen, setShow, show }) {
    //для данных из формы
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        surname: "",
        file: null,
        userDate: "",
        note: "",
    });
    //для показа алерта
    const [alertUserState, setAlertUserState] = useState(false);
    //Закрытие модального окна
    const handleOpen = () => {
        setOpen(!open);
    };

    //Формирвание объекта с данными из формы
    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value,
        });
        console.log(formData);
    };

    //Добавляем в объект изображение file
    const urlImage = (e) => {
        const { name, files } = e.target;
        setFormData({
            ...formData,
            [name]: files[0],
        });
        //Кодируем изображение в base64 и вставляем его в модальное окно
        base64Coding(e.target);
        return e.target.files;
    };

    //для отправки данных на firebase
    const addUsers = async () => {
        const reject = handleSubmitToDB(formData, formData.file);
        //Закрываем модалку
        handleOpen();
        setShow(false);
        setTimeout(() => {
            setShow(true);
        }, 1000);
    };

    //функция для показа алерта
    function showAlert() {
        //Убирам alert через 3 секунды
        if (alertUserState) {
            setTimeout(() => {
                setAlertUserState(false);
            }, 3000);
        }
        if (alertUserState) {
            return (
                <AlertWithList
                    title="Данные сохранены"
                    text={`${formData?.lastName} ${formData?.firstName} `}
                    showAlert={alertUserState}
                />
            );
        }
    }
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
                            <div className="mb-2 flex flex-wrap">
                                <label
                                    htmlFor="lastName"
                                    className="block text-gray-500 mb-2"
                                >
                                    Фамилия:
                                </label>
                                <input
                                    type="text"
                                    name="lastName"
                                    className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-500 w-1/1"
                                    placeholder="Иванов"
                                    onChange={handleChange}
                                    required
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
                                    className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-500 w-1/1"
                                    placeholder="Иван"
                                    onChange={handleChange}
                                    required
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
                                    className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-500 w-1/1 mb-4"
                                    placeholder="Иванович"
                                    onChange={handleChange}
                                    required
                                />
                                <div className="w-full flex justify-between">
                                    <div className="w-full">
                                        <label
                                            htmlFor="birthday"
                                            className="block text-gray-500 mb-2"
                                        >
                                            Год рождения:
                                        </label>
                                        <input
                                            type="date"
                                            name="birthday"
                                            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-500 w-60"
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div>
                                        <label
                                            htmlFor="tabelNumber"
                                            className="block text-gray-500 mb-2"
                                        >
                                            Табельный номер:
                                        </label>
                                        <input
                                            type="text"
                                            name="tabelNumber"
                                            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-500 mb-4 w-60"
                                            placeholder="0000"
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-between flex-row  flex-wrap mb-4">
                                <div className="w-60">
                                    <label
                                        htmlFor="emil"
                                        className="block text-gray-500 mb-2"
                                    >
                                        email
                                    </label>
                                    <input
                                        name="email"
                                        type="text"
                                        placeholder="email"
                                        className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-500 w-full"
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="w-60">
                                    <label
                                        htmlFor="phone"
                                        className="block text-gray-500 mb-2 w-1/2"
                                    >
                                        Телефон
                                    </label>
                                    <input
                                        name="phone"
                                        type="text"
                                        placeholder="phone"
                                        className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-500 w-full"
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            <div>
                                <label
                                    className="block mb-2 text-sm font-medium text-gray-500"
                                    htmlFor="file"
                                >
                                    Загрузить файл
                                </label>
                                <input
                                    className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 p-3 mb-2"
                                    id="file"
                                    name="file"
                                    type="file"
                                    onChange={urlImage}
                                />
                            </div>
                            <div id="pasteImg" className="mb-7"></div>
                        </div>
                        <div>
                            <div className="flex items-center mb-4">
                                <input
                                    id="default-radio-1"
                                    type="radio"
                                    value="Мужской"
                                    name="default-radio"
                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-600  dark:bg-gray-700 dark:border-gray-600 outline-0"
                                    onChange={handleChange}
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
                                    onChange={handleChange}
                                />
                                <label
                                    htmlFor="default-radio-2"
                                    className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-500"
                                >
                                    Женский
                                </label>
                            </div>
                        </div>
                        <div className="mb-4">
                            <select
                                id="underline_select"
                                className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-500 w-full"
                                onChange={handleChange}
                                name="dolzhnost"
                                required
                            >
                                <option>Выбирете должность</option>
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
                            <input
                                type="date"
                                name="userDate"
                                className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-500"
                                onChange={handleChange}
                            />
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
                                rows={3}
                                className="!w-full !border-[1.5px] !border-blue-gray-200/90 !border-t-blue-gray-200/90 bg-white text-gray-600 ring-4 ring-transparent focus:!border-primary focus:!border-t-blue-gray-900 group-hover:!border-primary"
                                labelProps={{
                                    className: "hidden",
                                }}
                                onChange={handleChange}
                                name="note"
                                value={formData.note}
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
                        type="submit"
                        className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
                        onClick={addUsers}
                    >
                        Добавить
                    </button>
                </DialogFooter>
            </Dialog>
            {showAlert()}
        </>
    );
}
