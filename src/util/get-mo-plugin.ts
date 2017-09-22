import {PLUGINS} from '../decorator/symbol';

export function getMoPlugin(pack: any, type: symbol): any[] {

    const pluginList: Array<string> = Reflect.getMetadata(PLUGINS, pack);

    const ret: any[] = [];
    for (const p of pluginList) {
        const Type: any = Reflect.getMetadata(PLUGINS, pack, p);
        if (Type === type) {
            ret.push(pack[p]);
        }
    }
    return ret;
}
