import {
    Card,
    CardHeader,
    CardBody,
    Typography,
} from "@material-tailwind/react";
import { icons } from "./icons";

export function HorizontalCard({
    firstName,
    lastName,
    surname,
    dolzhnost,
    phone,
    email,
    src,
    otdel,
    birthday,
    workDate,
    deletClickUsers,
    id,
    updateClickUsers,
    tabelNumber,
}) {
    return (
        <>
            <Card
                className="w-[38rem] flex-row text-left rounded-lg overflow-hidden mb-6 p-6"
                id={id}
            >
                <CardHeader className="m-0 w-2/5 shrink-0 rounded-r-none flex items-top justify-center mt-10 flex-col items-center">
                    <div className="border-2 border-gray-400 overflow-hidden h-40 w-40 rounded-full flex items-center mb-5">
                        <img
                            src={src}
                            alt="card-image"
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div>
                        <div className="flex mb-2 flex-col">
                            <div className="flex items-center mb-8 h-2 w-1/2">
                                <span className="inline-block mr-3">
                                    {icons.phone}
                                </span>
                                <a href={`tel: ${phone}`}>{phone}</a>
                            </div>
                            <div className="flex items-center h-2 mb-4">
                                <span className="inline-block mr-3">
                                    {icons.email}
                                </span>
                                <a href={`mailto:${email}`}>{email}</a>
                            </div>
                        </div>
                    </div>
                </CardHeader>
                <CardBody className="w-full">
                    <div className="flex text-left justify-between">
                        <Typography
                            variant="small"
                            color="gray"
                            className="mb-2"
                        >
                            Отдел: <span className="gray">{otdel}</span>
                        </Typography>
                        <Typography
                            variant="small"
                            color="gray"
                            className="mb-2"
                        >
                            Таб. №: <span className="gray">{tabelNumber}</span>
                        </Typography>
                    </div>
                    <div>
                        <Typography
                            variant="h2"
                            color="blue-gray"
                            className="mb-2"
                        >
                            <p className="gray"> {lastName}</p>
                        </Typography>
                    </div>
                    <div className="flex gap-2">
                        <Typography
                            variant="h2"
                            color="blue-gray"
                            className="mb-2"
                        >
                            <p className="gray">{firstName}</p>
                        </Typography>
                        <Typography
                            variant="h2"
                            color="blue-gray"
                            className="mb-4"
                        >
                            <p className="gray">{surname}</p>
                        </Typography>
                    </div>
                    <div></div>
                    <div className="flex mb-2 flex-row flex-wrap gap-2">
                        <Typography
                            variant="h2"
                            color="blue-gray"
                            className="w-1/2"
                        >
                            Должность:
                        </Typography>
                        <Typography className="w-1/2 gray">
                            {dolzhnost}
                        </Typography>
                        <Typography
                            variant="h2"
                            color="blue-gray"
                            className="w-1/2"
                        >
                            Возраст: {birthday}
                        </Typography>
                        <Typography
                            variant="h2"
                            color="blue-gray"
                            className="w-1/2"
                        >
                            Стаж: {workDate}
                        </Typography>
                    </div>
                    <div className="text-left">
                        <div className="flex justify-between">
                            <div
                                className=" text-gray-400  flex items-center hover:text-cyan-500 cursor-pointer"
                                onClick={updateClickUsers}
                            >
                                <span className="inline-block mr-2">
                                    {icons.pencil}
                                </span>
                                <span>Редактировать</span>
                            </div>
                            <div
                                className="text-gray-400  flex items-center hover:text-rose-700 cursor-pointer"
                                onClick={deletClickUsers}
                            >
                                <span className="inline-block mr-2">
                                    {icons.trash}
                                </span>
                                <span>Удалить</span>
                            </div>
                        </div>
                    </div>
                </CardBody>
            </Card>
        </>
    );
}
