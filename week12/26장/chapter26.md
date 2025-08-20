### ⭐️26.1 함수의 구분

<aside>
🔑

→ ES6 이전 함수의 목적 (다양한 쓰임새)

1. 일반적인 함수로서 호출
2. NEW 연산자와 함께 호출하여 인스턴스 생성자 함수
3. 객체에 바인딩되어 메서드로서 호출

즉 **callable(호출 가능) + constructor(인스턴스 생성 가능)** 이 동시에 됨.

callable → 호출할 수 있는 함수 객체
constructor → 인스턴스를 생성할 수 있는 객체

```jsx
var foo = function () {
	return 1;
};

// 일반적인 함수로서 호출
foo(); // -> 1

// 생성자 함수로서 호출
new foo(); // foo {}

// 메서드로서 호출
var obj = { foo: foo };
obj.foo(); // -> 1
```

→ 이로 인한 문제점

메서드라고 부르던 객체에 바인딩된 함수도 callable + consturctor라는 것이다.
객체에 바인딩된 함수도 일반 함수로서 호출할 수도 있는 것은 물론 생성자 함수로서 호출할 수도있다.

```jsx
var obj = {
	x: 10,
	f: function () { return this.x; } // 메서드로만 쓰려고 만든 함수인데..
};

// 프로퍼티 f에 바인딩된 함수를 메서드로 호출
console.log(obj.f()); // 10

// 프로퍼티 f에 바인딩된 함수를 일반 함수로서 호출
var bar = obj.f;
console.log(bar()); // undefined (this === window.x)

// 프로퍼티 f에 바인딩된 함수를 생성자 함수로서 호출
console.log(new obj.f()); // f {}
```

객체에 바인딩된 함수를 다시 생성자 함수로 호출한다?

흔치는 않지만, 문법상 가능했다는 점.. 그리고 이는 성능 면에서 문제가 있다.
1. ES5 사양에서는 function 키워드로 정의한 함수는 **항상** 생성자 함수가 될 수 있는 대상으로 취급된다. → .prototype 객체가 하나 따라붙음
2. 따라서 헬퍼/콜백 함수도 (절대 new 생성자로 호출하지 않음) .prototype을 하나씩 들고 있게 된다.

```jsx
// 콜백 함수를 사용하는 고차함수 map. 콜백 함수도 constructor로 프로토타입을 생성
[1, 2, 3].map(function (item) {
	return item * 2;
}); // -> [2, 4, 6]

//-->  콜백은 인스턴스가 필요없는데 prototype이 붙어서 메모리 낭비!
```

→ 위를 해결하기 위해서 ES6에서는 함수를 목적에 따라 3가지 종류로 구분했다.

| ES6 함수의 구분 | consturctor | prototype | super | arguments |
| --- | --- | --- | --- | --- |
| 일반함수 | O | O | X | O |
| 메서드 | X | X | O | O |
| 화살표 함수 | X | X | X | X |
</aside>

### ⭐️26.2 메서드

<aside>
🔥

→ ES6 사양에서 메서드에 대한 정의가 명확하게 규정되었다.

- ES6 사양에서 메서드는 축약 표현으로 정의된 함수만을 의미한다.

```jsx
const obj = {
	x: 1
	// foo는 메서드다.
	foo() { return this.x; },
	// bar에 바인딩된 함수는 메서드가 아닌 일반 함수다.
	bar: function() { return this.x; }
};

console.log(obj.foo()); // 1
console.log(obj.bar()); // 1
```

→ ES6 사양에서 정의한 메서드는 인스턴스를 생성할 수 없는 non-constructor이다.

- 따라서 메서드는 생성자 함수로써 호출할 수 없다.
`new obj.foo(); // → TypeError, not a constructor`
- 일반 함수는 가능하다.
`new obj.bar(); // → bar {}`

→ ES6 메서드는 인스턴스를 생성할 수 없으므로 prototype 프로퍼티가 없고 프로토타입도 생성하지 않는다.

```jsx
// obj.foo 는 constructor가 아닌 ES6 메서드이므로 prototype 프로퍼티가 없다.
obj.foo.hasOwnProperty('prototype'); // -> false

// obj.bar는 constructor인 일반 함수이므로 prototype 프로퍼티가 있다.
obj.bar.hasOwnProperty('prototype'); // -> true
```

++ 표준 빌트인 객체가 제공하는 프로토타입 메서드와 정적메서드는 모두 non-constructor다.

→ ES6 메서드는 자신을 바인딩한 객체를 가리키는 내부슬롯 [[HomeObject]]를 갖는다.

- super 참조는 내부 슬롯 [[HomeObject]]를 사용하여 수퍼클래스의 메서드를 참조하므로 내부 슬롯 [[HomeObject]]를 갖는 ES6 메서드는 super 키워드를 사용할 수 있다.

```jsx
const base = {
	name: 'Lee',
	sayHi() {
		return `Hi! ${this.name}`;
	}
};

const derived = {
	__proto__: base,
	// sayHi는 ES6 메서드다, 메서드는 [[HomeObject]]를 갖는다.
	// sayHi의 [[HomeObject]]는 derived.prototype을 가리킨다.
	// super는 sayHi의 [[HomeObject]]의 프로토타입인 base.prototype을 가리킨다.
	sayHi() {
		return `${super.sayHi()}. how are you doing?`;
	}
};

console.log(derived.sayHi()); // Hi! Lee. how are you doing?
```

++ ES6 메서드가 아닌 함수는 super 키워드를 사용할 수 없다.

→ ES6 메서드는 본연의 기능(super)을 추가하고, 의미적으로 맞지 않는 기능(constructor)은 제거했다.

</aside>

### ⭐️26.3 화살표 함수

<aside>
👉

→ 화살표 함수는 function 키워드 대신 화살표를 사용하여 기존의 함수 정의 방식보다 간략하게 함수를 정의할 수 있다.

- 표현만 간략한 것이 아니라 내부 동작도 기존의 함수보다 간략하다.
- 콜백 함수 내부에서 this가 전역 객체를 가리키는 문제를 해결하기 위한 대안으로 유용하다.
</aside>

### **📌 26.3.1 화살표 함수 정의**

<aside>
📖

→ 화살표 함수 정의 문법

1. **함수정의**

→ 화살표 함수는 함수 선언문으로 정의할 수 없고 함수 표현식으로 정의해야 한다.

- 호출 방식은 기존 함수와 동일하다.

```jsx
const multiply = (x, y) => x * y; // 함수 표현식 축약형
multiply(2, 3); // -> 6 기존과 동일한 호출
```

1. **매개변수 선언**
- 매개변수가 여러 개인 경우 소괄호 () 안에 매개변수를 선언한다.
`const arrow = (x, y) ⇒ { … };`
- 매개변수가 한 개인 경우 소괄호 ()를 생략할 수 있다.
`const arrow = x ⇒ { … };`
- 매개변수가 없는 경우 소괄호 ()를 생략할 수 없다.
`const arrow = () ⇒ { … };`
1. **함수 몸체 정의**

```jsx
// concise body (간결한 몸체) -> 단일 표현식, {}중괄호 없어도 자동 return
const power = x => x ** 2;
power(2); // -> 4
// 위 표현은 다음과 동일하다. 
// block body
const power = x => { return x ** 2; };

// 중괄호 {} 생략 시 함수 몸체 내부의 문이 표현식이 아니면 에러
const arrow = () => const x = 1; // SyntaxError why? 선언문이기 때문.
// 위 표현은 다음과 동일하다.
const arrow = () => { return const x = 1; };
// 함수 몸체의 문이 표현식이 아닌 문이라면 중괄호를 생략할 수 없다.
const arrow = () => { const x = 1; };

// 객체 리터럴을 반환하는 경우 객체 리터럴을 소괄호로 감싸주어야 한다.
const create = (id, content) => ({id, content});
create(1, 'JavaScript'); // -> {id: 1, content: 'JavaScript'}
// 객체 리터럴을 소괄호로 감싸지 안으면 함수 몸체를 감싸는 중괄호 {}로 잘못 해석한다
// {id, content}를 함수 몸체 내의 쉼표 연산자문으로 해석한다.
const create = (id, content) => { id, content };
create(1, 'JavaScript'); // -> undefined

// 함수 몸체가 여러 개의 문으로 구성된다면 함수 몸체를 감싸는 중괄호 
// {}를 생략할 수 없다! 반환값이 있다면 명시적으로 반환해야 한다.
const sum = (a, b) => {
	const result = a + b;
	return result;
};

// 화살표 함수도 즉시 실행 함수로 사용할 수 있다.
const person = (name => ([
	sayHi() { return `Hi? My name is $[name}.`; }
}))('Lee');
console.log(person.sayHi()); // Hi? My name is Lee.

// 화살표 함수도 고차함수에 인수로 전달할 수 있다.
// ES5
[1, 2, 3].map(function(v) {
	return v * 2;
});
// ES6
[1, 2, 3].map(v => v * 2); 
```

</aside>

### **📌 26.3.2 화살표 함수와 일반 함수의 차이**

<aside>
💦

→ 화살표 함수와 일반 함수의 차이

1. 화살표 함수는 인스턴스를 생성할 수 없는 non-constructor다.
    
    ```jsx
    const Foo = () => {};
    // 화살표 함수는 생성자 함수로서 호출할 수 없다.
    new Foo(); // TypeError
    // 인스턴스가 없으므로 prototype 프로퍼티도 없고, 프로토타입도 생성하지 않는다.
    Foo.hasOwnProperty('prototype'); // -> false
    ```
    
2. 중복된 매개변수 이름을 선언할 수 없다.
    
    ```jsx
    // 일반함수는 중복된 매개변수 이름을 선언해도 에러가 발생하지 않음
    function normal(a, a) { return a * a; }
    console.log(normale(1,2)); // 4
    
    // 화살표 함수에서 중복된 매개변수 이름을 선언하면 에러가 발생한다.
    const arrow = (a, a) => a + a; // SyntaxError
    
    // ++ 일반함수여도 strict mode에서 중복된 매개변수 사용 시 에러 발생!
    ```
    
3. 화살표 함수는 함수 자체의 this, arguments, super, [new.target](http://new.target) 바인딩을 갖지 않는다.
    - 화살표 함수는 **자기 자신만의 this 바인딩을 만들지 않음!**
    - 대신, **자신이 선언된 시점의 상위 스코프(this)** 를 그대로 사용
</aside>

### **📌 26.3.3 this**

<aside>
🕳️

→ 화살표 함수가 일반 함수와 구별되는 가장 큰 특징은 바로 this다.

- 화살표 함수의 this는 일반 함수의 this와 다르게 동작한다.
why? → 콜백 함수 내부의 this 문제
- **일반 함수**: 호출 방식에 따라 `this`가 동적으로 바뀜 → 콜백 안에서는 종종 전역 객체/undefined가 됨.
- **화살표 함수**: `this`를 새로 바인딩하지 않고 상위 스코프의 것을 그대로 씀 → 콜백 this 문제 해결.

→ **class + 화살표 함수 this 문제**

```jsx
class Prefixer {
  constructor(prefix) {
    this.prefix = prefix;
  }

  add(arr) {
    return arr.map(function (item) {
      return this.prefix + item;
    });
  }
}

const prefixer = new Prefixer('pre-');
console.log(prefixer.add(['a', 'b']));
// TypeError: Cannot read properties of undefined (this.prefix)
```

`map` 콜백이 **일반 함수**로 호출되니까 `this`는 `undefined` (엄격 모드) 혹은 전역 객체를 가리킨다.

→ why ? 일반 함수로 호출되면 왜 this가 없을까 ? 

1. 메서드 호출 시 해당 호출 주제가 있어서 해당 객체가 this로 바인딩 된다.
2. 일반 함수로 호출 시에는 this 바인딩할 대상이 없다.

```jsx
// 메서드 호출
const obj = {
  x: 10,
  foo() { console.log(this.x); }
};
obj.foo(); // this = obj → 10

// 일반 함수 호출
function foo() { console.log(this); }
foo(); 
// 엄격 모드: undefined
// 비엄격 모드: window
```

→ 다시 돌아와서 이런 콜백 함수 this 문제를 ES6 이전에는 어떻게 해결 했나?

1. 회피
    
    ```jsx
    function Prefixer(prefix) {
      this.prefix = prefix;
    }
    Prefixer.prototype.add = function (arr) {
      var that = this; // this를 회피 시키기
      return arr.map(function (item) {
        return that.prefix + item; // this 대신 that으로 참조
      });
    };
    ```
    
2. Array 메서드의 두 번째 인자 `thisArg` 사용
    
    ```jsx
    function Prefixer(prefix) {
      this.prefix = prefix;
    }
    Prefixer.prototype.add = function (arr) {
      return arr.map(function (item) {
        return this.prefix + item;
      }, this); // ← thisArg로 this 지정
    };
    ```
    
3. `Function.prototype.bind(this)`로 this 고정
    
    ```jsx
    function Prefixer(prefix) {
      this.prefix = prefix;
    }
    Prefixer.prototype.add = function (arr) {
      return arr.map(function (item) {
        return this.prefix + item;
      }.bind(this)); // ← 여기서 this 고정
    };
    ```
    

→ 이제 ES6에서는 화살표함수로 해결 ~!

```jsx
class Prefixer {
  constructor(prefix) { this.prefix = prefix; }
  add(arr) {
    return arr.map(item => this.prefix + item); // 바로 됨!
  }
}
```

정리. 
화살표 함수는 함수 자체의 this 바인딩을 갖지 않는다.
따라서 화살표 함수 내부에서 this를 참조하면 상위 스코프의 this를 그대로 참조한다.
이를 lexical this라 한다.

→ 그렇다면 화살표 함수 안에서 this를 참조한다면?

- 화살표 함수 자체의 this 바인딩이 존재하지 않는다.
- 화살표 함수 내부에서 this를 참조하면 일반적인 식별자처럼 스코프 체인을 통해 상위 스코프에서 this를 탐색한다.

→ 그렇다면 화살표 함수와 화살표 함수가 중첩되어 있다면?

- 결국 상위 화살표 함수도 this 바인딩이 없으므로 스코프 체인 상에서 가장 가까운 상위 함수 중에서 화살표 함수가 아닌! 함수의 this를 참조한다.

→ 화살표 함수가 전역 함수라면 ? 

- 화살표 함수의 this는 전역 객체를 가리킨다.

→ 프로퍼티에 할당한 화살표 함수는?

- 스코프 체인 상에서 가장 가까운 상위 함수 중에서 화살표 함수가 아닌 함수의 this를 참조한다.
    
    ```jsx
    // increase 프로퍼티에 할당한 화살표 함수의 상위 스코프는 전역이다.
    // 따라서 inscrease 프로퍼티에 할당한 화살표 함수의 this는 전역 객체를 가리킨다
    const counter = {
    	num: 1,
    	increase: () => ++this.num
    };
    
    console.log(counter.increase()); // NaN
    ```
    

→ 화살표 함수를 call, apply, bind 메서드를 사용하면 ?

- 화살표 함수는 함수 자체의 this 바인딩을 갖지 않기 때문에 call, apply, bind 메서드를 사용하더라도 화살표 함수 내부의 this를 교체할 수 없다.
- 화살표 함수가 call, apply, bind를 못쓴다는 것이 아닌, this를 교체할 수 없고 언제나 상위 스코프의 this 바인딩을 참조한다.

→ 메서드를 화살표 함수로 정의하는 것은 피해야한다 why?

```jsx
// Bad
const person = {
	name: 'Lee',
	sayHi: () => console.log(`Hi ${this.name}`)
};

// sayHi 프로퍼티에 할당된 화살표 함수 내부의 this에는 상위 스코프인 전역의 this
// 가 가리키는 전역 객체를 가리키므로 브라우저에서 this.name은 window.name과
// 같은 결과이다, 전역 객체 window에는 빌트인 프로퍼티 name이 존재한다. 
person.sayHi(); // Hi
```

- 화살표 함수 내부의 this는 메서드를 호출한 객체인 person을 가리키지 않고, 상위 스코프인 전역의 this가 가리키는 전역 객체를 가리킨다.
- 따라서 메서드를 정의할 때는 ES6 메서드 축약 표현으로 정의한 ES6 메서드를 사용하는 것이 좋다.

```jsx
// Good
const person = {
	name: 'Lee',
	sayHi() {
		console.log(`Hi ${this.name}`)
	}
};
person.sayHi(); // Hi Lee
```

→ 마찬가지로 프로토타입 객체의 프로토타입에 화살표 함수를 할당하는 경우도 동일하다.

```jsx
// Bad 
function Person(name) {
	this.name = name;
}

Person.prototype.sayHi = () => console.log(`Hi ${this.name}`);
const person = new Person('Lee');
person.sayHi(); // Hi     -> + 전역객체 window.name

// Good
function Person(name) {
	this.name = name;
}
Person.prototype.sayHi = function() { console.log(`Hi ${this.name}`);};
const person = new Person('Lee');
person.sayHi(); // Hi Lee  
```

→ 클래스 필드 정의 제안을 사용한 화살표 함수

```jsx
// Bad
class Person {
	// 클래스 필드 정의 제안
	name = 'Lee';
	sayHi = () => console.log(`Hi ${this.name}`);
}
const person = new Person('Lee');
person.sayHi(); // Hi Lee  

// Good -> ES6 메서드
class Person {
	// 클래스 필드 정의
	name = 'Lee';
	sayHi () { console.log(`Hi ${this.name}`); }
}
const person = new Person('Lee');
person.sayHi(); // Hi Lee  
```

??? 둘다 제대로 나오는데?

중요한 차이점!!

- **this 바인딩**
    - `sayHi = () => {}` → 정의 시점의 상위 스코프 this에 고정됨.
    - `sayHi() {}` → 호출 시점에 동적으로 결정됨.
- **함수 객체 생성 방식**
    - `sayHi = () => {}` → 인스턴스마다 새로운 함수 객체 생성 (메모리 낭비 가능).
    - `sayHi() {}` → 프로토타입에 딱 하나만 올라가고, 모든 인스턴스가 공유해서 사용 (메모리 효율적).

→ 따라서, **일반적인 메서드**는 `sayHi() {}` 방식이 “Good”,
**this 고정이 꼭 필요할 때**만 `sayHi = () => {}` 를 쓰는 게 맞다.

</aside>

### **📌 26.3.4 super**

<aside>
🧘‍♀️

→ 화살표 함수는 함수 자체의 super 바인딩을 갖지 않는다.

- 화살표 함수 내부에서 super를 참조하면 this와 마찬가지로 상위 스코프의 super를 참조

```jsx
class Base {
	constructor(name) {
		this.name = name;
	}
	
	sayHi() {
		return `Hi! ${this.name}`;
	}
}

class Derived extends Base {
	// 화살표 함수의 super는 상위 스코프인 constructor의 super를 가리킨다.
	sayHi = () => `${super.sayHi()} how are you doing?`;
}

const derived = new Derived('Lee');
console.log(derived.sayHi()); // Hi! Lee how are you doing?
```

→ 실행 흐름

- `new Derived('Lee')` → `Base`의 constructor가 호출돼서 `this.name = "Lee"`.
- `sayHi` 화살표 함수가 인스턴스 필드로 붙음.
- `derived.sayHi()` 호출 → 화살표 함수 실행.
    - 내부에서 `super.sayHi()` 실행 → 부모(Base)의 `sayHi()` 실행 → `"Hi! Lee"`.
    - 뒤에 `" how are you doing?"` 붙여서 최종 문자열 반환.
</aside>

### **📌 26.3.5 arguments**

<aside>
🕵️‍♂️

→ 화살표 함수는 함수 자체의 arguments 바인딩을 갖지 않는다.

- 화살표 함수 내부에서 arguments를 참조하면 this와 마찬가지로 상위 스코프의 arguments를 참조한다.

```jsx
// foo는 화살표 함수라서 자기만의 arguments가 없음 
// → 상위 스코프(즉시 실행 함수)의 arguments를 씀.
// foo(3, 4)를 호출했어도 → 출력은 즉시 실행 함수의 arguments: [1, 2]
// -> 화살표 함수는 자기 arguments를 무시하고 바깥 걸 그대로 가져다 씀.
// 만약 화살표가 아닌 일반이였다면? 3,4가 찍힌다
(function () {
	const foo = () => console.log(arguments); // [Arguments] { '0':1, '1':2 }
	foo(3,4);
}(1, 2));

// 이번엔 상위 스코프가 전역
// 근데 전역에는 arguments라는 게 애초에 없음 따라서 참조에러
const foo = () => console.log(arguments);
foo(1,2); // 참조에러
```

</aside>

### ⭐️26.4 Rest 파라미터

### **📌 26.4.1 기본 문법**

<aside>
🥙

→ Rest 파라미터는 매개변수 이름 앞에 세개의 점 … 을 붙여서 정의한 매개변수를 의미한다.

- Rest 파라미터는 함수에 전달된 인수들의 목록을 배열로 전달받는다.

```jsx
function foo(...rest) {
	// 매개변수 rest는 인수들의 목록을 배열로 전달받는 Rest 파라미터다.
	console.log(rest); // [1, 2, 3, 4, 5]
}

foo(1, 2, 3, 4, 5);
```

→ 일반 매개변수와 Rest 파라미터는 함께 사용할 수 있다. 

- 이때 함수에 전달된 인수들은 매개변수와 Rest 파라미터에 순차적으로 할당된다.

```jsx
function foo(param, ...rest) {
	console.log(param); // 1
	console.log(rest); // [ 2, 3, 4, 5 ]
}
foo(1, 2, 3, 4, 5);

function bar(param1, param2, ...rest) {
	console.log(param1); // 1
	console.log(param2); // 2
	console.log(rest); // [ 3, 4, 5 ]
}
bar(1, 2, 3, 4, 5);
```

→ Rest는 이름 그대로 먼저 선언된 매개변수에 할당된 인수를 제외한 나머지 인수들로 구성된 배열이 할당된다. 따라서 Rest 파라미터는 반드시 마지막 파라미터이어야 한다.

```jsx
function foo(...rest, param1, param2) {}
foo(1, 2, 3, 4, 5);
// SyntaxError: Rest parameter must be last formal parameter
```

→ Rest 파라미터는 단 하나만 선언할 수 있다.

```jsx
function foo(...rest1, ...rest2) {}
foo(1, 2, 3, 4, 5);
// SyntaxError: Rest parameter must be last formal parameter
```

→ Rest 파라미터는 함수 정의 시 length 프로퍼티에 영향을 주지 않는다.

```jsx

function foo(...rest) {}
console.log(foo.length); // 0

function bar(x, ...rest) {}
console.log(bar.length); // 1
 
function baz(x, y, ...rest) {}
console.log(baz.length); // 2
```

</aside>

### **📌 26.4.2 Rest 파라미터와 arguments 객체**

<aside>
🙍

- **`arguments` (ES5부터)**: 유사배열로 진짜 배열 아님, 메서드 직접 못 씀.
- **Rest 파라미터 `...args` (ES6)**: 들어온 인자를 **진짜 배열**로 받음. 화살표 함수에서도 잘 됨.

```jsx
// 매개변수의 개수를 사전에 알 수 없는 가변 인자 함수
function sum() {
  // arguments: {0:1, 1:2, 2:3, length:3}  <- 유사 배열
  console.log(arguments);
}
sum(1,2,3); // 6
```

→ 이때 arguments 객체는 배열이 아닌 유사 배열 객체이므로 배열 메서드를 사용하려면, call 이나 apply 메서드를 사용하여 arguments 객체를 배열로 변환해야 했다.

```jsx
function sum() {
	// 유사 배열 객체인 arguments를 배열로 변환
	var array = Array.prototype.slice.call(arguments);
	
	return array.reduce(function (pre, cur) {
		return pre + cur;
	}, 0);
}
console.log(sum(1, 2, 3, 4, 5)); // 15
```

→ ES6 에서는 ? rest 파라미터를 사용하여 가변 인자 함수의 인수목록을 배열로 직접 전달

```jsx
function sum(...args) {
	// Rest 파라미터 args에는 배열 [1, 2, 3, 4, 5]가 할당된다. (배열로 변환)
	// 화살표 함수: arguments 없음 → 반드시 ...rest 써야 함.
	return args.reduce((pre, cur) => pre + cur, 0);
}
console.log(sum(1, 2, 3, 4, 5)); // 15
```

</aside>

### ⭐️26.5 매개변수 기본값

<aside>
🍐

→ 함수를 호출 시 매개변수의 개수만큼 인수를 전달하는 것이 바람직하다.

- 그러나 그렇지 않아도 에러는 발생하지 않는다. why? -> 자바스크립트 엔진이 매개변수 개수와 인수의 개수를 체크하지 않기 때문이다.
- 인수가 전달되지 않은 매개변수의 값은 undefined다.
- 전달되지 않은 매개변수를 사용하지 않는다면 생각치 못한 에러가 발생한다.

```jsx
function sum(x, y) {
	// 인수가 전달되지 않아 매개변수의 값이 undefined인 경우 기본값을 할당해 방어
	x = x || 0;
	y = y || 0;
	
	return x + y
}

console.log(sum(1)); // 1
```

→ ES6 에서 도입된 매개변수 기본값을 사용하여 간단하게 처리하자!

```jsx
function sum(x = 0, y = 0) {
	return x + y;
}

console.log(sum(1)); // 1
```

→ Rest 파라미터에는 기본값을 지정할 수 없다.

```jsx
function foo( ...rest = []) {
	console.log(rest);
}
// SyntaxError: may not have a default initializer
```

→ 매개 변수 기본값 설정 시 length에 영향을 주지 않는다.

```jsx
function sum(x, y = 0) {
	console.log(arguments);
}
console.log(sum.length); // 1

sum(1); // Arguments { '0': 1 }
```

</aside>