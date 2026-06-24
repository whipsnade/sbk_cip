import React, { createContext, useContext, useState } from 'react';
import { Order, Role, Contractor } from '../types';

interface AppState {
  role: Role | null;
  view: string;
  orders: Order[];
  contractors: Contractor[];
  currentOrderId: string | null;
  currentContractorId: string | null;
  setRole: (role: Role | null) => void;
  setView: (view: string) => void;
  setOrders: (orders: Order[]) => void;
  setContractors: (contractors: Contractor[]) => void;
  setCurrentOrderId: (id: string | null) => void;
  setCurrentContractorId: (id: string | null) => void;
  updateOrder: (id: string, updates: Partial<Order>) => void;
  updateContractor: (id: string, updates: Partial<Contractor>) => void;
}

const mockContractors: Contractor[] = [
  {
    id: '20231001',
    name: '上海机械工程有限公司',
    type: 'SHORT_TERM',
    status: 'QUALIFIED',
    healthIndex: 92,
    contactName: '王建国',
    contactPhone: '13811112222',
    creditCode: '91310115MA1H2XXX12',
    nature: '现场设备维修与保养',
    scope: '产线设备机械维护',
    certs: [
      { name: '营业执照', expiry: '2030-12-31' },
      { name: '安全生产许可证', expiry: '2025-12-31' }
    ],
    workers: [
       { name: "张三", idCard: "310110199001018888", phone: "13800138000", type: "机修工", trained: true, trainingExpiry: "2024-10-20", healthCert: "有效", healthCertExpiry: "2024-05-01", specialCert: "无", status: "READY" },
       { name: "王建国", idCard: "310110198001017777", phone: "13911112222", type: "焊工", trained: true, trainingExpiry: "2024-12-01", healthCert: "有效", healthCertExpiry: "2024-12-01", specialCert: "焊工证", status: "READY" },
       { name: "李小明", idCard: "310110199501016666", phone: "13722223333", type: "电工", trained: false, trainingExpiry: "", healthCert: "有效", healthCertExpiry: "2025-01-01", specialCert: "电工进网作业许可证", status: "READY" },
       { name: "赵六", idCard: "310110200001015555", phone: "13633334444", type: "普工", trained: false, trainingExpiry: "", healthCert: "异常", healthCertExpiry: "2023-01-01", specialCert: "无", status: "READY" }
    ],
    vehicles: []
  },
  {
    id: '20231002',
    name: '星建装饰工程有限公司',
    type: 'LONG_TERM',
    status: 'RISK',
    healthIndex: 65,
    contactName: '李强',
    contactPhone: '13922223333',
    creditCode: '91310115MA1H2YYY12',
    nature: '园区保洁与绿化',
    scope: '全园区日常保洁',
    certs: [
      { name: '营业执照', expiry: '2030-12-31' }
    ],
    workers: [],
    vehicles: []
  }
];

const mockOrders: Order[] = [
  {
    id: "2023102401",
    contractorId: "20231001",
    supplier: "上海机械工程有限公司",
    content: "咖啡烘焙产线设备维护",
    area: ["烘焙车间1线"],
    startTime: "2023-10-25 08:00",
    endTime: "2023-10-26 18:00",
    status: "PENDING_AREA",
    createdBy: "生产部",
    sbuxContact: "刘伟",
    contractorContact: "王建国",
    safetyOfficers: ["张明"],
    workers: [],
    vehicles: [],
    highRisk: true,
    permits: ["动火作业"],
    ppe: ["安全帽", "安全鞋", "反光背心", "防护眼镜"],
  },
  {
    id: "2023102402",
    contractorId: "20231001",
    supplier: "上海机械工程有限公司",
    content: "弱电系统升级",
    area: ["配电室"],
    startTime: "2023-10-24 08:00",
    endTime: "2023-10-24 20:00",
    status: "PENDING_GUARD",
    createdBy: "IT部门",
    sbuxContact: "陈杰",
    contractorContact: "王建国",
    safetyOfficers: [],
    inviteCode: "882319",
    workers: [
      { name: "张三", idCard: "310110***8888", phone: "13800138000", type: '电工', healthCert: "有效", healthCertExpiry: '2024-12-31', specialCert: "电工证", trained: true, trainingExpiry: '2024-10-01', status: 'READY' },
      { name: "王五", idCard: "310110***7777", phone: "13900139000", type: '普工', healthCert: "过期", healthCertExpiry: '2023-01-01', specialCert: "无", trained: false, trainingExpiry: '', status: 'READY', abnormalReason: '培训未通过, 健康证过期' }
    ],
    vehicles: [
      { plate: "沪A88888", type: "小型客车", driver: "张三", isSpecial: false }
    ],
    highRisk: true,
    permits: ["带电作业"],
    ppe: ["安全帽", "安全鞋", "绝缘手套"],
  },
  {
    id: "2023102305",
    contractorId: "20231002",
    supplier: "星建装饰工程有限公司",
    content: "库房地坪漆修补",
    area: ["成品仓库"],
    startTime: "2023-10-23 09:00",
    endTime: "2023-10-25 18:00",
    status: "IN_PROGRESS",
    createdBy: "物流部",
    sbuxContact: "林峰",
    contractorContact: "李强",
    safetyOfficers: [],
    inviteCode: "112233",
    workers: [
      { name: "李四", idCard: "320110***9999", phone: "13912345678", type: '普工', healthCert: "有效", healthCertExpiry: '2025-01-01', specialCert: "无", trained: true, trainingExpiry: '2024-12-01', status: 'ENTERED', cardNo: "TMP-001" }
    ],
    vehicles: [],
    highRisk: false,
    permits: [],
    ppe: ["安全帽", "安全鞋", "反光背心"],
  }
];

export const AppContext = createContext<AppState>({} as AppState);

export const AppProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [role, setRole] = useState<Role | null>(null);
  const [view, setView] = useState('LOGIN');
  const [orders, setOrders] = useState<Order[]>(mockOrders);
  const [contractors, setContractors] = useState<Contractor[]>(mockContractors);
  const [currentOrderId, setCurrentOrderId] = useState<string | null>(null);
  const [currentContractorId, setCurrentContractorId] = useState<string | null>(null);

  const updateOrder = (id: string, updates: Partial<Order>) => {
    setOrders(orders.map(o => o.id === id ? { ...o, ...updates } : o));
  };

  const updateContractor = (id: string, updates: Partial<Contractor>) => {
    setContractors(contractors.map(c => c.id === id ? { ...c, ...updates } : c));
  };

  return (
    <AppContext.Provider value={{ 
      role, view, orders, contractors, currentOrderId, currentContractorId, 
      setRole, setView, setOrders, setContractors, setCurrentOrderId, setCurrentContractorId, 
      updateOrder, updateContractor 
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);

