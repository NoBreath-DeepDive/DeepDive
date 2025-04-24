# 8장. 제어문

제어문은 조건에 따라 코드 블록을 실행(조건문)하거나 반복 실행(반복문)할 때 사용한다. 일반적으로 코드는 위에서 아래로 실행하지만, 제어문은 코드의 실행 흐름을 인위적으로 제어할 수 있다. 따라서 제어문은 가독성을 해치는 단점이 있다. 나중에 살펴볼 고차 함수를 사용한 함수형 프로그래밍 기법에서는 제어문 사용을 억제하여 복잡성을 해결할 수 있다.

# 8.1 블록문

: 0개 이상의 문을 중괄호로 묶은 것 (= 코드블록 or 블록)

- 문 : 프로그램을 구성하는 기본 단위이자 최소 실행단위
- js에서는 블록문을 하나의 실행 단위로 취급한다.
- 단독으로 사용하거나 제어문이나 함수를 정의할 때 사용한다.
- 문의 끝에는 세미콜론을 붙이는 것이 일반적이지만, 블록문은 언제나 문의 종료를 의미하는 자체 종결성을 갖기 때문에 블록문의 끝에는 세미콜론을 붙이지 않는다.

```jsx
// 블록문
{
  var foo = 10;
} //블록문 끝에는 세미 콜론 사용 x

// 제어문
var x = 1;
if (x < 10) {
  x++;
}

// 함수 선언문
function sum(a, b) {
  return a + b;
}
```

# 8.2 조건문

: 주어진 조건식의 평가 결과에 따라 코드 블록(블록문)의 실행을 결정한다.

- 불리언 값으로 평가되는 표현식

## 8.2.1 if…else문

: 주어진 조건식(불리언 값으로 평가될 수 있는 표현식)의 평가 결과

- 논리적 참 or 거짓에 따라 실행할 코드 블록을 결정한다.
- 조건식은 불리언 값으로 평가되어야 한다.
- 암묵적 타입 변환 : 조건식이 불리언 값이 아니면 js 엔진에 의해 암묵적으로 불리언 값으로 강제 변환되어 실행됨

```jsx
if (조건식) {
  // 조건식이 참이면 이 코드블록이 실행
} else {
  // 조건식이 거짓이면 이 코드블록이 실행
}
```

```jsx
// 조건식 추가하여 코드 블록을 늘리는 방법
if ( 조건식 ) {
// 조건식이 참이면 코드블록 실행
} else if {
// 조건식2가 참이면 이 코드블록이 실행, 생략 가능
} else {
// 조건식1과 조건식2가 모두 거짓이면 이 코드 블록이 실행, 생략 가능
}
```

### 예제

```jsx
var num = 2;
var kind;

//if문
if (num > 0) {
  kind = "양수"; //음수 구별 못함
}
console.log(kind); //양수

//if...else문
if (num > 0) {
  kind = "양수";
} else {
  kind = "음수";
}
console.log(kind); //양수

//if...else if문
if (num > 0) {
  kind = "양수";
} else if (num < 0) {
  kind = "음수";
} else {
  kind = "영";
}
console.log(kind); //양수
```

```jsx
//중괄호 생략 코드
var num = 2;
var kind;

//if문
if (num > 0) kind = "양수";
else if (num > 0) kind = "음수";
else kind = "영";
console.log(kind);
```

```jsx
// x가 짝수이면 result문에 문자열 '짝수'를 할당하고, 홀수이면 문자열 '홀수'를 할당한다.
var x = 2;
var result;

if (x % 2) {
  result = "홀수";
} else {
  result = "짝수";
} //0은 false로 암묵적 강제 변환함

console.log(result); //짝수
```

```jsx
//삼항 연산자로 바꾼 코드
var result = x % 2 == 0 ? "홀수" : "짝수";
console.log(result); //짝수
```

```jsx
var num = 2;
//0은 false로 취급
var kind = num ? (num > 0 ? "양수" : "음수") : "영";
console.log(kind); //양수
```

- 삼항 조건 연산자는 표현식이라서 변수에 할당 가능하지만, if…else문에는 할당할 수 없다
  - 할당할 수 없는 이유 : if…else문은 표현식이 아닌 문이므로 값처럼 사용할 수 없기 때문에 변수에 할당할 수 없다.
- 가독성 : 조건에 따라 실행해야 할 내용이 복잡하여 여러 줄의 문이 필요하면 if…else 사용

## 8.2.2 switch문

: 주어진 표현식을 평가하여 그 값과 일치하는 표현식을 갖는 case문으로 실행 흐름을 옮긴다.

- switch문의 표현식과 일치하는 case문이 없다면 실행 순서는 default문으로 이동한다.
- switch문은 불리언 값보다는 다양한 상황(case)에 따라 실행할 코드 블록을 결정할 때 사용한다.

```jsx
switch (표현식) {
  case 표현식1:
    switch 문의 표현식과 표현식1이 일치하면 실행될 문;
    break;
  case 표현식1:
    switch 문의 표현식과 표현식2가 일치하면 실행될 문;
    break;
  default: // 생략가능
    switch 문의 표현식과 일치하는 case 문이 없을 때 실행될 문;
}
```

```jsx
// 월을 영어로 반환하기
var month = 11;
var monthName;

switch (month) {
  case 1:
    monthName = "January";
  case 2:
    monthName = "February";
  case 3:
    monthName = "March";
  case 4:
    monthName = "April";
  case 5:
    monthName = "May";
  case 6:
    monthName = "June";
  case 7:
    monthName = "July";
  case 8:
    monthName = "August";
  case 9:
    monthName = "September";
  case 10:
    monthName = "October";
  case 11:
    monthName = "November";
  case 12:
    monthName = "December";
  default:
    monthName = "Invalid month";
}
console.log(monthName); //Invalid month가 출력됨
```

- 폴스루(fall through) : 문을 실행한 후 switch문을 탈출하지 않고 switch문이 끝날 때까지 이후의 모든 case문과 default문을 실행했기 때문에 November가 출력되지 않음

```jsx
// 올바른 코드
var month = 11;
var monthName;

switch (month) {
  case 1:
    monthName = "January";
    break;
  case 2:
    monthName = "February";
    break;
  case 3:
    monthName = "March";
    break;
  case 4:
    monthName = "April";
    break;
  case 5:
    monthName = "May";
    break;
  case 6:
    monthName = "June";
    break;
  case 7:
    monthName = "July";
    break;
  case 8:
    monthName = "August";
    break;
  case 9:
    monthName = "September";
    break;
  case 10:
    monthName = "October";
    break;
  case 11:
    monthName = "November";
    break;
  case 12:
    monthName = "December";
    break;
  default:
    monthName = "Invalid month";
}
console.log(monthName); //November 출력
```

```jsx
var year = 2000;
var month = 2;
var days = 0;

switch (month) {
  case 1:
  case 3:
  case 5:
  case 7:
  case 8:
  case 10:
  case 12:
    days = 31;
    break;
  case 4:
  case 6:
  case 9:
  case 11:
    days = 30;
    break;
  case 2:
    //윤년 계산 알고리즘
    // 1. 연도가 4로 나누어떨어지는 해는 윤년이다
    // 2. 연도가 4로 나누어떨어지더라도 연도가 100으로 나누어떨어지는 해는 평년이다
    // 3. 연도가 400으로 나누어떨어지는 해는 윤년이다.
    days = (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0 ? 29 : 28;
    break;
  default:
    console.log("Invalid month");
}
console.log(days); //29
```

# 8.3 반복문

: 조건식의 평가 결과가 참인 경우 코드 블록을 실행하여 거짓일 때까지 반복한다.

## 8.3.1 for 문

: 조건식이 거짓으로 평가될 때까지 코드 블록을 반복 실행한다. 반복횟수가 명확할 때 주로 사용한다.

```jsx
for ( 변수 선언문 또는 할당문; 조건식; 증감식) {
	조건식이 참인 경우 반복 실행될 문;
}
```

## 예제

```jsx
for (var i = 0; i < 2; i++) {
  console.log(i);
}
// i변수가 0으로 초기화된 상태에서 시작하여 i가 2보다 작을 때까지 코드 블록을 2번 반복 실행한다.
```

```jsx
0;
1;
```

## for문 실행 순서

<img src="./images/ch8_image.png" width="50%">

1. for문을 실행하면 맨 먼저 **변수 선언문 var i = 0** 이 실행된다. 변수 선언문은 단 한 번만 실행된다.
2. 변수 선언문의 실행이 종료되면 **조건식이 실행**된다. 현재 i 변수의 값은 0이므로 조건식의 평과 결과는 true
3. 조건식이 true이므로 **코드 블록**이 실행된다. 증감문이 아니라 코드 블록으로 실행 흐림이 이동한다.
4. 코드 블록의 실행이 종료되면 **증감식 i++**가 실행되어 i 변수의 값은 1이 된다.
5. 증감식이 종료되면 **다시 조건식**이 실행된다. 변수 선언문이 실행되는 것이 아니라 조건식이 실행된다. 현재 i 변수의 값은 1이므로 조건식은 true이다.
6. 조선식이 true이므로 **코드블록**이 다시 실행된다.
7. 코드블록이 종료되면 **증감식 i++**가 실행되어 i 변수는 2가 된다.
8. 증감식 실행이 종료되면 **다시 조건식**이 실행된다. 현재 i 변수의 값은 2이므로 조건식의 평가 결과는 false다. 조건식이 false이므로 **for문이 종료**된다.

```jsx
//위 예제를 역으로 반복하는 for문
for (var i = 1; i >= 0; i--) {
  console.log(i);
} //i 변수가 1로 초기화된 상태에서 시작하여 i가 0보다 같거나 클 때까지 코드 블록을 2번 실행한다.
```

```jsx
1;
0;
```

```jsx
//무한 루프 코드

for (;;) { ... }
// 선언문, 조건식, 증감식 모두 옵션이지만 아무것도 선언하지 않으면 무한루프가 된다.
```

```jsx
//for문 중첩
for (var i = 1; i <= 6; i++) {
  //i는 1부터 6까지 6번 반복
  for (var k = 1; k <= 6; k++) {
    //k도 1부터 6까지 6번 반복, 총 6*6=36번 실행됨
    if (i + k === 6) console.log(`[${i}, ${k}]`); //i+k=6이면 출력하기
  }
}
```

```jsx
[1, 5][(2, 4)][(3, 3)][(4, 2)][(5, 1)];
```

## 8.3.2 while 문

: 주어진 조건식의 평가 결과가 참이면 코드 블록을 계속해서 반복 실행한다. 반복 횟수가 불명확할 때 주로 사용한다.

- 조건문의 평가 결과가 false이면 코드 블록을 종료한다.
- 조건식의 평가 결과가 불리언 값이 아니면 불리언 값으로 강제 변환하여 참, 거짓을 구별한다.

```jsx
var count = 0;

// count가 3보다 작을 때까지 코드 블록을 계속 반복 실행한다.
while (count < 3) {
  console.log(count); //0 1 2
  count++;
}
```

```jsx
0;
1;
2;
```

```jsx
//무한루프
while ( true ) { ... }

// 무한루프에 break문 추가
var count = 0;

while ( true ){
  console.log(count);
  count++;
  // count가 3이면 종료
  if(count === 3) break;
} // 0 1 2 출력됨
```

## 8.3.3 do…while문

: 코드 블록을 먼저 실행하고 조건식을 평가한다. 코드 블록은 무조건 한 번 이상 실행된다.

```jsx
var count = 0;

// count가 3보다 작을 때까지 코드 블록을 계속 반복 실행한다.
do {
  console.log(count); //0 1 2
  count++;
} while ( count < 3 );2";
```

```jsx
0;
1;
2;
```

# 8.4 break문

: 코드 블록을 탈출한다.

- 레이블 문, 반복문, switch문의 코드 블록을 탈출한다.
- 레이블 문 : 식별자가 붙은 문

```jsx
if ( true ) {
	break; // 문법 에러 발생
}
// 레이블 문, 반복문, switch 문의 코드 블록 외에 break문을 사용하면 SyntaxError 발생
```

```jsx
// foo라는 레이블 식별자가 붙은 레이블 문
foo: console.log("foo");
```

레이블 문

- 프로그램의 실행 순서를 제어하는 데 사용한다.
- switch문의 case문과 default문도 레이블 문이다.
- 레이블 문을 탈출하려면 break문에 레이블 식별자를 지정한다.

```jsx
// foo라는 식별자가 붙은 레이블 블록문
foo: {
  console.log(1);
  break foo; // 식별자를 지정하여 foo 레이블 블록문을 탈출한다.
  console.log(2);
}

console.log("Done!");
```

```jsx
1
Done!
```

- 중첩된 for문의 내부 for문에서 break문을 실행하면 내부 for 문을 탈출하여 외부 for 문으로 진입한다. 이때 내부 for 문이 아닌 외부 for 문을 탈출하려면 레이블 문을 사용한다.

```jsx
//outer라는 식별자가 붙은 레이블 for문
outer: for (var i = 0; i < 3; i++) {
  //0부터 3이하까지 증감
  for (var j = 0; j < 3; j++) {
    //0부터 3이하까지 증감
    if (i + j === 3) break outer; //합이 3일때 중단
    console.log(`inner [${i}, ${j}]`); //출력
  }
}
console.log("Done!");
```

```jsx
inner [0, 0]
inner [0, 1]
inner [0, 2]
inner [1, 0]
inner [1, 1]
Done!
```

- 레이블 문은 중첩된 for문 외부로 탈출할 때 유용하지만 다른 경우에는 권장하지 않는다.
- break문은 레이블 문, 반복문, switch문에서도 사용할 수 있다. 이 경우에는 break문에 레이블 식별자를 지정하지 않으며, break문은 반복문을 더 이상 진행하지 않아도 될 때 불필요한 반복을 회피할 수 있어서 유용하다.

```jsx
//문자열에서 특정 문자의 인덱스(위치)를 검색하는 예제
var string = "hello world";
var search = "l";
var index;

//문자열은 유사 배열이므로 for문으로 순회할 수 있다.
for (var i = 0; i < string.length; i++) {
  //0부터 문자열 길이까지 증감
  //문자열의 개별 문자가 'l'이면
  if (string[i] === search) {
    //l
    index = i;
    break; //반복문 탈출
  }
}
console.log(index); //2

//참고로 String.prototype.indexOf 메서드를 사용해도 같은 동작을 한다.
console.log(string.indexOf(search)); //2
```

# 8.5 continue문

: 반복문의 코드 블록 실행을 현 지점에서 중단하고 반복문의 증감식으로 실행 흐름을 이동시킨다. break문처럼 반복문을 탈출하지는 않는다.

```jsx
//문자열에서 특정 문자의 개수를 세는 예제
var string = "hello world";
var search = "l";
var count = 0; // 찾은 횟수를 저장할 변수

// 문자열은 유사 배열이므로 for문으로 순회할 수 있다
for (var i = 0; i < string.length; i++) {
  // 'l'이 아니면 현 지점에서 실행을 중단하고 반복문의 증감식으로 이동하여 카운트 증가한다.
  if (string[i] !== search) continue; //string[i]로 문자 하나하나 확인함. 'l'이 아니면 카운트 건너뜀
  count++; //continue문이 실행되면 이 문은 실행되지 않는다.
}
// 찾은 경우에만 카운트를 증가시킴
console.log(count); //3

//String.prototype.math 메서드로 동작 가능
// 정규표현식(Regex)을 이용한 방법
// search : 정규표현식으로 만들어서 문자열 안에서 전부 검색
//'g' 플래그는 전역 검색 (전체에서 찾기)
const regexp = new RegExp(search, "g");

// match()는 배열로 결과를 반환함 → 배열 길이가 곧 갯수
// .match() : 일치하는 것들을 배열로 반환
// length로 몇 개인지 알 수 있음
console.log(string.match(regexp).length); //3
```

```jsx
//23번 예제와 동일하게 동작하는 코드
for (var i = 0; i < string.length; i++) {
  //'l'이면 카운트 증가
  if (string[i] === search) count++;
}
console.log(count); //3
```

- 위와 같이 if문 내에서 실행해야 할 코드가 한 줄이라면 continue 문을 사용했을 때보다 간편하고 가독성이 좋다. 하지만 if 문 내에서 실행해야 할 코드가 길다면 continue 문을 사용하는 편이 가독성이 더 좋다.
