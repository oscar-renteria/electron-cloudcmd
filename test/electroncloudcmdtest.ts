import * as path from 'path';
import * as chai from 'chai';
import * as mocha from 'mocha';
import { ElectronCloudcmd } from '../ts_/electroncloudcmd'

export default class ElectronCloudcmdTest 
{
    static Run(): void 
    {
        describe('Electron Cloud Commander Process', () => 
        {
            let port = '5000';
            it(`should start the cloudcmd on port ${port}`, (done) => 
            {
                ElectronCloudcmd.stderr = (error) => 
                { 
                    ElectronCloudcmd.KillProcess('SIGINT');
                    done(error); 
                }

                let args = ['--progress', '--no-contact', '--no-online', '--port', port];
                let pathCommander = path.join(__dirname, '../node_modules/cloudcmd/bin');
                ElectronCloudcmd.InitCommanderProcess(pathCommander, args, (err, url) => 
                {
                    if (err != null) done(err);

                    let p = ElectronCloudcmd.URL.port;
                    chai.assert.equal(`${url.host}`, `localhost:${p}`)
                    
                    ElectronCloudcmd.KillProcess('SIGINT');
                    done();
                });
            });

            it('should should start cloudcmd on a random port', (done) => 
            {
                ElectronCloudcmd.stderr = (error) => 
                { 
                    ElectronCloudcmd.KillProcess('SIGINT');
                    done(error); 
                }
             
                let args = ['--progress', '--no-contact', '--no-online', '--port', '0'];
                let pathCommander = path.join(__dirname, '../node_modules/cloudcmd/bin');
                ElectronCloudcmd.InitCommanderProcess(pathCommander, args, (err, url) => 
                {
                    if (err != null) done(err);

                    let p = ElectronCloudcmd.URL.port;
                    chai.assert.equal(`${url.host}`, `localhost:${p}`)
                    
                    ElectronCloudcmd.KillProcess('SIGINT');
                    done();
                });

            });
        });
    }
}

ElectronCloudcmdTest.Run();

