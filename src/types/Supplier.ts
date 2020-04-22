export interface Supplier {
  id: string;
  name: string;
  number: string;
  services: Service[];
  workOrders: WorkOrder[];
  numOfSentMessages: number;
  numOfReceivedMessages: number;
  rating?: number;
  lastRatedDate?: string;
}

export type Service =
  | 'electrical'
  | 'plumbing'
  | 'carpentry'
  | 'handyman'
  | 'gardening'
  | 'locksmith'
  | 'painting'
  | 'blacksmith'
  | 'lawnmowing'
  | 'brickworks';

export interface WorkOrder {
  dateDue: string;
  dateCompleted: string;
  priority: number;
  serviceReportProvided: boolean;
}
