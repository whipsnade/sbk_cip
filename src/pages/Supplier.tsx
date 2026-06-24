import React from 'react';
import { useAppContext } from '../context/AppContext';
import { Mail, CheckCircle2, UserPlus, Car, FileUp, ChevronRight, AlertTriangle, Users, FileText, Check, Plus, Trash2, Video, Calendar, Upload, X, Image as ImageIcon } from 'lucide-react';

export const SupplierMobileHome = () => {
  const { setView, orders, setCurrentOrderId } = useAppContext();
  
  // Pending actions (orders that need workers)
  const pendingOrders = orders.filter(o => o.status === 'PENDING_APPROVER' || o.status === 'PENDING_GUARD');
  
  const handleOpenOrder = (id: string) => {
    setCurrentOrderId(id);
    setView('SUPPLIER_FORM');
  }

  return (
    <div className="flex flex-col h-full bg-[#F2F0EB]">
      <div className="bg-[#1E3932] text-white p-6 shadow-sm relative shrink-0">
        <h1 className="text-xl font-bold mb-1">供应商自助终端</h1>
        <p className="text-sm text-green-100 opacity-90">上海机械工程有限公司</p>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        <div className="grid grid-cols-2 gap-3">
           <div onClick={() => setView('SUPPLIER_MOBILE_PERSONNEL')} className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 flex flex-col justify-between cursor-pointer active:scale-95 transition-transform">
              <Users size={24} className="text-[#006241] mb-2" />
              <div className="font-bold text-lg text-[#1E3932]">12 <span className="text-xs text-gray-500 font-normal">人在库</span></div>
              <p className="text-xs text-gray-500 mt-1">员工与资质管理</p>
           </div>
           <div onClick={() => setView('SUPPLIER_MOBILE_VEHICLES')} className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 flex flex-col justify-between cursor-pointer active:scale-95 transition-transform">
              <Car size={24} className="text-[#006241] mb-2" />
              <div className="font-bold text-lg text-[#1E3932]">3 <span className="text-xs text-gray-500 font-normal">车在库</span></div>
              <p className="text-xs text-gray-500 mt-1">车辆与车牌管理</p>
           </div>
        </div>

        <div>
          <h2 className="text-sm font-bold text-[#1E3932] mb-3 uppercase tracking-wider flex items-center gap-2">
            <AlertTriangle size={16} className="text-orange-500" />
            待处理事项
          </h2>
          {pendingOrders.length === 0 ? (
            <div className="bg-white p-6 rounded-xl border border-gray-200 text-center text-gray-500 shadow-sm text-sm">
              暂无待处理的施工单
            </div>
          ) : (
            <div className="space-y-3">
              {pendingOrders.map(o => (
                <div key={o.id} onClick={() => handleOpenOrder(o.id)} className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm active:scale-[0.98] transition-transform cursor-pointer relative overflow-hidden">
                  {o.status === 'PENDING_APPROVER' && <div className="absolute top-0 right-0 bg-red-500 text-white text-[10px] px-2 py-0.5 rounded-bl font-bold">需报备人员</div>}
                  {o.status === 'PENDING_GUARD' && <div className="absolute top-0 right-0 bg-orange-500 text-white text-[10px] px-2 py-0.5 rounded-bl font-bold">待进场核验</div>}
                  <div className="flex justify-between items-start mb-2">
                    <p className="font-bold text-[#1E3932]">{o.content}</p>
                    <ChevronRight size={18} className="text-gray-400" />
                  </div>
                  <div className="text-xs text-gray-500 space-y-1 mb-3">
                    <p>单号: {o.id}</p>
                    <p>区域: {o.area.join(', ')}</p>
                    <p>时间: {o.startTime.split(' ')[0]} 至 {o.endTime.split(' ')[0]}</p>
                  </div>
                  {o.status === 'PENDING_GUARD' && o.inviteCode && (
                    <div className="bg-[#F7F9F8] border border-gray-200 rounded p-2 flex items-center justify-between">
                      <span className="text-xs text-[#006241] font-bold">已生成入场核验码</span>
                      <span className="font-mono font-bold tracking-widest text-[#1E3932]">{o.inviteCode}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export const SupplierMobilePersonnel = () => {
  const { setView } = useAppContext();
  const [showAddForm, setShowAddForm] = React.useState(false);
  const [newWorker, setNewWorker] = React.useState({ name: '', idCard: '', expiryDate: '', attachments: [] as string[] });
  const [formErrors, setFormErrors] = React.useState<Record<string, boolean>>({});

  const handleAttachmentUpload = () => {
    setNewWorker(prev => ({ ...prev, attachments: [...prev.attachments, `附件_扫描件_${prev.attachments.length + 1}.pdf`] }));
    setFormErrors(prev => ({ ...prev, attachments: false }));
  };

  const handleRemoveAttachment = (idx: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setNewWorker(prev => {
      const att = [...prev.attachments];
      att.splice(idx, 1);
      return { ...prev, attachments: att };
    });
  };

  const validateAndSaveNewWorker = () => {
    const newErrors: Record<string, boolean> = {};
    if (!newWorker.name) newErrors.name = true;
    if (!newWorker.idCard) newErrors.idCard = true;
    if (!newWorker.expiryDate) newErrors.expiryDate = true;
    if (newWorker.attachments.length === 0) newErrors.attachments = true;
    
    if (Object.keys(newErrors).length > 0) {
      setFormErrors(newErrors);
      return;
    }
    
    alert("人员录入成功！");
    setShowAddForm(false);
    setNewWorker({ name: '', idCard: '', expiryDate: '', attachments: [] });
    setFormErrors({});
  };

  if (showAddForm) {
    return (
      <div className="flex flex-col h-full bg-[#F2F0EB]">
        <div className="bg-[#1E3932] text-white p-4 shadow-sm relative shrink-0 flex items-center justify-between">
          <button onClick={() => setShowAddForm(false)} className="text-white opacity-80 hover:opacity-100 flex items-center gap-1 text-sm"><ChevronRight size={16} className="rotate-180"/> 返回</button>
          <h2 className="font-bold">新增人员信息</h2>
          <div className="w-12"></div>
        </div>
        <div className="flex-1 overflow-y-auto p-4">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 space-y-4">
             <div>
               <label className="block text-xs font-bold text-gray-500 mb-1.5 uppercase">姓名 <span className="text-red-500">*</span></label>
               <input type="text" value={newWorker.name} onChange={e => { setNewWorker({...newWorker, name: e.target.value}); setFormErrors({...formErrors, name: false}); }} placeholder="请输入姓名" className={`w-full bg-[#F8F8F8] border rounded px-3 py-2.5 text-[#1E3932] focus:outline-none transition-colors ${formErrors.name ? 'border-red-500 ring-1 ring-red-500 bg-red-50' : 'border-gray-200 focus:border-[#006241]'}`} />
               {formErrors.name && <p className="text-red-500 text-[10px] mt-1 font-bold">姓名为必填项</p>}
             </div>
             <div>
               <label className="block text-xs font-bold text-gray-500 mb-1.5 uppercase">身份证号 <span className="text-red-500">*</span></label>
               <input type="text" value={newWorker.idCard} onChange={e => { setNewWorker({...newWorker, idCard: e.target.value}); setFormErrors({...formErrors, idCard: false}); }} placeholder="请输入身份证号" className={`w-full bg-[#F8F8F8] border rounded px-3 py-2.5 font-mono text-[#1E3932] focus:outline-none transition-colors ${formErrors.idCard ? 'border-red-500 ring-1 ring-red-500 bg-red-50' : 'border-gray-200 focus:border-[#006241]'}`} />
               {formErrors.idCard && <p className="text-red-500 text-[10px] mt-1 font-bold">身份证号为必填项</p>}
             </div>
             <div>
               <label className="block text-xs font-bold text-gray-500 mb-1.5 uppercase flex items-center gap-1"><Calendar size={14} /> 证件有效期至 <span className="text-red-500">*</span></label>
               <input type="date" value={newWorker.expiryDate} onChange={e => { setNewWorker({...newWorker, expiryDate: e.target.value}); setFormErrors({...formErrors, expiryDate: false}); }} className={`w-full bg-[#F8F8F8] border rounded px-3 py-2.5 text-[#1E3932] focus:outline-none transition-colors ${formErrors.expiryDate ? 'border-red-500 ring-1 ring-red-500 bg-red-50' : 'border-gray-200 focus:border-[#006241]'}`} />
               {formErrors.expiryDate && <p className="text-red-500 text-[10px] mt-1 font-bold">请选择证件有效期</p>}
             </div>
             <div>
               <label className="block text-xs font-bold text-gray-500 mb-1.5 uppercase flex items-center gap-1"><Upload size={14} /> 资质附件 (支持多图片/PDF) <span className="text-red-500">*</span></label>
               <div onClick={handleAttachmentUpload} className={`border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer transition-colors ${formErrors.attachments ? 'border-red-400 bg-red-50' : 'border-gray-300 bg-gray-50 hover:bg-gray-100'}`}>
                  <FileUp size={24} className={formErrors.attachments ? 'text-red-400 mb-2' : 'text-gray-400 mb-2'} />
                  <span className={`text-xs font-bold ${formErrors.attachments ? 'text-red-500' : 'text-gray-500'}`}>点击上传扫描件或拍照</span>
               </div>
               {formErrors.attachments && <p className="text-red-500 text-[10px] mt-1 font-bold">请至少上传一份资质附件</p>}
               
               {newWorker.attachments.length > 0 && (
                 <div className="mt-3 space-y-2">
                   {newWorker.attachments.map((att, i) => (
                     <div key={i} className="flex justify-between items-center bg-[#F7F9F8] border border-gray-200 p-2.5 rounded">
                       <span className="text-xs font-bold text-[#1E3932] flex items-center gap-2"><ImageIcon size={14} className="text-[#006241]"/> {att}</span>
                       <button type="button" onClick={(e) => handleRemoveAttachment(i, e)} className="text-gray-400 hover:text-red-500"><X size={16} /></button>
                     </div>
                   ))}
                 </div>
               )}
             </div>
          </div>
        </div>
        <div className="p-4 bg-white border-t border-gray-200 shrink-0">
           <button onClick={validateAndSaveNewWorker} className="w-full bg-[#006241] text-white py-3.5 rounded shadow font-bold hover:bg-[#00754A] active:scale-[0.98]">
             保存人员信息
           </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-[#F2F0EB]">
      <div className="bg-[#1E3932] text-white p-4 shadow-sm relative shrink-0 flex items-center justify-between">
        <button onClick={() => setView('SUPPLIER_MOBILE_HOME')} className="text-white opacity-80 hover:opacity-100 flex items-center gap-1 text-sm"><ChevronRight size={16} className="rotate-180"/> 返回</button>
        <h2 className="font-bold">员工与资质管理</h2>
        <div className="w-12"></div>
      </div>
      <div className="p-4 flex-1 overflow-y-auto">
        <button onClick={() => setShowAddForm(true)} className="w-full bg-white border border-gray-200 text-[#006241] py-3 rounded-lg shadow-sm font-bold flex items-center justify-center gap-2 mb-4 active:bg-gray-50">
          <Plus size={16} /> 录入新人员
        </button>
        <div className="space-y-3">
          <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
             <div className="flex justify-between items-start mb-2">
               <div>
                  <span className="font-bold text-[#1E3932] text-lg">张三</span>
                  <p className="text-xs text-gray-500 font-mono mt-0.5">310110199001018888</p>
               </div>
             </div>
             <div className="flex gap-2 mt-3">
               <span className="text-xs bg-green-50 text-green-700 px-2 py-1 rounded font-bold border border-green-100">厂规培训: 已完成</span>
               <span className="text-xs bg-green-50 text-green-700 px-2 py-1 rounded font-bold border border-green-100">健康证: 有效</span>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const SupplierMobileVehicles = () => {
  const { setView } = useAppContext();
  const [showAddForm, setShowAddForm] = React.useState(false);
  const [newVehicle, setNewVehicle] = React.useState({ plate: '', type: '' });
  const [formErrors, setFormErrors] = React.useState<Record<string, boolean>>({});

  const validateAndSaveNewVehicle = () => {
    const newErrors: Record<string, boolean> = {};
    if (!newVehicle.plate) newErrors.plate = true;
    if (!newVehicle.type) newErrors.type = true;
    
    if (Object.keys(newErrors).length > 0) {
      setFormErrors(newErrors);
      return;
    }
    
    alert("车辆录入成功！");
    setShowAddForm(false);
    setNewVehicle({ plate: '', type: '' });
    setFormErrors({});
  };

  if (showAddForm) {
    return (
      <div className="flex flex-col h-full bg-[#F2F0EB]">
        <div className="bg-[#1E3932] text-white p-4 shadow-sm relative shrink-0 flex items-center justify-between">
          <button onClick={() => setShowAddForm(false)} className="text-white opacity-80 hover:opacity-100 flex items-center gap-1 text-sm"><ChevronRight size={16} className="rotate-180"/> 返回</button>
          <h2 className="font-bold">新增车辆信息</h2>
          <div className="w-12"></div>
        </div>
        <div className="flex-1 overflow-y-auto p-4">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 space-y-4">
             <div>
               <label className="block text-xs font-bold text-gray-500 mb-1.5 uppercase">车牌号 <span className="text-red-500">*</span></label>
               <input type="text" value={newVehicle.plate} onChange={e => { setNewVehicle({...newVehicle, plate: e.target.value}); setFormErrors({...formErrors, plate: false}); }} placeholder="如: 沪A88888" className={`w-full bg-[#F8F8F8] border rounded px-3 py-2.5 text-[#1E3932] focus:outline-none transition-colors ${formErrors.plate ? 'border-red-500 ring-1 ring-red-500 bg-red-50' : 'border-gray-200 focus:border-[#006241]'}`} />
               {formErrors.plate && <p className="text-red-500 text-[10px] mt-1 font-bold">车牌号为必填项</p>}
             </div>
             <div>
               <label className="block text-xs font-bold text-gray-500 mb-1.5 uppercase">车辆类型 <span className="text-red-500">*</span></label>
               <select value={newVehicle.type} onChange={e => { setNewVehicle({...newVehicle, type: e.target.value}); setFormErrors({...formErrors, type: false}); }} className={`w-full bg-[#F8F8F8] border rounded px-3 py-2.5 text-[#1E3932] focus:outline-none transition-colors ${formErrors.type ? 'border-red-500 ring-1 ring-red-500 bg-red-50' : 'border-gray-200 focus:border-[#006241]'}`}>
                 <option value="">请选择车辆类型</option>
                 <option value="小型客车">小型客车 (轿车/SUV)</option>
                 <option value="小型货车">小型货车 (皮卡/小面包)</option>
                 <option value="中大型货车">中大型货车</option>
                 <option value="特种作业车">特种作业车 (吊车/泵车)</option>
               </select>
               {formErrors.type && <p className="text-red-500 text-[10px] mt-1 font-bold">请选择车辆类型</p>}
             </div>
          </div>
        </div>
        <div className="p-4 bg-white border-t border-gray-200 shrink-0">
           <button onClick={validateAndSaveNewVehicle} className="w-full bg-[#006241] text-white py-3.5 rounded shadow font-bold hover:bg-[#00754A] active:scale-[0.98]">
             保存车辆信息
           </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-[#F2F0EB]">
      <div className="bg-[#1E3932] text-white p-4 shadow-sm relative shrink-0 flex items-center justify-between">
        <button onClick={() => setView('SUPPLIER_MOBILE_HOME')} className="text-white opacity-80 hover:opacity-100 flex items-center gap-1 text-sm"><ChevronRight size={16} className="rotate-180"/> 返回</button>
        <h2 className="font-bold">车辆与车牌管理</h2>
        <div className="w-12"></div>
      </div>
      <div className="p-4 flex-1 overflow-y-auto">
        <button onClick={() => setShowAddForm(true)} className="w-full bg-white border border-gray-200 text-[#006241] py-3 rounded-lg shadow-sm font-bold flex items-center justify-center gap-2 mb-4 active:bg-gray-50">
          <Plus size={16} /> 录入新车辆
        </button>
        <div className="space-y-3">
          <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
             <div className="flex justify-between items-start mb-2">
               <div>
                  <span className="font-bold text-[#1E3932] text-lg">沪A·88888</span>
                  <p className="text-xs text-gray-500 mt-1">车辆类型: 小型货车</p>
               </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};
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
  const { setView, updateOrder, orders, currentOrderId, contractors } = useAppContext();
  
  // Try to find selected order, or default to first pending
  const targetOrder = orders.find(o => o.id === currentOrderId) || orders.find(o => o.status === 'PENDING_APPROVER') || orders[0]; 
  const supplierContractor = contractors.find(c => c.name === targetOrder?.supplier);
  const availableWorkers = supplierContractor?.workers || [];

  const [selectedWorkers, setSelectedWorkers] = React.useState<any[]>(targetOrder?.workers || []);
  const [showLibrary, setShowLibrary] = React.useState(false);
  const [showAddForm, setShowAddForm] = React.useState(false);
  
  const [newWorker, setNewWorker] = React.useState({ name: '', idCard: '', expiryDate: '', attachments: [] as string[] });
  const [formErrors, setFormErrors] = React.useState<Record<string, boolean>>({});

  const handleAttachmentUpload = () => {
    setNewWorker(prev => ({ ...prev, attachments: [...prev.attachments, `附件_扫描件_${prev.attachments.length + 1}.pdf`] }));
    setFormErrors(prev => ({ ...prev, attachments: false }));
  };

  const handleRemoveAttachment = (idx: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setNewWorker(prev => {
      const att = [...prev.attachments];
      att.splice(idx, 1);
      return { ...prev, attachments: att };
    });
  };

  const validateAndSaveNewWorker = () => {
    const newErrors: Record<string, boolean> = {};
    if (!newWorker.name) newErrors.name = true;
    if (!newWorker.idCard) newErrors.idCard = true;
    if (!newWorker.expiryDate) newErrors.expiryDate = true;
    if (newWorker.attachments.length === 0) newErrors.attachments = true;
    
    if (Object.keys(newErrors).length > 0) {
      setFormErrors(newErrors);
      return;
    }
    
    setSelectedWorkers([...selectedWorkers, {
      name: newWorker.name,
      idCard: newWorker.idCard,
      type: '临时人员',
      healthCert: '有效',
      healthCertExpiry: newWorker.expiryDate,
      specialCert: '无',
      trained: false, 
      status: 'READY'
    }]);
    
    setShowAddForm(false);
    setNewWorker({ name: '', idCard: '', expiryDate: '', attachments: [] });
    setFormErrors({});
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if(targetOrder) {
      updateOrder(targetOrder.id, {
        status: 'PENDING_GUARD',
        inviteCode: '882319',
        workers: selectedWorkers.length > 0 ? selectedWorkers : [
          { name: "张三", idCard: "310110199001018888", phone: "13800138000", healthCert: "有效", specialCert: "无", trained: true, status: 'READY' }
        ]
      });
    }
    setView('SUPPLIER_SUCCESS');
  };

  const handleToggleWorker = (worker: any) => {
    if (selectedWorkers.find(w => w.idCard === worker.idCard)) {
       setSelectedWorkers(selectedWorkers.filter(w => w.idCard !== worker.idCard));
    } else {
       setSelectedWorkers([...selectedWorkers, worker]);
    }
  };

  const handleRemoveWorker = (index: number) => {
    const updated = [...selectedWorkers];
    updated.splice(index, 1);
    setSelectedWorkers(updated);
  };

  if (showLibrary) {
    return (
      <div className="flex flex-col h-full bg-[#F2F0EB]">
        <div className="bg-[#1E3932] text-white p-4 shadow-sm relative shrink-0 flex items-center justify-between">
          <button onClick={() => setShowLibrary(false)} className="text-white opacity-80 hover:opacity-100 flex items-center gap-1 text-sm"><ChevronRight size={16} className="rotate-180"/> 返回</button>
          <h2 className="font-bold">从人员库选择</h2>
          <div className="w-12"></div> {/* spacer */}
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
           {availableWorkers.length === 0 ? (
             <div className="text-center text-gray-500 py-10">人员库为空，请先在电脑端录入人员</div>
           ) : (
             availableWorkers.map(w => {
               const isSelected = selectedWorkers.some(sw => sw.idCard === w.idCard);
               return (
                 <div key={w.idCard} onClick={() => handleToggleWorker(w)} className={`bg-white border rounded-lg p-4 shadow-sm flex items-center justify-between ${isSelected ? 'border-[#006241] ring-1 ring-[#006241]' : 'border-gray-200'}`}>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-bold text-[#1E3932]">{w.name}</span>
                        <span className="bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded text-[10px]">{w.type}</span>
                      </div>
                      <p className="text-xs text-gray-500 font-mono">{w.idCard}</p>
                      <div className="flex gap-2 mt-2">
                        {w.trained ? <span className="text-green-600 text-[10px] bg-green-50 px-1 rounded">已培训</span> : <span className="text-red-600 text-[10px] bg-red-50 px-1 rounded">未培训</span>}
                        {w.healthCert === '有效' ? <span className="text-green-600 text-[10px] bg-green-50 px-1 rounded">健康证有效</span> : <span className="text-red-600 text-[10px] bg-red-50 px-1 rounded">健康证异常</span>}
                      </div>
                    </div>
                    <div>
                      <div className={`w-6 h-6 rounded-full border flex items-center justify-center ${isSelected ? 'bg-[#006241] border-[#006241]' : 'border-gray-300'}`}>
                         {isSelected && <Check size={14} className="text-white" />}
                      </div>
                    </div>
                 </div>
               )
             })
           )}
        </div>
        <div className="p-4 bg-white border-t border-gray-200 shrink-0">
           <button onClick={() => setShowLibrary(false)} className="w-full bg-[#006241] text-white py-3 rounded shadow font-bold hover:bg-[#00754A] active:scale-[0.98]">
             确认选择 ({selectedWorkers.length}人)
           </button>
        </div>
      </div>
    );
  }

  if (showAddForm) {
    return (
      <div className="flex flex-col h-full bg-[#F2F0EB]">
        <div className="bg-[#1E3932] text-white p-4 shadow-sm relative shrink-0 flex items-center justify-between">
          <button onClick={() => setShowAddForm(false)} className="text-white opacity-80 hover:opacity-100 flex items-center gap-1 text-sm"><ChevronRight size={16} className="rotate-180"/> 返回</button>
          <h2 className="font-bold">新增人员信息</h2>
          <div className="w-12"></div>
        </div>
        <div className="flex-1 overflow-y-auto p-4">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 space-y-4">
             <div>
               <label className="block text-xs font-bold text-gray-500 mb-1.5 uppercase">姓名 <span className="text-red-500">*</span></label>
               <input type="text" value={newWorker.name} onChange={e => { setNewWorker({...newWorker, name: e.target.value}); setFormErrors({...formErrors, name: false}); }} placeholder="请输入姓名" className={`w-full bg-[#F8F8F8] border rounded px-3 py-2.5 text-[#1E3932] focus:outline-none transition-colors ${formErrors.name ? 'border-red-500 ring-1 ring-red-500 bg-red-50' : 'border-gray-200 focus:border-[#006241]'}`} />
               {formErrors.name && <p className="text-red-500 text-[10px] mt-1 font-bold">姓名为必填项</p>}
             </div>
             <div>
               <label className="block text-xs font-bold text-gray-500 mb-1.5 uppercase">身份证号 <span className="text-red-500">*</span></label>
               <input type="text" value={newWorker.idCard} onChange={e => { setNewWorker({...newWorker, idCard: e.target.value}); setFormErrors({...formErrors, idCard: false}); }} placeholder="请输入身份证号" className={`w-full bg-[#F8F8F8] border rounded px-3 py-2.5 font-mono text-[#1E3932] focus:outline-none transition-colors ${formErrors.idCard ? 'border-red-500 ring-1 ring-red-500 bg-red-50' : 'border-gray-200 focus:border-[#006241]'}`} />
               {formErrors.idCard && <p className="text-red-500 text-[10px] mt-1 font-bold">身份证号为必填项</p>}
             </div>
             <div>
               <label className="block text-xs font-bold text-gray-500 mb-1.5 uppercase flex items-center gap-1"><Calendar size={14} /> 证件有效期至 <span className="text-red-500">*</span></label>
               <input type="date" value={newWorker.expiryDate} onChange={e => { setNewWorker({...newWorker, expiryDate: e.target.value}); setFormErrors({...formErrors, expiryDate: false}); }} className={`w-full bg-[#F8F8F8] border rounded px-3 py-2.5 text-[#1E3932] focus:outline-none transition-colors ${formErrors.expiryDate ? 'border-red-500 ring-1 ring-red-500 bg-red-50' : 'border-gray-200 focus:border-[#006241]'}`} />
               {formErrors.expiryDate && <p className="text-red-500 text-[10px] mt-1 font-bold">请选择证件有效期</p>}
             </div>
             <div>
               <label className="block text-xs font-bold text-gray-500 mb-1.5 uppercase flex items-center gap-1"><Upload size={14} /> 资质附件 (支持多图片/PDF) <span className="text-red-500">*</span></label>
               <div onClick={handleAttachmentUpload} className={`border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer transition-colors ${formErrors.attachments ? 'border-red-400 bg-red-50' : 'border-gray-300 bg-gray-50 hover:bg-gray-100'}`}>
                  <FileUp size={24} className={formErrors.attachments ? 'text-red-400 mb-2' : 'text-gray-400 mb-2'} />
                  <span className={`text-xs font-bold ${formErrors.attachments ? 'text-red-500' : 'text-gray-500'}`}>点击上传扫描件或拍照</span>
               </div>
               {formErrors.attachments && <p className="text-red-500 text-[10px] mt-1 font-bold">请至少上传一份资质附件</p>}
               
               {newWorker.attachments.length > 0 && (
                 <div className="mt-3 space-y-2">
                   {newWorker.attachments.map((att, i) => (
                     <div key={i} className="flex justify-between items-center bg-[#F7F9F8] border border-gray-200 p-2.5 rounded">
                       <span className="text-xs font-bold text-[#1E3932] flex items-center gap-2"><ImageIcon size={14} className="text-[#006241]"/> {att}</span>
                       <button type="button" onClick={(e) => handleRemoveAttachment(i, e)} className="text-gray-400 hover:text-red-500"><X size={16} /></button>
                     </div>
                   ))}
                 </div>
               )}
             </div>

             <div className="mt-6 pt-4 border-t border-gray-100">
               <div className="p-3 bg-blue-50 border border-blue-100 rounded-lg flex flex-col gap-2">
                 <div className="flex justify-between items-center">
                   <span className="text-xs text-blue-800 font-bold flex items-center gap-1"><Video size={14} /> 入厂培训状态联动</span>
                   {newWorker.name && newWorker.idCard ? (
                      <span className="text-[10px] bg-orange-100 text-orange-700 px-2 py-1 rounded font-bold border border-orange-200">需进行线上培训</span>
                   ) : (
                      <span className="text-[10px] text-blue-500 bg-white px-2 py-1 rounded border border-blue-100">待完善身份信息</span>
                   )}
                 </div>
                 {newWorker.name && newWorker.idCard && (
                   <p className="text-[10px] text-blue-600">系统检测到该人员为新录入，提交后将自动分配 15 分钟厂规安全在线培训课程。</p>
                 )}
               </div>
             </div>
          </div>
        </div>
        <div className="p-4 bg-white border-t border-gray-200 shrink-0">
           <button onClick={validateAndSaveNewWorker} className="w-full bg-[#006241] text-white py-3.5 rounded shadow font-bold hover:bg-[#00754A] active:scale-[0.98]">
             保存并添加至清单
           </button>
        </div>
      </div>
    );
  }

  return (
    <div className="pb-28 animate-in slide-in-from-right-4 bg-[#F2F0EB] min-h-full">
      <div className="bg-[#1E3932] text-white p-6 pb-12 shadow-sm relative">
        <button onClick={() => setView('SUPPLIER_MOBILE_HOME')} className="absolute top-4 right-4 bg-white/20 p-2 rounded-full text-white active:bg-white/30 transition-colors">
          <ChevronRight size={16} className="rotate-180" />
        </button>
        <h1 className="text-2xl font-bold mb-2 pt-4">入园人员提报</h1>
        <p className="text-gray-300 bg-black/20 px-3 py-1 inline-block rounded text-xs font-bold uppercase tracking-wider">{targetOrder?.content}</p>
      </div>
      
      <form onSubmit={handleSubmit} className="-mt-6 px-4 space-y-5 relative z-10">
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
           <div className="flex items-center justify-between border-b border-gray-200 pb-3 mb-4">
             <h3 className="font-bold flex items-center gap-2 text-[#1E3932] uppercase tracking-wider text-sm">
               <UserPlus size={18} className="text-[#006241]" /> 进场人员清单
             </h3>
             <button type="button" onClick={() => setShowLibrary(true)} className="text-[#006241] text-xs font-bold bg-[#F7F9F8] px-2 py-1.5 rounded flex items-center gap-1 border border-gray-200">
               <Users size={12} /> 从人员库选择
             </button>
           </div>
           
           <div className="space-y-3">
             {selectedWorkers.length === 0 ? (
               <div className="text-center py-6 text-gray-400 text-sm border-2 border-dashed border-gray-200 rounded-lg">
                 请添加进场施工人员
               </div>
             ) : (
               selectedWorkers.map((w, index) => (
                 <div key={index} className="border border-gray-200 rounded-lg p-3 relative bg-gray-50">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="flex items-center gap-2">
                           <span className="font-bold text-[#1E3932]">{w.name}</span>
                           {!w.trained && <span className="bg-red-100 text-red-700 px-1 rounded text-[10px] font-bold">需线上培训</span>}
                        </div>
                        <span className="text-xs text-gray-500 font-mono mt-0.5 block">{w.idCard}</span>
                      </div>
                      <button type="button" onClick={() => handleRemoveWorker(index)} className="text-gray-400 p-1 hover:text-red-500 active:scale-95">
                        <Trash2 size={16} />
                      </button>
                    </div>
                    {!w.trained && (
                      <div className="mt-3 pt-3 border-t border-gray-200 flex items-center justify-between">
                         <span className="text-xs text-gray-600 flex items-center gap-1"><Video size={14} className="text-orange-500"/> 厂规安全培训 (15分钟)</span>
                         <button type="button" className="text-white bg-orange-500 px-2 py-1 rounded text-[10px] font-bold shadow-sm active:bg-orange-600">去学习</button>
                      </div>
                    )}
                 </div>
               ))
             )}
           </div>

           <button type="button" onClick={() => setShowLibrary(true)} className="w-full mt-4 py-3 border border-dashed border-[#006241] text-[#006241] rounded-lg text-sm font-bold bg-[#F7F9F8] flex items-center justify-center gap-2 active:bg-[#E8F0ED] transition-colors">
              <Users size={16} /> 从人员库添加
           </button>
           <button type="button" onClick={() => setShowAddForm(true)} className="w-full mt-3 py-3 border border-gray-200 text-gray-600 rounded-lg text-sm font-bold bg-white shadow-sm flex items-center justify-center gap-2 active:bg-gray-50 transition-colors">
              <Plus size={16} /> 录入新人员
           </button>
        </div>

        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
           <h3 className="font-bold border-b border-gray-200 pb-3 mb-4 flex items-center gap-2 text-[#1E3932] uppercase tracking-wider text-sm">
             <Car size={18} className="text-[#006241]" /> 工程车辆登记
           </h3>
           <button type="button" className="w-full py-3 bg-gray-50 border border-gray-200 text-gray-600 rounded-lg text-sm font-bold shadow-sm active:bg-gray-100 flex items-center justify-center gap-2">
              <Plus size={16} /> 新增车牌号
           </button>
        </div>
        
        <div className="fixed bottom-0 sm:absolute sm:bottom-0 left-0 right-0 p-5 bg-white border-t border-gray-200 z-20 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] sm:shadow-none">
          <button type="submit" disabled={selectedWorkers.length === 0} className={`w-full py-3.5 rounded font-bold text-base shadow transition-colors active:scale-[0.98] ${selectedWorkers.length === 0 ? 'bg-gray-300 text-gray-500' : 'bg-[#006241] text-white hover:bg-[#00754A]'}`}>
            确认资料无误，提交核验
          </button>
        </div>
      </form>
    </div>
  );
}

export const SupplierSuccess = () => {
    const { setView } = useAppContext();
    return (
      <div className="flex flex-col items-center justify-center h-full p-6 animate-in zoom-in-95 text-center bg-[#F2F0EB]">
        <div className="w-20 h-20 bg-[#006241]/10 rounded-full flex items-center justify-center text-[#006241] mb-6 shadow-sm border border-[#006241]/20">
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
        <div className="mt-8">
           <button onClick={() => setView('SUPPLIER_MOBILE_HOME')} className="text-[#006241] font-bold text-sm bg-white border border-gray-200 px-6 py-2 rounded shadow-sm">返回工作台</button>
        </div>
      </div>
    );
  }
