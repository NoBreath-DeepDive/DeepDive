REST는 HTTP를 기반으로 클라이언트가 서버의 리소스에 접근하는 방식을 규정한 아키텍처고,
REST API는 REST 기반으로 서비스 API를 구현한 것을 의미한다.

# 44.1 REST API의 구성

REST API는 자원, 행위, 표현의 3가지 요소로 구성

| 구성요소 | 내용                           | 표현 방법        |
| -------- | ------------------------------ | ---------------- |
| 자원     | 자원                           | URI(엔드 포인트) |
| 행위     | 자원에 대한 행위               | HTTP 요청 메서드 |
| 표현     | 자원에 대한 행위의 구체적 내용 | 페이로드         |

# 44.2 REST API 설계 원칙

REST에서 가장 중요한 원칙은 두가지

- **URI는 리소스를 표현**
- **행위에 대한 정의는 HTTP 요청 메서드**를 통해 하는 것이 RESTful API를 설계하는 중심 규칙

## **1. URI는 리소스를 표현해야 한다.**

URI는 리소스를 표현하는 데 중점을 두어야 한다. 리소스를 식별할 수 있는 이름은 동사보다는 명사를 사용 → 이름에 get 같은 행위에 대한 표현이 들어가서는 안됨

```jsx
#Bad
GET /getTodos/1
GET /todos/show/1

#Good
GET /todos/1
```

## **2. 리소스에 대한 행위는 HTTP 요청 메서드로 표현한다.**

HTTP 요청 메서드는 클라이언트가 서버에게 요청의 종유와 목적(리소스에 대한 행위)을 알리는 방법

- 주로 5가지 요청 메서드(GET, POST, PUT, PATCH, DELETE 등)를 사용하여 CRUD를 구현

| **HTTP 요청 메서드** | 종류           | **목적**              | **페이로드** |
| -------------------- | -------------- | --------------------- | ------------ |
| GET                  | index/retrieve | 모든/특정 리소스 취득 | x            |
| POST                 | create         | 리소스 생성           | o            |
| PUT                  | replace        | 리소스 전체 교체      | o            |
| PATCH                | modify         | 리소스의 일부 수정    | o            |
| DELETE               | delete         | 모든/특정 리소스 삭제 | x            |

리소스에 대한 행위는 HTTP 요청 메서드를 통해 표현하며 URI에 표현하지 않는다.

예를 들어, 리소스를 취득하는 경우에는 GET, 리소스를 삭제하는 경우에는 DELETE를 사용하여 리소스에 대한 행위를 명확히 표현.

```jsx
#Bad
  GET /todos/delete/1

#Good
  DELETE /todos/
```

# **44.3 JSON Server를 이용한 REST API 실습**

## 44.3.1 **JSON Server 설치**

## 44.3.2  **db.json 파일 생성**

```jsx
{
	"todos": [
		{
			"id": 1,
			"content": "HTML",
			"completed": true
		},
		{
			"id": 2,
			"content": "CSS",
			"completed": false
		}
 		{
			"id": 3,
			"content": "Javascript",
			"completed": true
		}

	]
}
```

## 44.3.3 **JSON Server 실행**

```jsx
## 기본 포트(3000) 사용/ watch 적용
$json-server --watch db.json
```

```jsx
## 포트 변경 / watch 옵션 적용
$json-server --watch db.json --port 5000
```

```jsx
{
  "name": "json-server-exam",
  "version": "1.0.0",
  "script": {
  	"start": "json-server --watch db.json"
  },
  "devDependencies": {
  	"json-server": "^0.16.1"
  }
}
```

터미널에서 npm start 명령어 입력

![스크린샷 2025-10-28 오후 11.24.50.png](attachment:05921b4e-9fbb-4d92-ac14-7ba2598b37fb:스크린샷_2025-10-28_오후_11.24.50.png)

## 44.3.4 **GET 요청**

todos 리소스에서 모든 todo를 취득한다.

JSON Server의 루트 폴더에 public 폴더를 생성하고 JSON Server를 중단한 후 재실행한다. 그리고 public 폴더에 다음 get_index.html을 추가하고 브라우저에서

http://localhost:3000/get_index.html로 접속

```jsx
<!DOCTYPE html>
<html lang="en">
<body>
    <pre></pre>
  	<script>
  		const xhr = new XMLHttpRequest();

      	xhr.open('GET', '/todos');

      	xhr.send();

      	xhr.onload = () => {
      		if(xhr.status === 200) {
      			document.querySelector('pre').textContent = xhr.response
      		} else {
      			console.error('Error', xhr.status, xhr.statusText)
      		}
      	};
  	</script>
</body>
</html>

```

todos 리소스에서 id를 사용하여 특정 todo를 취득한다. public 폴더에 다음 get_retrieve.html을 추가하고, http://localhost:3000/get_retrieve.html 로 접속

```jsx
<!DOCTYPE html>
<html lang="en">
<body>
    <pre></pre>
  	<script>
  		const xhr = new XMLHttpRequest();

      	xhr.open('GET', '/todos/1');

      	xhr.send();

      	xhr.onload = () => {
      		if(xhr.status === 200) {
      			document.querySelector('pre').textContent = xhr.response
      		} else {
      			console.error('Error', xhr.status, xhr.statusText)
      		}
      	};
  	</script>
</body>
</html>
```

## 44.3.5. **POST 요청**

todos 리소스에 새로운 todo를 생성한다. POST 요청 시에는 setRequestHeader 메서드를 사용하여 요청 몸체에 담아 서버로 전송할 페이로드의 MIME 타입을 지정해야 한다.

public 폴더에 다음 post.html을 추가하고 브라우저에서

http://localhost:3000/post.html로 접속

```jsx
<!DOCTYPE html>
<html lang="en">
<body>
  <pre></pre>
	<script>
		const xhr = new XMLHttpRequest();

    	xhr.open('POST', '/todos');

    	xhr.setRequestHeader('content-type', 'application/json');

    	xhr.send(JSON.stringfy({ id: 4, content: 'Angular', completed: false }));

    	xhr.onload = () => {
    		if(xhr.status === 200 || xhr.status === 201) {
    			document.querySelector('pre').textContent = xhr.response;
    		} else {
    			console.error('Error', xhr.status, xhr.statusText)
    		}
    	};
	</script>
</body>
</html>
```

## 44.3.6. **PUT 요청**

PUT은 특정 리소스 전체를 교체할 때 사용한다. 다음 예제에서는 todos 리소스에서 id로 todo를 특정하여 id를 제외한 리소스 전체를 교체한다. PUT 요청 시에는 setRequestHeader 메서드를 사용하여 요청 몸체에 담아 서버로 전송할 페이로드의 MIME 타입을 지정.

public 폴더에 다음 put.html을 추가하고 브라우저에서

http://localhost:3000/put.html로 접속

```jsx
<!DOCTYPE html>
<html lang="en">
<body>
  <pre></pre>
	<script>
		const xhr = new XMLHttpRequest();

    	xhr.open('PUT', '/todos/4');

    	xhr.setRequestHeader('content-type', 'application/json');

    	xhr.send(JSON.stringfy({ id: 4, content: 'React', completed: true }));

    	xhr.onload = () => {
    		if(xhr.status === 200) {
    			document.querySelector('pre').textContent = xhr.response;
    		} else {
    			console.error('Error', xhr.status, xhr.statusText)
    		}
    	};
	</script>
</body>
</html>
```

## 44.3.7. **PATCH 요청**

PATCH는 특정 리소스의 일부를 수정할 때 사용한다. 다음 예제에서는 todos 리소스의 id로 todo를 특정하여 complete만 수정한다.

PATCH 요청 시에는 setRequestHeader 메서드를 사용하여 요청 몸체에 담아 서버로 전송할 페이로드의 MIME 타입을 지정해야 한다.

public 폴더에 다음 patch.html을 추가하고 브라우저에서

http://localhost:3000/patch.html로 접속

```jsx
<!DOCTYPE html>
<html lang="en">
<body>
  <pre></pre>
	<script>
		const xhr = new XMLHttpRequest();

    	xhr.open('PATCH', '/todos/4');

    	xhr.setRequestHeader('content-type', 'application/json');

    	xhr.send(JSON.stringfy({ completed: true }));

    	xhr.onload = () => {
    		if(xhr.status === 200) {
    			document.querySelector('pre').textContent = xhr.response;
    		} else {
    			console.error('Error', xhr.status, xhr.statusText)
    		}
    	};
	</script>
</body>
</html>
```

## 44.3.8. **DELETE 요청**

todos 리소스에서 id를 사용하여 todo를 삭제한다. public 폴더에 다음 delete.html을 추가하고 브라우저에서 [http://localhost:3000/delete.html로](http://localhost:3000/delete.html%EB%A1%9C) 접속

```jsx
<!DOCTYPE html>
<html lang="en">
<body>
  <pre></pre>
	<script>
		const xhr = new XMLHttpRequest();

    	xhr.open('DELETE', '/todos/4');

    	xhr.send();

    	xhr.onload = () => {
    		if(xhr.status === 200) {
    			document.querySelector('pre').textContent = xhr.response;
    		} else {
    			console.error('Error', xhr.status, xhr.statusText)
    		}
    	};
	</script>
</body>
</html>
```
