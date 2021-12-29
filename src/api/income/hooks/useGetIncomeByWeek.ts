import { AxiosError } from "axios";
import { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getIncomeOnDaySuccess } from "../responseTypes";
import { getIncomeByWeek } from "../requests";
import { RootReducerState } from "store";

export interface HookInterface {
  failureCallback?: (err: AxiosError) => void;
  successCallback?: (data: getIncomeOnDaySuccess[]) => void;
  driverId: string;
}

type ReturnDataType = {
  isLoading: boolean;
  responseData: [] | getIncomeOnDaySuccess[];
  runRequest: () => void;
};

export const useGetIncomeByWeek: (args: HookInterface) => ReturnDataType = ({
  failureCallback: componentFailureCallback,
  successCallback: componentSuccessCallback,
  driverId,
}) => {
  const isLoading = useSelector(
    (state: RootReducerState) => state.income.isLoading
  );
  const [responseData, setResponseData] = useState<
    [] | getIncomeOnDaySuccess[]
  >([]);
  const dispatch = useDispatch();

  const runRequest = useCallback(() => {
    dispatch(
      getIncomeByWeek({
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
