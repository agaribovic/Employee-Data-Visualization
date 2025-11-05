import { join } from 'path';
import { BrowserWindow, app, nativeTheme } from 'electron';
import isDev from 'electron-is-dev';

const height = 600;
const width = 800;

function createWindow() {
  const window = new BrowserWindow({
    width,
    height,
    show: true,
    resizable: true,
    fullscreenable: true,
    webPreferences: {
      preload: join(__dirname, 'preload.js')
    }
  });

  if (isDev) {
    const port = process.env.PORT || 3000;
    window.loadURL(`http://localhost:${port}`);
    window.webContents.openDevTools();
  } else {
    window.loadFile(join(__dirname, '../dist-vite/index.html'));
  }

  nativeTheme.themeSource = 'dark';
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
