import { ButtonGroup, Button } from "@material-tailwind/react";
import { AddUserDialog } from "./ModalUser";
import { AllShowUsers } from "./AllShowUsers";
import React from "react";

export function ButtonGroupColors({ title1, title2 }) {
    //для открытия модалки для добавления пользователя
    const [isOpen, setOpen] = React.useState(false);
    //для просмотра всх пользователей
    const [isOpenUsers, setOpenUsers] = React.useState(false);

    //
    const handleAddUsers = () => {
        setOpen(true); // Logic to handle adding a product
    };
    //
    const allShowUsers = () => {
        setOpenUsers(true); // Logic to handle adding a product
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
                    <Button
                        className="hover:bg-sky-700 p-2 cursor-pointer"
                        onClick={allShowUsers}
                    >
                        {title2}
                    </Button>
                </ButtonGroup>
            </div>
            <AddUserDialog open={isOpen} setOpen={setOpen} />
            <AllShowUsers show={isOpenUsers} setShow={setOpenUsers} />
        </>
    );
}
