import { Dispatch } from "redux";
import { AsyncActionCreatorBuilder } from "typesafe-actions";

type AnyAsyncActionCreator = AsyncActionCreatorBuilder<any, any, any>;

export default function createAsyncThunk<
  A extends AnyAsyncActionCreator,
  F extends (...params: any[]) => Promise<any>
>(asyncActionCreator: A, promiseCreator: F) {
  type Params = Parameters<F>;
  return function thunk(...params: Params) {
    return async (dispatch: Dispatch) => {
      const { request, success, failure } = asyncActionCreator;
      dispatch(request(undefined)); //파라미터가 비어있을 경우 에러가 나서 undifined를 전달함.
      try {
        const result = await promiseCreator(...params);
        dispatch(success(result));
      } catch (e) {
        dispatch(failure(e));
      }
    };
  };
}
