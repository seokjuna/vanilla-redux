# vanilla-redux

노션: https://seokjuna.notion.site/16-7dbb01e2329a431199ea01b4af85cc43

<img width="500" alt="vanilla-redux" src="https://user-images.githubusercontent.com/102382351/207565552-551ea867-4778-47ca-8432-88a987566957.png">

** 리덕스 기보 개념<br>
1. 액션
- 상태에 어떠한 변화가 필요하면 액션이란 것이 발생 (하나의 객체로 표현)
- 액션 객체는 type 필드를 (액션의 이름) 반드시 가지고 있어야 함
- 그 외의 값들은 나중에 상태 업데이트할 때 참고해야할 값
```jsx
{
	type: 'TOGGLE_VALUE'
}
```

2. 액션 생성 함수
- 액션 객체를 만들어 주는 함수
```jsx
function addTodo(data) {
	return {
		type: 'ADD_TODO',
		data
	};
}

// 화살표 함수로도 만들 수 있음
const changeInput = text => ({
	type: 'CHANGE_INPUT',
	text
});
```
3. 리듀서
- 변화를 일으키는 함수
- 액션을 만들어서 발생시키면 리듀서가 현재 상태와 전달받은 액션 객체를 파라미터로 받아 옴
- 그 후 두 값을 참고하여 새로운 상태로 만들어서 반환해 줌
```jsx
const initialState = {
	counter: 1
};
function reducer(state = initialState, action) {
	swtich (action.type) {
		case INCREMENT:
			return {
				counter: state.counter + 1
			};
		default:
			return state;
	}
}
```

4. 스토어
- 프로젝트에 리덕스를 적용하기 위해 스토어를 만듬
- 한 개의 프로젝트는 단 하나의 스토어만 가질 수 있음
- 스토어 안에는 현재 애플리케이션 상태와 리듀서가 들어가 있으며, 그 외에도 몇 가지 중요한 내장 함수를 지님

5. 디스패치
- 스토어의 내장 함수 중 하나 (’액션을 발생시키는 것’)
- dispatch(action)과 같은 형태로 액션 객체를 파라미터로 넣어서 호출
- 이 함수가 호출되면 스토어는 리듀서 함수를 실행시켜서 새로운 상태를 만들어 줌

6. 구독
- 스토어의 내장 함수 중 하나
- subscribe 함수 안에 리스너 함수를 파라미터로 넣어서 호출해 주면, 이 리스너 함수가 액션이 디스패치되어 상태가 업데이트될 때마다 호출
```jsx
const listener = () => {
	console.log('상태가 업데이트됨')
}
const unsubscribe = store.subscribe(listener);

unsubscribe(); // 추후 구독을 비활성화할 때 함수를 호출
```
