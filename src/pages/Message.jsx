import { getTodos } from "../components/utils/getEqupment";
import React, { useEffect, useState } from "react";
import { FormAddMessage } from "../components/ui/Form/FormAddMessage";
import { fetchUsers } from "../components/config/firebase";
export const Message = () => {
    const [users, setUsers] = useState([]);
    const [user, setUser] = useState(null);

    React.useEffect(() => {
        (async () => {
            const response = await fetchUsers();
            setUsers(response);
        })();
    }, []);

    React.useEffect(() => {
        const filterUser = users.filter((e) => {
            return e.email === sessionStorage.getItem("email") ? { e } : null;
        });
        const [data] = [...filterUser];
        setUser({ lastName: data?.lastName, firstName: data?.firstName });
    }, [users]);

    return (
        <>
            <header>
                <section id="createMessage" className="mb-4 text-left">
                    <FormAddMessage title="Создать заявку" user={user} />
                </section>
                <section id="searchMessage" className="mb-4 text-left">
                    <h2 className="text-white">Поиск</h2>
                </section>
            </header>
            <main>
                <h3 className="text-left text-white">
                    ЗДесь будет таблица с заявками
                </h3>
            </main>
            {/* <MyComp /> */}
        </>
    );
};
