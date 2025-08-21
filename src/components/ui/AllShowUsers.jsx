import { Button } from "@material-tailwind/react";
import { HorizontalCard } from "./Cards";

export const AllShowUsers = ({ show = "true", setShow, data }) => {
    const firstName = "bob",
        lastName = "ggg",
        surname = "wew",
        phone = "8-996-256-63-13",
        dolzhnost = "rrrr",
        otdel = "ДКИС",
        email = "mkr@mail.ru",
        jobDate = "12213213";
    const Cards = () => {
        if (data) {
            console.log(data);
            return (
                <>
                    {data.map(
                        ({
                            id,
                            otdel,
                            firstName,
                            lastName,
                            surname,
                            phone,
                            email,
                            dolzhnost,
                        }) => {
                            return (
                                <HorizontalCard
                                    otdel={otdel}
                                    firstName={firstName}
                                    lastName={lastName}
                                    surname={surname}
                                    phone={phone}
                                    dolzhnost={dolzhnost}
                                    email={email}
                                    jobDate={jobDate}
                                />
                            );
                        }
                    )}
                </>
            );
        }
    };

    return (
        <div className={` ${show ? "active__show_users" : "none__show_users"}`}>
            <section className="content__users flex flex-row gap-8 flex-wrap">
                <Cards />
            </section>
            <Button
                variant="outlined"
                className="bg-emerald-500 p-2 text-white border-0"
                onClick={() => {
                    setShow(false);
                }}
            >
                Закрыть
            </Button>
        </div>
    );
};
