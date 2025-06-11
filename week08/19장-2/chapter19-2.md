[Notion으로 보기](https://slime-fall-1f7.notion.site/13-1eb566396b5180e68a35eab02ed2cb5c?pvs=4)

[19장. 프로토타입(2)](#19장-프로토타입2)  
&nbsp;&nbsp;[19.7 프로토타입 체인](#197-프로토타입-체인)  
&nbsp;&nbsp;[19.8 오버라이딩과 프로퍼티 섀도잉](#198-오버라이딩과-프로퍼티-섀도잉)  
&nbsp;&nbsp;[19.9 프로토타입의 교체](#199-프로토타입의-교체)  
&nbsp;&nbsp;[19.10 instanceof 연산자](#1910-instanceof-연산자)  
&nbsp;&nbsp;[19.11 직접 상속](#1911-직접-상속)  
&nbsp;&nbsp;[19.12 정적 프로퍼티/메서드](#1912-정적-프로퍼티메서드)  
&nbsp;&nbsp;[19.13 프로퍼티 존재 확인](#1913-프로퍼티-존재-확인)  
&nbsp;&nbsp;[19.14 프로퍼티 열거](#1914-프로퍼티-열거)

# 19장. 프로토타입(2)

## 19.7 프로토타입 체인

프로토타입 체인은 자바스크립트가 객체지향 프로그래밍의 상속을 구현하는 메커니즘이다.
자바스크립트는 객체의 프로퍼티(메서드 포함)에 접근하려고 할 때 해당 객체에 접근하려는 프로퍼티가 없다면 [[Prototype]] 내부 슬롯의 참조를 따라 자신의 부모 역할을 하는 프로토타입의 프로퍼티를 순차적으로 검색한다.

```jsx
①function Person(name) {
  this.name = name;
}

②Person.prototype.sayHello = function () {
  console.log(`Hi! My name is ${this.name}`);
};

③const me = new Person("Lee");
```

```tsx
console.log(Object.getPrototypeOf(me) === Person.prototype); // true
console.log(Object.getPrototypeOf(Person.prototype) === Object.prototype); // true
```

**메서드를 검색하는 과정 (프로퍼티를 참조하는 경우도 동일)**

```tsx
me.hasOwnProperty("name"); // true
```

1.  hasOwnProperty 메서드를 호출한 me 객체에서 hasOwnProperty 메서드를 검색한다.
    me 객체에는 hasOwnProperty 메서드가 없으므로 프로토타입 체인을 따라, [[Prototype]] 내부 슬롯에 바인딩되어 있는 프로토타입으로 이동하여 hasOwnProperty 메서드를 검색한다.
2.  Person.prototype에도 hasOwnProperty 메서드가 없으므로 프로토타입 체인을 따라, [[Prototype]] 내부 슬롯에 바인딩되어 있는 프로토타입으로 이동하여 hasOwnProperty 메서드를 검색한다.
3.  Object.prototype에는 hasOwnProperty 메서드가 존재한다.
    자바스크립트 엔진은 Object.prototype.hasOwnProperty 메서드를 호출한다. 이때 메서드의 this에는 me 객체가 바인딩된다.
    ```tsx
    Object.prototype.hasOwnProperty.call(me, "name");
    ```

**Object.prototype: 프로토타입 체인의 종점(end of prototype chain)**

프로토타입 체인의 최상위에 위치하는 객체는 언제나 Object.prototype이다. 따라서 모든 객체는 Object.prototype을 상속받는다. Object.prototype의 프로토타입, 즉 [[Prototype]] 내부 슬롯의 값은 null이다.
Object.prototype에서도 프로퍼티를 검색할 수 없는 경우 undefined를 반환한다. 이때 에러가 발생하지 않는다.

```jsx
me.foo; // undefined
```

**프로토타입 체인과 스코프 체인**

스코프 체인과 프로토타입 체인은 서로 협력하여 식별자와 프로퍼티를 검색하는데 사용된다.

| **프로토타입 체인**                                                                                           | **스코프 체인**                                                                             |
| ------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- |
| 상속과 프로퍼티 검색을 위한 메커니즘                                                                          | 식별자 검색을 위한 메커니즘                                                                 |
| 자바스크립트 엔진은 객체 간의 상속 관계로 이루어진 프로토타입의 계층적인 구조에서 객체의 프로퍼티를 검색한다. | 자바스크립트 엔진은 함수의 중첩 관계로 이루어진 스코프의 계층적 구조에서 식별자를 검색한다. |
| ⇒ 프로퍼티와 메서드는 프로토타입 체인에서 검색한다.                                                           | ⇒ 식별자는 스코프 체인에서 검색한다.                                                        |

```tsx
me.hasOwnProperty("name");
```

1. 스코프 체인에서 me 식별자를 검색한다. me 식별자는 전역에서 선언되었으므로 전역 스코프에서 검색된다.
2. me 객체의 프로토타입 체인에서 hasOwnProperty 메서드를 검색한다.

## 19.8 오버라이딩과 프로퍼티 섀도잉

**오버라이딩 overriding**

상위 클래스가 가지고 있는 메서드를 하위 클래스가 재정의하여 사용하는 방식

**프로퍼티 섀도잉 property shadowing**

상속 관계에 의해 프로퍼티가 가려지는 현상

```jsx
const Person = (function () {
  function Person(name) {
    this.name = name;
  }

  // 프로토타입 메서드
  Person.prototype.sayHello = function () {
    console.log(`Hi! My name is ${this.name}`);
  };

  return Person;
})();

const me = new Person("Lee");

// 인스턴스 메서드
me.sayHello = function () {
  console.log(`Hey! My name is ${this.name}`);
};

me.sayHello(); // Hey! My name is Lee
```

<aside>

**(참고) 오버로딩 overloading**

함수의 이름은 동일하지만 매개변수의 타입 또는 개수가 다른 메서드를 구현하고 매개변수에 의해 메서드를 구별하여 호출하는 방식

자바스크립트는 오버로딩을 지원하지 않지만 arguments 객체를 사용하여 구현할 수 있다.

</aside>

**프로퍼티 삭제**

프로토타입 체인을 통한 프로토타입 메서드 삭제는 불가하다.

하위 객체를 통해 프로토타입의 프로퍼티를 변경 또는 삭제하는 것은 불가능하다. 하위 객체를 통해 프로토타입에 get 액세스는 허용되나 set 액세스는 허용되지 않는다.

프로토타입 프로퍼티를 변경 또는 삭제하려면 프로토타입에 직접 접근해야 한다. (하위 객체를 통해 프로토타입 체인으로 접근 X)

```jsx
// 프로퍼티 삭제
①delete me.sayHello;
me.sayHello(); // Hi! My name is Lee

delete me.sayHello;
me.sayHello(); // Hi! My name is Lee

Person.prototype.sayHello = function () {
  console.log(`프로토타입 메서드 변경`);
};
me.sayHello(); // 프로토타입 메서드 변경

②delete Person.prototype.sayHello;
me.sayHello(); // TypeError: me.sayHello is not a function
```

## 19.9 프로토타입의 교체

프로토타입은 임의의 다른 객체로 변경할 수 있다. 이를 활용하여 객체 간의 상속 관계를 동적으로 변경할 수 있다.

### 19.9.1 생성자 함수에 의한 프로토타입의 교체

```jsx
const Person = (function () {
  function Person(name) {
    this.name = name;
  }

  Person.prototype = {
    sayHello() {
      console.log(`Hi! My name is ${this.name}`);
    },
  };

  return Person;
})();

const me = new Person("Lee");
```

자바스크립트 엔진은 프로토타입을 생성할 때 암묵적으로 constructor 프로퍼티를 추가한다.

프로토타입으로 교체한 객체 리터럴에는 constructor 프로퍼티가 없다. 따라서 me 객체의 생성자 함수를 검색하면 Person이 아닌 Object가 나온다.

```jsx
console.log(me.constructor); // [Function: Object]
console.log(me.constructor === Person); // false
console.log(me.constructor === Object); // true
```

프로토타입으로 교체한 객체 리터럴에 constructor 프로퍼티를 추가하여 프로토타입의 constructor 프로퍼티를 되살릴 수 있다.

```jsx
const Person = (function () {
  function Person(name) {
    this.name = name;
  }

  Person.prototype = {
    constructor: Person,
    sayHello() {
      console.log(`Hi! My name is ${this.name}`);
    },
  };

  return Person;
})();

const me = new Person("Lee");
me.sayHello(); // Hi! My name is Lee

console.log(me.constructor); // [Function: Person]
console.log(me.constructor === Person); // true
console.log(me.constructor === Object); // false
```

### 19.9.2 인스턴스에 의한 프로토타입의 교체

인스턴스의 \_\_proto\_\_ 접근자 프로퍼티(또는 Object.getPrototypeOf 메서드)를 통해 프로토타입을 교체할 수 있다.

```jsx
function Person(name) {
  this.name = name;
}

const me = new Person("Lee");

const parent = {
  sayHello() {
    console.log(`Hi! My name is ${this.name}`);
  },
};

Object.setPrototypeOf(me, parent); // me.__proto__ = parent

me.sayHello(); // Hi! My name is Lee
```

프로토타입으로 교체한 객체(parent)에는 constructor 프로퍼티가 없으므로 constructor 프로퍼티와 생성자 함수 간의 연결이 파괴된다. 따라서 me 객체의 생성자 함수를 검색하면 Person이 아닌 Object가 나온다.

```jsx
console.log(me.constructor); // [Function: Object]
console.log(me.constructor === Person); // false
console.log(me.constructor === Object); // true
```

프로토타입으로 교체한 객체 리터럴에 constructor 프로퍼티를 추가하고 생성자 함수의 prototype 프로퍼티를 재설정하여 파괴된 생성자 함수와 프로토타입 간의 연결을 되살릴 수 있다.

```jsx
function Person(name) {
  this.name = name;
}

const me = new Person("Lee");

const parent = {
  ①constructor: Person,
  sayHello() {
    console.log(`Hi! My name is ${this.name}`);
  },
};

②Person.prototype = parent;

Object.setPrototypeOf(me, parent); // me.__proto__ = parent

me.sayHello(); // Hi! My name is Lee

console.log(me.constructor); // [Function: Person]
console.log(me.constructor === Person); // true
console.log(me.constructor === Object); // false

console.log(Person.prototype === Object.getPrototypeOf(me)); // true
```

생성자 함수의 prototype 프로퍼티에 다른 임의의 객체를 바인딩하는 것은 미래에 생성할 인스턴스의 프로토타입을 교체하는 것이다.

\_\_proto\_\_ 접근자 프로퍼티를 통해 프로토타입을 교체하는 것은 이미 생성된 객체의 프로토타입을 교체하는 것이다.

프로토타입 교체를 통해 객체 간의 상속 관계를 동적으로 변경하는 것은 번거롭다. 따라서 프로토타입은 직접 교체하지 않는 것이 좋다. 상속 관계를 인위적으로 설정하려면 직접 상속이 더 편리하고 안전하다. 또는 ES6에서 도입된 클래스를 사용하면 간편하고 직관적으로 상속 관계를 구현할 수 있다.

## 19.10 instanceof 연산자

우변 생성자 함수의 prototype에 바인딩된 객체가 좌변 객체의 프로토타입 체인 상에 존재하면 true, 존재하지 않으면 false로 평가된다.

```jsx
객체 instanceof 생성자 함수
```

```jsx
// 생성자 함수
function Person(name) {
  this.name = name;
}

const me = new Person("Lee");

// Person.prototype이 me 객체의 프로토타입 체인 상에 존재
console.log(me instanceof Person); // true
// Object.prototype이 me 객체의 프로토타입 체인 상에 존재
console.log(me instanceof Object); // true
```

**instanceof** 연산자는 생성자 함수의 prototype에 바인딩된 객체가 프로토타입 체인 상에 존재하는지 확인한다. 프로토타입의 constructor 프로퍼티가 어떤 생성자 함수를 가리키는지는 중요하지 않다.

```jsx
function Person(name) {
  this.name = name;
}

const me = new Person("Lee");

// 프로토타입으로 교체할 객체
const parent = {};

// me 객체의 프로토타입 교체
Object.setPrototypeOf(me, parent);

// Person 생성자 함수와 parent 객체는 연결되어 있지 않음
console.log(Person.prototype === parent); // false
console.log(parent.constructor === Person); // false

// Person.prototype이 me 객체의 프로토타입 체인 상에 존재하지 않음
console.log(me instanceof Person); // false
// Object.prototype이 me 객체의 프로토타입이 체인 상에 존재
console.log(me instanceof Object); // true
```

```jsx
// parent 객체를 Person 생성자 함수의 prototype 프로퍼티에 바인딩
Person.prototype = parent;

console.log(me instanceof Person); // true
console.log(me instanceof Object); // true
```

instanceof 연산자를 함수로 표현하면 다음과 같다.

```jsx
function Person(name) {
  this.name = name;
}

const me = new Person("Lee");

function isInstanceof(instance, constructor) {
  const prototype = Object.getPrototypeOf(instance);

  // 재귀 탈출 조건: 프로토타입 체인의 종점(prototype === null)에 다다른 경우
  if (prototype === null) return false;

  return (
    // 위에서 취득한 prototype이 생성자 함수(constructor)의 prototype이면 true 반환
    prototype === constructor.prototype ||
    // 그렇지 않다면(false이면) 상위 프로토타입으로 이동 후 재귀 호출
    isInstanceof(prototype, constructor)
  );
}

console.log(isInstanceof(me, Person)); // true
console.log(isInstanceof(me, Object)); // true
console.log(isInstanceof(me, Array)); // false
```

생성자 함수에 의해 프로토타입이 교체되는 경우, constructor 프로퍼티와 생성자 함수 간의 연결이 파괴될 수 있다. 하지만 생성자 함수의 prototype 프로퍼티와 프로토타입 객체 간의 연결은 파괴되지 않으므로 instanceof는 아무런 영향을 받지 않는다.

```jsx
const Person = (function () {
  function Person(name) {
    this.name = name;
  }

  Person.prototype = {
    sayHello() {
      console.log(`Hi! My name is ${this.name}`);
    },
  };

  return Person;
})();

const me = new Person("Lee");

// constructor 연결이 파괴되어도 instanceof는 아무런 영향을 받지 않는다.
console.log(me.constructor === Person); // false

// Person.prototype이 me 객체의 프로토타입 체인 상에 존재
console.log(me instanceof Person); // true
// Object.prototype이 me 객체의 프로토타입 체인 상에 존재
console.log(me instanceof Object); // true
```

## 19.11 직접 상속

### 19.11.1 Object.create에 의한 직접 상속

Object.create 메서드는 명시적으로 프로토타입을 지정하여 새로운 객체를 생성한다. 다른 객체 생성 방식과 마찬가지로 추상 연산 OrdinaryObjectCreate를 호출한다.

```jsx
/**
 * 지정된 프로토타입 및 프로퍼티를 갖는 새로운 객체를 생성하여 반환한다.
 * @param {Object} prototype - 생성할 객체의 프로토타입으로 지정할 객체
 * @param {Object} [propertiesObject] - 생성할 객체의 프로퍼티를 갖는 객체
 * @returns {Object} 지정된 프로토타입 및 프로퍼티를 갖는 새로운 객체
 */
Object.create(prototype[, propertiesObject])
```

Object.create 메서드는 첫 번째 매개변수에 전달한 객체의 프로토타입 체인에 속하는 객체를 생성한다. 객체를 생성하면서 직접적으로 상속을 구현한다.

Object.create 메서드의 장점은 다음과 같다:

- new 연산자가 없이도 객체를 생성할 수 있다.
- 프로토타입을 지정하면서 객체를 생성할 수 있다.
- 객체 리터럴에 의해 생성된 객체도 상속받을 수 있다.

```jsx
// 프로토타입이 null인 객체를 생성한다. 프로토타입 체인의 종점에 위치한다.
let obj = Object.create(null);
console.log(Object.getPrototypeOf(obj) === null); // true
// Object.prototype을 상속받지 못한다.
// console.log(obj.toString()); // TypeError: obj.toString is not a function

// obj = {};
obj = Object.create(Object.prototype);
console.log(Object.getPrototypeOf(obj) === Object.prototype); // true

// obj = { x: 1 };
obj = Object.create(Object.prototype, {
  x: { value: 1, writable: true, enumerable: true, configurable: true },
});
console.log(obj.x); // 1
console.log(Object.getPrototypeOf(obj) === Object.prototype); // true

const myProto = { x: 10 };
obj = Object.create(myProto);
console.log(obj.x); // 10
console.log(Object.getPrototypeOf(obj) === myProto); // true

function Person(name) {
  this.name = name;
}
// obj = new Person('Lee');
obj = Object.create(Person.prototype);
obj.name = "Lee";
console.log(obj.name); // Lee
console.log(Object.getPrototypeOf(obj) === Person.prototype); // true
```

대부분의 객체는 프로토타입 체인의 종점인 Object.prototype으로부터 메서드를 상속받아 호출할 수 있다. (Object.prototype.hasOwnProperty, Object.prototype.isPrototypeOf, Object.prototype.propertyIsEnumerable 등)

```jsx
const obj = { a: 1 };

console.log(obj.hasOwnProperty("a")); // true
console.log(obj.propertyIsEnumerable("a")); // true
```

하지만 Object.prototype의 빌트인 메서드를 객체가 직접 호출하는 것은 권장하지 않는다. Object.create 메서드를 통해 프로토타입 체인의 종점에 위치하도록 생성된 객체는 Object.prototype의 빌트인 메서드를 사용할 수 없기 때문이다.

```jsx
const obj = Object.create(null);
obj.a = 1;

console.log(Object.getPrototypeOf(obj) === null); // true
console.log(obj.hasOwnProperty("a")); // TypeError: obj.hasOwnProperty is not a function
```

Object.prototype의 빌트인 메서드는 간접적으로 호출하는 것이 좋다.

```jsx
const obj = Object.create(null);
obj.a = 1;

console.log(Object.prototype.hasOwnProperty.call(obj, "a")); // true
```

### 19.11.2 객체 리터럴 내부에서 \_\_proto\_\_에 의한 직접 상속

ES6에서는 객체 리터럴 내부에서 \_\_proto\_\_ 접근자 프로퍼티를 사용하여 직접 상속을 구현할 수 있다.

```jsx
const myProto = { x: 10 };

const obj = {
  y: 20,
  __proto__: myProto,
};

console.log(obj.x, obj.y); // 10 20
console.log(Object.getPrototypeOf(obj) === myProto); // true
```

## 19.12 정적 프로퍼티/메서드

**정적(static) 프로퍼티/메서드**

생성자 함수로 인스턴스를 생성하지 않아도 참조/호출할 수 있는 프로퍼티/메서드

생성자 함수도 객체이므로 자신의 프로퍼티/메서드를 소유할 수 있다. 생성자 함수 객체가 소유한 프로퍼티/메서드를 정적 프로퍼티/메서드라고 한다. 정적 프로퍼티/메서드는 생성자 함수가 생성한 인스턴스로 참조/호출할 수 없다.

```jsx
function Person(name) {
  this.name = name;
}

Person.prototype.sayHello = function () {
  console.log(`Hi! My name is ${this.name}`);
};

// 정적 프로퍼티
Person.staticProp = "staticProp";
// 정적 메서드
Person.staticMethod = function () {
  console.log("staticMethod");
};

const me = new Person("Lee");

Person.staticMethod(); // staticMethod
// 인스턴스로 참조/호출할 수 있는 프로퍼티/메서드는 프로토타입 체인 상에 존재해야 한다.
me.staticMethod(); // TypeError: me.staticMethod is not a function
```

| **정적 메서드**                            | **프로토타입 메서드**               |
| ------------------------------------------ | ----------------------------------- |
| 인스턴스를 생성하지 않아도 호출할 수 있다. | 인스턴스를 생성해야 호출할 수 있다. |
| Object.create()                            | Object.prototype.hasOwnProperty     |
| Object.create({ name: ‘Lee’ })             | obj.hasOwnProperty(’name’)          |

인스턴스가 호출한 인스턴스/프로토타입 메서드 내에서 this는 인스턴스를 가리킨다. 프로토타입 메서드가 this를 참조하지 않는다면 정적 메서드로 변경해도 동일한 효과를 얻을 수 있다.

```jsx
function Foo() {}

// 프로토타입 메서드
Foo.prototype.x = function () {
  console.log("x");
};

// 프로토타입 메서드를 호출하려면 인스턴스를 생성해야 한다.
const foo = new Foo();
foo.x(); // x

// 정적 메서드
Foo.x = function () {
  console.log("x");
};

Foo.x(); // x
```

<aside>

(참고) 프로토타입 프로퍼티/메서드를 표기할 때 prototype을 #으로 표기하기도 한다.

ex. Object.prototype.isPrototypeOf → Object#isPrototypeOf

</aside>

## 19.13 프로퍼티 존재 확인

### 19.13.1 in 연산자

객체 내에 특정 프로퍼티가 존재하는지 여부를 확인한다.

```jsx
/**
 * key: 프로퍼티 키를 나타내는 문자열
 * object: 객체로 평가되는 표현식
 */
key in object;
```

```jsx
const person = { name: "Lee" };

console.log("name" in person); // true
console.log("age" in person); // false
```

⚠️ in 연산자는 확인 대상 객체의 프로퍼티뿐만 아니라 상속받은 모든 프로토타입의 프로퍼티를 확인한다.

```jsx
console.log("toString" in person); // true
```

**Reflect.has() 메서드**

in 연산자와 동일하게 동작한다. (ES6 도입)

```jsx
const person = { name: "Lee" };

console.log(Reflect.has(person, "name")); // true
console.log(Reflect.has(person, "age")); // false

console.log(Reflect.has(person, "toString")); // true
```

### 19.13.2 Object.prototype.hasOwnProperty 메서드

객체에 특정 프로퍼티가 존재하는지 확인할 수 있다.

인수로 전달받은 프로퍼티 키가 객체 고유의 프로퍼티 키인 경우에만 true를 반환한다.
상속받은 프로토타입의 프로퍼티 키인 경우 false를 반환한다.

```jsx
const person = { name: "Lee" };

console.log(person.hasOwnProperty("name")); // true
console.log(person.hasOwnProperty("age")); // false

console.log(person.hasOwnProperty("toString")); // false
```

## 19.14 프로퍼티 열거

### 19.14.1 for…in 문

객체의 모든 프로퍼티를 순회하여 열거(enumeration)한다.

```jsx
for (변수선언문 in 객체) { ... }
```

객체의 프로퍼티 개수만큼 순회하며 for…in 문의 변수 선언문에서 선언한 변수에 프로퍼티 키를 할당한다.

- 순회 ①. ‘name’을 key 변수에 할당한 후, 코드 블록을 실행한다.
- 순회 ②. ‘address’을 key 변수에 할당한 후, 코드 블록을 실행한다.

```jsx
const person = {
  name: "Lee",
  address: "Seoul",
};

for (const key in person) {
  console.log(key + ": " + person[key]);
  // ①name: Lee
  // ②address: Seoul
}
```

for…in 문은 순회 대상 객체의 프로퍼티뿐만 아니라 상속받은 프로토타입의 프로퍼티까지 열거한다. 객체의 프로토타입 체인 상에 존재하는 모든 프로토타입의 프로퍼티 중에서 프로퍼티 어트리뷰트 [[Enumerable]]의 값이 true인 프로퍼티를 순회하며 열거(enumeration)한다.

```jsx
const person = {
  name: "Lee",
  address: "Seoul",
  __proto__: { age: 20 },
};

for (const key in person) {
  console.log(key + ": " + person[key]);
  // ①name: Lee
  // ②address: Seoul
  // ③age: 20
}

// Object.prototype.toString 프로퍼티의 [[Enumerable]] 값은 false이기 때문에
// for...in 문으로 열거할 수 없다.
console.log("toString" in person); // true
console.log(Object.getOwnPropertyDescriptor(Object.prototype, "toString"));
// { value: [Function: toString], writable: true, enumerable: false, configurable: true }
```

프로퍼티 키가 심벌인 프로퍼티는 열거하지 않는다.

```jsx
const sym = Symbol();
const obj = {
  a: 1,
  [sym]: 10,
};

for (const key in obj) {
  console.log(key + ": " + obj[key]);
  // ①a: 1
}
```

상속받은 프로퍼티는 제외하고 객체 자신의 프로퍼티만 열거하고 싶다면 Object.prototype.hasOwnProperty 메서드를 사용하여 객체 자신의 프로퍼티인지 확인해야 한다.

```jsx
const person = {
  name: "Lee",
  address: "Seoul",
  __proto__: { age: 20 },
};

for (const key in person) {
  // 객체 자신의 프로퍼티인지 확인한다.
  if (person.hasOwnProperty(key)) console.log(key + ": " + person[key]);
  // ①name: Lee;
  // ②address: Seoul;
}
```

⚠️ for…in 문은 프로퍼티를 열거할 때 순서를 보장하지 않는다. (하지만 대부분의 모던 브라우저는 순서를 보장하고, 숫자(로 구성된 문자열)인 프로퍼티 키에 대해서는 정렬을 실시한다.)

(참고) 배열에는 일반적인 for 문이나 for…of 문 또는 Array.prototype.forEach 메서드를 사용하기를 권장한다.

- for…in 문: 프로퍼티도 출력한다.
- forEach 문: 배열 요소만 순회하며, 객체의 프로퍼티는 무시된다.
- for…of 문: 변수 선언문에서 선언한 변수에 요소의 값을 할당한다.

```jsx
const arr = [1, 2, 3];
arr.x = 10; // 배열도 객체이므로 프로퍼티를 추가할 수 있다.

// for...in 문
for (const i in arr) {
  console.log(`${i}: ${arr[i]}`);
  // ①0: 1
  // ②1: 2
  // ③2: 3
  // ④x: 10
}

// 일반 for 문
for (let i = 0; i < arr.length; i++) {
  console.log(`${i}: ${arr[i]}`);
  // ①0: 1
  // ②1: 2
  // ③2: 3
}

// forEach 문
arr.forEach((v) => console.log(v));
// ①1
// ②2
// ③3

// for...of 문
for (const value of arr) {
  console.log(value);
  // ①1
  // ②2
  // ③3
}
```

### 19.14.2 Object.keys/values/entries 메서드

객체 자신의 고유 프로퍼티만 열거하기 위해서는 Object.keys/values/entries 메서드를 사용하는 것을 권장한다.

- Object.keys : 객체 자신의 열거 가능한(enumerable) 프로퍼티 키를 배열로 반환한다.
- Object.values : 객체 자신의 열거 가능한 프로퍼티 값을 배열로 반환한다.
- Object.entries: 객체 자신의 열거 가능한 프로퍼티 키와 값의 쌍의 배열을 배열에 담아 반환한다.

```jsx
const person = {
  name: "Lee",
  address: "Seoul",
  __proto__: { age: 20 },
};

console.log(Object.keys(person)); // [ 'name', 'address' ]

console.log(Object.values(person)); // [ 'Lee', 'Seoul' ]

console.log(Object.entries(person)); // [ [ 'name', 'Lee' ], [ 'address', 'Seoul' ] ]

Object.entries(person).forEach(([key, value]) => console.log(key, value));
// ①name Lee
// ②address Seoul
```
