# 41장 타이머

# 41.1 호출 스케줄링

<aside>

함수를 명시적으로 호출하지 않고 일정 시간이 지난 후에 호출되도록 함수 호출을 예약하려면 타이머 함수를 사용한다. 이를 호출 스케줄링이라 한다.

</aside>

- 타이머 함수는 ECMAScript 사양에 정의된 **빌트인 함수가 아니다**.
- 하지만 브라우저 환경과 Node.js 환경에서 모두 **전역 객체의 메서드로서 타이머 함수를 제공**한다.
- 즉, 타이머 함수는 **호스트 객체**이다.

# 41.2 타이머 함수

## 41.2.1 setTimeout / clearTimeout

### 1.setTimeout 함수

- 두 번째 인수로 전달받은 시간으로 단 한 번 동작하는 타이머를 생성한다.
- 이후 타이머가 만료되면 첫 번째 인수로 전달받은 콜백함수가 호출된다.
- 콜백함수는 두 번째 인수로 전달받은 시간 이후 단 한 번 실행되도록 호출 스케줄링된다.

```jsx
const timeoutId = setTimeout(func|code[, delay, param1, param2, ... ]);
```

| 매개변수 | 설명 |
| --- | --- |
| func | 타이머가 만료된 뒤 호출될 콜백 함수 |
| delay | 타이어 만료 시간(밀리초 단위). setTimeout 함수는 delay 시간으로 단 한 번 동작하는 타이머를 생성한다. 인수 전달을 생략한 경우 기본값 0이 지정된다. |
| param1, param2, … | 호출 스케줄링된 콜백 함수에 전달해야 할 인수가 존재하는 경우 세 번째 이후의 인수로 전달할 수 있다.  |

```jsx
// 1초(1000ms) 후 타이머가 만료되면 콜백 함수가 호출된다
setTimeout(() => console.log('Hi'), 1000);

// 1초(1000ms) 후 타이머가 만료되면 콜백 함수가 호출된다
// 이때 콜백함수에 'Lee'가 인수로 전달된다.
setTimeout(name => console.log(`Hi! ${name}.`), 1000, 'Lee');

// 두 번째 인수(delay)를 생략하면 기본값 0이 지정된다.
setTimeout(() => console.log('Hello')); 

// delay가 0 이므로 가장 먼저 출력된다.
// Hi와 Hi! Lee가 1000ms이므로 순서대로 출력된다.
```

### clearTimeout 함수로 호출 스케일링 취소하는 방법

- setTimeout 함수가 반환한 타이머 id를 clearTimeout 함수의 인수로 전달하여 타이머를 취소할 수 있다.

```jsx
// 1초(1000ms) 후 타이머가 만료되면 콜백 함수가 호출된다
// setTimeout 함수는 생성된 타이머를 식별할 수 있는 고유한 타이머 id를 반환한다.
const timerId = setTimeout(() => console.log('Hi'), 1000);

// setTimeout 함수가 반환한 타이머 id를 clearTimeout 함수의 인수로 전달하여 타이머를 취소한다
// 타이머가 취소되면 setTimeout 함수의 콜백함수가 실행되지 않는다.
clearTimeout(timerId);
```

## 41.2.2 setInterval / clearInterval

- setInterval 함수의 콜백 함수는 두 번째 인수로 전달받은 시간이 경과할 때마다 반복 실행되도록 호출 스케일링된다.
- setInterval 함수에 전달할 인수는 setTimeout 함수와 동일한다.

```jsx
const timeId = setInterval(func|code[, delay, param1, param2, ...]);
```

### clearInterval 함수로 호출 스케일링 취소하는 방법

```jsx
let count = 1;

// 1초 후 타이머가 만료될 때마다 콜백 함수가 호출된다.
// setInterval 함수는 생성된 타이머를 식별할 수 있는 고유한 타이머 id를 반환한다.
const timeoutId = setInterval(() => {
	console.log(count); // 1 2 3 4 5 
	// count가 5이면 setInterval 함수가 반환한 타이머 id를 clearInterval 함수의 인수로 전달하여 
	// 타이머를 취소함
	if (count++ === 5) clesrInterval(timeoutId);
}, 1000);
	
```

# 41.3 디바운스와 스로틀

- scroll, resize, input, mousemove 같은 이벤트는 짧은 시간 간격으로 연속해서 발생한다.
- 이러한 이벤트에 바인딩한 이벤트 핸들러는 과도하게 호출되어 성능에 문제를 이르킬 수 있다.
- 디바운스와 스로틀은 짧은 시간 간격으로 연속해서 발생하는 이벤트를 그룹화해서 과도한 이벤트 핸들러의 호출을 방지하는 프로그래밍 기법이다.

## 41.3.1 디바운스

- 디바운스는 짧은 시간 간격으로 발생하는 이벤트를 그룹화해서 마지막에 한 번만 이벤트 핸들러가 호출되도록 한다.

```html
<!DOCTYPE html>
<html lang="en">
<body>
  <input type="text">
  <div class="msg"></div>
  <script>
    const $input = document.querySelector('input');
    const $msg = document.querySelector('.msg');

    const debounce = (callback, delay) => {
      let timerId;
      // debounce 함수는 timerId를 기억하는 클로저를 반환한다.
      return (...args) => {
        // delay가 경과되기 이전에 이벤트가 발생하면 이전 타이머를 취소하고 새로운 타이머를 재설정한다.
        // 따라서 delay보다 짧은 간격으로 이벤트가 발생하면 callback은 호출되지 않는다.
        if (timerId) clearTimeout(timerId);
        timerId = setTimeout(callback, delay, ...args);
      };
    };

    //debounce 함수가 반환하는 클로저가 이벤트 핸들러로 등록된다
    // 300ms보다 짧은 간격으로 input 이벤트가 발생하면 debounce 함수의 콜백함수는 
    // 호출되지 않다가 300ms 동안 input 이벤트가 더 이상 발생하지 않으면 한 번만 호출된다
    $input.oninput = debounce(e => {
      $msg.textContent = e.target.value;
    }, 300);
  </script>
</body>
</html>
```

- 디바운스는 resize 이벤트 처리나 input 요소에 입력된 값으로 ajax 요청하는 입력 필드 자동완성 UI 구현, 버튼 중복 클릭 방지 처리 등에 유용하게 사용된다.

## 41.3.2 스로틀

- 짧은 시간 간격으로 연속해서 발생하는 이벤트를 그룹화해서 일정 시간 단위로 이벤트 핸들러가 호출되도록 호출 주기를 만든다.

```html
<!DOCTYPE html>
<html>
<head>
  <style>
    .container {
      width: 300px;
      height: 300px;
      background-color: rebeccapurple;
      overflow: scroll;
    }

    .content {
      width: 300px;
      height: 1000vh;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="content"></div>
  </div>
  <div>
    일반 이벤트 핸들러가 scroll 이벤트를 처리한 횟수:
    <span class="normal-count">0</span>
  </div>
  <div>
    스로틀 이벤트 핸들러가 scroll 이벤트를 처리한 횟수:
    <span class="throttle-count">0</span>
  </div>

  <script>
    const $container = document.querySelector('.container');
    const $normalCount = document.querySelector('.normal-count');
    const $throttleCount = document.querySelector('.throttle-count');

    const throttle = (callback, delay) => {
      let timerId;
      //throttle 함수는 timeId를 기억하는 클로저를 반환함
      return (...args) => {
        // delay 간격으로 callback이 호출됨
        if(timerId)return;
        timerId = setTimeout(() => {
          callback(...args);
          timerId = null;
        }, delay);
      };
    };

    let normalCount = 0;
    $container.addEventListener('scroll', () => {
      $normalCount.textContent = ++normalCount;
    });

    let throttleCount = 0;
    // throttle 함수가 반환하는 클로저가 이벤트 핸들러로 등록됨
    $container.addEventListener('scroll', throttle(() => {
      $throttleCount.textContent = ++throttleCount;
    }, 100));
  </script>
</body>
</html>
```

- 짧은 시간 간격으로 연속해서 발생하는 이벤트를 그룹화해서 일정 시간 간격을 이벤트 핸들러를 호출하는 스로틀은 scroll 이벤트 처리나 무한 스크롤 UI 구현 등에 유용하게 사용된다.