import React, { useEffect, useState } from "react";
import { FormAddMessage } from "../components/ui/Form/FormAddMessage";
import { fetchUsers } from "../components/config/firebase";
import { Table } from "../components/ui/Table/Table";
import { fetchZayavki } from "../components/config/firebase";


export const Message = () => {
    const [users, setUsers] = useState([]);
    const [user, setUser] = useState(null);
    //сосотяние после удаления данных
    const [isDalete, setIsDelete] = useState(false)
    //состояние полсе сохранения заявок
    const [saveIsZayavki, setSaveIsZayavki] = useState(false);

    const [dataZayavki, setDataZayavki] = useState([]);

    const [countZayavki, setCountZayavki] = useState(0);

    React.useEffect(() => {
        (async () => {
            const response = await fetchUsers();
            setUsers(response);
        })();

        //Получаем все заявки
        const getAllZayzvki = async () => {
            const response = await fetchZayavki();
            //сохраняем все заявки в состоянии
            setDataZayavki(response);
            setCountZayavki(1 + response.length);
        };
        getAllZayzvki();
    }, []);

//Хук получеат все заявки
    React.useEffect(() => {
        //Получаем все заявки
        const getAllZayzvki = async () => {
            const response = await fetchZayavki();
            //сохраняем все заявки в состоянии
            setDataZayavki(response);
            setCountZayavki(1 + response.length);
        };
        getAllZayzvki();

    }, [saveIsZayavki,isDalete]);

//достаем пользователя для отображения
    React.useEffect(() => {
        const filterUser = users.filter((e) => {
            return e.email === sessionStorage.getItem("email") ? { e } : null;
        });
        const [data] = [...filterUser];
        setUser({ lastName: data?.lastName, firstName: data?.firstName });
    }, [users]);

    return (
        <div className="h-screen relative">
            <header className="mb-6 absolute z-101 left-90 top-6 text-left text-amber-800">
                {/* <section id="createMessage" className="mb-4 text-left"> */}
                <FormAddMessage
                    title="Создать заявку"
                    user={user}
                    setSaveIsZayavki={setSaveIsZayavki}
                    saveIsZayavki={saveIsZayavki}
                    countZayavki={countZayavki}
                />
                {/* </section> */}
            </header>
            <main>
                <Table data={dataZayavki} isDalete={isDalete} setIsDelete={setIsDelete}/>
            </main>
        </div>
    );
};
