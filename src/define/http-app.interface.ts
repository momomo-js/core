
import * as http from "http";
export interface HttpApp {
    (req: http.IncomingMessage, res: http.ServerResponse): any;
    request: http.IncomingMessage;
    response: http.ServerResponse;
}

/**
    * Created by yskun on 2017/7/5.
    * MoProject COPYRIGHT
    */
