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

function hashCode(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        const character = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + character;
        hash = hash & hash; 
    }
    return hash;
}

function intToRGB(i) {
    const c = (i & 0x00FFFFFF).toString(16).toUpperCase();
    return "#" + "00000".substring(0, 6 - c.length) + c;
}

function updateBackground(cityName) {
    const hash = hashCode(cityName);
    const color1 = intToRGB(hash);
    const color2 = intToRGB(~hash); // Invert hash for second color
    
    const canvas = document.createElement('canvas');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const ctx = canvas.getContext('2d');
    
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, color1);
    gradient.addColorStop(1, color2);
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    const background = document.querySelector('.background');
    background.style.backgroundImage = `url(${canvas.toDataURL()})`;
    background.style.filter = 'blur(8px)'; 
}

setInterval(() => updateTime(currentTimeZone), 1000); 

ipcRenderer.on('update-timezone', (event, timezone) => {
    currentTimeZone = timezone;
    updateTime(timezone);
    const city = timezone.split('/').pop().replace('_', ' ');
    updateBackground(city);
});