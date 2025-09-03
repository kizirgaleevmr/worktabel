import { sub } from "date-fns";

/**
 *
 * @param {array} arrayCell - массив объектов с данными по ячейке
 * @param {array} arrayUsers - массив объектов с данными по ячейке
 */
export function countDayTime(
    arrayCell,
    dataDay,
    idUser,
    normaDay,
    totatlManthDay
) {
    //дата для расчета времени
    const totalTimeMonth = new Date(1970, 0, 1, 0, 0, 0);
    const resultTotalTimeMonth = new Date(1970, 0, 1, 0, 0, 0);
    //класс для сосздания объекти для статистике
    class totalData {
        constructor() {
            this.normaDay = 0;
            this.normTime = 0;
            this.totalDayMonth = 0;
            this.totalJobDay = 0;
            this.totalTime = new Date(1970, 0);
            this.jobOffDay = 0;
            this.bissnesTripDay = 0;
            this.dayOffBissnesTrip = 0;
            this.timeOff = 0;
            this.vacation = 0;
            this.hospital = 0;
            this.totalJobAndBissnesDay = 0;
        }
    }
    let resultObj = new totalData();

    //отбираем в массив по ид сотрудника
    const checkUserID = [];
    const checkUserDate = [];

    arrayCell.forEach((user) => {
        for (let elem in user) {
            if (user[elem] === idUser) {
                checkUserID.push(user);
            }
        }
    });
    //отбираем по подходящему месяцу
    checkUserID.forEach((checkDateMonth) => {
        for (let elem in checkDateMonth) {
            if ("cellDate" === elem) {
                const date = new Date(checkDateMonth[elem]);

                if (
                    date.getFullYear() === dataDay.getFullYear() &&
                    date.getMonth() === dataDay.getMonth()
                ) {
                    checkUserDate.push(checkDateMonth);
                }
            }
        }
    });
    // формируем объект с данными для вывода в статистике
    checkUserDate.forEach((el) => {
        for (let elem in el) {
            if (el[elem] === "К") {
                resultObj.bissnesTripDay += 1;
            }
            if (el[elem] === "КВ") {
                resultObj.dayOffBissnesTrip += 1;
            }
            if (el[elem] === "РД") {
                resultObj.totalJobDay += 1;
            }
            if (el[elem] === "РВ") {
                resultObj.jobOffDay += 1;
            }
            if (el[elem] === "Б") {
                resultObj.hospital += 1;
            }
            if (el[elem] === "Отпуск") {
                resultObj.vacation += 1;
            }
            if (el[elem] === "Отгул") {
                resultObj.timeOff += 1;
            }
            if (elem === "time") {
                const hours = Number(el[elem].substring(0, 2));
                const minutes = Number(el[elem].substring(3, 5));
                totalTimeMonth.setHours(totalTimeMonth.getHours() + hours);
                totalTimeMonth.setMinutes(
                    totalTimeMonth.getMinutes() + minutes
                );
            }
            // if (elem === "dayNorma") {
            //     resultObj.normaDay = el[elem];
            // }
        }
    });

    resultObj.normaDay = normaDay;
    resultObj.normTime = resultObj.normaDay * 8;
    resultObj.totalDayMonth = totatlManthDay.length;
    resultObj.totalTime = Math.ceil(
        (totalTimeMonth - resultTotalTimeMonth) / (60 * 60 * 1000)
    );
    resultObj.totalJobDay = Math.ceil(resultObj.totalTime / 8);
    resultObj.totalJobAndBissnesDay = Math.ceil(resultObj.totalTime / 8);

    // делаем объект с руским наименование
    const resultObjRuss = {
        "Норма дней": resultObj.normaDay,
        "Норма часов": resultObj.normTime,
        "Дней в месяце": resultObj.totalDayMonth,
        "Отработал дней": resultObj.totalJobAndBissnesDay,
        "Всего часов": resultObj.totalTime,
        "Работа в выходные": resultObj.jobOffDay,
        Командировка: resultObj.bissnesTripDay,
        "Командировка выходные": resultObj.dayOffBissnesTrip,
        Отгул: resultObj.timeOff,
        Отпуск: resultObj.vacation,
        Больничный: resultObj.hospital,
    };

    //Убираем с объекта свойства равное нулю
    const filterResultObjRuss = {};

    for (let item in resultObjRuss) {
        if (resultObjRuss[item] !== 0) {
            filterResultObjRuss[item] = resultObjRuss[item];
        }
    }
    //преобразуем объект в массив
    let dataArray = Object.entries(filterResultObjRuss).map((a) => {
        return `${a[0]} : ${a[1]}`;
    });

    return dataArray;
}

// cellDate;
// "2025-08-23"(string);
// cellID;
// "6BGPT4tDG5gxkwOT1C0j-2025-7-23"(string);
// dayNorma;
// "21"(string);
// jobStatus;
// "РВ"(string);
// time;
// "04:00"(string);
// timeNorma;
// 168(number);
// userID;
