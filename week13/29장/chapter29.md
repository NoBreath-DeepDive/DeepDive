# 29장 Math

<aside>
🎇

표준 빌트인 객체 Math는 수학적인 상수와 함수를 위한 프로퍼티와 메서드를 제공한다. 

Math는 생성자 함수가 아니다.

따라서 Math는 정적 프로퍼티와 정적 메서드만 제공한다.

Math은 수학적인 계산을 필요로 할 때 사용하는 **도구 상자**라고 생각하면 됨

</aside>

# 29.1 Math 프로퍼티

## 29.1.1 Math.PI

원주율 PI 값을 반환한다.

[ 예제 29-01 ]

```jsx
Math.PI; // -> 3.14~~~~~
```

***Math의 프로퍼티에는 PI 뿐만 아니라 로그 등의 프로퍼티도 존재한다.***

# 29.2 Math 메서드

## 29.2.1 Math.abs

Math.abs 메서드는 인수로 전달된 숫자의 **절대 값**을 반환한다. **절대 값**은 반드시 0 또는 양수이어야 한다.

[ 예제 29-02 ] 

```jsx
Math.abs(-1); // -> 1    |1|
Math.abs('-1'); // -> 1
Math.abs(''); // -> 0
Math.abs([]); // -> 0
Math.abs(null); // -> 0
Math.abs(undefined); // -> NaN
Math.abs({}); // -> NaN
Math.abs('string'); // -> NaN
Math.abs(); // -> NaN
```

<aside>
💡

왜 Math.abs([])은 0으로 치환해주는데 Math.abs({})은 NaN이 나오는 것일까 ?

- 답변
    
    Math.abs()의 동작 원리는 내부적으로 인수를 숫자 타입으로 변환한 뒤에 절대 값을 반화하는 동작원리이다.
    
    **Math.abs([])**을 호출하였을 때 빈 배열을 숫자 타입으로 변환하기 위해서는 빈 배열을 문자열로 변환하면 “” 이 되는데 “” 을 숫자로 변환하면 0이 되기 때문에 0을 출력한다.
    
    Math.abs({})을 호출하였을 때 빈 객체를 문자열로 변환하면 “[object object]”로 변환되는데 object라는 문자열은 숫자로 바꿀 수 없음으로 NaN이 출력되는 것이다.
    
</aside>

<aside>
💡

그렇다면 Math.abs() 만 호출하였을 때는 왜 NaN인 것일까

- 답변
    
    Math.abs()에 인수를 아예 주지 않으면 undefined가 들어간 것과 같다고 한다.
    
</aside>

## 29.2.2 Math.round

Math.round 메서드는 인수로 전달된 숫자의 소수점 이하를 반올림한 정수를 반환한다.

[ 예제 29-03 ]

```jsx
Math.round(1.4); // -> 1
Math.round(1.6); // -> 2
```

## 29.2.3 Math.ceil

Math.ceil 메서드는 인수로 전달된 숫자의 소수점 이하를 올림한 정수를 반환한다.

[ 예제 29-04 ]

```jsx
Math.ceil(1.4); // -> 2
Math.ceil(1.6); // -> 2
Math.ceil(-1.4); // -> -1
Math.ceil(-1.6); // -> -1
Math.ceil(1); // -> 1
Math.ceil(); // -> NaN,  NaN이 나오는 이유는 위에 콜아웃 참고
```

## 29.2.4 Math.floor

Math.floor 메서드는 인수로 전달된 숫자의 소수점 이하를 내림한 정수를 반환한다. Math.ceil 메서드의 반대 개념

[ 예제 29-05 ]

```jsx
Math.floor(1.9); // -> 1
Math.floor(9.1); // -> 9
Math.floor(-1.9); // -> -2
Math.floor(-9.1); // -> -10
```

## 29.2.5 Math.sqrt

Math.sqrt 메서드는 인수로 전달된 숫자의 제곱근을 반환한다.

```jsx
Math.sqrt(9); // -> 3
Math.sqrt(-9); // -> NaN , 음수의 제곱근은 존재 할 수 없다.
Math.sqrt(2); // -> 1.414213562373~~~~  , 제곱근을 씌우면 루트 2의 값이다.
```

## 29.2.6 Math.random

Math.random 메서드는 임의의 난수(랜덤 숫자)를 반환한다. Math.random 메서드가 반환한 난수는 0에서 1미만의 실수다. 즉, 0은 포함되지만 1은 포함되지 않는다. 0≤ 난수 < 1

[ 예제 29-07 ]

```jsx
Math.random(); // 0에서 1 미만의 랜덤 실수
/*
1에서 10범위의 랜덤 정수 취득
1) Math.random으로 0에서 1미만의 랜덤 실수를 구한 다음, 10을 곱해 0에서 10미만의 랜덤 실수를 구한다.
2) 0에서 10미만의 랜덤 실수에 1을 더해 1에서 10 범위의 랜덤 실수를 구한다.
3) Math.floor로 1에서 10 범위의 랜덤 실수의 소수점 이하를 떼어 버린 다음 정수를 반환한다.
*/
const random = Math.floor((Math.random() * 10) + 1);
console.log(random); // 랜덤한 수가 나오게 됨
```

## 29.2.7 Math.pow

Math.pow 메서드는 첫 번째 인수를 밑으로, 두 번째 인수를 지수로 거듭제곤한 결과를 반환한다.

[ 예제 29-08 ] 

```jsx
Math.pow(2,8); // -> 256
Math.pow(2,-1); // -> 0.5
Math.pow(2); // -> NaN  , 인수를 주지 않으면 undefined의 값이 들어가기 때문에 NaN 출력
```

하지만, Math.pow 보다는 더 쉽고 간결한

ES7에서 도입된 지수 연산자를 사용하면 가독성이 더 좋고 간단하다.

```jsx
 // ES7에 추가된 지수 연산자
 2 ** 2 ** 2; // -> 16
```

## 29.2.8 Math.max

Math.max 메서드는 전달받은 인수 중에서 가장 큰 수를 반환한다. 인수가 전달되지 않으면 -Infinity를 반환한다.

[ 예제 29-10 ]

```jsx
Math.max(1); // -> 1
Math.max(1,2); // -> 2
Math.max(1,2,3); // -> 3
Math.max(); //-> -infinity
```

## 29.2.9 Math.min

Math.min 메서드는 전달받은 인수 중에서 가장 작은 수를 반환한다. 인수가 전달되지 않으면 Infinity을 반환한다.

[ 예제 29-12 ] 

```jsx
Math.min(1); // -> 1
Math.min(1,2); // -> 1
Math.min(1,2,3); // -> 1
Math.min(); // -> infinity
```

<aside>
💡

여기서 왜 Math.max() 은 -infinity을 반환하고 Math.min()은 infinity을 반환할까 ? 

- 답변
    
    여기서 반환 되는 값들은  인수에  아무 값도 없을 때 후보로 쓰이는 초기 값 이라고 보면 이해가 쉽다.
    
    Math.max은 최대 값을 구하는 메서드이다. 그렇다면 -infinity은 끝이 존재하지 않은 음수의 무한대 영역이다. 최대 값은 이 값보다는 커야 함으로 전달 받은 인수 들을 비교하기 위해 존재하는 초기 값이라고 생각하면 쉽다.
    
</aside>