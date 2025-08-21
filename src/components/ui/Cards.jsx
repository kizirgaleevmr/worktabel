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
    age,
    dolzhnost,
    phone,
    email,
    src,
    otdel,
    jobDate,
}) {
    return (
        <Card className="max-w-[38rem] flex-row text-left rounded-lg overflow-hidden mb-6">
            <CardHeader className="m-0 w-2/5 shrink-0 rounded-r-none">
                <img
                    src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80"
                    alt="card-image"
                    className="h-full w-full object-cover"
                />
            </CardHeader>
            <CardBody className="w-full">
                <Typography variant="small" color="gray" className="mb-2">
                    Отдел: {otdel}{" "}
                </Typography>
                <Typography variant="small" color="gray" className="mb-2">
                    Табельный №:
                </Typography>
                <Typography variant="h4" color="blue-gray" className="mb-2">
                    Фамилия: {lastName}
                </Typography>
                <Typography variant="h4" color="blue-gray" className="mb-2">
                    Фамилия: {lastName}
                </Typography>
                <Typography variant="h4" color="blue-gray" className="mb-4">
                    Фамилия: {lastName}
                </Typography>
                <div className="flex mb-4">
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
                        стаж: {jobDate}
                    </Typography>
                </div>
                <div className="text-left">
                    <div className="flex mb-8 flex-col">
                        <div className="flex items-center mb-4">
                            <span className="inline-block mr-3">
                                {icons.phone}
                            </span>
                            <a href={`tel: ${phone}`}>{phone}</a>
                        </div>
                        <div className="flex items-center">
                            <span className="inline-block mr-3">
                                {icons.email}
                            </span>
                            <a href={`mailto:${email}`}>{email}</a>
                        </div>
                    </div>
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
