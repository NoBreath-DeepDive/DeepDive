# 36장 디스트럭처링 할당

- 디스트럭처링 할당 (구조 분해 할당) : 조화된 배열과 같은 이터러블 또는 객체를 destructuring(비구조화, 구조 파괴)하여 `1개 이상의 변수에 개별적으로 할당하는 것`

# 36.1 배열 디스트럭처링 할당

- 배열의 각 요소를 배열로부터 추출하여 1개 이상의 변수에 할당.
- 이때 **배열 디스트럭처링 할당의 대상(할당문의 우변)은 이터러블이어야하며, 할당 기준은 배열의 인덱스**. 즉 순서대로 할당.

```jsx
const arr = [1, 2, 3];

const [one, two, three] = arr;

console.log(one, two, three); // 1 2 3
```

- 우변에 배열 리터럴 형태이어야 하며, 할당하지 않으면 에러가 발생.

```jsx
const [x, y] = [1, 2];

const [x, y]; // SyntaxError

const [a, b] = {}; // TypeError
```

- 배열 디스트럭처링 할당의 기준은 배열의 인덱스. 즉, 순서대로 할당.

```jsx
const [a, b] = [1, 2];
console.log(a, b); // 1 2

const [c, d] = [1];
console.log(c, d); // 1 undefined

const [e, f] = [1, 2, 3];
console.log(e, f); // 1 2

const [g, , h] = [1, 2, 3];
console.log(g, h); // 1 3
```

- 배열 디스트럭처링 할당을 위한 변수에 기본값을 설정 가능.

```jsx
// 기본값
const [a, b, c = 3] = [1, 2];
console.log(a, b, c); // 1 2 3

// 기본값보다 할당된 값이 우선한다.
const [e, f = 10, g = 3] = [1, 2];
console.log(e, f, g); //  1 2 3
```

- 배열 디스트럭처링 할당을 위한 변수에 Rest 파라미터와 유사하게 `**Rest 요소**`를 사용.
  Rest 요소는 Rest 파라미터와 마찬가지로 반드시 마지막에 위치함.

```jsx
// Rest 요소
const [x, ...y] = [1, 2, 3];
console.log(x, y); // 1 [2, 3]
```

# 36.2 객체 디스트럭처링 할당

- 객체의 각 프로퍼티를 객체로부터 추출하여 1개 이상의 변수에 할당.
- 순서와 상관없이 `프로퍼티 키를 기준`으로 할당.

```jsx
const user = { firstName: "Ungmo", lastName: "Lee" };

const { lastName, firstName } = user;

console.log(firstName, lastName); // Ungmo Lee
```

- 프로퍼티 축약 표현으로 선언.

```jsx
const { lastName, firstName } = user;
// 위와 아래는 동치.const { lastName: lastName, firstName: firstName } = user;
```

- 다른 변수 이름으로 할당하고 싶으면 다음과 같이 선언.

```jsx
const user = { firstName: "Ungmo", lastName: "Lee" };

const { lastName: ln, firstName: fn } = user;

console.log(fn, ln); // Ungmo Lee
```

- 객체 디스트럭처링 할당을 위한 변수에 기본값을 설정.

```jsx
const { firstName = "Ungmo", lastName } = { lastName: "Lee" };
console.log(firstName, lastName); // Ungmo Lee
```

- 필요한 프로퍼티 값만 추출하여 변수에 할당할 때 유용.

```jsx
function printTodo({ content, completed }) {
  console.log(`할일 ${content}은 ${completed ? "완료" : "비완료"} 상태입니다.`);
}

printTodo({ id: 1, content: "HTML", completed: true });
// 할일 HTML은 완료 상태입니다.
```

- 배열과 객체 중첩, 중첩 객체 등에서도 사용 가능.

```jsx
const todos = [
  { id: 1, content: "HTML", completed: true },
  { id: 2, content: "CSS", completed: false },
  { id: 3, content: "JS", completed: false },
];

// todos 배열의 두 번째 요소인 객체로부터 id 프로퍼티만 추출한다.const [, { id }] = todos;
console.log(id); // 2
```

- 객체 디스트럭처링 할당을 위한 변수에 Rest 프로퍼티를 사용가능.

```jsx
const { x, ...rest } = { x: 1, y: 2, z: 3 };
console.log(x, rest); // 1 { y: 2, z: 3 }
```
