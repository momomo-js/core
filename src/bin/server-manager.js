"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http = require("http");
const state_enum_1 = require("../define/state.enum");
const mo_server_class_1 = require("../define/mo-server.class");
class ServerManager extends mo_server_class_1.MoBasicServer {
    constructor() {
        super(...arguments);
        this._app = null;
    }
    set port(port) {
        this._port = port;
    }
    get port() {
        this._state = state_enum_1.State.onReady;
        return this._port;
    }
    set app(app) {
        this._app = app;
    }
    start() {
        this.server.listen(this.port);
    }
    init() {
        if (this._state < state_enum_1.State.onReady) {
            throw new Error("server port have not set");
        }
        this.server = http.createServer(this._app);
        this.server.on('error', (err => {
            this.OnError(err);
        }));
        this.server.on('listening', () => {
            this.OnListening();
        });
    }
    OnError(err) {
        if (err.syscall !== 'listen') {
            throw err;
        }
        this._state = state_enum_1.State.onError;
        this.moServer.state = state_enum_1.State.onError;
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
    OnListening() {
        this.debug('Listening on ' + this.port);
        this.debug("start http server finish");
        this._state = state_enum_1.State.onRun;
        this.moServer.state = state_enum_1.State.onRun;
    }
}
exports.ServerManager = ServerManager;
//# sourceMappingURL=server-manager.js.map