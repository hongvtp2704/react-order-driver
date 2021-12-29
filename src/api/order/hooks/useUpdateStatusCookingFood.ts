import { AxiosError } from "axios";
import { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootReducerState } from "store";
import { updateStatusRequestBody } from "../requestTypes";
import { updateStatusSuccess } from "../responseTypes";
import { updateStatusCookingFood } from "../requests";

export interface HookInterface {
  failureCallback?: (err: AxiosError) => void;
  successCallback?: (data: updateStatusSuccess) => void;
}

type ReturnDataType = {
  isLoading: boolean;
  responseData: null | updateStatusSuccess;
  runRequest: (orderId: string, driver_id: string, status: string) => void;
};

export const useUpdateStatusCookingFood: (
  args: HookInterface
) => ReturnDataType = ({
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
    (orderId: string, driver_id: string, status: string) => {
      dispatch(
        updateStatusCookingFood({
          orderId,
          driver_id,
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
