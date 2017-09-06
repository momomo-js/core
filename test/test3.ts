import {Input, Option} from '../src/decorator/option';

class HaHa {
    @Option('haha')
    options = 'new way';
    @Option('haha1')
    option1s = 'new way1';
}

class HeHe {
    @Input('haha')
    options = 'bad way';

    @Input('haha1')
    option1s = 'bad way1';
}

const th = new HaHa();
const he = new HeHe();

console.log(he.options);
console.log(he.option1s);
