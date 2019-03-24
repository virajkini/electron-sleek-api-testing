const { app, BrowserWindow, ipcMain } = require('electron');

let mainWindow;
let envWindow;
let questionsWindow;

function createWindow() {
  mainWindow = new BrowserWindow({ width: 1280, height: 720 })
  mainWindow.loadURL('http://localhost:3000')
  mainWindow.on('closed', () => {
    mainWindow = null;
    envWindow = null;
    questionsWindow = null;
  });
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
});

ipcMain.on('start-evaluation', (event, data) => {
  envWindow = new BrowserWindow({ width: 1280, height: 720, parent: mainWindow, backgroundColor: '#eee' });
  questionsWindow = new BrowserWindow({ width: 500, height: 720, parent: mainWindow, backgroundColor: '#eee' });

  envWindow.webContents.session.clearStorageData();

  if (data.sessionId) {
    envWindow.webContents.session.cookies.set({ url: 'https://www.flipkart.com', name: 'SN', value: data.sessionId }, () => {

    });
  }

  switch (data.env) {
    case 'FLIPKART': {
      envWindow.loadURL(`${data.landingUrl}?q=shoes`);
      break;
    }

    case 'AMAZON': {
      envWindow.loadURL(`${data.landingUrl}?field-keywords=shoes`);
    }
  }

  questionsWindow.loadURL(`http://localhost:3000/questionnaire/${data.id}`);
});

ipcMain.on('finish-evaluation', (event, data) => {

  mainWindow.webContents.send('evaluation-complete', {
    evaluationId: data.id,
    rating: data.rating,
  });

  envWindow.close();
  questionsWindow.close();

  envWindow = null;
  questionsWindow = null;
});
