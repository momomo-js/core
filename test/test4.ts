import 'reflect-metadata';

class Baba {

}

function haha(target: any, prop: string) {
    const ha = Reflect.getMetadata('design:paramtypes', target, prop);
    console.log(ha);
}

class Test {
    @haha
    test(res: Baba, haha: Function) {
    }
}

const test = new Test();


