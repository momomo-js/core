import {MoOptionHandler} from '../bin/mo-option-handler';

export function Option(mark: string | symbol) {
    return (target: Object, propertyKey: string | symbol) => {
        Object.defineProperty(target, propertyKey, {
            configurable: false,
            get: () => {
            },
            set: v => {
                MoOptionHandler.get().setOption(mark, v);
                return v;
            }
        });
    }
}

export function Input(mark: string | symbol) {
    return (target: Object, propertyKey: string | symbol) => {
        Object.defineProperty(target, propertyKey, {
            get: () => {
            },
            set: v => {
                const option = MoOptionHandler.get().getOption(mark);
                if (option) {
                    return option;
                } else {
                    return v;
                }
            }
        });
    }
}
