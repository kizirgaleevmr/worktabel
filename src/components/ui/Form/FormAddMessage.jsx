import React, { useState } from "react";
import { region, KSA } from "../../../BD/data";
import { ButtonBlack, ButtonOrange } from "../Button/Button";
import { icons } from "../icons";
import { fecthQeuinpment } from "../../config/server-json";
import { tsModel, typeQeuinpment } from "../../../BD/data";
import { nanoid } from "nanoid";
import { format } from "date-fns";
import { fetchZayavki, handleSubmitZayavkiToDB } from "../../config/firebase";
import { saveToQueipmentDB } from "../../config/server-json";
export const FormAddMessage = ({
    children,
    title,
    user,
    setSaveIsZayavki,
    saveIsZayavki,
    countZayavki
}) => {
    const [reg] = useState(region);
    const [ksa] = useState(KSA.KSA);
    const [model] = useState(tsModel.ts_name);
    const [typeQeuinpmentTS] = useState(typeQeuinpment.type);
    const [selectReg, setSelectReg] = useState("");
    const [selectKsa, setSelectKsa] = useState("");
    const [selectNumber, setSelectNumber] = useState("");
    const [selectUrgency, setSelectUrgency] = useState("");
    const [checkSelectNumber, setCheckSelectNumber] = useState(null);
    const [adress, setAdress] = useState(null);
    const [regId, setRegId] = useState(null);
    const [checkSelectKsa, setCheckSelectKsa] = useState([]);
    const [isActiveSection, setIsActiveSection] = useState(false);
    const [searchProperty, setSearchProperty] = useState("");
    const [valueNumber, setValueNumber] = useState("");
    const [zayavkaNumber, setZayzvkaNumber] = useState(0);
    const [dataZayavki, setDataZayavki] = useState([]);
    const [nameQeuinpment, setNameQeuinpment] = useState([]);
    //оборудование
    const [dataQeuinoment, setDataQeuinpment] = useState([]);

    const today = new Date();

    React.useEffect(() => {
        const found = reg.find((e) => e.reg === selectReg);
        if (found) {
            setRegId(found.id_reg);
        } else {
            setRegId(null);
        }
    }, [selectReg, reg]);

    //выводим список КСА
    const filteKsa = ksa.filter((e) => e.reg_id === regId);
    React.useEffect(() => {
        setCheckSelectKsa(filteKsa);
    }, [regId]); // eslint-disable-line react-hooks/exhaustive-deps

    // получаем адресс КСА
    React.useEffect(() => {
        const filteAdressKsa = checkSelectKsa.filter(
            (e) => e.nomer_ksa === selectKsa
        );
        if (filteAdressKsa.length) {
            const [{ ksa_adress, ksa_naimenovanie, work_phone }] = [
                ...filteAdressKsa,
            ];
            setAdress({
                adress: ksa_adress,
                naimenovanie: ksa_naimenovanie,
                phone: work_phone,
            });
        }
        setZayzvkaNumber("");
        setZayzvkaNumber(
            selectKsa + "_" + format(today, "yy-MM-dd") + "_" + countZayavki
        );
        //Получаем все заявки
        const getAllZayzvki = async () => {
            const response = await fetchZayavki();
            //сохраняем все заявки в состоянии
            // setDataZayavki(response);
            // setCountZayavki(1 + response.length);
        };
        // getAllZayzvki();
    }, [selectKsa]);

    //сбрасываем форму при закрытие
    React.useEffect(() => {
        if (!isActiveSection) {
            resetForm();
        }
    }, [isActiveSection]);

    function resetForm() {
        setSelectReg("");
        setSelectKsa("");
        setAdress(null);
        setRegId(null);
    }

    //получаем значения с интпута сериал или инвентарный
    function changeSerialAndInvent(e) {
        const searchValue = e.target.value;

        if ("serial-number" === e.target.name) {
            setSearchProperty(e.target.name);
            setValueNumber(searchValue);
        }
        if ("inventarniy-number" === e.target.name) {
            setSearchProperty(e.target.name);
            setValueNumber(searchValue);
        }
    }
    //поиск по серийнику или инвентарнику
    React.useEffect(() => {
        //поиск по серийнику или инвентарнику
        async function search() {
            const resp = await fecthQeuinpment(searchProperty, valueNumber);
            setDataQeuinpment(resp);
        }
        search();
    }, [searchProperty, valueNumber]);

    //отбираем по выбранному серийнику у select
    React.useEffect(() => {
        const result = dataQeuinoment.filter((qeuin) => {
            return qeuin.serial_number === selectNumber;
        });
        setCheckSelectNumber(result);
    }, [selectNumber]);

    //TODO! не забыть передать props для обновления данных в таблице
    //Изменяем состояние после сохранения данных
    React.useEffect(() => {}, []);

    //функция для сбора данных с формы и отправки в БД
    function sendToFormDB(e) {
        e.preventDefault();
        //TODOсобираем данные для отправки
        const showModalObject = { message: "", dateClose: "", useClose: "" };
        const form = document.getElementById("form_add_tech");
        const formData = new FormData();

        for (let elem of form.elements) {
            if (
                elem.value !== "" &&
                elem.id !== "serial-number" &&
                elem.id !== "queinpment"
            ) {
                formData.append([elem.id], [elem.value]);
            }
        }

        formData.append(
            "number-zayavki",
            selectKsa + "_" + format(today, "yy-MM-dd") + "_" + countZayavki
        );

        formData.append("user", `${user.lastName} ${user.firstName}`);
        formData.append("date", format(today, "yy-MM-dd"));
        for (let [key, value] of formData) {
            showModalObject[key] = value;
        }
        // TODO: добавить статус заявки или оставить по дате закрыта или нет
        //выводим данные для проверки
        const div = document.createElement("div");
        div.classList.add("qeuinpment_modal");
        const paragraph = document.createElement("p");

        const isSave = confirm("данные верны?");
        
        async function sendToDB(){
             //TODO:отправляем данные в БД
           await handleSubmitZayavkiToDB(showModalObject);
            //отправка в json server
           await saveToQueipmentDB(showModalObject);
            //меняем состояния для обновление таблицы
            setSaveIsZayavki(!saveIsZayavki);
             //сбрасываем форму
        resetForm();
           }

        if (!isSave) {
            console.log("исправььте данные");
        } else {
           sendToDB();
        }
    }
    //TODO: сделать модалку для проверки правильности заявки
    //TODO? сделать проверку на есть ли заявка на такое оборудование и открыта ли она

    return (
        <>
            <button
                onClick={() => {
                    setIsActiveSection(true);
                }}
                type="button"
                className="hover:text-amber-600 cursor-pointer mb-4 text-black"
            >
                {icons["document-plus"]}
            </button>
            {isActiveSection && (
                <section className="absolute -left-96 -top-18 mb-4 text-left px-6 py-5 transition-all duration-300 ease-in-out shadow-md sm:rounded-lg w-500 h-screen bg-gray-600/40">
                    <form
                        id="form_add_tech"
                        className="w-full p-10 rounded-2xl bg-white"
                        onSubmit={sendToFormDB}
                    >
                        <div className="mb-5 flex gap-8">
                            <div className="w-80">
                                {user && (
                                    <>
                                        <div className="relative z-0 w-full mb-5 group">
                                            <input
                                                type="text"
                                                name="number-zayavki"
                                                id="number-zayavki"
                                                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                                placeholder=" "
                                                onChange={changeSerialAndInvent}
                                                value={zayavkaNumber}
                                            />
                                            <label
                                                htmlFor="number-zayavki"
                                                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                                            >
                                                Номер заявки
                                            </label>
                                        </div>
                                        <p id=""></p>
                                        <p className="mb-2 text-base font-medium text-gray-900">
                                            Пользователь:
                                        </p>
                                        <p className="mt-2 text-lg font-medium text-green-800 dark:text-green-800 mb-10">
                                            <span className="">
                                                {user?.lastName}{" "}
                                                {user?.firstName}
                                            </span>
                                        </p>
                                    </>
                                )}
                            </div>
                            <div className="w-120">
                                <label
                                    htmlFor="countries"
                                    className="block mb-2 text-base font-medium text-gray-900 dark:text-white"
                                >
                                    Регион
                                </label>
                                <select
                                    id="countries"
                                    onChange={(e) =>
                                        setSelectReg(e.target.value)
                                    }
                                    value={selectReg}
                                    className="mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                >
                                    <option>--Выббрать регион--</option>
                                    {reg.map((e, ind) => {
                                        return (
                                            <option key={ind} value={e?.reg}>
                                                {e?.reg_naimenovanie}
                                            </option>
                                        );
                                    })}
                                </select>
                                {regId && (
                                    <>
                                        <label
                                            htmlFor="ksa"
                                            className="block mb-2 text-base font-medium text-gray-900 dark:text-white"
                                        >
                                            Номер КСА
                                        </label>
                                        <select
                                            onChange={(e) =>
                                                setSelectKsa(e.target.value)
                                            }
                                            value={selectKsa}
                                            name="ksa"
                                            id="ksa"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-4"
                                        >
                                            <option value="">
                                                --Выбрать КСА--
                                            </option>
                                            {checkSelectKsa.map((e, ind) => {
                                                return (
                                                    <option key={ind * 2}>
                                                        {e?.nomer_ksa}
                                                    </option>
                                                );
                                            })}
                                        </select>
                                        {adress && (
                                            <>
                                                <div className="relative z-0 w-full mb-5 group">
                                                    <input
                                                        type="text"
                                                        name="serial-number"
                                                        id="serial-number"
                                                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                                        placeholder=""
                                                        onChange={
                                                            changeSerialAndInvent
                                                        }
                                                    />
                                                    <label
                                                        htmlFor="serial-number"
                                                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                                                    >
                                                        Серийный номер
                                                    </label>
                                                </div>
                                                <div className="relative z-0 w-full mb-5 group">
                                                    <input
                                                        type="text"
                                                        name="inventarniy-number"
                                                        id="inventarniy-number"
                                                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                                        placeholder=" "
                                                        onChange={
                                                            changeSerialAndInvent
                                                        }
                                                    />
                                                    <label
                                                        htmlFor="inventarniy-number"
                                                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                                                    >
                                                        Инвентарный номер
                                                    </label>
                                                </div>

                                                <div>
                                                    <label
                                                        htmlFor="ksa"
                                                        className="block mb-2 text-base font-medium text-gray-900 dark:text-white"
                                                    >
                                                        Срочность:
                                                    </label>
                                                    <select
                                                        onChange={(e) =>
                                                            setSelectUrgency(
                                                                e.target.value
                                                            )
                                                        }
                                                        value={selectUrgency}
                                                        name="urgency"
                                                        id="urgency"
                                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-4"
                                                    >
                                                        <option>
                                                            --Выбрать
                                                            срочность--
                                                        </option>
                                                        <option>Срочно</option>
                                                        <option>
                                                            Не срочно
                                                        </option>
                                                    </select>
                                                    <label
                                                        htmlFor="message"
                                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                                    >
                                                        Описание проблемы
                                                    </label>
                                                    <textarea
                                                        id="message"
                                                        rows="4"
                                                        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                        placeholder="Описание проблемы..."
                                                    ></textarea>
                                                </div>
                                            </>
                                        )}
                                    </>
                                )}
                            </div>
                            <div className="w-1/2">
                                {adress && (
                                    <div className="flex flex-col">
                                        <div>
                                            <label className="text-base font-medium text-gray-900">
                                                Адресс:
                                            </label>
                                            <p className="text-sm font-normal text-gray-900 mb-3">
                                                {adress?.adress}
                                            </p>
                                            <label className="text-base font-medium text-gray-900">
                                                Наименование:
                                            </label>
                                            <p className="text-sm font-normal text-gray-900 mb-3">
                                                {adress?.naimenovanie}
                                            </p>
                                            <label className="text-base font-medium text-gray-900">
                                                Телефона:
                                            </label>
                                            <p className="text-sm font-normal text-gray-900 mb-3">
                                                {adress?.phone}
                                            </p>
                                        </div>
                                        <div>
                                            {valueNumber && (
                                                <select
                                                    onChange={(e) =>
                                                        setSelectNumber(
                                                            e.target.value
                                                        )
                                                    }
                                                    value={selectNumber}
                                                    name="queinpment"
                                                    id="queinpment"
                                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-4"
                                                >
                                                    <option>
                                                        --Выбрать серийный
                                                        номер--
                                                    </option>
                                                    {dataQeuinoment.map(
                                                        (queinpment, ind) => {
                                                            return (
                                                                <option
                                                                    key={
                                                                        ind +
                                                                        "inser"
                                                                    }
                                                                >
                                                                    {
                                                                        queinpment?.serial_number
                                                                    }
                                                                </option>
                                                            );
                                                        }
                                                    )}
                                                </select>
                                            )}
                                        </div>
                                        <div>
                                            {checkSelectNumber &&
                                                checkSelectNumber.map(
                                                    (elem, i) => {
                                                        return (
                                                            <div
                                                                key={nanoid()}
                                                                className="flex flex-col bg-cyan-950 p-5 rounded-md text-white"
                                                            >
                                                                <div
                                                                    key={
                                                                        i +
                                                                        i * i
                                                                    }
                                                                >
                                                                    <div>
                                                                        <label className="text-base font-medium ">
                                                                            Тип:
                                                                        </label>
                                                                        {elem?.type_id &&
                                                                            typeQeuinpmentTS
                                                                                .filter(
                                                                                    (
                                                                                        el
                                                                                    ) => {
                                                                                        return (
                                                                                            el?.id_type ===
                                                                                            elem?.type_id
                                                                                        );
                                                                                    }
                                                                                )
                                                                                .map(
                                                                                    (
                                                                                        e,
                                                                                        index
                                                                                    ) => {
                                                                                        return (
                                                                                            <input
                                                                                                name="typeQeuinpment"
                                                                                                id="typeQeuinpment"
                                                                                                type="text"
                                                                                                key={
                                                                                                    index +
                                                                                                    "type"
                                                                                                }
                                                                                                className="font-normal  mb-2 bg-green-50 border border-green-500 text-green-900 dark:text-green-400 placeholder-green-700 dark:placeholder-green-500 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-green-500"
                                                                                                defaultValue={
                                                                                                    e.type
                                                                                                }
                                                                                            />
                                                                                        );
                                                                                    }
                                                                                )}
                                                                    </div>
                                                                    <div>
                                                                        <label className="text-base font-medium ">
                                                                            Модель:
                                                                        </label>

                                                                        {elem?.ts_name_id &&
                                                                            model
                                                                                .filter(
                                                                                    (
                                                                                        el
                                                                                    ) => {
                                                                                        return (
                                                                                            el?.id_naimenovanie ==
                                                                                            elem?.ts_name_id
                                                                                        );
                                                                                    }
                                                                                )
                                                                                .map(
                                                                                    (
                                                                                        e,
                                                                                        index
                                                                                    ) => {
                                                                                        return (
                                                                                            <input
                                                                                                key={
                                                                                                    index +
                                                                                                    "naimenovanie"
                                                                                                }
                                                                                                name="qeuinpmentName"
                                                                                                id="qeuinpmentName"
                                                                                                type="text"
                                                                                                className="font-normal  mb-2 bg-green-50 border border-green-500 text-green-900 dark:text-green-400 placeholder-green-700 dark:placeholder-green-500 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-green-500"
                                                                                                defaultValue={
                                                                                                    e.ts_naimenovanie
                                                                                                }
                                                                                            />
                                                                                        );
                                                                                    }
                                                                                )}
                                                                    </div>
                                                                    <div>
                                                                        <label className="text-base font-medium ">
                                                                            Серийный
                                                                            номер:
                                                                        </label>
                                                                        <input
                                                                            name="serial"
                                                                            id="serial"
                                                                            type="text"
                                                                            className="font-normal  mb-2 bg-green-50 border border-green-500 text-green-900 dark:text-green-400 placeholder-green-700 dark:placeholder-green-500 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-green-500"
                                                                            defaultValue={
                                                                                elem?.serial_number
                                                                            }
                                                                        />
                                                                    </div>
                                                                    <div>
                                                                        <label className="text-base font-medium ">
                                                                            Инвентарный
                                                                            номер:
                                                                        </label>
                                                                        <input
                                                                            name="inventar"
                                                                            id="inventar"
                                                                            type="text"
                                                                            className="font-normal  mb-2 bg-green-50 border border-green-500 text-green-900 dark:text-green-400 placeholder-green-700 dark:placeholder-green-500 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-green-500"
                                                                            defaultValue={
                                                                                elem?.inv_number
                                                                            }
                                                                        />
                                                                    </div>
                                                                    <div>
                                                                        <label className="text-base font-medium ">
                                                                            Цена:
                                                                        </label>
                                                                        <input
                                                                            name="price"
                                                                            id="price"
                                                                            type="text"
                                                                            className="font-normal  mb-2 bg-green-50 border border-green-500 text-green-900 dark:text-green-400 placeholder-green-700 dark:placeholder-green-500 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-green-500"
                                                                            defaultValue={
                                                                                elem?.price
                                                                            }
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        );
                                                    }
                                                )}
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div className="flex flex-row items-start">
                                <ButtonBlack
                                    subText="Отмена"
                                    type="button"
                                    click={() => setIsActiveSection(false)}
                                />
                                <ButtonBlack
                                    subText="Сброс"
                                    type="reset"
                                    click={resetForm}
                                />
                                <ButtonOrange
                                    subText="Сохранить"
                                    type="submit"
                                />
                            </div>
                        </div>
                        {/* <div class="flex">
                        <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-e-0 border-gray-300 rounded-s-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                            <svg
                                class="w-4 h-4 text-gray-500 dark:text-gray-400"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                            >
                                <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
                            </svg>
                        </span>
                        <input
                            type="text"
                            id="website-admin"
                            className="rounded-none rounded-e-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Bonnie Green"
                        />
                    </div> */}
                    </form>
                </section>
            )}
        </>
    );
};
