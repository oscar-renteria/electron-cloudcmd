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
                let args = ['--progress', '--no-contact', '--no-online', '--port', port];
                ElectronCloudcmd.stderr = (error) => 
                { 
                    ElectronCloudcmd.KillProcess('SIGINT');
                    done(error); 
                }
                ElectronCloudcmd.stdout = (data) => 
                { 
                    let p = ElectronCloudcmd.URL.port;
                    chai.assert.equal(`${data}`, `url: http://localhost:${p}/\n`)
                    ElectronCloudcmd.KillProcess('SIGINT');
                    done();
                };

                let pathCommander = path.join(__dirname, '../node_modules/cloudcmd/bin');
                ElectronCloudcmd.InitCommanderProcess(pathCommander, args);
            });

            it('should should start cloudcmd on a random port', (done) => 
            {

                let args = ['--progress', '--no-contact', '--no-online', '--port', '0'];
                ElectronCloudcmd.stderr = (error) => 
                { 
                    ElectronCloudcmd.KillProcess('SIGINT');
                    done(error); 
                }
                ElectronCloudcmd.stdout = (data) => 
                { 
                    let p = ElectronCloudcmd.URL.port;
                    chai.assert.equal(`${data}`, `url: http://localhost:${p}/\n`)
                    
                    ElectronCloudcmd.KillProcess('SIGINT');
                    done();
                };

                let pathCommander = path.join(__dirname, '../node_modules/cloudcmd/bin');
                ElectronCloudcmd.InitCommanderProcess(pathCommander, args);

            });
        });
    }
}

ElectronCloudcmdTest.Run();

