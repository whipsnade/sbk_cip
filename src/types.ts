export type Role = 'BUSINESS' | 'APPROVER' | 'SUPPLIER' | 'GUARD' | 'SUPPLIER_WEB' | 'APPROVER_MOBILE' | 'EVALUATOR_MOBILE';

export type ContractorStatus = 'DRAFT' | 'PENDING_INFO' | 'PENDING_REVIEW' | 'PENDING_PD' | 'QUALIFIED' | 'NEEDS_IMPROVEMENT' | 'RISK' | 'INACTIVE';
export type ContractorType = 'LONG_TERM' | 'SHORT_TERM';

export interface Contractor {
  id: string; // YYYYMM + XX
  name: string;
  type: ContractorType;
  status: ContractorStatus;
  healthIndex: number;
  contactName: string;
  contactPhone: string;
  creditCode: string;
  nature: string;
  scope: string;
  certs: { name: string; expiry: string; url?: string }[];
  workers: Worker[];
  vehicles: Vehicle[];
}

export type OrderStatus = 'DRAFT' | 'PENDING_DEPT' | 'PENDING_AREA' | 'PENDING_EHS' | 'PENDING_SUPPLIER' | 'PENDING_GUARD' | 'IN_PROGRESS' | 'FINISHED' | 'REJECTED';

export interface Worker {
  name: string;
  idCard: string;
  phone: string;
  type: string; // 工种
  trained: boolean;
  trainingExpiry: string;
  healthCert: string; // 有效 / 过期 / 无
  healthCertExpiry: string;
  specialCert: string;
  status: 'READY' | 'ENTERED' | 'EXITED' | 'REJECTED';
  cardNo?: string;
  abnormalReason?: string;
}

export interface Vehicle {
  plate: string;
  type: string;
  driver: string;
  isSpecial?: boolean;
  desc?: string;
}

export interface Order {
  id: string; // YYYYMMDD + XX
  contractorId: string;
  supplier: string; // Contractor Name
  content: string;
  area: string[];
  startTime: string;
  endTime: string;
  status: OrderStatus;
  createdBy: string;
  sbuxContact: string;
  contractorContact: string;
  safetyOfficers: string[];
  workers: Worker[];
  vehicles: Vehicle[];
  highRisk: boolean;
  permits: string[];
  ppe: string[];
  inviteCode?: string;
  rejectReason?: string;
}

export interface AreaMapping {
  id: string;
  managerName: string;
  managerPhone: string;
  areaName: string;
}

export interface Evaluation {
  id: string;
  orderId: string;
  orderContent: string;
  supplierId: string;
  supplierName: string;
  areaName: string;
  evaluator: string; // manager name
  score: number; // 1-5
  complaint: string;
  status: 'PENDING_APPROVER' | 'APPROVED' | 'REJECTED';
  createdAt: string;
}

