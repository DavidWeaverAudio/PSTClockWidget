const { ipcRenderer } = require('electron');

let currentTimeZone = 'America/Los_Angeles'; 

function updateTime(timezone = currentTimeZone) {
    const time = new Date().toLocaleTimeString('en-US', {
        timeZone: currentTimeZone,
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    });
    document.getElementById('time').textContent = time;
    document.getElementById('timezone-label').textContent = timezone;
}
setInterval(() => updateTime(currentTimeZone), 1000); 

ipcRenderer.on('update-timezone', (event, timezone) => {
    currentTimeZone = timezone;
    updateTime(timezone);
});
