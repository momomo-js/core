export class MoOptionHandler {
    private static instance: MoOptionHandler;

    options: Map<string | symbol, any>;

    static get() {
        if (!MoOptionHandler.instance) {
            MoOptionHandler.instance = new MoOptionHandler;
        }

        return MoOptionHandler.instance;
    }

    protected constructor() {
        this.options = new Map();
    }

    getOption(key: string | symbol) {
        if (this.options.has(key)) {
            return this.options.get(key);
        } else {
            return null;
        }
    }

    setOption(key: string | symbol, value: any) {
        if (!this.options.has(key)) {
           return this.options.set(key, value);
        }
    }

    hasOption(key: string | symbol) {
        return this.options.has(key);
    }

}

