'use strict';
const { app, BrowserWindow, ipcMain, Menu } = require("electron");
const fs = require("fs");
const path = require('path');

const WhatsappRenderer = require("./classes/whatsapp-renderer");
const ExcelRenderer = require("./classes/excel-renderer");

let whatsappRenderer = new WhatsappRenderer();
let excelRenderer = new ExcelRenderer();
var win;

try {
    require('electron-reloader')(module)
} catch (_) {}

function createWindow() {
    win = new BrowserWindow({
        x: 1920 - 640,
        y: 200,
        width: 640,
        height: 480,
        webPreferences: {
            preload: path.join(app.getAppPath(), "preload.js"),
            nodeIntegration: false,
        }
    });
    Menu.setApplicationMenu(null);
    win.loadFile("loadFile.html");

}

app.whenReady().then(() => {
    createWindow();
    app.on('activate', function() {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    });
});

app.on("quit", () => {
    whatsappRenderer.dispose();
});

app.on("window-all-closed", () => {
    if (process.platform !== 'darwin') app.quit();
});

ipcMain.on("readXlsx", async(e, args) => {
    excelRenderer.openFile(win);
});

ipcMain.on("connectWhatsapp", async(e, args) => {
    await whatsappRenderer.connect();
    let sendFile = setInterval(async() => {
        if (excelRenderer.fileSelected) {
            clearInterval(sendFile);
            let _rows = excelRenderer.rows;
            for await (let row of _rows) {
                await whatsappRenderer.sendMessage(row[0], row[1]);
            }
        }
    }, 1000);

});

ipcMain.on("deleteFolder", async(err, args) => {
    whatsappRenderer.deleteInfos();
});