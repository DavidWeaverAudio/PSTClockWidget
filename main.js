const { app, BrowserWindow, Menu, MenuItem, ipcMain } = require('electron');

let win;

function createWindow() {
    win = new BrowserWindow({
        width: 300, 
        height: 100, 
        frame: false,
        transparent: true,
        alwaysOnTop: true,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    });

    win.loadFile('index.html');
    win.setMenu(null); 
}

app.whenReady().then(createWindow);
app.on('browser-window-created', (event, win) => {
    const contextMenu = Menu.buildFromTemplate([
        {
            label: 'Timezones',
            submenu: getListOfTimeZones().map((timezone) => {
                return {
                    label: timezone,
                    click: () => win.webContents.send('update-timezone', timezone)
                };
            })

        },
    ]);

    win.webContents.on('context-menu', (e, params) => {
        contextMenu.popup(win, params.x, params.y);
    });
});

function getListOfTimeZones() {
    return ["America/Los_Angeles", "America/Vancouver", "Europe/London", "Asia/Tokyo", "Australia/Melbourne"];
}
