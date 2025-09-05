//получаем все оборудование
export const fecthQeuinpment = async (property, value) => {
    try {
        const endpoint =
            property === "serial-number" ? "serial_number" : "inv_number";

        const response = await fetch(
            `http://localhost:4100/equipment?${endpoint}`
        );

        const data = await response.json();
        const filterResult = data.filter((item) => {
            return item[endpoint].includes(value);
        });
        return filterResult;
    } catch (error) {
        console.error("Произошла ошибка при выполнении запроса:", error);
    }
};
