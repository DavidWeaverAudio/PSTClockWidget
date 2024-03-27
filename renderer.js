const { ipcRenderer } = require('electron');

let currentTimeZone = 'America/Los_Angeles'; 

function updateTime() {
    const time = new Date().toLocaleTimeString('en-US', {
        timeZone: currentTimeZone,
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    });
    document.getElementById('time').textContent = time;
}
setInterval(updateTime, 1000); 

ipcRenderer.on('update-timezone', (event, timezone) => {
    currentTimeZone = timezone;
    updateTime(); 
});
