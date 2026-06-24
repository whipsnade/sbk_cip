import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { Plus, Search, FileText, AlertTriangle, Users, Clock, ArrowRight } from 'lucide-react';

const StatusBadge: React.FC<{status: string}> = ({status}) => {
  const map: Record<string, {label: string, color: string}> = {
    'DRAFT': {label: '草稿', color: 'bg-gray-100 text-gray-700'},
    'PENDING_APPROVER': {label: '待审批', color: 'bg-yellow-50 text-yellow-700 border-yellow-200'},
    'REJECTED': {label: '已驳回', color: 'bg-red-50 text-red-700 border-red-200'},
    'PENDING_SUPPLIER': {label: '待供应商填报', color: 'bg-blue-50 text-blue-700 border-blue-200'},
    'PENDING_GUARD': {label: '待门卫核验', color: 'bg-orange-50 text-orange-700 border-orange-200'},
    'IN_PROGRESS': {label: '进行中', color: 'bg-[#006241]/10 text-[#006241] border-[#006241]/20'},
    'FINISHED': {label: '已结束', color: 'bg-gray-100 text-gray-600 border-gray-200'},
  };
  const config = map[status] || map['DRAFT'];
  return <span className={`px-2 py-0.5 text-xs font-medium rounded border ${config.color}`}>{config.label}</span>;
}

export const AdminDashboard = () => {
  const { setView, orders, contractors } = useAppContext();
  
  const todayOrders = orders.filter(o => o.startTime.startsWith('2023-10-24')).length;
  const pendingOrders = orders.filter(o => o.status === 'PENDING_AREA' || o.status === 'PENDING_DEPT' || o.status === 'PENDING_EHS').length;
  const activeWorkers = orders.flatMap(o => o.workers).filter(w => w.status === 'ENTERED').length;
  const riskContractors = contractors.filter(c => c.status === 'RISK').length;

  return (
    <div className="space-y-6 animate-in fade-in duration-500 h-full overflow-y-auto pb-8">
      <h2 className="text-xl font-bold text-[#1E3932]">首页仪表盘</h2>
      
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: '今日施工单', value: todayOrders || '12', icon: FileText, color: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-100' },
          { label: '待审批单据', value: pendingOrders || '3', icon: Clock, color: 'text-orange-600', bg: 'bg-orange-50', border: 'border-orange-100' },
          { label: '当前在场人员', value: activeWorkers || '28', icon: Users, color: 'text-[#006241]', bg: 'bg-[#F7F9F8]', border: 'border-[#006241]/20' },
          { label: '风险承包商', value: riskContractors || '1', icon: AlertTriangle, color: 'text-red-600', bg: 'bg-red-50', border: 'border-red-100' },
        ].map((stat, i) => (
          <div key={i} className={`bg-white p-5 rounded-lg border shadow-sm flex items-center justify-between ${stat.border}`}>
            <div>
              <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">{stat.label}</p>
              <p className="text-2xl font-bold text-[#1E3932]">{stat.value}</p>
            </div>
            <div className={`p-3 rounded ${stat.bg}`}>
              <stat.icon className={stat.color} size={24} />
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
         <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
           <h3 className="text-sm font-bold text-[#1E3932] uppercase tracking-wider flex items-center mb-6">
              <span className="w-2 h-2 bg-[#006241] rounded-full mr-2"></span>
              承包商健康指数分布
           </h3>
           <div className="space-y-4">
              {[
                { label: '卓越 (95-100)', count: 12, percent: '40%', color: 'bg-green-500' },
                { label: '优秀 (90-94)', count: 8, percent: '25%', color: 'bg-[#006241]' },
                { label: '良好 (80-89)', count: 5, percent: '15%', color: 'bg-blue-500' },
                { label: '待改善 (70-79)', count: 3, percent: '10%', color: 'bg-yellow-500' },
                { label: '风险 (<70)', count: 2, percent: '10%', color: 'bg-red-500' },
              ].map((item, i) => (
                <div key={i} className="flex items-center text-sm">
                   <div className="w-28 text-xs font-bold text-gray-600">{item.label}</div>
                   <div className="flex-1 h-3 bg-gray-100 rounded-full overflow-hidden flex">
                      <div className={`h-full ${item.color}`} style={{ width: item.percent }}></div>
                   </div>
                   <div className="w-12 text-right font-mono font-bold text-[#1E3932]">{item.count}家</div>
                </div>
              ))}
           </div>
         </div>

         <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
           <h3 className="text-sm font-bold text-[#1E3932] uppercase tracking-wider flex items-center mb-6">
              <span className="w-2 h-2 bg-[#006241] rounded-full mr-2"></span>
              待办与提醒
           </h3>
           <ul className="space-y-3 text-sm">
             <li className="flex justify-between items-center p-3 bg-red-50 text-red-700 rounded border border-red-100">
                <span className="font-bold flex items-center gap-2"><AlertTriangle size={16}/> 星建装饰工程有限公司 状态转为风险</span>
                <button onClick={() => setView('ADMIN_CONTRACTORS')} className="text-xs font-bold underline">查看并限制入场</button>
             </li>
             <li className="flex justify-between items-center p-3 bg-orange-50 text-orange-700 rounded border border-orange-100">
                <span className="font-bold flex items-center gap-2"><Clock size={16}/> 3张证件即将在7天内过期</span>
                <button className="text-xs font-bold underline">查看清单</button>
             </li>
             <li className="flex justify-between items-center p-3 bg-blue-50 text-blue-700 rounded border border-blue-100">
                <span className="font-bold flex items-center gap-2"><Users size={16}/> 15名待培训人员预计今日入场</span>
                <button className="text-xs font-bold underline">安排线下培训</button>
             </li>
           </ul>
         </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
        <h3 className="text-sm font-bold text-[#1E3932] uppercase tracking-wider flex items-center mb-6">
           <span className="w-2 h-2 bg-[#006241] rounded-full mr-2"></span>
           快捷操作
        </h3>
        <div className="flex gap-4">
          <button onClick={() => setView('ADMIN_NEW_ORDER')} className="bg-[#006241] hover:bg-[#00754A] text-white px-5 py-2.5 rounded shadow flex items-center gap-2 text-sm font-bold transition-colors">
            <Plus size={16} /> 发起施工单申请
          </button>
          <button onClick={() => setView('ADMIN_CONTRACTORS')} className="bg-[#F8F8F8] border border-gray-200 hover:bg-gray-100 text-[#1E3932] px-5 py-2.5 rounded shadow-sm flex items-center gap-2 text-sm font-bold transition-colors">
            <Search size={16} /> 承包商档案库
          </button>
        </div>
      </div>
    </div>
  );
}

export const AdminOrderList = () => {
  const { orders, setView, setCurrentOrderId } = useAppContext();

  const handleDetail = (id: string) => {
    setCurrentOrderId(id);
    setView('ADMIN_ORDER_DETAIL');
  }

  return (
    <div className="space-y-4 animate-in fade-in duration-500 flex flex-col h-full">
      <div className="flex justify-between items-center shrink-0">
        <h2 className="text-xl font-bold text-[#1E3932]">施工单管理</h2>
        <button onClick={() => setView('ADMIN_NEW_ORDER')} className="bg-[#006241] hover:bg-[#00754A] text-white px-4 py-2 rounded flex items-center gap-2 text-sm font-bold transition-colors shadow">
          <Plus size={16} /> 新建单据
        </button>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg shadow-sm flex flex-col flex-1 overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex gap-4 bg-[#F7F9F8] items-center shrink-0">
          <div className="relative">
             <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"/>
             <input type="text" placeholder="搜索单号/供应商..." className="bg-white border border-gray-200 rounded pl-9 pr-3 py-2 text-sm w-64 focus:outline-none focus:border-[#006241]" />
          </div>
          <select className="border border-gray-200 rounded px-3 py-2 text-sm focus:outline-none focus:border-[#006241] bg-white">
            <option>所有状态</option>
            <option>待审批</option>
            <option>待门卫核验</option>
          </select>
        </div>
        <div className="flex-1 overflow-auto">
          <table className="w-full text-left text-sm text-[#1E3932]">
            <thead className="bg-[#E8F0ED] text-[#1E3932] sticky top-0 z-10 border-b border-gray-200 text-xs uppercase tracking-wider">
              <tr>
                <th className="p-3 font-bold">单号</th>
                <th className="p-3 font-bold">施工内容</th>
                <th className="p-3 font-bold">供应商</th>
                <th className="p-3 font-bold">施工区域</th>
                <th className="p-3 font-bold">作业时间</th>
                <th className="p-3 font-bold">当前状态</th>
                <th className="p-3 font-bold text-right">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {orders.map(o => (
                <tr key={o.id} className="hover:bg-gray-50 transition-colors">
                  <td className="p-3 font-bold">{o.id}</td>
                  <td className="p-3">{o.content}</td>
                  <td className="p-3 text-gray-600">{o.supplier}</td>
                  <td className="p-3 text-gray-600">{o.area.join(', ')}</td>
                  <td className="p-3 text-[11px] text-gray-500 whitespace-nowrap">{o.startTime.split(' ')[0]}<br/>至 {o.endTime.split(' ')[0]}</td>
                  <td className="p-3"><StatusBadge status={o.status} /></td>
                  <td className="p-3 text-right">
                    <button onClick={() => handleDetail(o.id)} className="text-[#006241] hover:underline font-bold text-[11px] bg-[#F7F9F8] border border-gray-200 px-2 py-1.5 rounded">查看详情</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export const AdminNewOrder = () => {
  const { setView, orders, setOrders } = useAppContext();
  
  const [highRisk, setHighRisk] = useState(false);
  const [selectedPermits, setSelectedPermits] = useState<string[]>([]);
  const [selectedPpe, setSelectedPpe] = useState<string[]>(["安全帽", "安全鞋", "反光背心"]);

  const ppeOptions = ["安全帽", "安全鞋", "反光背心", "安全眼镜", "安全带", "防割手套", "听力防护", "防尘口罩", "防有害气体口罩", "呼吸器", "防化手套", "防化服", "防飞溅护目镜", "面盾", "防电弧"];
  const permitOptions = ["高处作业(>1.2米)", "动火作业", "吊装作业", "拆除或挖掘作业", "有限空间作业", "破管作业", "带电作业", "集群锁", "消防系统停用"];

  const handleTogglePermit = (permit: string) => {
    setSelectedPermits(prev => prev.includes(permit) ? prev.filter(p => p !== permit) : [...prev, permit]);
  };

  const handleTogglePpe = (ppe: string) => {
    // Make helmet, shoes, vest mandatory
    if (["安全帽", "安全鞋", "反光背心"].includes(ppe)) return; 
    setSelectedPpe(prev => prev.includes(ppe) ? prev.filter(p => p !== ppe) : [...prev, ppe]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newOrder = {
      id: "20231101" + "08",
      contractorId: "20231001",
      content: "新产线网络布线",
      area: ["新产线车间"],
      startTime: "2023-11-01 08:00",
      endTime: "2023-11-05 18:00",
      supplier: "上海星联智造通讯",
      status: "PENDING_DEPT" as any,
      createdBy: "业务部门A",
      sbuxContact: "刘伟",
      contractorContact: "李强",
      safetyOfficers: [],
      highRisk,
      permits: highRisk ? selectedPermits : [],
      ppe: selectedPpe,
      workers: [],
      vehicles: []
    };
    setOrders([newOrder, ...orders]);
    setView('ADMIN_ORDER_LIST');
    alert("提交成功，已流转至业务部门经理审批！");
  }

  return (
    <div className="space-y-6 animate-in slide-in-from-right-4 fade-in duration-300 max-w-4xl h-full overflow-y-auto pb-8 pr-2">
      <div className="flex items-center gap-4">
        <button onClick={() => setView('ADMIN_DASHBOARD')} className="text-gray-500 hover:text-gray-800 text-sm flex items-center gap-1 group">
           <ArrowRight className="rotate-180 group-hover:-translate-x-1 transition-transform" size={16} /> 返回
        </button>
        <h2 className="text-xl font-bold text-[#1E3932]">新建施工单</h2>
      </div>

      <form onSubmit={handleSubmit} className="bg-white border text-sm border-gray-200 rounded-lg shadow-sm overflow-hidden">
        
        <div className="p-8 space-y-8">
          <section>
            <h3 className="text-sm font-bold text-[#1E3932] border-b border-gray-100 pb-2 mb-6 uppercase tracking-wider flex items-center">
              <span className="w-2 h-2 bg-[#006241] rounded-full mr-2"></span>
              基本信息
            </h3>
            <div className="grid grid-cols-2 gap-6">
              <div className="col-span-2">
                <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase">作业内容 <span className="text-red-500">*</span></label>
                <input required type="text" defaultValue="新产线网络布线" className="w-full bg-[#F8F8F8] border border-gray-200 rounded px-3 py-2.5 focus:outline-none focus:border-[#006241] transition-shadow text-[#1E3932]" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase">供应商选择 (仅限合格) <span className="text-red-500">*</span></label>
                <select className="w-full bg-[#F8F8F8] border border-gray-200 rounded px-3 py-2.5 focus:outline-none focus:border-[#006241] transition-shadow text-[#1E3932]">
                  <option>上海星联智造通讯技术有限公司</option>
                  <option>上海机械工程有限公司</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase">作业区域 (可多选) <span className="text-red-500">*</span></label>
                <input required type="text" defaultValue="新产线车间, 配电房" className="w-full bg-[#F8F8F8] border border-gray-200 rounded px-3 py-2.5 focus:outline-none focus:border-[#006241] transition-shadow text-[#1E3932]" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase">开始时间 <span className="text-red-500">*</span></label>
                <input required type="datetime-local" className="w-full bg-[#F8F8F8] border border-gray-200 rounded px-3 py-2.5 focus:outline-none focus:border-[#006241] transition-shadow text-[#1E3932]" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase">结束时间 (最长1周) <span className="text-red-500">*</span></label>
                <input required type="datetime-local" className="w-full bg-[#F8F8F8] border border-gray-200 rounded px-3 py-2.5 focus:outline-none focus:border-[#006241] transition-shadow text-[#1E3932]" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase">SBUX 负责人 <span className="text-red-500">*</span></label>
                <input required type="text" defaultValue="刘伟" className="w-full bg-[#F8F8F8] border border-gray-200 rounded px-3 py-2.5 focus:outline-none focus:border-[#006241] transition-shadow text-[#1E3932]" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase">承包商负责人 <span className="text-red-500">*</span></label>
                <input required type="text" defaultValue="李强" className="w-full bg-[#F8F8F8] border border-gray-200 rounded px-3 py-2.5 focus:outline-none focus:border-[#006241] transition-shadow text-[#1E3932]" />
              </div>
            </div>
          </section>

          <section>
            <h3 className="text-sm font-bold text-[#1E3932] border-b border-gray-100 pb-2 mb-6 uppercase tracking-wider flex items-center">
              <span className="w-2 h-2 bg-[#006241] rounded-full mr-2"></span>
              高风险作业评估与 PPE
            </h3>
            <div className="space-y-6">
              <div className="flex gap-8 p-4 bg-gray-50 border border-gray-200 rounded border-dashed">
                <label className="flex items-center gap-2 text-[#1E3932] font-bold cursor-pointer text-sm">
                  <input type="checkbox" checked={highRisk} onChange={e => setHighRisk(e.target.checked)} className="accent-[#006241] w-4 h-4 cursor-pointer" /> 是否涉及高风险作业？
                </label>
              </div>

              {highRisk && (
                <div className="bg-orange-50 border border-orange-200 p-4 rounded">
                  <label className="block text-xs font-bold text-orange-800 mb-3 uppercase tracking-wider">选择高风险作业许可证 (必须多选)</label>
                  <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
                     {permitOptions.map(p => (
                       <label key={p} className="flex items-center gap-2 text-[#1E3932] text-sm cursor-pointer">
                         <input type="checkbox" checked={selectedPermits.includes(p)} onChange={() => handleTogglePermit(p)} className="accent-[#006241] w-4 h-4" /> {p}
                       </label>
                     ))}
                  </div>
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-3 uppercase tracking-wider">基础与特殊个人防护装备 (PPE)</label>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                   {ppeOptions.map(p => {
                     const mandatory = ["安全帽", "安全鞋", "反光背心"].includes(p);
                     return (
                       <label key={p} className={`flex items-center gap-2 text-[#1E3932] text-sm ${mandatory ? 'opacity-80' : 'cursor-pointer'}`}>
                         <input type="checkbox" disabled={mandatory} checked={selectedPpe.includes(p)} onChange={() => handleTogglePpe(p)} className="accent-[#006241] w-4 h-4" /> 
                         {p} {mandatory && <span className="text-[10px] text-red-500 font-bold">*</span>}
                       </label>
                     );
                   })}
                </div>
              </div>
            </div>
          </section>
        </div>

        <div className="p-6 bg-[#F8F8F8] border-t border-gray-200 flex justify-end gap-3 shrink-0">
          <button type="button" onClick={() => setView('ADMIN_ORDER_LIST')} className="px-6 py-2 border border-gray-300 rounded text-gray-700 bg-white hover:bg-gray-50 font-bold transition-colors">取消草稿</button>
          <button type="submit" className="px-6 py-2 bg-[#006241] rounded text-white font-bold hover:bg-[#00754A] transition-colors shadow-sm">提交审批流程</button>
        </div>
      </form>
    </div>
  );
}

export const AdminOrderDetail = () => {
  const { orders, currentOrderId, setView } = useAppContext();
  const order = orders.find(o => o.id === currentOrderId);

  if (!order) return <div>Order not found</div>;

  return (
    <div className="space-y-6 animate-in slide-in-from-right-4 fade-in duration-300 max-w-5xl h-full flex flex-col">
       <div className="flex items-center gap-4 border-b border-gray-200 pb-4 shrink-0">
        <button onClick={() => setView('ADMIN_ORDER_LIST')} className="text-gray-500 hover:text-[#006241] text-sm flex items-center gap-1 group">
           <ArrowRight className="rotate-180 group-hover:-translate-x-1 transition-transform" size={16} /> 返回列表
        </button>
        <h2 className="text-xl font-bold text-[#1E3932]">施工单详情</h2>
        <StatusBadge status={order.status} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1 overflow-hidden">
        <div className="col-span-2 space-y-6 overflow-y-auto pr-2 pb-6">
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
            <h3 className="text-sm font-bold text-[#1E3932] mb-6 uppercase tracking-wider flex items-center">
              <span className="w-2 h-2 bg-[#006241] rounded-full mr-2"></span>
              基本信息
            </h3>
            <div className="grid grid-cols-2 gap-y-6 gap-x-8 text-sm">
              <div><span className="text-xs text-gray-500 block mb-1 uppercase font-bold">单据编号</span><span className="font-bold text-[#1E3932]">{order.id}</span></div>
              <div><span className="text-xs text-gray-500 block mb-1 uppercase font-bold">作业内容</span><span className="font-bold text-[#1E3932]">{order.content}</span></div>
              <div><span className="text-xs text-gray-500 block mb-1 uppercase font-bold">供应商单位</span><span className="font-bold text-[#1E3932]">{order.supplier}</span></div>
              <div><span className="text-xs text-gray-500 block mb-1 uppercase font-bold">施工区域</span><span className="font-bold text-[#1E3932]">{order.area.join(', ')}</span></div>
              <div><span className="text-xs text-gray-500 block mb-1 uppercase font-bold">施工起止时间</span><span className="font-bold text-[#1E3932]">{order.startTime} ~ {order.endTime}</span></div>
              <div><span className="text-xs text-gray-500 block mb-1 uppercase font-bold">业务发起人</span><span className="font-bold text-[#1E3932]">{order.createdBy}</span></div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
             <h3 className="text-sm font-bold text-[#1E3932] mb-6 uppercase tracking-wider flex items-center">
              <span className="w-2 h-2 bg-[#006241] rounded-full mr-2"></span>
              人员与车辆状态
             </h3>
             {order.workers.length === 0 ? (
               <div className="bg-[#F8F8F8] p-6 rounded border border-dashed border-gray-300 text-center text-gray-500 text-sm italic">
                 等待供应商通过移动端提报具体人员及车辆资质...
               </div>
             ) : (
               <div className="space-y-6">
                 <div>
                   <h4 className="font-bold text-xs text-gray-700 mb-3 flex items-center justify-between uppercase tracking-wider">
                     <span>入园施工人员 ({order.workers.length}人)</span>
                   </h4>
                   <div className="border border-gray-200 rounded overflow-hidden">
                     <table className="w-full text-left text-sm text-[#1E3932]">
                       <thead className="bg-[#E8F0ED]">
                         <tr>
                           <th className="p-3 font-bold border-b text-xs w-1/3">姓名与身份卡</th>
                           <th className="p-3 font-bold border-b text-xs w-1/3">联系方式</th>
                           <th className="p-3 font-bold border-b text-xs">资质与状态</th>
                         </tr>
                       </thead>
                       <tbody className="divide-y divide-gray-100">
                         {order.workers.map((w,i) => (
                           <tr key={i} className="hover:bg-gray-50">
                             <td className="p-3"><p className="font-bold text-[#1E3932]">{w.name}</p><p className="text-[11px] text-gray-500 font-mono mt-1">ID: {w.idCard}</p></td>
                             <td className="p-3"><p className="font-mono text-xs">{w.phone}</p><p className="text-[11px] text-[#006241] mt-1 font-bold">健康证: {w.healthCert}</p></td>
                             <td className="p-3 space-y-1">
                               {w.specialCert !== '无' && <div className="bg-blue-50 text-blue-700 border border-blue-200 px-1.5 py-0.5 rounded text-[10px] inline-block mb-1">{w.specialCert}</div>}
                               <div><span className="bg-[#F2F0EB] px-2 py-0.5 rounded border border-gray-200 text-[10px] text-gray-600 font-bold">{w.status}</span></div>
                             </td>
                           </tr>
                         ))}
                       </tbody>
                     </table>
                   </div>
                 </div>
                 {order.vehicles.length > 0 && (
                   <div>
                    <h4 className="font-bold text-xs text-gray-700 mb-3 uppercase tracking-wider">入园保障车辆 ({order.vehicles.length}辆)</h4>
                    <div className="grid grid-cols-2 gap-3">
                      {order.vehicles.map((v,i) => (
                        <div key={i} className="border border-dashed border-gray-300 rounded p-3 bg-gray-50 flex items-center justify-between">
                           <div>
                             <p className="font-mono font-bold text-[#1E3932] border border-gray-400 bg-white px-2 py-0.5 rounded text-sm mb-1">{v.plate}</p>
                             <p className="text-[11px] text-gray-500 font-bold">{v.type}</p>
                           </div>
                           <div className="text-right text-[11px] text-gray-600 font-bold">
                             司机: {v.driver}
                           </div>
                        </div>
                      ))}
                    </div>
                   </div>
                 )}
               </div>
             )}
          </div>
        </div>

        <div className="col-span-1 border-l border-gray-200 lg:-ml-3 lg:pl-6 pb-6 overflow-y-auto">
          <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
             <h3 className="text-sm font-bold text-[#1E3932] mb-6 uppercase tracking-wider flex items-center">
              <span className="w-2 h-2 bg-[#006241] rounded-full mr-2"></span>
              审批流转进度
             </h3>
             <ul className="space-y-6 text-sm relative before:absolute before:inset-y-0 before:left-[11px] before:w-[2px] before:bg-gray-100">
               <li className="relative pl-8">
                 <div className="absolute left-0 top-0.5 w-6 h-6 rounded-full bg-[#006241] flex items-center justify-center -ml-0.5 z-10 text-white"><ArrowRight size={12}/></div>
                 <p className="font-bold text-[#1E3932] mb-0.5">业务发起申请</p>
                 <p className="text-gray-500 text-xs">操作人: {order.createdBy}</p>
                 <p className="text-gray-400 text-[10px] mt-1 font-mono">2023-10-23 10:15:00</p>
               </li>
               <li className={`relative pl-8 ${order.status !== 'DRAFT' && order.status !== 'PENDING_APPROVER' ? '' : 'opacity-50'}`}>
                 <div className={`absolute left-0 top-0.5 w-6 h-6 rounded-full flex items-center justify-center -ml-0.5 z-10 ${order.status !== 'DRAFT' && order.status !== 'PENDING_APPROVER' ? 'bg-[#006241] text-white' : 'bg-gray-200 text-gray-500'}`}>
                   {order.status === 'PENDING_APPROVER' ? <Clock size={12}/> : <ArrowRight size={12}/>}
                 </div>
                 <p className="font-bold text-[#1E3932] mb-0.5">EHS与安保审批</p>
                 <p className="text-gray-500 text-xs">状态: <span className="font-bold">{order.status === 'PENDING_APPROVER' ? '待处理' : '已通过'}</span></p>
               </li>
               <li className={`relative pl-8 ${order.status === 'PENDING_GUARD' || order.status === 'IN_PROGRESS' || order.status === 'FINISHED' ? '' : 'opacity-30'}`}>
                 <div className="absolute left-0 top-0.5 w-6 h-6 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center -ml-0.5 z-10"></div>
                 <p className="font-bold text-[#1E3932] mb-0.5">供应商提报资料</p>
               </li>
               <li className={`relative pl-8 ${order.status === 'IN_PROGRESS' || order.status === 'FINISHED' ? '' : 'opacity-30'}`}>
                 <div className="absolute left-0 top-0.5 w-6 h-6 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center -ml-0.5 z-10"></div>
                 <p className="font-bold text-[#1E3932] mb-0.5">门卫核验放行</p>
               </li>
             </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export const AdminReports = () => (
  <div className="flex flex-col items-center justify-center h-[50vh] text-center animate-in fade-in">
      <div className="bg-[#F2F0EB] p-8 rounded-full mb-6">
        <FileText size={48} className="text-[#006241]" />
      </div>
      <h2 className="text-xl font-bold text-[#1E3932] mb-3">报表查询模块</h2>
      <p className="text-gray-500 text-sm max-w-sm leading-relaxed border border-gray-200 p-4 rounded bg-white shadow-sm">此模块在原型中未详细展开。<br/>后续将接入出入记录、工时统计、异常拦截明细等可视化数据分析。</p>
  </div>
);
