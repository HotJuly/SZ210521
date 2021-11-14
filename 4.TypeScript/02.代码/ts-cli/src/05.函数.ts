(function () {
    // 命名函数
    // function add(x:number, y:number):number{
    //     return x + y
    // }

    // // 匿名函数,函数表达式
    // let myAdd
    // = 
    // function (x:number, y:number):number{
    //     return x + y;
    // }

    // myAdd = function (x:number, y:string):string{
    //     return x + y;
    // }
    // myAdd(1,"2")



    // function add(x:number, y:number=9,z?:number):number{
    //     return x + y + z
    // }

    // // console.log(add(1,2,3))
    // console.log(add(1,2))
    // // console.log(add(1,undefined,"6"))
    // console.log(add(1,2))

    // function add1(x:number,y:number,...args:number[]){
    //     return x+y+args.reduce((pre,item)=>pre+item,0)
    // }
    // console.log(add1(1,2,3,4,5,6))
})();

(function () {
    /*
        需求:当前具有一个函数,该函数接收两个实参
            这两个实参的类型要么是number,要么是string
            返回结果:
                如果两个都是number,就返回相减的结果
                如果两个都是string,就返回拼接的结果
    
    */
    function getResult(x: number, y: number)
    function getResult(x: string, y: string)
    function getResult(x, y) {
        if (typeof x === "number" && typeof y === "number") {
            return x - y
        } else if (typeof x === "string" && typeof y === "string") {
            return x + y
        }
    }

    console.log(getResult(1, 1))
    console.log(getResult("1", "1"))
    // console.log(getResult(1, "1"))
})();