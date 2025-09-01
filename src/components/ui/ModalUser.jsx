import React, { useState } from "react";
// import { Provider } from "@/components/ui/provider";
import {
    Dialog,
    Textarea,
    Typography,
    DialogBody,
    DialogHeader,
} from "@material-tailwind/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { handleSubmitToDB, uploadImage } from "../config/firebase";
import { AlertWithList } from "../ui/Alert";
import { base64Coding } from "../utils/base64";
import { userSchema } from "../utils/yup";
import { number } from "yup";
import SelectOption from "@material-tailwind/react/components/Select/SelectOption";

export function AddUserDialog({ open, setOpen, setShow }) {
    //для данных из формы
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        surname: "",
        file: null,
        userDate: "",
        note: "",
    });
    //состояние для радио кнопки
    const [selectedOption, setSelectedOption] = useState("Мужской");

    function selectRadio(e) {
        if (e.target.value === "Мужской") {
            setSelectedOption("Мужской");
        }
        if (e.target.value === "Женский") {
            setSelectedOption("Женский");
        }
    }
    const [errors, setErrors] = useState({});

    const handleSubmit = (e) => {
        e.preventDefault();
        try {
            userSchema.validateSync(formData, { abortEarly: false }); // Validate all fields
            setErrors({}); // Clear errors if validation passes
            // alert("Form submitted successfully!");
            addUsers();
            setFormData({});
        } catch (validationErrors) {
            console.log(validationErrors.inner);
            const newErrors = {};
            validationErrors.inner.forEach((error) => {
                console.log(error.validationError);
                newErrors[error.path] = error.message;
            });
            setErrors(newErrors);
        }
    };
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

        try {
            //преобразуем тип для номер табеля
            // formData.tabelNumber = number(formData.tabelNumber);
            console.log(number(formData));
            userSchema.validateSync(formData, { abortEarly: false }); // Validate all fields
            setErrors({}); // Clear errors if validation passes
            // alert("Form submitted successfully!");
        } catch (validationErrors) {
            console.log(validationErrors.inner);
            const newErrors = {};
            validationErrors.inner.forEach((error) => {
                newErrors[error.path] = error.message;
            });
            setErrors("newErrors");
        }
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
        <div>
            <Dialog
                // size="sm"
                open={open}
                handler={handleOpen}
                className=" w-150 shadow-slate-700 shadow-lg  mt-20 left-[35%]"
            >
                <div className="bg-gray-800 w-1280 h-700 absolute -top-20 -left-300 opacity-80  z-[-1]"></div>
                <DialogHeader className="relative block">
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
                    <form onSubmit={handleSubmit}>
                        <div>
                            <div className="mb-2 flex flex-wrap flex-col">
                                <label
                                    htmlFor="lastName"
                                    className="block text-gray-500 mb-2"
                                >
                                    Фамилия:
                                </label>
                                <input
                                    type="text"
                                    name="lastName"
                                    className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-500 w-1/1 mb-1"
                                    placeholder="Иванов"
                                    onChange={handleChange}
                                />
                                {errors.lastName && (
                                    <p
                                        className="mb-2"
                                        style={{
                                            color: "red",
                                        }}
                                    >
                                        {errors.lastName}
                                    </p>
                                )}
                                <label
                                    htmlFor="firstName"
                                    className="block text-gray-500 mb-2"
                                >
                                    Имя:
                                </label>
                                <input
                                    type="text"
                                    name="firstName"
                                    className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-500 w-1/1 mb-1"
                                    placeholder="Иван"
                                    onChange={handleChange}
                                />
                                {errors.firstName && (
                                    <p
                                        className="mb-2"
                                        style={{
                                            color: "red",
                                        }}
                                    >
                                        {errors.firstName}
                                    </p>
                                )}
                                <label
                                    htmlFor="surname"
                                    className="block text-gray-500 mb-2"
                                >
                                    Отчество:
                                </label>
                                <input
                                    type="text"
                                    name="surname"
                                    className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-500 w-1/1 mb-1"
                                    placeholder="Иванович"
                                    onChange={handleChange}
                                />
                                {errors.surname && (
                                    <p
                                        className="mb-2"
                                        style={{
                                            color: "red",
                                        }}
                                    >
                                        {errors.surname}
                                    </p>
                                )}
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
                                        {errors.birthday && (
                                            <p
                                                className="mb-2"
                                                style={{
                                                    color: "red",
                                                }}
                                            >
                                                {errors.birthday}
                                            </p>
                                        )}
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
                                            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-500 w-60"
                                            placeholder="0000"
                                            onChange={handleChange}
                                        />
                                        {errors.tabelNumber && (
                                            <p
                                                className="mb-2"
                                                style={{
                                                    color: "red",
                                                }}
                                            >
                                                {errors.tabelNumber}
                                            </p>
                                        )}
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
                                    {errors.email && (
                                        <p
                                            className="mb-2"
                                            style={{
                                                color: "red",
                                            }}
                                        >
                                            {errors.email}
                                        </p>
                                    )}
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
                                    {errors.phone && (
                                        <p
                                            className="mb-2"
                                            style={{
                                                color: "red",
                                            }}
                                        >
                                            {errors.phone}
                                        </p>
                                    )}
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
                                    checked={selectedOption === "Мужской"}
                                    id="default-radio-1"
                                    type="radio"
                                    value="Мужской"
                                    name="default-radio"
                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-600  dark:bg-gray-700 dark:border-gray-600 outline-0"
                                    onChange={handleChange}
                                    onClick={selectRadio}
                                />
                                <label
                                    htmlFor="default-radio-1"
                                    className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-500 mr-4"
                                >
                                    Мужской
                                </label>
                                <input
                                    checked={selectedOption === "Женский"}
                                    id="default-radio-2"
                                    type="radio"
                                    value="Женский"
                                    name="default-radio"
                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-600  dark:bg-gray-700 dark:border-gray-600 outline-0"
                                    onChange={handleChange}
                                    onClick={selectRadio}
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
                                <option value="Инженер оп АСУП 1 категории">
                                    Инженер по АСУП 1 категории
                                </option>
                                <option value="Инженер по АСУП 2 категории">
                                    Инженер по АСУП 2 категории
                                </option>
                                <option value="Инженер">Инженер</option>
                                <option value="Техник">Техник</option>
                                <option value="Водитель">Водитель</option>
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
                            {errors.userDate && (
                                <p
                                    className="mb-2"
                                    style={{
                                        color: "red",
                                    }}
                                >
                                    {errors.userDate}
                                </p>
                            )}
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
                                className="!w-full !border-[1.5px] !border-blue-gray-200/90 !border-t-blue-gray-200/90 bg-white text-gray-600 ring-4 ring-transparent focus:!border-primary focus:!border-t-blue-gray-900 group-hover:!border-primary mb-5"
                                labelProps={{
                                    className: "hidden",
                                }}
                                onChange={handleChange}
                                name="note"
                                value={formData.note}
                            />
                        </div>
                        <div className="flex justify-center">
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
                                // onClick={addUsers}
                            >
                                Добавить
                            </button>
                        </div>
                    </form>
                </DialogBody>
            </Dialog>
            {showAlert()}
        </div>
    );
}
