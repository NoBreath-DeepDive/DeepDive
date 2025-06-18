# 21장 빌트인 객체

날짜: 2025년 6월 18일

# 21.1 자바스크립트 객체의 분류

<aside>
💡

자바스크립트 내에서의 객체는 다음과 같이 크게 3가지의 객체로 분류할 수 있다.

1. 표준 빌트인 객체
    
     ⇒ ECMAScript 사양에 정의된 객체이다.
    
2. 호스트 객체
⇒ ECMAScript 사양에 정의되어 있지 않지만 자바스크립트 실행 환경에서 추가로 제공하는 객체를 말한다.

3. 사용자 정의 객체

 ⇒ 표준 빌트인 객체와 호스트 객체처럼 기본 제공되는 객체가 아닌 사용자가 직접 정의한 객체를 말한다.

</aside>

# 21.2 표준 빌트인 객체

<aside>
💡

자바스크립트에서는 Object, String, Number, Boolean, Symbol 등 **40여 개의 표준 빌트인 객체**를 제공한다.

Math, Reflect, JSON을 제외한 표준 빌트인 객체는 모두 인스턴트를 생성할 수 있는 생성자 함수 객체이다.

따라서 표준 빌트인 객체인 String, Number, Boolean, Function, Array, Date는 생성자 함수로 호출하여 인스턴스를 생성할 수 있다 !

</aside>

[ 예제 21- 01 ]

```jsx
//String 생성자 함수에 의한 String 객체 생성
const strObj = new String('Lee'); // String {"Lee"}
console.log(typeof strObj); // object

// Number 생성자 함수에 의한 Number 객체 생성
const numObj = new Number(123); // Number {123}
console.log(typeof Number); // object

// Boolean 생성자 함수에 의한 Boolean 객체 생성
const boolObj = new Boolean(true); // Boolean {true}
console.log(typeof boolObj); //object

// Function 생성자 함수에 의한 Function 객체(함수) 생성
const func = new Function('x', 'return x * x'); // f anonymous(x)
console.log(typeof func); //function

// Array 생성자 함수에 의한 RegExp 객체 (정규 표현식) 생성
const regExp = new RegExp(/ab+c/i); // /ab+c/i
console.log(typeof regExp); // object

// Date 생성자 함수에 의한 Date 객체 생성
const date = new Date(); // Fri May 08 2020 10:43:25 GMT+0900 (대한민국 표준시)
console.log(typeof date); // object
```

<aside>
💡

생성자 함수인 표준 빌트인 객체가 생성한 인스턴스의 프로토타입은 표준 빌트인 객체의 prototype 프로퍼티에 바인딩된 객체이다.

따라서, 표준 빌트인 객체의 프로토타입에 있는 다양한 기능의 빌트인 프로토타입 메서드를 사용할 수 있다 !

</aside>

[ 예제 21-02 ]

```jsx
// String 생성자 함수에 의한 String 객체 생성
const strObj = new String('Lee'); // String("Lee")

// String 생성자 함수를 통해 생성한 strObj 객체의 프로토타입은 String.prototype 이다.
console.log(Object.getprototypeOf(strObj) === String.prototype); // true
```

[ 예제 21 - 03 ]

```jsx
// Number 생성자 함수에 의한 Number 객체 생성
const numObj = new Number(1,5); // Number(1,5)

// toFixed는 Number.prototype의 프로토타입 메서드다.
// Number.prototype.toFixed는 소수점 자리를 반올림하여 문자열로 반환한다.
console.log(numObj.toFixed()); // 2

// isInteger는 Number의 정적 메서드이다.
// Number.isInteger는 인수가 정수(integer)인지 검사하여 그 결과를 Boolean으로 반환한다.
console.log(Number.isInteger(0.5)); // false
```

# 21.3 원시값과 래퍼 객체

<aside>
💡

원시값은 객체가 아니므로 프로퍼티나 메서드를 가질 수 없다. 

</aside>

[ 예제 21 - 04 ]

```jsx
const str = 'hello';

// 원시 타입인 문자열이 프로퍼티와 메서드를 갖고 있는 객체처럼 동작한다.
console.log(str.length); // 5
console.log(str.toUpperCase()); // HELLO
```

[ 예제 21 - 05 ]

```jsx
const str = 'hi';

// 원시 타입인 문자열이 래퍼 객체인 String 인스턴스로 변환된다.
console.log(str.length); // 2
console.log(str.toUpperCase()); // HI

// 래퍼 객체로 프로퍼티에 접근하거나 메서드를 호출한 후, 다시 원시값으로 되돌린다.
console.log(typeof str); // string
```

<aside>
🤔

원시 값인 문자열을 가지고 있는 str이 str.length, str.toUpperCase() 처럼 객체로 동작하고 있다.

그 이유는 바로 !!!!

- 자바스크립트는 몰래 처리해주는 것을 좋아한다….. (변태일 수도..)
    1. `str.length` 같은 접근이 일어나면,
    2. **자바스크립트 엔진이 임시로 `new String(str)`을 생성**함 → 이게 바로 **래퍼 객체(임시 객체)**.
    3. 이 래퍼 객체는 `String.prototype`에 접근할 수 있어서 `length`나 `toUpperCase()` 같은 메서드를 사용할 수 있다.
    4. 그걸 실행한 후에는 → **임시 객체는 사라지고** 다시 원시값만 남음.
</aside>

[ 예제 21 - 06 ]

```jsx
// 1. 식별자 str은 문자열을 값으로 가지고 있다.
const str = 'hello';

// 2. 식별자 str은 암묵적으로 생성된 래퍼 객체를 가리킨다.
// 식별자 str의 값 'hello'는 래퍼 객체의 [[StringData]] 내부 슬롯에 할당된다.
// 래퍼 객체의 name 프로퍼티가 동적 추가된다.
str.name = 'Lee';

// 3. 식별자 str은 다시 원래의 문자열, 즉 래퍼 객체의 [[StringData]] 내부 슬롯에 할당된 
// 원시값을 갖는다.
// 이때 2.에서 생성된 래퍼 객체는 아무도 참조하지 않는 상태이므로 가비지 컬렉션의 대상이 됨.

// 4. 식별자 str은 새롭게 암묵적으로 생성된(2.에서 생성된 래퍼 객체와는 다른) 래퍼 객체를 가리킴
/// 새롭게 생성된 래퍼 객체에는 name 프로퍼티가 존재하지 않는다.
cconsole.log(str.name); // undefined

/// 5. 식별자 str은 다시 원래의 문자열, 즉 래퍼 객체의 [[StringData]] 내부 슬롯에 할당된 원시값을 갖는다.
/// 이때 4.에서 생성된 래퍼 객체는 아무도 참조하지 않는 상태이므로 가비지 컬렉션의 대상이 된다.
cconsole.log(typeof str, str); // string hello
```

[ 예제 21 - 07 ]

```jsx
const num = 1.5;

// 원시 타입인 숫자가 래퍼 객체인 Number 객체로 변환된다.
console.log(num.toFixed()); // 2

// 래퍼 객체로 프로퍼티에 접근하거나 메서드를 호출한 후, 다시 원시값으로 되돌린다.
console.log(typeof num, num); // Number 1.5
```

<aside>
💡

자바스크립트가 래퍼 객체(임시 객체)로 잠시 바꾸어 주지만 래퍼 객체일지라도 위 예제들처럼 객체에 접근하여 값을 추가하거나 객체의 프로토타입 메서드를 사용한다 하더라도 처리 작업이 종료되면 원시값의 값만 남기고 나머지는 가비지 컬렉터에 추가된다 !

</aside>

# 21.4 전역 객체

<aside>
💡

전역 객체는 코드가 실행되기 이전 단계에 자바스크립트 엔진에 의해 어떤 객체보다도 먼저 생성되는 특수한 객체이며, 어떤 객체에도 속하지 않은 최상위 객체다.

브라우저 환경에서는 window(또는 self, this, frams)가 전역 객체를 가리키지만 Node.js 환경에서는 global이 전역 객체를 가리킨다.

</aside>

[ 예제 21 - 08 ]

```jsx
// globalThis는 브라우저 환경과 Node.js환경에서 전역 객체를 가리키던 다양한 식별자를 통일한 식별자.
// globalThis는 표준 사양이므로 ECMAScript 표준 사양을 준수하는 모든 환경에서 사용할 수 있다.

// 브라우저 환경
globalThis === this // true
globalThis === window // true
globalThis === self // true
globalThis === frams // true

// Node.js 환경(12.0.0 이상)
globalThis === this // true
globalThis === global // true
```

<aside>
💡

전역 객체는 계층적 구조상 어떤 객체에도 속하지 않은 모든 빌트인 객체의 최상위 객체이다.

전역 객체가 최상위 객체라는 것은 프로토타입 상속 관계상에서 최상위 객체라는 의미가 아니다.

전역 객체 자신은 어떤 객체의 프로퍼티도 아니며 객체의 계층적 구조상 표준 빌트인 객체와 호스트 객체를 프로퍼티로 소유한다는 것을 말한다.

전역 객체의 특징
1. 개발자가 의도적으로 생성할 수 없다. 즉, 전역 객체를 생성할 수 있는 생성자 함수가 제공X
2. 프로퍼티를 참조할 때 window(or global)을 생략할 수 있다.

</aside>

[ 예제 21 - 09 ]

```jsx
// 문자열 "F"를 16진수로 해석하여 10진수로 변환하여 변환한다.
window.parseInt('F',16); // -> 15

// window.parseInt는 parseInt로 호출할 수 있다.
parseInt('F',16); // -> 15

window.parseInte === parseInt; // true
```

<aside>
💡

1. Object, String,Number 등과 같은 모든 표준 빌트인 객체를 프로퍼티로 가지고 있다.
2. 자바스크립트 실행환경에 따라 추가적으로 프로퍼티와 메서드를 갖는다. 브라우저 환경에서는 DOM, BOM, Canvas 등과 같은 클라이언트 사이드 Web API를 호스트 객체로 제공하고 Node.js에서는 고유의 API를 호스트 객체로 제공한다.
3. var 키워드로 선언한 전역 변수와 선언하지 않은 변수에 값을 할당한 암묵적 전역, 그리고 전역 함수는 전역 객체의 프로퍼티가 된다.
</aside>

[ 예제 21 - 10 ]

```jsx
// var 키워드로 선언한 전역 변수
var foo = 1;
console.log(window.foo); // 1

// 선언하지 않은 변수에 값을 암묵적 전역, bar는 전역 변수가 아니라 전역 객체의 프로퍼티다.
bar = 2; // window.bar = 2
console.log(window.bar); // 2

// 전역 함수 
function baz() { return 3; }
console.log(window.baz()); // 3
```

<aside>
💡

1. let이나 const 키워드로 선언한 전역 변수는 전역 객체의 프로퍼티가 아니다. 즉 window, foo와 같이 접근할 수 없다. let이나 const 키워드로 선언한 전역 변수는 보이지 않은 개념적인 블록(전역 렉시컬 환경)내에 존재하게 된다. !
</aside>

[ 예제 21 - 11 ]

```jsx
let foo = 123;
console.log(window.foo); // undefined
```

<aside>
💡

브라우저 환경의 모든 자바스크립트 코드는 하나의 전역 객체 window를 공유한다. 

</aside>

## 21.4.1 빌트인 전역 프로퍼티

<aside>
💡

빌트인 전역 프로퍼티는 전역 객체의 프로퍼티를 의미한다. 주로 애플리케이션 전역에서 사용하는 값을 제공한다.

</aside>

### Infinity

⇒ 무한대를 나타내는 숫자값 Infinity를 갖는다.

[ 예제 21 - 12 ]

```jsx
// 전역 프로퍼티는 window를 생략하고 참조할 수 있다.
console.log(window.Infinity === Infinity); // true

// 양의 무한대
console.log(3/0); // Infinity

// 음의 무한대
console.log(-3/0); // Infinity

// Infinity는 숫자값이다.
console.log(typeof Infinity); // number
```

### NaN

⇒ 숫자가 아님(Not-a-Number)을 나타내는 숫자값 NaN을 갖는다. NaN 프로퍼티는 Number-NaN 프로퍼티와 같다.

[ 예제 21 - 03 ] 

```jsx
console.log(window.NaN); // NaN

console.log(Number('xyz')); // NaN
console.log(1 * 'string); //NaN
console.log(typeof NaN); // number
```

### **undefined**

⇒ undefined 프로퍼티는 원시타입 undefined를 값으로 갖는다.

[ 예제 21 - 14 ]

```jsx
console.log(window.undefined); // undefined

var foo;
console.log(foo); //undefined
console.log(typeof undefined); // undefined
```

## 21.4.2 빌트인 전역 함수

### eval

<aside>
💡

eval 함수는 자바스크립트 코드를 나타내는 문자열을 인수로 전달받는다.

전달받은 문자열 코드가 표현식이라면 eval 함수는 문자열 코드를 런타임에 평가하여 값을 생성하고 표현식이 아닌 문은 문자열 코드를 런타임에 실행한다. 문자열 코드가 여러 개의 문으로 이루어져 있다면 모든 문을 실행한다.

eval(”console.log(1+2);”);  이런 식이 있다면 console.log안의 표현식을 실행해주는 함수 !

결론. 
eval() 함수는 자바스크립트에서 문자열로 된 자바스크립트 코드를 실행할 수 있는 함수이다.
하지만, **안쓰이는 함수**이다.(보안, 성능, 디버깅 어려움 때문에 이러한 함수가 있다 정도만~)

</aside>

```jsx
/**
	* 주어진 무자열 코드를 런타임에 평가 또는 실행한다.
	* @param {string} code - 코드를 나타내는 문자열
	* @returns {*} 문자열 코드를 평가/실행한 결과값
	*/
eval(code)
```

[

 예제 21 - 15 ]

```jsx
// 표현식인 문
eval('1+2;'); // -> 3
// 표현식이 아닌 문
eval('var x = 5;'); // -> undefined

//eval 함수에 의해 런타임에 변수 선언문이 실행되어 x 변수가 선언되었다.
console.log(x); // 5

// 객체 리터럴은 반드시 괄호로 둘러싼다.
const o = eval('({ a: 1})');
console.log(o); // {a: 1}

// 함수 리터럴은 반드시 괄호로 둘러싼다.
const f = eval('(function() { return: 1; })');
console.log(f()); // 1
```

[ 예제 21 - 16 ]

```jsx
eval('1 + 2; 3 + 4l'); // -> 7
// 인수로 전달받은 문자열 코드가 여러 개의 문으로 이루어져 있다면 모든 문을 실행한 다음,
// 마지막 결과값을 반환한다.
```

[ 예제 21 - 17 ] 

```jsx
const x = 1;

function foo() {
	// eval 함수는 런타임에 foo 함수의 스코프를 동적으로 수행한다.
	eval('var x = 2;');
	console.log(x); // 2
}

foo();
console.log(x); // 1
```

<aside>
💡

eval 함수는 자신이 호출된 위치에 해당하는 기존의 스코프를 런타임에 동적으로 수행한다. 

위 코드는 foo 안에 var x =2 가 선언된 것처럼 된다.

하지만 , strict mode(엄격 모드)에서는 eval 함수는 기존의 스코프를 수정하지 않고 eval 함수 자신의 자체적인 스코프를 생성한다. 

쉽게 말하자면 ! strict mode에서는 eval(’var x = 2;’) 가 eval 함수 내에서만 선언된다는 말과 같다.

</aside>

[ 예제 21 - 18 ] 

```jsx
const x = 1;

function foo() {
	'use strict';
	
	// strict mode에서 eval 함수는 기존의 스코프를 수정하지 않고 eval 함수 자신의 자체적인
	// 스코프를 생성한다.
	eval('var x = 2; console.log(x);'); // 2
	console.log(x); // 1
}

foo();
console.log(x); // 1
```

[ 예제 21 - 19 ]

```jsx
const x = 1;

function foo() {
	eval('var x = 2; console.log(x);'); // 2
	// let, const 키워드를 사용한 변수 선언문은 strict mode가 적용된다.
	eval('const x = 3; console.log(x);'); // 3
	console.log(x); // 2
}

foo();
console.log(x); // 1
```

### isFinite

```jsx
/**
	* 전달받은 인수가 유한수인지 확인하고 그 결과를 반환한다.
	* @param {number} textValue - 검사 대상 값
	* @return {boolean} 유한수 여부 확인 결과
	*/
isFinite(textValue)
```

[ 예제 21 - 20 ] 

```jsx
// 인수가 유한수이면 true를 반환한다.
isFinite(0); // -> true
isFinite(2e64); // -> true
isFinite('10'); // -> true: '10' -> 10
isFinite(null); // -> true: null -> 0

// 인수가 무한수 또는 NaN으로 평가되는 값이라면 false를 반환한다.
isFinite(Infinity); // -> false
isFinite(-Infinity); // -> false

// 인수가 NaN으로 평가되는 값이라면 false를 반환한다.
isFinite(NaN); // -> false
isFinite('Hello'); // -> false
isFinite('2005/12/12'); // -> false
```

[ 예제 21 - 21 ]

```jsx
console.log(+null); // 0 null을 숫자로 변환 (null = 0)하여 검사를 수행했기 때문에 true 인것 !
```

### isNaN

is-Not-A-Number 이것은 숫자가 아니지 !?

```jsx
/**
	* 주어진 숫자가 NaN인지 확인하고 그 결과를 반환한다.
	* @param {number} testValue - 검사 대상 값
	* @returns {boolean} NaN 여부 확인 결과
	*/
isNaN(testValue)
```

[ 예제 21 -22 ]

```jsx
// 숫자
isNaN(NaN); // -> true
isNaN(10); // -> false

// 문자열
isNaN('blabla'); // -> true: 'blabla' => NaN
isNaN('10'); // -> false: '10' => 10
isNaN('10.12'); // -> false: '10.12' => 10.12
isNaN(''); // -> false: '' => 0
isNaN(' '); // -> false: '  ' => 0

// 불리언
isNaN(true); // -> false: true -> 1
isNaN(null); // -> false: null -> 0

// undefined
isNaN(undefined); // -> true: undefined => NaN

// 객체
isNaN({}); // -> true: {} => NaN

// date
isNaN(new Date()); // -> false: new Date() => Number
isNaN(new Date().toString()); // -> true: String => NaN
```

### parseFloat

```jsx
/**
	* 전달받은 문자열 인수를 실수로 해석하여 반환한다.
	* @param {string} string - 변환 대상 값
	* @returns {number} 반환 결과
	*/
parseFloat(string)
```

[ 예제 21 - 23 ]

```jsx
// 문자열을 실수로 해석하여 반환한다.
parseFloat('3.14'); // -> 3.14
parseFloat('10.00'); // -> 10

// 공백으로 구분된 문자열은 첫 번째 문자열만 변환한다.
parseFloat('34 45 66'); // -> 34
parseFloat('40 years'); // -> 40

// 첫 번째 문자열을 숫자로 변환할 수 없다면 NaN을 반환한다.
parseFloat('He was 40'); // -> NaN

// 앞뒤 공백은 무시된다.
parseFloat(' 60 '); // -> 60
```

### parseInt

```jsx
/**
	* 전달받은 문자열 인수를 정수로 해석하여 반환한다.
	* @param {string} string - 변환 대상 값
	* @param {number} [radix] - 진법을 나타내는 기수(2 ~ 36, 기본값 10)
	* @returns {number} 변환 결과
	*/
parseInt(string, radix);
```

[ 예제 21 - 24 ]

```jsx
// 문자열을 정수로 해석하여 반환한다.
parseInt('10'); // -> 10
parseInt('10.123'); // -> 10
```

[ 예제 21 - 25 ] 

```jsx
parseInt(10); // -> 10
parseInt(10.123); // -> 10
```

[ 예제 21 -26 ]

```jsx
// 10을 10진수로 해석하고 그 결과를 10진수 정수로 반환한다.
parseInt('10'); // -> 10
// '10'을 2진수로 해석하고 그 결과를 10진수 정수로 반환한다.
parseInt('10',2); // -> 2
// '10'을 8진수로 해석하고 그 결과를 10진수 정수로 반환한다.
parseInt('10', 8); // -> 8
// '10'을 16진수로 해석하고 그 결과를 10진수 정수로 반환한다.
parseInt('10',16); // -> 16
```

[ 예제 21 - 27 ]

```jsx
// .tostring으로 10진수 숫자를 해당 기수 문자열로 변환할 수 있다.
const x = 15;

// 10진수 15를 2진수로 변환하여 그 결과를 문자열로 반환한다.
x.toString(2); // -> '1111'
// 문자열 '1111'을 2진수로 해석하고 그 결과를 10진수 정수로 반환한다.
parseInt(x.toString(2), 2); // -> 15 

// 10진수 15를 8진수로 변환하여 그 결과를 문자열로 반환한다.
x.toString(8); // -> '17'
// 문자열 '17'을 8진수로 해석하고 그 결과를 10진수 정수로 반환한다.
parseInt(x.toString(8),8); // -> 15

// 10진수 15를 16진수로 변환하여 그 결과를 문자열로 반환한다.
x.toString(16); // -> 'f'
// 문자열 'f'를 16진수로 해석하고 그 결과를 10진수 정수로 반환한다.
parseInt(x.toString(16),16); // -> 15

// 숫자값을 문자열로 반환한다.
x.toString(); // -> '15'
// 문자열 '15'를 10진수로 해석하고 그 결과를 10진수 정수로 반환한다.
parseInt(x.toString()); // -> 15
```

[ 예제 21 - 28 ]

```jsx
// 인수로 진법을 나타내는 기수를 지정하지 않더라도 첫 번째 인수로 전달된 문자열이 "0x" 또는 
// "0X"로 시작하는 16진수 리터럴이라면 16진수로 해석하여 10진수 정수로 반환한다.

// 16진수 리터럴 '0xf'를 16진수로 해석하고 10진수 정수로 그 결과를 반환한다.
parseInt('0xf'); // -> 15
// 위 코드와 같다.
parseInt('f', 16); // -> 15
```

[ 예제 21 - 29 ]

```jsx
// 2진수 리터럴(0b로 시작)은 제대로 해석하지 못한다. 0 이후가 무시된다.
parseInt('0b10'); // -> 0
// 8진수 리터럴(ES6에서 도입. 0o로 시작)은 제대로 해석하지 못한다. 0 이후가 무시된다.
parseInt('0o10'); // -> 0

// 하지만 2진수 리터럴과 8진수 리터럴은 제대로 해석하지 못한다.
```

<aside>
💡

ES5 이전까지는 비록 사용을 금지하고 있었지만 “0”으로 시작되는 숫자를 8진수로 해석했다.

ES6부터는 “0”으로 시작하는 숫자는 8진수로 해석하지 않고 10진수로 해석한다. 따라서 문자열을 8진수로 해석하려면 지수를 반드시 지정해야 한다. !

</aside>

[ 예제 21 - 30 ]

```jsx
// 문자열 '10'을 2진수로 해석한다.
parseInt('10',2); // -> 2
// 문자열 '10'을 8진수로 해석한다.
parseInt('10',8); // -> 8
```

[ 예제 21 - 31 ]

```jsx
// 첫 번째 인수로 전달한 문자열의 첫 번째 문자가 해당 지수의 숫자로 변환될 수 없다면 NaN을 반환
// 'A'는 10진수로 해석할 수 없다.
parseInt('A0'); // -> NaN
// '2'는 2진수로 해석할 수 없다.
parseInt('20',2); // -> NaN
```

[ 예제 21 - 32 ]

```jsx
// 10진수로 해석할 수 없는 'A' 이후의 문자는 모두 무시된다.
parseint('1A0'); // -> 1
// 2진수로 해석할 수 없는 '2' 이후의 문자는 모두 무시된다.
parseInt('102', 2); // -> 2
// 8진수로 해석할 수 없는 '8' 이후의 문자는 모두 무시된다.
parseInt('58',8); // -> 5
// 16진수로 해석할 수 없는 'G' 이후의 문자는 모두 무시된다.
parseInt("FG', 16); // -> 15
```

[ 예제 21 - 33 ]

```jsx
// 공백으로 구분된 문자열은 첫 번째 문자열만 변환한다.
parseInt('34 45 66'); // -> 34
parseInt('40 years'); // -> 40
// 첫 번째 문자열을 숫자로 변환할 수 없다면 NaN을 반환한다.
parseint('He was 40'); // -> NaN
// 앞뒤 공백은 무시된다.
parseInt(' 60 '); // -> 60
```

### encodeURI / decodeURI

<aside>
💡

encodeURI 함수는 완전한 URI를 문자열로 전달받아 이스케이프 처리를 위해 인코딩한다.

URI는 인터넷에 있는 자원을 나타내는 유일한 주소를 말한다.

URI 하위개념으로 URL, URN이 있다.

</aside>

```jsx
/**
	* 완전한 URI를 문자열로 전달받아 이스케이프 처리를 위해 인코딩한다.
	* @param {string} uri - 완전한 URI
	* @returns {string} 인코딩된 URI
	*/
encodeURI(uri)
```

<aside>
💡

인코딩이란 URI의 문자열을 이스케이프 처리하는 것을 의미한다 !

이스케이프 처리란?

⇒ 네트워크를 통해 정보를 공유할 때 어떤 시스템에서도 읽을 수 있는 아스키 문자 셋으로 변환하는 것이다.

URI 문법 형식 표준 BFC3986에 따르면 URL은 아스키 문자 셋으로만 구성되어야 하며 한글을 포함한 대부분의 외국어나 아스키 문자 셋에 정의되지 않은 특수 문자의 경우 URL에 포함될 수 없다. 따라서 URL 내에서 의미를 갖고 있는 문자(%, ?, #)나 URL에 올 수 없는 문자(한글, 공백 등) 또는 시스템에 의해 해석될 수 있는 문자(<, >)를 이스케이프 처리하여 야기될 수 있는 문제를 예방하기 위해 이스케이프 처리가 필요하다 !

</aside>

[ 예제 21 - 34 ]

```jsx
// 완전한 URI
const uri = 'http://example.com?name=이웅모&job=programer&teacher';

// encodeURI 함수는 완전한 URI를 전달받아 이스케이프 처리를 위해 인코딩한다.
const enc = encodeURI(uri);
console.log(enc); 
// http://example.com?name=%EC%9D%B4%EC%9B%85%EB%AA%AB&job=programer&teacher
```

<aside>
💡

decodeURI 함수는 인코딩된 URI를 인수로 전달받아 이스케이프 처리 이전으로 디코딩한다.

</aside>

```jsx
/**
	* 인코딩된 URI를 전달받아 이스케이프 처리 이전으로 디코딩한다.
	* @param {string} encodedURI - 인코딩된 URI
	* @returns {string} 디코딩된 URI
	*/
decodeURI(encodedURI)
```

[ 예제 21 - 35 ]

```jsx
const uri = 'http://example.com?name=이웅모&job=programer&teacher';

// encodeURI 함수는 완전한 URI를 전달받아 이스케이프 처리를 위해 인코딩한다.
const enc = encodedURI(uri);
console.log(enc);
// http://example.com?name=%EC%9D%B4%EC%9B%85%EB%AA%AB&job=programer&teacher

// decodeURI 함수는 인코딩된 완전한 URI를 전달받아 이스케이프 처리 이전으로 디코딩한다.
const dec = decodeURI(enc);
console.log(dec);
// http://example.com?name=이웅모&job=programmer&teacher
```

### encodeURIComponent / decodeURIComponent

<aside>
💡

encodeURIComponent 함수는 URI 구성 요소를 인수로 전달받아 인코딩한다. 

decodeURIComponent 함수는 매개변수로 전달된 URI 구성 요소를 디코딩한다.

</aside>

```jsx
/**
	* URI의 구성요소를 전달받아 이스케이프 처리를 위해 인코딩한다.
	* @param {string} uriComponent - URI의 구성요소
	* @returns {string} 인코딩된 URI의 구성요소
	*/
encodeURIComponent(uriComponent)

/**
	* 인코딩된 URI의 구성요소를 전달받아 이스케이프 처리 이전으로 디코딩한다.
	* @params {string} encodeURIComponent - 인코딩된 URI의 구성요소
	* @returns {string} 디코딩된 URI의 구성요소
	*/
decodeURIComponent(encodeURIComponent)
```

[ 예제 21 - 36 ]

```jsx
// URI의 쿼리 스트링
const uriCamp = 'name=이웅모&job=programmer&teacher';

// encodeURIComponent 함수는 인수로 전달받은 문자열을 URI의 구성요소인 쿼리 스트링의 일부로 간주한다.
// 따라서 쿼리 스트링 구분자로 사용되는 =, ?, &까지 인코딩한다.
let enc = encodeURIComponent(uriCamp);
console.log(enc);
// name%3D%EC%9D%B4%EC%9B%85%EB%AA%AB&job%3Dprogramer@26teacher

let dec = decodeURIComponent(enc);
console.log(dec);
// 이웅모&job=programmer&teacher

// encodeURI 함수는 인수로 전달받은 문자열을 완전한 URI로 간주한다.
// 따라서 쿼리 스트링 구분자로 사용되는 =, ?, &를 인코딩하지 않는다.
enc = encodeURI(uriComp);
console.log(enc);
// name=%EC%9D%B4%EC%9B%85%EB%AA%AB&job=programer&teacher

dec = decodeURI(enc);
console.log(dec);
// name=이웅모&job=programmer&teacher
```

## 21.4.3 암묵적 전역

<aside>
💡

앞에서 봤던 암묵적 전역 !

선언없이 y = 20 이라고 선언되면 window.y = 20으로 해석되어 전역 객체의 프로퍼티를 동적 생성한다.

하지만, y는 변수 선언 없이 단지 전역 객체의 프로퍼티로 추가되었기 떄문에 y는 변수가 아니다. y는 변수가 아니기 때문에 **변수 호이스팅이 발생하지 않는다**. !

</aside>

[ 예제 21 - 37 ] 

```jsx
var x = 10; // 전역 변수

function foo() {

	// 선언되지 않은 식별자에 값을 할당
	y = 20; // window.y = 20;
}

foo();

// 선언하지 않은 식별자 y를 전역에서 참조할 수 있다.
console.log(x + y); // 30
```

[ 예제 21 - 38 ]

```jsx
// 전역 변수 x는 호이스팅이 발생한다.
console.log(x); // undefined
// 전역 변수가 아니라 단지 전역 객체의 프로퍼티인 y는 호이스팅이 발생하지 않는다.
console.log(y); // ReferenceError: y is not defined

var x = 10;

function foo () {
	// 선언되지 않은 식별자에 값을 할당
	y = 20; // window.y = 20;
	
}

foo();

// 선언하지 않은 식별자 y를 전역에서 참조할 수 있다.
console.log(x + y); // 30
```

[ 예제 21 - 39 ] 

```jsx
var x = 10; // 전역 변수

function foo() {
	// 선언하지 않은 식별자에 값을 할당
	y = 20; // window.y = 20;
	console.log(x + y);
}

foo(); // 30

console.log(window.x); // 10
console.log(window.y); // 20

delete x; // 전역 변수는 삭제되지 않는다.
delete y; // 프로퍼티는 삭제된다.

console.log(window.x); // 10
console.log(window.y); // undefined
```

<aside>
💡

정리 !
**전역 변수는 delete 연산자로 삭제할 수 없다.**

delete y;의 프로퍼티는 삭제가 된다.

</aside>

<aside>
🤔

왜 전역 변수는 삭제할 수 없을까 ?

- GPT 정리 내용
    
    🔍 코드 분석
    
    ```jsx
    var x = 10; // 전역 변수
    
    이 `x`는 전역 객체(window)의 **non-configurable한 프로퍼티**로 등록됩니다.
    ```
    
    - 그래서 `delete x`는 **실패**합니다.
    
    ```jsx
    y = 20; // 선언 없이 할당된 변수 (암묵적 전역 변수)
    
    `y`는 `var`, `let`, `const` 없이 선언되어서 **암묵적으로 전역 객체의 프로퍼티로 추가**됩니다.
    ```
    
    - 이때 추가된 `y`는 **configurable: true**인 속성으로 설정되기 때문에 **`delete y`가 성공**합니다.
    
    ---
    
    ## 🔧 왜 delete가 안 되는가?
    
    ### `var` 키워드의 특성 때문이에요
    
    - `var`로 선언된 전역 변수는 전역 객체의 **non-configurable 속성**으로 등록됩니다.
    - 즉, **삭제가 금지**된 속성이 됩니다.
    
    ```jsx
    javascript
    복사편집
    Object.getOwnPropertyDescriptor(window, 'x');
    /*
    {
      value: 10,
      writable: true,
      enumerable: true,
      configurable: false  // 🔥 이게 핵심
    }
    */
    
    ```
    
    그래서:
    
    ```jsx
    delete x; // 실패 → false 반환
    ```
    
    ---
    
    암묵적 전역 변수는 삭제 가능
    
    ```jsx
    y = 20;
    Object.getOwnPropertyDescriptor(window, 'y');
    /*
    {
      value: 20,
      writable: true,
      enumerable: true,
      configurable: true  // ✅ 삭제 가능
    }
    */
    
    delete y; // 성공 → true 반환
    
    ```
    
    ---
    
    ## ✅ 요약 정리
    
    | 선언 방식 | 전역 객체 등록 | configurable | `delete` 가능? |
    | --- | --- | --- | --- |
    | `var x = 10;` | O | ❌ false | ❌ 불가능 |
    | `y = 20;` (암묵적) | O | ✅ true | ✅ 가능 |
    | `let` / `const` | ❌ (window에 등록되지 않음) | N/A | ❌ 불가능 |
</aside>