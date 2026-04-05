const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
    onOpenNote: (callback) => ipcRenderer.on('open-note', (event, noteId) => callback(noteId)),
    displayNote: (noteId) => ipcRenderer.send('open-note', noteId)
});
