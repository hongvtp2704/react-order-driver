export const getOrderByDriverUrl = (id: string): string =>
  `/api/order/showByDriver/${id}`;
export const getOrderByPresentUrl = (id: string): string =>
  `/api/driver/showOrderByPresent/${id}`;
export const getOrderByWeekUrl = (id: string): string =>
  `/api/driver/showOrderByWeek/${id}`;
export const getOrderByMonthUrl = (id: string): string =>
  `/api/driver/showOrderByMonth/${id}`;
export const getCurrentOrderUrl = (id: string): string =>
  `/api/driver/showCurrentOrder/${id}`;
export const getOrderFindingDriver = () => `api/order/showByFindindDriver`;
export const updateStatusToCookingFoodUrl = (id: string): string =>
  `/api/order/${id}`;

export const updateStatusUrl = (id: string): string =>
  `/api/order/updateStatus/${id}`;
export const deleteOrderByIdUrl = (id: string): string =>
  `api/driver/deleteOrder/${id}`;
