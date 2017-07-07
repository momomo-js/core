function logParamTypes(target: any, key: string) {
    var types = Reflect.getMetadata("design:paramtypes", target, key);
    var s = types.map(a => a.name).join();
    console.log(`${key} param types: ${s}`);
    let q=  Reflect.getMetadata("design:returntype", target, key);
    console.log(q);
}

class Calculator {

    constructor(haha: String) {

    }

    double(num: number): number {
        return num * 2;
    }

    @logParamTypes
    yyy(u: string, ggg: string):string {
        console.log(arguments);
        return "dfdfdfdfdf";
    }
}

let calc = new Calculator('2323213');



let q = Reflect.getMetadata("design:returntype", calc ,"yyy");

console.log('11111:' + q);

// console ouput: [{method: "double", output: 22, ...}]
