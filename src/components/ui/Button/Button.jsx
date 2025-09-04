export const ButtonBlack = ({ subText, click }) => {
    return (
        <>
            <button
                type="button"
                onClick={click}
                className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
            >
                {subText}
            </button>
            ;
        </>
    );
};

export const ButtonOrange = ({ subText, click }) => {
    return (
        <>
            <button
                type="button"
                onClick={click}
                className="text-white bg-amber-800 hover:bg-amber-600 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2  dark:bg-amber-800 dark:hover:bg-amber-600 dark:focus:ring-gray-400 dark:border-gray-700"
            >
                {subText}
            </button>
            ;
        </>
    );
};
