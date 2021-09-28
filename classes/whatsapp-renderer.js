const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");
const _homedir = require('os').homedir();
const _settingsDir = _homedir + "\\.whatsappOtomasyonu\\";

class WhatsappRenderer {
    constructor() {
        this.connectionControl;
        this.browser;
        this.page;
        this.connected = false;
    }

    deleteInfos() {
        fs.readdir(_settingsDir, (err, files) => {
            if (err) throw err;

            for (const file of files) {
                fs.unlink(path.join(_settingsDir, file), err => {
                    if (err) throw err;
                });
            }
        });
    }

    async sendMessage(number, message) {
        if (!this.connected) {
            throw new Error("Baglanti yok");
        }
        let _newChatButtonSelector = "#side > header > div._3yZPA > div > span > div:nth-child(2) > div";
        let _typeSelector = "#main > footer > div._2BU3P.tm2tP.copyable-area > div > div > div._2lMWa > div.p3_M1 > div > div._13NKt.copyable-text.selectable-text";
        let promise = new Promise(async(resolve, reject) => {
            await this.page.click(_newChatButtonSelector, );
            await this.page.waitForSelector("._13NKt.copyable-text.selectable-text");
            await this.page.type("._13NKt.copyable-text.selectable-text", number.toString());
            await this.page.waitForTimeout(2000);
            await this.page.click("._2nY6U");
            await this.page.waitForSelector(_typeSelector);
            await this.page.type(_typeSelector, message);
            await this.page.waitForTimeout(2000);
            await this.page.click("._4sWnG");
            return resolve("");
        });
        let result = await promise;
        return result;
    }

    async connect() {
        this.browser = await puppeteer.launch({
            headless: false,
            userDataDir: _settingsDir,
        });

        this.page = await this.browser.newPage();

        await this.page.goto("https://web.whatsapp.com/", {
            waitUntil: "networkidle2",
        });

        let promise = new Promise((resolve, reject) => {
            this.connectionControl = setInterval(async() => {
                let _refreshButton = await this.page.$('._2znac');
                if (_refreshButton) {
                    this.page.click("._2znac");
                }

                let _pImg = await this.page.$("img._8hzr9.M0JmA.i0jNr");
                if (_pImg) {
                    clearInterval(this.connectionControl);
                    this.connected = true;
                    return resolve(this.page);
                }
            }, 1000);
        });

        this.page.on("close", () => {
            clearInterval(this.connectionControl);
        });

        let result = await promise;
        return result;
    }

    dispose() {
        clearInterval(this.connectionControl);
    }
}

module.exports = WhatsappRenderer;