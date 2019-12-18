## 7. 실전 Redux - CRUD앱 만들기

### 7.1 정적인 웹페이지 만들기

```html
<!DOCTYPE html>
<html>
    <body>
        <header>
            <h1>WEB</h1>
            Hello, WEB!
        </header>
        <nav>
            <ol>
                <li><a href="1.html">HTML</a></li>
                <li><a href="2.html">CSS</a></li>
            </ol>
        </nav>
        <article>
            <ul>
                <li><a href="/create">create</a></li>
                <li><input type="button" value="delete"></li>
            </ul>
            <h2>HTML</h2>
            HTML is ...
        </article>
    </body>
</html>
```



### 7.2 부품화

```html
<!DOCTYPE html>
<html>
    <body>
        <div id="subject"></div>
        <div id="toc"></div>
        <div id="control"></div>
        <div id="content"></div>
        <script>
function subject(){
	document.querySelector('#subject').innerHTML=`
	<header>
		<h1>WEB</h1>
		Hello, WEB!
	</header>        
`
}

function TOC(){
	document.querySelector('#toc').innerHTML=`
	<nav>
		<ol>
			<li><a href="1.html">HTML</a></li>
			<li><a href="2.html">CSS</a></li>
		</ol>
	</nav>      
`
}

function control(){
	document.querySelector('#control').innerHTML=`
	<ul>
			<li><a href="/create">create</a></li>
			<li><input type="button" value="delete"></li>
	</ul>
`
}

function article(){
	document.querySelector('#content').innerHTML=`
        <article>
            <h2>HTML</h2>
            HTML is ...
        </article>
`
}

subject();
TOC();
control();
article();

        </script>
    </body>
</html>
```

### 

### 7.3 store 생성과 state 사용하기

```html
<!DOCTYPE html>
<html>
    <head>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/redux/4.0.4/redux.js"></script>
    </head>
    <body>
        <div id="subject"></div>
        <div id="toc"></div>
        <div id="control"></div>
        <div id="content"></div>
        <script>
function subject(){
	document.querySelector('#subject').innerHTML=`
	<header>
		<h1>WEB</h1>
		Hello, WEB!
	</header>        
`
}

function TOC(){
var state = store.getState();
var i =0;
var liTags = '';

while(i<state.contents.length){
	liTags = liTags + `
  
  	<li>
    <a href = "${state.contents[i].id}">${state.contents[i].title}</a>
    </li>
  `
  i = i+1;
}

	document.querySelector('#toc').innerHTML=`
	<nav>
		<ol>
			${liTags}
		</ol>
	</nav>      
`
}

function control(){
	document.querySelector('#control').innerHTML=`
	<ul>
			<li><a href="/create">create</a></li>
			<li><input type="button" value="delete"></li>
	</ul>
`
}

function article(){
	document.querySelector('#content').innerHTML=`
        <article>
            <h2>HTML</h2>
            HTML is ...
        </article>
`
}

function reducer(state, action){
    
    if(state == undefined){
        return { contents:[
            {id:1, title:'HTML', desc:'HTML is ..'},
            {id:2, title:'CSS', desc:'CSS is ..'}]
       }
    }
}
            
var store = Redux.createStore(reducer); //reducer 주입
subject();
TOC();
control();
article();


        </script>
    </body>
</html>
```



### 7.4 Action을 dispatch를 통해서 전달하기

<수정대상>

```
while(i<state.contents.length){
	liTags = liTags + `
  
  	<li>
    <a href = "${state.contents[i].id}">${state.contents[i].title}</a>
    </li>
  `
  i = i+1;
}
```



```
while(i<state.contents.length){
	liTags = liTags + `
  
  	<li>
    <a onclick="
    event.preventDefault();
    var action = {type:'SELECT', id:${state.contents[i].id}}
    store.dispatch(action);
    " 
    
    href = "${state.contents[i].id}">${state.contents[i].title}</a>
    </li>
  `
  i = i+1;
}
```



store.dispatch(action); 이걸하면 store에서 reducer를 호출한다. 

```
function reducer(state, action){
	console.log(state, action)
    if(state == undefined){
        return { 
        selected_id: null,
        contents:[
            {id:1, title:'HTML', desc:'HTML is ..'},
            {id:2, title:'CSS', desc:'CSS is ..'}]
       }
    }
    
    var newState;
    if(action.type === 'SELECT'){
		newState = Object.assign({}, state , {selected_id:action.id});
	}
	return newState
}
```



#### 최종

```html
<!DOCTYPE html>
<html>
    <head>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/redux/4.0.4/redux.js"></script>
    </head>
    <body>
        <div id="subject"></div>
        <div id="toc"></div>
        <div id="control"></div>
        <div id="content"></div>
        <script>
function subject(){
	document.querySelector('#subject').innerHTML=`
	<header>
		<h1>WEB</h1>
		Hello, WEB!
	</header>        
`
}

function TOC(){
var state = store.getState();
var i =0;
var liTags = '';

while(i<state.contents.length){
	liTags = liTags + `
  
  	<li>
    <a onclick="
    event.preventDefault();
    var action = {type:'SELECT', id:${state.contents[i].id}}
    store.dispatch(action);
    " 
    
    href = "${state.contents[i].id}">${state.contents[i].title}</a>
    </li>
  `
  i = i+1;
}

	document.querySelector('#toc').innerHTML=`
	<nav>
		<ol>
			${liTags}
		</ol>
	</nav>      
`
}

function control(){
	document.querySelector('#control').innerHTML=`
	<ul>
			<li><a href="/create">create</a></li>
			<li><input type="button" value="delete"></li>
	</ul>
`
}

function article(){
	document.querySelector('#content').innerHTML=`
        <article>
            <h2>HTML</h2>
            HTML is ...
        </article>
`
}

function reducer(state, action){
	
    if(state === undefined){
        return { 
        selected_id: null,
        contents:[
            {id:1, title:'HTML', desc:'HTML is ..'},
            {id:2, title:'CSS', desc:'CSS is ..'}]
       }
    }
    
    var newState;
    if(action.type === 'SELECT'){
		newState = Object.assign({}, state , {selected_id:action.id}, { contents:[
            {id:1, title:'HTML2', desc:'HTML is ..'},
            {id:2, title:'CSS2', desc:'CSS is ..'}]});
	}
  console.log(state, action, newState)
	return newState
}
            
var store = Redux.createStore(reducer); //reducer 주입

subject();
TOC();
control();
article();

        </script>
    </body>
</html>
```



### 7.5 subscribe를 통해 자동 갱신

##### article 함수 수정

```html
function article(){
  var state = store.getState();
  var i = 0;
  var aTitle, aDesc;
  
  while(i < state.contents.length){
  	if(state.contents[i].id === state.selected_id){
    	aTitle = state.contents[i].title;
      aDesc = state.contents[i].desc;
      break;
    }
    i=i+1;
  }


	document.querySelector('#content').innerHTML=`
        <article>
            <h2>${aTitle}</h2>
            ${aDesc}
        </article>
`
}
```



##### reducer 수정해보고, subscribe에 article 추가하기

```
function reducer(state, action){
    if(state === undefined){
        return { 
        selected_id: 1,
        contents:[
            {id:1, title:'HTML', desc:'HTML is ..'},
            {id:2, title:'CSS', desc:'CSS is ..'}]
       }
    }
    var newState;
    if(action.type === 'SELECT'){
		newState = Object.assign({}, state , {selected_id:action.id}, { contents:[
            {id:1, title:'HTML2', desc:'HTML2 is ..'},
            {id:2, title:'CSS2', desc:'CSS2 is ..'}]});
	}
  console.log(state, action, newState)
	return newState
}
            
var store = Redux.createStore(reducer); //reducer 주입
store.subscribe(article);
```



#### 최종 

```html
<!DOCTYPE html>
<html>
    <head>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/redux/4.0.4/redux.js"></script>
    </head>
    <body>
        <div id="subject"></div>
        <div id="toc"></div>
        <div id="control"></div>
        <div id="content"></div>
        <script>
function subject(){
	document.querySelector('#subject').innerHTML=`
	<header>
		<h1>WEB</h1>
		Hello, WEB!
	</header>        
`
}

function TOC(){
var state = store.getState();
var i =0;
var liTags = '';

while(i<state.contents.length){
	liTags = liTags + `
  
  	<li>
    <a onclick="
    event.preventDefault();
    var action = {type:'SELECT', id:${state.contents[i].id}}
    store.dispatch(action);
    " 
    
    href = "${state.contents[i].id}">${state.contents[i].title}</a>
    </li>
  `
  i = i+1;
}

	document.querySelector('#toc').innerHTML=`
	<nav>
		<ol>
			${liTags}
		</ol>
	</nav>      
`
}

function control(){
	document.querySelector('#control').innerHTML=`
	<ul>
			<li><a href="/create">create</a></li>
			<li><input type="button" value="delete"></li>
	</ul>
`
}

function article(){
  var state = store.getState();
  var i = 0;
  var aTitle, aDesc;
  
  while(i < state.contents.length){
  	if(state.contents[i].id === state.selected_id){
    	aTitle = state.contents[i].title;
      aDesc = state.contents[i].desc;
      break;
    }
    i=i+1;
  }


	document.querySelector('#content').innerHTML=`
        <article>
            <h2>${aTitle}</h2>
            ${aDesc}
        </article>
`
}

function reducer(state, action){
    if(state === undefined){
        return { 
        selected_id: 1,
        contents:[
            {id:1, title:'HTML', desc:'HTML is ..'},
            {id:2, title:'CSS', desc:'CSS is ..'}]
       }
    }
    var newState;
    if(action.type === 'SELECT'){
		newState = Object.assign({}, state , {selected_id:action.id}, { contents:[
            {id:1, title:'HTML2', desc:'HTML2 is ..'},
            {id:2, title:'CSS2', desc:'CSS2 is ..'}]});
	}
  console.log(state, action, newState)
	return newState
}
            
var store = Redux.createStore(reducer); //reducer 주입
store.subscribe(article);

subject();
TOC();
control();
article();

        </script>
    </body>
</html>
```

![](https://github.com/arara90/images/blob/master/redux/redux%20035.png?raw=true)





### 7.3 글생성 기능 구현

```html
<!-- 1. control -->
function control(){
	document.querySelector('#control').innerHTML=`
	<ul>
			<li><a onclick="event.preventDefault();"
            
            href="/create">create</a></li>
			<li><input type="button" value="delete"></li>
	</ul>
`
}

<!-- 2. reducer -->
function reducer(state, action){
    if(state === undefined){
        return { 
        max_id:2,
        mode:'create',
        selected_id: 1,
        contents:[
            {id:1, title:'HTML', desc:'HTML is ..'},
            {id:2, title:'CSS', desc:'CSS is ..'}]
       }
    }
    var newState;
    if(action.type === 'SELECT'){
		newState = Object.assign({}, state , {selected_id:action.id});
	}else if(action.type === 'CREATE'){
		var newMaxId = state.max_id + 1;
		var newContents = state.contents.concat();
		newContents.push({id:newMaxId, title:action.title, desc:action.desc})
		
		Object.assign({}, state, {
			max_id:newMaxId,
			contents:newContents,
			mode:'read'
		})
		
	}
  console.log(state, action, newState)
	return newState
}


<!-- 3. article -->
function article(){
  var state = store.getState();
  if(state.mode ==='create'){
  document.querySelector('#content').innerHTML=`
  	<article>
  		<form onsubmit="
  		event.preventDefault();
  		var _title = this.title.value;
  		var _desc = this.desc.value;
  		store.dispatch({type:'CREATE',title:_title,desc:_desc});
  		console.log(title);
  		">
  			<p>
  				<input type ="text" name="title"
  				placeholder="title"
  			</p>
  			<p>
  				<text area name ="desc"
  				placeholder="description"></textarea>
  			</p>
  				<input type="submit">
  		</form>
  	</article>
  	`
  
  } else if(state.mode ==='read'){
  	  var i = 0;
      var aTitle, aDesc;
      while(i < state.contents.length){
        if(state.contents[i].id === state.selected_id){
            aTitle = state.contents[i].title;
          aDesc = state.contents[i].desc;
          break;
        }
        i=i+1;
      }


        document.querySelector('#content').innerHTML=`
            <article>
                <h2>${aTitle}</h2>
                ${aDesc}
            </article>
    `
  }
  
  
}

```



#### 최종

```html
<!DOCTYPE html>
<html>
    <head>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/redux/4.0.4/redux.js"></script>
    </head>
    <body>
        <div id="subject"></div>
        <div id="toc"></div>
        <div id="control"></div>
        <div id="content"></div>
        <script>
            
function subject(){
	document.querySelector('#subject').innerHTML=`
	<header>
		<h1>WEB</h1>
		Hello, WEB!
	</header>        
`
}

function TOC(){
var state = store.getState();
var i =0;
var liTags = '';

while(i<state.contents.length){
	liTags = liTags + `
  
  	<li>
    <a onclick="
    event.preventDefault();
    var action = {type:'SELECT', id:${state.contents[i].id}}
    store.dispatch(action);
    " 
    
    href = "${state.contents[i].id}">${state.contents[i].title}</a>
    </li>
  `
  i = i+1;
}

	document.querySelector('#toc').innerHTML=`
	<nav>
		<ol>
			${liTags}
		</ol>
	</nav>      
`
}

function control(){
	document.querySelector('#control').innerHTML=`
	<ul>
			<li><a onclick="event.preventDefault();
			store.dispatch({type:'CHANGE_MODE', mode:'create'})"
            href="/create">create</a></li>
			<li><input type="button" value="delete"></li>
	</ul>
`
}

function article(){
  var state = store.getState();
  if(state.mode ==='create'){
  document.querySelector('#content').innerHTML=`
  	<article>
  		<form onsubmit="
  		event.preventDefault();
  		var _title = this.title.value;
  		var _desc = this.desc.value;
  		store.dispatch({
  		type:'CREATE',
  		title:_title,
  		desc:_desc
  		})
  		console.log(title);
  		">
  			<p>
  				<input type ="text" name="title"
  				placeholder="title"
  			</p>
  			<p>
  				<textarea name ="desc"
  				placeholder="description"></textarea>
  			</p>
  				<input type="submit">
  		</form>
  	</article>
  	`
  
  } else if(state.mode ==='read'){
  	  var i = 0;
      var aTitle, aDesc;
      while(i < state.contents.length){
        if(state.contents[i].id === state.selected_id){
          aTitle = state.contents[i].title;
          aDesc = state.contents[i].desc;
          break;
        }
        i=i+1;
      }
        document.querySelector('#content').innerHTML=`
            <article>
                <h2>${aTitle}</h2>
                ${aDesc}
            </article>
    `
  }
  
  
}


function reducer(state, action){
    if(state === undefined){
        return { 
        max_id:2,
        mode:'create',
        selected_id: 1,
        contents:[
            {id:1, title:'HTML', desc:'HTML is ..'},
            {id:2, title:'CSS', desc:'CSS is ..'}]
       }
    }
    
    var newState;
    if(action.type === 'SELECT'){
		newState = Object.assign({}, state , {selected_id:action.id});
	}else if(action.type === 'CREATE'){
		var newMaxId = state.max_id + 1;
		var newContents = state.contents.concat();
		newContents.push({selected_id:newMaxId, id:newMaxId, title:action.title, desc:action.desc})
		
		newState = Object.assign({}, state, {
			max_id:newMaxId,
      selected_id:newMaxId,
			contents:newContents,
			mode:'read'
		})
		
	}
  console.log(state, action, newState)
	return newState
}
            
var store = Redux.createStore(reducer); //reducer 주입
store.subscribe(article);
store.subscribe(TOC);

subject();
TOC();
control();
article();

        </script>
    </body>
</html>
```



#### 7.3 글삭제 기능 구현

```html
<!DOCTYPE html>
<html>
    <head>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/redux/4.0.4/redux.js"></script>
    </head>
    <body>
        <div id="subject"></div>
        <div id="toc"></div>
        <div id="control"></div>
        <div id="content"></div>
        <script>
            
function subject(){
	document.querySelector('#subject').innerHTML=`
	<header>
		<h1>WEB</h1>
		Hello, WEB!
	</header>        
`
}

function TOC(){
var state = store.getState();
var i =0;
var liTags = '';

while(i<state.contents.length){
	liTags = liTags + `
  
  	<li>
    <a onclick="
    event.preventDefault();
    var action = {type:'SELECT', id:${state.contents[i].id}}
    store.dispatch(action);
    " 
    
    href = "${state.contents[i].id}">${state.contents[i].title}</a>
    </li>
  `
  i = i+1;
}

	document.querySelector('#toc').innerHTML=`
	<nav>
		<ol>
			${liTags}
		</ol>
	</nav>      
`
}

<!-- control -->
function control(){
	document.querySelector('#control').innerHTML=`
	<ul>
			<li><a onclick="event.preventDefault();
			store.dispatch({type:'CHANGE_MODE', mode:'create'})"
            href="/create">create</a></li>
			<li><input onclick="
                store.dispatch({type:'DELETE'});
                " 
                       type="button" value="delete"></li>
	</ul>
`
}

function article(){
  var state = store.getState();
  if(state.mode ==='create'){
  document.querySelector('#content').innerHTML=`
  	<article>
  		<form onsubmit="
  		event.preventDefault();
  		var _title = this.title.value;
  		var _desc = this.desc.value;
  		store.dispatch({
  		type:'CREATE',
  		title:_title,
  		desc:_desc
  		})
  		console.log(title);
  		">
  			<p>
  				<input type ="text" name="title"
  				placeholder="title"
  			</p>
  			<p>
  				<textarea name ="desc"
  				placeholder="description"></textarea>
  			</p>
  				<input type="submit">
  		</form>
  	</article>
  	`
  
  } else if(state.mode ==='read'){
  	  var i = 0;
      var aTitle, aDesc;
      while(i < state.contents.length){
        if(state.contents[i].id === state.selected_id){
          aTitle = state.contents[i].title;
          aDesc = state.contents[i].desc;
          break;
        }
        i=i+1;
      }
        document.querySelector('#content').innerHTML=`
            <article>
                <h2>${aTitle}</h2>
                ${aDesc}
            </article>
    `
  }else if(state.mode ==='welcome'){
        document.querySelector('#content').innerHTML=`
            <article>
                <h2>welcome</h2>
                hello redux
            </article>
    `
  }
  
}


function reducer(state, action){
    <!-- 초기값 -->
	if(state === undefined){
        return { 
        max_id:2,
        mode:'create',
        selected_id: 1,
        contents:[
            {id:1, title:'HTML', desc:'HTML is ..'},
            {id:2, title:'CSS', desc:'CSS is ..'}]
       }
    }
    <!-- Actions -->
    var newState;
    if(action.type === 'SELECT'){
		newState = Object.assign({}, state , {selected_id:action.id, mode:'read'});
	}else if(action.type === 'CREATE'){
		var newMaxId = state.max_id + 1;
		var newContents = state.contents.concat();
		newContents.push({selected_id:newMaxId, id:newMaxId, title:action.title, desc:action.desc})
		newState = Object.assign({}, state, {
			max_id:newMaxId,
      		selected_id:newMaxId,
			contents:newContents,
			mode:'read'
		})
	}else if(action.type === 'DELETE'){
		var i = 0;
    var newContents = [];
		while(i < state.contents.length){
                                        if(state.selected_id !== state.contents[i].id){
                                        	newContents.push(
                                        		state.contents[i]
                                        		);
                                        }
                                        i = i+1;
                                        }
        newState = Object.assign({}, state, {
			contents:newContents,
			mode:'welcome'
		})
		
	}else if(action.type === 'CHANGE_MODE'){
            newState = Object.assign({}, state, {mode:action.mode});
  }


  console.log(state, action, newState)
	return newState
}
            
var store = Redux.createStore(reducer); //reducer 주입
store.subscribe(article);
store.subscribe(TOC);

subject();
TOC();
control();
article();

        </script>
    </body>
</html>
```





다음 볼 것 : Immutability