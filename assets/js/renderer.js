let btnOpenFile = document.querySelector("#btnOpenFile");
let btnConnectWhatsapp = document.querySelector("#btnConnectWhatsapp");
let btnDeleteFolder = document.querySelector("#btnDeleteFolder");
let fileInfo = document.querySelector("#fileInfo");

window.api.receive("fileInfo", (data) => {
    fileInfo.innerText = `Dosya adı: ${data.fileName}\n Dosya boyutu: ${data.fileSize} \n\n --Dosya İçeriği-- \n`;
    data.rows.forEach((row) => {
        fileInfo.innerText += row + "\n";
    });
});

btnDeleteFolder.addEventListener("click", (e) => {
    e.preventDefault();
    window.api.send("deleteFolder");
});

btnOpenFile.addEventListener("click", (e) => {
    e.preventDefault();
    window.api.send("readXlsx");
});

btnConnectWhatsapp.addEventListener("click", (e) => {
    e.preventDefault();
    window.api.send("connectWhatsapp");
});