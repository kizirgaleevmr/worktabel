import * as yup from "yup";
// схема проверки
export const userSchema = yup
    .object()
    .shape({
        firstName: yup
            .string()
            .min(4, "мин 4 символа")
            .max(30, "макс 30 символов")
            .required("Введите имя"),
        lastName: yup
            .string()
            .min(4, "мин 4 символа")
            .max(30, "макс 30 символов")
            .required("Введите фамилию"),
        surname: yup
            .string()
            .min(4, "мин 4 символа")
            .max(30, "макс 30 символов")
            .required("Введите отчество"),
        birthday: yup.date().required("Выберите дату"),
        userDate: yup.date().required("Выберите дату"),
        tabelNumber: yup
            .string()
            .min(4, "мин 4 символа")
            .max(5, "макс 5 символов")
            .required("Введите табельный номер"),
        email: yup
            .string()
            .email("Invalid email address")
            .required("Email is required"),
        phone: yup.number().required("введите номер телефона"),
    })
    .required();
