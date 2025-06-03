### ⭐️내부 슬롯과 내부 메서드

<aside>
🤚

→ 내부 슬롯과 내부 메서드의 개념에 대해 알아보자

- 내부 슬롯과 내부 메서드는 자바스크립트 엔진의 구현 알고리즘을 설명하기 위해 사용하는 의사 프로퍼티와 의사 메서드다.
- ECMAScript 사양에 등장하는 이중 대괄호([[…]])로 감싼 이름들이 내부 슬롯과 내부 메서드다.
- 자바스크립트 엔진에서 실제로 동작하지만 개발자가 직접 접근할 수 있도록 외부로 공개된 객체의 프로퍼티는 아니다.
- 즉 직접적으로 접근하거나 호출할 수 있는 방법을 제공하지 않는다. 단, 일부 내부 슬롯과 내부 메서드에 한하여 간접적으로 접근할 수 있는 수단을 제공하기는 한다.

```jsx
const o = {};

// 내부 슬롯은 자바스크립트 엔진의 내부 로직이므로 직접 접근할 수 없다.
o.[[Prototype]] // -> Uncaught SyntaxError: Unexpected token '['
// 단, 일부 내부 슬롯과 내부 메서드에 한하여 간접적으로 접근할 수 있는 수단
o.__proto__ // -> Object.prototype
```

```jsx
const obj = { a: 1 };
console.log(obj.a);            // 1 (우리가 직접 쓸 수 있는 프로퍼티)
console.log(obj.__proto__);    // object의 프로토타입(사실은 내부 슬롯 [[Prototype]]을 간접으로 본 것)
 
// 직접 [[Prototype]]을 꺼낼 순 없다!
// console.log(obj.[[Prototype]]); // SyntaxError!!
```

</aside>

### ⭐️프로퍼티 어트리뷰트와 프로퍼티 디스크립터 객체

<aside>
✂️

→ 프로퍼티 어트리뷰트란?  

- 자바스크립트 엔진은 프로퍼티를 생성할 때 프로퍼티의 상태를 나타내는 프로퍼티 어트리뷰트를 기본값으로 자동 정의한다.
- 4가지 기본값은?  프로퍼티의 값, 값의 갱신 가능 여부, 열거 가능 여부, 재정의 가능 여부를 말한다. → [[Value]], [[Writable]], [[Enumerable]], [[Configurable]]
- 프로퍼티 어트리뷰트는 자바스크립트 엔진이 관리하는 내부 상태 값인 내부 슬롯이다.

→  프로퍼티 디스크립터 객체 ?

- 위에서 말한 어트리뷰트 정보들을 “객체 형태”로 묶어서 보여주는 도구

→ `Object.getOwnPropertyDescritor` 

- 첫 번째 매개변수에는 객체의 참조를 전달.
- 두 번째 매개변수에는 프로퍼티 키를 문자열로 전달한다.
- 프로퍼티 어트리뷰트 정보를 제공하는 프로퍼티 디스크립터 객체를 반환한다.
- 만약 존재하지 않는 프로퍼티나 상속받은 프로퍼티에 대한 프로퍼티 디스크립터를 요구하면 undefined 반환된다.

```jsx
const person = {
	name: 'Lee'
};

// 메서드 호출 방법
// Object.getOwnPropertyDescriptor(obj, key)
// 하나의 프로퍼티에 대해 프로퍼티 디스크립터 객체를 반환한다.
console.log(Object.getOwnPropertyDescriptor(person, 'name'));
// {value: "Lee", writable: true, enumerable: true, configurable: true}
```

→ `Object.getOwnPropertyDescritors`

- ES8에서 도입된 메서드로, 모든 프로퍼티의 프로퍼티 어트리뷰트 정보를 제공하는
프로퍼티 디스크립터 객체들을 반환

```jsx
const person = {
	name: 'Lee'
};

// 프로퍼티 동적 생성
person.age = 20;

// 모든 프로퍼티의 프로퍼티 어트리뷰트 정보를 제공하는 프로퍼티 디스크립터
console.log(Object.getOwnPropertyDescritors(person));

/*
 name: {value: "Lee", writable: true, enumerable: true, configurable: true},
 age: {value: 20, writable: true, enumerable: true, cnofigurable: true}
*/
```

</aside>

### ⭐️데이터 프로퍼티와 접근자 프로퍼티

<aside>
💽

→ 프로퍼티는 데이터 프로퍼티와 접근자 프로퍼티로 구분할 수 있다.

- 데이터 프로퍼티(data property)
    - 키와 값으로 구성된 일반적인 프로퍼티
    - 지금까지 살펴본 모든 프로퍼티는 데이터 프로퍼티다.
- 접근자 프로퍼티(accessor property)
    - 자체적으로 값을 갖지 않고 다른 데이터 프로퍼티의 값을 읽거나 저장할 때 호출되는 접근자 함수로 구성된 프로퍼티
</aside>

### **📌 데이터 프로퍼티**

<aside>
👨‍💻

→ 데이터 프로퍼티 어트리뷰트는 자바스크립트 엔진이 프로퍼티를 생성할 때 기본값으로 정의

| 프로퍼티
어트리뷰트 | 프로퍼티 디스크립터
객체의 프로퍼티 | 설명 |
| --- | --- | --- |
| [[Value]] | value | 1. 프로퍼티 키를 통해 프로퍼티 값에 접근하면 반환되는 값
2. 프로퍼티 키를 통해 값을 변경 시 [[Value]] 값을 재할당
3. 프로퍼티가 없으면 프로퍼티 동적 생성 후 [[Value]] 값 저장 |
| [[Writable]] | writable | 1. 프로퍼티 값의 변경 여부를 나타내며, 불리언 값
2. [[Writable]] 값이 false 인 경우 프로퍼티의 [[Value]]의 값은 변경할 수 없는 읽기 전용 프로퍼티로 변경 |
| [[Enumerable]] | enumerable | 1. 프로퍼티의 열거 가능 여부를 나타내며, 불리언 값
2. [[Enumerable]] 값이 false 인 경우 프로퍼티는 `for…in` 또는 `Object.keys` 로 열겨 불가능  |
| [[Configurable]] | configurable | 1. 프로퍼티의 재정의 가능 여부를 나타내며, 불리언 값
2. [[Configurable]] 값이 false 인 경우 해당 프로퍼티의 삭제, 프로퍼티 값의 변경이 금지된다.
3. 단 [[Writable]]이 true 인 경우 [[Value]]의 변경과 [[Writable]]을 false로 변경하는 것은 허용된다. |

→ 예제 살펴보기

1. 프로퍼티 생성 시 [[Value]] 값은 프로퍼티 값으로 초기화
2. [[Writable]], [[Enumerable]], [[Configurable]]의 값은 true로 초기화
3. 동적으로 프로퍼티를 추가해도 마찬가지다.

```jsx
const name = {
	name: 'Lee'
};

// 프로퍼티 동적 생성
person.age = 20;

console.log(Object.getOwnPropertyDescriptors(person));
/*
 name: {value: "Lee", writable: true, enumerable: true, configurable: true},
 age: {value: 20, writable: true, enumerable: true, cnofigurable: true}
*/
```

</aside>

### **📌 접근자 프로퍼티**

<aside>
👩‍💻

→ 접근자 프로퍼티란?

- 자체적으로 값을 갖지 않고 데이터 프로퍼티의 값을 읽거나 저장할 때 사용하는 접근자 함수로 구성된 프로퍼티

| 프로퍼티
어트리뷰트 | 프로퍼티 디스크립터
객체의 프로퍼티 | 설명 |
| --- | --- | --- |
| [[Get]] | get | 1. 접근자 프로퍼티를 통해 데이터 프로퍼티 값을 읽을 때 호출되는 접근자 함수
2. 접근자 프로퍼티 키로 프로퍼티 값에 접근하면 [[Get]]의 값, getter 함수가 호출되고, 결과가 프로퍼티 값으로 반환 |
| [[Set]] | set | 1. 접근자 프로퍼티를 통해 프로퍼티의 값을 저장할 때 호출되는 접근자 함수
2. 접근자 프로퍼티 키로 프로퍼티 값을 저장하면 [[Set]]의 값, setter 함수가 호출되고, 결과가 프로퍼티 값으로 저장 |
| [[Enumerable]] | enumerable | 데이터 프로퍼티의 [[Enumerable]]과 같다 |
| [[Configurable]] | configurable | 데이터 프로퍼티의 [[Configurable]]과 같다 |

→ 접근자 함수는 getter/setter 함수라고도 부른다.

```jsx
const person = {
	// 데이터 프로퍼티
	firstName: 'Ungmo',
	lastName: 'Lee',
	
	// fullName은 접근자 함수로 구성된 접근자 프로퍼티다.
	// getter 함수
	get fullName() {
		return `${this.firstName} ${this.lastName}`;
	},
	//setter 함수
	set fullName(name) {
		// 배열 디스트럭처링 할당: "31.1 배열 디스트럭처링 할당" 참고
		[this.firstName, this.lastName] = name.split(' ');
	}
};

// 데이터 프로퍼티를 통한 프로퍼티 값의 참조.
console.log(person.firstName + ' ' + person.lastName); // Ungmo Lee

// 접근자 프로퍼티를 통한 프로퍼티 값의 저장
// 접근자 프로퍼티 fullName에 값을 저장하면 setter 함수가 호출된다.
person.fullName = 'Heegun Lee';
console.log(person); // {firstName: "Heegun", lastName: "Lee"}

// 접근자 프로퍼티를 통한 프로퍼티 값의 참조
// 접근자 프로퍼티 fullName에 접근하면 getter 함수가 호출된다.
console.log(person.fullName); // Heegun Lee

// firstName은 데이터 프로퍼티다.
// 데이터 프로퍼티의
// 어트리뷰트 [[Value]], [[Writable]] [[Enumerable]], [[Configurable]] 
let descriptor = Object.getOwnPropertyDescriptor(person, 'firstName');
console.log(descriptor);
// {value: "Heegun", writable: true, enumerable: true, configurable: true}

// fullName은 접근자 프로퍼티다.
// 접근자 프로퍼티의
// 어트리뷰트 [[Get]], [[Set]] [[Enumerable]], [[Configurable]] 
descriptor = Object.getOwnPropertyDescriptor(person, 'fullName');
console.log(descriptor);
// {get: f, set: f, enumerable: true, configurable: true}
```

→ 정리하기

- person 객체의 firstName과 lastName 프로퍼티는 데이터 프로퍼티다.
- 메서드 앞 get/set 붙은 메서드는 바로 getter/setter 함수이고, getter/setter 함수의 fullName이 접근자 프로퍼티다.
- 접근자 프로퍼티는 [[Value]]을 가지지 않지만, 데이터 프로퍼티의 값을 읽거나 저장할 때 관여한다.

→ 내부 슬롯/메서드로 접근자 프로퍼티 fullName 동작

1. 프로퍼티 키 유효성 확인 → 문자열 또는 심벌 fullName은 문자열로 유효하다.
2. 프로토타입 체인에서 프로퍼티 검색 → person 객체에 fullName 프로퍼티 존재 확인.
3. 검색된 fullName 프로퍼티 방식 확인 → fullName 프로퍼티는 접근자 프로퍼티.
4. 접근자 프로퍼티 fullName의 프로퍼티 어트리뷰트 →  [[Get]]의 값, getter 함수를 호출하여 결과를 반환한다.

→ 접근자 프로퍼티와 데이터 프로퍼티를 구별하는 방법

- 디스크립터로 확인하기

```jsx
// 일반 객체의 __proto__는 접근자 프로퍼티다.
Object.getOwnPropertyDescriptor(Object.prototype, '__proto__');
// {get: f, set: f, enumerable: false, configurable: true}

// 함수 객체의 prototype은 데이터 프로퍼티다.
Object.getOwnPropertyDescriptor(function(){}, 'prototype');
// {value: {...}, writable: true, enumerable: false, configurable: false}
```

→ 정리하기

- __proto__ → 값이 없지만, 안내를 해주는 표지판 같은 역할
- prototype → 값이 존재하며, 기본값 세팅과 같은 역할

→ 그래서 이거 왜 알아야함..?

1. 객체가 동작하는 방식 ( 내부 로직 ) 알기
2. 값을 읽거나 쓸 때 중간마다 원하는 동작을 편리하게 넣을 수 있다.
3. 라이브러리나 프레임워크를 만들 때 사용자 접근은 막고 어떤 환경에서든 같은 결과를 내기 위해서는 이를 알아야함

</aside>

### ⭐️프로퍼티 정의

<aside>
🦸

→ 프로퍼티 정의란?

- 새로운 프로퍼티를 추가하면서 프로퍼티 어트리뷰트를 명시적으로 정의하거나, 기존 프로퍼티의 어트리뷰트를 재정의하는 것을 말한다.
- 데이터 프로퍼티의 기본 4가지 어트리뷰트의 속성을 정의할 때 말한다.

→ 어트리뷰트 정의하기

- Object.defineProperty 메서드를 사용하면 프로퍼티의 어트리뷰트를 정의할 수 있다.
- 인수로는 객체의 참조와 프로퍼티 키인 문자열, 프로퍼티 디스크립터 객체를 전달한다.

```jsx
const person = {};

// 데이터 프로퍼티 정의
Object.defineProperty(person, 'firstName', {
	value: 'Ungmo',
	writable: true,
	enumerable: true,
	configurable: true
});

// 디스크립터 객체의 프로퍼티 누락시키기 (value)값만 설정
Object.defineProperty(person, 'lastName', {
	value: 'Lee'
});

let descriptor = Object.getOwnPropertyDescriptor(person, 'firstName');
console.log('firstName', descriptor);
// firstName {value: "Ungmo", writable: true, enumerable: true, configurable: true}

descriptor = Object.getOwnPropertyDescriptor(person, 'lastName');
console.log('lastName', descriptor);
// 누락된 프로퍼티들은 기본값으로 false로 설정 value도 없다면 undefined
// lastName{value: "Lee", writable: false, enumerable: false, configurable: false}

// [[Enumerable]]의 값이 false 인 lastName은 출력 X
console.log(Object.keys(pesron)); // ["firstName"] 

// [[Writable]] 값이 false인 경우 [[Value]] 값을 변경할 수 없다.
// 값 변경시 에러는 발생하지 않고 무시한다.
person.lastName = 'Kim'; // 무시

// [[Configurable]]의 값이 false는 프로퍼티 삭제 불가능
// 삭제 시 에러는 발생하지 않고 무시한다.
delete person.lastName; // 무시

// [[Configurable]]의 값이 false는 해당 프로퍼티 재정의 불가능
Object.defineProperty(person, 'lastName', { enumerable: true });
// 타입에러: Cannot redefine property: lastName

// 접근자 프로퍼티 정의
Object.defineProperty(person, 'fullName', {
	// getter 함수
	get() {
		return `${this.firstName} ${this.lastName}`;
	},
	// setter 함수
	set(name) {
		[this.firstName, this.lastName] = name.split(' ');
	},
	enumerable: true,
	configurable: true
});

descriptor = Object.getOwnPropertyDescriptor(person, 'fullName');
console.log('fullName', descriptor);
// fullName { get: f, set: f, enumerable: true, configurable: true }

person.fullName = 'Heegon Lee';
console.log(person); // { firstName: "Heegon", lastName: "Lee" }

```

→ 디스크립터 객체에서 생략된 어트리뷰트의 기본값

| 디스크립터 객체의 프로퍼티 | 대응하는 프로퍼티 어트리뷰트 | 생략했을 때의 기본값 |
| --- | --- | --- |
| value | [[Value]] | undefined |
| get | [[Get]] | undefined |
| set | [[Set]] | undefined |
| writable | [[Writable]] | false |
| enumerable | [[Enumerable]] | false |
| configurable | [[Configurable]] | false |

→ 위 예제처럼 하나씩 말고 여러개로 정의하자

- `Object.defineProperties` 사용하기

```jsx
const person = {};

Object.definePropertyies(person, {
	firstName: {
		value: 'Ungmo',
		writable: true,
		enumerable: true,
		configurable: true
	},
	lastName: {
		value: 'Lee',
		writable: true,
		enumerable: true,
		configurable: true
	},
	
	// 접근자 프로퍼티 정의
	fullName: {
			// getter 함수
		get() {
			return `${this.firstName} ${this.lastName}`;
		},
		// setter 함수
		set(name) {
			[this.firstName, this.lastName] = name.split(' ');
		},
		enumerable: true,
		configurable: true
	}
});
```

</aside>

### ⭐️객체 변경 방지

<aside>
🗣️

→ 객체는 변경 가능한 값이므로 재할당 없이 직접 변경할 수 있다.

- 프로퍼티를 추가하거나 삭제할 수 있고 값을 갱신할 수 있다.
- `Object.defineProperties` 메서드를 통해 어트리뷰트도 재정의가 가능하다.
- 객체의 변경을 방지하는 메서드는 뭐가 있을까?

| 구분 | 메서드 | 프로퍼티
추가 | 프로퍼티
삭제 | 프로퍼티
값 읽기 | 프로퍼티
값 쓰기 | 프로퍼티
재정의 |
| --- | --- | --- | --- | --- | --- | --- |
| 객체 확장 금지 | Object.preventExtensions | X | O | O | O | O |
| 객체 밀봉 | Object.seal | X | X | O | O | X |
| 객체 동결 | Object.freeze | X | X | O | X | X |
</aside>

### **📌 객체 확장 금지**

<aside>
🔒

→ `Object.preventExtensions`

- 객체 확장 금지로, 프로퍼티 추가 금지를 의미한다.
- 확장이 금지된 객체는 프로퍼티 추가가 금지된다.
- 확장이 가능한 객체인지 여부는 `Object.isExtensible` 메서드로 확인할 수 있다.

```jsx
const person = { name: 'Lee' };

// person 객체는 확장이 금지된 객체가 아니다.
console.log(Object.isExtensible(person)); // true

// person 객체의 확장을 금지하여 프로퍼티 추가를 금지한다.
Object.preventExtensions(person);

// person 객체는 확장이 금지된 객체다.
console.log(Object.isExtensible(person)); // false

// 프로퍼티 추가가 금지된다.
person.age = 20; // 무시. strict mode 에선 에러
console.log(person); // { name: "Lee" }

// 프로퍼티 추가는 금지되지만 삭제는 가능하다.
delete person.name;
console.log(person); // {}

// 프로퍼티 정의에 의한 프로퍼티 추가도 금지된다.
Object.definedProperty(person, 'age', { value:20 });
// 타입에러 Object is not extensible
```

</aside>

### **📌 객체 밀봉**

<aside>
🤐

→ `Object.seal`

- seal 메서드는 객체를 밀봉한다.
- 객체 밀봉이란 프로퍼티 추가 및 삭제와 프로퍼티 이트리뷰트 재정의 금지를 의미한다.
- 즉, 밀봉된 객체는 읽기와 쓰기만 가능하다.
- 밀봉된 객체 여부는 `Object.isSealed` 메서드로 확인할 수 있다.

```jsx
const person = { name: 'Lee' };

// person 객체는 밀봉(seal)된 객체가 아니다.
console.log(Object.isSealed(person)); // false

// person 객체를 밀봉(seal)하여 프로퍼티 추가, 삭제, 재정의를 금지한다.
Object.seal(person);

// person 객체는 밀봉(seal)된 객체다.
console.log(Object.isSealed(person)); // true

// 밀봉(seal)된 객체는 configurable이 false다.
console.log(Object.getOwnPropertyDescriptors(person));
// name: {value: "Lee", writable: true, enumerable: true, configurable: false}

// 프로퍼티 추가 금지
person.age = 20; // 무시 strict mode 에러

// 프로퍼티 삭제 금지
delete person.name; // 무시 strict mode 에러

// 프로퍼티 값 갱신 가능
person.name = 'Kim';
console.log(person); // { name: "Kim" }

// 프로퍼티 어트리뷰트 재정의 금지
Object.definedProperty(person, 'name', { configurable: true });
// 타입에러 Cannot redefine property: name
```

</aside>

### **📌 객체 동결**

<aside>
🧊

→ `Object.freeze`

- 객체 동결이란 프로퍼티 추가 및 삭제와 프로퍼티 어트리뷰트 재정의 금지, 프로퍼티 값 갱시 금지를 의미한다.
- 동결된 객체는 읽기만 가능하다.
- 동결된 객체인지 여부는 `Object.isFrozen` 메서드로 확인할 수 있다.

```jsx
const person = { name: 'Lee' };

// person 객체는 동결(freeze)된 객체가 아니다.
console.log(Object.isFrozen(person)); // false

// person 객체를 동결(freeze)하여 프로퍼티 추가, 삭제, 재정의, 쓰기를 금지한다.
Object.freeze(person);

// person 객체를 동결(freeze)된 객체다.
console.log(Object.isFrozen(person)); // true

// 동결(freeze)된 객체는 writable과 configurable이 false다.
console.log(Object.getOwnPropertyDescriptors(person));
// name: {value: "Lee", writable: false, enumerable: true, configurable: false}

// 프로퍼티 추가 금지
person.age = 20; // 무시 strict mode 에러

// 프로퍼티 삭제 금지
delete person.name; // 무시 strict mode 에러

// 프로퍼티 값 갱신이 금지
person.name = 'Kim'; // 무시 strict mode 에러

// 프로퍼티 어트리뷰트 재정의 금지
Object.definedProperty(person, 'name', { configurable: true });
// 타입에러 Cannot redefine property: name
```

</aside>

### **📌 불변 객체**

<aside>
🔥

→ 지금 까지 살펴본 변경 방지 메서드들은 얕은 변경 방지이다.

- 얕은 변경 방지는 직속 프로퍼티만 변경이 방지되고 중첩 객체까지는 영향을 주지 못한다.
- 따라서 Object.freeze 메서드로 객체를 동결하여도 중첩 객체까지 동결할 수 없다.

```jsx
const person = {
	name: 'Lee',
	address: { city: 'Seoul' }
};

// 얕은 객체 동결
Object.freeze(person);

// 직속 프로퍼티만 동결한다.
console.log(Object.isFrozen(person)); // true
// 중첩 객체까지 동결하지 못한다.
console.log(Object.isFrozen(person.address)); // false

person.address.city = 'Busan';
console.log(person); // { name: "Lee", address: { city: "Busan" }}
```

→ 중첩 객체까지 동결하여 변경이 불가능한 읽기 전용의 불변 객체를 구현하려면 객체를 값으로 갖는 모든 프로퍼티에 대해 재귀적으로 Object.freeze 메서드를 호출해야 한다.

```jsx
function deepFreeze(target) {
	// 객체가 아니거나 동결된 객체는 무시하고 객체이고 동결되지 않는 객체만 동결한다.
	if (target && typeof target === 'object' && !Object.isFrozen(target)) {
		Object.freeze(target);
		/*
		모든 프로퍼티를 순회하며 재귀적으로 동결한다.
		Object.keys 메서드는 객체 자신의 열거 가능한 프로퍼티 키를 배열로 반환한다.
		forEach 메서드는 배열을 순회하며 배열의 각 요소에 대하여 콜백 함수를 실행.
		*/
		Object.keys(target).forEach(key => deepFreeze(target[key])));
	}
	return target;
}

const person = {
	name: 'Lee',
	address: { city: 'Seoul' }
};

// 깊은 객체 동결
deepFreeze(person);

// 직속 프로퍼티만 동결한다.
console.log(Object.isFrozen(person)); // true
// 중첩 객체까지 동결한다.
console.log(Object.isFrozen(person.address)); // true
```

</aside>