import { contextBridge, ipcRenderer } from 'electron';

declare global {
  interface Window {
    Main: typeof api;
  }
}

const api = {
  on: <T>(channel: string, callback: (data: T) => void) => {
    ipcRenderer.on(channel, (_, data) => callback(data as T));
  }
};
contextBridge.exposeInMainWorld('Main', api);
