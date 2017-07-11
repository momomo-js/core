/// <reference types="node" />
import * as http from "http";
import { MoBasicServer } from "../define/mo-server.class";
import { HttpApp } from "../define/http-app.interface";
export declare class ServerManager extends MoBasicServer {
    server: http.Server;
    private _port;
    private _app;
    port: number;
    app: HttpApp;
    start(): void;
    init(): void;
    private OnError(err);
    private OnListening();
}
