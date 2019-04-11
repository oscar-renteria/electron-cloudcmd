# Electron Cloud Commander

Forks a [cloudcmd](https://www.npmjs.com/package/cloudcmd) server from a node or [Electron](https://github.com/atom/electron) main process.

### Build and test

```
  Build -->  gulp build / npm run build
  Test  -->  npm test

```
### Use it in your project

```typescript
  let port = 0; // Get a free port from the OS
  let ElectronCloudcmd = require('electron-cloudcmd/js').ElectronCloudcmd;
  let args = ['--progress', '--no-contact', '--no-online', '--port', port.toString()];

  ElectronCloudcmd.stdout = (data) => { this.createNotification('File Server', `${data}`); };
  ElectronCloudcmd.stderr = (data) => { this.createNotification('File Server', `Error : ${data}`); };
  ElectronCloudcmd.InitCommanderProcess(args, (err, url) => 
  {
      if (err) console.log(`Error :\n${err}`);
      else     console.log(`Url :\n${url}`);
  });
```