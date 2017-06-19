##面向对象第一天必须要会的知识点
- 对象的创建方式
  - 字面量
  - new 构造函数()
- 属性和方法 与 变量和函数 的区别
- 属性的访问
  - 对象.属性名称
  - 对象[属性名称] //可以写变量
- This的多种情况（必须要特别清楚) 自己补充完整
- 构造函数//首字母大写
- 类和实例对象//类在这里相当于构造函数，是实例的一个抽象

- 原型 prototype
- 原型对象 __proto__
- 构造器: 原型上面指向构造函数的一个指针
- 原型链: 能够实现继承
- 原型的用途：方法写原型上
- 包装器 (1.0).toString()
- typeof null === 'object'
- typeof function(){} === 'function' //可执行的对象

##面向对象第二天必须要掌握的知识点
- 函数是一等公民
- 函数的调用方式不同，体现在了this的值不同
- 作用域，闭包里面的变量根据定义的环境所决定
- $ 和 _ 是正常是能够正常命名的变量名 jQuery underscore/lodash
- 面向对象的特征：封装，继承
- 父类，子类，基类，超类
- in
- Object.defineProperty
- hasOwnProperty
- instanceof
- Array.isArray()

- polyfill 垫片
- 元编程
- 除了null和undefined，基本都使用===代替==，性能更好
