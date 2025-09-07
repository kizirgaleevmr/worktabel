// Адрес нашего сервера
const SERVER_URL = "http://localhost:4100/equipment";

// Она принимает строку запроса и адрес сервера
export async function getTodos(query, endpoint = SERVER_URL) {
    try {
        // Определяем наличие строки запроса
        query ? (query = `?${query}`) : (query = "");

        const response = await fetch(`${endpoint}${query}`);

        if (!response.ok) throw new Error(response.statusText);

        const json = await response.json();

        return json;
    } catch (err) {
        console.error(err.message || err);
    }
}
