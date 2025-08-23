# 27장 배열

# 배열이란?

- **배열**은 여러 개의 값을 순차적으로 나열한 자료구조
    - 사용 빈도가 굉장히 높다.
    - 그래서 자바스크립트는 배열을 다루기 위한 유용한 메서드를 다수 제공한다.
        - 즉, 서현님 파트가 아주 중요하니 뒤에 집중해주시길…
        
        ```jsx
        const arr = ['apple', 'banana', 'orange'];
        
        arr[0]; // 'apple'
        arr[1]; // 'banana'
        arr[2]; // 'orange'
        
        arr.length // 3
        
        for(let i=0; i<arr.length; i++){
        	console.log(arr[i]); // 'apple', 'banana', 'orange'
        }
        
        console.log(typeof arr); // object
        ```
        
- 배열이 가지고 있는 값을 **요소**(element)라고 부른다.
    - 자바스크립트의 모든 값은 배열의 요소가 될 수 있다.
    (원시값, 객체, 함수, 배열 등… 값으로 인정하는 모든 것은 배열의 요소가 될 수 있다.)
- 배열의 요소는 배열에서 자신의 위치를 나타내는 0 이상의 정수인 **인덱스(index)**를 갖는다.
    - 인덱스는 0부터 시작한다.
    - 인덱스는 배열의 요소에 접근할 때 사용한다.
        - 요소에 접근할 때는 대괄호 표기법을 사용한다. 대괄호 내에는 접근하고 싶은 요소의 인덱스를 지정한다.
- 배열은 요소의 개수, 즉 배열의 길이를 나타내는 `length` 프로퍼티를 갖는다.
- 배열은 인덱스와 `length` 프로퍼티를 갖기 때문에 `for 문`을 통해 순차적으로 요소에 접근할 수 있다.
- 배열은 객체 타입이다. (자바스크립트에 배열이라는 타입은 존재하지 않는다.)
- 객체와 배열
    
    
    | 구분 | 객체 | 배열 |
    | --- | --- | --- |
    | 구조 | 프로퍼티 키와 프로퍼티 값 | 인덱스와 요소 |
    | 값의 참조 | 프로퍼티 키  | 인덱스 |
    | 값의 순서 | X | O |
    | length 프로퍼티 | X | O |
- 인덱스로 표현되는 값의 순서와 `length` 프로퍼티를 갖는 배열은
반복문을 통해 순차적으로 값에 접근하기 적합한 자료구조다.

# 자바스크립트의 배열은 배열이 아니다

- 자료구조에서 말하는 배열은 동일한 크기의 메모리 공간이 빈틈없이 연속적으로 나열된 자료구조를 말한다.
    - 즉, 배열의 요소는 하나의 데이터 타입으로 통일되어 있으며 서로 연속적으로 인접해 있다. 
    (=**밀집 배열**)
        
        ![image.png](./images/27-1.webp)
        
- 자바스크립트의 배열은
    - 배열의 요소를 위한 각각의 메모리 공간은 동일한 크기를 가지 않아도 된다.
    - 연속적으로 이어져 있지 않을 수도 있다.
    - 배열의 요소가 연속적으로 이어져 있지 않은 배열을 **희소 배열** 이라 한다.
    - 자바스크립트의 배열은 일반적인 배열의 동작을 흉내낸 특수한 객체다.
- 이 배열이라는 특수한 객체는 아래처럼 구성되어 있다.
    
    ```jsx
    console.log(Object.getOwnPropertyDescriptors([1, 2, 3]));
    
    /*
    {
    	'0': {value:1, writable: true, enumerable: true, configurable: true},
    	'1': {value:2, writable: true, enumerable: true, configurable: true},
    	'2': {value:3, writable: true, enumerable: true, configurable: true},
    	length: {value:3, writable: true, enumerable: false, configurable: false}
    }
    */
    ```
    
    - 인덱스를 나타내는 문자열을 프로퍼티 키로 가지며
    - `length` 프로퍼티를 갖는다.
- 배열의 요소는 어떤 타입의 값도 가능하다.
    
    ```jsx
    const arr = [
    	'string'.
    	10,
    	true,
    	null,
    	undefined.
    	NaN,
    	Infinity,
    	[],
    	{},
    	function(){}
    ];
    ```
    

# length 프로퍼티와 희소 배열

- `length` 프로퍼티는 요소의 개수, 즉 배열의 길이를 나타내는 0 이상의 정수를 값으로 갖는다.
    
    ```jsx
    [].length // 0
    [1, 2, 3].length // 3
    ```
    
- `length` 프로퍼티의 값은 배열에 요소를 추가하거나 삭제하면 자동 갱신된다.
    
    ```jsx
    const arr = [1, 2, 3];
    console.log(arr.length); // 3
    
    // 요소 추가
    arr.push(4);
    console.log(arr.length); // 4
    
    // 요소 삭제
    arr.pop();
    console.log(arr.length); // 3
    ```
    
- `length` 프로퍼티 값은 요소의 개수, 즉 배열의 길이를 바탕으로 결정되지만 임의의 숫자 값을 명시적으로 할당할 수도 있다.
    - 현재 `length` 프로퍼티 값보다 작은 숫자 값을 할당하면 배열의 길이가 줄어든다.
        
        ```jsx
        const arr = [1, 2, 3, 4, 5];
        
        // 현재 length 프로퍼티 값인 5보다 작은 숫자 값 3을 length 프로퍼티에 할당
        arr.length = 3;
        
        // 배열의 길이가 5에서 3으로 줄어든다.
        console.log(arr); // [1, 2, 3]
        ```
        
    - 현재 `length` 프로퍼티 값보다 큰 숫자 값을 할당하는 경우, length 프로퍼티 값은 변경 되지만 실제로 배열의 길이가 늘어나지는 않는다.
        
        ```jsx
        const arr = [1];
        
        // 현재 length 프로퍼티 값인 1보다 큰 숫자 값 3을 length 프로퍼티에 할당
        arr.length = 3;
        
        // length 프로퍼티 값은 변경되지만 실제로 배열의 길이가 늘어나지는 않는다.
        console.log(arr.length); // 3
        console.log(arr); // [1, empty x 2]
        
        console.log(Object.getOwnPropertyDescriptors(arr));
        
        /*
        {
        	'0': {value:1, writable: true, enumerable: true, configurable: true},
        	length: {value:3, writable: true, enumerable: false, configurable: false}
        }
        */
        ```
        
        - empty x 2 는 실제로 추가된 배열의 요소가 아님. 비었다고 알려주는 것.
        즉, arr[1], arr[2] 에는 값이 존재하지 않는다.
- 이처럼 배열의 요소가 연속적으로 위치하지 않고 일부가 비어 있는 배열을 **희소 배열**이라 한다.
    
    ```jsx
    const sparse = [, 2, , 4];
    
    // 희소 배열의 length 프로퍼티 값은 요소의 개수와 일치하지 않는다.
    console.log(sparse.length); // 4
    console.log(sparse); // [empty, 2, empty, 4]
    
    // 배열 sparse에는 인덱스가 0, 2인 요소가 존재하지 않는다.
    console.log(Object.getOwnPropertyDescriptors(sparse));
    
    /*
    {
    	'1': {value:2, writable: true, enumerable: true, configurable: true},
    	'3': {value:4, writable: true, enumerable: true, configurable: true},
    	length: {value:4, writable: true, enumerable: false, configurable: false}
    }
    */
    ```
    
    - 희소 배열은 `length`와 배열 요소의 개수가 일치하지 않는다.
    희소 배열의 `length`는 희소 배열의 실제 요소 개수보다 언제나 크다.
- **희소 배열은 사용하지 않는 것이 좋다.**

# 배열 생성

## 배열 리터럴

- 가장 일반적이고 간편한 배열 생성 방식
- 0개 이상의 요소를 쉼표로 구분하여 대괄호([])로 묶는다.
- 프로퍼티 키는 없고 값만 존재한다.
- 배열 리터럴에 요소를 하나도 추가하지 않으면 `length`가 0인 빈 배열이 된다.
- 배열 리터럴에 요소를 생략하면 희소 배열이 생성된다.

```jsx
// 배열 리터럴
const arr = [1, 2, 3];
console.log(arr.length) // 3

// 빈 배열
const empty = [];
console.log(empty.length); // 0

// 희소 배열
const sparse = [1, , 3];
console.log(sparse.length); // 3
console.log(sparse); // [1, empty, 3]
console.log(sparse[1]); // undefined
```

## Array 생성자 함수

- Array 생성자 함수는 전달된 인수의 개수에 따라 다르게 동작하므로 주의해야 한다.
- Array 생성자 함수는 new 연산자와 함께 호출하지 않더라도 배열을 생성하는 생성자 함수로 동작한다.
- 전달된 인수가 1개이고 숫자인 경우 length 프로퍼티 값이 인수인 배열을 생성한다.
    
    ```jsx
    const arr = new Array(10);
    
    console.log(arr); // [empty x 10]
    console.log(arr.length); // 10
    ```
    
    - 희소 배열을 생성.
    - length 프로퍼티 값은 0이 아니지만 실제로 배열의 요소는 존재하지 않는다.
- 전달된 인수가 없는 경우 빈 배열을 생성한다.
    
    ```jsx
    new Array(); // []
    ```
    
- 전달된 인수가 2개 이상이거나 숫자가 아닌 경우 인수를 요소로 갖는 배열을 생성한다.
    
    ```jsx
    new Array(1, 2, 3); // [1, 2, 3]
    
    new Array({}); //[{}]
    ```
    

## Array.of

- ES6에서 도입되었다.
- 전달된 인수를 요소로 갖는 배열을 생성한다.

```jsx
Array.of(1); // [1]

Array.of(1, 2, 3); // [1, 2, 3]

Array.of('string'); // ['string']
```

## Array.from

- ES6에서 도입되었다.
- 유사 배열 객체 또는 이터러블 객체를 인수로 전달받아 배열로 변환하여 반환한다.

```jsx
// 유사 배열 객체를 변환하여 배열을 생성한다.
Array.from({ length: 2, 0: 'a', 1: 'b' }); // ['a', 'b']

// 이터러블을 변환하여 배열을 생성한다.
Array.from('Hello'); // ['H', 'e', 'l', 'l', 'o']
```

- 두 번째 인수로 전달한 콜백 함수를 통해 값을 만들면서 요소를 채울 수 있다.
    - 두 번째 인수로 전달한 콜백 함수에 첫 번째 인수에 의해 생성된 배열의 요소값과 인덱스를 순차적으로 전달하면서 호출하고, 콜백 함수의 반환값으로 구성된 배열을 반환한다.
        
        ```jsx
        // Array.from에 length만 존재하는 유사 배열 객체를 전달하면 undefined를 요소로 채운다.
        Array.from({ length: 3 }); // [undefined, undefined, undefined]
        
        // 두 번째 인수로 전달한 콜백 함수의 반환값으로 구성된 배열을 반환한다.
        Array.from({ length: 3}, (_, i) => i); // [0, 1, 2]
        ```
        

## 유사 배열 객체와 이터러블 객체

- **유사 배열 객체**
    - 마치 배열처럼 인덱스로 프로퍼티 값에 접근할 수 있고 `length` 프로퍼티를 갖는 객체
    - 배열처럼 for 문으로 순회 가능
- **이터러블 객체**
    - `Symbol.iterator` 메서드를 구현하여 `for of 문`으로 순회할 수 있으며, 스프레드 문법과 배열 디스트럭쳐링 할당의 대상으로 사용할 수 있는 객체를 말한다.
    - ES6에서 제공하는 빌트인 이터러블
        - Array, String, Map, Set, Dom 컬렉션(NodeList, HTMLCollection), arguments … 등

## 배열 요소의 참조

- 배열의 요소를 참조할 때에는 대괄호([]) 표기법을 사용한다.
- 대괄호 안에는 인덱스가 와야 한다.
- 존재하지 않는 요소에 접근하면 undefined가 반환된다.

```jsx
const arr = [1, 2];

console.log(arr[0]) // 1
console.log(arr[1]) // 2
console.log(arr[2]) // undefined
```

## 배열 요소의 추가와 갱신

- 존재하지 않는 인덱스를 사용해 값을 할당하면 새로운 요소가 추가된다.
- 이때 `length` 프로퍼티 값은 자동 갱신된다.
- 만약 현재 배열의 length 프로퍼티 값보다 큰 인덱스로 새로운 요소를 추가하면 희소 배열이 된다.
- 이미 요소가 존재하는 요소에 값을 재할당하면 요소값이 갱신된다.

```jsx
// 배열 요소 추가
const arr = [0];

arr[1] = 1;

console.log(arr); // [0, 1]
console.log(arr.length) // 2

// length 보다 큰 인덱스로 요소 추가
arr[100] = 100;

console.log(arr); // [0, 1, empty x 98, 100]
console.log(arr.length) // 101

// 요소 값 갱신
arr[1] = 10;

console.log(arr); // [0, 10, empty x 98, 100]
```

- 정수 이외의 값을 인덱스처럼 사용하면 요소가 생성되는 것이 아니라 프로퍼티가 생성된다.
    - 프로퍼티는 `length`에 영향을 주지 않는다.
    
    ```jsx
    const arr = [];
    
    // 배열 요소의 추가
    arr[0] = 1;
    arr['1'] = 2;
    
    // 프로퍼티 추가
    arr['foo'] = 3;
    arr.bar = 4;
    arr[1.1] = 5;
    arr[-1] = 6;
    
    console.log(arr); // [1, 2, foo: 3, bar: 4, '1.1': 5, '-1': 6]
    
    //프로퍼티는 length에 영향을 주지 않는다.
    console.log(arr.length); // 2
    ```
    

## 배열 요소의 삭제

- 배열의 특정 요소를 삭제하기 위해 `delete` 연산자를 사용할 수 있다. (배열도 객체이므로)
    - `delete` 연산자는 객체의 프로퍼티를 삭제한다.
    - 프로퍼티가 삭제되면서 그 배열은 희소 배열이 되며 `length` 프로퍼티 값은 변하지 않는다.
    - !! 희소 배열을 만드는 `delete` 연산자는 사용하지 않는 것이 좋다.
    
    ```jsx
    const arr =  [1, 2, 3];
    
    // 배열 요소 삭제
    delete arr[1];
    console.log(arr); // [1, empty, 3]
    console.log(arr.length); // 3
    ```
    
- 희소 배열을 만들지 않으면서 배열의 특정 요소를 완전히 삭제하라면 `splice` 메서드를 사용하는 것이 좋다.
    
    ```jsx
    const arr = [1, 2, 3];
    
    // splice(삭제를 시작할 인덱스, 삭제할 요소 수)
    arr.spice(1, 1);
    console.log(arr); // [1, 3]
    console.log(arr.length); // 2
    ```