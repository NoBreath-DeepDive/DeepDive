# 24장 클로저

<aside>
❓

클로저는 함수와 그 함수가 선언된 렉시컬 환경과의 조합이다.

</aside>

- ?? 뭔소리지

```jsx
const x = 1;

function outerFunc() {
	const x = 10;
	
	function innerFunc() { // outerFunc의 x 변수에 접근 가능
		console.log(x); // 10
	}
	
	innerFunc();
}

outerFunc();

```

```jsx
const x = 1;

function outerFunc() {
	const x = 10;	
	innerFunc();
}

function innerFunc() {
	console.log(x); // 1
}

outerFunc();

```

## 렉시컬 스코프 (정적 스코프)

- 함수를 어디서 호출했는지가 아니라 함수를 어디서 정의했는지에 따라 상위 스코프를 결정한다.
= 함수의 상위 스코프는 함수 정의가 실행될 때 정적으로 결정된다.

```jsx
const x = 1;

function foo() {
	const x = 10;
	bar();
}

function bar() {
	console.log(x);
}

foo(); // 1
bar(); // 1
```

- 함수의  상위 스코프를 결정한다.
    - = 렉시컬 환경의 외부 렉시컬 환경에 대한 참조에 저장할 참조값을 결정한다.
- 렉시컬 환경의 “외부 렉시컬 환경에 대한 참조”에 저장할 참조값, 즉 상위 스코프에 대한 참조는 함수 정의가 평가되는 시점에 **함수가 정의된 환경(위치)에 의해** 결정된다. (= **렉시컬 스코프**)

## 함수 객체의 내부 슬롯 [[Environment]]

- 함수가 정의된 환경(위치)과 호출되는 환경(위치)는 다를 수 있다.
    - 그래서 렉시컬 스코프가 가능하려면 호출되는 환경과는 상관없이 자신이 정의된 환경, 즉 상위 스코프를 기억해야 한다.
        - 왜? 함수 정의가 위치하는 스코프가 상위 스코프니까~
        - 함수 내부 슬롯 [[Environment]] 에 상위 스코프의 참조를 저장한다.
        - 함수 객체는 내부슬롯 [[Environment]] 에 저장한 렉시컬 환경의 참조, 즉 상위 스코프를 자신이 존재하는 한 기억한다.
        
        ```jsx
        const x = 1;
        
        function foo() {
        	const x = 10;
        	
        	// 상위 스코프는 함수 정의 환경(위치)에 따라 결정된다.
        	// 함수 호출 위치와 상위 스코프는 아무런 관계가 없다.
        	bar();
        }
        
        // 함수 bar는 자신의 상위스코프, 즉 전역 렉시컬 환경을 [[Environment]]에 저장하여 기억한다.
        function bar() {
        	console.log(x);
        }
        
        foo(); // 1
        bar(); // 1
        ```
        

## 클로저와 렉시컬 환경

- 클로저 예제
    
    ```jsx
    const x = 1;
    
    // ①
    function outer() {
    	const x = 10;
    	const inner = function () { console.log(x); }; // ②
    	return inner;
    }
    
    // outer 함수를 호출하면 중첩 함수 inner를 반환한다.
    // 그리고 outer 함수의 실행 컨텍스트는 실행 컨텍스트 스택에서 팝되어 제거된다.
    const innerFunc = outer(); // ③
    innerFunc(); // ④ 10
    ```
    
    - ③ : outer 함수를 호출하면 outer 함수는 중첩 함수 inner를 반환하고 생명 주기를 마감한다.
        - 즉 outer 함수의 실행이 종료되면 outer 함수의 실행 컨텍스트는 실행 컨텍스트 스택에서
        제거(pop) 된다.
            - 비밀
                - 이때 outer 함수의 실행 컨텍스트는 실행 컨텍스트 스택에서 제거되지만 outer 함수의 렉시컬 환경까지 소멸하는 것은 아니다.
                    - outer 함수의 렉시컬 환경은 inner 함수의 [[Environment]] 내부 슬롯에 의해 참조되고 있고 inner 함수는 전역변수 innerFunc 에 의해 참조되고 있으므로 가비지 컬렉션의 대상이 되지 않기 때문.
                    - 가비지 컬렉션은 누군가 참조하고 있는 메모리 공간을 함부로 해제하지 않는다.
                    - 그래서 ④ 에서 x가 참조 가능하다.
        - 이때 outer 함수 지역 변수 x와 변수 값 10을 저장하고 있던 outer 함수의 실행 컨텍스트가 제거되었으므로 outer 함수의 지역 변수 x 또한 생명주기를 마감한다.
        - 따라서 outer 함수의 지역 변수 x는 더는 유효하지 않게 되어 x 변수에 접근할 수 있는 방법이 없..을 것 같아 보인다.
    - ④ : 그러나 위 코드 실행 결과는 outer 함수의 지역 변수 x의 값인 10이다.
        - 이미 생명주기가 종료되어 실행 컨텍스트 스택에서 제거된 outer 함수의 지역 변수 x가 어떻게..?
    - 이렇게 외부 함수보다 중첩 함수가 더 오래 유지되는 경우 중첩 함수는 이미 생명주기가 종료한 외부 함수의 변수를 참조할 수 있다.
    이러한 중첩 함수를 **클로저**라고 부른다
- 자바스크립트의 모든 함수는 자신의 상위 스코프를 기억한다고 했다. 모든 함수가 기억하는 상위 스코프는 함수를 어디서 호출하든 상관없이 유지된다.
- 자바스크립트의 모든 함수는 상위 스코프를 기억하므로 이론적으로 모든 함수는 클로저다.
    - 하지만 일반적으로 모든 함수를 클로저라고 하지는 않는다.
    - 상위 스코프의 어떤 식별자도 참조하지 않는 함수는 클로저가 아니다.
    - 클로저가 아닌 예시 1
        
        ```jsx
        function foo() {
        	const x = 1;
        	const y = 2;
        	
        	// 일반적으로 클로저라고 하지 않는다.
        	function bar() {
        		const z = 3;
        		// 상위 스코프의 식별자를 참조하지 않는다.
        		console.log(z);
        	}
        	return bar();
        }
        
        const bar = foo();
        bar();
        ```
        
        - 하위 스코프(내부 함수 bar)에서 상위 스코프(외부 함수 foo)의 식별자(x, y)를 참조하지 않으므로 클로저라고 부르지 않는다.
    - 클로저가 아닌 예시 2
        
        ```jsx
        function foo() {
        	const x = 1;
        	
        	// bar 함수는 클로저였지만 곧바로 소멸한다.
        	// 이러한 함수는 일반적으로 클로저라고 하지 않는다.
        	function bar() {
        		// 상위 스코프의 식별자를 참조한다.
        		console.log(x);
        	}	
        	bar();
        }
        
        foo();
        ```
        
        - 중첩 함수 bar는 상위 스코프의 식별자를 참조하고 있다.
        하지만 외부 함수 foo의 외부로 중첩 함수 bar가 반환되지 않는다.
            - = 즉 외부함수 foo보다 중첩 함수 bar의 생명 주기가 짧다
            - → 생명 주기가 종료된 외부 함수의 식별자를 참조할 수 있다는 클로저의 본질에 부합하지 않는다.
    - 클로저 예시
        
        ```jsx
        function foo() {
        	const x = 1;
        	const y = 2;
        	
        	// 클로저
        	// 중첩 함수 bar는 외부 함수보다 더 오래 유지되며 상위 스코프의 식별자를 참조한다.
        	function bar() {
        		console.log(x);
        	}
        	return bar();
        }
        
        const bar = foo();
        bar();
        ```
        
        - 이럴 때 클로저라고 부른다.
            - 중첩 함수가 상위 스코프의 식별자를 참조하고 있다.
            - 중첩 함수가 외부 함수보다 더 오래 유지되는 경우
- 클로저에 의해 참조되는 상위 스코프의 변수를 **자유 변수**라고 부른다.

## 클로저의 활용

- 클로저는 **상태를 안전하게 변경하고 유지**하기 위해 사용한다.
    - 상태가 의도치 않게 변경되지 않도록 상태를 안전하게 은닉하고 특정 함수에게만 상태 변경을 허용하기 위해 사용된다.
- 좋지 않은 코드 예시
    
    ```jsx
    // 카운트 상태 변수
    let num = 0;
    
    // 카운트 상태 변경 함수
    const increase = function () {
    	// 카운트 상태를 1만큼 증가시킨다.
    	return ++num;
    }
    
    console.log(increase()); // 1
    console.log(increase()); // 2
    console.log(increase()); // 3
    ```
    
    - 카운트 상태가 전역 변수를 통해 관리되고 있기 때문에 언제든지 누구나 접근할 수 있고 변경할 수 있다.
        - 의도치 않게 상태가 변경될 수 있다.
- 위 코드의 개선
    - 상태를 안전하게 관리하기 위해 increase 함수만이  num 변수를 참조하고 변경할 수 있도록 
    전역 변수 num을 increase 함수의 지역 변수로 바꾸어 의도치 않은 상태 변경을 방지했다.
    
    ```jsx
    // 카운트 상태 변경 함수
    const increase = function () {
    	// 카운트 상태 변수
    	let count = 0;
    	
    	// 카운트 상태를 1만큼 증가시킨다.
    	return ++num;
    }
    
    // 이전 상태가 유지되지 못한다.
    console.log(increase()); // 1
    console.log(increase()); // 1
    console.log(increase()); // 1
    ```
    
    - 의도치 않은 상태 변경은 방지했다.
    - 하지만 increase 함수가 호출될 때마다 num이 0으로 초기화되기 때문에 출력 결과는 언제나 1이다.
- 위 코드의 개선
    - 이전 상태를 유지할 수 있도록 클로저를 사용했다.
    
    ```jsx
    // 카운트 상태 변경 함수
    const increase = (function () {
    	// 카운트 상태 변수
    	let num = 0;
    	
    	// 클로저
    	return function () {
    		// 카운트 상태를 1만큼 증가시킨다.
    		return ++num
    	};
    }());
    
    const increase = function () {
    	// 카운트 상태를 1만큼 증가시킨다.
    	return ++num
    };
    
    console.log(increase()); // 1
    console.log(increase()); // 2
    console.log(increase()); // 3
    ```
    
    - 위 코드 흐름
        - 위 코드가 실행되면 즉시 실행 함수가 호출되고 즉시 실행 함수가 반환한 함수가 increase 변수에 할당된다.
        - increase 변수에 할당된 함수는 자신이 정의된 위치에 의해 결정된 상위 스코프인 즉시 실행 함수의 렉시컬 환경을 기억하는 클로저다.
        - 즉시 실행 함수는 호출 된 이후 소멸되지만 즉시 실행 함수가 반환한 클로저는 increase 변수에 할당되어 호출된다. 이때 즉시 실행 함수가 반환한 클로저는 자신이 정의된 위치에 의해 결정된 상위 스코프인 즉시 실행 함수의 렉시컬 환경을 기억하고 있다.
        - 따라서 즉시 실행 함수가 반환한 클로저는 카운트 상태를 유지하기 위한 자유 변수 num을 언제 어디서 호출하든지 참조하고 변경할 수 있다.
    - 이처럼 클로저는 상태가 의도치 않게 변경되지 않도록 안전하게 은닉하고 특정 함수에게만 상태 변경을 허용하여 상태를 안전하게 변경하고 유지하기 위해 사용된다.
- 클로저 사용 예제
    
    ```jsx
    // 함수를 인수로 전달받고 반환하는 고차 함수
    // 이 함수는 카운트 상태를 유지하기 위한 자유 변수 counter를 기억하는 클로저를 반환한다.
    function makeCounter(aux) {
    	// 카운트 상태를 유지하기 위한 자유 변수
    	let count = 0;
    	
    	// 클로저 반환
    	return function() {
    		// 인수로 전달받은 보조 함수에 상태 변경을 위임한다.
    		counter = aux(counter);
    		return counter;
    	};
    }
    
    // 보조 함수
    function increase(n) {
    	return ++n;
    }
    
    // 보조 함수
    function decrease(n) {
    	return --n;
    ]
    
    // 함수로 함수를 생성한다.
    // makeCounter 함수는 보조 함수를 인수로 전달받아 함수를 반환한다.
    const increaser = makeCounter(increase); // ①
    console.log(increaser()); // 1
    console.log(increaser()); // 2
    
    // increaser 함수와는 별개의 독립된 렉시컬 환경을 갖기 때문에 카운터 상태가 연동하지 않는다.
    const decreaser = makeCounter(decrease); // ②
    console.log(decreaser()); // -1
    console.log(decreaser()); // -2
    ```
    
    - makeCounter 함수를 호출해 함수를 반환할 때 반환된 함수는 자신만의 독립된 렉시컬 환경을 갖는다.
    - 위 예제의 전역 변수 increaser와 decreaser에 할당된 함수는 각각 자신만의 독립된 렉시컬 환경을 갖기 때문에 카운트를 유지하기 위한 자유 변수 counter를 공유 하지 않아 카운터의 증감이 연동되지 않는다.
    - 따라서 연동하여 증감이 가능한 카운터를 만들려면 렉시컬 환경을 공유하는 클로저를 만들어야 한다.
        - 이를 위해 makeCounter 함수를 두 번 호출하지 말아야 한다.
- 위 예제 수정
    
    ```jsx
    // 함수를 반환하는 고차 함수
    // 이 함수는 카운트 상태를 유지하기 위한 자유 변수 counter를 기억하는 클로저를 반환한다.
    const counter = (function() {
    	// 카운트 상태를 유지하기 위한 자유 변수
    	let count = 0;
    	
    	// 함수를 인수로 전달받는 클로저 반환
    	return function(aux) {
    		// 인수로 전달받은 보조 함수에 상태 변경을 위임한다.
    		counter = aux(counter);
    		return counter;
    	};
    }()}
    
    // 보조 함수
    function increase(n) {
    	return ++n;
    }
    
    // 보조 함수
    function decrease(n) {
    	return --n;
    ]
    
    // 보조 함수를 전달하여 호출
    console.log(counter(increase)); // 1
    console.log(counter(increase)); // 2
    
    // 자유 변수를 공유한다.
    console.log(counter(decrease)); // 1
    console.log(counter(decrease)); // 0
    ```
    

## 캡술화와 정보 은닉

- **캡슐화** : 객체의 상태를 나타내는 프로퍼티와 프로퍼티를 참조하고 조작할 수 있는 동작인 메서드를 하나로 묶는 것을 말한다.
- 캡슐화는 객체의 특정 프로퍼티나 메서드를 감출 목적으로 사용하기도 하는데 이를 **정보 은닉** 이라 한다.
    - 외부에 공개할 필요가 없는 구현의 일부를 외부에 공개되지 않도록 감추어 적절치 못한 접근으로부터
        1. 객체의 상태가 변경되는 것을 방지해 정보를 보호
        2. 객체 간의 상호 의정성, 즉 결합도를 낮추는 효과
- 자바스크립트는 public, private, protected 같은 접근 제한자를 제공하지 않는다.
    - 기본적으로 모든 프로퍼티와 메서드는 외부에 공개된 public이다
    - ES2019부터 해쉬 # prefix를 추가해 private class 필드를 선언할 수 있게 되었다.
        
        [Private class fields - JavaScript | MDN](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Classes/Private_properties)
        

## 자주 발생하는 실수

- let, const 쓰세요. 그럼 실수 따위 없습니다.