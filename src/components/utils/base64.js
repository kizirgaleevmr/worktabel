export const base64Coding = (image) => {
    const file = image.files[0];
    const reader = new FileReader();
    let p = "";
    reader.addEventListener("load", () => {
        const base = reader.result;
        const image = document.getElementById("pasteImg");
        const img = document.createElement("img");
        image.textContent = "";
        img.src = `${base}`;
        img.alt = "photo";
        image.append(img);
        return (p = reader.result);
    });
    reader.readAsDataURL(file);
};
