const fs = require("fs");
const path = require('path');

const readXlsxFile = require('read-excel-file/node');

const { formatBytes, showExcelDialog } = require("./helper");

class ExcelRenderer {
    constructor() {
        this.fileSelected = false;
        this.file;
        this.filePath;
        this.rows;
    }

    async openFile(win) {
        this.file = await showExcelDialog(win);

        if (this.file.canceled) {
            this.fileSelected = false;
            return false;
        }

        this.filePath = this.file.filePaths[0];

        await readXlsxFile(fs.createReadStream(this.filePath)).then((rows) => {
            this.rows = rows;
            this.fileSelected = true;

            let _stats = fs.statSync(this.filePath);
            win.webContents.send("fileInfo", {
                fileName: path.basename(this.filePath),
                fileSize: formatBytes(_stats.size),
                rows: rows,
            });
        });
    }
}

module.exports = ExcelRenderer;