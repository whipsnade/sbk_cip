import React from 'react';
import { useAppContext } from '../context/AppContext';
import { LayoutDashboard, ClipboardList, Users, ShieldCheck, LogOut, CheckSquare, FileText, UserCog, Building, Network } from 'lucide-react';

export const AdminLayout: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const { role, setRole, setView, view } = useAppContext();

  const handleLogout = () => {
    setRole(null);
    setView('LOGIN');
  };

  const navItems = {
    BUSINESS: [
      { id: 'ADMIN_DASHBOARD', label: '首页仪表盘', icon: LayoutDashboard },
      { id: 'ADMIN_CONTRACTORS', label: '承包商档案', icon: Users },
      { id: 'ADMIN_ORDER_LIST', label: '施工单管理', icon: ClipboardList },
      { id: 'ADMIN_REPORTS', label: '查询与报表', icon: FileText },
      { id: 'ADMIN_ORG', label: '组织架构', icon: Building },
      { id: 'ADMIN_ROLES', label: '权限设置', icon: UserCog },
      { id: 'ADMIN_WORKFLOW', label: '审批工作流', icon: Network },
    ],
    APPROVER: [
      { id: 'APPROVER_LIST', label: '审批中心', icon: CheckSquare },
      { id: 'ADMIN_DASHBOARD', label: '仪表盘', icon: LayoutDashboard },
    ],
    GUARD: [
      { id: 'GUARD_HOME', label: '门卫核验', icon: ShieldCheck },
      { id: 'GUARD_EXIT', label: '离厂登记', icon: LogOut },
    ],
    SUPPLIER_WEB: [
      { id: 'SUPPLIER_WEB_COMPANY', label: '企业资质与信息', icon: Building },
      { id: 'SUPPLIER_WEB_PERSONNEL', label: '人员与车辆管理', icon: Users },
      { id: 'SUPPLIER_WEB_APPROVALS', label: '资质审批跟进', icon: FileText }
    ]
  };

  const currentNav = role && role !== 'SUPPLIER' ? navItems[role] : [];

  return (
    <div className="flex h-screen w-full overflow-hidden bg-[#F2F0EB] font-sans text-[#1E3932]">
      {/* Sidebar Navigation */}
      <aside className="w-60 bg-[#1E3932] flex flex-col shrink-0">
        <div className="p-6 border-b border-[#2D4D44]">
          <h1 className="text-white font-bold text-lg leading-tight tracking-tight">星巴克CIP<br/><span className="text-sm font-normal opacity-80">承包商管理系统</span></h1>
        </div>
        <nav className="flex-1 py-4">
          <div className="px-4 py-2 text-xs font-semibold text-[#8E9299] uppercase tracking-wider mb-2">菜单模块</div>
          {currentNav.map(item => (
            <button
              key={item.id}
              onClick={() => setView(item.id)}
              className={`w-full flex items-center px-6 py-3 text-sm transition-colors ${
                view === item.id 
                  ? 'text-white bg-[#006241] border-r-4 border-white' 
                  : 'text-white opacity-60 hover:opacity-100'
              }`}
            >
              <item.icon size={18} className="mr-3" />
              {item.label}
            </button>
          ))}
        </nav>
        <div className="p-6 border-t border-[#2D4D44] flex items-center justify-between text-xs text-white opacity-50">
          <span>{role === 'BUSINESS' ? '业务部门' : role === 'APPROVER' ? '审批人' : role === 'SUPPLIER_WEB' ? '供应商后台' : '门卫账号'}</span>
          <button onClick={handleLogout} className="hover:opacity-100 hover:text-white transition-opacity">
            <LogOut size={16} />
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8 shrink-0 shadow-sm z-10">
          <div className="flex items-center space-x-2 text-sm text-gray-500 font-medium">
            <span>{role === 'BUSINESS' ? '管理后台' : role === 'APPROVER' ? '审批管理' : role === 'SUPPLIER_WEB' ? '供应商管理平台' : '门卫核验模块'}</span>
            <span>/</span>
            <span className="text-[#006241]">
              {currentNav?.find(n => n.id === view)?.label || '详情'}
            </span>
          </div>
          <div className="flex items-center space-x-6">
            <div className="text-right text-xs">
              <p className="font-bold text-[#1E3932]">{role === 'SUPPLIER_WEB' ? '上海机械工程有限公司' : '昆山园区南门岗亭'}</p>
              <p className="text-gray-400">2023-10-24 14:30:05</p>
            </div>
            <div className="w-8 h-8 rounded-full bg-[#E4E3E0] flex items-center justify-center text-xs border border-gray-300 font-bold text-gray-700">
               {role === 'BUSINESS' ? '业' : role === 'APPROVER' ? '审' : role === 'SUPPLIER_WEB' ? '供' : '卫'}
            </div>
          </div>
        </header>

        {/* Core Area */}
        <div className="p-6 flex flex-1 overflow-hidden">
           <div className="flex-1 overflow-y-auto">
             <div className="max-w-6xl mx-auto h-full">
               {children}
             </div>
           </div>
        </div>
      </main>
    </div>
  );
};

export const MobileLayout: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const { setRole, setView } = useAppContext();
  
  const handleLogout = () => {
    setRole(null);
    setView('LOGIN');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 sm:p-0">
      <div className="w-full max-w-md h-full sm:h-[850px] bg-[#F2F0EB] sm:rounded-[2.5rem] sm:shadow-2xl overflow-hidden flex flex-col relative sm:border-[12px] border-gray-900 ring-1 ring-gray-200">
        <div className="bg-[#1E3932] text-white p-4 shrink-0 flex items-center justify-between">
          <div className="font-bold text-sm">Starbucks CIP</div>
          <button onClick={handleLogout} className="text-xs opacity-80 hover:opacity-100 bg-white/10 px-2 py-1 rounded">退出测试</button>
        </div>
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
