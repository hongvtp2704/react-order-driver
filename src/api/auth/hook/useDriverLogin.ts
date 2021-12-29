import { AxiosError } from "axios";
import { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootReducerState } from "store";
import { driverLogin } from "../requests";
import { DriverLoginRequestBody } from "../requestTypes";
import { DriverLoginResponseSuccess } from "../responseTypes";

export interface HookInterface {
  failureCallback?: (err: AxiosError) => void;
  successCallback?: (data: DriverLoginResponseSuccess) => void;
}

type ReturnDataType = {
  isLoading: boolean;
  responseData: null | DriverLoginResponseSuccess;
  runRequest: (requestArgs: DriverLoginRequestBody) => void;
};

export const useDriverLogin: (args: HookInterface) => ReturnDataType = ({
  failureCallback: componentFailureCallback,
  successCallback: componentSuccessCallback,
}) => {
  const isLoading = useSelector(
    (state: RootReducerState) => state.auth.isLoading
  );
  const [responseData, setResponseData] =
    useState<null | DriverLoginResponseSuccess>(null);
  const dispatch = useDispatch();

  const runRequest = useCallback(
    (data: DriverLoginRequestBody) => {
      dispatch(
        driverLogin({
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
    [componentFailureCallback, componentSuccessCallback, dispatch]
  );

  const returnObject: ReturnDataType = {
    isLoading,
    runRequest,
    responseData,
  };
  return returnObject;
};
