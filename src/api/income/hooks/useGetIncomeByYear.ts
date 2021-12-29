import { AxiosError } from "axios";
import { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getIncomeOnMonthSuccess } from "../responseTypes";
import { getIncomeByYear } from "../requests";
import { RootReducerState } from "store";

export interface HookInterface {
  failureCallback?: (err: AxiosError) => void;
  successCallback?: (data: getIncomeOnMonthSuccess[]) => void;
  driverId: string;
}

type ReturnDataType = {
  isLoading: boolean;
  responseData: [] | getIncomeOnMonthSuccess[];
  runRequest: () => void;
};

export const useGetIncomeByYear: (args: HookInterface) => ReturnDataType = ({
  failureCallback: componentFailureCallback,
  successCallback: componentSuccessCallback,
  driverId,
}) => {
  const isLoading = useSelector(
    (state: RootReducerState) => state.income.isLoading
  );
  const [responseData, setResponseData] = useState<
    [] | getIncomeOnMonthSuccess[]
  >([]);
  const dispatch = useDispatch();

  const runRequest = useCallback(() => {
    dispatch(
      getIncomeByYear({
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
  }, [driverId, componentFailureCallback, componentSuccessCallback, dispatch]);

  const returnObject: ReturnDataType = {
    isLoading,
    runRequest,
    responseData,
  };
  return returnObject;
};
