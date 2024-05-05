// 액션 타입을 미리 선언
/* 
 뒤에 as const 를 붙여줌으로써 나중에 액션 객체를 만들게 action.type 의 값을 추론하는 과정에서
 action.type 이 string 으로 추론되지 않고 'counter/INCREASE' 와 같이 실제 문자열 값으로 추론 되도록 해줌.
 */
const INCREASE = "counter/INCREASE" as const;
const DECREASE = "counter/DECREASE" as const;
const INCREASE_BY = "counter/INCRASE_BY" as const;

// 액션 생성함수 선언.
export const increase = () => ({
  type: INCREASE,
});

export const decrease = () => ({
  type: DECREASE,
});

export const increaseBy = (diff: number) => ({
  type: INCREASE_BY,
  /* 액션에 부가적으로 필요한 값을 payload 라는 이름으로 통일함.
   이는 FSA (https://github.com/redux-utilities/flux-standard-action) 라는 규칙인데
   이 규칙을 적용하면 액션들이 모두 비슷한 구조로 이루어져있게 되어 추후 다룰 때도 편하고
   읽기 쉽고, 액션 구조를 일반화함으로써 액션에 관련돤 라이브러리를 사용 할 수 있게 해줍니다.
   무조건 따라할 필요는 없지만, 해당 규칙을 적용할경우 유지보수할때 편할듯하다.
   */
  payload: diff,
});

/* 
 모든 액션 겍체들에 대한 타입을 준비.
 ReturnType<typeof _____> 는 특정 함수의 반환값을 추론한다.
 상단부에서 액션타입을 선언 할 떄 as const 를 하지 않으면 이 부분이 제대로 작동하지 않는다.
*/
type CounterAction =
  | ReturnType<typeof increase>
  | ReturnType<typeof decrease>
  | ReturnType<typeof increaseBy>;

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
 리듀서에는 state와 함수의 반환값이 일치해야한다.
 액션에서는 CounterAction 타입으로 설정한다.
*/
function counter(
  state: CounterState = initialState,
  action: CounterAction
): CounterState {
  switch (action.type) {
    case INCREASE:
      return { count: state.count + 1 };
    case DECREASE:
      return { count: state.count - 1 };
    case INCREASE_BY:
      return { count: state.count + action.payload };
    default:
      return state;
  }
}

export default counter;
