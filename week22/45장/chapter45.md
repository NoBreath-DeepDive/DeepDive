<aside>
✨

→ 프로미스란 ?

- 비동기 처리를 위한 하나의 패턴으로 콜백 함수를 사용
- ES6에서 비동기 처리를 위한 또 다른 패턴으로 나온 프로미스를 도입
- 프로미스는 전통적인 콜백 함수 패턴이 가진 단점을 보완하며 비동기 처리 시점을 명확하게 표현한다.
</aside>

### ⭐️45.1 비동기 처리를 위한 콜백 패턴의 단점

### **📌 45.1.1 콜백 헬**

<aside>
✨

→ 저번주에 발표한 GET 요청을 위한 함수를 작성해 보자.

```jsx
// GET 요청을 위한 비동기 함수
const get = url => {
	const xhr =  new XMLHttpRequest(); // 준비
	xhr.open('GET', url);              // 연결 설정 
	xhr.send();                        // 요청 보냄
	
	xhr.onload = () => {               // 응답이 '나중에' 오면 실행됨
		if (xhr.status === 200) {
			// 서버에 응답을 콘솔에 출력
			console.log(JSON.parse(xhr.response));
		} else {
			console.error(`${xhr.status} ${xhr.statusText}`);
		}
	};
};

// id가 1인 post를 취득
get('https://jsonplaceholder.typicode.com/posts/1');
```

→ get 함수는 비동기 함수다. 

1. 비동기 함수를 호출하면 함수 내부의 비동기로 동작하는 코드가 완료되지 않았다 해도 기다리지 않고 즉시 종료된다.
2. 비동기 함수 내부의 비동기로 동작하는 코드는 비동기 함수가 종료된 이후에 완료된다.
3. 따라서 비동기 함수 내부의 비동기로 동작하는 코드에서 처리 결과를 외부로 반환하거나 상위 스코프의 변수에 할당하면 기대한 대로 동작하지 않는다.

ex) setTimeout 함수

```jsx
let g = 0;
// 비동기 함수인 setTimeout 함수는 콜백 함수의 처리 결과를
// 외부로 반환 불가능
setTimeout(() => { g = 100; }, 0);
console.log(g); // 0
```

→ 제대로 동작하지 않는 get

```jsx
// GET 요청을 위한 비동기 함수
const get = url => {
	const xhr =  new XMLHttpRequest(); 
	xhr.open('GET', url);              
	xhr.send();                        
	
	xhr.onload = () => {               
		if (xhr.status === 200) {
			// 서버에 응답을 반환한다.
			return JSON.parse(xhr.response));
		} else {
			console.error(`${xhr.status} ${xhr.statusText}`);
		}
	};
};

// id가 1인 post를 취득
get('https://jsonplaceholder.typicode.com/posts/1');
console.log(response); // undefined
```

→ why?

- `xhr.send()`를 실행하면, 서버로 요청을 보내는 작업이 브라우저 전달
- 하지만 그 응답이 도착하는 데에는 시간이 걸림. (예: 0.2초~1초)
- 그 사이에 자바스크립트는 할 일 끝내고 `get()`을 종료 → 반환값 없음

→ 그렇다면 응답을 상위 스코프의 변수에 할당하면 ?

```jsx
let todos; // (1) undefined로 초기화

const get = url => {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', url);
  xhr.send(); // (2) 요청 보냄 — 브라우저에게 “서버랑 통신 맡김”

  xhr.onload = () => {
    // (5) 나중에 서버 응답이 오면 실행됨
    todos = JSON.parse(xhr.response); // (6) 이때 todos에 값이 들어감
  };
};

get('https://jsonplaceholder.typicode.com/posts/1'); // (3) get 실행, 요청 보냄
console.log(todos); // (4) 아직 응답 안 옴 → undefined 출력

```

→ 상위 스코프 변수에 할당하면 처리 순서가 보장되지 않는다?

- **“응답이 언제 올지 모르기 때문에** onload가 언제 실행될지도 알 수 없다”
1. `get()`이 실행됨 → 실행 컨텍스트 push
2. `xhr.send()` 실행 → 브라우저가 요청 보냄
3. `get()` 끝 → 실행 컨텍스트 pop (스택 비워짐) 
→  이때 console.log(todos)는 아직 서버 응답이 없기에 undefined로 반환.
4. 서버 응답 도착 → 브라우저가 `onload` 콜백을 task queue에 넣음
5. 이벤트 루프가 스택이 비었는지 확인
6. 비었을 때 → `onload` 실행 컨텍스트 push → 실행
→ 이제서야 todos에 값들이 저장.

### !! 즉

1. 비동기 함수는 비동기 처리 결과를 외부에 반환할 수 없다.
2. 상위 스코프의 변수에 할당도 불가능하다.
3. 비동기 함수 처리 결과에 대한 후속 처리는 비동기 함수 내부에서 수행한다.
4. 이때 비동기 처리 결과에 대한 후속 처리를 수행하는 콜백 함수를 전달한다.
5. 성공 or 실패에 대한 콜백 함수를 전달한다.

```jsx
let todos; 

const get = (url, successCallback, failurlCallback) => {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', url);
  xhr.send(); 

  xhr.onload = () => {
    if(xhr.status === 200) {
	    // 서버의 응답을 콜백 함수에 인수로 전달 후속 처리
	    sucessCallback(JSON.parse(xhr.response));
  } else {
	  // 에러 정보를 콜백 함수로 전달 후 에러 처리
	  failureCallback(xhr.status);
		}
	};
};

get('https://jsonplaceholder.typicode.com/posts/1',
console.log, console.error);
```

→ 콜백 함수를 통해 비동기 처리 결과에 대한 후속 처리를 수행하는 비동기 함수가 비동기 처리 결과를 가지고 또다시 비동기 함수를 호출한다면, 

콜백 함수 호출이 중첩되어 복잡도가 높아지는 현상이 발생한다

- 이를 콜백 헬 이라 한다.

```jsx
get('step1', a => {
	get(`/step2/${a}`, b => {
		get(`/step3/${b}`, c => {
			get(`/step4/${c}`, d => {
			 console.log(d);
			});
		});
	});
});
```

</aside>

### **📌 45.1.2 에러 처리의 한계**

<aside>
✨

```jsx
try {
	setTimeout(() => { throw new Error('Error!'); }, 1000);
} catch (e) {
	// 에러를 캐치하지 못한다.
	console.error('캐치한 에러', e);
}
```

| 시점 | 실행되는 코드 | 설명 |
| --- | --- | --- |
| 0초 | `try { setTimeout(...); }` | 타이머 등록만 함 |
| 0초 | `try` 블록 끝 | catch는 ****더 이상 감시하지 않음 |
| 1초 | **타이머 끝 → `throw new Error()` 실행** | try-catch는 이미 끝났음 |
- `try...catch`는 **콜 스택 안에 있을 때만** 에러를 잡는다.
- 하지만 `setTimeout` 콜백은 **나중(1초 후)** 에 콜 스택에 올라옴.
- 그때는 `try...catch`가 **이미 스택에서 사라진 상태(pop)**
</aside>

### ⭐️45.2 프로미스의 생성

<aside>
✨

→ 프로미스가 생긴 이유?

- 비동기 처리를 위한 콜백 패턴은 콜백 헬이나 에러 처리가 곤란하다는 문제가 있다.

→ 프로미스 생성자 함수

```jsx
// 프로미스 생성
const promise = new Promise((resolve, reject) => {
	// Promise 함수의 콜백 함수 내부에서 비동기 처리를 수행
	if(비동기 처리 성공) {
		resolve('result');
	} else { 
		// 비동기 처리 실패
		reject('failur reason');
	}
});
```

→ GET 함수를 프로미스로 만들자.

```jsx
const promiseGet = url => {
	return new Promise((resolve, reject) => {
		const xhr = new XMLHttpRequest();
		xhr.open('GET', url);
		xhr.send();
		
		xhr.onload = () => {
			if(xhr.status === 200) {
				// 성공 시
				resolve(JSON.parse(xhr.response));
			} else {
				// 에러 처리
				reject(new Error(xhr.status));
			}
		};
	});
};

promiseGet('https://jsonplaceholder.typicode.com/posts/1'),
```

→ 프로미스가 가지는 상태 정보

| 프로미스의 상태 정보 | 의미 | 상태 변경 조건 |
| --- | --- | --- |
| pending | 비동기 처리가 아직 수행되지 않은 상태 | 프로미스가 생성된 직후 기본 상태 |
| fulfilled | 비동기 처리가 수행된 상태(성공) | resolve 함수 호출 |
| rejected | 비동기 처리가 수행된 상태(실패) | reject 함수 호출 |

![image.png](attachment:7c4ec1a5-5fe4-459e-a132-3e21f4e1abb9:image.png)

→ 즉 프로미스는 비동기 처리 상태와 처리 결과를 관리하는 객체다.

</aside>

### ⭐️45.3 프로미스의 후속 처리 메서드

<aside>
✨

→ 프로미스가 제공하는 후속 처리 메서드

1. then
2. catch
3. finally
- 비동기 처리 상태가 변화하면 후속 처리 메서드에 인수로 전달한 콜백 함수가 선택적으로 호출된다.
</aside>

### **📌 45.3.1 Promise.prototype.then**

<aside>
✨

→ then 메서드는 두 개의 콜백 함수를 인수로 전달받는다.

1. 첫번째 인수는 프로미스가 fulfilled 상태 시 호출 된다 → 콜백 함수는 프로미스의 비동기 처리 결과를 인수로 받는다.
2. 두 번째 콜백 함수는 프로미스가 rejected 상태가 되면 호출된다. → 프로미스의 에러를 인수로 전달받는다.

```jsx
// fulfilled
new Promise(resolve => resolve('fulfilled'))
	.then(v => console.log(v), e => console.error(e)); 
	// fulfilled

// rejected
new Promise((_, reject) => reject(new Error('rejected')))
	.then(v => console.log(v), e => console.error(e)); 
	// Error: rejected
```

`then()`은 프로미스가 끝난 뒤(성공 or 실패)

실행할 콜백 함수를 지정하는 메서드

- 첫 번째 콜백: 성공 시 결과를 받음
- 두 번째 콜백: 실패 시 에러를 받음
</aside>

### **📌 45.3.2 Promise.prototype.catch**

<aside>
✨

→ catch 메서드는 한 개의 콜백 함수를 인수로 전달받는다.

- catch 메서드의 콜백 함수는 프로미스가 rejected 상태인 경우만 호출된다.

```jsx
// rejected
new Promise((_, reject) => reject(new Error('rejected')))
	.catch(e => console.log(e)); // Error: rejected
```

→ catch 메서드는 then과 동일하게 동작한다. 따라서 then 메서드와 마찬가지로 언제나 프로미스를 반환한다.

```jsx
// rejected
new Promise((_, reject) => reject(new Error('rejected')))
	.then(undefined, e => console.log(e)); // Error: rejected
```

</aside>

### **📌 45.3.3 Promise.prototype.finally**

<aside>
✨

→ finally 메서드는 한 개의 콜백 함수를 인수로 전달받는다.

> finally()는 프로미스가 성공하든 실패하든
> 
> 
> 무조건 마지막에 한 번 실행되는 메서드
> 
- 결과가 뭐든 상관없이 마지막에 정리할 일

```jsx
new Promise(() => {})
	.finally(() => console.log('finally')); // finally
```

</aside>

### ⭐️45.4 프로미스의 에러 처리

<aside>
✨

→ 비동기 처리를 위한 콜백 패턴의 문제 = 에러 처리가 곤란!

→ 프로미스를 통해 에러를 처리하자.

1. 비동기 처리에서 발생한 에러는 then 메서드의 두 번째 콜백 함수로 처리할 수 있다.

```jsx
const wrongUrl = 'https://naver.com/XXX/1';

// 부적적한 URL 시 에러가 발생한다.
promiseGet(wrongUrl).then(
	res => console.log(res),
	err => console.log(err)
); // Error:404
```

1. 비동기 처리에서 발생한 에러는 프로미스의 후속 처리 메서드 catch를 사용해 처리할 수도 있다.

```jsx
const wrongUrl = 'https://naver.com/XXX/1';

// 부적적한 URL 시 에러가 발생한다.
promiseGet(wrongUrl)
	.then(res => console.log(res))
	.catch(err => console.log(err)); // Error: 404
```

1. then으로 에러 처리 시, 첫 번째 콜백에서 발생하는 에러는 캐치 못한다.

```jsx
promiseGet('잘못된 유알엘').then(
	res => console.xxx(res), // console.xxx는 문법에러.
	err => console.error(err)
); // 그러나 캐치하지 못한다.
```

4. catch를 then 이후에 사용하게 된다면 then 내부에서 발생한 에러까지 캐치한다.

```jsx
promiseGet('잘못된 유알엘')
.then( res => console.xxx(res))
.catch( err => console.error(err));
// TypeError: console.xxx is not a function
```

</aside>

### ⭐️45.5 프로미스 체이닝

<aside>
✨

→ 비동기 처리를 위한 콜백  패턴의 문제 = 콜백 헬 

- 프로미스 then, catch, finally 후속 처리 메서드를 통해 해결하자

```jsx
const url = 'https://jsonplaceholder.typicode.com';

// id가 1인 post의 userId를 취득
promiseGet(`${url}/posts/1`)
	// 취득한 post의 userId로 user 정보를 취득
	.then(({ userId }) => promiseGet(`${url}/users/${userId}`))
	.then(userInfo => console.log(userInfo))
	.catch(err => console.error(err));
```

- 위 예제는 .then → .then → .catch 순으로 후속 처리 메서드를 호출한다.
- 후속 처리 메서드는 언제나 프로미스를 반환하여 연속적으로 호출할 수 있다.
- 이를 프로미스 체이닝이라 한다.

```scss
promise
  ↓ (성공)
then(결과값 받음)
  ↓ (return 값 → 다음 then으로 전달)
then(이전 then의 return값 받음)
  ↓ (에러 발생 시)
catch(에러 객체 받음)
  ↓ (마지막)
finally(인수 없음)
```

</aside>

### ⭐️45.6 프로미스의 정적 메서드

<aside>
✨

→ 프로미스는 주로 생성자 함수로 사용

- 함수도 객체이므로 메서드를 가질 수 있다.
- 프로미스는 5가지 정적 메서드를 제공한다.
</aside>

### **📌 45.6.1 Promise.resolve / Promise.reject**

<aside>
✨

→ resolve와 reject 메서드는 이미 존재하는 값을 래핑하여 프로미스를 생성할 때 사용한다.

- resolve 성공 상태 프로미스

```jsx
// 배열을 resolve하는 프로미스를 생성
const resolvedPromise = Promise.resolve([1, 2, 3]);
resolvedPromise.then(console.log); // [1, 2, 3]
```

- reject 실패 상태 프로미스

```jsx
// 여러 객체를 reject하는 프로미스를 생성
const rejectedPromise = Promise.reject(new Error('Error!'));
rejectedPromise.catch(console.log); // Error: Error
```

</aside>

### **📌 45.6.2 Promise.all**

<aside>
✨

→ `Promise.all()`은 여러 개의 비동기 처리를 모두 병렬 처리할 때 사용한다.

```jsx
Promise.all([promise1, promise2, promise3])
  .then(results => console.log(results))
  .catch(error => console.error(error));
```

- 매개변수: 프로미스 객체들의 배열
- 반환값: 새로운 프로미스
- 모든 프로미스가 `fulfilled` 상태가 되면 → `then` 실행
- 하나라도 `rejected` 상태면 → `catch` 실행
- 배열에 넣은 순서대로 순차적으로 들어간다.

→ 전부 성공하는 경우

```jsx
const p1 = Promise.resolve(1);
const p2 = Promise.resolve(2);
const p3 = Promise.resolve(3);

Promise.all([p1, p2, p3])
  .then(results => console.log('결과:', results))
  .catch(error => console.error('에러:', error));
// 결과: [1, 2, 3]
```

→ 하나라도 실패하면 전체 실패

```jsx
const p1 = Promise.resolve('1');
const p2 = Promise.reject('에러 발생');
const p3 = Promise.resolve('3');

Promise.all([p1, p2, p3])
  .then(results => console.log('결과:', results))
  .catch(error => console.error('에러:', error));
// 에러: 에러 발생
```

`Promise.all()`은 인수로 받은 값이 프로미스가 아니면
자동으로 `Promise.resolve()`로 **감싸서 프로미스로 바꾼 뒤 처리한다**

```jsx
Promise.all([1, Promise.resolve(2), 3])
  .then(result => console.log(result)); // [1, 2, 3]

// 앞에 있는 1과 3은 단순한 숫자이지만
// Promise.all은 내부적으로 이렇게 처리
```

</aside>

### **📌 45.6.2 Promise.race**

<aside>
✨

→ Promise.race 메서드

- 가장 먼저 fulfilled 상태가 된 프로미스의 처리 결과를 resolve하는 새로운 프로미스를 반환한다.

```jsx
Promise.race([
	new Promise(resolve => setTimeout(() => resolve(1), 3000)),
	new Promise(resolve => setTimeout(() => resolve(2), 2000)),
	new Promise(resolve => setTimeout(() => resolve(3), 1000))
])
	.then(console.log) // 3
	.catch(console.log);
```

- 메서드에 전달된 프로미스가 하나라도 rejected 상태가 되면 에러를 reject하는 새로운 프로미스를 즉시 반환한다.

```jsx
Promise.race([
	new Promise((_, resolve) => setTimeout(() => resolve(new Error('Error 1')), 3000)),
	new Promise((_, resolve) => setTimeout(() => resolve(new Error('Error 2'))), 2000)),
	new Promise((_, resolve) => setTimeout(() => resolve(new Error('Error 3'))), 1000))
])
	.then(console.log) 
	.catch(console.log); // Error: Error 3
```

</aside>

### **📌 45.6.2 Promise.allSettled**

<aside>
✨

→ Promise.allSettled 메서드

- 전달받은 프로미스가 모두 settled 상태가 되면 처리 결과를 배열로 반환한다.

```jsx
Promise.allSettled([
	new Promise(resolve => setTimeout(() => resolve(1), 2000)),
	new Promise((_, reject) => setTimeout(() => reject(new Error('Error')), 1000))
]).then(console.log);
/*
[
	{status: "fulfilled", value: 1},
	{status: "rejected", reason: Error: Error! }
]
*/
```

- 성공이든 실패든 끝나기만 하면 다 보고하는 메서드
- 입력 순서 그대로 반환 → 실행 시간과는 상관없음.
- status에 결과와 값을 저장
</aside>

### ⭐️45.7 마이크로태스트 큐

<aside>
✨

```jsx
setTimeout(() => conosole.log(1), 0);
Promise.resolve()
	.then(() => console.log(2))
	.then(() => console.log(3));
```

→  후속 처리 메서드도 비동기로 동작하므로  2 → 3 → 1 순으로 출력된다.

- 프로미스의 후속 처리 콜백 함수는 마이크로태스트 큐에 저장된다.

→ 마이크로태스트 큐?

- 프로미스의 후속 처리(`then`, `catch`, `finally`) 콜백은 “마이크로태스크 큐”에 들어간다.
- 마이크로태스트 큐는 태스크큐보다 우선순위가 높다.

→ 따라서 이벤트 루프는 콜 스택이 비면 먼저 마이크로태스트 큐에서 대기하는 함수를 가져와 실행한다.

</aside>

### ⭐️45.8 fetch

<aside>
✨

→ fetch 함수 ?

- HTTP 요청 전송 기능을 제공하는 클라이언트 사이드 Web API다.
- fetch 함수에는 HTTP 요청을 전송할 URL과 HTTP 요청 메서드, HTTP 요청 헤더, 페이로드 등을 설정한 객체를 전달한다.
- `const promise = fetch(url, [, option])`
- HTTP 응답을 나타내는 Response 객체를 래핑한 Promise 객체를 반환한다.

→ f**etch 함수에는 HTTP 요청을 전송할 URL과 HTTP 요청 메서드, HTTP 요청 헤더, 페이로드 등을 설정한 객체를 전달**

```jsx
const request = {
	get(url) {
		return fetch(url);
	},
	post(url, payload) {
		return fetch(url, {
			method: 'POST',
			headers: { 'content-Type': 'application/json' },
			body: JSON.stringify(payload)
		});
	},
	patch(url, payload) {
		return fetch(url, {
			method: 'PATCH',
			headers: { 'content-Type': 'application/json' },
			body: JSON.stringify(payload)
		});
	},
	delete(url) {
		return fetch(url, { method: 'DELETE' });
	}
};
```

1. GET 요청

```jsx
request.get('https://jsonplaceholder.typicode.com/todos/1')
	.then(response => response.json())
	.then(todos => console.log(todos))
	.catch(err => console.log(error(err));
// {userId: 1, id: 1, title: "1번입니다" completed: false }
```

2. POST 요청

```jsx
request.post('https://jsonplaceholder.typicode.com/todos',{
	userId: 1,
	title: 'JavaScript',
	completed: false
}).then(response => response.json())
	.then(todos => console.log(todos))
	.catch(err => console.log(error(err));
// {userId: 1, title: 'JavaScript', completed:false, id:201}
```

3. PATCH 요청

```jsx
request.patch('https://jsonplaceholder.typicode.com/todos/1',{
	completed: true
}).then(response => response.json())
	.then(todos => console.log(todos))
	.catch(err => console.log(error(err));
// {userId: 1, id: 1, title: '1번입니다', completed:true}
```

4. DELETE 요청

```jsx
request.delete('https://jsonplaceholder.typicode.com/todos/1')
  .then(response => response.json())
	.then(todos => console.log(todos))
	.catch(err => console.log(error(err));
// {}
```

</aside>