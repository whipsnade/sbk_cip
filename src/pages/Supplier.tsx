import React from 'react';
import { useAppContext } from '../context/AppContext';
import { Mail, CheckCircle2, UserPlus, Car, FileUp } from 'lucide-react';

export const SupplierSmsLink = () => {
  const { setView } = useAppContext();
  return (
    <div className="p-6 flex flex-col items-center justify-center h-full animate-in fade-in">
      <div className="w-full bg-white rounded shadow-sm border border-gray-200 p-8 text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1 bg-[#006241]"></div>
        <div className="w-16 h-16 bg-[#F2F0EB] border border-gray-200 rounded flex items-center justify-center mx-auto mb-6">
          <Mail className="text-[#006241]" size={28} />
        </div>
        <h2 className="text-xl font-bold mb-4 text-[#1E3932]">入园邀请链接</h2>
        <div className="text-sm text-gray-700 mb-8 text-left bg-gray-50 border border-gray-200 p-5 rounded leading-relaxed">
          <p className="font-bold text-[#1E3932] mb-2 uppercase tracking-wide">【星巴克CIP 保安处】</p>
          上海机械工程有限公司，您好！您的施工单 <span className="font-mono bg-white border border-gray-200 px-1 rounded font-bold">WO-20231024-001</span> 已通过安全审批。请在入场前通过下方链接补充登记进场人员身份凭证与车辆信息。
        </div>
        <button onClick={() => setView('SUPPLIER_FORM')} className="w-full bg-[#006241] text-white py-3.5 rounded font-bold hover:bg-[#00754A] shadow transition-colors active:scale-[0.98]">
          打开登记链接
        </button>
      </div>
    </div>
  );
}

export const SupplierForm = () => {
  const { setView, updateOrder, orders } = useAppContext();
  const targetOrder = orders.find(o => o.status === 'PENDING_APPROVER') || orders[0]; 

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if(targetOrder) {
      updateOrder(targetOrder.id, {
        status: 'PENDING_GUARD',
        inviteCode: '882319',
        workers: [
          { name: "张三", idCard: "310110199001018888", phone: "13800138000", healthCert: "有效", specialCert: "无", trained: true, status: 'READY' }
        ]
      });
    }
    setView('SUPPLIER_SUCCESS');
  };

  return (
    <div className="pb-28 animate-in slide-in-from-bottom-4">
      <div className="bg-[#1E3932] text-white p-6 pb-12 shadow-sm relative">
        <h1 className="text-2xl font-bold mb-2">入园登记补录</h1>
        <p className="text-gray-300 bg-black/20 px-3 py-1 inline-block rounded text-xs font-bold uppercase tracking-wider">咖啡烘焙产线设备维护</p>
      </div>
      
      <form onSubmit={handleSubmit} className="-mt-6 px-4 space-y-5 relative z-10">
        <div className="bg-white rounded p-6 shadow-sm border border-gray-200">
           <h3 className="font-bold border-b border-gray-200 pb-3 mb-5 flex items-center gap-2 text-[#1E3932] uppercase tracking-wider text-sm">
             <UserPlus size={18} className="text-[#006241]" /> 施工人员报备
           </h3>
           <div className="space-y-5">
             <div>
               <label className="block text-[11px] font-bold text-gray-500 mb-1.5 uppercase tracking-wide">姓名 <span className="text-red-500">*</span></label>
               <input required type="text" defaultValue="张三" className="w-full bg-[#F8F8F8] border border-gray-200 rounded px-3 py-2.5 text-[#1E3932] focus:outline-none focus:border-[#006241]" />
             </div>
             <div>
               <label className="block text-[11px] font-bold text-gray-500 mb-1.5 uppercase tracking-wide">身份证号 <span className="text-red-500">*</span></label>
               <input required type="text" defaultValue="310110199001018888" className="w-full bg-[#F8F8F8] border border-gray-200 rounded px-3 py-2.5 font-mono text-[#1E3932] font-bold focus:outline-none focus:border-[#006241]" />
             </div>
             <div>
               <label className="block text-[11px] font-bold text-gray-500 mb-1.5 uppercase tracking-wide">手机绑定 <span className="text-red-500">*</span></label>
               <input required type="tel" defaultValue="13800138000" className="w-full bg-[#F8F8F8] border border-gray-200 rounded px-3 py-2.5 font-mono text-[#1E3932] font-bold focus:outline-none focus:border-[#006241]" />
             </div>
             <div className="pt-2">
               <label className="block text-[11px] font-bold text-gray-500 mb-2 uppercase tracking-wide">附件 (健康证/特种证)</label>
               <div className="border border-dashed border-gray-300 rounded bg-gray-50 py-6 flex flex-col items-center justify-center text-gray-400 cursor-pointer hover:bg-gray-100 transition-colors">
                  <FileUp size={24} className="mb-2 text-gray-400" />
                  <span className="text-xs font-bold text-gray-500">点击上传 PDF 或照片</span>
               </div>
             </div>
           </div>
           <button type="button" className="w-full mt-6 py-2.5 border border-dashed border-[#006241] text-[#006241] rounded text-sm font-bold bg-[#F2F0EB] hover:bg-[#E8F0ED] transition-colors">+ 添加其他员工</button>
        </div>

        <div className="bg-white rounded p-6 shadow-sm border border-gray-200">
           <h3 className="font-bold border-b border-gray-200 pb-3 mb-5 flex items-center gap-2 text-[#1E3932] uppercase tracking-wider text-sm">
             <Car size={18} className="text-[#006241]" /> 工程车辆登记
           </h3>
           <button type="button" className="w-full py-2.5 bg-gray-50 border border-gray-200 text-gray-600 rounded text-sm font-bold shadow-sm hover:bg-gray-100">+ 新增车牌号</button>
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 p-5 bg-white border-t border-gray-200 z-20">
          <button type="submit" className="w-full bg-[#006241] text-white py-3.5 rounded font-bold text-base shadow hover:bg-[#00754A] transition-colors active:scale-[0.98]">
            确认资料无误，提交核验
          </button>
        </div>
      </form>
    </div>
  );
}

export const SupplierSuccess = () => {
    return (
      <div className="flex flex-col items-center justify-center h-full p-6 animate-in zoom-in-95 text-center">
        <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center text-[#006241] mb-6 shadow-sm border border-green-200">
          <CheckCircle2 size={40} />
        </div>
        <h2 className="text-2xl font-bold text-[#1E3932] mb-2">资料提报成功</h2>
        <p className="text-gray-500 mb-10 text-sm leading-relaxed px-4">您的施工人员及车辆资料已录入系统数据库。<br/>请到达园区岗亭时出示下方邀请码。</p>
        
        <div className="bg-white p-8 rounded shadow-lg border border-gray-200 w-full max-w-xs relative overflow-hidden">
           <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#006241]"></div>
           <p className="text-[10px] text-gray-400 font-bold mb-3 uppercase tracking-widest">现场核验码</p>
           <p className="text-5xl font-black text-[#1E3932] tracking-widest mb-8 font-mono leading-none">882319</p>
           <div className="w-40 h-40 bg-[#F2F0EB] mx-auto rounded flex items-center justify-center border border-dashed border-gray-300 relative">
             <div className="absolute inset-2 border-2 border-[#1E3932] rounded-lg"></div>
             <span className="text-[#1E3932] text-[10px] font-bold z-10 bg-white px-2 uppercase shadow-sm">扫码核验</span>
           </div>
        </div>
      </div>
    );
  }
