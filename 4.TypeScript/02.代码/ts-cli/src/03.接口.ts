(function () {
    // let obj:object ={
    //     id:100,
    //     name:"xiaoming",
    //     age:28,
    //     sex:"男"
    // }

    /*
        对象接口
        现在有一个对象
        id是number类型, 必须有, 只读的
        name是string类型, 必须有
        age是number类型, 必须有
        sex是string类型, 可以没有

        接口简单理解:可以理解为是一个约束的规则对象
        声明接口使用interface
        属性只读修饰符是readonly
        属性可选修饰符是?

        面试题:readonly和const有什么区别?
            相同点:
                被以上两者约束的数据是不能进行变化的
                但是约束的效果是浅监听
            不同点:
                const是用于约束变量值
                readonly是用于约束属性值
    */
    interface IPerson {
        readonly id: number,
        name: string,
        age: number,
        sex?: string,
        readonly wife: string[]
    }
    let obj: IPerson = {
        id: 100,
        name: "xiaoming",
        age: 28,
        wife: ["刘亦菲"]
    }
    // obj.id=obj.id+1;
    obj.sex = "男"
    // obj.wife.push("杨幂")
    // obj.wife=["杨幂"]
    console.log(obj)
})();

(function () {
    // let obj:object ={
    //     id:100,
    //     name:"xiaoming",
    //     age:28,
    //     sex:"男"
    // }

    /*
        函数接口
        现在具有一个函数,该函数接收两个参数
        第一个参数必须是number类型,第二个参数必须是string类型
        返回值必须是string类型
    */

    interface IFn {
        (a: number, b: string): string
    }

    let Fn: IFn = function (a: number, b: string): string {
        return a + b
    }

    Fn(1, "1")
})();



(function () {

    /*
        类接口
        现在具有一个类,他必须要有一个say方法
        这个方法接收一个实参,参数类型为string,没有返回值
    */


    interface IStudent {
        price: number;
    }
    
    interface IPerson extends IStudent {
        sex: string;
        say: (text: string) => void
    }

    // class Person implements IPerson,IStudent{
    class Person implements IPerson {
        name: string;
        age: number;
        sex: string;
        price: number;
        constructor(name1: string, age1: number, sex: string, price: number) {
            this.name = name1;
            this.age = age1;
            this.sex = sex;
        }

        say(text) {
            console.log(text)
        }
    }
    let p1 = new Person("xiaoming", 29, "女", 10000);
    p1.say("我是小明,大家好")
})();