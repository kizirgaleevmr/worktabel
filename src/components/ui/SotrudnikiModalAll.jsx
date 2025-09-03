import { ButtonGroup, Button } from "@material-tailwind/react";
import { AddUserDialog } from "./ModalUser";
import { AllShowUsers } from "./AllShowUsers";
import React from "react";

export function ButtonGroupColors({ title1 }) {
    //для открытия модалки для добавления пользователя
    const [isOpen, setOpen] = React.useState(false);
    //состоние для показа компонента на странице с карточками
    const [isOpenUsers, setOpenUsers] = React.useState(true);

    const handleAddUsers = () => {
        setOpen(true);
    };
    return (
        <>
            <div className="flex w-max flex-col gap-4 mb-4">
                <ButtonGroup color="green">
                    <Button
                        className="text-white focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2  dark:bg-amber-800 dark:hover:bg-amber-600 bg-amber-800 hover:bg-amber-600 dark:focus:ring-gray-700 dark:border-gray-700"
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
