# ❓ JavaScript 레이블문(Label Statement) Q&A 정리

---

## Q1. 레이블문 `outer` 문이란?

**A.**
레이블문은 자바스크립트에서 `label:` 형식으로 사용하는 **이름이 붙은 문장**
보통 **중첩 루프나 switch 문을 제어**할 때 `break`나 `continue`와 함께 사용

```js
outer: for (let i = 0; i < 3; i++) {
  for (let j = 0; j < 3; j++) {
    if (i === j) break outer; // 바깥 루프(outer)를 강제로 빠져나감
    console.log(i, j);
  }
}
```

## Q2. 레이블문 여러 개 사용할 수 있어?

**A.**
문법적으로는 여러 개의 레이블을 연속해서 붙이는 것이 가능:

```js
label1: label2: for (let i = 0; i < 3; i++) {
  console.log(i);
}
```
