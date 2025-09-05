import React, { useState } from "react";
import { region, KSA } from "../../../BD/data";
import { ButtonBlack } from "../Button/Button";
import { icons } from "../icons";
import { fecthQeuinpment } from "../../config/server-json";
import { tsModel, typeQeuinpment } from "../../../BD/data";
export const FormAddMessage = ({ children, title, user }) => {
    const [reg] = useState(region);
    const [ksa] = useState(KSA.KSA);
    const [model] = useState(tsModel.ts_name);
    const [typeQeuinpmentTS] = useState(typeQeuinpment.type);
    const [selectReg, setSelectReg] = useState("");
    const [selectKsa, setSelectKsa] = useState("");
    const [selectNumber, setSelectNumber] = useState(undefined);
    const [checkSelectNumber, setCheckSelectNumber] = useState(null);
    const [adress, setAdress] = useState(null);
    const [regId, setRegId] = useState(null);
    const [checkSelectKsa, setCheckSelectKsa] = useState([]);
    const [isActiveSection, setIsActiveSection] = useState(false);
    const [searchProperty, setSearchProperty] = useState("");
    const [valueNumber, setValueNUmber] = useState("");

    const [nameQeuinpment, setNameQeuinpment] = useState([]);
    //оборудование
    const [dataQeuinoment, setDataQeuinpment] = useState([]);

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
    function changeSerialAndInvent(e) {
        const searchValue = e.target.value;
        if ("serial-number" === e.target.name) {
            setSearchProperty(e.target.name);
            setValueNUmber(searchValue);
        }
        if ("inventarniy-number" === e.target.name) {
            setSearchProperty(e.target.name);
            setValueNUmber(searchValue);
        }
    }

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

    return (
        <>
            <button
                onClick={() => {
                    setIsActiveSection(true);
                }}
                type="button"
                className="hover:text-amber-600 cursor-pointer mb-4 text-white"
            >
                {icons["document-plus"]}
            </button>
            {isActiveSection && (
                <section className="w-full mb-4 text-left bg-white px-6 py-5 transition-all duration-300 ease-in-out">
                    <form className="max-w-full">
                        <div className="mb-5 flex gap-8">
                            <div>
                                {user && (
                                    <>
                                        <p className="mb-2 text-base font-medium text-gray-900">
                                            Пользователь:
                                        </p>
                                        <p className="mt-2 text-lg font-medium text-green-800 dark:text-green-800">
                                            <span className="">
                                                {user?.lastName}{" "}
                                                {user?.firstName}
                                            </span>
                                        </p>
                                    </>
                                )}
                            </div>
                            <div>
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
                                                        placeholder=" "
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
                                            </>
                                        )}
                                    </>
                                )}
                            </div>
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
                                                id="ksqueinpment"
                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-4"
                                            >
                                                <option value="">
                                                    --Выбрать серийный номер--
                                                </option>
                                                {dataQeuinoment.map(
                                                    (queinpment, ind) => {
                                                        return (
                                                            <option key={ind}>
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
                                            checkSelectNumber.map((elem, i) => {
                                                return (
                                                    <>
                                                        <div
                                                            key={
                                                                i +
                                                                new Date().getFullYear()
                                                            }
                                                            className="flex flex-col bg-cyan-950 p-5 rounded-md text-white"
                                                        >
                                                            <div
                                                                key={i + i * i}
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
                                                                                        <p
                                                                                            key={
                                                                                                index +
                                                                                                "type"
                                                                                            }
                                                                                            className="text-sm font-normal  mb-2"
                                                                                        >
                                                                                            {
                                                                                                e.type
                                                                                            }
                                                                                        </p>
                                                                                    );
                                                                                }
                                                                            )}
                                                                </div>
                                                                <div>
                                                                    <label className="text-base font-medium ">
                                                                        Модель:
                                                                    </label>
                                                                    {elem?.ts_naimenovanie_id &&
                                                                        model
                                                                            .filter(
                                                                                (
                                                                                    el
                                                                                ) => {
                                                                                    return (
                                                                                        el?.id_naimenovanie ===
                                                                                        elem?.ts_naimenovanie_id
                                                                                    );
                                                                                }
                                                                            )
                                                                            .map(
                                                                                (
                                                                                    e,
                                                                                    index
                                                                                ) => {
                                                                                    return (
                                                                                        <p
                                                                                            key={
                                                                                                index *
                                                                                                3
                                                                                            }
                                                                                            className="text-sm font-normal  mb-2"
                                                                                        >
                                                                                            {
                                                                                                e.ts_naimenovanie
                                                                                            }
                                                                                        </p>
                                                                                    );
                                                                                }
                                                                            )}
                                                                </div>
                                                                <div>
                                                                    <label className="text-base font-medium ">
                                                                        Серийный
                                                                        номер:
                                                                    </label>
                                                                    <p className="text-sm font-normal  mb-2">
                                                                        {
                                                                            elem?.serial_number
                                                                        }
                                                                    </p>
                                                                </div>

                                                                <div>
                                                                    <label className="text-base font-medium ">
                                                                        Инвентарный
                                                                        номер:
                                                                    </label>
                                                                    <p className="text-sm font-normal  mb-2">
                                                                        {
                                                                            elem?.inv_number
                                                                        }
                                                                    </p>
                                                                </div>
                                                                <div>
                                                                    <label className="text-base font-medium ">
                                                                        Цена:
                                                                    </label>
                                                                    <p className="text-sm font-normal mb-2">
                                                                        {
                                                                            elem?.price
                                                                        }{" "}
                                                                        руб.
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </>
                                                );
                                            })}
                                    </div>
                                </div>
                            )}
                            {/* <label
                            htmlFor="username-success"
                            className="block mb-2 text-sm font-medium text-green-700 dark:text-green-500"
                        >
                            Your name
                        </label>
                        <input
                            type="text"
                            id="username-success"
                            className="bg-green-50 border border-green-500 text-green-900 dark:text-green-400 placeholder-green-700 dark:placeholder-green-500 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-green-500"
                            placeholder="Bonnie Green"
                        />
                        <p className="mt-2 text-sm text-green-600 dark:text-green-500">
                            <span className="font-medium">Alright!</span>{" "}
                            Username available!
                        </p> */}
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
                        <div className="flex flex-col w-1/12">
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
                        </div>
                    </form>
                </section>
            )}
        </>
    );
};
