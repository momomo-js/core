import {MoonOption, Moon} from '../src/util/moon/decorator';

class HaHa {
    @Moon('haha')
    options = 'new way';
    @Moon('haha1')
    option1s = 'new way1';
}

class HeHe {
    @MoonOption('haha')
    options = 'bad way';

    @MoonOption('haha1')
    option1s = 'bad way1';
}

const th = new HaHa();
const he = new HeHe();

console.log(he.options);
console.log(he.option1s);
