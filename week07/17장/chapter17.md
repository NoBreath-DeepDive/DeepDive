# 17장 생성자 함수에 의한 객체 생성

목표: 다양한 객체 생성 방식 중에서 생성자 함수를 사용하여 객체를 생성하는 방식을 살펴보기

# 17.1 Object 생성자 함수

- new 연산자와 함께 object 생성자 함수를 호출하면 빈 객체를 생성하여 반환한다. 빈 객체를 생성한 이후 프로퍼티 또는 메서드를 추가하여 객체를 완성할 수 있다.

```jsx
// 빈 객체 생성 (person)
const person = new Object();

// 프로퍼티(속성) 추가
person.name = 'Lee';
person.sayHello = function(){
  console.log('Hi! My name is' + this.name);
}

console.log(person); // {name: "Lee", sayHello: f}
person.sayHello(); // Hi! My name is Lee
```

### 생성자 함수

- `생성자 함수` : new 연산자와 함께 호출하여 객체 (인스턴스)를 생성하는 함수
- `인스턴스` : 생성자 함수에 의새 생성된 객체

- 자바스크립트는 Object 생성자 함수 이외에도
`String`, `Number`, `Boolean`, `Function`, `Array`, `Date`, `RegExp`, `Promise`등의
빌트인 생성자 함수를 제공한다.

```jsx
// String 생성자 함수에 의한 String 객체 생성
const strObj = new String('Lee');
console.log(typeof strObj); // object
console.log(strObj); // [String: 'Lee']

// Number 생성자 함수에 의한 Number 객체 생성
const NumObj = new Number(123); 
console.log(typeof NumObj); //object
console.log(NumObj); // [Number: 123]

// Boolean 생성자 함수에 의한 Boolean 객체 생성
const boolObj = new Boolean(true); 
console.log(typeof boolObj); // object
console.log(boolObj); // [Boolean: true]

// Function 생성자 함수에 의한 Function 객체(함수) 생성
const func = new Function('x', 'return x * x'); 
console.log(typeof func); // function
console.dir(func); // f anonymous(x)

// Array 생성자 함수에 의한 Array 객체(배열) 생성
const arr = new Array(1,2,3); 
console.log(typeof arr); // object
console.log(arr); // [ 1, 2, 3 ]

// RegExp 생성자 함수에 의한 RegExp 객체(정규 표현식) 생성
const regExp = new RegExp(/ab+c/i); 
console.log(typeof regExp); // object
console.log(regExp); // /ab+c/i

// Date 생성자 함수에 의한 Date 객체 생성
const date = new Date(); 
console.log(typeof date); // object
console.log(date); // 2025-06-03T09:23:29.965Z
```

# 17.2 생성자 함수

## 17.2.1 객체 리터럴에 의한 객체 생성 방식의 문제점

<aside>
💡

단점: 

- 객체 리터럴에 의한 객체 생성 방식은 단 하나의 객체만 생성한다.
- 동일한 프로퍼티를 갖는 객체를 여러개 생성해야 하는 경우 매번 같은 프로퍼티를 기술해야 하기 때문에 비효율적
</aside>

```jsx
const circle1 = {
  radius: 5,
  getDiamerter(){
    return 2*this.radius;
  }
};

console.log(circle1.getDiamerter()); // 10

const circle2 = {
  radius: 10,
  getDiamerter(){
    return 2*this.radius;
  }
};

console.log(circle2.getDiamerter()); // 20
```

객체:

- `프로퍼티`를 통해 객체고유의 `상태` 를 표현
- `메서드`를 통해 상태 데이터인 프로퍼티를 참조하고 조작하는 `동작`을 표현

→ 따라서 프로퍼티는 개체마다 프로퍼티 값(radius)이 다를 수 있지만 메서드(getDiameter)는 내용이 동일한 경우가 일반적

하지만, 프로퍼티 구조가 동일함에도 불구하고 매번 같은 프로퍼티와 메서드를 기술해야 해서 번거롭다.

## 17.2.2 생성자 함수에 의한 객체 생성 방식의 장점

<aside>
💡

장점:

- 생섬자 함수에 의한 객체 생성 방식은 마치 객체(인스턴스)를 생성하기 위한 템플릿(클래스)처럼 생성자 함수를 사용하여 프로처티 구조가 동일한 객체 여러 개를 간편하게 생성할 수 있다.
</aside>

```jsx
// 생성자 함수
function Circle(radius){
  // 생성자 함수 내부의 this는 생성자 함수가 생성할 인스턴스를 가리킨다.
  this.radius = radius;
  this.getDiameter = function (){
    return 2 * this.redius;
  };
}

// 인스턴스 생성 
const circle1 = new Circle(5); // 반지름 5인 객체 생성
const circle2 = new Circle(10); // 반지름 10인 객체 생성

console.log(circle1.getDiamerter()); // 10
console.log(circle2.getDiamerter()); // 20
```

<aside>
📖

**this**

this는 객체 자신의 프로처티나 메서드를 참조하기 위한 자기 참조 변수다. 즉 this바인딩은 함수 호출 방식에 따라 동적으로 결정

- `this`는 **함수가 정의된 위치**가 아니라, **함수가 호출된 방식**에 따라 결정.
- 따라서 `this`를 예측하려면 항상 **함수가 어떻게 불렸는지**를 먼저 봐야 한다.

| 함수 호출  방식 | this가 가르키는 값 (this 바인딩) |
| --- | --- |
| 일반 함수로서 호출 | 전역 객체 |
| 메서드로서 호출 | 메서드를 호춣한 객체 ( 마침표 앞의 객체 ) |
| 생성자 함수로서 호출 | 생성자 함수가 (미래에) 생성할 인스턴스 |

```jsx
// 함수는 다양한 방식으로 호출될 수 있다.
function foo(){
  console.log(this);
}

// 일반적인 함수로서 호출
// 전역 객체는 브라우저 환경에서는 window. Node.js 환경에서는 global를 가르킨다.
foo(); // window

const obj = { foo }; // ES6 프로퍼티의 축약 표현

// 메서드로 호출
obj.foo(); // obj

// 생성자 함수로서 호출
const inst = new foo(); // inst
```

</aside>

**자바스크립에서의 생성자 함수**

- 일반 함수와 동일한 방법으로 생성자 함수를 정의하고 `new 연산자와 함께 호출하면 해당 함수는 생성자 함수로 동작` → 만약, new 연산자와 함께 생성자 함수를 호출하지 않으면 일반 함수로 동작한다

```jsx
// new 연산자와 함께 호출하지 않으면 생성자 함수로 동작 X -> 일반함수로 동작
const circle3 = Circle(15);

// 일반 함수로서 호출된 Circle은 반환문이 없으므로 암묵적으로 undefined를 반환
console.log(circle3); // undefined

// 일반 함수로서 호출된 Circle 내의 this는 전역 객체를 가리킨다.
console.log(radius); // 15
```

## 17.2.3 생성자 함수의 인스턴스 생성 과정

- 필수: 인스턴스를 생성
- 옵션: 생성된 인스턴스를 초기화 (인스턴스 프로퍼티 추가 및 초기값 할당)

```jsx
// 생성자 함수
function Circle(radius){
  // 인스턴스 초기화 (옵션)
  this.radius = radius;
  this.getDiameter = function(){
    return 2 * this.radius;
  };
}

// 인스턴스 생성
const circle1 = new Circle(5) // 반지름이 5인 객체를 생성
```

자바스크립트의 엔진은 `new 연산자와 함께 생성자 함수를 호출`하면 암묵적으로 인스턴스를 생성하고 인스턴스를 초기화 한 후 암묵적으로 인스턴스를 반환한다 (다른 언어는 반환하는 코드를 만들어 주어야 함)

### 1. 인스턴스 생성과 this 바인딩

암묵적으로 빈 객체 생성 (인스턴스) → 인스턴스는 this에 바인딩 (생성자 함수 내부의 this가 생성자 함수가 생성할 인스턴스를 가리키는 이유, 이 과정은 런타임 이전에 실행)

```jsx
function Circle(radius){
  // 1. 암묵적으로 인스턴스가 생성되고 this에 바인딩된다.
  console.log(this); // Circle{}
  
  this.radius = radius;
  this.getDiameter = function () {
    return 2 * this.redius;
  };
}
```

### 2. 인스턴스 초기화

this에 바인딩되어 있는 인스턴스에 프로퍼니나 메서드를 추가하고, 생성자 함수가 인수로 전달받은 초기값을 인스턴스 프로퍼티에 할당하여 초기화하거나 고정값을 할당한다 (개발자가 기술)

```jsx
function Circle(radius){
  // 1. 암묵적으로 인스턴스가 생성되고 this에 바인딩된다.

  // 2. this에 바인딩되어 있는 인스턴스를 초기화한다.
  this.radius = radius;
  this.getDiameter = function () {
    return 2 * this.redius;
  };
}
```

### 3. 인스턴스 반환

생성자 함수 내부에서 모든 처리가 끝나면 완성된 인스턴스가 바인딩된 this를 암묵적으로 반환한다.

```jsx
function Circle(radius){
  // 1. 암묵적으로 인스턴스가 생성되고 this에 바인딩된다.

  // 2. this에 바인딩되어 있는 인스턴스를 초기화한다.
  this.radius = radius;
  this.getDiameter = function () {
    return 2 * this.redius;
  };
  // 3. 완성된 인스턴스가 바인딩된 this가 암묵적으로 반환된다.
}

// 인스턴스 생성. Circle 생성자 함수는 암묵적으로 this를 반환한다.
const circle = new Circle(1);
console.log(circle); //Circle { radius: 1, getDiameter: [Function (anonymous)] }
```

만약, this가 명시적으로 반환하면 return문에 명시한 객체가 반환

```jsx
function Circle(radius){
  // 1. 암묵적으로 인스턴스가 생성되고 this에 바인딩된다.

  // 2. this에 바인딩되어 있는 인스턴스를 초기화한다.
  this.radius = radius;
  this.getDiameter = function () {
    return 2 * this.redius;
  };
  // 3. 완성된 인스턴스가 바인딩된 this가 암묵적으로 반환된다.
  // 명시적으로 객체를 반환하면 암묵적인 this 반환이 무시된다.
  return{};
}

// 인스턴스 생성. Circle 생성자 함수는 암묵적으로 this를 반환한다.
const circle = new Circle(1);
console.log(circle); //Circle { radius: 1, getDiameter: [Function (anonymous)] }
```

하지만 명시적으로 원시 값 반환하면 원시 값 반환은 무시되고, 암묵적으로 this가 반환된다.

```jsx
function Circle(radius){
  // 1. 암묵적으로 인스턴스가 생성되고 this에 바인딩된다.

  // 2. this에 바인딩되어 있는 인스턴스를 초기화한다.
  this.radius = radius;
  this.getDiameter = function () {
    return 2 * this.redius;
  };
  // 3. 완성된 인스턴스가 바인딩된 this가 암묵적으로 반환된다.
  // 명시적으로 원시 값울 반환하면 원시 값 반환은 무시되고 암묵적인 this가 반환된다.
  return 100;
}

// 인스턴스 생성. Circle 생성자 함수는 암묵적으로 this를 반환한다.
const circle = new Circle(1);
console.log(circle); //Circle { radius: 1, getDiameter: [Function (anonymous)] }
```

따라서 생성자 함수 내부에서 return 문을 반드시 생략해야 한다. ( 다른값을 반환하면 기본동작을 훼손하기 때문)

## 17.2.4 내부 메서드 [[Call]] 과 [[Construct]]

- 함수와 일반객체와의 공통점: `함수 객체`는 일반 객체가 가지고 있는 내부 슬롯과 내부 메서드를 모두 가지고 있기 때문에, 일반 객체와 동일하게 동작 할 수 있다

```jsx
// 함수는 객체다
function foo (){}

// 함수는 객체이므로 프로퍼티를 소유할 수 있다.
foo.prop = 10;

// 함수는 객체이므로 메서드를 소유할 수 있다.
foo.method = function(){
  console.log(this.prop);
};

foo.method(); // 10
```

- 함수와 일반객체와의 차이점: 일반 객체는 호출할 수 없지만, `함수는 호출 가능`

→ 함수 객체는 일반 객체가 가지고 있는 내부 슬롯과 내부 메서드는 물론, 함수로서 동작하기 위해 함수 객체만을 위한 [[Environment]], 과 [[FormalParmeters]] 등의 내부 슬롯과 [[Call]], [[Construct]] 같은 내부 메서드를 추가로 가지고 있다.

함수가 일반 함수로서 호출되면 함수 객체의 내부 메서드 [[Call]]이 호출되고 new 연산자와 함께 생성자 함수로서 호출되면 내부 메서드  [[Construct]] 가 호출된다.

```jsx
function foo(){

  // 일반적인 함수로서 호출 : [[Call]]이 호출된다.
  foo();

  // 생상자 함수로서 호출 :  [[Construct]]이 호출된다.
  new foo();
}
```

- 필수

내부 메서드 [[Call]] 을 갖는 함수 객체: callable

즉, 함수 객체는 반드시 callable이어야 한다. (모든 함수 객체는 [[Call]]을 갖고 있으므로 호출할 수 있다)

- 옵션

내부 메서드 [[Construct]]를 갖는 함수 객체 ( 생성자 함수 로서 호출 가능) : constructor

내부 메서드 [[Construct]]를 가지지 않는 함수 객체 ( 생성자 함수 로서 호출 불가능) : non-constructor

→ 즉, 모든 함수 객체는 호출할 수 있지만, 모든 함수 객체를 생성자 함수로서 호출할 수 있는 것은 아니다.

![스크린샷 2025-06-03 오후 10.22.53.png](attachment:be037049-7f00-4318-b00a-939824180580:스크린샷_2025-06-03_오후_10.22.53.png)

## 17.2.5 constructor와 non-constructor의 구분

자바스크립트 엔진은 함수 정의를 평가하여 함수 객체를 생성할 때 함수 정의 방식에 따라 함수를  constructor와 non-constructor 구분

- constructor : 함수 선언문, 함수 표현식, 클래스(클래스도 함수다)
- non-constructor : 메서드(ES6 메서드 축약 표현), 화살표 함수

이때, ECMAScript 사양에서 메서드로 인정하는 범위가 일반적인 의미의 메서드보다 좁다는 것이다.

```jsx
// 일반 함수 정의: 함수 선언문, 함수 표현식
function foo(){}
const bar = function(){};

// 프로퍼티 x의 값으로 할당된 것은 일반 함수로 정의된 함수다. 이는 메서드로 인정하지 않는다.
const baz = {
  x: function(){}
};

// 일반 함수로 정의된 함수만이 constructor다.
new foo(); // -> foo{}
new bar(); // -> bar{}
new baz(); // -> x {}

// 화살표 함수 정의
const arrow = ()=>{}
new arrow(); // 타입에러: arrow is not a constructor

// 메서드 정의 ES6의 메서드 축약 표현만 메서드로 인정한다
const obj = {
  x() {}
};

new obj.x(); // 타입에러: obj.x is not a constructor
```

즉, 함수 선언문과 함수 표현식으로 정의된 함수만이 constructor 이고, ES6의 화살표 함수와 메서드 축약 표현으로 정의된 함수는 non-constructor이다.

함수를 일반 함수로서 호출: 함수 객체 내부 메서드 [[Call]]이 호출

new 연산자와 함께 생성자 함수로서 호출하면 내부 메서드  [[Construct]]가 호출

→ non-constructor인 함수 객체를 생성자 함수로서 호출하면 에러 발생

## 17.2.6 new 연산자

생성자 함수로 동작 이때,   [[Construct]]가 호출 → constructor이어야 함

```jsx
// 생성자 함수로서 정의하지 않은 일반 함수
function add(x,y){
  return x+y;
}

// 생성자 함수로서 정의하지 않은 일반 함수를 new연산자와 함께 호출
let inst = new add();

// 함수가 객체를 반환하지 않았으므로 반환문 무시 -> 빈 객체 생성
console.log(inst); //{}

// 객체를 반환하는 일반 함수
function createUser(name,role){
  return{name, role}
}

// 일반 함수를 new연산자와 함께 호출
inst = new createUser('Lee', 'admin');
// 함수가 생성한 객체 반환
console.log(inst); // { name: 'Lee', role: 'admin' }
```

반대로 new가 없으면 일반 함수로 호출 이때  [[Call]]이 호출

```jsx
// 생성자 함수
function Circle(radius){
  this.radius = radius;
  this.getDiameter = function () {
    return 2 * this.redius;
  };
}

// new 연산자 없이 생성자 함수 호출하면 일반 함수로서 호출된다.
const circle = Circle(5);
console.log(circle);

// 일반 함수 내부의 this는 전역 객체 window를 가리킴
console.log(radius); // 5
console.log(getDiameter()); // 10

circle.getDiameter(); // TypeError: Cannot read properties of undefined
```

Circle 함수는 일반 함수로서 호출되어서 함수 내부의 this는 window를 가르킨다

→ radius와 getDiameter메서드는 접역 객체의 프로퍼티와 메서드가 된다

## 17.2.7 new.target

생성자 함수가 new 연산자 없이 호출되는 것을 방지하기 위해 ES6에서는 new.target을 지원

- new연산자와 함께 생성자 함수로서 호출되면 함수 내부의 new.target은 함수 자신을 가리킨다.
- new 연산자 없이 일반 함수로서 호출된 함수 내부의 new.target은 nudefined이다

```jsx
// 생성자 함수
function Circle(radius){
  // 이 함수가 new 연산자와 함게 호출되지 않았다면 new.target은 undefined
  if(!new.target){
    // new 연산자와 함께 생성자 함수를 재귀 호출하여 생성된 인스턴스를 반환한다.
    return new Circle(radius);
  }
  this.radius = radius;
  this.getDiameter = function(){
    return 2 * this.radius;
  };
}

// new 연산자 없이 생성자 함수를 호출하여도 new.target을 통해 생성자 함수 호출
const circle = Circle(5);
console.log(circle.getDiameter());
```

<aside>
📖

스코프 세이프 생성자 패턴 

new.target을 사용할 수 없을 때 사용

```jsx
// Scope-Safe Constructor Pattern

// 생성자 함수가 new 없이 호출되어도 정상적으로 동작하게 만드는 안전한 패턴
function Circle(radius) {
  // instanceof를 사용해 this가 Circle의 인스턴스인지 확인
  // 만약 new 없이 호출됐다면 this는 전역 객체 또는 undefined(strict mode)
  if (!(this instanceof Circle)) {
    // new 없이 호출된 경우, new를 붙여서 다시 호출 → 재귀적으로 안전하게 호출
    return new Circle(radius);
  }

  // new로 정상 호출된 경우 this는 새로 생성된 인스턴스를 가리킴
  this.radius = radius;

  // 인스턴스 메서드 정의: 반지름을 기반으로 지름을 계산
  this.getDiameter = function () {
    return 2 * this.radius;
  };
}

// new 연산자 없이 생성자 함수를 호출
const circle = Circle(5); // new 없이 호출해도 내부에서 new Circle(5)로 재호출됨
console.log(circle.getDiameter()); //10

```

</aside>

### 빌트인 생성자 함수

- Object, Function 생성자 함수는 new연산자 없이 호출해도 new 연산자와 함께 호출했을 때와 동일하게 동작

```jsx
let obj = new Object();
console.log(obj); // {}

obj = Object();
console.log(obj); // {}

let f = new Function('x', 'return x ** x');
console.log(f); // [Function: anonymous]

f = Function('x', 'return x ** x');
console.log(f); // [Function: anonymous]
```

- String, Number, Boolean 생성자 함수는 new 연산자와 함께 호출했을 때, String, Number, Boolean 객체를 생성하여 반환하지만 `new연산자 없이 호출하면 데이터 타입을 변환`함

```jsx
const str = new String(123);
console.log(str, typeof str); //[String: '123']

const num = new Number('123');
console.log(num, typeof num); // [Number: 123]

const bool = new Boolean('true');
console.log(bool, typeof bool); // [Boolean: true]
```