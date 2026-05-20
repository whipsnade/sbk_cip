export type Role = 'BUSINESS' | 'APPROVER' | 'SUPPLIER' | 'GUARD';

export type OrderStatus = 'DRAFT' | 'PENDING_APPROVER' | 'REJECTED' | 'PENDING_SUPPLIER' | 'PENDING_GUARD' | 'IN_PROGRESS' | 'FINISHED';

export interface Worker {
  name: string;
  idCard: string;
  phone: string;
  healthCert: string;
  specialCert: string;
  trained: boolean;
  status: 'READY' | 'ENTERED' | 'EXITED';
  cardNo?: string;
  abnormalReason?: string; // used for demonstrating exception scenarios
}

export interface Vehicle {
  plate: string;
  type: string;
  driver: string;
}

export interface Order {
  id: string;
  content: string;
  type: string;
  area: string;
  startTime: string;
  endTime: string;
  supplier: string;
  status: OrderStatus;
  createdBy: string;
  inviteCode?: string;
  workers: Worker[];
  vehicles: Vehicle[];
  risk?: string;
  control?: string;
  specialWork?: string;
  specialMaterials?: string;
  rejectReason?: string;
}
