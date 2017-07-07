import "reflect-metadata";
export declare const PLUGINS: symbol;
export declare function MoPlugin(name: symbol): {
    (target: Function): void;
    (target: Object, propertyKey: string | symbol): void;
};
