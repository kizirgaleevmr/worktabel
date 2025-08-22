//расчет стажа
export function getDateWorker(dateObject, dataEnd = null) {
    const today = new Date();
    dataEnd = dataEnd || new Date();
    // дата которую мы получаем с БД
    let dateWorker = new Date(dateObject);
    // находим разность текущего года и года из даты которую получили
    let year = dataEnd.getFullYear() - dateWorker.getFullYear();
    // находим разность текущего месяца и месяца из даты которую получили
    let month = dataEnd.getMonth() - dateWorker.getMonth();
    // проверем: если месяц меньше 0 или (равен 0 и дата начала работ меньше даты окончания работ)
    if (month < 0 || (month === 0 && today.getDate() < dateWorker.getDate())) {
        year--;
    }
    return year;
}
//Расчет возраста
export function ageUser(birthday) {
    let now = new Date(); //Текущя дата
    let today = new Date(now.getFullYear(), now.getMonth(), now.getDate()); //Текущя дата без времени
    let dob = new Date(birthday); //Дата рождения
    let dobnow = new Date(today.getFullYear(), dob.getMonth(), dob.getDate()); //ДР в текущем году
    let age; //Возраст

    //Возраст = текущий год - год рождения
    age = today.getFullYear() - dob.getFullYear();
    //Если ДР в этом году ещё предстоит, то вычитаем из age один год
    if (today < dobnow) {
        age = age - 1;
    }
    return age;
}
