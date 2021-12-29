export type getIncomeOnDaySuccess = {
  currDay?: {
    total_sum: number;
  };
  name: string;
};

export type getIncomeOnMonthSuccess = {
  currMonth?: {
    total_sum: number;
  };
  name: string;
};

export type getIncomeFailure = {
  data: any;
};
