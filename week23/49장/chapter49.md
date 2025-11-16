# 49장 Babel과 Webpack을 이용한 ES6+/ES.NEXT 개발 환경 구축

# 49.1 Babel

<aside>
💡

Babel 이란?

자바스크립트를 활용한 개발에서 트랜스 파일러 역할을 하는 도구( 즉, 코드를 다른 형태의 코드로 변환해주는 도구)

Babel은 최신 자바스크립트(ES6 이상) 문법을 구형 브라우저나 환경에서도 실행할 수 있게 이전 버전(ES5) 문법으로 변환해주는 JavaScript컴파일러이다.

</aside>

<aside>
🤔

Babel 이 왜 필요할까 ?

자바스크립트는 계속 진화하면서 새로운 문법과 기능이 지속적으로 추가된다.

하지만 모든 브라우저나 Node.js등이 최신 문법을 지원 X
그러기 때문에 Babel이 필요하다 !!

</aside>

[ 예제 49 - 01 ] 

```jsx
[1,2,3].map(n => n ** n);
// 이 코드는 ES6에서 추가된 화살표 함수와 ES7에서 추가된 지수 연산자를 사용한다.
// 위 코드를 Babel을 사용하면 아래 코드처럼 ES5 사양으로 변환해준다.
```

[ 예제 49 - 02 ]

```jsx
"use strict";
[1,2,3].map(function (n) {
	return Math.pow(n, n);
});
// 이처럼 Babel은 ES6+/ES.NEXT로 구현된 최신 사양의 소스코드를 IE 같은 구형 브라우저에서도
// 동작하게 해준다.
```

<aside>
📌

Babel은 상위 버전의 코드를 하위 버전의 브라우저에서도 동작하도록 코드를 변형시킨다.

create-react-app, Next.js, Vite 같은 도구들은 Babel 설정을 내부적으로 포함하고 있기 때문에 별도로 설정이 필요가 없다 !

</aside>

# 49.2 Webpack

<aside>
💡

Webpack은 수많은 JS, CSS, 이미지 파일을 하나의 최적화된 번들로 묶어주는 도구이다.

브라우저에서는 수많은 파일들을 직접 이해하거나 관리하지 못하기 때문에 번들 작업이 필요하다.

</aside>

## Webpack이 하는일  (React로 시작하는 웹 개발)

| 기능 | 설명 |
| --- | --- |
| 번들링 (Bundling) | 여러 개의 JS, CSS, 이미지 파일을 하나(또는 여러개)로 묶음 |
| 로더 (Loaders)  | JS 외의 파일(CSS, 이미지, JSX 등)을 처리할 수 있게 해줌 |
| 플러그인 (Plugins) | 번들 파일 최적화, HTML 자동 생성 등 부가 기능 수행 |
| 개발 서버 (Dev Server) | 코드 변경 시 자동 리로드(Hot Reload) 지원 |

## Webpack의 핵심 개념 4가지 (면접준비 개발블로그에서 퍼옴)

1. Entry (진입점)

프로젝트의 시작 파일을 지정한다.

보통 React 앱에서는 src/index.js 또는 src/main.jsx을 지정한다.

1. Output (출력)

번들링된 결과 파일이 어디에 저장될지 설정한다.

1. Loaders (로더)

JS 외의 파일도 Webpack이 이해할 수 있도록 변환한다.

ex) JSX, CSS, 이미지 등을 처리하려면 로더가 필요하다.

1. Plugins (플러그인)

빌드 과정에서 다양한 부가기능을 추가한다.

## Webpack과 Babel의 관계

```jsx
JSX / 최신 JS
     ↓
   Babel (babel-loader) // Babel을 통해 상위버전으로 작성된 코드를 변환시킨다.
     ↓
 변환된 JS 파일
     ↓
  Webpack (번들링)  // Webpack을 통해 파일을 묶는 작업을 진행한다.
     ↓
  bundle.js (최종 결과)
```

<aside>
💡

Webpack은 브라우저가 파일을 관리할 수 있도록 묶는 작업을 위한 도구로 동작한다.

Webpack 또한 create-react-app, Next.js, Vite 같은 도구들은 Webpack 설정을 내부적으로 포함하고 있기 때문에 별도로 설정이 필요가 없다 !

</aside>

## Babel & Webpack 면접 질문 (개발블로그에서 퍼옴)

| 질문 | 핵심 포인트 |
| --- | --- |
| Babel은 무슨 역할을 하나요? | JSX와 최신 문법을 브라우저 호환 코드로 변환 |
| Webpack의 역할은 뭐예요? | 여러 모듈을 의존성 그래프 기반으로 묶어 최적화된 번들을 생성 |
| Loader와 Plugin의 차이는요? | Loader는 파일 단위 변환, Plugin은 빌드 프로세스 확장 |
| Tree shaking은 어떻게 작동하나요? | 사용하지 않는 export를 제거 (ESM + production 모드 필요) |
| Code splitting은 왜 쓰나요? | 초기 로딩 속도 개선 (필요한 코드만 지연 로드) |
| Babel이 Webpack 없이 동작할 수 있나요? | 가능하지만, 번들링·자산 관리 등은 Webpack이 담당해야 함 |
| Plugin과 Preset의 차이 | Plugin  |

| 질문 | 답변 포인트 |
| --- | --- |
| **AST란 무엇인가요?** | 코드를 구조적으로 표현한 트리 형태의 데이터 구조 |
| **Babel이 AST를 왜 쓰나요?** | 코드 변환을 문자열이 아닌 구조적 트리 단위로 처리하기 위해 |
| **Babel의 3단계 동작 과정은?** | Parsing → Transforming → Generating |
| **AST를 직접 볼 수 있나요?** | 가능, AST Explorer 같은 도구로 시각화 가능 |
| **Babel Plugin은 어떻게 동작하나요?** | AST를 순회(traverse)하며 특정 노드를 찾아 수정 |

### Babel의 실제 동작 단계

Babel은 단순히 “JSX → JS 변환기”가 아니라,

**컴파일러(Compiler)** 로서 **3단계 과정**을 거친다.

1. **Parsing** – 코드를 **AST(Abstract Syntax Tree, 추상 구문 트리)** 로 변환
2. **Transforming** – AST를 조작하여 새로운 문법으로 변환
3. **Generating** – 새 AST를 다시 문자열(JavaScript 코드)로 변환

```jsx
// 예: JSX -> JS
const el = <h1>Hello</h1>;
↓
Babel Parse → AST → Transform → Generate
↓
const el = React.createElement('h1', null, 'Hello');

```

⇒ 면접에서 “Babel은 AST 기반으로 동작한다” 라고 말하면 공부 좀 열심히 했구나 소리 들음(오피셜X)

<aside>
💡

AST(추상 구문 트리)는 무엇인가?

⇒ 코드를 구조적으로 표현한 트리 형태(말 그대로 나뭇가지가 퍼져나간 것처럼)의 데이터 구조

</aside>

```jsx
const sum = 1 + 2;
// 이러한 코드를 Babel은 "구문 트리"로 분석한다.

Program
 └─ VariableDeclaration (const)
     ├─ Identifier (sum)
     └─ BinaryExpression (+)
         ├─ NumericLiteral (1)
         └─ NumericLiteral (2)
```

### Babel이 AST를 왜 쓰는가?

Babel은 **“코드 → AST → 수정 → 코드로 다시 변환”** 하는 3단계로 동작한다.

```
1. Parse 단계 → AST 생성
2. Transform 단계 → AST 조작
3. Generate 단계 → 코드로 다시

```

ex) Babel을 활용한 JSX 변환 과정

React.JSX 코드를 활용한 예시

```jsx
const el = <h1>Hello</h1>;
```

Babel은 이걸 AST(추상 구문 트리)형태로 분석하고, 그 구조를 수정해서

```jsx
const el = React.createElement('h1', null, 'hello');
```

으로 변환한다.

### Babel Plugin / Preset 차이

| 구분 | 설명 | 예시 |
| --- | --- | --- |
| **Plugin** | 특정 변환 기능 하나 | `@babel/plugin-transform-arrow-functions` |
| **Preset** | 여러 플러그인을 묶은 세트 | `@babel/preset-env`, `@babel/preset-react` |