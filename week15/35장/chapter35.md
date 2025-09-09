# 35장 스프레드 문법

스프레드 문법(전개문법, … ): ES6 도입, 하나로 뭉쳐 있는 여러 값들의 집합을 펼쳐서 개별적인 값들의 목록으로 만든다

스프레드 문법 대상: Array, String, Map, Set, DOM 컬렉션, arguments와 같이 for…of문으로 순회할 수 있는 이터러블에 한정

```jsx
// ...[1, 2, 3]은 [1, 2, 3]을 개별 요소로 분리한다.(-> 1, 2, 3)
console.log(...[1, 2, 3]); // 1 2 3

// 문자열은 이터러블이다.
console.log(..."Hello"); // H e l l o

// Map과 Set은 이터러블이다.
console.log(
  ...new Map([
    ["a", "1"],
    ["b", "2"],
  ])
); // [ 'a', '1' ] [ 'b', '2' ]
console.log(...new Set([1, 2, 3])); // 1 2 3

// 이터러블이 아닌 일반 객체는 스프레드 문법의 대상이 될 수 없다.
console.log(...{ a: 1, b: 2 }); // TypeError
```

- 스프레드 문법 ...이 연산자가 아니기 때문에 변수에 할당할 수 없다.

```jsx
// 스프레드 문법의 결과는 값이 아니다.
const list = ...[1, 2, 3]; // SyntaxError
```

- 쉼표로 구분한 값의 목록을 사용하는 문맥에서만 사용 가능.
  - 함수 호출문의 인수 목록
  - 배열 리터럴의 요소 목록
  - 객체 리터럴의 프로퍼티 목록

# 35.1 함수 호출문의 인수 목록에서 사용하는 경우

- 요소들을 집합인 배열을 펼쳐서 개별적인 값들의 목록으로 만든 후 → 함수 인수 목록으로 전달해야 하는 경우

```jsx
const arr = [1, 2, 3];

// 스프레드 문법을 사용하여 배열 arr을 1, 2, 3을 펼쳐서 Math.max에 전달한다.
// Math.max(...[1, 2, 3])은 Math.max(1, 2, 3)과 같다.
const max = Math.max(...arr); // 3
```

### Rest 파라미터와 형태가 동일하여 혼동 주의

- **Rest 파라미터:** `힘수에 전달된 인수들의 목록을 배열로 전달받기 위해` 매개변수 이름 앞에 ... 을 붙이는 것 이다.
- **스프레드 문법:** 여러 개의 값이 하나로 뭉쳐 있는 배열과 같은 이터러블을 펼쳐서 `개별적인 값들의 목록`을 만드는 것이다.
- **Rest 파라미터와 스프레드 문법은 서로 반대개념**이다.

```jsx
// Rest 파라미터는 인수들의 목록을 배열로 전달 받는다.
function foo(...rest) {
    console.log(rest); // 1, 2, 3 -> [1, 2, 3]
}

// 스프레드 문법은 배열과 같은 이터러블을 펼쳐서 개별적인 값들의 목록을 만든다.
// [1, 2, 3] -> 1, 2, 3
foo(...[1, 2, 3];
```

# 35.2 배열 리터럴 내부에서 사용하는 경우

- 스프레드 문법 장점: 더 간결, 가독성 좋음

## 35.2.1 concat

```jsx
// ES5
var arr = [1, 2].concat([3, 4]);
console.log(arr); // [1, 2, 3, 4]

// ES6
const arr = [...[1, 2], ...[3, 4]];
console.log(arr); // [1, 2, 3, 4];
```

- 별도의 메서드를 사용하지 않고 배열 리터럴만으로 2개의 배열을 1개의 배열로 나타낼 수 있음

## 35.2.2 splice

```jsx
// ES5
var arr1 = [1, 4];
var arr2 = [2, 3];

/*
apply 메서드의 2번째 인수(배열)는 apply 메서드가 호출한 splice 메서드의 인수목록이다.
apply 메서드의 2번째 인수 [1, 0].concat(arr2)는 [1, 0, 2, 3]으로 평가된다.
따라서 splice 메서드에 apply 메서의 2번째 인수 [1, 0, 2, 3]이 해체되어 전달된다.
즉. arr1[1]부터 0개의 요소를 제거하고 그 자리(arr1[1])에 새로운 요소(2, 3)를 삽입한다.
*/
Array.prototype.splice.apply(arr1, [1, 0].concat(arr2));
console.log(arr1); // [1, 2, 3, 4]

let arr1 = [1, 4];
let arr2 = [2, 3];

// ES6
arr1.splice(1, 0, ...arr2);
console.log(arr1); // [1, 2, 3, 4];
```

## 35.2.3 배열 복사(ES5에서 slice사용)

```jsx
// ES5
var origin = [1, 2];
var copy = origin.slice();

console.log(copy); // [1, 2]
console.log(origin === copy); // false

// ES6
let origin = [1, 2];
let copy = [...origin];

console.log(copy); // [1, 2];
console.log(origin === copy); // false
```

- 이때 원본 배열의 각 요소를 얕은 복사하여 새로운 복사본 생성

## 35.2.4 이터러블을 배열로 변환

```jsx
// ES5
function sum() {
  // 이터러블이면서 유사 배열 객체인 arguments 를 배열로 변환
  var args = Array.prototype.slice.call(arguments);

  return args.reduce(function (pre, cur) {
    return pre + cur;
  }, 0);
}

console.log(sum(1, 2, 3)); // 6

// ES6
function sum() {
  // 이터러블이면서 유사 배열 객체인 arguments 를 배열로 변환
  return [...arguments].reduce((pre, cur) => pre + cur, 0);
}

console.log(sum(1, 2, 3)); // 6
```

- 위 예제보다 나은 방법은 Rest파라미터 사용

```jsx
const sum = (...args) => args.reduce((pre, cur) => pre + cur, 0);

console.log(sum(1, 2, 3));
```

- 단, 이터러블이 아닌 유사 배열 객체는 스프레드 문법의 대상이 될 수 없음

```jsx
const arrayLike = {
  0: 1,
  1: 2,
  2: 3,
  length: 3,
};

const arr = [...arrayLike]; // TypeError
```

- 이터러블이 아닌 유사 배열 객체를 배열로 변경하려면 ES6에서 도입된 `Array.from` 메서드를 사용

```jsx
// Array.from 은 유사 배열 객체 또는 이터러블을 배열로 변환한다.
Array.from(arrayLike); // [1, 2, 3]
```

# 35.3 배열 리터럴 내부에서 사용하는 경우

- 스프레드 문법의 대상은 이터러블이어야 하지만 스프레드 프로퍼티 제안은 일반 객체를 대상으로도 스프레드 문법의 사용을 허용

```jsx
// 스프레드 프로퍼티
// 객체 복사
const obj = { x: 1, y: 2 };
const copy = { ...obj };
console.log(copy); // { x: 1, y: 2 }
console.log(obj === copy); // false

// 객체 병합
const merged = { x: 1, y: 2, ...{ a: 3, b: 4 } };
console.log(merged); // { x: 1, y: 2, a: 3, b: 4 }
```

스프레드 프로퍼티는 Object.assign 메서드를 대체할 수 있는 간편한 문법

```jsx
// 객체 병합, 프로퍼티가 중복되는 경우 뒤에 위치한 프로퍼티가 우선권을 갖는다
const merged = { ...{ x: 1, y: 2 }, ...{ y: 10, z: 3 } };
console.log(merged); // { x: 1, y: 10, z: 3 }

// 특정 프로퍼티 변경
const changed = { ...{ x: 1, y: 2 }, y: 100 };
console.log(changed); // { x: 1, y: 100 }

// 프로퍼티 추가
const added = { ...{ x: 1, y: 2 }, z: 0 };
console.log(added); // { x: 1, y: 2, z: 0 }
```
