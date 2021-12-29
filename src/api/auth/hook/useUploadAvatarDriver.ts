import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AxiosError } from "axios";
import { RootReducerState } from "store";
import { UploadAvatarSuccess, UploadAvatarFailure } from "../responseTypes";
import { requestUploadAvatarDriver } from "../requests/requestUploadAvatarDriver";

export interface HookInterface {
  failureCallback?: (err: AxiosError<UploadAvatarFailure>) => void;
  successCallback?: (avatar: UploadAvatarSuccess) => void;
}

type ReturnDataType = {
  isLoading: boolean;
  runRequest: (avatar: Blob, driverId: string) => void;
};

export const useUploadAvatarDriver: (args: HookInterface) => ReturnDataType = ({
  failureCallback: componentFailureCallback,
  successCallback: componentSuccessCallback,
}) => {
  const isLoading = useSelector(
    (state: RootReducerState) => state.auth.isLoading
  );
  const dispatch = useDispatch();

  const runRequest = useCallback(
    (avatar: Blob, driverId: string) => {
      dispatch(
        requestUploadAvatarDriver({
          avatar,
          driverId,
          failureCallback: (err) => {
            componentFailureCallback && componentFailureCallback(err);
          },
          successCallback: (data) => {
            componentSuccessCallback && componentSuccessCallback(data);
          },
        })
      );
    },
    [componentFailureCallback, componentSuccessCallback, dispatch]
  );

  const returnObject: ReturnDataType = {
    isLoading,
    runRequest,
  };

  return returnObject;
};
