import { ButtonGroup, Button } from "@material-tailwind/react";
import { AddUserDialog } from "./ModalUser";
import { AllShowUsers } from "./AllShowUsers";
import React, { useState } from "react";

export function ButtonGroupColors({ title1, title2 }) {
    //для открытия модалки для добавления пользователя
    const [isOpen, setOpen] = React.useState(false);
    //состоние для показа компонента на странице с карточками
    const [isOpenUsers, setOpenUsers] = React.useState(true);

    const handleAddUsers = () => {
        setOpen(true);
    };
    //передаем состояние true для отображения компонента AllShowUsers
    const allShowUsers = () => {
        setOpenUsers(false);
    };
    return (
        <>
            <div className="flex w-max flex-col gap-4 mb-4">
                <ButtonGroup
                    color="green"
                    className="bg-green-500 text-white border-radius-3xl gap-x-6"
                >
                    <Button
                        className="hover:bg-sky-700 p-2 cursor-pointer"
                        onClick={handleAddUsers}
                    >
                        {title1}
                    </Button>
                </ButtonGroup>
            </div>
            <AddUserDialog
                open={isOpen}
                setOpen={setOpen}
                show={isOpenUsers}
                setShow={setOpenUsers}
            />
            <AllShowUsers show={isOpenUsers} setShow={setOpenUsers} />
        </>
    );
}
