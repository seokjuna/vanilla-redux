const { createStore } = require("redux");

// DOM 노드를 가리키는 값 선언
const divToggle = document.querySelector('.toggle');
const counter = document.querySelector('h1');
const btnIncrease = document.querySelector('#increase');
const btnDecrease = document.querySelector('#decrease');

// 액션 정의
const TOGGLE_SWITCH = 'TOGGLE_SWITCH';
const INCREASE = 'INCREASE';
const DECREASE = 'DECREASE';

// 액션 생성 함수 작성
const toggleSwitch = () => ({ 
    type: TOGGLE_SWITCH 
});
const increase = (difference) => ({ 
    type: INCREASE, 
    difference 
});
const decrease = () => ({ 
    type: DECREASE 
});

// 초깃값 설정
const initialState = {
    toggle: false,
    counter: 0
};

// 리듀서 함수 정의 (함수의 parameter로 state와 action 값을 받아옴)
// state가 undefined일 때는 initialState를 기본값으로 사용
function reducer(state = initialState, action) {
    // action.type에 따라 다른 작업을 처리함
    switch (action.type) {
        case TOGGLE_SWITCH:
            return {
                ...state, // 불변서 유지
                toggle: !state.toggle
            };
        case INCREASE:
            return {
                ...state,
                counter: state.counter + action.difference
            };
        case DECREASE:
            return {
                ...state,
                counter: state.counter -1
            }
        default:
            return state;
    }
}

// 스토어 만들기
const store = createStore(reducer);

// render 함수 만들기
// React의 render 함수와는 다르게 이미 html을 사용하여 만들어진 UI의 속성을 상태에 따라 변경해 줌
const render = () => {
    const state = store.getState(); // 현재 상태를 불러옴
    // 토글 처리
    if (state.toggle) {
        divToggle.classList.add('active');
    } else {
        divToggle.classList.remove('active');
    }
    // 카운터 처리
    counter.innerText = state.counter;
};

render();
// 상태가 업데이트될 때마다 render 함수를 호출하도록 코드 작성
store.subscribe(render);

// 구독하기
// store의 상태가 바뀔 때 마다 render 함수가 호출되도록 함
const listener = () => {
    console.log('상태 업데이트');
}
const unsubscribe = store.subscribe(listener);

unsubscribe(); // 추후 구독을 비활성화할 때 호출
// 리액트 프로젝트에서 리덕스를 사용할 때는 이 함수를 직접 사용하지 않음
// react-redux 라이브러리가 이 작업을 대신해 줌

// 액션 발생시키기
divToggle.onclick = () => {
    store.dispatch(toggleSwitch());
};
btnIncrease.onclick = () => {
    store.dispatch(increase(1));
};
btnDecrease.onclick = () => {
    store.dispatch(decrease());
};



