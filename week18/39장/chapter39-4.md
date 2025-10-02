# 39.7 어트리뷰트

## 39.7.1 어트리뷰트 노드와 attributes 프로퍼티

- HTML 요소는 `여러 개의 어트리뷰트(속성)을 가질 수 있다`
- 형식 정의 (어트리뷰트 이름 = "어트리뷰트값"으로 나타냄)

```jsx
<input id="user" type="text" value="ungmo2">
       어트리뷰트 이름 = "어트리뷰트값"으로 나타냄
```

- `HTML` 문서가 파싱 될 때 어티리뷰트는 어티리뷰트 노드로 변환 되어 요소 노드와 연결 된다.
- 하나의 어트리뷰트당 하나의 어트리뷰트 노드 생성한다. (즉, 위에 input은 3개의 어트리뷰트가 있으므로 3개의 어트리뷰트 노드가 생김)
- 이때 모든 어트리뷰트 노드의 참조는 유사 배열 객체이자 이터러블인 `NamedNodeMap` 객체에 담겨서 요소 노드의 `attributes` 프로퍼티에 저장한다.

## 39.7.2 HTML 어트리뷰트 조작

- `Element.prototype.getAttirbute(attributeName)` : 어트리뷰트 값을 참조
- `Element.prototype.setAttirbute(attributeName, attributeValue)` : 어트리뷰트 값을 변경
- `Element.prototype.hasAttirbute(attributeName)` : 어트리뷰트 존재하는지 확인
- `Element.prototype.removeAttirbute(attributeName)` : 특정 어트리뷰트 삭제

## 39.7.3 HTML 어트리뷰트 vs DOM 프로퍼티

- HTML어트리뷰트의 역할은 HTML요소의 초기상태를 지정하는 것
- DOM프로퍼티는 HTML어트리뷰트의 값을 초기값으로 가지고 있으며 참조와 변경
- 요소 노드 객체에는 HTML 어트리뷰트에 대응 하는 DOM 프로퍼티가 존재한다.
- 즉, `HTML` 어트리 뷰트는 중복 관리 되는 것처럼 보인다.
  - 요소 노드의 `attributes` 프로퍼티에서 관리하는 어트리뷰트 노드
  - 요소 노드의 `DOM` 프로퍼티

### 1. 어트리뷰트 노드

- HTML어트리뷰트로 지정한 HTML요소의 초기 상태는 어트리뷰트 노드에서 관리

### 2. DOM프로퍼티

- 사용자가 입력한 최신상태는 HTML어트리뷰트에 대응하는 요소 노드의 DOM프로퍼티가 관리

### 3. HTML어트리뷰트와 DOM프로퍼티의 대응관계

- 대부분의 HTML어트리뷰트는 HTML어트리뷰트와 동일한 DOM프로퍼티와 1:1로 대응하지만, 언제나 1:1대응인 것도 아니고 반드시 이름이 일치하는 것도 아니다

### 4. DOM프로퍼티 값의 타입

- getAttribute메서드로 취득한 어트리뷰트 값은 언제나 문자열
- DOM프로퍼티로 취득한 최신 상태값은 문자열이 아닐 수도 있다

## 39.7.4 data 어트리뷰트와 dataset 프로퍼티

- data 어트리뷰트와 dataset 프로퍼티를 사용하면 HTML 요소에 정의한 사용자 정의 어트리뷰트와 자바스크립트 간에 데이터를 교환 가능
- data 어트리뷰트는 data- 접두사 다음에 이름을 붙여 사용
- HTMLElement.dataset 프로퍼티로 취득
- DOMStringMap 객체(data 어트리뷰트를 카멜케이스로 변환한 프로퍼티를 가지고 있음) 반환

```jsx
// <ul class='users'>
//  <li id='1' data-user-id='7621' data-role='admin'>Lee</li>
//  <li id='2' data-user-id='9524' data-role='subscriber'>Kim</li>
//</ul>

const users = [...document.querySelector('.users').children];
const user = user.find(user => user.dataset.userId === '7621');
user.dataset.role = 'subscriber';

존재하지 않는 data 프로퍼티로 접근하면 HTML 요소에 data 어트리뷰트가 추가됨(attribute에 자동으로 케밥케이스로 변경되어 추가됨)
```

# 39.8 스타일

## 39.8.1 인라인 스타일 조작

- `HTMLElement.prototype.style` 프로퍼티
- `getter` / `setter` 가 모두 존재하는 접근자 프로퍼티로 요소 노드의 인라인 스타일을 취득하거나 추가 또는 변경

```jsx
<!DOCTYPE html>
<html>
<body>
  <div style="color: red">Hello World</div>
  <script>
    const $div = document.querySelector('div');

    <-- 인라인 스타일 취득 -->
    console.log($div.style); // CSSStyleDeclaration { 0: "color", ... }

    <-- 인라인 스타일 변경 -->
    $div.style.color = 'blue';

    <-- 인라인 스타일 추가 -->
    $div.style.width = '100px';
    $div.style.height = '100px';
    $div.style.backgroundColor = 'yellow';
  </script>
</body>
</html>
```

## 39.8.2 클래스 조작

- 어트리뷰트에 대응하는 `DOM` 프로퍼티: `className` 과 `classList` ( `class`  아님!!!)

### className

- `Element.prototype.className`
- `class` 어트리뷰트의 값을 문자열로 반환
- 클래스 값이 공백으로 구분되어 있을 경우 그대로 문자열로 반환

### classList

- `Element.prototype.classList`
- `class` 어트리뷰트의 정보를 담은 `DOMTokenList` 객체를 반환한다.
- `DOMTokenList` 객체는 class 어트리뷰트의 정보를나타내는 컬렉션 객체로 유사 배열이면서 이터러블
  - `DOMTokenList` 주요 메서드
  - `add(... className)` : 인수로 전달된 1개의 이상의 문자열을 class 어트리뷰트 값으로 추가
  - `remove(... className)` : 인수로 전달한 1개 이상의 문자열과 일치하는 class 어트리뷰트에서 삭제한다.(일치 하는 클래스가 없으면 무시됨)
  - `item(index)` : 인수로 전달한 index에 해당하는 클래스를 class 어트리뷰트에서 반환
  - `contains(className)` : 인수로 전달한 문자열과 일치하는 클래스가 class 어트리뷰트에 포함되어 있는지 확인
  - `replace(oldClassName, newClassName)` : 첫 번째 인수 클래스를 두번째 클래스로 변경
  - `toggle(className[, force])` : 인수로 전달한 문자열과 일치하는 클래스가 존재하면 제거하고 존재하지 않으면 추가

## 39.8.3 요소에 적용되어 있는 CSS 스타일 참조

- **`HTMLElement.prototype.style`**
  - **반환값**: 인라인 스타일만 반환
  - 작성된 HTML 태그의 `style` 속성 값만 확인할 수 있음
- **`window.getComputedStyle(element[, pseudo])`**
  - **반환값**: `CSSStyleDeclaration` 객체
  - 링크된 CSS, `<style>` 내 임베딩, 인라인, JS 동적 적용, 상속, 브라우저 기본(user agent) 스타일까지 모두 합산된 최종 계산 스타일을 가져옴
  - 두 번째 인자 `pseudo`:
    - `':before'`, `':after'` 등 **의사 요소**의 스타일까지 조회 가능

```jsx
const elem = document.querySelector(".target");

// 인라인 스타일만
console.log(elem.style);

// 모든 계산된 스타일
const styles = window.getComputedStyle(elem);
console.log(styles.color); // 예: rgb(0, 0, 0)

// 의사 요소
const beforeStyles = window.getComputedStyle(elem, "::before");
console.log(beforeStyles.content);
```

## 39.9 DOM 표준

| 레벨        | 표준 URL                                                    |
| ----------- | ----------------------------------------------------------- |
| DOM Level 1 | https://www.w3.org/TR/REC-DOM-Level-1                       |
| DOM Level 2 | https://www.w3.org/TR/DOM-Level-2-Core                      |
| DOM Level 3 | https://www.w3.org/TR/DOM-Level-3-Core                      |
| DOM Level 4 | [https://dom.spec.whatwg.org](https://dom.spec.whatwg.org/) |
