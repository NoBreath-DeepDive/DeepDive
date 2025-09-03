# 31장 RegExp

# 31.1 정규 표현식

### : 일정한 패턴을 가진 문자열의 집합을 표현하기 위해 사용하는 형식 언어.

- 자바스크립트의 고유 문법이 아니며, 대부분의 프로그래밍 언어와 코드 에디터에 내장되어 있다.
- 문자열을 대상으로 패턴 매칭 기능을 제공한다.

<aside>

패턴 매칭 기능 : 특정 패턴과 일치하는 문자열을 검색하거나 추출 또는 치환할 수 있는 기능

</aside>

```jsx
// 사용자로부터 입력받은 전화번호
const tel = '010-1234-567팔';

// 정규 표현식 리터럴로 전화번호 패턴을 정의한다
const regExp = /^\d{3}-\d{4}-\d{4}$/;

// tel이 전화번호 패턴에 매칭되는지 테스트
regExp.test(tel);  //false
```

### 전화 번호 형식 검사

<aside>

`/^\d{3}-\d{4}-\d{4}$/`
`^` : 문자열 시작

`\d{3}`: 숫자 **정확히 3개**

`-` : 하이픈

`\d{4}`: 숫자 정확히 4개

`-` : 하이픈

`\d{4}`: 숫자 정확히 4개
`$` : 문자열의 끝

</aside>

<aside>

결과가 false인 이유 : **세 번째 그룹 불일치**

- 패턴: `\d{4}` (4개 숫자 필요)
- 실제: `567팔` (3개 숫자 + 1개 한글)
- `팔`은 `\d`(숫자)가 아니므로 매칭 실패
</aside>

# 31.2 정규 표현식의 생성

정규 표현식 객체(RegExp 객체)를 생성하기 위해서는 정규 표현식 리터럴과 RegExp 생성자 함수를 사용할 수 있다. 일반적인 방법은 정규 표현식 리터럴을 사용하는 것이다. 

### 정규 표현식 리터럴

<aside>

`/regexp/i`
`/` : 시작, 종료 기호

`regexp` : 패턴

`i` : 플래그

</aside>

### 정규 표현식 객체 생성하기

```jsx
const target = 'Is this all there is?';

const regexp = /is/i;
// 패턴: is => 문자열 is 찾기
// 플래그: i => 대소문자를 구별하지 않고 검색한다

// test 메서드는 target 문자열에 대해 정규 표현식 regexp의 패턴을 검색하여 매칭 결과를 불리언 값으로 반환함
regexp.test(target); //true
```

<aside>

RegExp 생성자 함수를 사용하여 RegExp 객체를 생성하는 방법

</aside>

```jsx
/**
* pattern: 정규 표현식의 패턴
* flag: 정규 표현식의 플래그(g,i,m,u,y)
*/
new RegExp(pattern[, flags])
```

```jsx
const target = 'Is this all there is?';

const regexp = new RegExp(/is/i); //ES6 -> -> is 문자열을, 대소문자 구분 없이 찾는다
// const regexp = new RegExp(/is/, 'i');  
// const regexp = new RegExp('is', 'i'); 

console.log(regexp.test(target)); //true
```

<aside>

RegExp 생성자 함수를 사용하면 변수를 사용해 동적으로 RegExp 객체를 생성할 수 있다.

</aside>

```jsx
const count = (str, char) => (str.match(new RegExp(char, 'gi')) ?? []).length;
//new RegExp(char, 'gi')
//char: 문자열을 정규표현식으로 바꿔줌
//g: 전체(global) 검색
//i: 대소문자 구분 없이

count('Is this all there is?', 'is'); //3 -> is가 3개 있음
count('Is this all there is?', 'xx'); // 0 -> xx는 없으므로 0
```

# 31.3 RegExp 메서드

## 31.3.1 RegExp.prototype.exec

**exec 메서드는 인수로 전달받은 문자열에 대해 정규 표현식의 패턴을 검색하여 매칭 결과를 배열로 반환한다. 매칭 결과가 없는 경우 null을 반환한다.**

```jsx
const target = 'Is this all there is?';
const regExp = /is/;

regExp.exec(target); 
//[ 'is', index: 5, input: 'Is this all there is?', groups: undefined ]
```

```jsx
[
	'is',                  // 매칭된 문자열
	index: 5,              // "is"가 시작된 위치 (0부터 세면 "t h i s" → 'i'가 5번째)
	input: 'Is this all there is?',  // 원본 문자열
	groups: undefined      // () 그룹 캡처 없음
]
```

## 31.3.2 RegExp.prototype.test

**test 메서드는 인수로 전달받은 문자열에 대해 정규 표현식의 패턴을 검색하여 매칭 결과를 불리언 값으로 반환한다.**

```jsx
const target = 'Is this all there is?';
const regExp = /is/;

regExp.test(target); //true
```

## 31.3.3 String.prototype.match

**String 표준 빌트인 객체가 제공하는 match 메서드는 대상 문자열과 인수로 전달받은 정규 표현식과의 매칭 결과를 배열로 반환한다.**

```jsx
const target = 'Is this all there is?';
const regExp = /is/;

target.match(regExp); // 문자열에서 패턴과 매칭된 모든 결과를 배열로 반환
//[ 'is', index: 5, input: 'Is this all there is?', groups: undefined ]
```

**exec 메서드는 문자열 내의 모든 패턴을 검색하는 g 플래그를 지정해도 첫 번째 매칭 결과만 반환한다. 하지만 String.prototype.match 메서드는 g 플래그가 지정되면 모든 매칭 결과를 배열로 반환한다.** 

```jsx
const target = 'Is this all there is?';
const regExp = /is/g; //소문자 is를 전체에서 찾는다

target.match(regExp); // ["is", "is"] -> 모든 결과를 배열로 반환
```

# 31.4 플래그

패턴과 함께 정규 표현식을 구성하는 플래그는 정규 표현식의 검색 방식을 설정하기 위해 사용한다. 

| 플래그 | 의미 | 설명 |
| --- | --- | --- |
| `i` | Ignore case | **대소문자를 구별하지 않고** 패턴을 검색 |
| `g` | Global | 대상 **문자열 내에서 패턴과 일치하는 모든 문자열**을 전역 검색 |
| `m` | Multi line | 문자열의 행이 바뀌더라도 패턴 검색 계속한다 |

<aside>

- 플래그는 옵션이므로 선택적으로 사용할 수 있고, 순서와 상관없이 하나 이상의 플래그를 동시에 설정할 수도 있다.
- 플래그를 사용하지 않은 경우 대소문자를 구별해서 패턴을 검색한다.
- 문자열에 패턴 검색 대상이 1개 이상 존재해도 첫 번째 대상만 검색하고 종료한다.
</aside>

```jsx
const target = 'Is this all there is?';

// target 문자열에서 is 대소문자를 구별하여 한 번만 검색한다.
target.match(/is/);
//[ 'is', index: 5, input: 'Is this all there is?', groups: undefined ]

// target 문자열에서 is 문자열을 대소문자를 구별하지 않고 한 번만 검색한다.
target.match(/is/i);
// [ 'Is', index: 0, input: 'Is this all there is?', groups: undefined ]

// target 문자열에서 is 대소문자를 구별하여 전역 검색한다.
target.match(/is/g);
// [ 'is', 'is' ]

// target 문자열에서 is 문자열을 대소문자를 구별하지 않고 전역 검색한다.
target.match(/is/ig);
//[ 'Is', 'is', 'is']
```

# 31.5 패턴

**정규 표현식은 패턴과 플래그로 구성된다.** 

- 정규 표현식의 패턴은 문자열의 일정한 규칙을 표현하기 위해 사용
- 정규 표현식의 플래그는 정규 표현식의 검색 방식을 설정하기 위해 사용

<aside>

패턴은 `/`로 열고 닫으며 문자열의 따옴표는 생략한다.

패턴은 특별한 의미를 가지는 메타문자 또는 기호로 표현할 수 있다.

</aside>

- 정규 표현식과 매치 : 어떤 문자열 내에 패턴과 일치하는 문자열이 존재할 때의 표현

## 31.5.1 문자열 검색

- 정규 표현식의 패턴에 문자나 문자열을 지정하면 검색 대상 문자열에서 패턴으로 지정한 문자나 문자열을 검색한다.
- 정규 표현식을 생성하는 것만으로 검색이 수행되는 않으므로 RegExp 메서드를 사용하면 검색이 수행된다.

<aside>

**검색 대상 문자열과 플래그를 생략** → 정규 표현식의 매칭 결과는 **대소문자를 구별**하여 정규 표현식과 매치한 **첫 번째 결과만 반환**한다.

</aside>

```jsx
const target = 'Is this all there is?';

// 'is' 문자열과 매치하는 패턴. 플래그가 생략되었으므로 대소문자를 구별함
const regExp = /is/;

// target과 정규 표현식이 매치하는지 테스트함
regExp.test(target); //true

// target과 정규 표현식의 매칭 결과를 구함
target.match(regExp);
//[ 'is', index: 5, input: 'Is this all there is?', groups: undefined ]
```

<aside>

플래그 `i` 추가 → 대소문자를 구별하지 않고 검색

</aside>

```jsx
const target = 'Is this all there is?';

// 'is' 문자열과 매치하는 패턴. 플래그 i 추가하여 대소문자 구별하지 않음
const regExp = /is/i;

target.match(regExp);
//[ 'is', index: 0, input: 'Is this all there is?', groups: undefined ]
// 0번째 Is가 검색됨
```

<aside>

플래그 `g` 추가 → 검색 대상 문자열 내에서 패턴과 매치하는 모든 문자열을 전역 검색

</aside>

```jsx
const target = 'Is this all there is?';

// 'is' 문자열과 매치하는 패턴
// 플래그 g를 추가하면 대상 문자열 내에서 패턴과 일치하는 모든 문자열을 전역 검색한다.
const regExp = /is/ig;

target.match(regExp);
//['Is', 'is', 'is]
```

## 31.5.2 임의의 문자열 검색

<aside>

`.` : 임의의 문자 한 개를 의미

- 문자의 내용은 무엇이는 상관없다
- `…` → 문자 내용 상관 없이 3자리 문자열과 매치한다
</aside>

```jsx
const target = 'Is this all there is?';

// 임의의 3자리 문자열을 대소문자를 구별하여 전역 검색함
const regExp = /.../g;

console.log(target.match(regExp));
//[
  'Is ', 'thi',
  's a', 'll ',
  'the', 're ',
  'is?'
]
```

## 31.5.3 반복 검색

<aside>

`{m,n}` : 앞선 패턴이 최소 m번, 최대 n번 반복되는 문자열을 의미

- 콤마 뒤에 공백이 있으면 정상 동작 X
</aside>

```jsx
const target = 'A AA B BB Aa Bb AAA';

// 'A'가 최소 1번, 최개 2번 반복되는 문자열을 전역 검색한다. 
// 연속된 A를 1~2개씩 잘라서 찾는다.
const regExp = /A{1,2}/g;

target.match(regExp); //[ 'A', 'AA', 'A', 'AA', 'A' ]
```

<aside>

`{n}` : 앞선 패턴이 n번 반복되는 문자열. 즉, `{n}`은 `{n,n}`과 같다.

</aside>

```jsx
const target = 'A AA B BB Aa Bb AAA';

// 'A'가 2번 반복되는 문자열을 전역 검색한다. 
const regExp = /A{2}/g;

console.log(target.match(regExp)); //[ 'AA', 'AA' ]
```

<aside>

`{n,}` : 앞선 패턴이 최소 n번 이상 반복되는 문자열

</aside>

```jsx
const target = 'A AA B BB Aa Bb AAA';

// 'A'가 최소 2번 이상 반복되는 문자열을 전역 검색한다. 
const regExp = /A{2,}/g;

console.log(target.match(regExp)); //[ 'AA', 'AAA' ]
```

<aside>

`+` : `{1,}`과 같다. (= 최소 n번 이상)

</aside>

```jsx
const target = 'A AA B BB Aa Bb AAA';

// 'A'가 최소 한 번 이상 반복되는 문자열을 전역 검색한다. 
const regExp = /A+/g;

console.log(target.match(regExp)); //[ 'A', 'AA', 'A', 'AAA' ]
```

<aside>

`?` : 앞선 패턴이 최대 한 번(0번 포함) 이상 반복되는 문자열. 즉, `{0,1}`과 같다.

</aside>

```jsx
const target = 'color colour';

// 'u'가 0번 또는 1번 반복되고 'r'이 이어지는 문자열 'color', 'colour'를 전역 검색한다.
// 즉 u가 없어도 된다!
const regExp = /colou?r/g;

console.log(target.match(regExp)); //[ 'color', 'colour' ]
```

## 31.5.4 OR 검색

<aside>

`|` : or의 의미. 

</aside>

```jsx
const target = 'A AA B BB Aa Bb';

//‘A’ 또는 ‘B’ 를 전역 검색한다.
const regExp = /A|B/g;

console.log(target.match(regExp)); 
//[
  'A', 'A', 'A',
  'B', 'B', 'B',
  'A', 'B'
]
```

<aside>

분해되지 않는 단어 레벨로 검색하는 방법 : `+` 사용

</aside>

```jsx
const target = 'A AA B BB Aa Bb';

//‘A’ 또는 ‘B’가 한 번 이상 반복되는 문자열을 전역 검색한다.
const regExp = /A+|B+/g;

console.log(target.match(regExp)); //[ 'A', 'AA', 'B', 'BB', 'A', 'B' ]
```

<aside>

간단하게 표현하는 방법 : `[]` 사용하기

`[]` 내의 문자는 or로 동작한다. 그 뒤에 `+`를 사용하면 앞선 패턴을 한 번 이상 반복한다. 

</aside>

```jsx
const target = 'A AA B BB Aa Bb';

//‘A’ 또는 ‘B’가 한 번 이상 반복되는 문자열을 전역 검색한다.
const regExp = /[AB]+/g;

console.log(target.match(regExp)); //[ 'A', 'AA', 'B', 'BB', 'A', 'B' ]
```

<aside>

범위 지정하는 방법 : `[]` 내에 `-` 추가

</aside>

```jsx
const target = 'A AA BB ZZ Aa Bb';

//‘A’~‘Z’가 한 번 이상 반복되는 문자열을 전역 검색한다.
const regExp = /[A-Z]+/g;

console.log(target.match(regExp)); //[ 'A', 'AA', 'BB', 'ZZ', 'A', 'B' ]
```

<aside>

대소문자를 구별하지 않고 알파벳을 검색하는 방법

</aside>

```jsx
const target = 'A AA BB ZZ Aa Bb';

//‘A’~‘Z’또는 'a'~'z'가 한 번 이상 반복되는 문자열을 전역 검색한다.
const regExp = /[A-Za-z]+/g;

console.log(target.match(regExp)); //[ 'A', 'AA', 'BB', 'ZZ', 'Aa', 'Bb' ]
```

<aside>

숫자를 검색하는 방법

</aside>

```jsx
const target = 'A AA 12,345';

//‘0’~‘9’가 한 번 이상 반복되는 문자열을 전역 검색한다.
const regExp = /[0-9]+/g;

console.log(target.match(regExp)); //['12','345' ]
```

<aside>

위 예제는 쉼표 문에 매칭 결과가 분리되므로 쉼표를 패턴에 포함시키기

</aside>

```jsx
const target = 'A AA 12,345';

//‘0’~‘9’또는 ','가 한 번 이상 반복되는 문자열을 전역 검색한다.
const regExp = /[0-9,]+/g;

console.log(target.match(regExp)); //['12,345' ]
```

<aside>

`\d` : 숫자를 의미. 즉, [0-9]와 같다.

`\D` : 문자를 의미.

</aside>

```jsx
const target = 'AA BB 12,345';

//‘0’~‘9’또는 ','가 한 번 이상 반복되는 문자열을 전역 검색한다.
let regExp = /[\d,]+/g;

console.log(target.match(regExp)); //['12,345' ]

// '0'~'9'가 아닌 문자 또는 ','가 한 번 이상 반복되는 문자열을 전역 검색한다.
regExp = /[\D,]+/g;

console.log(target.match(regExp)); //[ 'AA BB ', ',' ]
```

<aside>

`\w` : 알파벳, 숫자, 언더스코어를 의미. 즉, [A-Za-z0-9_]와 같다

`\W` : \w와 반대로 문자를 의미한다.

</aside>

```jsx
const target = 'AA BB 12,345 _$%&';

//알파벳, 숫자, 언더스코어, ','가 한 번 이상 반복되는 문자열을 전역 검색한다.
let regExp = /[\w,]+/g;

console.log(target.match(regExp)); //[ 'AA', 'BB', '12,345', '_' ]

regExp = /[\W,]+/g;

console.log(target.match(regExp)); //[ ' ', ' ', ',', ' ', '$%&' ]
```

<aside>
❓

결과에 공백이 나오는 이유 → **공백도 \W에 포함하기 때문이다.**

- 정규식에서 `\W`는 **알파벳, 숫자, _를 제외한 모든 문자**
- 따라서 `' '` (스페이스)도 매칭 대상이므로
- `[' ', ' ', ',', ' ', '$%&']` 처럼 **공백이 결과 배열에 포함된다.**
</aside>

## 31.5.5 NOT 검색

<aside>

`[…]` 내의 `^` : not의 의미

</aside>

```jsx
const target = 'AA BB 12 Aa Bb';

//숫자를 제외한 문자열을 전역 검색한다.
const regExp = /[^0-9]+/g;

console.log(target.match(regExp)); //[ 'AA BB ', ' Aa Bb' ]
```

## 31.5.6 시작 위치로 검색

<aside>

`[…]` 밖의 `^` : 문자열의 시작을 의미

</aside>

```jsx
const target = 'https://poiemaweb.com';

//https로 시작하는지 검사
let regExp = /^https/;

console.log(regExp.test(target)); //true
```

## 31.5.7 마지막 위치로 검색

```jsx
const target = 'https://poiemaweb.com';

//com로 끝나는지 검사
let regExp = /com$/;

console.log(regExp.test(target)); //true
```

# 31.6 자주 사용하는 정규표현식

## 31.6.1 특정 단어로 시작하는지 검사

```jsx
const url = 'https://example.com';

// 'http://' or 'https://' 로 시작하는지 검사
/^https?:\/\//.test(url); //true
```

```jsx
/^(http|https):\/\//.test(url); //true
// 동일하게 동작함
```

## 31.6.2 특정 단어로 끝나는지 검사

```jsx
const fileName = 'index.html';

// 'html'로 끝나는지 검사
/html$/.test(fileName); // true
```

## 31.6.3 숫자로만 이루어진 문자열인지 검사

```jsx
const target = '12345';

// 숫자로만 이루어진 문자열인지 검사
/^\d+$/.test(target); // true
```

## 31.6.4 하나 이상의 공백으로 시작하는지 검사

```jsx
const target = ' Hi!';

// 하나 이상의 공백으로 시작하는지 검사
/^[\s]+.test(target); //true
```

## 31.6.5 아이디로 사용 가능한지 검사

```jsx
const id = 'abc123';

// 알파벳 대소문자 또는 숫자로 시작하고 끝나며 4~10자리인지 검사
/^[A-Za-z0-9]{4,10}$/.test(id); // true
// 4~10자리로 이루어진 알파벳 대소문자나 숫자를 의미
```

## 31.6.6 메일 주소 형식에 맞는지 검사

```jsx
const email = 'ungmo2@gmail.com';

/^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?][0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/.test(email); //true
```

인터넷 메시지 형식 규약 : RFC 5322에 맞는 정교한 패턴 매칭이 필요하면 아래 패턴을 사용할 필요가 있다.

```jsx
(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}|(?:\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-zA-Z0-9-]*[a-zA-Z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])
```

## 31.6.7 핸드폰 번호 형식에 맞는지 검사

```jsx
const cellphone = ‘010-1234-5678’;
/^\d{3}-\d{3,4}-\d{4}$/.test(cellphone); // true
```

## 31.6.8 특수 문자 포함 여부 검사

<aside>

특수문자 : A-Za-z0-9 이외의 문자

</aside>

```jsx
const target = 'abc#123'; //영문자, 숫자 아닌 것 찾기
(/[^A-Za-z0-9]/gi).test(target); //true
```

<aside>

특수문자 제거 : String.prototype.replace 메서드 사용

</aside>

```jsx
// 특수 문자를 제거함
target.replace(/[^A-Za-z0-9]/gi, ''); // abc123
```