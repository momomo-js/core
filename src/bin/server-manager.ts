import * as http from 'http';
import {HttpApp} from '../define/http-app.interface';
import {Mo} from '../define/mo.class';
import {MoApplicationCycleLife} from '../define/mo-cycle-life.interface';

export class ServerManager extends Mo implements MoApplicationCycleLife {
    server: http.Server;
    public port: number;
    public host: string;
    public app: HttpApp;

    constructor() {
        super();
    }

    onInit() {
        this.server = http.createServer(
            this.app
        );

        this.server.on('error', (err => {
            this.OnError(err);
        }));
        this.server.on('listening', () => {
            this.OnListening();
        });
    }

    onStart() {
        if (!this.port) {
            throw new Error('server port have not set');
        }

        if (!this.host) {
            throw new Error('server host have not set');
        }

        this.server.listen(
            this.port,
            this.host
        );
    }

    onStop() {
        if (this.server) {
            this.server.close();
        }
    }

    private OnError(err) {
        if (err.syscall !== 'listen') {
            throw err;
        }

        // handle specific listen errors with friendly messages
        switch (err.code) {
            case 'EACCES':
                this.debug(`${this.port} requires elevated privileges`);
                break;
            case 'EADDRINUSE':
                this.debug(`${this.port} is already in use`);
                break;
            default:
                throw err;
        }
        this.debug(`start MoBasicServer failed`);
        process.exit(1);
    }

    private OnListening() {
        this.debug(`Listening on ${this.port}`);
        this.debug('start http server finish');
    }

}

/**
 * Created by yskun on 2017/5/16.
 * MoProject COPYRIGHT
 */
