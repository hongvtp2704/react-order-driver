import { AxiosError } from "axios";
import { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootReducerState } from "store";
import { UpdatePasswordDriverBody } from "../requestTypes";
import { UpdatePasswordDriverSuccess } from "../responseTypes";
import { updatePasswordDriver } from "../requests";

export interface HookInterface {
  failureCallback?: (err: AxiosError) => void;
  successCallback?: (data: UpdatePasswordDriverSuccess) => void;
  driverId: string;
}

type ReturnDataType = {
  isLoading: boolean;
  responseData: null | UpdatePasswordDriverSuccess;
  runRequest: (requestArgs: UpdatePasswordDriverBody) => void;
};

export const useUpdatePasswordDriver: (args: HookInterface) => ReturnDataType =
  ({
    failureCallback: componentFailureCallback,
    successCallback: componentSuccessCallback,
    driverId,
  }) => {
    const isLoading = useSelector(
      (state: RootReducerState) => state.auth.isLoading
    );
    const [responseData, setResponseData] =
      useState<null | UpdatePasswordDriverSuccess>(null);
    const dispatch = useDispatch();

    const runRequest = useCallback(
      (data: UpdatePasswordDriverBody) => {
        dispatch(
          updatePasswordDriver({
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
