export const base64Coding = async (image, onSuccess) => {
    const file = image.files[0];
    const reader = new FileReader();
    reader.addEventListener("load", () => {
        const base = reader.result;
        const image = document.getElementById("pasteImg");
        const img = document.createElement("img");
        image.textContent = "";
        img.src = `${base}`;
        img.alt = "photo";
        img.id = "imageBase";
        image.insertAdjacentHTML("afterbegin", "<h3>Фото</h3>");
        image.append(img);

        reader.onloadend = function () {
            // console.log(reader.result);
            // return reader.result;
        };
    });
    reader.readAsDataURL(file);
};
