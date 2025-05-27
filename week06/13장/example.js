/* 예제 13-02 */
var var1 = 1;

if (true) {
  var var2 = 2;

  if (true) {
    var var3 = 3;
  }
}

function foo() {
  var var4 = 4;

  function bar() {
    var var5 = 5;
  }
}

console.log(var1); // 1
console.log(var2); // 2
console.log(var3); // 3
// console.log(var4); // ReferenceError: var4 is not defined
// console.log(var5); // ReferenceError: var5 is not defined

/* 예제 13-03 */
var x = "global";

function foo() {
  var x = "local";
  console.log(x); // local
}

foo(x);
console.log(x); // global

/* 예제 13-04 */
function foo() {
  var x = 1;
  var x = 2;
  console.log(x); // 2
}
foo();

/* 예제 13-05 */
function bar() {
  let x = 1;
  // let x = 2; // SyntaxError: Identifier 'x' has already been declared
}
bar();

/* 그림 13-2 */
var x = "global x";
var y = "global y";

function outer() {
  var z = "outer's local z";

  console.log(x); // global x
  console.log(y); // global y
  console.log(z); // outer's local z

  function inner() {
    var x = "inner's local x";

    console.log(x); // inner's local x
    console.log(y); // global y
    console.log(z); // outer's local z
  }

  inner();
}

outer();

console.log(x); // global x
console.log(y); // global y
console.log(z); // ReferenceError: z is not defined

/* 예제 13-06 */
function foo() {
  console.log("global function foo");
}

function bar() {
  function foo() {
    console.log("local function foo");
  }

  foo();
}

bar();

/* 예제 13-07 */
var x = 1;

if (true) {
  var x = 10;
}

console.log(x); // 10

/* 예제 13-07-02 */
let x = 1;

if (true) {
  let x = 10;
}

console.log(x); // 1

/* 예제 13-08 */
var i = 10;

for (var i = 0; i < 5; i++) {
  console.log(i); // 0 1 2 3 4
}

console.log(i); // 5

/* 예제 13-08-02 */
let i = 10;

for (let i = 0; i < 5; i++) {
  console.log(i); // 0 1 2 3 4
}

console.log(i); // 10

/* 예제 13-09 */
var x = 1;

function foo() {
  var x = 10;
  bar();
}

function bar() {
  console.log(x);
}

foo();
