import { createAction, ActionType, createReducer } from "typesafe-actions";

// 액션 타입을 미리 선언
const increase = createAction("counter/INCREASE")();
const decrease = createAction("counter/DECREASE")();
const increaseBy = createAction("counter/INCRASE_BY")<number>();

// // 액션 생성함수 선언.
// export const increase = createAction(INCREASE)();

// export const decrease = createAction(DECREASE)();

// export const increaseBy = createAction(INCREASE_BY)<number>(); //payload type을 Generics로 설정

/* 
 모든 액션 겍체들에 대한 타입을 준비.
*/
const actions = { increase, decrease, increaseBy };
type CounterAction = ActionType<typeof actions>;

// 해당 리덕스 모듈에서 관리 할 상태의 타입을 선언.
type CounterState = {
  count: number;
};

// 초기상태 선언.
const initialState: CounterState = {
  count: 0,
};

/* 
 리듀서 작성.
 createReducer는 리듀서를 쉽게 만들어주는 함수
 Generics로 리듀서에서 관리할 상태, 그리고 리듀서에서 처리 할 모든 액션의 타입을 넣어야함.
*/
// 기존의 방식 리펙토링
// const counter = createReducer<CounterState, CounterAction>(initialState, {
//   [INCREASE]: (state) => ({ count: state.count + 1 }), //액션을 참조할 필요x 파라미터로 state만 받아도된다.
//   [DECREASE]: (state) => ({ count: state.count - 1 }),
//   [INCREASE_BY]: (state, action) => ({ count: state.count + action.payload }), //액션 타입 유추가 가능
// });

// 메서드 체이닝 방식
const counter = createReducer<CounterState, CounterAction>(initialState)
  .handleAction(increase, (state) => ({ count: state.count + 1 }))
  .handleAction(decrease, (state) => ({ count: state.count - 1 }))
  .handleAction(increaseBy, (state, action) => ({
    count: state.count + action.payload,
  }));
// 타입 선언 안해도 되는 문법 이나 createAction으로 구현하면 위에처럼 명시 해줘야하는듯하다. createStandardAction을 사용해야 가능함.
// const counter = createReducer(initialState)
//   .handleAction(increase, (state) => ({ count: state.count + 1 }))
//   .handleAction(decrease, (state) => ({ count: state.count - 1 }))
//   .handleAction(increaseBy, (state, action) => ({
//     count: state.count + action.payload,
//   }));

export default counter;
