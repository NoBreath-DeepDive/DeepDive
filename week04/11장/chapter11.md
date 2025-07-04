// 1장 오서현
| | 원시 타입의 값 | 객체 타입의 값 |
| --------- | -------------- | ---------------- |
| 변경 가능 | ❌ | ⭕️ |
| 저장 | 실제 값 저장 | 참조 값 저장 |
| 전달 | 값에 의한 전달 | 참조에 의한 전달 |

# 11.1 원시 값

원시 타입의 값: 원시 값은 변경 불가능한 값.

| `string`    | 문자열 데이터                        | `'hello'`, `"안녕"`               |
| ----------- | ------------------------------------ | --------------------------------- |
| `number`    | 정수, 부동 소수점 숫자 모두 포함     | `42`, `3.14`                      |
| `bigint`    | 아주 큰 정수                         | `123456789012345678901234567890n` |
| `boolean`   | 참(`true`) 또는 거짓(`false`)        | `true`, `false`                   |
| `undefined` | 값이 할당되지 않은 상태              | `undefined`                       |
| `symbol`    | 유일무이한 값                        | `Symbol('id')`                    |
| `null`      | 값이 없음을 명시적으로 나타내는 타입 | `null`                            |

- **값 자체가 변하지 않는다.** (immutable)
- **참조(Reference)가 아니라 값(Value)로 복사**.
- 비교할 때 값 자체를 비교합니다. (`===` 연산자 사용)
- 읽기 전용의 값
- 원시값의 특성은 데이터의 신뢰성을 보장

<aside>

여기서 원시 값 자체는 변경 불가능.

하지만,

변수로 선언되었을 때는 언제든지 재할당을 통해 변숫값을 변경할 수 있다

</aside>

```jsx
let a = 10;
let b = a; // b는 a의 값을 복사
b = 20;

console.log(a); // 10 (변하지 않음)
console.log(b); // 20
```

## 변수와 상수

변수 ↔상수

변수: 재할당이 가능한 변수

상수: 재할당이 금지된 변수일 뿐이다

```jsx
// const 키워드를 사용해 선언한 변수는 재할당이 금지 된 변수일 뿐이다
const o  = {};

// const 키워드를 사용해 선언한 변수에 할당한 원시값은 변경 할 수 없다.
// 하지만 const 키워드를 사용해 선언한 변수에 할당한 객체는 변경 가능
o.a = 1;
console.log(o); // {a:1}
```

## 원시값 메모리 관점

![원시값 메모리 관점](../11장/images/원시값_메모리%20관점.jpeg)

여기서 원시의 `값 자체가 차지하고 있던 메모리 주소는 바뀌지 않고`,

변수에 새로운 값을 할당할 때, 그 변수는 또 다른 새로운 주소를 가지게 된다 즉 `변수가 참조하던 메모리 공간의 주소를 변경`한다 = 불변성

- 불변성을 갖는 원시 값을 할당한 변수는 재할당 이외에 변수 값을 변경할 수 있는 방법이 없다.

# 11.1.2 문자열과 불변성

문자열의 메모리 공간: 원시 타입별로 메모리 공간의 크기가 미리 정해져 있다.

문자열 : 0개 이상의 문자로 이뤄진 집합 `1개의 문자 = 2바이트의 메모리 공간`

<aside>

숫자 1(일) : 8바이트

숫자 1000000(백만) : 8바이트

---

문자 1개 : 2바이트

문자 10개: 20바이트

</aside>

자바스크립트는 문자열 타입을 제공 (원시타입, 변경 불가능)

```jsx
var str = "Hello"; // Hello생성: 식별자 str은 'Hello'가 저장된 메모리 공간의 첫번쨰 메모리 셀 주소를 가리킴
str = "world"; // world 생성: Hello를 가르키던 str은 world를 가리킴

//이때, 'Hello'와 'world'는 모두 메모리에 존재
```

```jsx
//11-5
var str = "string";

// 문자열은 유사 배열이므로 배열과 유사하게 인덱스를 사용해 각 문자에 접근 가능
// 문자열은 원시 값이므로 변경 불가능
str[0] = "S";

console.log(str); //string
```

# 11.1.3 값에 의한 전달

```jsx
var score = 80;
var copy = score;

console.log(score); // 80
console.log(copy); // 80

score = 100;

console.log(score); // 100
console.log(copy); //80
```

copy변수에 원시값을 갖는 score 변수를 할당하면 변수(copy)에는 할당되는 변수(score)의 원신 값 80이 복사되어 전달된다.

하지만,

`score 변수` 와 `copy 변수` 의 값(80)은 다른 메모리 공간에 저장된 별개의 값이다

![값에 의한 전달](../11장/images/값에%20의한%20전달.jpeg)

```jsx
// 11-08
var score = 80;
var copy = score;
console.log(score, copy); // 80 80
console.log(score === copy); // true

score = 100;

console.log(score, copy); // 100 80
console.log(score === copy); //false
```

“값의 의한 전달” 도 사실은 값을 전달하는 것이 아니라 `메모리 주소를 전달`

단, 전달된 메모이 주소를 통해 메모리 공간에 접근하면 값을 참조 할 수 있다.

따라서, 한쪽에서 재할당을 통해 값을 변경하더라도 `서로 간섭 할 수 없다`

# 11.2 객체

- 객체는 확보해야 할 `메모리 공간의 크기를 사전에 정해 둘 수 없다`
- 객체는 경우에 따라 크기가 매우 클 수도 있다.

## 자바스크립트 객체의 관리 방식

- 자바스크립트는 클래스 없이 객체를 생성
- 생성된 이후라도 동적으로 프로처티와 메서드를 추가 가능
- 다른 언어들 보다 생성과 프로퍼티 접근에 비용이 많이 든다
- 히든 클래스 방식 사용

<aside>

📚 히든 클래스란?

자바스크립트 엔진(특히 Google V8 엔진)이 **객체(Object)를 빠르게 접근**하고 **성능을 최적화**하기 위해 내부적으로 사용하는 **비공개 자료구조**

</aside>

# 11.2.1 변경 가능한 값

**객체 타입의 값 = 객체: 변경가능한 값**

```jsx
//11-11
var person = {
  name: "Lee",
};
```

- 객체를 할당한 `변수가 기억하는 메모리 주소를 통해 공간에 접근하면 참조값에 접근 가능`
- 참조값은 생성된 객체가 저장된 `메모리 공간의 주소`
  ![변경 가능한 값](../11장/images/변강%20가능한%20값.jpeg)

```jsx
//11-13
var person = {
  name: "Lee",
};

//프로퍼티 값 갱신
person.name = "kim";

//프로퍼티 동적 생성
person.address = "seoul";

console.log(person); //{ name: 'kim', address: 'seoul' }
```

- 객체를 할당한 변수는 재할당 없이 객체를 직접 변경 할 수 있다.
- 즉, 재할당 없이 프로퍼티를 동적으로 추가할 수 있고, 프로퍼티 값을 갱신할 수도 있으며 프로퍼티 자체를 삭제 할 수 있다.

### 구조적인 단점을 감안한 설계

- 객체를 복사해 생성하는 비용을 절약하여 성능을 향상시키기 위해 객체는 변경 가능한 값으로 설계

### 단점(부작용)

- 여러 개의 식별자가 하나의 객체를 공유할 수 있다는 것

<aside>

📚 더 알아보기

얕은 복사, 깊은 복사

얕은 복사: 객체에 중첩되어 있는 객체의 경우, 참조 값을 복사
객체를 할당한 변수를 다른 변수에 할당하는 것)

(**객체의 1단계 속성만 복사)**

```jsx
const original = {
  name: "홍길동",
  info: {
    age: 30,
    city: "서울",
  },
};

// 얕은 복사 (전개 연산자 사용)
const shallowCopy = { ...original };

// 내부 객체 변경
shallowCopy.info.age = 40;

console.log("원본:", original.info.age); // 40
console.log("복사본:", shallowCopy.info.age); // 40
```

깊은 복사: 객체에 중첩되어 있는 객체까지 모두 복사

(원시 값을 할당한 변수를 다른 변수에 할당하는 것)

(객체의 **모든 중첩 속성까지 복제**합니다. 원본 객체와는 완전히 **독립적인 복사본**이 만들어진다)

```jsx
const original = {
  name: "홍길동",
  info: {
    age: 30,
    city: "서울",
  },
};

// 깊은 복사 (최신 브라우저에서 사용 가능)
const deepCopy = structuredClone(original);

// 내부 객체 변경
deepCopy.info.age = 40;

console.log("원본:", original.info.age); // 30
console.log("복사본:", deepCopy.info.age); // 40
```

</aside>

# 11.2.2 참조에 의한 전달

```jsx
// 11-16
var person = {
  name: "Lee",
};

// 참조 값을 복사 (얕은 복사)
var copy = person;
```

참조에 의한 전달: 원본의 `참조 값이 복사`되어 잔달

![참조에 의한 전달](../11장/images/참조에%20의한%20전달.jpeg)

persom을 사본 copy에 할당 하면 원본 person의 참조 값을 복사해서 copy에 저장

→person과 copy는 저장된 메모리 주소는 다르지만 동일한 참조 값을 가짐

→ person과 copy는 모두 동일한 객체를 가리킴 (두 개의 식별자가 하나의 개체를 공유)

따라서, 원본 또는 사본 중 어는 한쪽에서 객체를 변경하면 서로 영향을 주고 받음 (프로퍼티 값 변경, 추가, 삭제 시)

### 자바스크립트에서의 ‘참조에 의한 전달’

자바스크립트에서는 **포인터가 존재 하지 않기 때문에 다른 프로그래밍 언어의 “참조에 의한 전달”과 의미가 정확히 일치 하지 않는다**

→ 따라서 자바스크립트에서는 참조에 의한 전달은 존재하지 않고 ‘값에 의한 전달’만이 존재한다고 말하기도 한다

→ 용어를 ‘`공유에 의한 전달`’이라고 부르기도 함

### 참조에 의한 전달 값 비교

```jsx
// 11-16
var person = {
  name: "Lee",
};

// 참조 값을 복사 (얕은 복사)
var copy = person;

// 11-18
var person1 = {
  name: "Lee",
};

var person2 = {
  name: "Lee",
};
// 참조값 비교: 둘은 다른 메모리에 저장된 별개의 객체이기 때문에 false
console.log(person1 === person2); // false

// 표현식 원시값 비교: 둘 다 값으로 평가될 수 있는 표현식. 둘 다 원시값인 'Lee'로 평가 따라서 True
console.log(person1.name === person2.name); // true
```
