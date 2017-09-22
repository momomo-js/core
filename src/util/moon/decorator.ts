import {MoonHandler} from './moon-handler';

export function Moon(mark: string | symbol) {
    let value;
    return (target: Object, propertyKey: string | symbol) => {
        Object.defineProperty(target, propertyKey, {
            configurable: false,
            get: () => {
                return value;
            },
            set: v => {
                MoonHandler.get().setOption(mark, v);
                value = v;
            }
        });
    }
}

export function MoonOption(mark: string | symbol) {
    return (target: Object, propertyKey: string | symbol) => {
        let value;
        Object.defineProperty(target, propertyKey, {
            get: () => {
                return value;
            },
            set: v => {
                const option = MoonHandler.get().getOption(mark);
                if (option) {
                    value = option;
                } else {
                    value = v;
                }
            }
        });
    }
}
