# 39장 DOM

## DOM(Document Object Model)이란?

HTML 문서의 계층적 구조와 정보를 표현하며 이를 제어할 수 있는 API, 즉 프로퍼티와 메서드를 제공하는 트리 자료구조.

<aside>

즉, DOM은 HTML 문서를 트리 구조로 표현해서, 자바스크립트로 그 내용을 읽고 바꾸고 제어할 수 있게 해주는 도구이다.

</aside>

# 39.1 노드

## 39.1.1 HTML 요소와 노드 객체

<aside>

- HTML 요소 : HTML 문서를 구성하는 개별적인 요소를 의미한다.
</aside>

<aside>

![html 요소의 구조](./images/39-1.webp)

html 요소의 구조

- HTML 요소는 렌더링 엔진에 의해 파싱되어 DOM을 구성하는 요소 노드 객체로 변환된다.
- 이때 HTML 요소의 어튜리뷰트는 어튜리뷰트 노드로, HTML 요소의 텍스트 콘텐츠는 텍스트 노드로 변환된다.
</aside>

<aside>

![html 요소와 노드 객체](./images/39-2.webp)

html 요소와 노드 객체

- HTML 요소의 콘텐츠 영역에는 텍스트 뿐만 아니라 다른 HTML 요소도 포함할 수 있다.
- 이때 HTML 요소 간에는 중첩 관계에 의해 계층적인 부자관계과 형성된다.
- 이러한 부자관계를 반영하여 HTML 요소를 객체화한 모든 노드 객체들을 트리 자료구조로 구성한다.
</aside>

### 트리 자료구조

<aside>

![image.png](./images/39-3.webp)

- 노드들의 계층 구조로 이뤄진다.
- 부모 노느와 자식 노드로 구성되어 최상위 노드에서 시작한다.
- 최상위 노드(=루트 노드)는 부모 노드가 없다.
- 루트 노드는 0개 이상의 자식 노드를 갖는다.
- 자식 노드가 없는 노드를 리프 노드라 한다.
</aside>

## 39.1.2 노드 객체의 타입

```jsx
// HTML 문서를 렌더링 엔진이 파싱한다고 가정
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <link rel="stylesheet" href="style.css"
  </head>
  <body>
    <ul>
      <li id="apple">Apple</li>
      <li id="banana">Banana</li>
      <li id="orange">Orange</li>
    </ul>
    <script src="app.js"></script>
  </body>
</html>
```

<aside>

렌더링 엔진은 위 HTML 문서를 파싱하여 다음과 같이 DOM을 생성한다.

![image.png](./images/39-4.webp)

</aside>

<aside>

DOM은 노드 객체의 계층적인 구조로 구성된다. 노드 객체는 종류가 있고 상속 구조를 갖는다. 노드 객체는 총 12개의 종류가 있다. 이 중에서 중요한 노드 타입 4가지를 알아보자. (나머지는 39.6.4절에서 살펴보자)

</aside>

### 1. 문서노드

<aside>

- DOM 트리의 최상위에 존재하는 루트 노드로서 **document** 객체를 가리킨다.
- document 객체는 브라우저가 렌더링한 HTML 문서 전체를 가리키는 객체로서 전역 객체 window의 document 프로퍼티에 바인딩되어 있다. 따라서 문서 노드는 window.document 또는 document로 참조할 수 있다.
- document 객체는 DOM 트리의 루트 노드이므로 DOM 트리의 노드들에 접근하기 위한 진입점 역할을 담당한다.
- 즉, **요소, 어트리뷰트, 텍스트 노드에 접근하려면 문서 노드를 통해야한다.**
</aside>

### 2. 요소 노드

<aside>

- html 요소를 가리키는 객체
- html 요소 간의 중첩에 의해 부자 관계를 가지며, 이 부자 관계를 통해 정보를 구조화한다.
- 요소 노드는 문서의 구조를 표현한다고 할 수 있다.
</aside>

### 3. 어트리뷰트 노드

<aside>

- HTML 요소의 어트리뷰트 노드를 가리키는 객체
- 어튜리뷰트가 지정된 HTML 요소의 요소 노드와 연결되어 있다.
- 요소 노드는 부모 노드와 연결되어 있지만 어트리뷰트 노드는 요소 노드에만 연결되어 있다.
- 즉, 부모 노드가 없으므로 요소 노드의 형제 노드는 아니다.
- 따라서 **어트리뷰트 노드에 접근하여 어트리뷰트를 참조하거나 변경하려면 먼저 요소 노드에 접근해야 한다.**
</aside>

### 4. 텍스트 노드

<aside>

- HTML 요소의 텍스트를 가리키는 객체
- 요소 노드가 문서의 구조를 표현한다면 텍스트 노드는 문서의 정보를 표현한다고 할 수 있다.
- 요소 노드의 자식 노드이며, 자식 노드를 가질 수 없는 리프 노드이다.
- DOM트리의 최종단이다.
- 따라서 **텍스트 노드에 접근하려면 먼저 부모 노드인 요소 노드에 접근**해야 한다.
</aside>

## 39.1.3 노드 객체의 상속 구조

<aside>

- DOM을 구성하는 노드 객체는 자신의 구조와 정보를 제어할 수 있는 DOM API를 사용할 수 있다.
- 이를 통해 노드 객체는 자신의 부모, 형제, 자식을 탐색할 수 있고, 자신의 어트리뷰트와 텍스트를 조작할 수 있다.
</aside>

<aside>

- DOM을 구성하는 노드 객체는 브라우저 환경에서 추가적으로 제공하는 호스트 객체다.
- 하지만 노드 객체도 자바스크립트 객체이므로 프로토타입에 의한 상속 구조를 갖는다.
</aside>

<aside>

![image.png](./images/39-5.webp)

- 모든 노드 객체는 Object, EventTarget, Node 인터페이스를 상속받는다.
- 요소 노드는 Element 인터페이스를 상속받는다.
- 이를 프로토타입 체인 관점에서 살펴보면, input 요소 노드 객체는 프로토타입 체인에 있는 모든 프로토타입의 프로퍼티나 메서드를 상속받아 사용할 수 있다.

![input 요소 노드 객체의 프로토타입 체인](./images/39-6.webp)

input 요소 노드 객체의 프로토타입 체인

</aside>

```html
<!DOCTYPE html>
<html>
<body>
  <input type="text">
  <script>
    // input 요소 노드 객체를 선택
    const $input = document.querySelector('input');

    // input 요소 노드 객체의 프로토타입 체인
    console.log(
      Object.getPrototypeOf($input) === HTMLInputElement.prototype,
      Object.getPrototypeOf(HTMLInputElement.prototype) === HTMLElement.prototype,
      Object.getPrototypeOf(HTMLElement.prototype) === Element.prototype,
      Object.getPrototypeOf(Element.prototype) === Node.prototype,
      Object.getPrototypeOf(Node.prototype) === EventTarget.prototype,
      Object.getPrototypeOf(EventTarget.prototype) === Object.prototype
    ); // 모두 true
  </script>
</body>
</html>
```

<aside>

배열이 객체인 동시에 배열인 것처럼 input 요소 노드 객체도 다양한 특성을 갖는 객체이며, 이러한 특성을 나타내는 기능들을 상속을 통해 제공받는다.

| input 요소 노드 객체의 특성 | 프로토타입을 제공하는 객체 |
| --- | --- |
| 객체 | Object |
| 이벤트를 발생시키는 객체 | EventTarget |
| 트리 자료구조의 노드 객체 | Node |
| 브라우저가 렌더링할 수 있는 웹 문서의 요소(HTML, XML, SVG)를 표현하는 객체 | Element |
| 웹 문서의 요소 중에서 HTML 요소를 표현하는 객체 | HTMLElement |
| HTML 요소 중에서 input 요소를 표현하는 객체 | HTMLInputElement |
</aside>

<aside>

**DOM은 HTML 문서의 계층적 구조와 정보를 표현하는 것은 물론 노드 객체의 종류, 즉 노드 타입에 따라 필요한 기능을 프로퍼티와 메서드의 집합인 DOM API로 제공한다. 이 DOM API를 통해 HTML의 구조나 내용 또는 스타일 등을 동적으로 조절할 수 있다.**

</aside>

# 39.2 요소 노드 취득

- 먼저 요소 노드를 취득해야 HTML의 구조나 내용 또는 스타일 등을 동적으로 조작할 수 있다.
- 텍스트 노드는 요소 노드의 자식 노드이고, 어트리뷰트 노드는 요소 노드와 연결되어 있기 때문에 텍스트 노드나 어트리뷰트 노드를 조작하고자 할 때도 마찬가지다.
- 요소 노드의 취득은 HTML 요소를 조작하는 시작점이다. 이를 위해 DOM은 요소 노드를 취득할 수 있는 다양한 메서드를 제공한다.

## 39.2.1 id를 이용한 요소 노드 취득

<aside>

- Document.prototype.getElementById 메서드는 인수로 전달한 id 어트리뷰트 값(이하 id 값)을 갖는 하나의 요소 노드를 탐색하여 반환한다.
- getElementById 메서드는 Document.prototype의 프로퍼티이기 때문에 반드시 문서 노드인 document를 통해 호출해야 한다.
</aside>

```html
<!DOCTYPE html>
<html>
  <body>
    <ul>
      <li id="apple">Apple</li>
      <li id="banana">Banana</li>
      <li id="orange">Orange</li>
    </ul>
    <script>
      // id 값이 'banana'인 요소 노드를 탐색하여 반환한다.
      // 두 번째 li 요소가 파싱되어 생성된 요소 노드가 반환된다.
      const $elem = document.getElementById('banana');

      // 취득한 요소 노드의 style.color 프로퍼티 값을 변경한다.
      $elem.style.color = 'red';
    </script>
  </body>
</html>
```

<aside>

- id 값은 HTML 문서 내에서 유일한 값이어야 하고, 공백 문자로 구분하여 여러 개의 값을 가질 수 없다.
- 단, HTML 문서 내에 중복된 id 값을 갖는 HTML 요소가 여러 개 존재하더라도 어떠한 에러도 발생하지 않는다.
- **즉, HTML 문서 내에는 중복된 id 값을 갖는 요소가 여러 개 존재할 가능성이 있다.**
</aside>

<aside>

- getElementById 메서드는 인수로 전달된 id 값을 갖는 첫 번째 요소 노드만 반환한다.
- **즉, getElementById 메서드는 언제나 단 하나의 요소 노드를 반환한다.**
</aside>

```html
<!DOCTYPE html>
<html>
  <body>
    <ul>
      <li id="banana">Apple</li>
      <li id="banana">Banana</li>
      <li id="banana">Orange</li>
    </ul>
    <script>
      // getElementById 메서드는 언제나 단 하나의 요소 노드를 반환한다.
      // 첫 번째 li 요소가 파싱되어 생성된 요소 노드가 반환된다.
      const $elem = document.getElementById('banana');

      // 취득한 요소 노드의 style.color 프로퍼티 값을 변경한다.
      $elem.style.color = 'red';
    </script>
  </body>
</html>
```

<aside>

- 만약 인수로 전달된 id 값을 갖는 HTML 요소가 존재하지 않는 경우 getElementById 메서드는 null을 반환한다.
</aside>

```html
<!DOCTYPE html>
<html>
  <body>
    <ul>
      <li id="apple">Apple</li>
      <li id="banana">Banana</li>
      <li id="orange">Orange</li>
    </ul>
    <script>
    // id 값이 'grape'인 요소 노드를 탐색하여 반환한다. null이 반환된다.
      const $elem = document.getElementById('grape');

      // 취득한 요소 노드의 style.color 프로퍼티 값을 변경한다.
      $elem.style.color = 'red';
      // TypeError: Cannot read property 'style' of null
    </script>
  </body>
</html>
```

<aside>

- HTML 요소에 id 어트리뷰트를 부여하면 id 값과 동일한 이름의 전역 변수가 암묵적으로 선언되고 해당 노드 객체가 할당되는 부수 효과가 있다.
</aside>

```html
<!DOCTYPE html>
<html>
  <body>
    <div id="foo"></div>
    <script>
      // id 값과 동일한 이름의 전역 변수가 암묵적으로 선언되고 해당 노드 객체가 할당된다.
			console.log(foo === document.getElementById('foo')); //true
			
      // 암묵적 전역으로 생성된 전역 프로퍼티는 삭제되지만 전역 변수는 삭제되지 않는다
      delete foo;
      console.log(foo); //<div id="foo"></div>
    </script>
  </body>
</html>
```

<aside>

- 단, id 값과 동일한 이름의 전역 변수가 이미 선언되어 있으면 이 전역 변수에 노드 객체가 재할당되지 않는다.
</aside>

```html
<!DOCTYPE html>
<html>
  <body>
    <div id="foo"></div>
    <script>
      let foo = 1;

      // id 값과 동일한 이름의 전역 변수가 이미 선언되어 있으면 노드 객체가 재할당되지 않는다.
      console.log(foo); //1
    </script>
  </body>
</html>
```

## 39.2.2 태그 이름을 이용한 요소 노드 취득

<aside>

- Document.prototype/Element.prototype.getElementsByTagName 메서드는 인수로 전달한 태그 이름을 갖는 모든 요소 노드들을 탐색하여 반환한다.
- 메서드 이름에 포함된 Elements가 복수형인 것에서 알 수 있듯이 getElementsByTagName 메서드는 여러 개의 요소 노드 객체를 갖는 DOM 컬렉션 객체인 HTMLCollection 객체를 반환한다.
</aside>

```html
<!DOCTYPE html>
<html>
  <body>
    <ul>
      <li id="apple">Apple</li>
      <li id="banana">Banana</li>
      <li id="orange">Orange</li>
    </ul>
    <script>
      // 태그 이름이 li인 요소 노드를 모두 탐색하여 반환한다.
      // 탐색된 요소 노드들은 HTMLCollection 객체에 담겨 반환된다.
      // HTMLCollection 객체는 유사 배열 객체이면서 이터러블이다.
      const $elems = document.getElementsByTagName('li');

      // 취득한 모든 요소 노드의 style.color 프로퍼티 값을 변경한다.
      // HTMLCollection 객체를 배열로 반환하여 순회하며 color 프로퍼티 값을 변경한다.
      [...$elems].forEach(elem => { elem.style.color = 'red'; });
    </script>
  </body>
</html>
```

<aside>

- 함수는 하나의 값만 반환할 수 있으므로 여러 개의 값을 반환하려면 배열이나 객체와 값은 자료구조에 담아 반환해야 한다.
- getElementsByTagName 메서드가 반환하는 DOM 컬렉션 객체인 HTMLCollection 객체는 유사 배열 객체이면서 이터러블이다.
</aside>

<aside>

- HTML 문서의 모든 요소 노드를 취득하려면 getElementsByTagName 메서드의 인수로 ‘*’를 전달해야한다.
</aside>

```html
const $all = document.getElementsByTagName('*');
```

<aside>

- getElementsByTagName 메서드는 Document.prototype에 정의된 메서드와 Element.prototype에 정의된 메서드가 있다.
- Document.prototype.getElementsByTagName 메서드는 DOM의 루트 노드인 문서노드, 즉 getElementsByTagName 메서드는 특정 요소 노드를 통해 호출하며, 특정 요소 노드의 자손 노드 중에서 요소 노드를 탐색하여 반환한다.
</aside>

```html
<!DOCTYPE html>
<html>
  <body>
    <ul id="fruits">
      <li>Apple</li>
      <li>Banana</li>
      <li>Orange</li>
    </ul>
    <ul>
      <li>HTML</li>
    </ul>
    <script>
      // DOM 전체에서 태그 이름이 li인 요소 노드를 모두 탐색하여 반환한다.
      const $listFormDocument = document.getElementsByTagName('li');
      console.log($listFormDocument); //HTMLCollection(4) [li, li, li, li]

			// ul$fruits 요소의 자손 노드 중에서 태그 이름이 li인 요소 노드를 모두 탐색하여 반환한다.
      const $fruits = document.getElementById('fruits');
      const $listFromFruits = $fruits.getElementsByTagName('li');
      console.log($listFromFruits); //HTMLCollection(3) [li, li, li]
    </script>
  </body>
</html>
```

<aside>

- 만약 인수로 전달된 태그 이름을 갖는 요소가 존재하지 않는 경우 getElementsByTagName 메서드는 빈 HTMLCollection 객체를 반환한다.
</aside>

## 39.2.3 class를 이용한 요소 노드 취득

<aside>

- Document.prototype/Element.prototype.getElementsByTagName 메서드는 인수로 전달한 class 어튜리뷰트 값을 갖는 모든 요소 노드들을 탐색하여 반환한다.
- 인수로 전달할 class 값은 공백으로 구분하여 여러 개의 class를 지정할 수 있다.
- getElementsByTagName 메서드는 여러 개의 요소 도느 객체를 갖는 DOM 컬렉션 객체인 HTMLCollection 객체를 반환한다.
</aside>

```html
<!DOCTYPE html>
<html>
  <body>
    <ul id="fruits">
      <li class="fruit apple">Apple</li>
      <li class="fruit banana">Banana</li>
      <li class="fruit orange">Orange</li>
    </ul>
    <script>
      // clss 값이 'fruit'인 요소 노드를 모두 탐색하여 HTMLCollection 객체에 담아 반환한다
      const $elems = document.getElementsByClassName('fruit');

      // 취득한 모든 요소의 css color 프로퍼티 값을 변경한다
      [...$elems].forEach(elem => {elem.style.color = 'red'; });

      //class 값이 'fruit apple'인 요소 노드를 모두 탐색하여 HTMLCollection 객체에 담아 반환한다
      const $apples = document.getElementsByClassName('fruit apple');

      //취득한 모든 요소 노드의 style.color 프로퍼티 값을 변경한다
      [...$apples].forEach(elem => { elem.style.color = 'blue'; });
    </script>
  </body>
</html>
```

<aside>

- getElementsByClassName 메서드는 Document.prototype에 정의된 메서드와 Element.prototype에 정의된 메서드가 있다.
- Document.prototype.getElementsByClassName 메서드는 DOM의 루트 노드인 문서 노드, 즉, document를 통해 호출하며 DOM 전체에서 요소 노드를 탐색하여 반환하고 Element.prototype.getElementsByClassName 메서드는 특정 요소 노드를 통해 호출하며 특정 요소 노드의 자손 노드 중에서 요소 노드를 탐색하여 반환한다.
</aside>

```html
<!DOCTYPE html>
<html>
  <body>
    <ul id="fruits">
      <li class="apple">Apple</li>
      <li class="banana">Banana</li>
      <li class="orange">Orange</li>
    </ul>
    <div class="banana">Banana</div>
    <script>
      // DOM 전체에서 class 값이 'banana'인 요소 노드를 모두 탐색하여 반환한다
      const $bananasFromDocument = document.getElementsByClassName('banana');
      console.log($bananasFromDocument); //HTMLCollection(2) [li.banana, div.banana]

      // #fruits 요소의 자손 노드 중에서 class 값이 'banana'인 요소 노드를 모두 탐색하여 반환
      const $fruits = document.getElementById('fruits');
      const $bananasFromFruits = $fruits.getElementsByClassName('banana');

      console.log($bananasFromFruits); //HTMLCollection [li.banana]
    </script>
  </body>
</html>
</html>
```

- 인수로 전달된 class 값을 갖는 요소가 존재하지 않는 경우 getElementsByClassName 메서드는 빈 HTMLCollection 객체를 반환한다.

## 39.2.4 CSS 선택자를 이용한 요소 노드 취득

```html
<!-- 전체 선택자: 모든 요소를 선택 -->
* { ... }

<!-- 태그 선택자: 모든 p 태그 요소를 모두 선택 -->
p { ... }

<!-- id 선택자: id 값이 'foo'인 요소를 모두 선택 -->
#foo { ... }

<!-- class 선택자: class 값이 'foo'인 요소를 모두 선택 -->
.foo { ... }

<!-- 어트리뷰트 선택자: input 요소 중에 type 어트리뷰트 값이 'text'인 요소를 모두 선택 -->
input[type=text] { ... }

<!-- 후손 선택자: div 요소의 후손 요소 중 p 요소를 모두 선택 -->
div p { ... }

<!-- 자식 선택자: div 요소의 자식 요소 중 p 요소를 모두 선택 -->
div > p { ... }

<!-- 인접 형제 선택자: p 요소의 형제 요소 중에 p 요소 바로 뒤에 위치하는 ul 요소를 선택 -->
p + ul { ... }

<!-- 일반 형제 선택자: p 요소의 형제 요소 중에 p 요소 뒤에 위치하는 ul 요소를 모두 선택 -->
p ~ ul { ... }

<!-- 가상 클래스 선택자: hover 상태인 a 요소를 모두 선택 -->
a:hover { ... }

<!-- 가상 요소 선택자: p 요소의 콘텐츠의 앞에 위치하는 공간을 선택 
일반적으로 content 프로퍼티와 함께 사용된다 -->
p::befor { ... }
```

<aside>

Document.prototype/Element.prototype.querySelector 메서드는 인수로 전달할 CSS 선택자를 만족시키는 하나의 요소 노드를 탐색하여 반환한다.

인수로 전달한 CSS 선택자를 만족시키는 요소 노드가 

- 여러 개인 경우 → 첫 번째 요소 노드만 반환
- 존재하지 않는 경우 → null 반환
- 문법에 맞지 않는 경우 → DOMException 에러 발생
</aside>

```html
<!DOCTYPE html>
<html>
  <body>
    <ul>
      <li class="apple">Apple</li>
      <li class="banana">Banana</li>
      <li class="orange">Orange</li>
    </ul>
    <script>
      // class 어트리뷰트 값이 'banana'인 첫 번째 요소 노드를 탐색하여 반환한다
      const $elem = document.querySelector('.banana');

      // 취득한 요소 노드의 style.color 프로퍼티 값을 변경한다.
      $elem.style.color = 'red';
    </script>
  </body>
</html>
```

<aside>

- Document.prototype/Element.prototype.querySelectorAll 메서드는 인수로 전달한 CSS 선택자를 만족시키는 모든 요소 노드를 탐색하여 반환한다.
- querySelectorAll 메서드는 여러 개의 요소 노드 객체를 갖는 DOM 컬렉션 객체인 NodeList 객체를 반환한다.
- 인수로 전달된 CSS 선택자를 만족시키는 요소가 존재하지 않는 경우 → 빈 NodeList 객체를 반환한다.
- 인수로 전달한 CSS 선택자가 문법에 맞지 않는 경우 →  DOMException 에러가 발생한다.
</aside>

```html
<!DOCTYPE html>
<html>
  <body>
    <ul>
      <li class="apple">Apple</li>
      <li class="banana">Banana</li>
      <li class="orange">Orange</li>
    </ul>
    <script>
      // ul 요소의 자식 요소인 li 요소를 모두 탐색하여 반환한다.
      const $elems = document.querySelectorAll('ul > li');

      // 취득한 요소 노드들은 NodeList 객체에 담겨 반환된다
      console.log($elems); //NodeList(3) [li.apple, li.banana, li.orange]

      // 취득한 요소 노드의 style.color 프로퍼티 값을 변경한다.
      // NodeList는 forEach 메서드를 제공한다.
      $elems.forEach(elem => { elem.style.color = 'red'; })
    </script>
  </body>
</html>
```

<aside>

HTML 문서의 모든 요소 노드를 취득하려면 querySelectorAll 메서드의 인수로 전체 선택자 ‘*’를 전달한다.

</aside>

```jsx
// 모든 요소 노드를 탐색하여 반환한다.
const $all = document.querySelectorAll('*');
// NodeList(8) [html, head, body, ul, li#apple, li#banana, li#orange, script]
```

<aside>

- Document.prototype에 정의된 메서드는 DOM의 루트 노드인 문서 노드, 즉 document를 통해 호출하며, DOM 전체에서 요소 노드를 탐색하여 반환한다.
- Element.prototype에 정의된 메서드는 특정 요소 노드를 통해 호출하며 특정 요소 노드의 자손 노드 중에서 요소 노드를 탐색하여 반환한다.
</aside>

<aside>

- CSS 선택자 문법을 사용하는 querySelector, querySelectorAll 메서드는 CSS 선택자 문법을 사용하여 좀 더 구체적인 조건으로 요소 노드를 취득할 수 있고 일관된 방식으로 요소 노드를 취득할 수 있다는 장점이 있다.
- id 어튜리뷰트가 있는 요소 노드를 취등하는 경우에는 getElementById 메서드를 사용하고 그 외의 경우에는 querySelector, querySelectorAll 메서드를 사용하는 것을 권장한다.
</aside>

## 39.2.5 특정 요소 노드를 취득할 수 있는지 확인

Element.prototype.matches 메서드는 인수로 전달한 CSS 선택자를 통해 특정 요소 노드를 취득할 수 있는지 확인한다.

```html
<!DOCTYPE html>
<html>
  <body>
    <ul id="fruits">
      <li class="apple">Apple</li>
      <li class="banana">Banana</li>
      <li class="orange">Orange</li>
    </ul>
  </body>
    <script>
      const $apple = document.querySelector('.apple');

      // #apple 노드는 '#fruits > li.apple'로 취득할 수 있다.
      console.log($apple.matches('#fruits > li.apple')); // true

      // $apple 노드는 #fruits > li.banana'로 취득할 수 없다.
      console.log($apple.matches('#fruits > li.banana')); // false
    </script>
</html>
```

<aside>

Element.prototype.matches 메서드는 이벤트 위임을 사용할 때 유용하다. (40.7절 “이벤트 위임”)

</aside>