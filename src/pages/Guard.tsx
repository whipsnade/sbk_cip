import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { Search, ChevronRight, AlertCircle, CheckCircle, ShieldAlert, CreditCard, ArrowLeft, Users, UserPlus } from 'lucide-react';

export const GuardHome = () => {
  const { setView, orders, setCurrentOrderId } = useAppContext();
  const [code, setCode] = useState('');

  const handleVerify = () => {
    const order = orders.find(o => o.inviteCode === code || o.id === code);
    if(order) {
      setCurrentOrderId(order.id);
      if (order.status === 'IN_PROGRESS') {
        setView('GUARD_EXIT_DETAIL');
      } else {
        setView('GUARD_VERIFY');
      }
    } else {
      alert("未找到该邀请码对应的施工单！请提醒供应商先填报资料，或确认授权状态。");
    }
  }

  const pendingEntry = orders.filter(o => o.status === 'PENDING_GUARD');
  const inProgressEntry = orders.filter(o => o.status === 'IN_PROGRESS');

  const totalCardsIssuedToday = orders.reduce((sum, o) => sum + (o.workers || []).filter(w => w.status === 'ENTERED' || w.status === 'EXITED').length, 0);
  const activePersonnelCount = orders.reduce((sum, o) => sum + (o.workers || []).filter(w => w.status === 'ENTERED').length, 0);
  const pendingPersonnelCount = pendingEntry.reduce((sum, o) => sum + (o.workers || []).filter(w => w.status === 'READY').length, 0);

  return (
    <div className="flex flex-col h-full animate-in fade-in duration-300">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 shrink-0">
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 flex items-center justify-between">
           <div>
             <p className="text-xs font-bold text-gray-500 uppercase">今日发卡总数</p>
             <h3 className="text-2xl font-bold text-[#1E3932] mt-1">{totalCardsIssuedToday} <span className="text-sm font-normal text-gray-500">张</span></h3>
           </div>
           <div className="w-10 h-10 bg-[#E8F0ED] rounded-full flex items-center justify-center text-[#006241]">
             <CreditCard size={20} />
           </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 flex items-center justify-between">
           <div>
             <p className="text-xs font-bold text-gray-500 uppercase">在园人员总数</p>
             <h3 className="text-2xl font-bold text-[#1E3932] mt-1">{activePersonnelCount} <span className="text-sm font-normal text-gray-500">人</span></h3>
           </div>
           <div className="w-10 h-10 bg-[#E8F0ED] rounded-full flex items-center justify-center text-[#006241]">
             <Users size={20} />
           </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 flex items-center justify-between">
           <div>
             <p className="text-xs font-bold text-gray-500 uppercase">待入园人数</p>
             <h3 className="text-2xl font-bold text-[#1E3932] mt-1">{pendingPersonnelCount} <span className="text-sm font-normal text-gray-500">人</span></h3>
           </div>
           <div className="w-10 h-10 bg-orange-50 rounded-full flex items-center justify-center text-orange-600">
             <UserPlus size={20} />
           </div>
        </div>
      </div>

      <div className="flex gap-6 flex-1 min-h-0">
        {/* Left Column wrapper styling for full height, even though we just center things typically, we'll follow the overall layout */}
        <div className="w-[380px] flex flex-col space-y-4">
          <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200 shrink-0">
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
          <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
            <h3 className="text-xs font-bold uppercase tracking-tight text-[#1E3932]">待入园 ({pendingEntry.length})</h3>
          </div>
          
          <div className="flex-1 overflow-y-auto">
            {pendingEntry.map((o, idx) => (
              <div key={o.id} onClick={() => { setCurrentOrderId(o.id); setView('GUARD_VERIFY'); }} className={`p-4 cursor-pointer hover:bg-gray-100 transition-colors border-b border-gray-100 ${idx === 0 ? 'bg-[#E8F0ED] border-l-4 border-l-[#006241]' : ''}`}>
                <div className="flex justify-between items-center mb-1">
                  <p className={`text-xs font-bold ${idx === 0 ? 'text-[#1E3932]' : 'text-gray-700'}`}>{o.inviteCode} - {o.supplier}</p>
                  <span className="text-[10px] bg-orange-100 text-orange-700 px-1.5 py-0.5 rounded font-bold">待入园</span>
                </div>
                <p className="text-[11px] text-gray-500">施工项目: {o.content}</p>
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
    </div>
  );
}

export const GuardVerify = () => {
  const { orders, currentOrderId, setView, updateOrder } = useAppContext();
  const [localWorkers, setLocalWorkers] = useState(orders.find(o => o.id === currentOrderId)?.workers || []);

  const order = orders.find(o => o.id === currentOrderId);
  if(!order) return <div>Invalid Order</div>;

  const allClear = localWorkers.every(w => w.trained && w.healthCert === "有效");

  const handlePass = () => {
     if (order.status === 'PENDING_GUARD') {
       updateOrder(order.id, { status: 'IN_PROGRESS', workers: localWorkers });
     } else {
       updateOrder(order.id, { workers: localWorkers });
     }
     setView('GUARD_HOME');
  };

  const handleIntercept = () => {
     alert("已做拦截处理。原因记录已回传后台。");
     setView('GUARD_HOME');
  }

  const handleMarkTrained = (index: number) => {
    const updated = [...localWorkers];
    updated[index].trained = true;
    updated[index].abnormalReason = '';
    setLocalWorkers(updated);
    alert("已录入线下培训通过记录！");
  }

  const handleCardInputChange = (index: number, val: string) => {
    const updated = [...localWorkers];
    updated[index].cardNo = val;
    setLocalWorkers(updated);
  };

  const handleEnter = (index: number) => {
    const updated = [...localWorkers];
    if (!updated[index].cardNo) {
      alert("请输入门禁卡号！");
      return;
    }
    updated[index].status = 'ENTERED';
    setLocalWorkers(updated);
    // Auto update order to IN_PROGRESS if first entry
    if (order.status === 'PENDING_GUARD') {
      updateOrder(order.id, { status: 'IN_PROGRESS', workers: updated });
    } else {
      updateOrder(order.id, { workers: updated });
    }
    alert("已派发卡片并放行！");
  };

  const handleExit = (index: number) => {
    const updated = [...localWorkers];
    updated[index].status = 'EXITED';
    updated[index].cardNo = ''; // Collect card
    setLocalWorkers(updated);
    updateOrder(order.id, { workers: updated });
    alert("已回收门禁卡并出园！");
  };

  const pendingEntry = orders.filter(o => o.status === 'PENDING_GUARD');
  const inProgressEntry = orders.filter(o => o.status === 'IN_PROGRESS');

  return (
    <div className="flex gap-6 h-full animate-in slide-in-from-right-8 fade-in duration-300">
      
      {/* Left Column */}
      <div className="w-[380px] flex flex-col space-y-4">
        <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200 shrink-0">
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
          <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
            <h3 className="text-xs font-bold uppercase tracking-tight text-[#1E3932]">待入园 / 在园 ({pendingEntry.length + inProgressEntry.length})</h3>
          </div>
          
          <div className="flex-1 overflow-y-auto">
            {pendingEntry.map((o) => {
              const isSelected = o.id === order.id;
              return (
                <div key={o.id} onClick={() => {}} className={`p-4 border-b border-gray-100 ${isSelected ? 'bg-[#E8F0ED] border-l-4 border-l-[#006241]' : 'opacity-60 grayscale'}`}>
                  <p className={`text-xs font-bold ${isSelected ? 'text-[#1E3932]' : 'text-gray-700'}`}>{o.inviteCode} - {o.supplier} (待入园)</p>
                  <p className="text-[11px] text-gray-500 mt-1">施工项目: {o.content}</p>
                </div>
              );
            })}
            {inProgressEntry.map((o) => {
              const isSelected = o.id === order.id;
              return (
                <div key={o.id} onClick={() => {}} className={`p-4 border-b border-gray-100 ${isSelected ? 'bg-[#E8F0ED] border-l-4 border-l-[#006241]' : 'opacity-60 grayscale'}`}>
                  <p className={`text-xs font-bold ${isSelected ? 'text-[#1E3932]' : 'text-gray-700'}`}>{o.inviteCode} - {o.supplier} (已在园)</p>
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
            <p className="text-sm font-bold text-[#1E3932]">{order.area.join(', ')}</p>
          </div>
        </div>

        {/* Personnel Verification Table */}
        <div className="p-6 flex-1 overflow-y-auto">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-sm font-bold flex items-center text-[#1E3932]">
              <span className="w-2 h-2 bg-[#006241] rounded-full mr-2"></span>
              核验人员名单 ({localWorkers.length}人)
            </h4>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
             {localWorkers.map((w,i) => {
               const isOk = w.trained && w.healthCert === "有效";
               return (
                 <div key={i} className={`border p-4 rounded-lg relative overflow-hidden ${isOk ? 'border-[#006241] bg-[#F7F9F8]' : 'border-red-300 bg-red-50'}`}>
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
                             <span className="text-red-600 font-bold italic">{w.healthCert} (拦截)</span>
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
                             <span className="text-red-600 font-bold">已过期或未培训</span>
                           )}
                         </div>
                       </div>
                     </div>
                   </div>
                   <div className="mt-4 flex flex-col gap-2">
                     {isOk ? (
                       <>
                         <div className="flex items-center gap-2">
                           <input 
                             type="text" 
                             placeholder={w.status === 'ENTERED' ? '已绑定卡号' : '输入或刷取门禁卡号'} 
                             value={w.cardNo || ''}
                             onChange={(e) => handleCardInputChange(i, e.target.value)}
                             readOnly={w.status === 'ENTERED'}
                             className="flex-1 bg-white border border-gray-300 px-2 py-1.5 text-xs rounded focus:outline-[#006241]"
                           />
                         </div>
                         <div className="flex gap-2">
                           {w.status !== 'ENTERED' ? (
                             <button onClick={() => handleEnter(i)} className="flex-1 py-1.5 bg-[#006241] text-white text-[11px] font-bold rounded hover:bg-[#00754A] shadow-sm">
                               派发门禁卡并放行
                             </button>
                           ) : (
                             <button disabled className="flex-1 py-1.5 bg-gray-100 text-gray-400 text-[11px] font-bold rounded cursor-not-allowed">
                               已入园
                             </button>
                           )}
                         </div>
                       </>
                     ) : (
                       <div className="flex gap-2 w-full">
                         {!w.trained && (
                           <button onClick={() => handleMarkTrained(i)} className="flex-1 py-1.5 bg-[#006241] text-white text-[11px] font-bold rounded hover:bg-[#00754A]">录入线下培训</button>
                         )}
                         <button className="flex-1 py-1.5 bg-white border border-red-300 text-red-600 text-[11px] font-bold rounded">拒绝放行</button>
                       </div>
                     )}
                   </div>
                   {isOk && <div className="absolute top-0 right-0 px-2 py-1 bg-[#006241] text-white text-[10px] rounded-bl-lg font-medium">{w.status === 'ENTERED' ? '已入园' : '满足条件'}</div>}
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
               <input type="checkbox" defaultChecked className="w-4 h-4 accent-[#006241]" /> <span>已收押相关人员证件</span>
             </label>
          </div>
          <div className="flex space-x-3 self-end lg:self-auto">
            <button onClick={handleIntercept} className="px-8 py-3 bg-white border border-red-500 text-red-600 font-bold rounded flex-1 lg:flex-none text-sm hover:bg-red-50 transition-colors">
              拦截异常人员
            </button>
            <button onClick={handlePass} disabled={!allClear} className={`px-12 py-3 font-bold rounded shadow-sm flex-1 lg:flex-none text-sm transition-colors ${
              allClear ? 'bg-[#006241] text-white hover:bg-[#00754A]' : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}>
              完成处理返回主页
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export const GuardExit = () => {
  const { orders, currentOrderId, setView, updateOrder } = useAppContext();
  const [localWorkers, setLocalWorkers] = useState(orders.find(o => o.id === currentOrderId)?.workers || []);

  const order = orders.find(o => o.id === currentOrderId);
  if(!order) return <div>Invalid Order</div>;

  const [exitCardNo, setExitCardNo] = useState('');

  const handleExit = (index: number) => {
    const updated = [...localWorkers];
    updated[index].status = 'EXITED';
    updated[index].cardNo = ''; // Collect card
    setLocalWorkers(updated);
    updateOrder(order.id, { workers: updated });
    alert("已回收门禁卡并登记离厂！");
  };

  const handleExitByCardNo = () => {
    if(!exitCardNo) return alert('请输入门禁卡号');
    const index = localWorkers.findIndex(w => w.cardNo === exitCardNo && w.status !== 'EXITED');
    if (index !== -1) {
      handleExit(index);
      setExitCardNo('');
    } else {
      alert("未找到该门禁卡号对应的在园人员，或该卡已回收！");
    }
  };

  const handleCompleteExit = () => {
     if(localWorkers.every(w => w.status === 'EXITED')) {
        updateOrder(order.id, { status: 'COMPLETED', workers: localWorkers });
        alert("所有人员已离厂，订单已完结！");
     } else {
        updateOrder(order.id, { workers: localWorkers });
     }
     setView('GUARD_EXIT');
  }

  const allExited = localWorkers.every(w => w.status === 'EXITED');

  return (
    <div className="flex gap-6 h-full animate-in slide-in-from-right-8 fade-in duration-300">
      <div className="w-[380px] flex flex-col space-y-4">
        <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200 shrink-0 relative overflow-hidden">
           <div className="absolute top-0 right-0 w-24 h-24 bg-[#006241]/5 rounded-bl-full -z-10"></div>
           <button onClick={() => setView('GUARD_EXIT')} className="absolute right-4 top-4 p-1.5 bg-gray-100 text-gray-500 rounded hover:bg-gray-200 transition-colors">
              <ArrowLeft size={18} />
           </button>
           <label className="block text-xs font-bold text-[#006241] uppercase tracking-wider mb-3 flex items-center gap-2">
              <span className="w-1.5 h-4 bg-[#006241] rounded-full inline-block"></span> 离厂注销
           </label>
           <h2 className="text-xl font-bold text-[#1E3932] leading-tight mb-2">{order.supplier}</h2>
           <p className="text-sm text-gray-500">{order.content}</p>
           
           <div className="mt-6 space-y-3">
             <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500">作业区域</span>
                <span className="font-bold text-[#1E3932]">{order.area.join(', ')}</span>
             </div>
             <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500">计划时间</span>
                <span className="font-bold text-[#1E3932] text-right">{order.startTime.split(' ')[0]}<br/>至 {order.endTime.split(' ')[0]}</span>
             </div>
             <div className="flex justify-between items-center text-sm pt-3 border-t border-gray-100">
                <span className="text-gray-500">在园人员</span>
                <span className="font-bold text-[#006241]">{localWorkers.filter(w => w.status !== 'EXITED').length} / {localWorkers.length}人在园</span>
             </div>
           </div>
        </div>
        <div className="bg-white flex-1 rounded-lg shadow-sm border border-gray-200 overflow-hidden flex flex-col">
           <div className="p-4 border-b border-gray-100 bg-gray-50">
             <h3 className="text-xs font-bold uppercase tracking-tight text-[#1E3932]">门禁卡回收区</h3>
           </div>
           <div className="p-6 flex flex-col items-center justify-center flex-1">
             <div className="w-24 h-24 bg-[#F2F0EB] rounded-full flex items-center justify-center mb-4">
                <CreditCard size={36} className="text-[#006241]" />
             </div>
             <p className="text-sm font-bold text-gray-700 mb-2">请输入门禁卡号进行回收</p>
             <div className="w-full mt-2 relative">
               <input 
                 type="text" 
                 placeholder="输入卡号" 
                 value={exitCardNo}
                 onChange={e => setExitCardNo(e.target.value)}
                 className="w-full pl-4 pr-12 py-3 bg-[#F8F8F8] border border-gray-200 rounded text-sm focus:outline-none focus:border-[#006241] placeholder-gray-300"
               />
               <button onClick={handleExitByCardNo} className="absolute right-2 top-2 p-1.5 bg-[#006241] text-white rounded hover:bg-[#00754A]">
                 <Search size={18} className="text-white" />
               </button>
             </div>
             <p className="text-xs text-gray-400 text-center mt-4">系统将自动匹配人员并办理离厂</p>
           </div>
        </div>
      </div>

      <div className="flex-1 bg-white rounded-lg shadow-sm border border-gray-200 flex flex-col overflow-hidden">
        <div className="p-4 border-b border-gray-100 bg-[#F8F8F8] flex justify-between items-center shrink-0">
          <h3 className="font-bold text-[#1E3932] flex items-center gap-2">
            人员离厂列表 
            <span className="text-xs font-normal text-gray-500 bg-white px-2 py-0.5 rounded border border-gray-200">共 {localWorkers.length} 人</span>
          </h3>
        </div>
        <div className="flex-1 overflow-y-auto p-6 bg-gray-50/50">
           <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
             {localWorkers.map((w, i) => {
               const hasExited = w.status === 'EXITED';
               return (
                 <div key={i} className={`bg-white rounded-lg border p-4 shadow-sm relative transition-all ${hasExited ? 'border-gray-200 opacity-60' : 'border-[#006241]/30 hover:border-[#006241]'}`}>
                   <div className="flex gap-4">
                     <div className="w-14 h-16 bg-gray-100 rounded flex-shrink-0 flex items-center justify-center border border-gray-200 overflow-hidden">
                       <span className="text-gray-400 text-xs">照片</span>
                     </div>
                     <div className="flex-1 min-w-0">
                       <div className="flex justify-between items-start">
                         <div>
                           <h4 className="font-bold text-[#1E3932]">{w.name}</h4>
                           <p className="text-xs text-gray-500 mt-1">ID: {w.idCard}</p>
                         </div>
                       </div>
                       
                       <div className="mt-4 flex gap-2">
                          {!hasExited ? (
                            <button onClick={() => handleExit(i)} className="flex-1 py-2 bg-white border border-red-400 text-red-600 text-xs font-bold rounded hover:bg-red-50 shadow-sm">
                              回收卡片并离厂
                            </button>
                          ) : (
                            <button disabled className="flex-1 py-2 bg-gray-100 text-gray-400 text-xs font-bold rounded cursor-not-allowed border border-gray-200">
                              已离厂
                            </button>
                          )}
                       </div>
                     </div>
                   </div>
                   {hasExited && <div className="absolute top-0 right-0 px-2 py-1 bg-gray-200 text-gray-500 text-[10px] rounded-bl-lg font-bold">已离厂</div>}
                   {!hasExited && <div className="absolute top-0 right-0 px-2 py-1 bg-orange-100 text-orange-700 text-[10px] rounded-bl-lg font-bold">在园</div>}
                 </div>
               )
             })}
           </div>
        </div>
        <div className="p-6 bg-[#F8F8F8] border-t border-gray-100 rounded-b-lg flex justify-between items-center shrink-0">
          <div className="text-sm font-bold text-gray-600">
            {allExited ? '所有人员均已离厂' : `还有 ${localWorkers.filter(w => w.status !== 'EXITED').length} 人未办理离厂`}
          </div>
          <button onClick={handleCompleteExit} className="px-8 py-3 bg-[#006241] text-white font-bold rounded shadow-sm text-sm hover:bg-[#00754A] transition-colors">
            完成登记返回
          </button>
        </div>
      </div>
    </div>
  );
}

export const GuardExitHome = () => {
  const { setView, orders, setCurrentOrderId } = useAppContext();
  const [code, setCode] = useState('');

  const handleVerify = () => {
    const order = orders.find(o => o.inviteCode === code || o.id === code);
    if(order && order.status === 'IN_PROGRESS') {
      setCurrentOrderId(order.id);
      setView('GUARD_EXIT_DETAIL');
    } else {
      alert("未找到对应的在园施工单，或该单尚未入园！");
    }
  }

  const inProgressEntry = orders.filter(o => o.status === 'IN_PROGRESS');

  return (
    <div className="flex flex-col h-full animate-in fade-in duration-300">
      <div className="flex gap-6 flex-1 min-h-0">
        <div className="w-[380px] flex flex-col space-y-4">
          <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200 shrink-0">
           <label className="block text-xs font-bold text-[#006241] uppercase mb-2">离厂注销查询</label>
           <div className="relative">
             <input 
               type="text" 
               placeholder="输入邀请码或施工单号..." 
               value={code}
               onChange={e => setCode(e.target.value)}
               className="w-full pl-10 pr-4 py-3 bg-[#F8F8F8] border border-gray-200 rounded text-sm focus:outline-none focus:border-[#006241] transition-colors"
             />
             <Search size={18} className="absolute left-3 top-3.5 text-gray-400" />
           </div>
           <button onClick={handleVerify} className="w-full mt-4 py-3 bg-[#006241] text-white font-bold rounded shadow-sm hover:bg-[#00754A] transition-colors flex justify-center items-center">
             查询并注销离厂 <ChevronRight size={18} className="ml-1" />
           </button>
         </div>

         <div className="bg-white flex-1 rounded-lg shadow-sm border border-gray-200 overflow-hidden flex flex-col">
           <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
             <h3 className="text-xs font-bold uppercase tracking-tight text-[#1E3932]">在园施工单 ({inProgressEntry.length})</h3>
           </div>
           
           <div className="flex-1 overflow-y-auto">
             {inProgressEntry.map((o) => (
               <div key={o.id} onClick={() => { setCurrentOrderId(o.id); setView('GUARD_EXIT_DETAIL'); }} className={`p-4 cursor-pointer hover:bg-gray-100 transition-colors border-b border-gray-100`}>
                 <div className="flex justify-between items-center mb-1">
                   <p className={`text-xs font-bold text-[#1E3932]`}>{o.inviteCode} - {o.supplier}</p>
                   <span className="text-[10px] bg-green-100 text-green-700 px-1.5 py-0.5 rounded font-bold">在园</span>
                 </div>
                 <p className="text-[11px] text-gray-500">施工项目: {o.content}</p>
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
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center text-gray-400 mb-6">
             <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
          </div>
          <p className="text-sm font-bold text-gray-500 mb-2">等待注销离厂</p>
          <p className="text-xs">在左侧输入邀请码或选择在园施工单，办理人员离厂手续</p>
       </div>
      </div>
    </div>
  );
}
