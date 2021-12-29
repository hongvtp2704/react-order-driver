import { AxiosError } from "axios";
import { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootReducerState } from "store";
import { updateStatus } from "../requests";
import { updateStatusSuccess } from "../responseTypes";

export interface HookInterface {
  failureCallback?: (err: AxiosError) => void;
  successCallback?: (data: updateStatusSuccess) => void;
}

type ReturnDataType = {
  isLoading: boolean;
  responseData: null | updateStatusSuccess;
  runRequest: (orderId: string, status: string) => void;
};

export const useUpdateStatus: (args: HookInterface) => ReturnDataType = ({
  failureCallback: componentFailureCallback,
  successCallback: componentSuccessCallback,
}) => {
  const isLoading = useSelector(
    (state: RootReducerState) => state.order.isLoading
  );
  const [responseData, setResponseData] = useState<null | updateStatusSuccess>(
    null
  );
  const dispatch = useDispatch();

  const runRequest = useCallback(
    (orderId: string, status: string) => {
      dispatch(
        updateStatus({
          orderId,
          status,
          failureCallback: (err) => {
            componentFailureCallback && componentFailureCallback(err);
          },
          successCallback: (res) => {
            setResponseData(res);
            componentSuccessCallback && componentSuccessCallback(res);
          },
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
