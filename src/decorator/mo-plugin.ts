import "reflect-metadata";

export const PLUGINS = Symbol("plugins");

export function MoPlugin(name:symbol)
{
    return Reflect.metadata(PLUGINS,name);
}

/**
 * Created by yskun on 2017/7/3.
 */
