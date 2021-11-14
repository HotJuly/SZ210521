(function () {
    /*
        需求:
            现在具有一个函数,该函数接收两个实参
                第一个实参是填充的数据(value)
                第二个参数是填充的次数(count)
            返回值:
                返回是一个长度为count的数组,数组内部的每一项都是value
    
//     */
    //    function getArray(value:any,count:number):any[]{
    //        let arr:any[] = [];
    //        for(let i:number=0;i<count;i++){
    //            arr.push(value)
    //        }
    //        return arr;
    //    }

    //    console.log(getArray(1,10))
    //    console.log(getArray("1",7))

    /*
     遇到的问题:我们在定义函数的时候,虽然很想写数据类型约束,但是无法判断用户未来可能传入什么类型的参数

     泛型
        其实泛型可以理解为TS新增的一种传参方式,只不过这种传参只能传递数据类型
    */


    // function getArray<T>(value: T, count: number): T[] {
    //     let arr: T[] = [];
    //     for (let i: number = 0; i < count; i++) {
    //         arr.push(value)
    //     }
    //     return arr;
    // }

    // const arr1 = getArray<number>(1,10);
    // const arr2 = getArray<string>("2",7);


    // // const arr3 = getArray<boolean>(this.handleClick(),7);
    // console.log(arr1)
    // console.log(arr2)


    // function map<JK,KJ>(a:JK,b:KJ):[JK,KJ]{
    //     return [a,b]
    // }
    // const result = map<number,string>(1,"2");
    // // result[0].push
})();

// (function () {

//     interface IBaseCRUD<T>{
//         data:T[];
//         add:(user:T)=>void;
//         getById:(id: number)=>T
//     }

//     interface IUserCRUD {
//         data:User[];
//         add:(user:User)=>void;
//         getById:(id: number)=>User
//     }

//     interface IStudentCRUD {
//         data:Student[];
//         add:(user:Student)=>void;
//         getById:(id: number)=>Student
//     }


//     class User {
//         id?: number; //id主键自增
//         name: string; //姓名
//         age: number; //年龄

//         constructor(name, age) {
//             this.name = name
//             this.age = age
//         }
//     } 

//     class UserCRUD implements IBaseCRUD<User>{
//         data: User[] = []

//         add(user: User): void {
//             user = { ...user, id: Date.now() }
//             this.data.push(user)
//             console.log('保存user', user.id)
//         }

//         getById(id: number): User {
//             return this.data.find(item => item.id === id)
//         }
//     }

    


//     class Student {
//         id?: number; //id主键自增
//         name: string; //姓名
//         age: number; //年龄

//         constructor(name, age) {
//             this.name = name
//             this.age = age
//         }
//     } 

//     class StudentCRUD implements  IBaseCRUD<Student>{
//         data: Student[] = []

//         add(user: Student): void {
//             user = { ...user, id: Date.now() }
//             this.data.push(user)
//             console.log('保存user', user.id)
//         }

//         getById(id: number): Student {
//             return this.data.find(item => item.id === id)
//         }
//     }


//     const userCRUD = new UserCRUD()
//     userCRUD.add(new User('tom', 12))
//     userCRUD.add(new User('tom2', 13))
//     console.log(userCRUD.data)
// })();

(function(){
    // class GenericNumber<T> {
    //     zeroValue: T
    //     add: (x: T, y: T) => T
    //   }
      
    //   let myGenericNumber = new GenericNumber<number>()
    //   myGenericNumber.zeroValue = 0
    //   myGenericNumber.add = function(x, y) {
    //     return x + y 
    //   }
    //   myGenericNumber.add(1,2);
      
    //   let stringNumeric = new GenericNumber<string>()
    //   stringNumeric.zeroValue = 'abc'
    //   stringNumeric.add = function(x, y) { 
    //     return x + y
    //   }
      
    //   console.log(stringNumeric.add(stringNumeric.zeroValue, 'test'))
})();

(function(){
    interface ILength{
        length:number;
    }
    function fn2<T extends ILength>(x:T){
        console.log(x.length)
    }
    fn2<string>("asd")
})();