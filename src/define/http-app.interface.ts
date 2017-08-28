import * as http from 'http';

export interface HttpApp {
    request: http.IncomingMessage;
    response: http.ServerResponse;

    (req: http.IncomingMessage, res: http.ServerResponse): any;
}

/**
 * Created by yskun on 2017/7/5.
 * MoProject COPYRIGHT
 */
