import { AxiosError } from "axios";
import { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootReducerState } from "store";
import { driverUpdate } from "../requests";
import { DriverUpdateResponseSuccess } from "../responseTypes";
import { UpdateDriverRequestBody } from "../requestTypes";

export interface HookInterface {
  failureCallback?: (err: AxiosError) => void;
  successCallback?: (data: DriverUpdateResponseSuccess) => void;
  driverId: string;
}

type ReturnDataType = {
  isLoading: boolean;
  responseData: null | DriverUpdateResponseSuccess;
  runRequest: (requestArgs: UpdateDriverRequestBody) => void;
};

export const useDriverUpdate: (args: HookInterface) => ReturnDataType = ({
  failureCallback: componentFailureCallback,
  successCallback: componentSuccessCallback,
  driverId,
}) => {
  const isLoading = useSelector(
    (state: RootReducerState) => state.auth.isLoading
  );
  const [responseData, setResponseData] =
    useState<null | DriverUpdateResponseSuccess>(null);
  const dispatch = useDispatch();

  const runRequest = useCallback(
    (data: UpdateDriverRequestBody) => {
      dispatch(
        driverUpdate({
          driverId,
          data,
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
    [driverId, componentFailureCallback, componentSuccessCallback, dispatch]
  );

  const returnObject: ReturnDataType = {
    isLoading,
    runRequest,
    responseData,
  };
  return returnObject;
};
