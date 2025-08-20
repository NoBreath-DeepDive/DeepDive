# 18장 함수와 일급 객체

# 일급 객체

- 일급 객체 조건
    1. 무명의 리터럴로 생성할 수 있다. 즉, 런타임에 생성이 가능하다.
    2. 변수나 자료구조(객체, 배열 등)에 저장할 수 있다.
    3. 함수의 매개변수에 전달할 수 있다.
    4. 함수의 반환값으로 사용할 수 있다. 
    
    ```jsx
    // 1. 함수는 무명의 리터럴로 생성할 수 있다.
    // 2. 함수는 변수에 저장할 수 있다.
    // 런타임(할당 단계)에 함수 리터럴이 평가되어 함수 객체가 생성되고 변수에 할당된다.
    const increase = function (num) {
    	return ++num;
    };
    
    const decrease = function (num) {
    	return --num;
    };
    
    // 2. 함수는 객체에 저장할 수 있다.
    const auxs = { increase, decrease };
    
    // 3. 함수의 매개변수에 전달할 수 있다.
    // 4. 함수의 반환값으로 사용할 수 있다.
    function makeCounter(aux) {
    	let num = 0;
    	
    	return function(){
    		num = aux(num);
    		return num;
    	};
    }
    
    // 3. 함수의 매개변수에 전달할 수 있다.
    const increaser = makeCounter(auxs.increase);
    console.log(increaser()); // 1
    console.log(increaser()); // 2
    
    // 3. 함수의 매개변수에 전달할 수 있다.
    const increaser = makeCounter(auxs.decrease);
    console.log(decreaser()); // -1
    console.log(decreaser()); // -2
    ```
    
- 자바스크립트의 함수는 위의 조건을 모두 만족하므로 **일급 객체**다.
    - 함수가 일급 객체라는 것은 함수를 객체와 동일하게 사용할 수 있다는 의미
- 함수도 객체처럼 프로퍼티를 가진다. (`Object.getOwnpropertyDescriptors` 메서드로 확인가능)
    - arguments, caller, length, name, prototype 등등
    - `arguments` 프로퍼티
        - arguments 프로퍼티의 값은  arguments 객체이다
        - 함수 호출 시 전달된 인수들의 정보를 담고 있는 순회 가능한 유사 배열 객체이다. 
        (+ 이터러블 이기도 하다)
            - 유사 배열 객체
                - 배열 형태로 인자 정보를 담고 있지만 실제 배열이 아니다.
                - length 프로퍼티를 가진 객체로 for문으로 순회할 수 있는 객체이다.
                - 배열이 아니므로 배열 메서드를 사용할 경우 에러가 발생한다.
                (call, apply를 사용해 간접 호출해야 사용 가능하다.)
        - 함수 내부에서 지역 변수처럼 사용된다.
        - 매개변수 개수를 확정할 수 없는 가변 인자 함수를 구현할 때 유용하다.
            
            ```jsx
            function sum() {
            	let res = 0;
            	
            	// arguments 객체는 length 프로퍼티가 있는 유사 배열 객체이므로 for 문으로 순회 가능
            	for (let i = 0; i < arguments.length; i++) {
            		res += arguments[i];
            	}
            	
            	return res;
            }
            
            console.log(sum()); // 0
            console.log(sum(1, 2)); // 3
            console.log(sum(1, 2, 3)); // 6
            ```
            
        - ES6에 도입된 Rest 파라미터 사용 권장
    - `length` 프로퍼티
        - 함수 객체의 length 프로퍼티는 함수를 정의할 때 선언한 매개변수의 개수를 가리킨다.
            
            ```jsx
            function foo() {}
            console.log(foo.length); // 0
            
            function bar(x) {
            	return x;
            }
            console.log(bar.length); // 1
            
            function baz(x, y) {
            	return x + y;
            }
            console.log(baz.length); // 2
            ```
            
        - arguments 객체의 length : 인자의 개수
        - 함수 객체의 length : 매개 변수의 개수
    - `name` 프로퍼티
        - 함수 객체의 name 프로퍼티는 함수 이름을 나타낸다.
        - ES6 이후 표준이 되었고, ES5와 ES6에서 동작을 달리하니 주의해야 한다.
            - ES5 → 익명 함수 표현식에서 name 프로퍼티는 빈 문자열을 값으로 갖는다.
            - ES6  → 익명 함수 표현식에서 name 프로퍼티는 함수 객체를 가리키는 식별자를 값으로 갖는다.
            
            ```jsx
            // 기명 함수 표현식
            var namedFunc = function foo() {};
            console.log(namedFunc.name); // foo
            
            // 익명 함수 표현식
            var anonymousFunc = function() {};
            // ES5 : name 프로퍼티는 빈 문자열을 값으로 갖는다.
            // ES6 : name 프로퍼티는 함수 객체를 가리키는 변수 이름을 값으로 갖는다.
            console.log(anonymousFunc.name); // anonymousFunc
            
            // 함수 선언문(Function declaration)
            function bar() {}
            console.log(bar.name); // bar
            ```
            
    - `__proto__` 접근자 프로퍼티
        - __proto__ 프로퍼티는 [[prototype]]  이라는 내부 슬롯이 가리키는 프로토타입 객체에 접근하기 위해 사용하는 접근자 프로퍼티다.
        
        ```jsx
        const obj = { a:1 };
        
        // 객체 리터럴 방식으로 생성한 객체의 프로토타입 객체는 Object.prototype이다.
        console.log(obj.__proto__ === Object.prototype); // true
        
        // 객체 리터럴 방식으로 생성한 객체는 프로토타입 객체인 Object.prototype의 프로퍼티를 상속받는다.
        // hasOwnProperty 메서드는 Object.prototype의 메서드다.
        console.log(obj.hasOwnProperty('a')); // true
        consoel.log(obj.hasOwnProperty('__proto__')) // false
        ```
        
        - `hasOwnProperty` 메서드
            - 인수로 전달받은 프로퍼티 키가 객체 고유의 프로퍼티 키인 경우에만 true를 반환하고
            상속받은 프로토타입의 프로퍼티 키인 겨우 false를 반환한다.
            
            ```jsx
            const obj = {a :1};
            
            console.log(obj.hasOwnProperty('a')); // true
            ```
            
    - `prototype` 프로퍼티
        - prototype 프로퍼티는 생성자 함수로 호출할 수 있는 함수 객체, 즉 constructor만이 소유하는 프로퍼티다.
        - prototype 프로퍼티는 함수가 객체를 생성하는 생성자 함수로 호출될 때 생성자 함수가 생성할 인스턴스의 프로토타입 객체를 가리킨다.