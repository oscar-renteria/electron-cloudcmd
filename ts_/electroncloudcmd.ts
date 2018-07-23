
import { ChildProcess, fork, ForkOptions } from 'child_process';

export class ElectronCloudcmd
{
    public static stdout: (data: any) => void = null;
    public static stderr: (data: any) => void = null;

    private static _url: URL = null;
    public static get URL(): URL { return this._url; }

    private static _commanderProcess: ChildProcess
    public static get CommanderProcess(): ChildProcess 
    {
        return this._commanderProcess;
    }

    public static InitCommanderProcess(pathCommander: string, args?:Array<string>): void 
    {
        let self = this;
        if (this._commanderProcess != null) this._commanderProcess.kill();
        let frokOptions: ForkOptions = 
        {
            silent: true,
            cwd: pathCommander,
            env: 
            {
                ATOM_SHELL_INTERNAL_RUN_AS_NODE:0
            }
        };
        
        this._commanderProcess = fork('cloudcmd.js', args, frokOptions);
        this._commanderProcess.stdout.on('data', (data) => 
        { 
            // Parse url where the server has started:
            if (self._url == null) 
            {
                try 
                {
                    self._url = self.findURL(`${data}`);
                }
                catch (error) 
                {
                    if (this.stdout != null) this.stdout(error);     
                }    
            }            
             
            if (this.stdout != null) this.stdout(data); 
        });

        this._commanderProcess.stderr.on('data', (data) => { if (this.stderr != null) this.stderr(data); });
        this._commanderProcess.unref();
    }

    public static KillProcess(message?: string) : void 
    {
        this._url = null;
        this._commanderProcess.kill(message);
        this._commanderProcess.disconnect();
        this.stderr = null; this.stdout = null;
        this._commanderProcess.removeAllListeners();
    }

    private static findURL(data: string) : URL 
    {
        var exp = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
        var address = data.match(exp); 
        
        let nV: number = Number((process.version).split('.')[0].substr(1,1));
        if (nV <= 6) 
        {
            const url = require('url');
            return url.parse(address[0]);
            // https://nodejs.org/dist/latest-v6.x/docs/api/url.html#url_url
        }
        else 
        {
            const { URL } = require('url');
            return new URL(address[0]);
            //https://nodejs.org/dist/latest-v8.x/docs/api/url.html#url_url
        }
    }

}