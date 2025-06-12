# 19장 프로토타입 (1)

<aside>

✅ 자바스크립트는 프로토 타입 기반의 객체 지향 프로그래밍 언어다.

✅  원시 타입의 값을 제외한 함수, 배열, 정규 표현식 등 자바스크립트를 이루고 있는 거의 모든 것이 객체이다.

</aside>

## 19.1 객체 지향 프로그래밍

<aside>

- 객체지향 프로그래밍은 프로그램을 명령어 또는 함수의 목록으로 보는 전통적인 명령형 프로그래밍의 절차지향적 관점에서 벗어나 여러 개의 독립적 단위, 즉 객체의 집합으로 프로그래밍을 표현하려는 프로그래밍 패러다임을 말한다.
- 속성을 통해 여러 개의 값을 하나의 단위로 구성한 복합적인 자료구조를 객체라 한다.
- 객체지향 프로그래밍은 객체의 상태를 나타내는 데이터와 상태 데이터를 조작할 수 있는 동작을 하나의 논리적인 단위로 묶어 생각한다.
- 객체는 상태 데이터(프로퍼티)와 동작(메서드)을 하나의 논리적인 단위로 묶은 복합적인 자료구조이다.
- 객체는 고유의 기능을 갖는 독립적인 부품이지만, 다른 객체와의 관계성을 가져 메시지를 주고받거나 데이터를 처리할 수도 있다. 또한 객체의 상태 데이터나 동작을 상속 받기도 한다.

</aside>

## 19.2 상속과 프로토타입

<aside>

- 상속은 객체지향 프로그래밍의 핵심적인 개념으로, 어떤 객체의 프로퍼티 또는 메서드를 다른 객체가 상속받아 그대로 사용할 수 있는 것을 말한다.

상속을 통해 불필요한 중복을 제거하고, 기존의 코드를 재사용하여 개발 비용을 줄일 수 있다.

</aside>

```jsx
// 생성자 함수
function Circle(radicus) {
  this.radius = radius;
  this.getArea = function () {
    // Mathe.PI는 원주율을 나타내는 상수이다.
    return Math.PI * this.radius ** 2;
  };
}

// 반지름이 1인 인스턴스 생성
const circle1 = new Circle(1);
// 반지름이 2인 인스턴스 생성
const circle2 = new Circle(2);

// Circle 생성자 함수는 인스턴스를 생성할 때마다 동일한 동작을 하는
// getArea 메서드를 중복 생성하고 모든 인스턴스가 중복 소유한다.
// getArea 메서드는 하나만 생성하여 모든 인스턴스가 공유해서 사용하는 것이 바람직하다.

console.log(circle.getArea === circle2.getArea); // false

console.log(circle1.getArea());
console.log(circle2.getArea());
```

![get Area()메서드가 각 객체마다 개별적으로 생성되어 메모리 낭비](<19%E1%84%8C%E1%85%A1%E1%86%BC%20%E1%84%91%E1%85%B3%E1%84%85%E1%85%A9%E1%84%90%E1%85%A9%E1%84%90%E1%85%A1%E1%84%8B%E1%85%B5%E1%86%B8%20(1)%2020e0bd97ed348023a24fc86b874b0632/image.png>)

get Area()메서드가 각 객체마다 개별적으로 생성되어 메모리 낭비

```jsx
// 생성자 함수
functinon Circle(radius){
this.radius = radius;
}

// Circle 생성자 함수가 생성한 모든 인스턴스가 getArea 매서드를
// 공유해서 사용할 수 있도록 프로토타입에 추가한다.
// 프로토타입은 Circle 생성자 함수의 prototype프로퍼티에 바인딩 되어있다.
Circle.prototype.getArea = function(){
return Math.PI * this.radius ** 2;
};

// 인스턴스 생성
const circle1 = new Circle(1);
const circle2 = new Circle(2);

// Circle 생성자 함수가 생성한 모든 인스턴스는 부모 객체의 역할을 하는
// 프로토타입 Circle.prototype으로부터 getArea 매서드를 상속받는다.
// 즉, Circle 생성자 함수가 생성하는 모든 인스턴스는 하나의 getArea 메서드를 공유한다.
console.log(circle1.getArea === circle2.getArea); // true

console.log(circle1.getArea());
console.log(circle2.getArea());
```

![getArea()메서드를 한번만 생성하고 모든 객체 공유](<19%E1%84%8C%E1%85%A1%E1%86%BC%20%E1%84%91%E1%85%B3%E1%84%85%E1%85%A9%E1%84%90%E1%85%A9%E1%84%90%E1%85%A1%E1%84%8B%E1%85%B5%E1%86%B8%20(1)%2020e0bd97ed348023a24fc86b874b0632/image%201.png>)

getArea()메서드를 한번만 생성하고 모든 객체 공유

<aside>

두 코드를 비교했을 때.

- **기능**: 똑같음 ✅
- **효율성**: 프로토타입 방식이 훨씬 좋음 ✅
- **성능**: 프로토타입 방식이 더 빠름 ✅
</aside>

## 19.3 프로토타입 객체

<aside>

프로토타입 객체는 상속을 구현하기 위해 사용된다.

프로토타입은 어떤 객체의 상위(부모) 객체의 역할을 하는 객체로서 다른 객체에 공유 프로퍼티(메서드 포함)를 제공한다. 프로토타입을 상속받은 하위(자식)객체는 상위 객체의 프로퍼티를 자신의 프로퍼티처럼 자유롭게 사용할 수 있다.

</aside>

<aside>

모든 객체는 [[Prototype]]이라는 내부 슬롯을 가지며, 이 내부 슬롯의 값은 프로토타입의 참조다.

[[Prototype]] 에 저장되는 프로토타입은 객체 생성 방식에 의해 결정된다. 즉, 객체가 생성될 때 객체의 생성 방식에 따라 프로토타입이 결정되고 [[Prototype]]에 저장된다.

</aside>

![객체와 프로토타입과 생성자 함수는 서로 연결되어있다. ](<19%E1%84%8C%E1%85%A1%E1%86%BC%20%E1%84%91%E1%85%B3%E1%84%85%E1%85%A9%E1%84%90%E1%85%A9%E1%84%90%E1%85%A1%E1%84%8B%E1%85%B5%E1%86%B8%20(1)%2020e0bd97ed348023a24fc86b874b0632/image%202.png>)

객체와 프로토타입과 생성자 함수는 서로 연결되어있다.

[ai 설명](https://www.notion.so/ai-20e0bd97ed3480c18fb6d44f75884aee?pvs=21)

### 19.3.1 ** proto ** 접근자 프로퍼티

<aside>

모든 객체는 ** proto ** 접근자 프로퍼티를 통해 자신의 프로토타입, 즉[[Prototype]] 내부 슬롯에 간접적으로 접근할 수 있다.

</aside>

<aside>

➡️  ** proto ** 는 접근자 프로퍼티다.

내부 슬롯은 프로퍼티가 아니다. 따라서 내부슬롯과 내부 메서드에 직접 접근하거나 호출할 수는 없다.

단, 간접적으로 내부 슬롯과 내부 메서드에 한하여 간접적으로 접근할 수 있는 수단이 있다.

** proto ** 접근자 프로퍼티를 통해 간접적으로 [[Prototype]] 내부 슬롯의 값, 즉 프로토타입에 접근할 수 있다.

➡️ ** proto ** 접근자 프로퍼티는 상속을 통해 사용된다

** proto** 접근자 프로퍼티는 객체가 직접 소유하는 프로퍼티가 아니라 Object.prototype의 프로퍼티다.

모든 객체는 상속을 통해 Object.prototype.**proto**접근자 프로퍼티를 사용할 수 있다.

```jsx
모든 객체는 프로토타입 체인에 묶여 있어 자바스크립트 엔진은 객체 프로퍼티(메서드 포함)에
접근하려고 할 때 해당 프로퍼티가 없으면 __proto__ 접근자 프로퍼티가 가리키는 참조를 따라
부모 역할을 하는 프로토타입의 프로퍼티를 순차적으로 검색한다.
프로토타입 체인의 최상위 객체는 Object.prototype이며 따라서 이 객체의 프로퍼티와 메서드는
모든 객체에 상속된다.
```

➡️ ** proto ** 접근자 프로퍼티를 통해 프로토타입에 접근하는 이유

내부 슬롯의 값 프로토타입에 접근하기 위해서 접근자 프로퍼티를 사용하는 이유는 상호 참조 프로토타입 체인이 생성되는 것을 방지하기 위해서이다.

![image.png](<19%E1%84%8C%E1%85%A1%E1%86%BC%20%E1%84%91%E1%85%B3%E1%84%85%E1%85%A9%E1%84%90%E1%85%A9%E1%84%90%E1%85%A1%E1%84%8B%E1%85%B5%E1%86%B8%20(1)%2020e0bd97ed348023a24fc86b874b0632/image%203.png>)

프로토타입 체인은 단방향 리스트로 구현이 되어야한다. 상호 참조에 의해 프로토타입이 생성되면 체인 종점이 존재하지 않아 무한 루프에 빠지기 떄문이다.

➡️ ** proto ** 접근자 프로퍼티를 코드 내에서 직접 사요하는 것은 권장하지 않는다.

모든 객체가. ** proto** 접근자 프로퍼티를 사용할 수 있는 건 아니기 때문이다. 직접 상속을 통해 object.prototype을 상속받지 않는 객체를 생성할 수도 있기 때문이다.

</aside>

### 19.3.2 함수 객체의 prototype프로퍼티

<aside>

- 함수 객체만이 소유하는 prototype프로퍼티는 생성자 함수가 생성할 인스턴스의 프로토타입을 가리킨다.
- 생성자 함수로서 호출할 수 없는 함수 화살표함수와 ES6메서드 축약 표현으로 정의한 메서드는 prototype 프로퍼티를 소유하지 않으며 프로토타입도 생성하지 않는다.

</aside>

```jsx
// 함수 객체는 Prototype 프로퍼티를 소유한다.
(function () {}).hasOwnProperty("prototype"); // true

// 일반 객체는 prototype 프로퍼티를 소유하지 않는다.
({}).hasOwnProperty("prototype"); // false
```

```jsx
// 화살표 함수는 non-constructor이다.

const Person = (name) => {
  this.name = name;
};

// non-constructor는 prototype 프로퍼티를 소유하지 않는다.
console.log(Person.hasOwnProperty("prototype")); // false

// non-constructor는 프로토타입을 생성하지 않는다.
consol.elog(Person.portotype); // undefined

//Es6의 메서드 축약 표현으로 정의한 메서드는 non-constructor이다.
const obj = {
  foo() {},
};

// non-constructor는 prototype프로퍼티를 소유하지 않는다.
console.log(obj.foo.hasOwnProperty("prototype")); // false

// non-constructor는 프로토타입을 생성하지 않는다.
console.log(obj.foo.prototype); // undefined
```

<aside>

모든 객체가 가지고 있는 ** proto ** 접근자 프로퍼티와 함수 객체만이 가지고 있는 prototype 프로퍼티는 결국 동일한 프로토타입을 가리킨다. 하지만 이들 프로퍼티를 사용하는 주체가 다르다.

![image.png](<19%E1%84%8C%E1%85%A1%E1%86%BC%20%E1%84%91%E1%85%B3%E1%84%85%E1%85%A9%E1%84%90%E1%85%A9%E1%84%90%E1%85%A1%E1%84%8B%E1%85%B5%E1%86%B8%20(1)%2020e0bd97ed348023a24fc86b874b0632/image%204.png>)

</aside>

```jsx
// 생성자 함수
function Person(name) {
  this.name = name;
}
const me = new Person("Lee");

//결국 Person.prototype과 me.__proto__는 결국 동일한 프로토타입을 가리킨다.
console.log(Person.prototype === me.__proto__); // true
```

![접근자 프로퍼티와 함수객체의 prototype프로퍼티는 동일한 프로토타입을 가진다.](<19%E1%84%8C%E1%85%A1%E1%86%BC%20%E1%84%91%E1%85%B3%E1%84%85%E1%85%A9%E1%84%90%E1%85%A9%E1%84%90%E1%85%A1%E1%84%8B%E1%85%B5%E1%86%B8%20(1)%2020e0bd97ed348023a24fc86b874b0632/image%205.png>)

접근자 프로퍼티와 함수객체의 prototype프로퍼티는 동일한 프로토타입을 가진다.

### 19.3.3 프로토타입의 constructor 프로퍼티와 생성자 함수

<aside>

모든 프로토타입은 constructor 프로퍼티를 갖는다.

이 constructor 프로퍼티는 prototype 프로퍼티로 자신을 참조하고 있는 생성자 함수를 가리킨다.

</aside>

```jsx
// 생성자 함수
function Person(name) {
  this.name = name;
}

const me = new Person("Lee");

// me 객체의 생성자 함수는 Person이다.
console.log(me.constructor === Person); // true
```

![image.png](<19%E1%84%8C%E1%85%A1%E1%86%BC%20%E1%84%91%E1%85%B3%E1%84%85%E1%85%A9%E1%84%90%E1%85%A9%E1%84%90%E1%85%A1%E1%84%8B%E1%85%B5%E1%86%B8%20(1)%2020e0bd97ed348023a24fc86b874b0632/image%206.png>)

**1. 객체 생성**

- Person 생성자 함수가 me 객체를 생성

**2. 프로토타입 연결**

- me 객체는 프로토타입의 constructor 프로퍼티를 통해 생성자 함수와 연결

**3. constructor 프로퍼티 확인**

- me 객체에는 constructor 프로퍼티가 없음
- me 객체의 프로토타입인 Person.prototype에는 constructor 프로퍼티가 있음

**4. 상속**

- me 객체는 Person.prototype의 constructor 프로퍼티를 상속받아 사용할 수 있음

## 19.4 리터럴 표기법에 의해 생성된 객체의 생성자 함수와 프로토타입

<aside>

- 생성자 함수에 의해 생성된 인스턴스는 프로토타입의 constructor프로퍼티에 의해 생성자 함수와 연결된다.
- constructor 프로퍼티가 가리키는 생성자 함수는 인스턴스를 생성한 생성자 함수다.
  ```jsx
  // object 객체를 생성한 생성자 함수는 Object다.
  const obj = new Object();
  console.log(obj.constructor === Object); // true

  // add 함수 객체를 생성한 생성자 함수는 Function이다.
  const add = new Function("a", "b", "return a+b");
  console.log(add.constructor === Function); // true

  // 생성자 함수
  function Person(name) {
    this.name = name;
  }

  // me 객체를 생성한 생성자 함수는 Person이다.
  const me = new Person("Lee");
  console.log(me.constructor === Person); // true
  ```

</aside>

<aside>

- 리터럴 표기법에 의한 객체 생성 방식과 같이 명시적으로 new 연산자와 함께 생성자 함수를 호출하여 인스턴스를 생성하지 않는 객체 생성 방식도 있다.

```jsx
//객체 리터럴
const obj = {}; // Object()
// obj.consturctor-> Object()

// 함수 리터럴
const add = function (a,b) {retrun a + b ;}; //Function()
// add.constructor -> Function()

// 배열 리터럴
const arr = [1, 2, 3]; // Array ()
// arr.constructor -> Array()

// 정규 표현식 리터럴
const regexp = is/ig; // RegExp()
//regexp.constructor -> RegExp()

참조형 데이터 : 리터럴로 만들어도 똑같이 생성자 함수 인스턴스로 인식이 된다.

참조형 데이터가 아닌 경우에는
const a = 'abc' // string
// a.constructor -> string
```

</aside>

<aside>

📌 추상연산

<aside>

추상연산은 ECMAScript 사양에서 내부 동작의 구현 알고리즘을 표현한 것이다.

</aside>

```jsx
// 2. Object 생성자 함수에 의한 객체 생성
// 인수가 전달되지 않았을 때 추상 연산 OrdinaryObjectCreate를 호출하여 빈 객체를 생성한다.
let obj = new Object();
console.log(obj); // {}

// 1. new.target이 undefined나 Object가 아닌 경우
// 인스턴스 -> Foo.prototype -> Object.prototype 순으로 프로토타입 체인이 생성된다.
class Foo extends Object {}
new Foo(); // Foo {}

// 3. 인수가 전달된 경우에는 인수를 객체로 변환한다.
// Number 객체 생성
obj = new Object(123);
console.log(obj); // Number{123}

// String 객체 생성
obj = new Object("123");
console.log(obj); // String{"123}
```

- 객체 리터럴이 평가될 때는 추상연산 OrdinaryObjectCreate를 호출하여 빈 객체를 생성하고 프로퍼티를 추가하도록 정의되어있다.
- Object 생성자 함수 호출과 객체 리터럴의 평가는 추상 연산 OrdinaryObjectCreate를 호출하여 빈 객체를 생성하는 점은 동일하나 세부 내용이 다르다. 따라서 객체 리터럴에 의해 생성된 객체는 Object 생성자 함수가 생성한 객체가 아니다.
</aside>

```jsx
// foo 함수는 Function 생성자 함수로 생성한 함수 객체가 아니라 함수 선언문으로 생성했다.
function foo() {}

// 하지만 consturctor 프로퍼티를 통해 확인해보면 함수 foo의 생성자 함수는 function 생성자 함수다.
console.log(foo.constructor === Function); // true
```

<aside>

리터럴 표기법에 의해 생성된 객체도 상속을 위해 프로토타입이 필요하다. 따라서 리터럴 표기법에 의해 생성된 객체도 가상적인 생성자 함수를 갖는다. 프로토타입과 생성자 함수는 단독으로 존재할 수 없고 언제나 쌍으로 존재한다.

</aside>

## 19.5 프로토타입의 생성 시점

<aside>

- 프로토타입은 생성자 함수가 생성되는 시점에 더불어 생긴다.
- 프로토타입과 생성자 함수는 쌍으로 존재하기 때문

<aside>

📌 Object.create 메서드와 클래스에 의한 객체 생성

Object.create 메서드와 클래스로 객체를 생성하는 방법이 있다.

Object.create 메서드와 클래스로 생성한 객체도 생성자 함수와 연결되어잇다.

</aside>

</aside>

### 19.5.1 사용자 정의 생성자 함수와 프로토타입 생성시점

<aside>

- 내부 메서드를 갖는 함수 객체, 화살표함수나 ES6의 메서드 축약 표현으로 정의하지 않고 일반함수로 정의한 함수 객체는 new 연산자와 함께 생성자 함수로서 호출할 수 있다.

⇒ 생성자 함수로서 호출할 수 있는 함수 즉 constructor는 함수 정의가 평가되어 함수 객체를 생성하는 시점에 프로토타입도 더불어 생성된다.

```jsx
// 함수 정의(constructor)가 평가되어 함수 객체를 생성하는 시점에 프로토타입도 더불어 생성된다.
console.log(Person.prototype); //

// 생성자 함수
function Person(name) {
  this.name = name;
}
```

</aside>

<aside>

- 생성자 함수로서 호출할 수 없는 함수 즉, non-constructor는 프로토타입이 생성되지 않는다.

```jsx
// 화살표 함수는 non-consturctor이다.
const Person = (name) => {
  this.name = name;
};

// non-constructor는 프로토타입이 생성되지 않는다.
console.log(Person.prototype); // undefined
```

</aside>

<aside>

![함수 객체로 생성되는 시점에 프로토타입도 더불어 생성되며, 생성된 프로토타입의 프로토타입은 언제나 Object.prototype이다. ](<19%E1%84%8C%E1%85%A1%E1%86%BC%20%E1%84%91%E1%85%B3%E1%84%85%E1%85%A9%E1%84%90%E1%85%A9%E1%84%90%E1%85%A1%E1%84%8B%E1%85%B5%E1%86%B8%20(1)%2020e0bd97ed348023a24fc86b874b0632/image%207.png>)

함수 객체로 생성되는 시점에 프로토타입도 더불어 생성되며, 생성된 프로토타입의 프로토타입은 언제나 Object.prototype이다.

</aside>

### 19.5.2 빌트인 생성자 함수와 프로토타입 생성시점

<aside>

- Object, String, Number, Function, Array, RegExp, Date, Promise 등과 같은 빌트인 생성자 함수도 일반함수와 마찬가지로 빌트인 생성자 함수가 생성되는 시점에 프로토타입이 생성된다.
</aside>

## 19.6 객체 생성 방식과 프로토타입의 결정

<aside>

### 객체 생성 방법

- 객체 리터럴
- Object 생성자 함수
- 생성자 함수
- Object.create 메서드
- 클래스(ES6)

⇒ 다양한 방식으로 생성된 모든 객체는 각 방식마다 세부적인 객체 생성방식의 차이는 있으나 추상연산 OrdinaryObjectCreate에 의해 생성된다.

프로토타입은 추상 연산 OrdinaryObjectCreate에 전달되는 인수에 의해 결정된다.

이 인수는 객체가 생성되는 시점에 객체 생성 방식에 의해 결정된다.

- 즉, 프로토타입은 추상 연산 OrdinaryObjectCreate에 전달되는 인수에 의해 결정된다.
</aside>

### 19.6.1 객체 리터럴에 의해 생성된 객체의 프로토타입

<aside>

- 객체리터럴에 의해 생성된 obj 객체는 Object.prototype을 프로토타입으로 갖게 되며, 이로써 Object.prototype을 상속받는다.
</aside>

```jsx
const obj = {x: 1};

// 객체 리터럴에 의해 생성된 obj 객체는 Object.prototype을 상속받는다.
console.log(obj.consturctor === Object); // true
console.log(obj.hasOwnProperty("x")); // tue
```

### 19.6.2 Object 생성자 함수에 의해 생성된 객체의 프로토타입

```jsx
const obj = new Object();
obj.x = 1;
```

⇒ 코드가 실행되면 추상연산 OrdinaryObjectCreate에 의해 Object 생성자 함수와 Object.prototype 과 생성된 객체 사이에 연결이 만들어진다.

Object 생성자 함수에 의해 생성된 obj 객체는 Object.prototype을 프로토타입으로 갖게되며, 이로써 Objsect.prototype을 상속받는다.

![image.png](<19%E1%84%8C%E1%85%A1%E1%86%BC%20%E1%84%91%E1%85%B3%E1%84%85%E1%85%A9%E1%84%90%E1%85%A9%E1%84%90%E1%85%A1%E1%84%8B%E1%85%B5%E1%86%B8%20(1)%2020e0bd97ed348023a24fc86b874b0632/image%208.png>)

### 19.6.3 생성자 함수에 의해 생성된 객체의 프로토타입

<aside>

- new연산자와 함께 생성자 함수를 호출하여 인스턴스를 생성하면 다른 객체 생성 방식과 마찬가지로 추상연산 OrdinaryObjectCreate가 호출된다.

```jsx
function Person(name) {
  this.name = name;
}

const me = new Person("Lee");
```

![image.png](<19%E1%84%8C%E1%85%A1%E1%86%BC%20%E1%84%91%E1%85%B3%E1%84%85%E1%85%A9%E1%84%90%E1%85%A9%E1%84%90%E1%85%A1%E1%84%8B%E1%85%B5%E1%86%B8%20(1)%2020e0bd97ed348023a24fc86b874b0632/image%209.png>)

추상 연산 OrdinaryObjectCreate에 의해 생성자 함수의 prototype프로퍼티에 바인딩되어있는 객체와 생성된 객체 사이에 연결이 만들어진다.

- 일반 객체와 같이 프로토타입에도 프로퍼티를 추가/삭제할 수 있다.

```jsx
function Person(name) {
  this.name = name;
}

// 프로토타입 메서드
Person.prototype.sayHello = function () {
  console.log("Hi! My name is ${this.name}");
};

const me = new Person("Lee");
const you = new Person("Kim");

me.sayHello(); // Hi! My name is Lee
you.sayHello(); // Hi! My name is Kim
```

![image.png](<19%E1%84%8C%E1%85%A1%E1%86%BC%20%E1%84%91%E1%85%B3%E1%84%85%E1%85%A9%E1%84%90%E1%85%A9%E1%84%90%E1%85%A1%E1%84%8B%E1%85%B5%E1%86%B8%20(1)%2020e0bd97ed348023a24fc86b874b0632/image%2010.png>)

person 생성자 함수를 통해 생성된 모든 객체는 프로토타입에 추가된 sayHello 메서드를 상속받아 자신의 메서드처럼 사용

</aside>
