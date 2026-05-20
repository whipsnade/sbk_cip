import React, { createContext, useContext, useState } from 'react';
import { Order, Role } from '../types';

interface AppState {
  role: Role | null;
  view: string;
  orders: Order[];
  currentOrderId: string | null;
  setRole: (role: Role | null) => void;
  setView: (view: string) => void;
  setOrders: (orders: Order[]) => void;
  setCurrentOrderId: (id: string | null) => void;
  updateOrder: (id: string, updates: Partial<Order>) => void;
}

const mockOrders: Order[] = [
  {
    id: "WO-20231024-001",
    content: "咖啡烘焙产线设备维护",
    type: "设备维修",
    area: "烘焙车间1线",
    startTime: "2023-10-25 08:00",
    endTime: "2023-10-26 18:00",
    supplier: "上海机械工程有限公司",
    status: "PENDING_APPROVER",
    createdBy: "生产部",
    risk: "中风险",
    control: "佩戴安全帽，断电作业",
    specialWork: "否",
    specialMaterials: "否",
    workers: [],
    vehicles: []
  },
  {
    id: "WO-20231024-002",
    content: "弱电系统升级",
    type: "弱电施工",
    area: "配电室",
    startTime: "2023-10-24 08:00",
    endTime: "2023-10-24 20:00",
    supplier: "星联智造通讯技术有限公司",
    status: "PENDING_GUARD",
    createdBy: "IT部门",
    inviteCode: "882319",
    workers: [
      { name: "张三", idCard: "310110***8888", phone: "13800138000", healthCert: "有效", specialCert: "电工证", trained: true, status: 'READY' },
      { name: "王五", idCard: "310110***7777", phone: "13900139000", healthCert: "过期", specialCert: "无", trained: false, status: 'READY', abnormalReason: '资料缺失, 未培训' }
    ],
    vehicles: [
      { plate: "沪A88888", type: "小型客车", driver: "张三" }
    ]
  },
  {
    id: "WO-20231023-005",
    content: "库房地坪漆修补",
    type: "土建施工",
    area: "成品仓库",
    startTime: "2023-10-23 09:00",
    endTime: "2023-10-25 18:00",
    supplier: "星建装饰工程有限公司",
    status: "IN_PROGRESS",
    createdBy: "物流部",
    inviteCode: "112233",
    workers: [
      { name: "李四", idCard: "320110***9999", phone: "13912345678", healthCert: "有效", specialCert: "无", trained: true, status: 'ENTERED', cardNo: "TMP-001" }
    ],
    vehicles: []
  }
];

export const AppContext = createContext<AppState>({} as AppState);

export const AppProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [role, setRole] = useState<Role | null>(null);
  const [view, setView] = useState('LOGIN');
  const [orders, setOrders] = useState<Order[]>(mockOrders);
  const [currentOrderId, setCurrentOrderId] = useState<string | null>(null);

  const updateOrder = (id: string, updates: Partial<Order>) => {
    setOrders(orders.map(o => o.id === id ? { ...o, ...updates } : o));
  };

  return (
    <AppContext.Provider value={{ role, view, orders, currentOrderId, setRole, setView, setOrders, setCurrentOrderId, updateOrder }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
