import React from 'react';
import { useAppContext } from '../context/AppContext';
import { CheckCircle, XCircle, AlertTriangle } from 'lucide-react';

export const ApproverList = () => {
  const { orders, updateOrder } = useAppContext();
  
  const pendingOrders = orders.filter(o => o.status === 'PENDING_APPROVER');

  const handleApprove = (id: string) => {
    updateOrder(id, { status: 'PENDING_SUPPLIER' });
    alert("审批通过！系统已下发短信通知供应商。");
  };

  const handleReject = (id: string) => {
    updateOrder(id, { status: 'REJECTED', rejectReason: '风险控制措施不明确' });
    alert("已驳回。");
  };

  return (
    <div className="space-y-6 animate-in slide-in-from-right-4 fade-in duration-300">
      <h2 className="text-xl font-bold text-[#1E3932] mb-6">审批中心</h2>
      
      {pendingOrders.length === 0 ? (
        <div className="bg-white p-16 text-center rounded-lg border border-gray-200 shadow-sm">
          <CheckCircle className="mx-auto text-gray-300 mb-4" size={64} />
          <h3 className="text-lg font-bold text-[#1E3932] mb-2">处理完毕</h3>
          <p className="text-gray-500 text-sm">目前没有需要您审批的施工单据。</p>
        </div>
      ) : (
        <div className="space-y-6">
          {pendingOrders.map(o => (
            <div key={o.id} className="bg-white border border-gray-200 rounded-lg p-8 shadow-sm flex flex-col md:flex-row gap-8 transition-all hover:border-[#006241]">
              <div className="flex-1">
                <div className="flex justify-between items-start mb-6">
                   <div>
                      <h3 className="text-lg font-bold text-[#1E3932] mb-1">{o.content}</h3>
                      <p className="text-sm font-mono text-gray-500 font-bold">单据号: {o.id}</p>
                   </div>
                   <span className="px-3 py-1 bg-yellow-50 text-yellow-700 border border-yellow-200 rounded text-[11px] font-bold shadow-sm uppercase tracking-wider">待审批</span>
                </div>
                
                <div className="bg-[#F8F8F8] rounded p-5 border border-gray-200 text-sm text-gray-700 grid grid-cols-2 gap-y-4 gap-x-8">
                  <div><span className="text-xs text-gray-500 block mb-1 uppercase tracking-wider font-bold">施工单位</span><span className="font-bold text-[#1E3932]">{o.supplier}</span></div>
                  <div><span className="text-xs text-gray-500 block mb-1 uppercase tracking-wider font-bold">施工区域</span><span className="font-bold text-[#1E3932]">{o.area}</span></div>
                  <div className="col-span-2"><span className="text-xs text-gray-500 block mb-1 uppercase tracking-wider font-bold">施工时间</span> <span className="font-bold text-[#1E3932]">{o.startTime} 至 {o.endTime}</span></div>
                </div>

                <div className="mt-4 p-4 rounded bg-[#FCF8F3] border border-orange-200 flex items-start gap-3 text-sm">
                   <AlertTriangle className="text-orange-500 shrink-0 mt-0.5" size={18} />
                   <div>
                     <p className="text-[#1E3932] font-bold mb-1">风险评估：{o.risk}</p>
                     <p className="text-gray-600 text-xs">{o.control}</p>
                     <div className="mt-3 flex gap-3 text-[10px] font-bold uppercase tracking-wider">
                        <span className="bg-white px-2 py-1 rounded text-orange-700 border border-orange-200">特种作业: {o.specialWork}</span>
                        <span className="bg-white px-2 py-1 rounded text-orange-700 border border-orange-200">特殊物料: {o.specialMaterials}</span>
                     </div>
                   </div>
                </div>
              </div>

              <div className="flex flex-col gap-3 shrink-0 pt-2 lg:border-l lg:border-gray-100 lg:pl-8 justify-center">
                 <button onClick={() => handleApprove(o.id)} className="bg-[#006241] hover:bg-[#00754A] text-white px-8 py-3 rounded shadow flex items-center justify-center gap-2 text-sm font-bold transition-all w-full md:w-48">
                   同意并下发
                 </button>
                 <button onClick={() => handleReject(o.id)} className="bg-white border border-gray-300 text-gray-600 hover:bg-gray-50 hover:text-red-600 px-8 py-3 rounded flex items-center justify-center gap-2 text-sm font-bold transition-all w-full md:w-48 shadow-sm">
                   驳回整改
                 </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
