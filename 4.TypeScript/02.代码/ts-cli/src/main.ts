(function () {
    class Person {
        public name: string;
        protected age: number;
        private phone: number;

        constructor(name: string, age: number, phone: number) {
            this.name = name;
            this.age = age;
            this.phone = phone;
        }

        sayPhone() {
            console.log(`我的手机号是${this.phone}`)
        }
    }

    class Student extends Person {
        readonly price: number;
        constructor(name: string, age: number, phone: number, price: number) {
            super(name, age, phone);
            this.price = price;
        }

        sayAge() {
            console.log(`我今年${this.age}岁`)
        }

        // sayPhone(){
        //     console.log(`我的手机号是${this.phone}`)
        // }
    }

    let s1 = new Student("xiaohong", 22, 1888888888, 900000);
    // console.log(s1.name,s1.age,s1.phone,s1.price)
    // console.log(s1.name,s1.age,s1.phone,s1.price)
    s1.sayAge();
    s1.sayPhone();
    // s1.price=s1.price+100;
})();

(function () {
    /*
        抽象类更像是一个加强版的接口
        它具有接口的功能,可以约束子类必须拥有的属性
        但是同时他还能给子类提供一些真东西

        抽象类不能够被构造调用
    
    */
    abstract class Animal {

        abstract cry()

        run() {
            console.log('run()')
        }
    }

    class Dog extends Animal {
        cry() {
            console.log(' Dog cry()')
        }
    }

    const dog = new Dog()
    dog.cry()
    dog.run()

    /*
        现在具有一个类,他必须要有say方法
    
    */

    // interface IFn{
    //     say:(text:string)=>void;
    //     eat(food){
    //         return `我正在吃${food}`
    //     }
    // }

    // class Person implements IFn{
    //     constructor(){

    //     }
    //     say(text){
    //         console.log(text)
    //     }
    // }
})();