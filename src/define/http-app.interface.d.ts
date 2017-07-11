/// <reference types="node" />
import * as http from "http";
export interface HttpApp {
    (req: http.IncomingMessage, res: http.ServerResponse): any;
    request: http.IncomingMessage;
    response: http.ServerResponse;
}
