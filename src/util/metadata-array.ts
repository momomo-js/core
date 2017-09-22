export function MetadataArray(key: symbol | string, target: any, propKey?: string): any[] {
    let data: any[];
    if (propKey) {
        data = Reflect.getMetadata(key, target, propKey);
    } else {
        data = Reflect.getMetadata(key, target);
    }

    if (!data) {
        data = [];

        if (propKey) {
            Reflect.defineMetadata(key, data, target, propKey);
        } else {
            Reflect.defineMetadata(key, data, target);
        }
    }
    return data;
}
