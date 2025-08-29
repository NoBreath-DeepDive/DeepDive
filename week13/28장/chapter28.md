# 28.1 Number 생성자 함수

표준 빌트인 객체인 Number 객체는 생성자 함수 객체이다. new 연산자와 함께 Number 인스턴스를 생성 가능하다.

[ 예제 28-01 ] 

```jsx
const numObj = new Number();
console.log(numObj); // Number {[PrimitiveValue]}: 0}
```

[ 예제 28-02 ]

```jsx
const numObj = new Number(10); 
console.log(numObj); // Number {[PrimitiveValue]}: 10}
```

[ 예제 28-03 ] 

```jsx
let numObj = new Number('10'); 
console.log(numObj); // Number {[PrimitiveValue]: 10}

numObj = new Number ('Hello');
console.log(numObj); // Number {[PrimitiveValue] : NaN}
```
new 연산자 없이 Number 만 호출하면 숫자 타입으로 변환 시킨다.

[ 예제 28-04 ] 

```jsx
// 문자열 타입 -> 숫자 타입
Number('0'); // -> 0
Number('-1'); // -> -1
Number('10.53'); // -> 10.53

// 불리언 타입 -> 숫자 타입
Number(true); // -> 1
Number(false); // -> 0
```

# 28.2 Number 프로퍼티

## 28.2.1 Number.EPSILON

Number.EPSILON은 자바스크립트 내에서 숫자를 계산 할 때 정밀도의 한계를 나타내는 아주 작은 값.

1과 1보다 큰 수 사이에서 나타낼 수 있는 가장 작은 차이

[ 예제 28-05 ]

```jsx
0.1 + 0.2; // -> 0.3000000000004
0.1 + 0.2 === 0.3; // -> false
```

위 예제는 부동 소수점으로 인해 발생하는 오차를 해결하기 위해 Number.EPSLION을 사용해야 함을 보여주는 예제이다.
[ 예제 28-06 ] 

```jsx
function isEqual(a,b) {
	// a,b를 뺀 값의 절대값이 Nuumber.EPSILON보다 작으면 같은 수로 인정한다.
	return Math.abs(a - b) < Number.EPSILON;
}
isEqual(0.1 + 0.2 , 0.3); // -> true
```

## 28.2.2 Number.MAX_VALUE

Number.MAX_VALUE은 자바스크립트에서 표현할 수 있는 가장 큰 양수 값.

이 값보다 큰 값은 Infinity 이다.

## 28.2.3 Number.MIN_VALUE

 Number.MIN_VALUE은 자바스크립트에서 표현할 수 있는 가장  작은 양수 값.

 Number.MIN_VALUE 값보다 작은 값은 0 이다.

## 28.2.8 Number.NaN

Number.NaN은 숫자가 아님(Not-a-Number)을 나타내는 숫자 값이다.

# 28.3 Numebr 메서드

## 28.3.1 Number.isFinite

ES6에서 도입된 Number.isFinite 정적 메서드는 인수로 전달된 숫자 값이 유한수인지를 판단하여 불리언 값으로 반환하는 메서드이다.

[ 예제 28-14 ]

```jsx
// 인수가 정상적인 유한수라면 true를 반환한다.
Number.isFinite(0); // -> true
Number.isFinite(Number.MAX_VALUE); // -> true
Number.isFinite(Number.MIN_VALUE); // -> true

// 인수가 무한수이면 false를 반환한다.
Number.isFinite(Infinity); // -> false
Number.isFinite(-Infinity); // -> false
```

<aside>
💡

Number.isFinite 매서드VS 빌트인 전역 함수 isFinite

```jsx
// Number.isFinite는 인수를 숫자로 암묵적 타입 변환하지 않는다.
Number.isFinite(null); // -> false

// isFinite는 인수를 숫자로 암묵적 타입 변환한다. null은 0으로 암묵적 타입 변환된다.
isFinite(null); // -> true
```

</aside>

## 28.3.2 Number.isInteger

ES6에서 도입된 Number.isInteger 정적 메서드는 인수로 전달된 숫자 값이 정수인지 검사하여 그 결과를 불리언 값으로 반환한다. 검사하기 전에 인수를 숫자로 암묵적 타입 변환하지 않는다.

[ 예제 28-17 ]
```jsx
// 인수가 정수라면 true를 반환
Number.isInteger(123); // -> true

// 0.5는 정수가 아님
Number.isInteger(0.5); // -> false

// '123'을 숫자로 암묵적 타입 변환하지 않는다.
Number.isInteger('123'); // -> false

// false를 숫자로 암묵적 타입 변환하지 않는다.
Number.isInteger(false); // -> false
```

## 28.3.3 Number_isNaN

ES6에서 도입된 Number_isNaN 정적 메서드는 인수로 전달된 숫자값이 NaN인지 검사하여 그 결과를 불리언 값으로 반환한다.

<aside>
💡

Number.isNaN 메서드 VS isNaN

```jsx
// Number.isNaN은 인수를 숫자로 암묵적 타입 변환하지 않는다.
Number.isNaN(undefined); // -> false

// isNaN은 인수를 숫자로 암묵적 타입 변환한다. undefined는 NaN으로 암묵적 타입 변환한다.
isNaN(undefined); // -> true
```

</aside>

<aside>
💡

여기서 Number.isNaN(undefined) 의 출력 값이 false가 나왔다. 그러면 undefined을 숫자로 인정한다는 것일까?

- 답변
    
    Number의 메서드들은 암묵적 타입 변환을 진행하지 않는다. 그러므로 undefined을 숫자로 인정한다기 보다는 숫자로 타입 변환을 하지 않았기 때문에 NaN은 Not a Nuber의 축약어인데 숫자로 보지 않는 다는 것이다.
    
</aside>

## 28.3.4 Number_isSafeInteger

ES6 에서 도입된 Number.isSafeInteger 정적 메서드는 인수로 전달된 숫자값이 안전한 정수인지 검사하여 그 결과를 불리언 값으로 반환한다. 안전한 정수 값은 -(2의 53승 -1) ~ (2의 53승 -1) 의 범위에 속해있다.

```jsx
Number.isSafeInteger(0); // -> true
Number.isSafeInteger(1000000000001); // ->true
Number.isSafeInteger(100000000000001); // -> false ( 안전한 정수 값의 범위를 넘었기 떄문 )
Number.isSafeInteger(0.5); // -> false
Number.isSafeInteger('123'); // -> false
Number.isSafeInteger(false); // -> false
```
## 28.3.5 Number_prototype.toExponential

toExponential 메서드는 숫자를 지수 표기법으로 변환하여 문자열로 반환한다.

```jsx
(77.1234).toExponential(); // -> "7.71234e+1"
(77.1234).toExponential(4); // -> "7.7123e+1"
(77.1234).toExponential(2); // -> "7.71e+1"
```

## 28.3.6 Number.prototype.toFixed

toFixed 메서드는 숫자를 반올림하여 문자열로 반환한다.

```jsx
// 소수점 이하 반올림. 인수를 생략하면 기본값 0이 지정된다.
(12345.6789).toFixed(); // -> "12346"
(12345.6789).toFixed(1); // -> "12345.7"
(12345.6789).toFixed(2); // -> "12345.68"
(12345.6789).toFixed(3); // -> "12345.679"
```

## 28.3.7 Number.prototype.toPrecision

toPrecision 메서드는 인수로 전달받은 전체 자릿수까지 유효하도록 나머지 자릿수를 반올림하여 문자열로 반환한다. 전체 자릿수로 표현할 수 없을 경우 지수 표기법으로 결과를 반환한다.

```jsx
// 전체 자릿수 유효, 인수를 생략하면 기본값 0이 지정된다.
(12345.6789).toPrecision(); // -> "12345.6789"
(12345.6789).toPrecision(1); // -> "1e+4" // 1e^4 => 1e+4
(12345.6789).toPrecision(2); // -> "1.2e+4"
(12345.6789).toPrecision(6); // -> "12345.7"
```

##
## 28.3.8 Number.prototype.toString

toString 메서드는 숫자를 문자열로 변환하여 반환한다. 진법을 나타내는 2~36 사이의 정수 값을 인수로 전달할 수 있다. 인수를 생략하면 기본값 10진법이 지정된다.

```jsx
// 인수를 생략하면 10진수 문자열을 반환한다.
(10).toString(); //-> "10"
// 2진수 문자열을 반환한다.
(16).toString(2); // -> "10000"
// 8진수 문자열을 반환한다.
(16).toString(8); // -> "20"
// 16진수 문자열을 반환한다.
(16.)toString(16); // -> "10"
```

##