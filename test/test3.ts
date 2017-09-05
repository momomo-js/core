import {Input, Option} from '../src/decorator/option';

class HaHa {
    @Option('haha')
    options = 'new way';
}

class HeHe {
    @Input('haha')
    options = 'bad way';
}

const th = new HaHa();
const he = new HeHe();

console.log(he.options);
