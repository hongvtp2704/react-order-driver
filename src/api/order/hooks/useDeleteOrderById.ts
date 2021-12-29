import { AxiosError } from "axios";
import { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootReducerState } from "store";
import { getOrderSuccess } from "../responseTypes";
import { deleteOrderById } from "../requests";

export interface HookInterface {
  failureCallback?: (err: AxiosError) => void;
  successCallback?: (data: getOrderSuccess) => void;
}

type ReturnDataType = {
  isLoading: boolean;
  responseData: [] | getOrderSuccess;
  runRequest: (orderId: string) => void;
};

export const useDeleteOrderById: (args: HookInterface) => ReturnDataType = ({
  failureCallback: componentFailureCallback,
  successCallback: componentSuccessCallback,
}) => {
  const isLoading = useSelector(
    (state: RootReducerState) => state.order.isLoading
  );
  const [responseData, setResponseData] = useState<[] | getOrderSuccess>([]);
  const dispatch = useDispatch();

  const runRequest = useCallback(
    (orderId: string) => {
      dispatch(
        deleteOrderById({
          failureCallback: (err) => {
            componentFailureCallback && componentFailureCallback(err);
          },
          successCallback: (res) => {
            setResponseData(res);
            componentSuccessCallback && componentSuccessCallback(res);
          },
          orderId,
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
