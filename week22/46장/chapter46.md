[Notion으로 보기](https://slime-fall-1f7.notion.site/46-async-await-2a0566396b51809ab52cf1997c59a491)

[46장. 제너레이터와 async/await](#46장-제너레이터와-asyncawait)  
&nbsp;&nbsp;[46.1 제너레이터란?](#461-제너레이터란)  
&nbsp;&nbsp;[46.2 제너레이터 함수의 정의](#462-제너레이터-함수의-정의)  
&nbsp;&nbsp;[46.3 제너레이터 객체](#463-제너레이터-객체)  
&nbsp;&nbsp;[46.4 제너레이터의 일시 중지와 재개](#464-제너레이터의-일시-중지와-재개)  
&nbsp;&nbsp;[46.5 제너레이터의 활용](#465-제너레이터의-활용)  
&nbsp;&nbsp;[46.6 async/await](#466-asyncawait)

# 46장. 제너레이터와 async/await

## 46.1 제너레이터란?

**제너레이터 generator**

- 코드 블록의 실행을 일시 중지했다가 필요한 시점에 재개할 수 있는 특수한 함수

**제너레이터 함수의 특징**

1. **함수 호출자에게 함수 실행의 제어권을 양도**할 수 있다.
   - 함수 호출자가 함수 실행을 일시 중지시키거나 재개시킬 수 있다.
2. 함수 호출자와 함수의 **상태를 주고받을 수 있다**.
   - 함수 호출자에게 상태를 전달할 수 있고 함수 호출자로부터 상태를 전달받을 수도 있다.
3. 호출하면 **제너레이터 객체를 반환**한다.
   - 제너레이터 함수를 호출하면 함수 코드를 실행하는 것이 아니라 이터러블이면서 이터레이터인 제너레이터 객체를 반환한다.

## 46.2 제너레이터 함수의 정의

**제너레이터 함수 정의 방법**

- `function*` 키워드로 선언한다.
- 하나 이상의 `yield` 표현식을 포함한다.

```jsx
// 제너레이터 함수 선언문
function* genDecFunc() {
  yield 1;
}

// 제너레이터 함수 표현식
const genExpFunc = function* () {
  yield 1;
};

// 제너레이터 메서드
const obj = {
  *genObjMethod() {
    yield 1;
  },
};

// 제너레이터 클래스 메서드
class MyClass {
  *genClsMethod() {
    yield 1;
  }
}
```

애스터리스크(`*`)의 위치는 function 키워드와 함수 이름 사이라면 어디든지 상관없다. 하지만 일관성을 유지하기 위해 function 키워드 바로 뒤에 붙이는 것을 권장한다.

```jsx
function* genFunc() { yield: 1; }
function * genFunc() { yield: 1; }
function *genFunc() { yield: 1; }
function*genFunc() { yield: 1; }
```

⚠️ 제네레이터 함수는 화살표 함수로 정의할 수 없다.

```jsx
const genArrowFunc = () => {
	yield 1;
} // Uncaught SyntaxError: Unexpected number
```

⚠️ new 연산자와 함께 생성자 함수로 호출할 수 없다.

```jsx
function* genFunc() {
  yield 1;
}

new genFunc(); // TypeError: genFunc is not a constructor
```

## 46.3 제너레이터 객체

제너레이터 함수를 호출하면 **제너레이터 객체를 생성해 반환**한다. 제너레이터 객체는 **이터러블(iterable)** 이면서 동시에 **이터레이터(iterator)** 다.

- **이터러블**: `Symbol.iterator` 메서드를 상속받는다.
- **이터레이터**: next 메서드를 소유한다.
  - next 메서드: value와 done 프로퍼티를 갖는 이터레이터 리절트 객체를 반환한다.

제너레이터 객체는 next 메서드 외에도 return, throw 메서드를 갖는다.

- **next 메서드**: 제너레이터 함수의 **yield 표현식까지 코드 블록을 실행**하고 yield된 값을 value 프로퍼티 값으로, false를 done 프로퍼티 값으로 갖는 이터레이터 리절트 객체를 반환한다.
  - `{ value: yield된 값, done: false }`
- **return 메서드**: 인수로 전달받은 값을 value 프로퍼티 값으로, true를 done 프로퍼티 값으로 갖는 이터레이터 리절트 객체를 반환한다.
  - `{ value: 인수로 전달받은 값, done: true }`
- **throw 메서드**: 인수로 전달받은 **에러를 발생**시키고 undefined를 value 프로퍼티 값으로, true를 done 프로퍼티 값으로 갖는 이터레이터 리절트 객체를 반환한다.
  - `{ value: 인수로 전달받은 에러, done: true }`

```jsx
function* genFunc() {
  try {
    yield 1;
    yield 2;
    yield 3;
  } catch (e) {
    console.error(e);
  }
}

const generator = genFunc();

console.log(generator.next()); // { value: 1, done: false }
console.log(generator.return("End!")); // { value: 'End!', done: true }
```

```jsx
function* genFunc() {
  try {
    yield 1;
    yield 2;
    yield 3;
  } catch (e) {
    console.error(e); // Error!
  }
}

const generator = genFunc();

console.log(generator.next()); // { value: 1, done: false }
console.log(generator.throw("Error!")); // { value: undefined, done: true }
```

## 46.4 제너레이터의 일시 중지와 재개

제너레이터는 함수 호출자에게 제어권을 양도하기 때문에, **yield 키워드와 next 메서드를 통해 실행을 일시 중지했다가 필요한 시점에 다시 재개**할 수 있다.

```jsx
generator.next() → yield → generator.next() → yield → ...
→ generator.next() → return
```

제너레이터 객체의 next 메서드를 호출하면 **yield 표현식까지 실행되고 일시 중지(suspend)** 된다. 이때 **함수의 제어권이 호출자로 양도(yield)** 된다.

제너레이터 객체의 next 메서드는 value, done 프로퍼티를 갖는 **이터레이터 리절트 객체**를 반환한다.

- **value 프로퍼티**: yield 표현식에서 yield된 값 할당
- **done 프로퍼티**: 제너레이터 함수가 끝까지 실행되었는지를 나타내는 불리언 값 할당

```jsx
// 제너레이터 함수
function* genFunc() {
  yield 1;
  yield 2;
  yield 3;
}

// 제너레이터 함수를 호출하면 제너레이터 객체를 반환한다.
const generator = genFunc();

console.log(generator.next()); // { value: 1, done: false }
console.log(generator.next()); // { value: 2, done: false }
console.log(generator.next()); // { value: 3, done: false }
console.log(generator.next()); // { value: undefined, done: true }
```

제너레이터 객체의 next 메서드에 전달한 인수는 제너레이터 함수의 yield 표현식을 할당받는 변수에 할당된다.

```jsx
function* genFunc() {
  const x = yield 1;
  const y = yield x + 10;
  return x + y;
}

const generator = genFunc();

console.log(generator.next()); // { value: 1, done: false }
console.log(generator.next(10)); // { value: 20, done: false }
console.log(generator.next(20)); // { value: 30, done: true }
console.log(generator.next()); // { value: undefined, done: true }
```

제너레이터 함수는 next 메서드와 yield 표현식을 통해 **함수 호출자와 함수의 상태를 주고받을 수 있다**.

- next 메서드를 통해 yield 표현식가지 함수를 실행시켜 제너레이터 객체가 관리하는 상태(yield된 값)를 꺼내올 수 있다.
- next 메서드에 인수를 전달해서 제너레이터 객체에 상태(yield 표현식을 할당받는 변수)를 밀어넣을 수 있다.

이처럼 제너레이터의 특성을 이용하면 비동기 처리를 동기 처리처럼 구현할 수 있다.

## 46.5 제너레이터의 활용

### 46.5.1 이터러블의 구현

제너레이터 함수를 사용하면 이터레이션 프로토콜을 준수해 이터러블을 생성하는 방식보다 간단히 이터러블을 구현할 수 있다.

**무한 피보나치 수열을 생성하는 함수 구현**

- 이터레이션 프로토콜을 준수하여 이터러블을 생성하는 방식

  ```jsx
  const infiniteFibonacci = (function () {
    let [pre, cur] = [0, 1];

    return {
      [Symbol.iterator]() {
        return this;
      },
      next() {
        [pre, cur] = [cur, pre + cur];
        // 무한 이터러블이므로 done 프로퍼티를 생략한다.
        return { value: cur };
      },
    };
  })();

  for (const num of infiniteFibonacci) {
    if (num > 10000) break;
    console.log(num); // 1 2 3 5 8 13 ... 4181 6765
  }
  ```

- 제너레이터를 사용하는 방식

  ```jsx
  const infiniteFibonacci = (function* () {
    let [pre, cur] = [0, 1];

    while (true) {
      [pre, cur] = [cur, pre + cur];
      yield cur;
    }
  })();

  for (const num of infiniteFibonacci) {
    if (num > 10000) break;
    console.log(num); // 1 2 3 5 8 13 ... 4181 6765
  }
  ```

### 46.5.2 비동기 처리

제너레이터 함수는 next 메서드와 yield 표현식을 통해 함수 호출자와 함수의 상태를 주고받을 수 있다. 이를 활용하면 프로미스를 사용한 비동기 처리를 동기 처리처럼 구현할 수 있다.

```jsx
// 제너레이터 실행기
const async = (generatorFunc) => {
  const generator = generatorFunc();

  const onResolved = (arg) => {
    const result = generator.next(arg);

    return result.done ? result.value : result.value.then((res) => onResolved(res));
  };

  return onResolved;
};

async(function* fetchTodo() {
  const url = "https://jsonplaceholder.typicode.com/todos/1";

  const response = yield fetch(url);
  const todo = yield response.json();
  console.log(todo); // { userId: 1, id: 1, title: 'delectus aut autem', completed: false }
})();
```

**co 라이브러리 사용**

```jsx
// npm install co
const co = require("co");

co(function* fetchTodo() {
  const url = "https://jsonplaceholder.typicode.com/todos/1";

  const response = yield fetch(url);
  const todo = yield response.json();
  console.log(todo); // { userId: 1, id: 1, title: 'delectus aut autem', completed: false }
});
```

## 46.6 async/await

ES8에서는 제너레이터보다 간단하고 가독성 좋게 비동기 처리를 동기 처리처럼 동작하도록 구현할 수 있는 async/await가 도입되었다.

- async/await는 프로미스를 기반으로 동작한다. 즉, 후속 처리 메서드(then/catch/finally) 없이 마치 동기 처리처럼 프로미스가 처리 결과를 반환하도록 구현할 수 있다.

```jsx
async function fetchTodo() {
  const url = "https://jsonplaceholder.typicode.com/todos/1";

  const response = await fetch(url);
  const todo = await response.json();
  console.log(todo); // { userId: 1, id: 1, title: 'delectus aut autem', completed: false }
}

fetchTodo();
```

### 46.6.1 async 함수

await 키워드는 반드시 async 함수 내부에서 사용해야 한다.

async 함수는 async 키워드를 사용해 정의하며 언제나 프로미스를 반환한다.

- 명시적으로 프로미스를 반환하지 않더라고 암묵적으로 반환값을 resolve하는 프로미스를 반환한다.

```jsx
// async 함수 선언문
async function foo(n) {
  return n;
}
foo(1).then((v) => console.log(v)); // 1

// async 함수 표현식
const bar = async function (n) {
  return n;
};
bar(2).then((v) => console.log(v)); // 2

// async 화살표 함수
const baz = async (n) => n;
baz(3).then((v) => console.log(v)); // 3

// async 메서드
const obj = {
  async foo(n) {
    return n;
  },
};
obj.foo(4).then((v) => console.log(v)); // 4

// async 클래스 메서드
class MyClass {
  async bar(n) {
    return n;
  }
}
const myClass = new MyClass();
myClass.bar(5).then((v) => console.log(v)); // 5
```

⚠️ 클래스의 constructor 메서드는 async 메서드가 될 수 없다. async 함수는 언제나 프로미스를 반환해야 하지만 constructor 메서드는 인스턴스를 반환해야 하기 때문이다.

### 46.6.2 await 키워드

await 키워드는 프로미스가 settled 상태가 될 때까지 대기하다가 **settled 상태가 되면 프로미스가 resolve한 처리 결과를 반환**한다.

- await 키워드는 반드시 프로미스 앞에서 사용해야 한다.

fetch 함수가 수행한 HTTP 요청에 대한 서버의 응답이 도착해서 fetch 함수가 반환한 프로미스가 settled 상태가 될때까지 대기한다.

```jsx
const getGithubUserName = async (id) => {
  const res = await fetch(`https://api.github.com/users/${id}`);
  const { name } = await res.json();
  console.log(name); // 시원
};

getGithubUserName("SiwonYoo");
```

await 키워드는 다음 실행을 일시 중지시켰다가 프로미스가 settled 상태가 되면 다시 재개한다.

```jsx
async function foo() {
  const a = await new Promise((resolve) => setTimeout(() => resolve(1), 3000));
  const b = await new Promise((resolve) => setTimeout(() => resolve(2), 2000));
  const c = await new Promise((resolve) => setTimeout(() => resolve(3), 1000));

  console.log([a, b, c]); // [ 1, 2, 3 ]
}

foo(); // 약 6초 소요
```

⚠️ 모든 프로미스에 await 키워드를 사용하는 것은 주의해야 한다. 서로 연관이 없이 개별적으로 수행되는 비동기 처리일 경우, 앞선 비동기 처리가 완료될 때까지 대기해서 순차적으로 처리할 필요가 없다.

```jsx
async function foo() {
  const res = await Promise.all([
    new Promise((resolve) => setTimeout(() => resolve(1), 3000)),
    new Promise((resolve) => setTimeout(() => resolve(2), 2000)),
    new Promise((resolve) => setTimeout(() => resolve(3), 1000)),
  ]);

  console.log(res); // [ 1, 2, 3 ]
}

foo(); // 약 3초 소요
```

앞선 비동기 처리의 결과를 가지고 다음 비동기 처리를 수행해야 하는 경우, 비동기 처리의 처리 순서가 보장되어야 하므로 모든 프로미스에 await 키워드를 써서 순차적으로 처리해야 한다.

```jsx
async function bar(n) {
  const a = await new Promise((resolve) => setTimeout(() => resolve(n), 3000));
  const b = await new Promise((resolve) => setTimeout(() => resolve(a + 1), 2000));
  const c = await new Promise((resolve) => setTimeout(() => resolve(b + 1), 1000));

  console.log([a, b, c]); // [ 1, 2, 3 ]
}

bar(1); // 약 6초 소요
```

### 46.6.3 에러 처리

에러는 호출자(caller) 방향으로 전파된다. 하지만 비동기 함수의 콜백 함수를 호출한 것은 비동기 함수가 아니기 때문에 `try ... catch` 문을 사용해 에러를 캐치할 수 없다.

반면, **async/await에서 에러 처리는 `try ... catch` 문을 사용**할 수 있다. 콜백 함수를 인수로 전달받는 비동기 함수와는 달리 프로미스를 반환하는 비동기 함수는 명시적으로 호출할 수 있기 때문에 호출자가 명확하다.

- HTTP 통신에서 발생한 네트워크 에러뿐 아니라 try 코드 블록 내의 모든 문에서 발생한 일반적인 에러까지 모두 캐치할 수 있다.

```jsx
const foo = async () => {
  try {
    const wrongUrl = "https://wrong.url";

    const response = await fetch(wrongUrl);
    const data = await response.json();
    console.log(data);
  } catch (err) {
    console.error(err); // TypeError: fetch failed
  }
};

foo();
```

⚠️ async 함수 내에서 catch 문을 사용해서 에러 처리를 하지 않으면 async 함수는 발생한 에러를 reject하는 프로미스를 반환한다.

```jsx
const foo = async () => {
  const wrongUrl = "https://wrong.url";

  const response = await fetch(wrongUrl);
  const data = await response.json();
  return data;
};

foo().then(console.log).catch(console.error); // TypeError: fetch failed
```

∎
