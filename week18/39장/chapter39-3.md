# 39.6 DOM 조작

- DOM 조작
    - 새로운 노드를 생성하여 DOM에 **추가**하거나 기존 노드를 **삭제** 또는 **교체**하는 것
    - 이 과중에서 리플로우와 리페인트가 발생하는 원인이 되므로 성능에 영향을 준다.
    - 성능 최적화를 위해 주의해서 다루어야 한다.
- 리플로우와 리페인트
    - 시원님 자료 : [https://slime-fall-1f7.notion.site/38-26c566396b518005aeabdb35673e7640?pvs=97#26c566396b5180e19a14d4cb669e38a2](https://www.notion.so/26c566396b518005aeabdb35673e7640?pvs=21)

## innerHTML

- setter와 getter 모두 존재하는 접근자 프로퍼티로서 요소 노드의 HTML 마크업을 취득하거나 변경한다.
- 요소 노드의 콘텐츠 영역(시작 태그와 종료 태그 사이) 내에 포함된 모든 HTML 마크업을 문자열로 반환한다.
- `textContet` 프로퍼티는 HTML 마크업은 무시하고 텍스트만 반환
`innerHTML` 프로퍼티는 HTML 마크업이 포함된 문자열 반환

```html
<!DOCTYPE html>
<html>
  <body>
    <div id="foo">Hello <span>world!</span></div>
  </body>
  <script>
    // #foo 요소의 콘텐츠 영역 내의 HTML 마크업을 문자열로 취득한다.
    console.log(document.getElementById('foo').innerHTML);
    // "Hello <span>world!</span>"
  </script>
</html>
```

- 요소 노드의 `innerHTML` 프로퍼티에 문자열을 할당하면
요소 노드의 모든 자식 노드가 제거되고 할당한 문자열에 포함되어 있는 HTML 마크업이 파싱되어 요소 노드의 자식 노드로 DOM에 반영된다. (할당한 문자열대로 덮어 씌운다)

```html
<!DOCTYPE html>
<html>
  <body>
    <div id="foo">Hello <span>world!</span></div>
  </body>
  <script>
    // HTML 마크업이 파싱되어 요소 노드의 자식 노드로 DOM에 반영된다.
    document.getElementById('foo').innerHTML = 'Hi <span>there!</span>';
  </script>
</html>
```

![image.png](./images/39-3-1.webp)

- `innerHTML` 프로퍼티 사용 예시

```html
<!DOCTYPE html>
<html>
  <body>
    <ul id="fruits">
      <li class="apple">Apple</li>
    </ul>
  </body>
  <script>
    const $fruits = document.getElementById('fruits');

    // 노드 추가
    $fruits.innerHTML += '<li class="banana">Banana</li>';

    // 노드 교체
    $fruits.innerHTML = '<li class="orange">Orange</li>';

    // 노드 삭제
    $fruits.innerHTML = '';
  </script>
</html>
```

- 사용자로부터 입력받은 데이터를 그대로 `innerHTML`프로퍼티에 할당하는 것은 크로스 사이트 스크립팅 공격에 취약하므로 위험하다.
    - HTML 마크업 내에 자바스크립트 악성 코드가 포함되어 있다면 파싱 과정에서 그대로 실행될 가능성이 있기 때문
        
        ```html
        <!DOCTYPE html>
        <html>
          <body>
            <div id="foo">Hello</div>
          </body>
          <script>
            // innerHTML 프로퍼티로 스크립트 태그를 삽입하여 자바스크립트가 실행되도록 한다.
            // HTML5는 innerHTML 프로퍼티로 삽입된 script 요소 내의 자바스크립트 코드를 실행하지 않는다.
            document.getElementById('foo').innerHTML
              = '<script>alert(document.cookie)</script>';
          </script>
        </html>
        ```
        
    - HTML5는 `innerHTML` 프로퍼티로 삽입된  script 요소 내의 자바스크립트 코드를 실행하지 않는다.
    - 따라서 위의 예제는 HTML5 에서 동작하지 않는다.
    - 하지만 아래처럼 크로스 사이트 스크립팅 공격이 가능하다.
        
        ```html
        <!DOCTYPE html>
        <html>
          <body>
            <div id="foo">Hello</div>
          </body>
          <script>
            // 에러 이벤트를 강제로 발생시켜서 자바스크립트 코드가 실행되도록 한다.
            document.getElementById('foo').innerHTML
              = `<img src="x" onerror="alert(document.cookie)">`;
          </script>
        </html>
        ```
        
- 이처럼 `innerHTML`은 DOM 조작이 간단하고 직관적이라는 장점이 있지만 크로스 사이트 스크립팅 공격에 취약한 단점이 있다.
- innerHTML의 또 다른 단점 1
    - 요소 노드의 `innerHTML` 프로퍼티에 HTML 마크업 문자열을 할당하는 경우 요소 노드의 모든 자식 노드를 제거하고 할당한 HTML 마크업 문자열을 파싱하여 DOM을 변경한다.
    
    ```html
    <!DOCTYPE html>
    <html>
      <body>
        <ul id="fruits">
          <li class="apple">Apple</li>
        </ul>
      </body>
      <script>
        const $fruits = document.getElementById('fruits');
    
        // 노드 추가
        $fruits.innerHTML += '<li class="banana">Banana</li>';
        // $fruits.innerHTML = $fruits.innerHTML + '<li class="banana">Banana</li>';
    		// '<li class="apple">Apple</li>' + '<li class="banana">Banana</li>'
      </script>
    </html>
    ```
    
    - 위처럼 유지되어도 좋은 기존의 자식 노드까지 모두 제거하고 다시 처음부터 새롭게 자식 노드를 생성하여 DOM에 반영한다.
- innerHTML의 또 다른 단점 2
    - 새로운 요소를 삽입할 때 삽입될 위치를 지정할 수 없다.

## insertAdjacentHTML 메서드

- `insertAdjacentHTML(position, DOMString)` 메서드는 기존 요소를 제거하지 않으면서 위치를 지정해 새로운 요소를 삽입한다.
- `insertAdjacentHTML` 의 두 번째 인수로 전달한 HTML 마크업 문자열을 파싱하고 그 결과로 생성된 노드를 첫 번째 인수로 전달한 위치에 삽입하여 DOM에 반영한다.
    - 첫 번째 인수로 전달할 수 있는 문자열은
    ’beforebegin’, ‘afterbegin’, ‘beforeend’, ‘afterend’ 4가지 이다.
    
    ![image.png](./images/39-3-2.webp)
    
    ```html
    <!DOCTYPE html>
    <html>
      <body>
        <!-- beforebegin -->
        <div id="foo">
          <!-- afterbegin -->
          text
          <!-- beforeend -->
        </div>
        <!-- afterend -->
      </body>
      <script>
        const $foo = document.getElementById('foo');
    
        $foo.insertAdjacentHTML('beforebegin', '<p>beforebegin</p>');
        $foo.insertAdjacentHTML('afterbegin', '<p>afterbegin</p>');
        $foo.insertAdjacentHTML('beforeend', '<p>beforeend</p>');
        $foo.insertAdjacentHTML('afterend', '<p>afterend</p>');
      </script>
    </html>
    ```
    
- `innerHTML` 프로퍼티처럼 기존의 자식 노드를 모두 제거하고 처음부터 새롭게 생성하는 것이 아니고
기존 요소에는 영향을 주지 않고 새롭게 삽입될 요소만을 파싱하여 자식 요소로 추가하므로 더 빠르고 효율적이다.
- 하지만 HTML마크업 문자열을 파싱하므로 크로스 사이트 스크립팅 공격에 취약하다는 점은 동일하다.

## 노드 생성과 추가

- 미리 보기
    
    ```html
    <!DOCTYPE html>
    <html>
      <body>
        <ul id="fruits">
          <li>Apple</li>
        </ul>
      </body>
      <script>
        const $fruits = document.getElementById('fruits');
    
        // 1. 요소 노드 생성
        const $li = document.createElement('li');
    
        // 2. 텍스트 노드 생성
        const textNode = document.createTextNode('Banana');
    
        // 3. 텍스트 노드를 $li 요소 노드의 자식 노드로 추가
        $li.appendChild(textNode);
    
        // 4. $li 요소 노드를 #fruits 요소 노드의 마지막 자식 노드로 추가
        $fruits.appendChild($li);
      </script>
    </html>
    ```
    

### 요소 노드 생성

- `createElement(tagName)` 메서드는 요소 노드를 생성하여 반환한다.
- 매개변수 `tagName`에는 태그 이름을 나타내는 **문자열**을 인수로 전달한다.

```jsx
// 1. 요소 노드 생성
const $li = document.createElement('li');
```

- 요소 노드를 생성할 뿐 DOM에 추가하지는 않는다.
    - 따라서 이후에 생성도니 요소 노드를 DOM에 추가하는 처리가 별도로 필요하다.
- 아무런 자식 노드를 가지고 있지 않다.
    - 따라서 요소 노드의 자식 노드인 텍스트 노드도 없는 상태이다.
    
    ```jsx
    // 1. 요소 노드 생성
    const $li = document.createElement('li');
    // 생성된 요소 노드는 아무런 자식 노드가 없다.
    console.log($li.childNodes); // NodeList []
    ```
    

### 텍스트 노드 생성

- `createTextNode(text)` 메서드는 텍스트 노드를 생성하여 반환한다.
- 매개변수 `text`에는 텍스트 노드의 값으로 사용할 **문자열**을 인수로 전달한다.

```jsx
// 2. 텍스트 노드 생성
const textNode = document.createTextNode('Banana');
```

- 텍스트 노드를 생성할 뿐 요소 노드에 추가하지 않는다.
    - 따라서 이후에 생성된 텍스트 노드를 요소 노드에 추가하는 처리가 별도로 필요하다.

### 텍스트 노드를 요소 노드의 자식 노드로 추가

- `appendChild(childNode)` 메서드는 매개변수 `childNode`에게 인수로 전달한 노드를 `appendChild` 메서드를 호출한 노드의 마지막 자식 노드로 추가한다.

```jsx
// 3. 텍스트 노드를 $li 요소 노드의 자식 노드로 추가
$li.appendChild(textNode);
```

- 요소 노드에 자식 노드가 하나도 없는 경우에는 텍스트 노드를 생성 → 요소 노드에 텍스트 노드를 추가 하는 방법보다 `textContent` 프로퍼티를 사용하는 편이 더 간편한다.
    - 단, 요소 노드에 자식 노드가 있을 경우  `textContent` 프로퍼티를 사용하면 요소 노드의 모든 자식 노드가 제거되고 할당한 문자열이 텍스트로 추가되므로 주의해아 한다.

```jsx
// 텍스트 노드를 생성하여 요소 노드의 자식 노드로 추가
$li.appendChild(document.createTextNode('Banana'));

// $li 요소 노드에 자식 노드가 하나도 없는 위 코드와 동일하게 동작한다.
$li.textContent = 'Banana';
```

### 요소 노드를 DOM에 추가

- `appendChild` 메서드를 사용하여 텍스트 노드와 부자 관계로 연결한 요소 노드를 메서드를 사용한 요소의 마지막 자식 요소로 추가한다.

```jsx
// 4. $li 요소 노드를 #fruits 요소 노드의 마지막 자식 노드로 추가
$fruits.appendChild($li);
```

- 이 과정에서 DOM에 요소 노드가 추가된다.
이때 리플로우와 리페인트가 실행된다.

## 복수의 노드 생성과 추가

- 여러개의 요소 노드를 생성하여 DOM에 추가

```jsx
<!DOCTYPE html>
<html>
  <body>
    <ul id="fruits"></ul>
  </body>
  <script>
    const $fruits = document.getElementById('fruits');
    
    ['Apple', 'Banana', 'Orange'].forEach(text => {
      // 1. 요소 노드 생성
      const $li = document.createElement('li');

      // 2. 텍스트 노드 생성
      const textNode = document.createTextNode(text);

      // 3. 텍스트 노드를 $li 요소 노드의 자식 노드로 추가
      $li.appendChild(textNode);

      // 4. $li 요소 노드를 #fruits 요소 노드의 마지막 자식 노드로 추가
      $fruits.appendChild($li);
    });
  </script>
</html>
```

- 위 처럼 추가하면 DOM에 3번 추가하므로 리플로우, 리페인트가 3번 실행된다.
    - 비효율적이다. 가급적 횟수를 줄이는 것이 좋다.
- 개선을 위해 컨테이너 요소를 미리 생성 후 DOM에 추가할 3개의 요소 노드를 컨테이너 요소에 자식 노드로 추가한다. 그 후 컨테이너 요소를 #fruits 요소에 자식으로 추가한다면 DOM은 한 번만 변경된다.

```jsx
<!DOCTYPE html>
<html>
  <body>
    <ul id="fruits"></ul>
  </body>
  <script>
    const $fruits = document.getElementById('fruits');

    // 컨테이너 요소 노드 생성
    const $container = document.createElement('div');

    ['Apple', 'Banana', 'Orange'].forEach(text => {
      // 1. 요소 노드 생성
      const $li = document.createElement('li');

      // 2. 텍스트 노드 생성
      const textNode = document.createTextNode(text);

      // 3. 텍스트 노드를 $li 요소 노드의 자식 노드로 추가
      $li.appendChild(textNode);

      // 4. $li 요소 노드를 컨테이너 요소의 마지막 자식 노드로 추가
      $container.appendChild($li);
    });

    // 5. 컨테이너 요소 노드를 #fruits 요소 노드의 마지막 자식 노드로 추가
    $fruits.appendChild($container);
  </script>
</html>
```

```html
<ul id="fruits">
  <div>
    <li>apple</li>
    <li>banana</li>
    <li>orange</li>
  </div>
</ul>
```

- 이렇게 하면 성능에는 유리하지만 불필요한 컨테이너 요소(div)가 DOM에 추가되는 부작용이 있다.
- 이러한 문제는 `DocumentFragment`  노드를 통해 해결할 수 있다.
- `DocumentFragment`
    - 문서, 요소, 어트리뷰트, 텍스트 노드와 같은 노드 객체의 일종
    - 부모 노드가 없어서 기존 DOM과는 별도로 존재한다.
    - 위 예제의 컨테이너 요소처럼 자식 노드들의 부모 노드로서 별도의 서브 DOM을 구성하여 기존  DOM에 추가하기 위한 용도로 사용한다.
    - 기존 DOM과 별도로 존재하므로 자식 노드를 추가하여도 기존 DOM에는 어떠한 변경도 발생하지 않는다.
    - `DocumentFragment`를 DOM에 추가하면 자신은 제거되고 자신의 자식 노드만 DOM에 추가된다.
    - `createDocumentFragment` 메서드로 비어있는 `DocumentFragment` 노드를 생성한다.

```jsx
<!DOCTYPE html>
<html>
  <body>
    <ul id="fruits"></ul>
  </body>
  <script>
    const $fruits = document.getElementById('fruits');

    // DocumentFragment 노드 생성
    const $fragment = document.createDocumentFragment();

    ['Apple', 'Banana', 'Orange'].forEach(text => {
      // 1. 요소 노드 생성
      const $li = document.createElement('li');

      // 2. 텍스트 노드 생성
      const textNode = document.createTextNode(text);

      // 3. 텍스트 노드를 $li 요소 노드의 자식 노드로 추가
      $li.appendChild(textNode);

      // 4. $li 요소 노드를 DocumentFragment 노드의 마지막 자식 노드로 추가
      $fragment.appendChild($li);
    });

    // 5. DocumentFragment 노드를 #fruits 요소 노드의 마지막 자식 노드로 추가
    $fruits.appendChild($fragment);
  </script>
</html>
```

## 노드 삽입

### 마지막 노드로 추가

- `appendChild` 메서드는 인수로 전달받은 노드를 자신이 호출한 노드의 마지막 자식 노드로 DOM에 추가한다.

```html
<!DOCTYPE html>
<html>
  <body>
    <ul id="fruits">
      <li>Apple</li>
      <li>Banana</li>
    </ul>
  </body>
  <script>
    // 요소 노드 생성
    const $li = document.createElement('li');

    // 텍스트 노드를 $li 요소 노드의 마지막 자식 노드로 추가
    $li.appendChild(document.createTextNode('Orange'));

    // $li 요소 노드를 #fruits 요소 노드의 마지막 자식 노드로 추가
    document.getElementById('fruits').appendChild($li);
  </script>
</html>
```

### 지정한 위치에 노드 삽입

- `insertBefore(newNode, childNode)` 메서드는 첫 번째 인수로 전달받은 노드를 두 번째 인수로 전달받은 노드 앞에 삽입한다.

```html
<!DOCTYPE html>
<html>
  <body>
    <ul id="fruits">
      <li>Apple</li>
      <li>Banana</li>
    </ul>
  </body>
  <script>
    const $fruits = document.getElementById('fruits');

    // 요소 노드 생성
    const $li = document.createElement('li');

    // 텍스트 노드를 $li 요소 노드의 마지막 자식 노드로 추가
    $li.appendChild(document.createTextNode('Orange'));

    // $li 요소 노드를 #fruits 요소 노드의 마지막 자식 요소 앞에 삽입
    $fruits.insertBefore($li, $fruits.lastElementChild);
    // Apple - Orange - Banana
  </script>
</html>
```

- 두 번째 인수로 전달받은 노드는 반드시 `insertBefore` 메서드를 호출한 노드의 자식 노드여야 한다.
    - 그렇지 않으면  DOMException 에러 발생
    
    ```html
    <!DOCTYPE html>
    <html>
      <body>
        <div>test</div>
        <ul id="fruits">
          <li>Apple</li>
          <li>Banana</li>
        </ul>
      </body>
      <script>
        const $fruits = document.getElementById('fruits');
    
        // 요소 노드 생성
        const $li = document.createElement('li');
    
        // 텍스트 노드를 $li 요소 노드의 마지막 자식 노드로 추가
        $li.appendChild(document.createTextNode('Orange'));
    
        // 두 번째 인수로 전달받은 노드는 반드시 #fruits 요소 노드의 자식 노드이어야 한다.
        $fruits.insertBefore($li, document.querySelector('div'));
        // DOMException
      </script>
    </html>
    ```
    
- 두 번째 인수로 전달받은 노드가 null이면 첫 번재 인수로 전달받은 노드를 `insertBefore` 메서드를 호출한 노드의 마지막 자식 노드로 추가한다. (=`appendChild`)

```html
<!DOCTYPE html>
<html>
  <body>
    <ul id="fruits">
      <li>Apple</li>
      <li>Banana</li>
    </ul>
  </body>
  <script>
    const $fruits = document.getElementById('fruits');

    // 요소 노드 생성
    const $li = document.createElement('li');

    // 텍스트 노드를 $li 요소 노드의 마지막 자식 노드로 추가
    $li.appendChild(document.createTextNode('Orange'));

    // 두 번째 인수로 전달받은 노드가 null이면 $li 요소 노드를 #fruits 요소 노드의 마지막 자식 노드로 추가
    $fruits.insertBefore($li, null);
  </script>
</html>
```

## 노드 이동

- DOM에 이미 존재하는 노드를 `appendChild`, `insertBefore` 메서드를 사용해서 DOM에 다시 추가하면 현재 위치에서 노드를 제거하고 새로운 위치로 노드를 추가한다 (=노드 이동)

```html
<!DOCTYPE html>
<html>
  <body>
    <ul id="fruits">
      <li>Apple</li>
      <li>Banana</li>
      <li>Orange</li>
    </ul>
  </body>
  <script>
    const $fruits = document.getElementById('fruits');

    // 이미 존재하는 요소 노드를 취득
    const [$apple, $banana, ] = $fruits.children;

    // 이미 존재하는 $apple 요소 노드를 #fruits 요소 노드의 마지막 노드로 이동
    $fruits.appendChild($apple); // Banana - Orange - Apple

    // 이미 존재하는 $banana 요소 노드를 #fruits 요소의 마지막 자식 노드 앞으로 이동
    $fruits.insertBefore($banana, $fruits.lastElementChild);
    // Orange - Banana - Apple
  </script>
</html>
```

## 노드 복사

- `cloneNode([deep: true | false])` 메서드는 노드의 사본을 생성하여 반환한다.
    - 매개변수 `deep`에 true를 인수로 전달하면 노드를 깊은 복사하여 모든 자손 노드가 포함된 사본을 생성
    - 매개변수 `deep`에 false를 인수로 전달하거나 생략하면 노드를 얕은 복사하여 노드 자신만의 사본을 생성한다.
        - 얕은 복사로 생성된 요소 노드는 자손 노드를 복사하지 않으므로 텍스트 노드도 없다.
    
    ```html
    <!DOCTYPE html>
    <html>
      <body>
        <ul id="fruits">
          <li>Apple</li>
        </ul>
      </body>
      <script>
        const $fruits = document.getElementById('fruits');
        const $apple = $fruits.firstElementChild;
    
        // $apple 요소를 얕은 복사하여 사본을 생성. 텍스트 노드가 없는 사본이 생성된다.
        const $shallowClone = $apple.cloneNode(false);
        // 사본 요소 노드에 텍스트 추가
        $shallowClone.textContent = 'Banana';
        // 사본 요소 노드를 #fruits 요소 노드의 마지막 노드로 추가
        $fruits.appendChild($shallowClone);
    
        // #fruits 요소를 깊은 복사하여 모든 자손 노드가 포함된 사본을 생성
        const $deepClone = $fruits.cloneNode(true);
        // 사본 요소 노드를 #fruits 요소 노드의 마지막 노드로 추가
        $fruits.appendChild($deepClone);
      </script>
    </html>
    ```
    

## 노드 교체

- `replaceChild(newChild, oldChild)` 메서드는 자신을 호출한 노드의 자식 노드를 다른 노드로 교체한다.
    - 첫 번째 매개변수 `newChild`에는 교체할 새로운 노드를 인수로 전달
    - 두 번재 매개변수 `oldChild`에는 이미 존재하는 교체될 노드를 인수로 전달
    - = `oldChild`를 `newChild`로 교체

```html
<!DOCTYPE html>
<html>
  <body>
    <ul id="fruits">
      <li>Apple</li>
    </ul>
  </body>
  <script>
    const $fruits = document.getElementById('fruits');

    // 기존 노드와 교체할 요소 노드를 생성
    const $newChild = document.createElement('li');
    $newChild.textContent = 'Banana';

    // #fruits 요소 노드의 첫 번째 자식 요소 노드를 $newChild 요소 노드로 교체
    $fruits.replaceChild($newChild, $fruits.firstElementChild);
  </script>
</html>
```

## 노드 삭제

- `removeChild(child)` 메서드는 `child` 매개변수에 인수로 전달한 노드를 DOM에서 삭제한다.

```html
<!DOCTYPE html>
<html>
  <body>
    <ul id="fruits">
      <li>Apple</li>
      <li>Banana</li>
    </ul>
  </body>
  <script>
    const $fruits = document.getElementById('fruits');

    // #fruits 요소 노드의 마지막 요소를 DOM에서 삭제
    $fruits.removeChild($fruits.lastElementChild);
  </script>
</html>
```