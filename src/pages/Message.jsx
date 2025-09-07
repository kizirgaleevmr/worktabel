import React, { useEffect, useState } from "react";
import { FormAddMessage } from "../components/ui/Form/FormAddMessage";
import { fetchUsers } from "../components/config/firebase";
import { Table } from "../components/ui/Table/Table";

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
        <div className="">
            <header className="mb-6">
                <section id="createMessage" className="mb-4 text-left">
                    <FormAddMessage title="Создать заявку" user={user} />
                </section>
                <section id="searchMessage" className="mb-4 text-left">
                    <h2 className="text-white">Поиск</h2>
                </section>
            </header>
            <main>
                <h3 className="text-left text-white mb-6">
                    ЗДесь будет таблица с заявками
                </h3>
                <Table />
                <hr />
                <p className="text-white text-3xl">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Dolorum vero suscipit dignissimos harum illo. Repellat eos
                    praesentium iusto rerum, in saepe inventore laudantium,
                    fugit, necessitatibus nulla accusamus esse omnis expedita!
                </p>
            </main>
            {/* <MyComp /> */}
        </div>
    );
};
