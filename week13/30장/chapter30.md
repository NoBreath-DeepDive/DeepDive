[Notion으로 보기](https://slime-fall-1f7.notion.site/25-1-223566396b51805199b8eada6f29b41a?source=copy_link)

[30장. Date](#30장-date)  
&nbsp;&nbsp;[30.1 Date 생성자 함수](#301-date-생성자-함수)  
&nbsp;&nbsp;[30.2 Date 메서드](#302-date-메서드)  
&nbsp;&nbsp;[30.3 Date를 활용한 시계 예제](#303-date를-활용한-시계-예제)

# 30장. Date

> [MDN - Date](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Date)

날짜와 시간을 위한 메서드를 제공하는 표준 빌트인 객체이자 생성자 함수

**(참고) UTC와 KST**

- **UTC(협정 세계시, Coordinated Universal Time)**: 국제 표준시
- **KST(한국 표준시, Korea Standard Time)**: UTC에 9시간을 더한 시간
  \*UTC 00:00 AM = KST 09:00 AM

## 30.1 Date 생성자 함수

Date 생성자 함수로 생성한 Date 객체는 내부적으로 날짜와 시간을 나타내는 정수값을 갖는다. 이 값은 1970년 1월 1일 00:00:00(UTC)을 기점으로 Date 객체가 나타내는 날짜와 시간까지의 밀리초입니다.

### 30.1.1 new Date()

생성자 함수를 인수 없이 new 연산자와 함께 호출하면 현재 날짜와 시간을 갖는 Date 객체를 반환한다. Date 객체는 내부적으로 날짜와 시간을 나타내는 정수값을 갖지만 콘솔에 출력하면 기본적으로 날짜와 시간 정보를 출력한다.

```tsx
console.log(new Date()); // Tue Aug 26 2025 21:36:31 GMT+0900 (한국 표준시)
```

Date 생성자 함수를 new 연산자 없이 호출하면 Date 객체를 반환하는 것이 아닌, 날짜와 시간 정보를 나타내는 문자열을 반환한다.

```tsx
console.log(Date()); // Tue Aug 26 2025 21:36:31 GMT+0900 (한국 표준시)
```

### 30.1.2 new Date(milliseconds)

Date 생성자 함수에 숫자 타입의 밀리초를 인수로 전달하면 1970년 1월 1일 00:00:00(UTC)을 기점으로 인수로 전달된 밀리초만큼 경과한 날짜와 시간을 나타내는 Date 객체를 반환하다.

```tsx
console.log(new Date(0)); // Thu Jan 01 1970 09:00:00 GMT+0900 (한국 표준시)
console.log(new Date(1 * 24 * 60 * 60 * 1000)); // Fri Jan 02 1970 09:00:00 GMT+0900 (한국 표준시)

// 음수 샤용 가능
console.log(new Date(-1 * 24 * 60 * 60 * 1000)); // Wed Dec 31 1969 09:00:00 GMT+0900 (한국 표준시)
```

**(참고) new 연산자 없이 호출 + 인수 전달**

인수 값과 상관없이 항상 현재 날짜와 시간 정보를 나타내는 문자열을 반환한다.

```tsx
// Date를 new 없이 호출하면 반환되는 값은 현재 날짜와 시간의 문자열이다.
// 인수를 줘도 무시된다. (인자가 있어도 그냥 현재 시간 문자열만 리턴한다.)
console.log(Date()); // Wed Aug 27 2025 08:50:45 GMT+0900 (한국 표준시)
console.log(Date(86400000)); // Wed Aug 27 2025 08:50:45 GMT+0900 (한국 표준시)ㄹ
```

### 30.1.3 new Date(dateString)

Date 생성자 함수에 날짜와 시간을 나타내는 문자열을 인수로 전달하면 지정된 날짜와 시간을 나타내는 Date 객체를 반환한다.

- 인수로 전달한 문자열은 Date.parse 메서드에 의해 해석 가능한 형식이어야 한다.

```tsx
console.log(new Date("May 26, 2020 10:00:00")); // Tue May 26 2020 10:00:00 GMT+0900 (한국 표준시)
console.log(new Date("2020/03/26/10:00:00")); // Thu Mar 26 2020 10:00:00 GMT+0900 (한국 표준시)
```

### 30.1.4 new Date(year, month[, day, hour, minute, second, millisecond])

Date 생성자 함수에 연, 월, 일, 시, 분, 초, 밀리초를 의미하는 숫자를 인수로 전달하면 지정된 날짜와 시간을 나타내는 Date 객체를 반환한다.

- 연, 월은 반드시 지정해야 한다.

| **인수**    | **내용** | 범위               | 비고                                        |
| ----------- | -------- | ------------------ | ------------------------------------------- |
| year        | 연       | 1900년 이후의 정수 | (필수) 0부터 99는 1900부터 1999로 처리된다. |
| month       | 월       | 0~11까지의 정수    | (필수) ⚠️ 0부터 시작한다. (0 = 1월)         |
| day         | 일       | 1~31까지의 정수    | 지정하지 않으면 1로 초기화된다.             |
| hour        | 시       | 0~23까지의 정수    | 지정하지 않으면 0으로 초기화된다.           |
| minute      | 분       | 0~59까지의 정수    | 지정하지 않으면 0으로 초기화된다.           |
| second      | 초       | 0~59까지의 정수    | 지정하지 않으면 0으로 초기화된다.           |
| millisecond | 밀리초   | 0~999까지의 정수   | 지정하지 않으면 0으로 초기화된다.           |

```tsx
// 월을 나타내는 2는 3월을 의미한다. 2020/3/1/00:00:00:00
console.log(new Date(2020, 2)); // Sun Mar 01 2020 00:00:00 GMT+0900 (한국 표준시)
console.log(new Date(2020, 2, 26, 10, 0, 0, 0)); // Thu Mar 26 2020 10:00:00 GMT+0900 (한국 표준시)
```

## 30.2 Date 메서드

### 30.2.1 Date.now

1970년 1월 1일 00:00:00(UTC)을 기점으로 현재 시간까지 경과한 밀리초를 숫자로 반환한다.

```tsx
const now = Date.now();
console.log(now); // 1756211791918
console.log(new Date(now)); // Tue Aug 26 2025 21:36:31 GMT+0900 (한국 표준시)
```

### 30.2.2 Date.parse

1970년 1월 1일 00:00:00(UTC)을 기점으로 인수로 전달된 지정 시간까지의 밀리초를 숫자로 반환한다.

- 인수: 날짜와 시간을 나타내는 문자열

```jsx
// UTC
console.log(Date.parse("Jan 2, 1970 00:00:00 UTC")); // 86400000
console.log(Date.parse("1970/01/02/00:00:00 UTC")); // 86400000

// KST
console.log(Date.parse("Jan 2, 1970 09:00:00")); // 86400000
console.log(Date.parse("1970/01/02/09:00:00")); // 86400000

// Date 객체를 넣으면 문자열로 암묵적 형변환이 일어난다.
console.log(Date.parse(new Date(86400000))); // 86400000
```

### 30.2.3 Date.UTC

1970년 1월 1일 00:00:00(UTC)을 기점으로 인수로 전달된 지정 시간까지의 밀리초를 숫자로 반환한다.

- 인수: year, month[, day, hour, minute, second, millisecond]
  - 인수는 UTC로 인식된다.
- month는 0~11까지의 정수다. ⚠️ 0부터 시작 주의

```jsx
console.log(Date.UTC(1970, 0, 2)); // 86400000
console.log(Date.UTC("1970/1/2")); // NaN
```

### 30.2.4 Date.prototype.getFullYear

Date 객체의 연도를 나타내는 정수를 반환한다.

### 30.2.5 Date.prototype.setFullYear

Date 객체에 연도를 나타내는 정수를 설정한다.

- 옵션으로 월, 일도 설정할 수 있다.

```jsx
const today = new Date();
console.log(today); // Tue Aug 26 2025 22:09:03 GMT+0900 (한국 표준시)

// 년도 지정
today.setFullYear(2000);
console.log(today); // Sat Aug 26 2000 22:09:03 GMT+0900 (한국 표준시)
console.log(today.getFullYear()); // 2000

// 년도/월/일 지정
today.setFullYear(1900, 5, 1);
console.log(today); // Fri Jun 01 1900 22:09:03 GMT+0900 (한국 표준시)
console.log(today.getFullYear()); // 1900
```

### 30.2.6 Date.prototype.getMonth

Date 객체의 월을 나타내는 0 ~ 11의 정수를 반환한다.

### 30.2.7 Date.prototype.setMonth

Date 객체에 월을 나타내는 0 ~ 11의 정수를 설정한다.

- 옵션으로 일도 설정할 수 있다.

```jsx
const today = new Date();
console.log(today); // Tue Aug 26 2025 22:18:17 GMT+0900 (한국 표준시)

// 월 지정
today.setMonth(0);
console.log(today); // Sun Jan 26 2025 22:18:17 GMT+0900 (한국 표준시)
console.log(today.getMonth()); // 0

// 월/일 지정
today.setMonth(11, 1);
console.log(today); // Mon Dec 01 2025 22:18:17 GMT+0900 (한국 표준시)
console.log(today.getMonth()); // 11
```

### 30.2.8 Date.prototype.getDate

Date 객체의 날짜를 나타내는 1 ~ 31의 정수를 반환한다.

### 30.2.9 Date.prototype.setDate

Date 객체에 날짜를 나타내는 1 ~ 31의 정수를 설정한다.

```jsx
const today = new Date();
console.log(today); // Tue Aug 26 2025 22:18:57 GMT+0900 (한국 표준시)

// 날짜 지정
today.setDate(1);
console.log(today); // Fri Aug 01 2025 22:18:57 GMT+0900 (한국 표준시)
console.log(today.getDate()); // 1
```

### 30.2.10 Date.prototype.getDay

Date 객체의 요일을 나타내는 0 ~ 6의 정수를 반환한다.

⚠️ Date.prototype.setDay는 존재하지 않는다. 요일을 변경하고 싶다면 날짜를 변경해야 한다.

```tsx
console.log(new Date("2020/07/24").getDay()); // 5
```

### 30.2.11 Date.prototype.getHours

Date 객체의 시간을 나타내는 0 ~ 23의 정수를 반환한다.

### 30.2.12 Date.prototype.setHours

Date 객체에 시간을 나타내는 0 ~ 23의 정수를 설정한다.

- 옵션으로 분, 초, 밀리초도 설정할 수 있다.

```jsx
const today = new Date();
console.log(today); // Tue Aug 26 2025 22:23:18 GMT+0900 (한국 표준시)

// 시간 지정
today.setHours(7);
console.log(today); // Tue Aug 26 2025 07:23:18 GMT+0900 (한국 표준시)
console.log(today.getHours()); // 7

// 시간/분/초/밀리초 지정
today.setHours(0, 0, 0, 0);
console.log(today); // Tue Aug 26 2025 00:00:00 GMT+0900 (한국 표준시)
console.log(today.getHours()); // 0
```

### 30.2.13 Date.prototype.getMinutes

Date 객체의 분을 나타내는 0 ~ 59의 정수를 반환한다.

### 30.2.14 Date.prototype.setMinutes

Date 객체에 분을 나타내는 0 ~ 59의 정수를 설정한다.

- 옵션으로 초, 밀리초도 설정할 수 있다.

```jsx
const today = new Date();
console.log(today); // Tue Aug 26 2025 22:26:33 GMT+0900 (한국 표준시)

// 분 지정
today.setMinutes(50);
console.log(today); // Tue Aug 26 2025 22:50:33 GMT+0900 (한국 표준시)
console.log(today.getMinutes()); // 50

// 분/초/밀리초 지정
today.setMinutes(5, 10, 999);
console.log(today); // Tue Aug 26 2025 22:05:10 GMT+0900 (한국 표준시)
console.log(today.getMinutes()); // 5
```

### 30.2.15 Date.prototype.getSeconds

Date 객체의 초를 나타내는 0 ~ 59의 정수를 반환한다.

### 30.2.16 Date.prototype.setSeconds

Date 객체에 초를 나타내는 0 ~ 59의 정수를 설정한다.

- 옵션으로 밀리초도 설정할 수 있다.

```jsx
const today = new Date();
console.log(today); // Tue Aug 26 2025 22:29:17 GMT+0900 (한국 표준시)

// 초 지정
today.setSeconds(30);
console.log(today); // Tue Aug 26 2025 22:29:30 GMT+0900 (한국 표준시)
console.log(today.getSeconds()); // 30

// 초/밀리초 지정
today.setSeconds(10, 0);
console.log(today); // Tue Aug 26 2025 22:29:10 GMT+0900 (한국 표준시)
console.log(today.getSeconds()); // 10
```

### 30.2.17 Date.prototype.getMilliseconds

Date 객체의 밀리초를 나타내는 0 ~ 999의 정수를 반환한다.

### 30.2.18 Date.prototype.setMilliseconds

Date 객체에 밀리초를 나타내는 0 ~ 999의 정수를 설정한다.

```jsx
const today = new Date();
console.log(today.getMilliseconds()); // 947

// 밀리초 지정
today.setMilliseconds(123);
console.log(today.getMilliseconds()); // 123
```

### 30.2.19 Date.prototype.getTime

1970년 1월 1일 00:00:00(UTC)를 기점으로 Date 객체의 시간까지 경과된 밀리초를 반환한다.

### 30.2.20 Date.prototype.setTime

Date 객체에 1970년 1월 1일 00:00:00(UTC)를 기점으로 경과된 밀리초를 설정한다.

```jsx
const today = new Date("2020/07/24/12:30");
console.log(today); // Fri Jul 24 2020 12:30:00 GMT+0900 (한국 표준시)
console.log(today.getTime()); // 1595561400000

// 86400000ms = 1day
today.setTime(today.getTime() + 86400000);
console.log(today.getTime()); // 1595647800000
console.log(today); // Sat Jul 25 2020 12:30:00 GMT+0900 (한국 표준시)
```

### 30.2.21 Date.prototype.getTimezoneOffset

UTC와 Date 객체에 지정된 로캘(locale) 시간과의 차이를 분 단위로 반환한다.

- UTC - KST = -9h

```jsx
const today = new Date();

console.log(today.getTimezoneOffset()); // -540
console.log(today.getTimezoneOffset() / 60); // -9
```

> 현재 로케일 (즉, 호스트 시스템 설정)에 대한 시간대 오프셋 (UTC)을 분 단위로 반환합니다.

### 30.2.22 Date.prototype.toDateString

사람이 읽을 수 있는 형식의 문자열로 Date 객체의 날짜를 반환한다.

### 30.2.23 Date.prototype.toTimeString

사람이 읽을 수 있는 형식의 문자열로 Date 객체의 시간을 반환한다.

```jsx
const today = new Date("2020/7/24/12:30");

console.log(today.toString()); // Fri Jul 24 2020 12:30:00 GMT+0900 (한국 표준시)

console.log(today.toDateString()); // Fri Jul 24 2020
console.log(today.toTimeString()); // 12:30:00 GMT+0900 (한국 표준시)
```

### 30.2.24 Date.prototype.toISOString

ISO 8601 형식으로 Date 객체의 날짜와 시간을 표현한 문자열을 반환한다.

```jsx
const today = new Date("2020/7/24/12:30");

console.log(today.toString()); // Fri Jul 24 2020 12:30:00 GMT+0900 (한국 표준시)
console.log(today.toISOString()); // 2020-07-24T03:30:00.000Z
```

**(참고) ISO 8601**

> [ISO 8601](https://ko.wikipedia.org/wiki/ISO_8601)

날짜와 시간과 관련된 데이터 교환을 다루는 국제 표준이다. 이 표준은 국제 표준화 기구(ISO)에 의해 공표되었으며 1988년에 처음으로 공개되었다.

**(참고) 표준 시간대 지정자(time zone designator)**

- `<time>Z` : UTC 기준 시간
- `<time>±hh:mm` : 특정 시간대

### 30.2.25 Date.prototype.toLocaleString

인수로 전달한 로캘을 기준으로 Date 객체의 날짜와 시간을 표현한 문자열을 반환한다.

- 인수를 생략한 경우, 브라우저가 동작 중인 시스템의 로캘을 적용한다.

### 30.2.26 Date.prototype.toLocaleTimeString

인수로 전달한 로캘을 기준으로 Date 객체의 시간을 표현한 문자열을 반환한다.

- 인수를 생략한 경우, 브라우저가 동작 중인 시스템의 로캘을 적용한다.

```jsx
const today = new Date("2020/7/24/15:30");

console.log(today.toString()); // Fri Jul 24 2020 15:30:00 GMT+0900 (한국 표준시)
console.log(today.toLocaleString()); // 2020. 7. 24. 오후 3:30:00

console.log(today.toLocaleString("ko-KR")); // 2020. 7. 24. 오후 3:30:00
console.log(today.toLocaleString("en-US")); // 7/24/2020, 3:30:00 PM
console.log(today.toLocaleString("ja-JP")); // 2020/7/24 15:30:00

console.log(today.toLocaleDateString()); // 2020. 7. 24.
console.log(today.toLocaleTimeString()); // 오후 3:30:00

console.log(today.toLocaleTimeString("ko-KR")); // 오후 3:30:00
console.log(today.toLocaleTimeString("en-US")); // 3:30:00 PM
console.log(today.toLocaleTimeString("ja-JP")); // 15:30:00
```

## 30.3 Date를 활용한 시계 예제

현재 날짜와 시간을 3초 단위로 반복 출력한다.

```jsx
(function printNow() {
  const today = new Date();

  // getDay 메서드는 해당 요일(0~6)을 나타내는 정수를 반환한다.
  const dayNames = ["(일요일)", "(월요일)", "(화요일)", "(수요일)", "(목요일)", "(금요일)", "(토요일)"];
  const day = dayNames[today.getDay()];

  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const date = today.getDate();
  let hour = today.getHours();
  let minute = today.getMinutes();
  let second = today.getSeconds();
  const ampm = hour >= 12 ? "PM" : "AM";

  // 12시간제로 변경
  hour %= 12;
  hour = hour || 12; // hour가 0이면 12를 재할당

  // 10 미만인 분과 초를 2자리로 변경
  minute = minute < 10 ? "0" + minute : minute;
  second = second < 10 ? "0" + second : second;

  const now = `${year}년 ${month}월 ${date}일 ${day} ${hour}:${minute}:${second} ${ampm}`;

  console.log(now);

  // 3초마다 printNow 함수를 재귀 호출한다.
  setTimeout(printNow, 3000);
})();
```

결과:

```tsx
2025년 8월 27일 (수요일) 12:20:08 AM
2025년 8월 27일 (수요일) 12:20:11 AM
2025년 8월 27일 (수요일) 12:20:14 AM
2025년 8월 27일 (수요일) 12:20:17 AM
2025년 8월 27일 (수요일) 12:20:20 AM
...
```

**(참고) Day.js 라이브러리 활용하기**

> [Day.js](https://day.js.org/docs/en/installation/browser)

```bash
<script src="https://cdn.jsdelivr.net/npm/dayjs@1/dayjs.min.js"></script>
```

```jsx
const today = dayjs();
const finishDate = dayjs("2025-08-08");

console.log("today:", today); // M {$L: 'en', $d: Wed Aug 27 2025 00:39:31 GMT+0900 (한국 표준시), $y: 2025, $M: 7, $D: 27, …}
console.log("finishDate:", finishDate); // M {$L: 'en', $d: Fri Aug 08 2025 00:00:00 GMT+0900 (한국 표준시), $y: 2025, $M: 7, $D: 8, …}

const diffDays = today.diff(finishDate, "day"); // today - finishDate (day 기준)
console.log(diffDays); // 19

console.log("today(format):", today.format("YYYY-MM-DD")); // today(format): 2025-08-27
console.log("finishDate(format):", finishDate.format("YYYY-MM-DD")); // finishDate(format): 2025-08-08
```

∎
