import { TodosAction, TodosState } from "./types";
import { createReducer } from "typesafe-actions";
import { ADD_TODO, TOGGLE_TODO, REMOVE_TODO } from "./actions";

// 초기 상태 선언
const initialState: TodosState = [];

// 리듀서 작성
// 리펙토링
const reducer = createReducer<TodosState, TodosAction>(initialState, {
  [ADD_TODO]: (state, action) =>
    state.concat({
      ...action.payload, //id ,text 전부 안에 넣기
      done: false,
    }),
  // 비구조화 할당을 활용해서 payload값을 변경하는게 가능
  [TOGGLE_TODO]: (state, { payload: id }) =>
    state.map((todo) =>
      todo.id === id ? { ...todo, done: !todo.done } : todo
    ),
  [REMOVE_TODO]: (state, { payload: id }) =>
    state.filter((todo) => todo.id !== id),
});

export default reducer;
