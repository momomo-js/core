import {MoOptionHandler} from '../bin/mo-option-handler';

export function Option(mark: string | symbol) {
    let value;
    return (target: Object, propertyKey: string | symbol) => {
        Object.defineProperty(target, propertyKey, {
            configurable: false,
            get: () => {
                return value;
            },
            set: v => {
                MoOptionHandler.get().setOption(mark, v);
                value = v;
            }
        });
    }
}

export function Input(mark: string | symbol) {
    return (target: Object, propertyKey: string | symbol) => {
        let value;
        Object.defineProperty(target, propertyKey, {
            get: () => {
                return value;
            },
            set: v => {
                const option = MoOptionHandler.get().getOption(mark);
                if (option) {
                    value = option;
                } else {
                    value = v;
                }
            }
        });
    }
}
