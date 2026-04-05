const { app, BrowserWindow, protocol } = require('electron');
const path = require('path');

let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 1200,
        height: 800,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    });

    mainWindow.loadFile(path.join(__dirname, '../index.html'));
    mainWindow.on('closed', () => mainWindow = null);
}

app.on('ready', () => {
    protocol.registerFileProtocol('trilium', (request, callback) => {
        const url = request.url.replace('trilium://', '');
        console.log('Abrindo nota:', url);
        callback(path.join(__dirname, '../index.html')); // ou lógica para abrir a nota específica
    });
    createWindow();
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
    if (mainWindow === null) createWindow();
});

