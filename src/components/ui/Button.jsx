import { ButtonGroup, Button } from "@material-tailwind/react";
import { AddUserDialog } from "./ModalUser";
import React from "react";

export function ButtonGroupColors({ title1, title2, title3 }) {
    const [isOpen, setOpen] = React.useState(false);

    const handleAddProduct = () => {
        setOpen(true); // Logic to handle adding a product
    };

    return (
        <div className="flex w-max flex-col gap-4">
            <ButtonGroup
                color="green"
                className="bg-green-500 text-white border-radius-3xl"
            >
                <Button
                    className="hover:bg-sky-700 p-2 cursor-pointer"
                    onClick={handleAddProduct}
                >
                    {title1}
                </Button>
                <Button className="hover:bg-sky-700 p-2 cursor-pointer">
                    {title2}
                </Button>
            </ButtonGroup>
            <AddUserDialog open={isOpen} setOpen={setOpen} />
        </div>
    );
}
