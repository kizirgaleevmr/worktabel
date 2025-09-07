import { ButtonOrange } from "../components/ui/Button/Button";
export const ErrorPage = () => {
    return (
        <>
            <div>
                <h1 className="text-white text-9xl">Такой страницы нет!!!!</h1>
                <ButtonOrange subText="Назад" />
            </div>
        </>
    );
};
