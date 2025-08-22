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
    id,
}) {
    return (
        <Card className="w-[40rem] flex-row text-left rounded-lg overflow-hidden mb-6">
            <CardHeader
                className="m-0 w-2/5 shrink-0 rounded-r-none flex items-top justify-center mt-10 flex-col items-center"
                key={id}
            >
                <div className="border-2 border-gray-400 overflow-hidden h-50 w-50 rounded-full flex items-center mb-5">
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
                        <div className="flex items-center h-2">
                            <span className="inline-block mr-3">
                                {icons.email}
                            </span>
                            <a href={`mailto:${email}`}>{email}</a>
                        </div>
                    </div>
                </div>
            </CardHeader>
            <CardBody className="w-full">
                <Typography variant="small" color="gray" className="mb-2">
                    Отдел: {otdel}
                </Typography>
                <Typography variant="small" color="gray" className="mb-2">
                    Табельный №:
                </Typography>
                <Typography variant="h2" color="blue-gray" className="mb-2">
                    <p className="text-2xl"> {lastName}</p>
                </Typography>
                <Typography variant="h2" color="blue-gray" className="mb-2">
                    <p className="text-2xl">{firstName}</p>
                </Typography>
                <Typography variant="h2" color="blue-gray" className="mb-4">
                    <p className="text-2xl">{surname}</p>
                </Typography>
                <div className="flex mb-4 flex-col">
                    <Typography
                        variant="h2"
                        color="blue-gray"
                        className="mb-2 w-1/2"
                    >
                        Должность: {dolzhnost}
                    </Typography>
                    <Typography
                        variant="h2"
                        color="blue-gray"
                        className="mb-2 w-1/2"
                    >
                        Возраст: {birthday}
                    </Typography>
                    <Typography
                        variant="h2"
                        color="blue-gray"
                        className="mb-2 w-1/2"
                    >
                        Стаж: {workDate}
                    </Typography>
                </div>
                <div className="text-left">
                    <div className="flex justify-between">
                        <div className=" text-gray-400  flex items-center hover:text-cyan-500 cursor-pointer">
                            <span className="inline-block mr-2">
                                {icons.pencil}
                            </span>
                            <span>Редактировать</span>
                        </div>
                        <div className=" text-gray-400  flex items-center hover:text-rose-700 cursor-pointer">
                            <span className="inline-block mr-2">
                                {icons.trash}
                            </span>
                            <span>Удалить</span>
                        </div>
                    </div>
                </div>
            </CardBody>
        </Card>
    );
}
