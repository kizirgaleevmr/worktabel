/**
 * Преобразует данные формы (объект) в сериализуемый вид.
 * Исключает невалидные для Firestore поля.
 * @param {Object} form - Объект формы
 */
export function serializeProduct(form) {
    const { name, price, description, category, rating, imgSrc } = form;
    return {
        name,
        price: Number.parseInt(price, 10),
        description,
        category,
        rating: Number.parseInt(rating, 10),
        imgSrc,
    };
}
