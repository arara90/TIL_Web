# Redux

* 강의 : 유투브 생활코딩 - Redux



### Redux?

- 자바스크립트 앱을 위한 **예측 가능한** 상태 저장소



### 예측가능한 ?

- 복잡성 문제 해결



### 특징

* **Single Source of Truth** : 하나의 상태(객체안에)에 app에 필요한 모든 데이터를 넣는다(중앙집중적)
* 외부에서 데이터 접근 안된다. 
  * 직접 state의 값을 바꾸지 못한다. 
  * 직접 가져가지 못한다(getState)



![](https://github.com/arara90/images/blob/master/redux/redux%20001.png?raw=true)



원본 복제 후 수정해서 새로운 원본을 만든다. -> undo/redo가 매우 쉽다

이전/현상태까지 디버깅할 수 있다.

Module Reloading : app refresh 되어도 data는 그대로 남아있음



### 2.1 리덕스 여행의 지도 : 소개

![](https://github.com/arara90/images/blob/master/redux/redux%20002.png?raw=true)



state 

reducer

dispatch

subscribe

action

getState

render



### 2.2 리덕스 여행의 지도 : state와 render의 관계

#### store

* 리덕스의 핵심. 정보가 저장되는 곳

* 은행이라고 상상해보자. 

* 실제 정보는 **state**에 저장되고, state에 직접 접근하는 것은 불가능하다

* **reducer 함수** 

  ```
  function reducer(oldState, action){
  	//...
  } //
  
  var store = Redux.createStore(reducer); // Store 생성, reducer를 매개변수로 갖음
  ```

* render : UI를 만들 코드

* 중요함수(접근을 위한 은행원)

  * dispatch
  * subscribe
  * getState

  ```
  function render(){
  	var state = store.getState();
  	//...
  	document.querySelector('#app').innerHTML=`
  		<h1>WEB</h1>
  		...
      `
  	}
  ```

![](https://github.com/arara90/images/blob/master/redux/redux%20003.png?raw=true)



* #### subscribe : Store의 state바뀔때마다 render를 호출하면 UI 갱

```javascript
store.subscribe(render); // subscribe에 등록하기
```

![](https://github.com/arara90/images/blob/master/redux/redux%20004.png?raw=true)



### 2.3 리덕스 여행의 지도 : Action과 Reducer

### dispatch 

![](https://github.com/arara90/images/blob/master/redux/redux%20006.png?raw=true)

```javascript
<form onsubmit="
	...
	store.dispatch({type:'create', payload:{title:title, desc:desc}}); //	type이 create인 action객체가 dispatch에 전달 된다.
    ">
```

1. reducer를 호출해서 state의 값을 바꾼다 : 현재의 state와 action객체 전달

   ![](https://github.com/arara90/images/blob/master/redux/redux%20008.png?raw=true)

   

2. 1이 끝나면 subscribe를 호출해서 render -> UI 갱신

   ![](https://github.com/arara90/images/blob/master/redux/redux%20010.png?raw=true)



### reducer

```javascript
function reducer(state, action){  // 1 , 2
	if(action.type === 'create'){ // 2
		var newContents = oldState.contents.concat();
		var newMaxId = oldState.maxId+1;
		
		newContents.push({id.newMaxId, title:action.pa......});
		
		return Object.assign({}, state, { // 3
			contents:newContents,
			maxId:newMaxId,
			mode:'read',
			selectedId:newMaxId
		});
	}
}
```

1. state를 입력값으로 받고, 

2. 액션을 참조해서

3. 새로운 state를 가공해서 리턴해주는 가공자 (state 변경)

![](https://github.com/arara90/images/blob/master/redux/redux%20009.png?raw=true)





-> state값이 변경되었으니 render가 다시 호출되어야 하는데

dispatch가 subscribe에 등록되어 있는 구독자들을 호출. -> render가 호출되어서 ..

getState가 새로운 state받아오고 UI갱신

![](https://github.com/arara90/images/blob/master/redux/redux%20005.png?raw=true)



## 3. Redux가 좋은 가장 좋은 이유



부품1, 부품2가 서로 **상호작용** 시

#### 1. redux를 사용하지 않았을 때 



ex) 부품 1을 클릭했을 때, 자기자신과 남의 색깔을 바꿈. 즉, 부품이 2개면 총 4개의 로직

![](https://github.com/arara90/images/blob/master/redux/redux%20013.png?raw=true)

![](https://github.com/arara90/images/blob/master/redux/redux%20012.png?raw=true)

-> 부품이 하나 추가될 때마다 구현 로직이 n*n 으로 늘어난다.

-> 서로 강하게 종속되어 있다.



#### 2. redux를 사용

* 가운데가 store

![](https://github.com/arara90/images/blob/master/redux/redux%20014.png?raw=true)

->  버튼이 store에 변경을 알림

![](https://github.com/arara90/images/blob/master/redux/redux%20015.png?raw=true)

-> 등록되어 있는 부품들에게 자자 알아서 업데이트 하세요! 알림.



따라서, 상태 변경됐으니까 등록하세요 알리는 것과, 자기 자신을 변경하기 위한 한개.

![](https://github.com/arara90/images/blob/master/redux/redux%20016.png?raw=true)

즉, 100개의 부품이면 총 200개의 로직이면 된다. (2+2+2+2+2+....+2 )



##### 리덕스의 시간여행!

* 크롬 개발자 도구에 redux라는 툴을 설치하면 Redux항목을 볼 수 있다.

![](https://github.com/arara90/images/blob/master/redux/redux%20017.png?raw=true)

* 상태를 클릭하면 변화를 볼 수 있고, video 레코딩처럼 재생이 가능하다.



## 4. Redux가 없다면

![](https://github.com/arara90/images/blob/master/redux/redux%20018.png?raw=true)

![](https://github.com/arara90/images/blob/master/redux/redux%20019.png?raw=true)



-> 두 개를 만들고, 서로 상호작용하도록...

![](https://github.com/arara90/images/blob/master/redux/redux%20020.png?raw=true)

 

3개, 4개 모두 동일

![](https://github.com/arara90/images/blob/master/redux/redux%20021.png?raw=true)



..... n개로 늘어나면 수정해야할 코드가 매우 많이 필요.



## 5. Redux의 적용

* https://jsfiddle.net/에서 간단 test

1. ####  Redux 없이.

```html
<!DOCTYPE html>
<html>
  <head>
  </head>
  <body>
    <style>
      .container{
        border: 5px solid black;
        padding: 10px
      }
    </style>
    <div id ="red"></div>
    <div id ="green"></div>
    <div id ="blue"></div>

    <script>
    function red(){
    	document.querySelector('#red').innerHTML=`
      <div class="container" id="component_red">
      <h1>red</h1>
      <input type="button" value="fire" onclick="document.querySelector('#component_red').style.backgroundColor='red';
      document.querySelector('#component_green').style.backgroundColor='red';
      document.querySelector('#component_blue').style.backgroundColor='red';">
      </div> `;
      }
      red();
      
      function green(){
    	document.querySelector('#green').innerHTML=`
      <div class="container" id="component_green">
      <h1>green</h1>
      <input type="button" value="fire" onclick="document.querySelector('#component_red').style.backgroundColor='green';
      document.querySelector('#component_green').style.backgroundColor='green';
      document.querySelector('#component_blue').style.backgroundColor='green';">
      </div> `;
      }
      green();
      
      function blue(){
    	document.querySelector('#blue').innerHTML=`
      <div class="container" id="component_blue">
      <h1>blue</h1>
      <input type="button" value="fire" onclick="document.querySelector('#component_red').style.backgroundColor='blue';
      document.querySelector('#component_green').style.backgroundColor='blue';
      document.querySelector('#component_blue').style.backgroundColor='blue';"">
      </div> `;
      }
      blue();
    </script>  
  </body>
</html>
```





#### redux 사용

 <script src="https://cdnjs.cloudflare.com/ajax/libs/redux/4.0.4/redux.js"></script>


```html
<!DOCTYPE html>
<html>
  <head>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/redux/4.0.4/redux.js"></script>
  </head>
  <body>
    <style>
      .container{
        border: 5px solid black;
        padding: 10px
      }
    </style>
    
    <div id ="red"></div>
    
    <script>
	function reducer(state, action){
        <!-- 초기값 (state가 정의되어있지 않을 때(최초)) -->
            if(state === undefined){ 
              return {color: 'yellow'} 
            }
      }
      
	var store = Redux.createStore(reducer);
    function red(){
    var state = store.getState();
    	document.querySelector('#red').innerHTML=`
      <div class="container" id="component_red" style="background-color:${state.color}">
      <h1>red</h1>
      <input type="button" value="fire" onclick="document.querySelector('#component_red').style.backgroundColor='red';">
      </div> `;
      }
      red();
    </script>
  </body>
</html>
```


![](https://github.com/arara90/images/blob/master/redux/redux%20022.png?raw=true)





### 5.2 Redux의 적용 : reducer와 action을 이용해서 새로운 state값 만들기

#### dispatch -> reducer를 호출하면서 이전의 state와 action을 전달

![](https://github.com/arara90/images/blob/master/redux/redux%20023.png?raw=true)

▲ 최초의 실행



![](https://github.com/arara90/images/blob/master/redux/redux%20024.png?raw=true)

▲ fire를 누르면 ? 이전 state와 action이 전달되었음



![](https://github.com/arara90/images/blob/master/redux/redux%20025.png?raw=true)

▲ action별로 정리하자면 이렇게 할 수 있다.

​	( but,  이런 방식은 추천하지 않음. 시간여행 및[Hot Module Replacement의 혜택을 받기 어려움)

**-> 바로 return하지 말고 복제하고 복제한 것을 return해.** 



#### 객체 복제 : Object.assign(target, source,...);

* 첫번째 객체는 빈값으로!

* source : 복제할 속성을 가진 객체
* return 값은 첫번째 인자의 객체이기 때문에 첫번째 인자는 반드시 빈 값.

![](https://github.com/arara90/images/blob/master/redux/redux%20026.png?raw=true)



#### 최종 코드

![](https://github.com/arara90/images/blob/master/redux/redux%20027.png?raw=true)

```html
<!DOCTYPE html>
<html>
  <head>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/redux/4.0.4/redux.js"></script>
  </head>
  <body>
    <style>
      .container{
        border: 5px solid black;
        padding: 10px
      }
    </style>
    
    <div id ="red"></div>
    
    <script>
	function reducer(state, action){
  		console.log(state,action);
        <!-- 초기값 (state가 정의되어있지 않을 때(최초)) -->
            if(state === undefined){ 
              return {color: 'yellow'} 
            }
            
            var newState;
            if(action.type === 'CHANGE_COLOR'){
            	newState = Object.assign({}, state, action.color);
            }
            
            return newState;
            
      }
      
	var store = Redux.createStore(reducer);
    function red(){
    var state = store.getState();
    	document.querySelector('#red').innerHTML=`
      <div class="container" id="component_red" style="background-color:${state.color}">
      <h1>red</h1>
      <input type="button" value="fire" onclick="store.dispatch({type:'CHANGE_COLOR', color:'red'})">
      </div> `;
      }
      store.subscribe(red);
      red();
    </script>
  </body>
</html>
```



### 5.3 Rudux의 적용 : state의 변화에 따라서 UI 반영하기

#### subscribe에 함수 등록하다 -> state바뀔때마다 red 호출

![](https://github.com/arara90/images/blob/master/redux/redux%20028.png?raw=true)





#### redux 있을때 없을때 비교

##### 없을때

![](https://github.com/arara90/images/blob/master/redux/redux%20030.png?raw=true)

blue는 red, green을 알고 있어. 그래서 red, green을 지워버리면 error발생, 

새로운 컴포넌트 추가 시 기존 컴포넌트 모두 업데이트해야해 

-> 강한 커플링의 문제점 



##### 있을때

![](https://github.com/arara90/images/blob/master/redux/redux%20031.png?raw=true)

-> action을 store에 dispatch하고, subscribe해두면 state 변경이 생겼을 때 소식을 받고 일을 하면 된다.

red나 green를 알 필요가 없다.

즉, blue 컴포넌트를 만들때는 blue에만 집중하면 돼.

-> Decoupling (각각의 컴포넌트들이 StandAlone!)





## 6. Redux선물 : 시간여행과 로깅

#### 1. Redux Dev Tool(Chrome에 tool설치)

##### 요기 접속

https://github.com/zalmoxisus/redux-devtools-extension 

#####  createStore할 때 코드 추가

```
window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
```

![](https://github.com/arara90/images/blob/master/redux/redux%20032.png?raw=true)



![](https://github.com/arara90/images/blob/master/redux/redux%20033.png?raw=true)

* import, export를 통해 변경되는 history 그대로 다운, 업로드 가능

![](https://github.com/arara90/images/blob/master/redux/redux%20034.png?raw=true)



#### 불변성 :원본을 복제한 것을 리턴해야하는 이유

즉, 서로 완전히 독립되어야 시간 여행을 할 수 있는 것이다. 서로 영향을 받으면 완벽 복원이 불가능해진다.



#### 단일 Store: reducer에 의해 가공

console.log(action.type, action, state, newState) -> 액션과 전후상태 비교가능