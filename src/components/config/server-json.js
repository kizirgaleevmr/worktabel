//получаем все оборудование
export const fecthQeuinpment = async (property, value) => {
    const controller = new AbortController();
    const signal = controller.signal
    
    try {
        const endpoint =
            property === "serial-number" ? "serial_number" : "inv_number";

        const response = await fetch(
            `http://localhost:4200/equipment?${endpoint}`,{signal}
        );

        const data = await response.json();
        const filterResult = data.filter((item) => {
            return item[endpoint].includes(value);
        });
        return filterResult;
    } catch (error) {
        console.error("Произошла ошибка при выполнении запроса:", error);
    }

    setTimeout(()=>controller.abort(), 2000)
};


//Сохраняем заявки
export const saveToQueipmentDB = async (obj) => {
    const controller = new AbortController();
    const signal = controller.signal
    const jsonString = JSON.stringify(obj);
    fetch("http://localhost:4200/zayavki", {
        signal,
        method: "POST", // или 'PUT' для обновления существующих данных
        headers: {
            "Content-Type": "application/json",
        },
        body: jsonString, // Отправляем строку JSON
    })
        .then((response) => response.json())
        .then((data) => console.log("Данные успешно отправлены:", data))
        .catch((error) => console.error("Ошибка при отправке данных:", error));

        setTimeout(()=>controller.abort(), 2000)
};
