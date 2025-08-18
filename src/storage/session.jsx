export const startSession = (user) => {
    sessionStorage.setItem("email", user.email);
    sessionStorage.setItem("accessToken", user.accessToken);
    console.log(sessionStorage);
};

export const getSession = () => {
    return {
        email: sessionStorage.getItem("email"),
        accessToken: sessionStorage.getItem("accessToken"),
    };
};

export const endSession = () => {
    sessionStorage.clear();
};

export const isLoggedIn = () => {
    return getSession().accessToken;
};
