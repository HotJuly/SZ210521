(function(){
    let flag:boolean = true;
    flag=false;
    
    let num:number = 10;
    num = 0x001;
    num = 0o001;
    num = 10.001;
    
    let str:string = "str";

    // let un:undefined = undefined;

    // 在非严格模式下,undefined和null是任何类型的子类型
    str = undefined;

    let nu1:null = null;

    str = null;

    let arr:Array<number> = [1,2,3];
    let arr1:number[] = [1,2,3];
    // arr[0]="str"

    // 元组就是长度和类型都受到限制的数组
    let arr2:[number,string,boolean] = [1,"str",true];
    // arr2[3]= 123;
    // console.log(arr2[0].)

    enum City{
        "shanghai"=100,
        "shenzhen"=1010,
        "wuhan"=1100,
        "quanzhou"=202101
    }
    var person = {
        city:City["shanghai"]
    }
    var city = City[person.city]
    console.log('person',City)

    // let a:any = 123;
    // a="str";
    // a=true;
    // a=arr;

    // any代表任意类型,void代表没有任何数据
    let v1:void;

    function fn(): void {
        console.log('fn()')
      }
    //   fn

    let obj:object = {
        name:"1q23",
        age:123
    }

    // 需求:现在具有一个变量,他可能存放number类型数据,也可能存储string类型的数据
    let num1:number|string;
    num1=223;
    num1="123";

    // 需求:现在具有一个函数,该函数需要接受一个实参(要么number要么string)
            // 这个实参如果是字符串,就输出字符串的长度length
            // 这个实参如果是数字,就输出数字自身

    function getLength(data:number|string){
        if((data as string).length){
            // 能进入这个位置说明是字符串
            return (<string>data).length;
        }else{
            // 能进入这个位置说明是数字
            return data
        }
    }
    getLength(1)

    // let num2=123;
    let num2;
    num2 = 123;
    num2 = "asd";
})();
