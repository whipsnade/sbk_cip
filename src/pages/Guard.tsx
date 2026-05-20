import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { Search, ChevronRight, AlertCircle, CheckCircle, ShieldAlert, CreditCard, ArrowLeft } from 'lucide-react';

export const GuardHome = () => {
  const { setView, orders, setCurrentOrderId } = useAppContext();
  const [code, setCode] = useState('');

  const handleVerify = () => {
    const order = orders.find(o => o.inviteCode === code || o.id === code);
    if(order) {
      setCurrentOrderId(order.id);
      setView('GUARD_VERIFY');
    } else {
      alert("未找到该邀请码对应的施工单！请提醒供应商先填报资料，或确认授权状态。");
    }
  }

  const pendingEntry = orders.filter(o => o.status === 'PENDING_GUARD');

  return (
    <div className="flex gap-6 h-full animate-in fade-in duration-300">
      {/* Left Column wrapper styling for full height, even though we just center things typically, we'll follow the overall layout */}
      <div className="w-[380px] flex flex-col space-y-4">
        <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200">
           <label className="block text-xs font-bold text-[#006241] uppercase mb-2">承包商核验</label>
           <div className="relative">
             <input 
               type="text" 
               value={code}
               onChange={e => setCode(e.target.value)}
               placeholder="输入邀请码/手机号/车牌号" 
               className="w-full pl-4 pr-12 py-3 bg-[#F8F8F8] border border-gray-200 rounded text-lg focus:outline-none focus:border-[#006241] placeholder-gray-300" 
               autoFocus
             />
             <button onClick={handleVerify} className="absolute right-2 top-2 p-1.5 bg-[#006241] text-white rounded hover:bg-[#00754A]">
               <Search size={22} className="text-white" />
             </button>
           </div>
           <div className="mt-4 flex gap-2">
             <button className="flex-1 py-2 bg-[#F2F0EB] text-[#1E3932] text-xs font-bold rounded flex items-center justify-center border border-gray-200">📷 扫二维码核验</button>
             <button className="flex-1 py-2 bg-white text-[#006241] text-xs font-bold rounded flex items-center justify-center border border-[#006241]">📄 刷身份证</button>
           </div>
        </div>

        <div className="bg-white flex-1 rounded-lg shadow-sm border border-gray-200 overflow-hidden flex flex-col">
          <div className="p-4 border-b border-gray-100 flex justify-between items-center">
            <h3 className="text-xs font-bold uppercase tracking-tight text-[#1E3932]">今日待入园序列 ({pendingEntry.length})</h3>
          </div>
          
          <div className="flex-1 overflow-y-auto bg-gray-50">
            {pendingEntry.map((o, idx) => (
              <div key={o.id} onClick={() => { setCode(o.inviteCode || ''); handleVerify(); }} className={`p-4 cursor-pointer hover:bg-gray-100 transition-colors border-b border-gray-100 ${idx === 0 ? 'bg-[#E8F0ED] border-l-4 border-l-[#006241]' : ''}`}>
                <p className={`text-xs font-bold ${idx === 0 ? 'text-[#1E3932]' : 'text-gray-700'}`}>{o.inviteCode} - {o.supplier}</p>
                <p className="text-[11px] text-gray-500 mt-1">施工项目: {o.content}</p>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-[10px] bg-white text-[#006241] px-1 border border-[#006241]">{o.workers.length} 人 / {o.vehicles.length} 车</span>
                  <span className="text-[10px] text-gray-400">{o.startTime.split(' ')[1]} - {o.endTime.split(' ')[1]}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex-1 bg-white rounded-lg shadow-sm border border-gray-200 flex flex-col items-center justify-center text-gray-400 p-8 text-center border-dashed">
         <ShieldAlert size={48} className="mb-4 text-gray-300" />
         <p className="text-sm font-bold text-gray-500 mb-2">等待核验</p>
         <p className="text-xs">在左侧输入邀请码或选择待入园记录，或使用演示码 <strong className="font-mono bg-gray-100 px-1 rounded text-gray-700">882319</strong></p>
      </div>
    </div>
  );
}

export const GuardVerify = () => {
  const { orders, currentOrderId, setView, updateOrder } = useAppContext();
  const order = orders.find(o => o.id === currentOrderId);
  
  if(!order) return <div>Invalid Order</div>;

  const allClear = order.workers.every(w => w.trained && w.healthCert === "有效");

  const handlePass = () => {
     updateOrder(order.id, { status: 'IN_PROGRESS' });
     alert("已登记发卡，允许放行进厂！");
     setView('GUARD_HOME');
  };

  const handleIntercept = () => {
     alert("已做拦截处理。原因记录已回传后台。");
     setView('GUARD_HOME');
  }

  // To simulate the two-column view, we reuse the left column from GuardHome, but read-only or same logic
  const pendingEntry = orders.filter(o => o.status === 'PENDING_GUARD');

  return (
    <div className="flex gap-6 h-full animate-in slide-in-from-right-8 fade-in duration-300">
      
      {/* Left Column */}
      <div className="w-[380px] flex flex-col space-y-4">
        <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200">
           <label className="block text-xs font-bold text-[#006241] uppercase mb-2">承包商核验</label>
           <div className="relative">
             <input 
               type="text" 
               defaultValue={order.inviteCode || order.id}
               className="w-full pl-4 pr-12 py-3 bg-[#F8F8F8] border border-gray-200 rounded text-lg focus:outline-none focus:border-[#006241]" 
               readOnly
             />
             <button onClick={() => setView('GUARD_HOME')} className="absolute right-2 top-2 p-1.5 bg-gray-200 text-gray-600 rounded">
               <ArrowLeft size={22} className="text-gray-600" />
             </button>
           </div>
           <div className="mt-4 flex gap-2">
             <button className="flex-1 py-2 bg-[#F2F0EB] text-[#1E3932] text-xs font-bold rounded flex items-center justify-center border border-gray-200">📷 扫二维码核验</button>
             <button className="flex-1 py-2 bg-white text-[#006241] text-xs font-bold rounded flex items-center justify-center border border-[#006241]">📄 刷身份证</button>
           </div>
        </div>

        <div className="bg-white flex-1 rounded-lg shadow-sm border border-gray-200 overflow-hidden flex flex-col">
          <div className="p-4 border-b border-gray-100 flex justify-between items-center">
            <h3 className="text-xs font-bold uppercase tracking-tight text-[#1E3932]">今日待入园序列 ({pendingEntry.length})</h3>
          </div>
          
          <div className="flex-1 overflow-y-auto bg-gray-50">
            {pendingEntry.map((o) => {
              const isSelected = o.id === order.id;
              return (
                <div key={o.id} onClick={() => {}} className={`p-4 border-b border-gray-100 ${isSelected ? 'bg-[#E8F0ED] border-l-4 border-l-[#006241]' : 'opacity-60 grayscale'}`}>
                  <p className={`text-xs font-bold ${isSelected ? 'text-[#1E3932]' : 'text-gray-700'}`}>{o.inviteCode} - {o.supplier}</p>
                  <p className="text-[11px] text-gray-500 mt-1">施工项目: {o.content}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Right Column: Verification Result Detail */}
      <div className="flex-1 bg-white rounded-lg shadow-md border-2 border-[#006241] flex flex-col h-full overflow-hidden">
        <div className="p-6 border-b border-gray-100 bg-white flex justify-between items-start shrink-0">
          <div>
            <div className="flex items-center space-x-3 mb-1">
              <span className="text-2xl font-bold text-[#1E3932]">{order.inviteCode || order.id}</span>
              <span className="px-2 py-0.5 bg-[#006241] text-white text-[11px] rounded">施工单有效</span>
            </div>
            <p className="text-gray-500 text-sm italic">{order.supplier} · {order.content}</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-400 mb-1">作业区域</p>
            <p className="text-sm font-bold text-[#1E3932]">{order.area}</p>
          </div>
        </div>

        {/* Personnel Verification Table */}
        <div className="p-6 flex-1 overflow-y-auto">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-sm font-bold flex items-center text-[#1E3932]">
              <span className="w-2 h-2 bg-[#006241] rounded-full mr-2"></span>
              核验人员名单 ({order.workers.length}人)
            </h4>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
             {order.workers.map((w,i) => {
               const isOk = w.trained && w.healthCert === "有效";
               return (
                 <div key={i} className={`border p-4 rounded-lg relative overflow-hidden ${isOk ? 'border-[#006241] bg-[#F7F9F8]' : 'border-orange-300 bg-orange-50'}`}>
                   <div className="flex items-start space-x-4">
                     <div className="w-16 h-20 bg-gray-200 rounded overflow-hidden flex items-center justify-center text-gray-400 text-xs text-center border border-gray-300">
                       {isOk ? '证件照' : '未上传'}
                     </div>
                     <div className="flex-1">
                       <p className="text-base font-bold text-[#1E3932]">{w.name}</p>
                       <p className="text-xs text-gray-500 mt-1">ID: {w.idCard}</p>
                       <div className="mt-3 space-y-1.5">
                         <div className="flex justify-between text-[11px]">
                           <span className="text-gray-500">健康证</span>
                           {w.healthCert === "有效" ? (
                             <span className="text-[#006241] font-bold">已验证</span>
                           ) : (
                             <span className="text-red-500 font-bold italic">未上传</span>
                           )}
                         </div>
                         {w.specialCert !== '无' && (
                           <div className="flex justify-between text-[11px]">
                             <span className="text-gray-500">{w.specialCert}</span><span className="text-[#006241] font-bold">有效</span>
                           </div>
                         )}
                         <div className="flex justify-between text-[11px]">
                           <span className="text-gray-500">安全培训</span>
                           {w.trained ? (
                             <span className="text-[#006241] font-bold">合格</span>
                           ) : (
                             <span className="text-orange-500 font-bold">需现场培训</span>
                           )}
                         </div>
                       </div>
                     </div>
                   </div>
                   <div className="mt-4 flex gap-2">
                     {isOk ? (
                       <>
                         <button className="flex-1 py-1.5 bg-[#006241] text-white text-[11px] font-bold rounded hover:bg-[#00754A]">核验通过</button>
                         <button className="px-2 py-1.5 bg-white border border-gray-200 text-gray-500 text-[11px] rounded hover:bg-gray-50">拒绝</button>
                       </>
                     ) : (
                       <button className="flex-1 py-1.5 bg-orange-500 text-white text-[11px] font-bold rounded italic hover:bg-orange-600">补交材料 / 培训</button>
                     )}
                   </div>
                   {isOk && <div className="absolute top-0 right-0 px-2 py-1 bg-[#006241] text-white text-[10px] rounded-bl-lg font-medium">证件齐全</div>}
                 </div>
               )
             })}
          </div>

          {order.vehicles.length > 0 && (
            <>
              <h4 className="text-sm font-bold mb-3 flex items-center text-[#1E3932]">
                <span className="w-2 h-2 bg-[#006241] rounded-full mr-2"></span>
                核验车辆信息 ({order.vehicles.length}辆)
              </h4>
              <div className="space-y-3">
                {order.vehicles.map((v, i) => (
                  <div key={i} className="bg-gray-50 p-4 rounded border border-dashed border-gray-300">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="px-3 py-1 bg-white border border-gray-800 text-gray-800 font-mono text-lg rounded shadow-sm">{v.plate}</div>
                        <div>
                          <p className="text-xs font-bold text-[#1E3932]">{v.type}</p>
                          <p className="text-[10px] text-gray-400 mt-1">司机: {v.driver}</p>
                        </div>
                      </div>
                      <span className="text-[#006241] text-xs font-bold italic border border-[#006241]/20 px-2 py-1 rounded bg-[#006241]/5">✓ 车牌匹配</span>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Verification Action Footer */}
        <div className="p-6 bg-[#F8F8F8] border-t border-gray-100 rounded-b-lg flex flex-col lg:flex-row lg:items-center justify-between gap-4 shrink-0">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 lg:gap-6">
             <label className="flex items-center space-x-2 text-xs font-bold cursor-pointer text-[#1E3932]">
               <input type="checkbox" defaultChecked className="w-4 h-4 accent-[#006241]" /> <span>已收押身份证 ({order.workers.length}张)</span>
             </label>
             <div className="flex items-center space-x-2">
               <span className="text-xs font-bold text-[#1E3932]">绑定卡号:</span>
               <input type="text" placeholder="多张以逗号分隔" className="bg-white border border-gray-300 px-3 py-1.5 text-xs w-40 rounded focus:outline-[#006241] focus:border-[#006241]" />
             </div>
          </div>
          <div className="flex space-x-3 self-end lg:self-auto">
            <button onClick={handleIntercept} className="px-8 py-3 bg-white border border-[#006241] text-[#006241] font-bold rounded flex-1 lg:flex-none text-sm hover:bg-gray-50 transition-colors">
              拒绝入园
            </button>
            <button onClick={handlePass} disabled={!allClear} className={`px-12 py-3 font-bold rounded shadow-sm flex-1 lg:flex-none text-sm transition-colors ${
              allClear ? 'bg-[#006241] text-white hover:bg-[#00754A]' : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}>
              确认放行
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
