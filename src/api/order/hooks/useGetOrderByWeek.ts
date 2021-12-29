import { AxiosError } from "axios";
import { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootReducerState } from "store";
import { getOrderSuccess, getOrderFailure } from "../responseTypes";
import { getOrderByWeek } from "../requests";

export interface HookInterface {
  failureCallback?: (err: AxiosError<getOrderFailure>) => void;
  successCallback?: (data: getOrderSuccess) => void;
}

type ReturnDataType = {
  isLoading: boolean;
  responseData: [] | getOrderSuccess;
  runRequest: (driverId: string) => void;
};

export const useGetOrderByWeek: (args: HookInterface) => ReturnDataType = ({
  failureCallback: componentFailureCallback,
  successCallback: componentSuccessCallback,
}) => {
  const isLoading = useSelector(
    (state: RootReducerState) => state.order.isLoading
  );
  const [responseData, setResponseData] = useState<[] | getOrderSuccess>([]);
  const dispatch = useDispatch();

  const runRequest = useCallback(
    (driverId: string) => {
      dispatch(
        getOrderByWeek({
          failureCallback: (err) => {
            componentFailureCallback && componentFailureCallback(err);
          },
          successCallback: (res) => {
            setResponseData(res);
            componentSuccessCallback && componentSuccessCallback(res);
          },
          driverId,
        })
      );
    },
    [componentFailureCallback, componentSuccessCallback, dispatch]
  );

  const returnObject: ReturnDataType = {
    isLoading,
    runRequest,
    responseData,
  };
  return returnObject;
};
