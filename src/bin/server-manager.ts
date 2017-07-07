import * as http from "http";
import {State} from "../define/state.enum";
import {MoBasicServer} from "../define/mo-server.class";
import {HttpApp} from "../define/http-app.interface";
export class ServerManager extends MoBasicServer {


    server: http.Server;
    private _port: number;
    private _app: HttpApp = null;


    set port(port: number) {
        this._port = port;
    }

    get port() {
        this._state = State.onReady;
        return this._port;
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
        if (this._state < State.onReady) {
            throw new Error("server port have not set");
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

        this._state = State.onError;
        this.moServer.state = State.onError;

        // handle specific listen errors with friendly messages
        switch (err.code) {
            case 'EACCES':
                this.debug(this.port + ' requires elevated privileges');
                this.debug('start MoBasicServer failed');
                process.exit(1);
                break;
            case 'EADDRINUSE':
                this.debug(this.port + ' is already in use');
                this.debug('start MoBasicServer failed');
                process.exit(1);
                break;
            default:
                throw err;
        }

    }

    private OnListening() {
        this.debug('Listening on ' + this.port);
        this.debug("start http server finish");
        this._state = State.onRun;
        this.moServer.state = State.onRun;
    }

}

/**
 * Created by yskun on 2017/5/16.
 */
