import { createAction } from "typesafe-actions";
import { Todo } from "./types";
// 리듀서에 사용할수있게 타입을 내보냅니다.
export const ADD_TODO = "todos/ADD_TODO";
export const TOGGLE_TODO = "todos/TOGGLE_TODO";
export const REMOVE_TODO = "todos/REMOVE_TODO";

let nextId = 1; //새로운 추가 항목을 추가할때 사용할 고유id값

// 액션생성함수

/*
이 액션 생성 함수의 경우엔 파라미터를 기반하여 커스터마이징된 payload를 설정해주므로,
createAction 이라는 함수를 사용합니다.
문법이 바뀌어서 action을 사용하지않습니다.
*/
export const addTodo = createAction(ADD_TODO, (text: string) => ({
  id: nextId++,
  text: text,
}))<Todo>();

// 위 코드는 다음과 같은 형태로도 구현 할 수 있지만, createAction 말고 action 만 사용하면
// Action Helpers (https://www.npmjs.com/package/typesafe-actions#action-helpers-api) 지원이 안된다.
// export const addTodo = (text: string) => action(ADD_TODO, { id: nextId++, text })

// payload가 그대로 들어가는 함수의 경우
export const toggleTodo = createAction(TOGGLE_TODO)<number>();
export const removeTodo = createAction(REMOVE_TODO)<number>();
