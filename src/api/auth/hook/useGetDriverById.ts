import { AxiosError } from "axios";
import { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootReducerState } from "store";
import { getDriverById } from "../requests";
import { GetDriverByIdSuccess } from "../responseTypes";

export interface HookInterface {
  failureCallback?: (err: AxiosError) => void;
  successCallback?: (data: GetDriverByIdSuccess) => void;
  driverId: string;
}

type ReturnDataType = {
  isLoading: boolean;
  responseData: null | GetDriverByIdSuccess;
  runRequest: () => void;
};

export const useGetDriverById: (args: HookInterface) => ReturnDataType = ({
  driverId,
  failureCallback: componentFailureCallback,
  successCallback: componentSuccessCallback,
}) => {
  const isLoading = useSelector(
    (state: RootReducerState) => state.auth.isLoading
  );
  const [responseData, setResponseData] = useState<null | GetDriverByIdSuccess>(
    null
  );
  const dispatch = useDispatch();

  const runRequest = useCallback(() => {
    dispatch(
      getDriverById({
        driverId,
        failureCallback: (err) => {
          componentFailureCallback && componentFailureCallback(err);
        },
        successCallback: (res) => {
          setResponseData(res);
          componentSuccessCallback && componentSuccessCallback(res);
        },
      })
    );
  }, [driverId, componentFailureCallback, componentSuccessCallback, dispatch]);

  const returnObject: ReturnDataType = {
    isLoading,
    runRequest,
    responseData,
  };
  return returnObject;
};
