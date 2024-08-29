import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../modules";
import { increase, decrease, increaseBy } from "../modules/counter";
import Counter from "../components/Counter";

function CounterContainer() {
  // 상태를 조히 상태를 조회 할 때에는 state 의 타입을 RootState 로 지정해야한다.
  const count = useSelector((state: RootState) => state.counter.count);
  const dispatch = useDispatch(); // 디스패치 함수 가져옴.

  // 각 액션들을 디스패치하는 함수 생성.
  const onIncrease = () => {
    dispatch(increase());
  };

  const onDecrease = () => {
    if (count > 0) {
      //count 값을 -1했을때 0보다 작을경우 -1이 되지않도록함.
      dispatch(decrease());
    }
  };

  const onIncreaseBy = (diff: number) => {
    dispatch(increaseBy(diff));
  };

  return (
    <Counter
      count={count}
      onIncrease={onIncrease}
      onDecrease={onDecrease}
      onIncreaseBy={onIncreaseBy}
    />
  );
}

export default CounterContainer;
