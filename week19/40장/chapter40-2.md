[Notion으로 보기](https://slime-fall-1f7.notion.site/40-2-28b566396b5180939db7ca1d5b40daff?pvs=74)

[40장. 이벤트(2)](#40장-이벤트2)  
&nbsp;&nbsp;[40.6 이벤트 전파](#406-이벤트-전파)  
&nbsp;&nbsp;[40.7 이벤트 위임](#407-이벤트-위임)  
&nbsp;&nbsp;[40.8 DOM 요소의 기본 동작 조작](#408-dom-요소의-기본-동작-조작)  
&nbsp;&nbsp;[40.9 이벤트 핸들러 내부의 this](#409-이벤트-핸들러-내부의-this)  
&nbsp;&nbsp;[40.10 이벤트 핸들러에 인수 전달](#4010-이벤트-핸들러에-인수-전달)  
&nbsp;&nbsp;[40.11 커스텀 이벤트](#4011-커스텀-이벤트)

# 40장. 이벤트(2)

## 40.6 이벤트 전파

**이벤트 전파 event propagation**

- DOM 트리 상에 존재하는 DOM 요소 노드에서 발생한 이벤트가 DOM 트리를 통해 전파되는 것
- 이벤트 객체는 이벤트를 발생시킨 DOM 요소인 이벤트 타깃(event target)을 중심으로 DOM 트리를 통해 전파된다.

이벤트 전파는 이벤트 객체가 전파되는 방향에 따라 3단계로 구분할 수 있다.

![image.png](./images/40-2-1.webp)

1. **캡처링 단계(capturing phase)**: 이벤트가 상위 요소에서 하위 요소 방향으로 전파
2. **타깃 단계(target phase)**: 이벤트가 이벤트 타깃에 도달
3. **버블링 단계(bubbling phase)**: 이벤트가 하위 요소에서 상위 요소 방향으로 전파

```html
<body>
  <ul id="fruits">
    <li id="apple">apple</li>
    <li id="banana">banana</li>
    <li id="orange">orange</li>
  </ul>

  <script>
    const $fruits = document.getElementById("fruits");

    $fruits.addEventListener("click", (e) => {
      console.log(`이벤트 단계: ${e.eventPhase}`); // 3
      console.log(`이벤트 타깃: ${e.target}`); // [object HTMLLIElement]
      console.log(`커런트 타깃: ${e.currentTarget}`); // [object HTMLUListElement]
    });
  </script>
</body>
```

⚠️ 이벤트 핸들러 어트리뷰트/프로퍼티 방식으로 등록한 이벤트는 타깃 단계와 버블링 단계의 이벤트만 캐치할 수 있다. 캡처링 단계의 이벤트도 선별적으로 캐치하기 위해서는 `addEventListener` 메서드 방식으로 등록해야 한다. `addEventListener`의 3번째 인수로 `true`를 전달해야 한다.

```html
<body>
  <ul id="fruits">
    <li id="apple">apple</li>
    <li id="banana">banana</li>
    <li id="orange">orange</li>
  </ul>

  <script>
    const $fruits = document.getElementById("fruits");
    const $banana = document.getElementById("banana");

    $fruits.addEventListener(
      "click",
      (e) => {
        console.log(`이벤트 단계: ${e.eventPhase}`); // 1: 캡처링 단계
        console.log(`이벤트 타깃: ${e.target}`); // [object HTMLLIElement]
        console.log(`커런트 타깃: ${e.currentTarget}`); // [object HTMLUListElement]
      },
      true
    );

    $banana.addEventListener("click", (e) => {
      console.log(`이벤트 단계: ${e.eventPhase}`); // 2: 타깃 단계
      console.log(`이벤트 타깃: ${e.target}`); // [object HTMLLIElement]
      console.log(`커런트 타깃: ${e.currentTarget}`); // [object HTMLLIElement]
    });

    $fruits.addEventListener("click", (e) => {
      console.log(`이벤트 단계: ${e.eventPhase}`); // 3: 버블링 단계
      console.log(`이벤트 타깃: ${e.target}`); // [object HTMLLIElement]
      console.log(`커런트 타깃: ${e.currentTarget}`); // [object HTMLUListElement]
    });
  </script>
</body>
```

```html
이벤트 단계: 1 이벤트 타깃: [object HTMLLIElement] 커런트 타깃: [object HTMLUListElement] 이벤트 단계: 2 이벤트 타깃: [object HTMLLIElement] 커런트 타깃:
[object HTMLLIElement] 이벤트 단계: 3 이벤트 타깃: [object HTMLLIElement] 커런트 타깃: [object HTMLUListElement]
```

이벤트는 이벤트를 발생시킨 이벤트 타깃은 물론 **상위 DOM 요소에서도 캐치**할 수 있다. DOM 트리를 통해 전파되는 이벤트는 이벤트 패스에 위치한 모든 DOM 요소에서 캐치할 수 있다.

대부분의 이벤트는 캡처링과 버블링을 통해 전파된다. 그러나 아래 이벤트는 버블링을 통해 전파되지 않는다. (`event.bubbles`의 값이 모두 `false`다.)

상위 요소에서 이벤트를 캐치하려면 **캡처링 단계의 이벤트를 캐치**하거나 대체 이벤트를 사용하면 된다.

- **포커스** 이벤트: `focus`/`blur` (→ 대체: `focusin`/`focusout`)
- **리소스** 이벤트: `load`/`unload`/`abort`/`error`
- **마우스** 이벤트: `mouseenter`/`mouseleave` (→ 대체: `mouseover`/`mouseout`)

```html
<div id="container">
  <p>
    버블링과 캡처링 이벤트
    <button>버튼</button>
  </p>
</div>

<script>
  document.querySelector("#container").addEventListener("click", () => {
    console.log("Handler for container");
  });

  document.querySelector("p").addEventListener(
    "click",
    () => {
      console.log("Handler for paragraph");
    },
    true
  ); // 캡처링

  document.querySelector("button").addEventListener("click", () => {
    console.log("Handler for button");
  });
</script>
```

```html
Handler for paragraph Handler for button Handler for container
```

![Group 98.png](./images/40-2-2.webp)

## 40.7 이벤트 위임

```html
<nav>
  <ul id="fruits">
    <li id="apple" class="active">apple</li>
    <li id="banana">banana</li>
    <li id="orange">orange</li>
  </ul>
</nav>
<div>선택된 내비게이션 아이템: <em class="msg">apple</em></div>

<script>
  const $fruits = document.getElementById("fruits");
  const $msg = document.querySelector(".msg");

  function activate({ target }) {
    [...$fruits.children].forEach(($fruit) => {
      $fruit.classList.toggle("active", $fruit === target);
      $msg.textContent = target.id;
    });
  }

  document.getElementById("apple").onclick = activate;
  document.getElementById("banana").onclick = activate;
  document.getElementById("orange").onclick = activate;
</script>
```

모든 내비게이션 아이템(`<li>`)에 이벤트 핸들러인 `activate`를 등록했다.

→ 아이템의 수가 많아질 경우, 성능 저하의 원인이 되며 유지 보수에도 부적합한 코드를 생산하게 된다.

**이벤트 위임 event delegation**

- 하나의 상위 DOM 요소에 이벤트 핸들러를 등록하는 방법
- 상위 요소에 이벤트 핸들러를 등록하면 여러 개의 하위 DOM 요소에 이벤트 핸들러를 등록할 필요가 없다.
- 동적으로 하위 DOM 요소를 추가하더라도 일일이 추가된 DOM 요소에 이벤트 핸들러를 등록할 필요가 없다.

```html
<nav>
  <ul id="fruits">
    <li id="apple" class="active">apple</li>
    <li id="banana">banana</li>
    <li id="orange">orange</li>
  </ul>
</nav>
<div>선택된 내비게이션 아이템: <em class="msg">apple</em></div>
<script>
  const $fruits = document.getElementById("fruits");
  const $msg = document.querySelector(".msg");

  function activate({ target }) {
    if (!target.matches("#fruits > li")) return;

    [...$fruits.children].forEach(($fruit) => {
      $fruit.classList.toggle("active", $fruit === target);
      $msg.textContent = target.id;
    });
  }

  // 이벤트 위임: 상위 요소(ul#fruits)는 하위 요소의 이벤트를 캐치할 수 있다.
  $fruits.onclick = activate;
</script>
```

⚠️ 상위 요소에 이벤트 핸들러를 등록하기 때문에 이벤트 타깃이 개발자가 기대한 DOM 요소가 아닐 수도 있다. 따라서 이벤트에 **반응이 필요한 DOM 요소에 한정하여 이벤트 핸들러가 실행되도록 이벤트 타깃을 검사**할 필요가 있다.

⚠️ 이벤트 위임을 통해 상위 DOM 요소에 이벤트를 바인딩한 경우 이벤트 객체의 **target 프로퍼티와 currentTarget 프로퍼티가 다른 DOM 요소를 가리킬 수 있다**.

## 40.8 DOM 요소의 기본 동작 조작

### 40.8.1 DOM 요소의 기본 동작 중단

DOM 요소는 저마다 기본 동작이 있다.

- `<a href="...">`: 클릭하면 `href` 어트리뷰트에 지정된 링크로 이동한다.
- `<input type=”checkbox”>`: checkbox 요소를 클릭하면 체크 또는 해제된다.

**이벤트 객체의 `preventDefault` 메서드**

- DOM 요소의 기본 동작을 중단시킨다.

```jsx
document.querySelector("a").onclick = (e) => {
  e.preventDefault();
};

document.querySelector("input[type=checkbox]").onclick = (e) => {
  e.preventDefault();
};
```

### 40.8.2 이벤트 전파 방지

**이벤트 객체의 `stopPropagation` 메서드**

- 이벤트 전파를 중지시킨다.

```html
<div class="container">
  <button class="btn1">Button 1</button>
  <button class="btn2">Button 2</button>
  <button class="btn3">Button 3</button>
</div>

<script>
  // 이벤트 위임
  document.querySelector(".container").onclick = ({ target }) => {
    if (!target.matches(".container > button")) return;
    target.style.color = "red";
  };

  // 이벤트 전파 방지
  document.querySelector(".btn2").onclick = (e) => {
    e.stopPropagation(); // 이벤트 전파 중단
    e.target.style.color = "blue";
  };
</script>
```

## 40.9 이벤트 핸들러 내부의 this

### 40.9.1 이벤트 핸들러 어트리뷰트 방식

이벤트 핸들러 어트리뷰트의 값으로 지정한 문자열은 암묵적으로 생성되는 이벤트 핸들러의 문이다. 따라서 이벤트 핸들러에 의해 **일반 함수로 호출**되므로, 함수 내부의 this는 **전역 객체**를 가리킨다.

단, **이벤트 핸들러를 호출할 때 인수로 전달한 this**는 **이벤트를 바인딩한 DOM 요소**를 가리킨다.

```html
<button onclick="handleClick(this)">Click me!</button>

<script>
  function handleClick(button) {
    console.log(button); // <button onclick="handleClick(this)">Click me!</button>
    console.log(this); // Window {window: Window, self: Window, document: document, name: '', location: Location, …}
  }
</script>

button.onclick = onclick(e) { // this = button handleClick(this); // this = window }
```

### 40.9.2 이벤트 핸들러 프로퍼티 방식과 addEventListener 메서드 방식

**이벤트 핸들러 내부의 this는 이벤트를 바인딩한 DOM 요소를 가리킨다.** 즉, 이벤트 핸들러 내부의 this는 currentTarget 프로퍼티와 같다.

```html
<button class="btn1">0</button>
<button class="btn2">0</button>

<script>
  const $button1 = document.querySelector(".btn1");
  const $button2 = document.querySelector(".btn2");

  // 이벤트 핸들러 프로퍼티 방식
  $button1.onclick = function (e) {
    // this는 이벤트를 바인딩한 DOM 요소를 가리킨다.
    console.log(this); // <button class="btn1">1</button>

    ++this.textContent;
  };

  // addEventListener 메서드 방식
  $button2.addEventListener("click", function (e) {
    // this는 이벤트를 바인딩한 DOM 요소를 가리킨다.
    console.log(this); // <button class="btn2">1</button>

    ++this.textContent;
  });
</script>
```

**화살표 함수**로 정의한 이벤트 핸들러 내부의 this는 **상위 스코프의 this**를 가리킨다.

```html
<button class="btn1">0</button>
<button class="btn2">0</button>

<script>
  const $button1 = document.querySelector(".btn1");
  const $button2 = document.querySelector(".btn2");

  // 이벤트 핸들러 프로퍼티 방식
  $button1.onclick = (e) => {
    // 화살표 함수 내부의 this는 상위 스코프의 this를 가리킨다.
    console.log(this); // Window {window: Window, self: Window, document: document, name: '', location: Location, …}

    // this는 window를 가리키므로 window.textContent에 NaN(undefined + 1)을 할당한다.
    ++this.textContent;
  };

  // addEventListener 메서드 방식
  $button2.addEventListener("click", (e) => {
    // 화살표 함수 내부의 this는 상위 스코프의 this를 가리킨다.
    console.log(this); // Window {window: Window, self: Window, document: document, name: '', location: Location, …}

    // this는 window를 가리키므로 window.textContent에 NaN(undefined + 1)을 할당한다.
    ++this.textContent;
  });
</script>
```

**클래스**에서 이벤트 핸들러를 바인딩하는 경우 this에 주의해야 한다. 이벤트 핸들러(메서드) 내부의 this는 클래스가 생성할 인스턴스를 가리키지 않는다. **이벤트를 바인딩한 DOM 요소**를 가리킨다.

```html
<button class="btn">0</button>

<script>
  class App {
    constructor() {
      this.$button = document.querySelector(".btn");
      this.count = 0;

      // increase 메서드를 이벤트 핸들러로 등록
      // this.$button.onclick = this.increase;
      this.$button.onclick = this.increase.bind(this);
    }

    increase() {
      this.$button.textContent = ++this.count;
      // 이벤트 핸들러 increase 내부의 this는 DOM 요소(this.$button)를 가리키므로
      // this.$button은 this.$button.$button과 같다.
      // 이벤트 핸들러로 바로 등록했을 경우 => Uncaught TypeError: Cannot set properties of undefined (setting 'textContent')
      // bind를 사용, 이벤트가 발생해도 this는 항상 App 인스턴스를 가리키도록 만듦 => 정상 동작
    }
  }

  new App();
</script>
```

또는 화살표 함수를 이벤트 핸들러로 등록하여 이벤트 핸들러 내부의 this가 인스턴스를 가리키도록 할 수도 있다. 이때 이벤트 핸들러 increase는 프로토타입 메서드가 아닌 인스턴스 메서드가 된다.

## 40.10 이벤트 핸들러에 인수 전달

함수에 인수를 전달하려면 함수를 호출할 때 전달해야 한다. 이벤트 핸들러 어트리뷰트 방식은 함수 호출문을 작성하므로 인수를 전달할 수 있다.

**이벤트 핸들러 프로퍼티 방식**과 **addEventListener 메서드 방식**은 이벤트 핸들러를 브라우저가 호출하기 때문에 **함수 자체를 등록**해야 한다. **이벤트 핸들러 내부에서 함수를 호출하면서 인수를 전달**하면 된다.

```html
<label> User name <input type="text" /></label>
<em class="message"></em>

<script>
  const MIN_USER_NAME_LENGTH = 5;
  const $input = document.querySelector("input[type=text]");
  const $msg = document.querySelector(".message");

  const checkUserNameLength = (min) => {
    $msg.textContent = $input.value.length < min ? `이름은 ${min}자 이상 입력해 주세요` : "";
  };

  // 이벤트 핸들러 내부에서 함수를 호출하면서 인수를 전달한다.
  $input.onblur = () => {
    checkUserNameLength(MIN_USER_NAME_LENGTH);
  };
</script>
```

**이벤트 핸들러를 반환하는 함수를 호출**하면서 인수를 전달할 수도 있다.

```jsx
const checkUserNameLength = (*min*) => (e) => {
  $msg.textContent = $input.value.length < *min* ? `이름은 ${*min*}자 이상 입력해 주세요` : "";
};

// 이벤트 핸들러를 반환하는 함수를 호출하면서 인수를 전달한다.
$input.onblur = checkUserNameLength(*MIN_USER_NAME_LENGTH*);
```

## 40.11 커스텀 이벤트

### 40.11.1 커스텀 이벤트 생성

**이벤트가 발생하면 이벤트 객체가 암묵적으로 생성**된다. 이 이벤트 객체는 **이벤트의 종류에 따라 이벤트 타입이 결정**된다.

이벤트 객체는 Event, UIEvent, MouseEvent와 같은 **이벤트 생성자 함수를 호출하여 명시적으로 생성**할 수도 있다. 이때 이 이벤트 객체는 **임의의 이벤트 타입을 지정**할 수 있다.

⇒ **커스텀 이벤트**: 개발자의 의도로 생성된 이벤트

**이벤트 생성자 함수**

- 첫 번째 인수: **이벤트 타입**을 나타내는 문자열

  - 기존 이벤트 타입을 사용할 수도 있고, 임의의 문자열을 사용하여 새로운 이벤트 타입을 지정할 수도 있다. 이 경우 일반적으로 `CustomEvent` 이벤트 생성자 함수를 사용한다.
  - 커스텀 이벤트 객체는 `bubbles`와 `cancelable` 프로퍼티 값이 `false`로 기본 설정된다. 생성된 커스텀 이벤트 객체는 버블링되지 않으며, `preventDefault` 메서드로 취소할 수도 없다.

  ```jsx
  // KeyboardEvent 생성자 함수로 keyup 이벤트 타입의 커스텀 이벤트 객체를 생성
  const keyboardEvent = new KeyboardEvent("keyup");
  console.log(keyboardEvent.type); // keyup

  // CustomEvent 생성자 함수로 foo 이벤트 타입의 커스텀 이벤트 객체를 생성
  const customEvent = new CustomEvent("foo");
  console.log(customEvent.type); // foo

  // 커스텀 이벤트 객체는 버블링되지 않으며 preventDefault 메서드로 취소할 수도 없다.
  console.log(customEvent.bubbles); // false
  console.log(customEvent.cancelable); // false
  ```

- 두 번째 인수: **이벤트 고유의 프로퍼티 값**을 나타내는 객체
  - `bubbles` 또는 `cancelable` 프로퍼티 값을 `true`로 설정할 수 있다.
  - `bubbles`와 `cancelable` 외에도 이벤트 타입에 따라 가지는 이벤트 고유의 프로퍼티 값을 지정할 수 있다.
  ```jsx
  // 두 번째 인자로 이벤트 타입에 따라 가지는 이벤트 고유의 프로퍼티 값을 지정할 수 있다.
  const customEvent2 = new MouseEvent("click", {
    bubbles: true,
    cancelable: true,
    clientX: 40,
    clientY: 100,
  });
  console.log(customEvent2.bubbles); // true
  console.log(customEvent2.cancelable); // true
  console.log(customEvent2.clientX); // 40
  console.log(customEvent2.clientY); // 100
  ```

이벤트 생성자 함수로 생성한 **커스텀 이벤트**는 **`isTrusted` 프로퍼티 값이 언제나 `false`**다.

(**사용자 행위**에 의해 발생한 이벤트에 의해 생성된 이벤트 객체의 **`isTrusted` 프로퍼티 값은 언제나 `true`**다.)

```jsx
// 커스텀 이벤트는 isTrusted 프로퍼티의 값이 언제나 false다.
const customEvent3 = new InputEvent("foo", {
  isTrusted: true,
});

console.log(customEvent3.isTrusted); // false
```

### 40.11.2 커스텀 이벤트 디스패치

**dispatchEvent 메서드**

- **커스텀 이벤트를 디스패치**(dispatch, 이벤트를 발생시키는 행위)할 수 있다.
- 이벤트 객체를 인수로 전달하면서 호출하면 **인수로 전달한 이벤트 타입의 이벤트가 발생**한다.

일반적으로 이벤트 핸들러는 비동기(asynchronous) 처리 방식으로 동작하지만, **`dispatchEvent` 메서드는 이벤트 핸들러를 동기(synchronous) 처리 방식으로 호출**한다.

⇒ 커스텀 이벤트에 바인딩된 이벤트 핸들러를 직접 호출하는 것과 같으므로, 이벤트를 디스패치하기 전에 커스텀 이벤트를 처리할 이벤트 핸들러를 등록해야 한다.

```html
<button class="btn">Click me</button>

<script>
  const $button = document.querySelector(".btn");

  // 1. 버튼 요소에 click 커스텀 이벤트 핸들러를 등록
  // 커스텀 이벤트를 디스패치하기 이전에 이벤트 핸들러를 등록해야 한다.
  $button.addEventListener("click", (e) => {
    console.log(e);
    alert(`${e} Clicked!`);
  });

  // 2. 커스텀 이벤트 생성
  const customEvent = new MouseEvent("click");

  // 3. 커스텀 이벤트 디스패치(동기 처리). click 이벤트가 발생한다.
  $button.dispatchEvent(customEvent);
</script>
```

두 번째 인수로 이벤트와 함께 전달하고 싶은 정보를 담은 detail 프로퍼티를 포함하는 객체를 전달할 수 있다. 이벤트 객체의 detail 프로퍼티(`e.detail`)에 담겨 전달된다.

```html
<button class="btn">Click me</button>

<script>
  const $button = document.querySelector(".btn");

  // 1. 버튼 요소에 foo 커스텀 이벤트 핸들러를 등록
  // 커스텀 이벤트를 디스패치하기 이전에 이벤트 핸들러를 등록해야 한다.
  $button.addEventListener("foo", (e) => {
    alert(e.detail.message);
  });

  // 2. 커스텀 이벤트 생성
  const customEvent = new CustomEvent("foo", {
    detail: { message: "Hello" },
  });

  // 3. 커스텀 이벤트 디스패치(동기 처리). click 이벤트가 발생한다.
  $button.dispatchEvent(customEvent);
</script>
```

임의의 이벤트 타입을 지정하여 커스텀 이벤트 객체를 생성한 경우 **반드시 addEventListener 메서드 방식으로 이벤트 핸들러를 등록해야 한다**. `on + 이벤트 타입`으로 이루어진 이벤트 핸들러 어트리뷰트/프로퍼티가 요소 노드에 존재하지 않기 때문에 이벤트 핸들러 어트리뷰트/프로퍼티 방식으로는 이벤트 핸들러를 등록할 수 없다.

∎
