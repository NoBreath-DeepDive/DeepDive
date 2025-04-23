# 9장 타입 변환과 단축 평가

날짜: 2025년 4월 24일
발표자: 김진섭

# 9.1 타입 변환이란?

## **자바스크립트의 모든 값은 타입이 있다.**

자바스크립트의 모든 값은 개발자의 의도에 따라 다른 타입으로 변환이 가능하다.

<aside>
📌

자바스크립트에 존재하는 type의 종류

자바스크립트에는 number, string, boolean, undefined, null, symbol, bigint의 7가지 기본 타입과, object 타입이 존재한다.

</aside>

### 개발자가 의도적으로 값의 타입을 변환하는 것을 명시적 타입 변환(explicit coercion) 또는 타입 캐스팅(type casting)이라고 말한다.

<aside>
💡

명시적이란 ?

내용이나 뜻을 분명하게 드러내 보이는 것을 명시적이라고 한다.

즉, “명시적 타입 변환”이라는 것은 개발자가 의도적으로 값을 지정할 때 해당 값의 타입을 분명하게 드러내 보이기 위해 변환한다.

반대말로는 암시적이라는 단어가 있다 !

⇒ 직접적으로 표현하지 않고 넌지시 나타냄. 숨겨져 있거나 간접적인 표현이라는 뜻

</aside>

### [ 예제 09-01 ]

```jsx
var x = 10; // x라는 식별자에 number 타입인 10을 대입해줌으로써 x의 type은 number가 된다.
var y = "10"; // y라는 식별자에 String 타입인 문자열 "10"을 대입해줌으로써 y의 type은 String

var str = x.toString(); // str이라는 식별자를 선언하고 식별자 x 에 toString 함수를
// 이용하여 x의 값을 문자열 단위로 잘라내어 str에 값을 넣는다.

console.log(typeof str, typeof x, typeof y); // 출력 결과 : string number string
```

개발자의 의도와는 상관없이 표현식을 평가하는 도중에 자바스크립트 엔진에 의해 암묵적으로 타입이 자동 변환되기도 함 ! 이를 “암묵적 타입 변환” 또는 “타입 강제 변환” 이라고 한다.

<aside>
💡

암묵적이란 ?
직접 말이나 글로 표현하지 않았지만 **서로가 알고 있는 상태** 또는 **묵시적으로 동의하거나 이해하고 있는 상태**

암묵적 타입 변환에서 암묵적이라는 단어가 쓰인 이유

⇒ 개발자가 명시적으로 타입을 지정하지 않아도 **_자바스크립트 엔진이 자동으로 판단_**해서 타입을 처리한다는 뜻에서 암묵적이라는 단어를 사용함.

⇒ 여기서 암묵적 타입 변환을 쉽게 이해하자면

```jsx
console.log("5" - 2); // 결과는 3이 출력된다.

// 여기서 5는 문자열로 선언되어 있다.
// 하지만 "-" 연산자는 숫자끼리만 연산이 가능하니까
// 자바스크립트 엔진에 의하여 문자열 "5"를 숫자 5로 변환하여
// 『 5 - 2 』의 계산식을 수행 함
```

</aside>

**[ 예제 09 - 02 ]**

```jsx
var x = 10;
var str = x + " ";
console.log(typeof str, typeof x); // 출력 값 : string number

// 식별자 x에 숫자 10을 대입해줌으로써 x의 type은 number을 가지게 됨 !
// 식별자 str에 number타입을 갖고 있는 x에 문자열을 + 해줌
// 문자열을 number타입인 x에 + 연산자를 계산하였기 때문에
// 자바스크립트 엔진이 암묵적으로 숫자 5를 문자열 5로 변경하여
// str에는 문자열 "10"의 값을 대입해줌
```

<aside>
💡

암묵적 타입 변환은 기존 변수 값을 재할당하여 변경하는 것이 아니다.

- 표현식을 에러 없이 평가하기 위해 피연산자의 값을 암묵적 타입 변환하여 새로운 타입의 값을 만들고 단 한번 사용하고 버린다.

- 원시 값은 변경 불가능한 값이므로 변경할 수 없다. 타입 변환이란 기존 원시 값을 사용해 다른 타입의 새로운 원시 값을 생성하는 것이다. (일회용)
</aside>

## 9.2 암묵적 타입 변환

<aside>
📌

자바스크립트 엔진은 표현식을 평가할 때 개발자의 의도와는 상관없이 코드의 문맥을 고려해 암묵적으로 데이터 타입을 강제 변환(암묵적 타입 변환)할 때가 있다.

</aside>

**[ 예제 09 - 03 ]**

```jsx
// 피연산 자가 모두 문자열 타입이어야 하는 문맥
"10" + 2; // -> '102'

// 피연산자가 모두 숫자 타입이어야 하는 문맥
5 * "10"; // -> 50

// 피연산자가 또는 표현식이 불리언 타입이어야 하는 문맥
!0; // -> true |  컴퓨터에서 0은 false, 1은 true를 표현한다.
if (1) {
}
```

<aside>
🤔

왜 이전 예제에서 console.log(”5” - 2) 의 출력은 3이 출력되는데 [예제 09-03]에서 ‘10’ + 2 의 값은 102가 출력될까 ?

- 생각해보자 !
  자바스크립트 내에서는 연산자로 + , -, \*, /, %가 존재한다.
  연산자 중 +만 유일하게 String 타입과 Number 타입 둘 다 계산이 가능한 연산자이다.
  즉, 자바스크립트 엔진이 + 연산자일 때 문자열 + 숫자 이면 자동으로 문자열로 암묵적 타입 변환을 하여 문자열로 된 값을 반환하는 것이다.
    <aside>
    🤔
    
    그렇다면 문자열 + 숫자을 자바스크립트에서 계산을 할 때 왜 꼭 문자열로만 변환하여 게산을 하나 ? 문자열을 숫자 타입으로 변환하여 계산할 수도 있는거 아니야 ?
    
    - 생각해보자 !
        
        자바스크립트에서 + 연산자는 피연산자 중에서 하나라도 문자열이면 문자열을 연결하는 규칙이 존재한다. 그러기 때문에 피연산자 중에 문자열이 하나라도 있다면 문자열로 암묵적 타입 변환을 하여 계산한다.
        
    </aside>


</aside>

## 9.2.1 문자열 타입으로 변환

**[ 예제 09 - 04 ]**

```jsx
1 + "2"; // -> '12' | 여기서 '12'는 숫자가 아닌 문자열이다 !!!!!
```

**[ 예제 09 - 05 ]**

```jsx
`1 + 1 = ${1 + 1}`; // -> "1 + 1 = 2"
// ES6에서 도입된 템플릿 리터럴 삽입은 표현식의 평과 결과를
// 문자열 타입으로 암묵적 타입 변환한다.
```

<aside>
🤔

왜 템플릿 리터럴 삽입은 표현식의 평과 결과를 문자열 타입으로 변환하는 것일까 ?

- 생각해보자 !
  자바스크립트에서는 템플릿 리터럴을 사용할 때, **문자열을 기본적으로 다룬다고 생각한다**. 그렇기 때문에 ${} 안의 계산된 결과가 숫자여도 자동으로 문자열로 반환되어 최종 결과는 문자열이 됨 !

</aside>

- **[ 예제 09 - 06 }**
  ```jsx
  // 숫자 타입
  0 + ' ' // -> "0"
  -0 + ' ' // -> "0" | 자바스크립트에서는 -0도 0으로 간주되기 때문에 0으로 변환한다.
  1 + ' ' // -> "1"
  -1 + ' ' // -> "-1"
  NaN + ' ' // -> "NaN"
  Infinity + ' ' // -> "Infinity"
  -Infinity + ' ' // -> "-Infinity"

  // 불리언 타입
  true + '' // -> "true"
  false + '' // -> "false"

  // null 타입
  null + '' // -> "null"

  // undefined 타입
  undefined + '' // -> "undefined"

  // 심벌 타입
  (Symbol()) + '' // -> TypeError: Cannot convert a Symbol value to a string
  // 심벌 타입은 특별한 값으로 취급되어 문자열이 불가능한 타입이다 !!

  // 객체 타입
  ({}) + ''  // -> "[Object Object]" | 이때 앞의 Object 는 타입을 말하는 것이다.
  Math + '' // -> "[Object Math]"
  [] + '' // -> ""  | 빈 배열은 빈 문자열로 반환 함.
  [10,20] + '' // -> "10,20"
  (function(){}) + '' // -> "function(){}"
  Array + '' // ->  "function Array() { [native code] }" |
  ```
    <aside>
    🤔
    
    왜 (function(){}) + ‘ ‘ 을 했을 때 “function() {}” 이 출력되는 것일까 ?
    
    - 생각해보자 !
        
        **함수는 곧 객체 !! (함곧객 )**
        
        객체가 문자열로 반환될 때에는 자바스크립트가 두 가지 순서로 타입 변환을 시도한다.
        
        1. valueof() → 기본 값 반환 시도
        2. toString() → 실패하면 문자열 반환 시도
        
        valueof()은 기본 값을 반환하는 것을 시도한다. 하지만 **함수는 곧 객체**이기 때문에 우리가 해야 할 것은 객체를 기본 값으로 변경해야 한다. 함수에 valueof()를 반복해도 객체로 다시 되돌아올 뿐이기 때문에 자바스크립트 엔진에서는 다음 단계인 toString()을 실행한다.
        
        ```jsx
        // 함수에서 valueof()가 실패하는 이유
        // valueof()가 성공하기 위해서는 함수를 실행했을 때 
        // return 값이 존재해야 함 !
        
        // 만약, valueof()가 성공하는 경우
        function hello (){
        	return 100;
        }
        (hello(){}) + "" //-> "100"
        
        // 만약, valueof()가 실패하는 경우
        function hello() {}
        (hello(){}) + "" // -> "function hello(){}"
        ```
        
        toString() 은 문자열로 나누는 함수이다.  함수 안의 내용이 없음으로 {} 빈 내용을 출력한다.
        
        ```jsx
        // 함수 내부에서의 toString()에 관한 부가설명 !
        
        function hello() { 
        	const firstword = "hello";
        	const secondword = "Deep DIVE !!!";
        	
        	return firstword + secondword
        }
        console.log(hello.toString()); 
        
        // -> function hello() {const firstword = "hello"; const secondword = "Deep Dive !!!"; return firstword + secondword;
        ```
        
    </aside>
    
    <aside>
    🤔
    
    Array + ‘’ 은 왜 ???????!!!!
    
    - 생각해보자 !
        
        Array는 자바스크립트의 내장 함수이다.  앞의 설명에서도 언급 했듯이 **함수는 곧 객체**다 !!
        즉, 객체를 기본 값으로 변환할 때 시도하는 두 가지 방법 중 valueof()을 실행했을 때 객체가 나옴으로 두 번째 단계인 toString()을 실행한다. 
        
        자바스크립트에서는 해당 함수가 내장 코드로 구현되어 있다는 사실을 반영해서 
        
        “function() { [native code]” 로 반환하는 것이다.
        
        [native code]은 자바스크립트 엔진의 네이티브 코드로 구현되어 있다는 표시.
        
        즉, 자바스크립트 코드가 아닌, 엔진이 내부적으로 구현한 원시 코드라는 뜻.
        
    </aside>


## 9.2.2 숫자 타입으로 변환

[ 예제 09 - 07 ]

```jsx
1 - "1"; // -> 0
1 * "10"; // -> 10
1 / "one"; // -> NaN // one은 number 타입으로도 변환이 불가능한 상태이기 때문에
// 숫자에서 문자열을 나눌 수는 없음으로 NaN (Not a Number)가 출력 됨 !
```

[ 예제 09 - 08 ]

```jsx
"1" > 0; // -> true | 타입 변환은 산술 연산자 뿐 아니라 비교 연산자에서도 이루어진다.
```

[ 예제 09 - 09 ]

```jsx
// 자바스크립트 엔진은 숫자 타입이 아닌 값을 숫자 타입으로 암묵적 타입 변환을
// 수행할 때 아래예시들 처럼 동작한다.

// 문자열 타입
+"" + // -> 0
  "0" + // -> 0
  "1" + // -> 1
  "string" + // -> NaN  | string은 숫자로 변환할 수 없는 값이기 때문에 NaN 출력 됨
  // 불리언 타입  => 불리언 타입에서는 true는 1 false는 0으로 표기되기 때문에 숫자로 변환ok
  true + // 1
  false + // 0
  // null 타입 => null은 이미 0으로 표기되어 왔기 때문에 숫자로 변환 ok
  null + // -> 0
  // undefined 타입 => 숫자로 변환 할 수 없다 !!
  undefined + // -> NaN
  // 심벌 타입  => 심벌은 특별한 값 취급을 받기 때문에 문자열이나 숫자로 변환이 불가능 함!
  Symbol(); // -> TypeError
console.log(typeof Symbol()); // => 나야 "Symbol"

// 객체 타입
// 객체를 기본값으로 바꾸기 위해서는 두 가지의 단계를 거치는데 valueof()이 실패하게 된다면
// toString()으로 꺼낸 값은 숫자가 될 수 없음으로 NaN이 나오게 되는 것.
+{} + // -> NaN
  [] + // -> 0 | 배열도 객체기 때문에 valueof()가 실패하고, toString()이 호출된다.
  // 하지만 빈 배열의 toString()은 빈 문자열 ""을 반환한다. 그러기 때문에 0이 출력 됨
  [10, 20] + // -> NaN | 배열은 뭐다 ? 객체다 ~ valueof()가 실패하고 toString()으로
  // "10 20"이 되기 때문이다. 만약 +[10] 이였다면 "10"이 됨으로 10이 출력된다.
  function () {}; //-> NaN 함수는 곧 객체 이젠 알겠죠 ?
```

## 9.2.3 불리언 타입으로 변환

[ 예제 09 - 10 ]

```jsx
if ("") console.log(x); // if문은 ()안의 조건이 성립할 경우 실행됨 !
// ()안의 조건 값이 빈 문자열임으로 0이니까 실행 X
```

[ 예제 09 - 11 ]

```jsx
if ("") console.log("1"); // -> 빈 문자열은 0으로 반환 0은 false
if (true) console.log("2");
if (0) console.log("3"); // -> 0은 false
if ("str") console.log("4");
if (null) console.log("5"); // null은 0을 반환하기 때문에 0은 false
// -> 2 4
```

<aside>
💡

아래의 값들은 자바스크립트 내부에서 false로 판단되는 falsy 값들이다.

- false
- undefined
- null
- 0, -0
- NaN
- ‘’ (빈 문자열)
</aside>

[ 예제 09 - 12 ]

```jsx
// 위의 false, undefined, null, 0, NaN, "" 에 ! 기호를 붙여주면 true 값을 가지게 됨
!false, !undefined, !null, !0, !NaN, !"" == true;
```

# 9.3 명시적 타입 반환

<aside>
💡

개발자의 의도에 따라 명시적으로 타입을 변경하는 방법은 다양하다 !

1. 표준 빌트인 생성자 함수(String, Number, Boolean)를 new 연산자 없이 호출하는 방법
2. 빌트인 메서드를 사용하는 방법
3. 암묵적 타입 변환을 이용하는 방법

**해당 방법들 중 2,3번은 뒤에 나오는 내용임으로 이러한 방법이 있다는 것만 알아두자 !**

</aside>

## 9.3.1 문자열 타입으로 변환

[ 예제 09 - 14 ]

```jsx
// 1. String 생성자 함수를 new 연산자 없이 호출하는 방법
// 숫자 타입 => 문자열 타입
String(1); // -> "1"
String(NaN); // -> "NaN"
String(Infinity); // -> "Infinity"

// 불리언 타입 => 문자열 타입
String(true); // -> "true"
String(false); // -> "false"

// 2. Object.prototype.toString 메서드를 사용하는 방법
(1).toString(); // -> "1"
NaN.toString(); // -> "NaN"
Infinity.toString(); // -> "Infinity"

// 불리언 타입 => 문자열 타입
true.toString(); // -> "true"
false.toString(); // -> "false"

// 3. 문자열 연결 연산자를 이용하는 방법
// 숫자 타입 => 문자열 타입
1 + ""; // -> "1"
NaN + ""; // -> "Nan"
Infinity + ""; // -> "Infinity"

// 불리언 타입 => 문자열 타입
true + ""; // -> "true"
false + ""; // -> "false"
```

## 9.3.2 숫자 타입으로 변환

[ 예제 09 - 15 ]

```jsx
// 1. Number 생성자 함수를 new 연산자 없이 호출하는 방법
// 문자열 타입 => 숫자 타입
Number("0"); // -> 0
Number("-1"); // -> -1
Number("10.53"); // -> 10.53

// 불리언 타입 => 숫자 타입
Number(true); // -> 1
Number(false); // -> 0

// 2. parseInt, parseFloat(소수로 변환하는 함수) 함수를 사용하는 방법(문자열만 변환 가능)
// 문자열 타입 => 숫자 타입
parseInt("0"); // -> 0
parseInt("-1"); // -> -1
parseFloat("10.53") + // -> 10.53
  // 3. + 단항 산술 연산자를 이용하는 방법
  // 문자열 타입 => 숫자 타입
  "0"; // -> 0
+"-1"; // -> -1
+"10.53" + // -> 10.53
  // 불리언 타입 => 숫자 타입
  true; // -> 1
+false; // -> 0

// 4. * 산술 연산자를 이용하는 방법
// 문자열 타입 => 숫자 타입
"0" * 1; // -> 0
"-1" * 1; // -> -1
"10.53" * 1; // -> 10.53
// 불리언 타입 => 숫자 타입
true * 1; // -> 1
false * 1; // -> 0
```

## 9.3.3 불리언 타입으로 변환

[ 예제 09 - 16 ]

```jsx
// 1. Boolean 생성자 함수를 new 연산자 없이 호출하는 방법
// 문자열 타입 => 불리언 타입
Boolean("x"); // -> true
Boolean(""); // -> false
Boolean("false"); // -> true
// 숫자 타입 => 불리언 타입
Boolean(0); // -> false
Boolean(1); // -> true
Boolean(NaN); // -> false
Boolean(Infinity); // -> true

// null 타입 => 불리언 타입
Boolean(null); // -> false

// undefined 타입 => 불리언 타입
Boolean(undefined); // -> false
// 객체 타입 => 불리언 타입
Boolean({}); // -> true | 객체는 무조건 true
Boolean([]); // -> true

// 2. ! 부정 논리 연산자를 두 번 사용하는 방법
// 문자열 타입 => 불리언 타입
!!"x"; // -> true
!!""; // -> false
!!"false"; // -> true
// 숫자 타입 => 불리언 타입
!!0; // -> false
!!1; // -> true
!!NaN; // -> false
!!Infinity; // -> true
// null 타입 => 불리언 타입
!!null; // -> false
//undefined 타입 => 불리언 타입
!!undefined; // -> false
// 객체 타입 => 불리언 타입
!!{}; // -> true
!![]; // -> true
```

# 9.4 단축 평가

## 9.4.1 논리 연산자를 사용한 단축 평가

<aside>
💡

논리 연산자를 사용한 평가 결과는 불리언 값이 아닐 수도 있다 !

</aside>

[ 예제 09 - 17 ]

```jsx
"Cat" && "Dog"; // -> "Dog" 논리곱은 둘다 true일때 뒤의 true 값을 반환한다.
```

[ 예제 09 - 18 ]

```jsx
"Cat" || "Dog"; // -> "Cat" 논리합은 둘다 true일 때 앞의 true 값을 반환한다.
```

<aside>
💡

논리 연산의 결과를 결정하는 피연산자를 타입 변환하지 않고 그대로 반환한다.

이를 단축 평가라 고 한다.

⇒ 단축 평가는 표현식을 평가하는 도중에 평가가 결과가 확정된 경우 나머지 평가 과정을 생략하는 것을 말한다.

</aside>

| 단축 평가 표현식  | 평가 결과 |
| ----------------- | --------- | -------- | -------- |
| true              |           | anything | true     |
| false             |           | anything | anything |
| true && anything  | anything  |
| false && anything | false     |

[ 예제 09 - 19 ]

```jsx
// 논리합 (||) 연산자
"Cat" || "Dog"; // -> "Cat"
false || "Dog"; // -> "Dog"
"Cat" || false; // -> "Cat"

// 논리곱 (&&) 연산자
"Cat" && "Dog"; // -> "Dog"
false && "Dog"; // -> false
"Cat" && false; // -> false

// 외우자 ☆
// 논리합은 두 값중 하나만 True여도 True를 출력해낸다.
// 논리곱은 두 값이 모두 True여야 True를 출력한다.

// 논리합은 둘다 True면 앞의 값을 반환한다.
// 논리곱은 둘다 True면 뒤의 값을 반환한다.
```

[ 예제 09 - 20 ]

```jsx
var done = true;
var message = "";

// 주어진 조건이 true일 때 if 문으로 표현하는 방법
if (done) message = "완료";

// if 문은 단축 평가로 대체 가능하다.
// done이 true라면 message에 '완료'를 할당
message = done && "완료"; // 둘다 True기 때문에 뒤의 값인 완료를 반환한다.
console.log(message); // 완료
```

[ 예제 09 - 21 ]

```jsx
var done = false;
var message = "";

// 주어진 조건이 false일 때 if 문으로 표현하는 방법
if (!done) message = "미완료";

// if 문은 단축 평가로 대체 가능하다.
// done이 false라면 message에 '미완료'를 할당
message = done || "미완료";
console.log(message); // -> 미완료
```

### 삼항 조건 연산자

[ 예제 09 - 22 ]

```jsx
var done = true;
var message = "";

// if...else문으로 표현하자면
if (done) message = "완료";
else message = "미완료";
console.log(message); // -> 완료

// if...else 문은 삼항 조건 연산자로 대체 가능하다.
message = done ? "완료" : "미완료";
console.log(message); // -> 완료
```

[ 예제 09 - 23 ]

```jsx
var elem = null;
var value = elem.value; // TypeError가 표시됨 null의 value 값을 읽을 수 없기 때문
```

[ 예제 09 - 24 ]

```jsx
var elem = null;
var value = elem && elem.value; // -> null 이 출력
// 이유는 null은 falsy 값중 하나이다. 논리 곱(&&) 연산자의 특징 중 앞이 false이면
// false 값을 바로 반환한다. 그렇기 때문에 null을 출력한다.
```

[ 예제 09 -25 ]

```jsx
// 단축 평가를 사용한 매개변수의 기본값 설정
function getStringLength(str) {
  str = str || ""; // 논리 합에서는 둘중하나만 true이거나 앞이 true면 앞의 값을 반환.
  return str.length;
}

getStringLength(); // -> 0
getStringLength(hi); //-> 2

// ES6의 매개변수의 기본값 설정
function getStringLength(str = "") {
  // str = ''은 매개변수의 기본값을 설정한 것이다.
  return str.length; // 매개변수에 값이 들어오지 않는다면 빈문자열을 갖게
  // 하는 것이다.
}

getStringLength(); // -> 0
getStringLength(hi); //-> 2
```

## 9.4.2 옵셔널 체이닝 연산자

<aside>
💡

옵셔널 체이닝 연산자 [ ?. ]는 좌항의 피연산자가 null이나 undefined인 경우 undefined를 반환하고, 그렇지 않으면 우항의 프로퍼티 참조를 이어간다.

옵셔널 체이닝 연산자 ?.는 객체를 가리키기를 기대하는 변수가 null 또는 undefined가 아닌지 확인하고 프로퍼티를 참조할때 유용하다.

</aside>

[ 예제 09 - 26 ]

```jsx
var elem = null;
// elem이 null 또는 undefined이면 undefined를 반환하고, 그렇지 않으면 우항의
// 프로퍼티 참조를 이어간다.

var value = elem?.value;
console.log(value); // undefined
```

**_옵셔널 체이닝이 도입되기 전에는 논리 곱 (&&)연산자를 사용하였다._**

[ 예제 09 -27 ]

```jsx
var elem = null;

var value = elem && elem.value;
console.log(value); // -> null
```

<aside>
💣

하지만 논리 곱의 치명적인 단점이 존재했다. 좌항 피연산자에서 논리 연산자에서 false로 평가되는 값들을 만나면 바로 false 값을 반환한다는 단점이 있다.

</aside>

[ 예제 09 -28 ]

```jsx
var str = "";

var length = str && str.length;

console.log(length); // -> ""
```

[ 예제 09 - 29 ]

```jsx
var str = "";
var length = str?.length; // str의 값이 falsy에 해당하는 값이지만 옵셔널 체이닝 연산자는
// null, undefined가 아니면 연산자 다음 프로퍼티에 접근이 가능하다.
console.log(length); // -> 0
```

## 9.4.3 null 병합 연산자

<aside>
💡

null 병합 연산자 ??은 좌항의 피연산자가 null또는 undefined인 경우 우항의 피연산자를 반환하고, 그렇지 않으면 좌항의 피연산자를 반환한다.

null 병합 연산자는 변수의 기본 값을 설정할 때 유용하다 !

</aside>

[ 예제 09 -30 ]

```jsx
var foo = null ?? "default string";
console.log(foo); // -> "default string"
```

null 병합 연산자 도입 이전에는 논리합 연산자를 이용하였다.

[ 예제 09 - 31 ]

```jsx
var foo = "" || "default string"; // 논리합 연산자는 둘 중 하나라도 true이면 true값 반환
console.log(foo); // "default string"
```

[ 예제 09 -32 ]

```jsx
var foo = "" ?? "default string";
console.log(foo); // -> ''
```
