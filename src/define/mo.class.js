"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Mo {
    get debug() {
        if (this._debug) {
            this._debug.namespace = this.instance + ": MoServer";
            return this._debug;
        }
    }
    set debug(debug) {
        this._debug = debug;
    }
    constructor() {
        this.instance = this.constructor.name;
    }
}
exports.Mo = Mo;
//# sourceMappingURL=mo.class.js.map