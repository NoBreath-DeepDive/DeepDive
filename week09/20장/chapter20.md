# 20장 strict mode

# 20.1 strict mode?

: strict mode(엄격 모드)는 자바스크립트  언어의 문법을 좀 더 엄격히 적용하여 오류를 발생시킬 가능성이 높거나 자바스크립트 엔진의 최적화 작업에 문제를 일으킬 수 있는 코드에 대해 명시적인 에러를 발생시키는 것이다. 

```jsx
function foo(){
	x = 10; // 선언하지 않은 x변수 -> 암묵적 전역 발생
}
foo();

console.log(x); //10
```

- 잠재적인 오류를 발생시키기 어려운 개발 환경을 만들고 그 환경에서 개발하는 것이 안정적인 코드를 생산하는 근본적인 해결책이라고 할 수 있다. 이를 지원하기 위해 ES5부터 strict mode가 추가되었다.
- ESLint 같은 린트 도구를 사용해도 strict mode와 유사한 효과를 얻을 수 있다. 린트 도구는 정적 분석 기능을 통해 소스코드를 실행하기 전에 소스코드를 스캔하여 문법적 오류만이 아니라 잠재적 오류까지 찾아내고 오류의 원인을 리포팅해주는 도구이다.
- 린트 도구는 strict mode가 제한하는 오류는 물론 코딩 컨벤션을 설정 파일 형태로 정의하고 강제할 수 있기 때문에 효과가 더 강력하다. (필자는 strict mode보다 린트 도구의 사용을 선호한다고 함)

# 20.2 strict mode의 적용

```jsx
'use strict'; // strict mode 활성화
```

- `'use strict';`를 전역의 선두나 함수 몸체의 첫 번째 실행문에 추가하면 strict mode가 적용된다. 전역의 선두에 추가하면 스크립트 전체에 적용된다.

```jsx
'use strict'; // 전역에 선언해서 스크립트 전체가 strict mode로 실행된다

function foo(){
	x=10; // ReferenceError: x is not defined
}
foo();
```

```jsx
function foo(){
	'use strict'; // 함수 몸체의 맨 앞에 위치해서 foo 함수 내부에서만 strict mode가 적용된다
	 // 함수 전역에는 적용되지 않는다.
	 x=10; // ReferenceError: x is not defined
	 // 변수 선언 해야한다. 
}
foo();
```

```jsx
function foo(){	 
	 x=10; // 에러가 발생하지 않는다 (암묵적 전역 변수 생성
	 'use strict'; // 함수 몸체의 첫 줄이 아니라서 무시된다. 문자열로 처리됨
}
foo();
```

# 20.3 전역에 strict mode를 적용하는 것은 피하기

- 전역에 적용한 strict mode는 스크립트 단위로 적용된다

```jsx
<!DOCTYPE html>
<html> 
<body>
	<script>
		'use strict'; // 다른 스크립트에 영향을 주지 않고 해당 스크립트에 한정되어 적용됨
	</script>
	<script>
		x = 1; // 에러가 발생하지 않는다.
		console.log(y);
	</script>
	<script>
		'use strict';
		
		y = 1; // ReferenceError: x is not defined
		console.log(y);
		</script>
</body>
</html> 
// 스크립트 단위로 적용된 strict mode는 다른 스크립트에 영향을 주지 않고 해당 스크립트에 한정되어 적용된다.
```

- 외부 서드파티 라이브러리를 사용하는 경우 라이브러리가 non-script mode인 경우도 있기 때문에 전역에 적용하는 것은 바람직하지 않으므로(예상치 못한 오류 발생 가능),
- 즉시 실행 함수로 스크립트 전체를 감싸서 스코프를 구분하고 즉시 실행 함수의 선두에 strict mode 적용하자

```jsx
// 즉시 실행 함수의 선두에 strict mode 적용
(function () {
	'use strict';
	
	// Do something..
}());
```

# 20.4 함수 단위로 strict mode를 적용하는 것도 피하기

- 모든 함수에 일일이 strict mode를 적용하는 것이 번거롭고, 어떤 함수는 strict mode를 적용하고 어떤 함수는 적용하지 않는 것은 바람직하지 않다.

```jsx
(function () {
	// non-strict mode
	var let = 10; // 에러 발생하지 않지만, strict mode에서는 SyntaxError이다. 
	
	function foo(){
		'use strict'; // 올바른 선언
		
		let = 20; // SyntaxError: Unexpected strict mode reserved word - 에러 발생
	}
	foo();
}());

```

- 그래서 즉시 실행 함수로 감싼 스크립트 단위로 적용하는 것이 바람직하다.

# 20.5 strict mode가 발생시키는 에러

## 20.5.1 암묵적 전역

- 선언하지 않은 변수를 참조하면 ReferenceError가 발생한다.

```jsx
(function () {
  'use strict';

  // ReferenceError: x is not defined
  x = 1;
  console.log(x);
}());
```

## 20.5.2 변수, 함수, 매개변수의 삭제

- delete 연산자로 변수, 함수, 매개변수를 삭제하면 SyntaxError가 발생한다.

```jsx
(function (){
	'use strict';
	
	var x = 1;
	delete x; //SyntaxError: Delete of an unqualified identifier in strict mode.
	
	function foo(a){
		delete a; //SyntaxError: Delete of an unqualified identifier in strict mode.
	}
	delete foo; //SyntaxError: Delete of an unqualified identifier in strict mode.
}());
```

## 20.5.3 매개변수 이름의 중복

- 중복된 매개변수의 이름을 사용하면 SyntaxError가 발생한다.

```jsx
(function () {
  'use strict';

  //SyntaxError: Duplicate parameter name not allowed in this context
  function foo(x, x){ // 매개변수 중복으로 에러 발생
    return x + x ;
  }
  console.log(foo(1,2));
}());
```

## 20.5.4 with문의 사용

- with문을 사용하면 SyntaxError가 발생한다. with문은 동일한 객체의 프로퍼티를 반복해서 사용할 때 객체 이름을 생략할 수 있어서 코드가 간단해지는 효과가 있지만 성능과 가독성이 나빠지므로 사용하지 않는 것이 좋다.

```jsx
(function () {
  'use strict';

  // SyntaxError: Strict mode code may not include a with statement
  with({ x: 1 }){
  console.log(x);
  }
}());
```

## 20.6 strict mode 적용에 의한 변화

### 20.6.1 일반 함수의 this

- strict mode에서 함수를 일반 함수로서 호출하면 this에 undefined가 된다. 생성자 함수가 아닌 일반 함수 내부에서는 this를 사용할 필요가 없기 때문이다. 이때 에러는 발생하지 않는다.

```jsx
(function () {
	'use strict';

  function foo(){
    console.log(this); //undefined
  }
  foo(); // 일반 함수 호출 -> this === undefined(strict)
  // 실수 방지를 위해 this를 암묵적으로 window에 바인딩하지 않음

  function Foo(){
    console.log(this); //Foo {}
  }
  new Foo(); // new 키워드 사용한 생성자 호출 -> this === 새로 만들어진 Foo 객체
}());
```

### 20.6.2 arguments 객체

- strict mode에서는 매개변수에 전달된 인수를 재할당하여 변경해도 srguments 객체에 반영되지 않는다.

```jsx
(function (a){
  'use strict';
  a = 2; //재할당

  // 변경된 인수가 arguments 객체에 반영되지 않는다. 
  console.log(arguments); //[Arguments] { '0': 1 }
	// strict mode에서는 a와 argument[0]이 서로 독립적이라서(arguments와 매개변수 간의 동기화가 끊어짐) 값이 변하지 않는다. 
}(1));
```