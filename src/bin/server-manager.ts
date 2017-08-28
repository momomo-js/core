import * as http from 'http';
import {State} from '../define/state.enum';
import {MoBasicServer} from '../define/mo-server.class';
import {HttpApp} from '../define/http-app.interface';

export class ServerManager extends MoBasicServer {
    server: http.Server;
    public port: number;
    private _app: HttpApp;

    constructor() {
        super();
    }

    set app(app: HttpApp) {
        this._app = app;
    }

    start(): void {
        this.server.listen(
            this.port
        );

    }

    init(): void {
        if (!this.port) {
            throw new Error('server port have not set');
        }

        this.server = http.createServer(
            this._app
        );

        this.server.on('error', (err => {
            this.OnError(err);
        }));
        this.server.on('listening', () => {
            this.OnListening();
        });
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
