import React, { useEffect, useState } from "react";
import { Button, Typography, Textarea } from "@material-tailwind/react";
import { base64Coding } from "../utils/base64";
import { uploadImage, updateUsersInDB } from "../config/firebase";
export function DrawerPlacement({
    openRight,
    setOpenRight,
    userObject,
    setUserObject,
}) {
    //состояние для radio мужской женский
    const isMan = userObject["default-radio"] === "Мужской";
    const isWoman = userObject["default-radio"] === "Женский";
    const closeDrawerRight = () => {
        setOpenRight(false);
    };
    //Формирвание объекта с данными из формы
    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserObject({
            ...userObject,
            [name]: value,
        });
    };

    useEffect(() => {
        //вставляем загруженное фото с firebase
        const imgElement = document.getElementById("pasteImg");
        const img = document.createElement("img");
        img.src = userObject.imgSrc;
        imgElement.innerText = "";
        imgElement.insertAdjacentHTML("afterbegin", "<h3>Фото</h3>");
        imgElement.append(img);
    }, [userObject.imgSrc]);

    //Добавляем в объект изображение file если будем менять фото
    const urlImage = async (e) => {
        const { name, files } = e.target;
        setUserObject({
            ...userObject,
            [name]: files[0],
        });
        //Кодируем изображение в base64 и вставляем его в модальное окно
        base64Coding(e.target);
        return e.target.files;
    };
    // Обновляем в БД
    function updateUsersClick() {
        updateUsersInDB(userObject, userObject.file);
    }

    const Radio = () => {
        return (
            <>
                <input
                    checked={isMan}
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
                    checked={isWoman}
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
            </>
        );
    };
    return (
        <div
            className={`drower top-0 p-8 w-150 ${
                openRight ? "drower__open" : "drower__close"
            }`}
        >
            <form>
                <div>
                    <div className="mb-2 flex flex-wrap text-left gap-8">
                        <div className="flex flex-wrap justify-between gap-8">
                            <div>
                                <label
                                    htmlFor="lastName"
                                    className="block text-gray-500 mb-2"
                                >
                                    Фамилия:
                                </label>
                                <input
                                    id="lastName"
                                    type="text"
                                    name="lastName"
                                    className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-500 w-1/1"
                                    value={userObject.lastName}
                                    placeholder="Иванов"
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="firstName"
                                    className="block text-gray-500 mb-2"
                                >
                                    Имя:
                                </label>
                                <input
                                    id="firstName"
                                    type="text"
                                    name="firstName"
                                    className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-500 w-1/1"
                                    value={userObject.firstName}
                                    placeholder="Иван"
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="surname"
                                    className="block text-gray-500 mb-2"
                                >
                                    Отчество:
                                </label>
                                <input
                                    id="surname"
                                    type="text"
                                    name="surname"
                                    className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-500 w-1/1 mb-4"
                                    value={userObject.surname}
                                    placeholder="Иванович"
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <div className="flex justify-between text-left gap-8">
                            <div className="w-full">
                                <label
                                    htmlFor="birthday"
                                    className="block text-gray-500 mb-2"
                                >
                                    Год рождения:
                                </label>
                                <input
                                    id="bithday"
                                    type="date"
                                    name="birthday"
                                    className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-500 w-60"
                                    value={userObject.birthday}
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
                                    id="tabelNumber"
                                    type="text"
                                    name="tabelNumber"
                                    className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-500 mb-4 w-60"
                                    value={userObject.tabelNumber}
                                    placeholder="0000"
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-row flex-wrap mb-4 text-left gap-8">
                        <div>
                            <label
                                htmlFor="emil"
                                className="block text-gray-500 mb-2"
                            >
                                email
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="text"
                                placeholder="email"
                                className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-500 w-full"
                                value={userObject.email}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="phone"
                                className="block text-gray-500 mb-2 w-1/2"
                            >
                                Телефон
                            </label>
                            <input
                                id="phone"
                                name="phone"
                                type="text"
                                placeholder="phone"
                                className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-500 w-full"
                                value={userObject.phone}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="flex flex-row gap-8">
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
                </div>
                <div>
                    <div className="flex items-center mb-4">
                        <Radio />
                    </div>
                </div>
                <div className="flex gap-8">
                    <div className="mb-4">
                        <select
                            id="underline_select"
                            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-500"
                            onChange={handleChange}
                            name="dolzhnost"
                        >
                            <option>Выбирете должность</option>
                            <option value="Инженер по АСУП">
                                Инженер по АСУП
                            </option>
                            <option value="Инженер по АСУП 1 категории">
                                Инженер по АСУП 1 категории
                            </option>
                            <option value="Инженер по АСУП 2 категории">
                                Инженер по АСУП 2 категории
                            </option>
                            <option value="Инженер">Инженер</option>
                            <option value="Техник">Техник</option>
                            <option value="водитель">Водитель</option>
                        </select>
                    </div>
                    <div className="mb-4 text-left">
                        <label
                            htmlFor="useDate"
                            className="block mb-2 text-sm font-medium text-gray-500"
                        >
                            Дата устройства:
                        </label>
                        <input
                            id="user__date"
                            type="date"
                            name="userDate"
                            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-500 w-full"
                            onChange={handleChange}
                            value={userObject.userDate}
                        />
                    </div>
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
                        value={userObject.note}
                    />
                </div>
            </form>
            <div className="flex flex-wrap gap-4">
                <Button variant="outlined" onClick={closeDrawerRight}>
                    Закрыть
                </Button>
                <Button variant="outlined" onClick={updateUsersClick}>
                    Сохранить
                </Button>
            </div>
        </div>
    );
}
