const electronInstaller = require('electron-winstaller');
try {
  electronInstaller.createWindowsInstaller({
    appDirectory: '\budgie-file-manager',
    outputDirectory: '\budgie-file-manager/out',
    authors: 'HAKANKOKCU',
    exe: 'myapp.exe'
  });
  console.log('It worked!');
} catch (e) {
  console.log(`No dice: ${e.message}`);
}