import React from 'react';
import { useAppContext } from '../context/AppContext';
import { ShieldCheck, Briefcase, CheckSquare, Truck, Award, QrCode } from 'lucide-react';

export const LoginView: React.FC = () => {
  const { setRole, setView } = useAppContext();

  const handleRoleSelect = (role: any, initView: string) => {
    setRole(role);
    setView(initView);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6 bg-[url('https://images.unsplash.com/photo-1541167760496-1628856ab772?q=80&w=3537&auto=format&fit=crop')] bg-cover bg-center">
      <div className="absolute inset-0 bg-[#1E3932]/95 backdrop-blur-sm"></div>
      
      <div className="relative z-10 max-w-6xl w-full">
        <div className="text-center mb-12 animate-in slide-in-from-bottom-4 fade-in duration-700">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">星巴克 CIP</h1>
          <p className="text-xl text-green-100 font-light tracking-wide opacity-80">承包商核验管理系统</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-4 animate-in slide-in-from-bottom-8 fade-in duration-1000">
          <RoleCard 
            icon={Briefcase} 
            title="管理后台" 
            desc="发起施工单、人员配置"
            onClick={() => handleRoleSelect('BUSINESS', 'ADMIN_DASHBOARD')}
            delay="delay-[50ms]"
          />
          <RoleCard 
            icon={CheckSquare} 
            title="审批中心" 
            desc="审核风险与资质"
            onClick={() => handleRoleSelect('APPROVER', 'APPROVER_LIST')}
            delay="delay-[100ms]"
          />
          <RoleCard 
            icon={Truck} 
            title="供应商网页版" 
            desc="提交资质、管理人员"
            onClick={() => handleRoleSelect('SUPPLIER_WEB', 'SUPPLIER_WEB_COMPANY')}
            delay="delay-[150ms]"
          />
          <RoleCard 
            icon={Truck} 
            title="供应商移动端" 
            desc="手机端填报人员车辆"
            onClick={() => handleRoleSelect('SUPPLIER', 'SUPPLIER_MOBILE_HOME')}
            delay="delay-[200ms]"
          />
          <RoleCard 
            icon={CheckSquare} 
            title="审批移动端" 
            desc="短信快捷登录移动审核"
            onClick={() => handleRoleSelect('APPROVER_MOBILE', 'APPROVER_MOBILE')}
            delay="delay-[250ms]"
          />
          <RoleCard 
            icon={QrCode} 
            title="评价移动端" 
            desc="扫码评价与投诉提报"
            onClick={() => handleRoleSelect('EVALUATOR_MOBILE', 'EVALUATOR_MOBILE')}
            delay="delay-[300ms]"
          />
          <RoleCard 
            icon={ShieldCheck} 
            title="门卫核验" 
            desc="核验身份、放行登记"
            onClick={() => handleRoleSelect('GUARD', 'GUARD_HOME')}
            delay="delay-[350ms]"
          />
        </div>
      </div>
    </div>
  );
};

const RoleCard: React.FC<{icon: any, title: string, desc: string, onClick: () => void, delay?: string}> = ({ icon: Icon, title, desc, onClick, delay = '' }) => (
  <button 
    onClick={onClick}
    className={`bg-[#F2F0EB] p-8 rounded shadow-lg border-2 border-transparent hover:border-[#006241] hover:-translate-y-2 transition-all duration-300 flex flex-col items-center text-center group animate-in zoom-in-95 ${delay}`}
  >
    <div className="w-16 h-16 bg-white border border-gray-200 rounded-full flex items-center justify-center mb-6 group-hover:bg-[#006241] group-hover:border-[#006241] shadow-sm transition-colors duration-300">
      <Icon size={30} className="text-[#006241] group-hover:text-white transition-colors" />
    </div>
    <h3 className="text-lg font-bold text-[#1E3932] mb-2 uppercase tracking-wide">{title}</h3>
    <p className="text-[11px] text-[#8E9299] font-bold uppercase tracking-wider">{desc}</p>
  </button>
);
