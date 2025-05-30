# 14장 전역 변수의 문제점

# 14.1 변수의 생명 주기

## 14.1.1 지역 변수의 생명 주기

변수는 자신이 선언된 위치에서 생성되고 소멸한다. 전역 변수의 생명 주기는 애플리케이션의 생명 주기와 같다. 하지만 함수 내부에서 선언된 지역 변수는 함수가 호출되면 생성되고 함수가 종료하면 소멸한다. 

```tsx
function foo(){ //2. 함수 실행
	// 변수 x 생성됨
	var x = 'local'; //변수 x에 값 할당됨 (지역 변수)
	console.log(x); //출력 : local
	return x; //함수 종료
	// 변수 x 소멸됨
}

foo(); //1. 함수 호출되어 지역변수 생성됨
console.log(x); //ReferenceError: x is not defined / 소멸됨
```

### 순서

foo 함수 호출 → x 변수의 선언문이 가장 먼저 실행되어 x 변수가 선언되고 undefined로 초기화된 후 

→ 함수 몸체를 구성하는 문들이 순차적으로 실행되기 시작하고 변수 할당문이 실행되면 x 변수에 값이 할당된다. → 함수가 종료되면 x 변수도 소멸되어 생명 주기가 종료된다. 

함수 내부에서 선언된 지역 변수 x는 foo 함수가 호출되어 실행되는 동안에만 유효하다. 

> 즉, 지역 변수의 생명주기는 함수의 생명 주기와 일치한다.
> 

변수 : 하나의 값을 저장하기 위해 확보한 메모리 공간 자체 또는 메모리 공간을 식별하기 위해 붙인 이름

- 변수의 생명 주기 = 메로리 공간이 확보된 시점부터 메모리 공간이 해제되어 가용 메모리 풀에 반환되는 시점까지.

<aside>
❓

가용 메모리 풀 : 미리 만들어둔 “쓸 수 있는 메모리 공간”의 목록. 빠르고 재사용이 가능함

</aside>

- 자신이 등록된 스코프가 소멸(메모리 해제)될 때까지 유효하다.
- 할당된 메모리 공간은 아무도 참조하지 않을 때 가비지 콜렉터에 의해 해제되어 가용 메모리 풀에 반환된다.
- 누군가가 스코프를 참조하면 스코프는 해제되지 않는다. (24장 클로저에서 살펴보기)

```tsx
// 전역 변수 x 생성
var x = 'global'; //전역 변수 x에 값 할당

function foo(){
// 지역 변수 x 생성
	console.log(x); // 지역 변수 x에 값 할당/ ***1***
	var x = 'local';
	// 지역 변수 x 소멸
}

foo(); //함수 선언
console.log(x); //global
```

- 지역변수 x 는 1의 시점에 이미 선언되었고 undefined로 초기화되어 있다.
- 지역 변수 x를 참조해 값을 출력한다. → 즉, **지역 변수는 함수 전체에서 유효하다.**
- 단, 변수 할당문이 실행되기 이전까지는 undefined 값을 갖는다.

> **호이스팅은 스코프를 단위로 동작한다.**
> 
- 지역 변수의 호이스팅은 지역 변수의 선언이 지역 스코프의 선두로 올려진 것처럼 동작한다. → 호이스팅은 “그냥 위로 올리는게 아니라” 해당 변수나 함수가 선언된 스코프(범위) 안에서만 위로 올려진다. 즉, 자바스크립트가 함수 전체를 실행하기 전에 함수 안에서 선언된 var x를 그 함수의 안에서만 호이스팅되고, 전역에 있는 x와는 별개다.

> **호이스팅은 변수 선언이 스코프의 선두로 끌어 올려진 것처럼 동작하는 자바스크립트 고유의 특징이다.**
> 

### 자바스크립트가 해석하는 방식 - 실행 순서대로 바꾸면

```tsx
var x = 'global'; // (1) 전역 변수 x에 'global' 할당

function foo() {
  var x;          // (2) 지역 변수 x가 호이스팅됨 → undefined로 초기화됨
  console.log(x); // (3) 지역 변수 x는 아직 값이 없으므로 undefined 출력
  x = 'local';    // (4) 지역 변수 x에 'local' 할당
}

foo();            // (5) 함수 호출 → 위 순서대로 실행

console.log(x);   // (6) 전역 변수 x는 여전히 'global' → 그래서 'global' 출력
```

- undefined 가 찍히는 이유 → 지역 변수 x가 함수 안에서 호이스팅 되었기 때문
    - foo() 안에서 console.log(x)를 하면, js는 먼저 그 안의 x가 함수 안에서 선언되었는지 본다.
    - 함수 안에서 var x가 있으므로 이 x를 사용한다. 이때 전역 x는 무시한다.
    - 하지만 할당(x=’local’)은 아직 실행되지 않는다.
    - 그래서 지역 변수 x는 undefined 상태이다.
    - 결과적으로 console.log(x)는 undefined를 출력한다.

## 14.1.2 전역 변수의 생명 주기

- 전역 변수는 호출 없이 실행된다.
- 전역 코드는 함수 호출과 같이 전역 코드를 실행하는 특별한 진입점이 없고 코드가 로드되자마자 곧바로 해석되고 실행된다.
- 함수는 전역코드에서는 반환문을 사용할 수 없으므로 마지막 문이 실행되어 더 이상 실행할 문이 없을 때 종료한다.
- var 키워드로 선언한 전역 변수는 전역 객체의 프로퍼티가 된다. 이는 전역 변수의 생명 주기가 전역 객체의 생명주기와 일치한다는 것

<aside>
✅

전역 객체
코드가 실행되기 이전 단계에서 js 엔진에 의해 어떤 객체보다도 먼저 생성되는 특수한 객체.

전역 객체는 클라이언트 사이드 환경에서는 window, 서버 사이드 환경에서는 global 객체를 의미함.

전역 객체는 표준 빌트인 객체와 환경에 따른 호스트 객체, 그리고 var 키워드로 선언한 전역 변수와 전역 함수를 프로퍼티로 갖는다. (21장 빌트인 객체에서 살펴보기)

</aside>

- 브라우저 환경에서 var 키워드로 선언한 전역 변수는 전역 객체 window의 프로퍼티다. 전역 객체 window는 웹페이지를 닫기 전까지 유효하므로 브라우저 환경에서 var 키워드로 선언한 전역 변수는 웹페이지를 닫을 때까지 유효하다.

> **즉, var 키워드로 선언한 전역 변수의 생명주기 = 전역 객체의 생명주기**
> 

# 14.2 전역 변수의 문제점

### 1. 암묵적 결합(Implicit Coupling)

- 전역 변수를 선언한 의도는 어디서든 참조하고 할당할 수 있는 변수를 사용하겠다는 것이다. 모든 코드가 전역 변수를 참조하고 변경할 수 있는 암묵적 결합을 허용하는 것이다.
- 변수의 유효범위가 클수록 가독성이 나빠지고 의도치 않게 상태가 변경될 수 있는 위험성도 높아진다.

### 2. 긴 생명주기

- 전역 변수는 생명 주기가 길다.
- 메로리 리소스도 오랜시간 소비한다.
- 전역 변수의 상태를 변경할 수 있는 시간도 길고 기회도 많다.
- var 키워드는 변수의 중복 선언을 허용하므로 생명 주기가 긴 전역 변수는 변수 이름이 중복될 가능성이 있다.

```tsx
var x = 1;
// ...

// 변수의 중복 선언. 기존 변수에 값을 재할당한다.
var x = 100;
console.log(x); // 100
```

- 지역 변수는 전역 변수보다 생명 주기기 훨씬 짧아서 전역 변수보다 상태 변경에 의한 오류가 발생할 확률이 작다.

### 3. 스코프 체인 상에서 종점에 존재

- 전역 변수는 스코프 체인 상에서 종점에 존재하므로 전역 변수의 검색 속도가 가장 느리다.

### 4. 네임스페이스 오염

- 자바스크립트는 파일이 분리되어 있어도 하나의 전역 스코프를 공유한다.
- 다른 파일 내에서 동일한 이름으로 명명된 전역 변수나 전역 함수가 같은 스코프 내에 존재할 경우 예상치 못한 결과를 가져올 수 있다.

<aside>
❓

네임스페이스 : 이름들을 구분하는 공간
- 같은 이름의 변수나 함수가 여러 개 있어도 헷갈리지 않게 구분할 수 있게 해줌

</aside>

# 14.3 전역 변수의 사용을 억제하는 방법

- 전역 변수를 반드시 사용해야 할 이유가 없다면 지역 변수를 사용해야 한다.
- 변수의 스코프는 좁을수록 좋다. 무분별한 전역 변수의 남발은 억제해야 한다.

전역 변수의 사용을 제한하는 방법을 알아보자.

## 14.3.1 즉시 실행 함수(IIFE)

- 즉시 실행 함수는 단 한 번만 호출된다.
- 모든 코드를 즉시 실행 함수로 감싸면 모든 변수는 즉시 실행 함수의 지역 변수가 된다.

```tsx
(function () {
	var foo = 10; //즉시 실행 함수의 지역 변수
	// ...
}());

console.log(foo); //ReferenceError: foo is not defined 오류남 외부에서 접근 불가능
// 이 방법은 전역 변수를 생성하지 않으므로 라이브러리 등에 자주 사용된다.
```

- 함수 안에서 선언된 변수는 외부에서 접근할 수 없으므로 전역 변수 오염 방지에 아주 유용했다.
- ES6에서는 let, const, 블록 스코프 덕분에 굳이 즉시 실행 함수를 안써도 안전하게 코드를 짤 수 있다.
- 여전히 설정 초기화, 외부 노출 막기, 모듈화 구조에서 사용하기도 함.

## 14.3.2 네임스페이스 객체

- 전역에 네임스페이스 역할을 담당할 객체를 생성하고 전역 변수처럼 사용하고 싶은 변수를 프로퍼티로 추가하는 방법

```tsx
//전역 변수 대신 하나의 전역 객체(MYAPP) 안에 필요한 변수들을 속성(프로퍼티)로 저장하는 방식
var MYAPP = {}; //전역에 단 하나의 전역 네임스페이스 객체만 존재

MYAPP.name = 'Lee'; 

console.log(MYAPP.name); //Lee
```

- MYAPP이 네임스페이스 역할을 한다.
- 모든 값을 MYAPP의 속성으로 넣어서 전역 변수 이름이 중볼될 위험이 줄어든다.

네임스페이스 객체에 또 다른 네임스페이스 객체를 프로퍼티로 추가해서 네임스페이스를 계층적으로 구성할 수도 있다. 

```tsx
var MYAPP = {}; //전역 네임스페이스 객체(여전히 전역 공간을 차지함)

MYAPP.person = {
	name: 'Lee',
	address: 'Seoul'
};

console.log(MYAPP.person.name); //Lee
```

- person 이라는 속성 아래에 name, address를 또 넣는 방식이다.
- 네임스페이스를 트리처럼 계층 구조로 만들 수 있다.

네임스페이스를 분리해서 식별자 충돌을 방지하는 효과는 있지만 네임스페이스 객체 자체가 전역 변수에 할당되므로 유용하지 않음

그래서 ES6 이후로는 모듈 시스템(import/export)가 선호된다.

## 14.3.3 모듈 패턴

- 클래스를 모방해서 관련이 있는 변수와 함수를 모아 즉시 실행 함수로 감싸 하나의 모듈을 만든다.
- 모듈 패턴은 자바스크립트의 클로저를 기반으로 동작한다. (24장에서 살펴보기)
- 모듈 패턴의 특징은 전역 변수의 억제와 캡슐화까지 구현할 수 있다.
- 관련 있는 변수와 함수들을 하나로 묶고,  즉시 실행 함수로 감싸서 바로 실행 & 필요한 것만 외부에 노출하는 구조이다.

<aside>
❓

캡슐화 : 내부의 중요한 값을 숨기고, 외부에서는 함수를 통해서만 조작하게 하는 것

- 객체의 특정 프로퍼티나 메서드를 감출 목적으로 사용하기도 한다(정보 은닉)
- 외부가 중요한 내부 데이터를 바꾸지 못하게 막음
- 내부 변수는 외부 전역 변수랑 겹치지 않도록 함
</aside>

```tsx
var Counter = (function () {
  // private 변수 (외부에서 직접 접근 불가)
  var num = 0;

  // 외부에 공개할 메서드만 객체로 반환
  return {
    increase() {
      return ++num;
    },
    decrease() {
      return --num;
    }
  };
})(); // 즉시 실행

// private 변수는 외부로 노출되지 않음
console.log(Counter.num); //undefined (숨겨짐)

console.log(Counter.increase()); //1
console.log(Counter.increase()); //2
console.log(Counter.decrease()); //1
console.log(Counter.decrease()); //0
// num은 Counter 안에서만 사용 가능하고, 외부에서 직접 바꿀 수 없다
// increase, decrease 메서드를 통해서만 조작 가능하다 -> 정보 은닉
```

- 즉시실행 함수는 객체를 반환한다
- 이 객체는 외부에 노출하고 싶은 변수나 함수를 담아 반환한다
- 반환되는 객체의 프로퍼티는 외부에 노출되는 퍼블릭 멤버다
- 외부로 노출하고 싶지 않은 변수나 함수는 반환하는 객체에 추가하지 않으면 외부에서 접근할 수 있는 프라이핏 멤버가 된다. (24장 클로저에서 확인)

## 14.3.4 ES6 모듈

- ES6 모듈를 사용하면 전역 변수를 사용할 수 없다. ES6 모듈은 파일 자체의 독자적인 모듈 스코프를 제공한다.
- **각 자바스크립트 파일을 독립적인 모듈로 간주**하고, 모듈 간에는 import / export를 통해 변수나 함수를 주고받을 수 있게 만든 시스템이다.
- 모듈 내에서 var 키워드로 선언한 변수는 더는 전역 변수가 아니며 window 객체의 프로퍼티도 아니다.
- 모던 브라우저에서는 ES6 모듈를 사용할 수 있다.

```tsx
<script type="module" src="lib.mjs"></script>
<script type="module" src="app.mjs"></script>
```

- script태그에 type="module" 어트리뷰트를 추가하면 로드된 자바스크립트 파일은 모듈로서 동작한다.
- ES6모듈은 IE를 포함한 구형 브라우저에서는 동작하지 않고, 트랜스파일링이나 번들링이 필요하기 때문에 ES6 모듈 보다는 Webpack 등의 모듈 번들러를 사용하는 것이 일반적이다. (48장에서 살펴보기)