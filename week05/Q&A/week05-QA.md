# 📌 자바스크립트의 불변 객체 (Immutable Object) Q&A

---

## ❓ Q1. 불변 객체(Immutable Object)란?

**A.**  
한 번 생성되면 내부 상태(프로퍼티 값 포함)를 변경할 수 없는 객체를 말한다.  
즉, 객체를 수정하려 할 때 에러가 발생하거나 무시된다.

```js
const person = { name: "유빈", age: 20 };
Object.freeze(person);

person.age = 25; // ❌ 변경되지 않음
console.log(person.age); // 20
```
