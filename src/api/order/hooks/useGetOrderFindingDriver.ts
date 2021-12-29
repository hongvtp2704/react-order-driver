import { AxiosError } from "axios";
import { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootReducerState } from "store";
import { getOrderSuccess, getOrderFailure } from "../responseTypes";
import { getOrderByFindingDriver } from "../requests/getOrderFindingDriver";

export interface HookInterface {
  failureCallback?: (err: AxiosError<getOrderFailure>) => void;
  successCallback?: (data: getOrderSuccess) => void;
}

type ReturnDataType = {
  isLoading: boolean;
  responseData: [] | getOrderSuccess;
  runRequest: () => void;
};

export const useGetOrderFindingDriver: (args: HookInterface) => ReturnDataType =
  ({
    failureCallback: componentFailureCallback,
    successCallback: componentSuccessCallback,
  }) => {
    const isLoading = useSelector(
      (state: RootReducerState) => state.order.isLoading
    );
    const [responseData, setResponseData] = useState<[] | getOrderSuccess>([]);
    const dispatch = useDispatch();

    const runRequest = useCallback(() => {
      dispatch(
        getOrderByFindingDriver({
          failureCallback: (err) => {
            componentFailureCallback && componentFailureCallback(err);
          },
          successCallback: (res) => {
            setResponseData(res);
            componentSuccessCallback && componentSuccessCallback(res);
          },
        })
      );
    }, [componentFailureCallback, componentSuccessCallback, dispatch]);

    const returnObject: ReturnDataType = {
      isLoading,
      responseData,
      runRequest,
    };
    return returnObject;
  };
