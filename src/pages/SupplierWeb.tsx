import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { Building, UploadCloud, Users, CheckCircle, Clock, AlertTriangle, FileText, Search, Plus, Trash2, Edit2, FileIcon, Eye } from 'lucide-react';

export const SupplierWebCompany = () => {
  return (
    <div className="space-y-6 animate-in fade-in duration-500 flex flex-col h-full">
      <div className="flex justify-between items-center shrink-0">
        <h2 className="text-xl font-bold text-[#1E3932]">企业资质报备</h2>
        <button className="bg-[#006241] hover:bg-[#00754A] text-white px-4 py-2 rounded flex items-center gap-2 text-sm font-bold transition-colors shadow">
          保存修改
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 flex-1 overflow-y-auto">
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-8 space-y-6">
          <h3 className="text-sm font-bold text-[#1E3932] border-b border-gray-100 pb-2 uppercase tracking-wider flex items-center">
             <span className="w-2 h-2 bg-[#006241] rounded-full mr-2"></span>
             基本工商信息
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase">企业名称</label>
              <input type="text" defaultValue="上海机械工程有限公司" className="w-full bg-[#F8F8F8] border border-gray-200 rounded px-3 py-2 focus:outline-none focus:border-[#006241]" />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase">统一社会信用代码</label>
              <input type="text" defaultValue="91310115MA1H2XXX12" className="w-full bg-[#F8F8F8] border border-gray-200 rounded px-3 py-2 font-mono focus:outline-none focus:border-[#006241]" />
            </div>
            <div className="grid grid-cols-2 gap-4">
               <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase">法人代表</label>
                  <input type="text" defaultValue="张建国" className="w-full bg-[#F8F8F8] border border-gray-200 rounded px-3 py-2 focus:outline-none focus:border-[#006241]" />
               </div>
               <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase">成立日期</label>
                  <input type="date" defaultValue="2012-05-18" className="w-full bg-[#F8F8F8] border border-gray-200 rounded px-3 py-2 focus:outline-none focus:border-[#006241]" />
               </div>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-8 space-y-6">
          <h3 className="text-sm font-bold text-[#1E3932] border-b border-gray-100 pb-2 uppercase tracking-wider flex items-center">
             <span className="w-2 h-2 bg-[#006241] rounded-full mr-2"></span>
             资质文件上传
          </h3>
          <div className="space-y-4">
             {/* Upload blocks */}
             <div className="border border-gray-200 rounded p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                   <div className="p-2 bg-green-50 rounded text-[#006241]">
                     <FileText size={20} />
                   </div>
                   <div>
                     <p className="font-bold text-sm text-[#1E3932]">营业执照扫描件 <span className="text-red-500">*</span></p>
                     <p className="text-xs text-gray-500 mt-0.5">已上传: BL_SHENGJI_2023.pdf (2.1MB)</p>
                   </div>
                </div>
                <button className="text-[#006241] text-xs font-bold bg-[#F2F0EB] px-3 py-1.5 rounded hover:bg-[#E8F0ED]">重新上传</button>
             </div>

             <div className="border border-gray-200 rounded p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                   <div className="p-2 bg-green-50 rounded text-[#006241]">
                     <FileText size={20} />
                   </div>
                   <div>
                     <p className="font-bold text-sm text-[#1E3932]">安全生产许可证 <span className="text-red-500">*</span></p>
                     <p className="text-xs text-green-600 font-bold mt-0.5">有效期至: 2025-12-31</p>
                   </div>
                </div>
                <button className="text-[#006241] text-xs font-bold bg-[#F2F0EB] px-3 py-1.5 rounded hover:bg-[#E8F0ED]">重新上传</button>
             </div>

             <div className="border border-dashed border-gray-300 rounded p-6 flex flex-col items-center justify-center text-center hover:bg-gray-50 cursor-pointer transition-colors mt-4">
                <UploadCloud size={28} className="text-gray-400 mb-2" />
                <p className="font-bold text-sm text-[#1E3932]">上传其他补充资质</p>
                <p className="text-xs text-gray-500 mt-1">支持 PDF, JPG/PNG, 最大 10MB</p>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const SupplierWebPersonnel = () => {
  return (
    <div className="space-y-4 animate-in fade-in duration-500 flex flex-col h-full">
      <div className="flex justify-between items-center shrink-0">
        <h2 className="text-xl font-bold text-[#1E3932]">人员与车辆台账</h2>
        <div className="flex gap-2">
          <button className="bg-white border text-[#1E3932] border-gray-200 hover:bg-gray-50 px-4 py-2 rounded flex items-center gap-2 text-sm font-bold transition-colors shadow-sm">
            <Plus size={16} /> 添加车辆
          </button>
          <button className="bg-[#006241] hover:bg-[#00754A] text-white px-4 py-2 rounded flex items-center gap-2 text-sm font-bold transition-colors shadow">
            <Plus size={16} /> 录入新员工
          </button>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg shadow-sm flex flex-col flex-1 overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex gap-4 bg-[#F7F9F8] items-center shrink-0 justify-between">
          <div className="flex gap-4 items-center">
            <div className="relative">
               <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"/>
               <input type="text" placeholder="搜索姓名/身份证/车牌号..." className="bg-white border border-gray-200 rounded pl-9 pr-3 py-2 text-sm w-64 focus:outline-none focus:border-[#006241]" />
            </div>
            <select className="border border-gray-200 rounded px-3 py-2 text-sm focus:outline-none focus:border-[#006241] bg-white">
              <option>人员类型 (全部)</option>
              <option>特种作业人员</option>
              <option>普工</option>
            </select>
          </div>
        </div>
        <div className="flex-1 overflow-auto">
          <table className="w-full text-left text-sm text-[#1E3932]">
            <thead className="bg-[#E8F0ED] text-[#1E3932] sticky top-0 z-10 border-b border-gray-200 text-xs uppercase tracking-wider">
              <tr>
                <th className="p-3 font-bold">姓名</th>
                <th className="p-3 font-bold">身份证件</th>
                <th className="p-3 font-bold">联系电话</th>
                <th className="p-3 font-bold">工种类型</th>
                <th className="p-3 font-bold">持证状态</th>
                <th className="p-3 font-bold text-right">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
               {[
                 { name: "张三", id: "3101101990****8888", phone: "13800138000", type: "电工", cert: "特种证有效" },
                 { name: "李静", id: "3201101992****7777", phone: "13900139000", type: "普工", cert: "健康证有效" },
                 { name: "王强", id: "3301101988****6666", phone: "18612345678", type: "焊工", cert: "特种证过期", error: true },
               ].map((item, i) => (
                <tr key={i} className={`hover:bg-gray-50 transition-colors ${item.error ? 'bg-red-50/30' : ''}`}>
                  <td className="p-3 font-bold">{item.name}</td>
                  <td className="p-3 font-mono text-gray-500">{item.id}</td>
                  <td className="p-3 font-mono">{item.phone}</td>
                  <td className="p-3 text-gray-600">{item.type}</td>
                  <td className="p-3">
                     <span className={`px-2 py-1 rounded text-[11px] font-bold border ${item.error ? 'bg-red-50 text-red-700 border-red-200' : 'bg-green-50 text-[#006241] border-green-200'}`}>
                       {item.cert}
                     </span>
                  </td>
                  <td className="p-3 text-right">
                    <button className="p-1.5 text-gray-400 hover:text-[#006241] transition-colors" title="编辑"><Edit2 size={16}/></button>
                    <button className="p-1.5 text-gray-400 hover:text-red-500 transition-colors" title="删除"><Trash2 size={16}/></button>
                  </td>
                </tr>
               ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export const SupplierWebApprovals = () => {
  const { orders } = useAppContext();
  // Filter for demo purpose (Assuming these are orders assigned to the supplier)
  const supplierOrders = orders.filter(o => o.supplier.includes('机械工程') || true); 

  return (
    <div className="space-y-4 animate-in fade-in duration-500 flex flex-col h-full">
      <div className="flex justify-between items-center shrink-0">
        <h2 className="text-xl font-bold text-[#1E3932]">资质审批与施工单跟进</h2>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg shadow-sm flex flex-col flex-1 overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex gap-4 bg-[#F7F9F8] items-center shrink-0">
          <div className="relative">
             <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"/>
             <input type="text" placeholder="搜索单据编号..." className="bg-white border border-gray-200 rounded pl-9 pr-3 py-2 text-sm w-64 focus:outline-none focus:border-[#006241]" />
          </div>
        </div>
        <div className="flex-1 overflow-auto p-6 space-y-4">
           {supplierOrders.map((o) => (
             <div key={o.id} className="border border-gray-200 rounded-lg p-5 shadow-sm hover:border-[#006241] transition-colors group">
               <div className="flex justify-between items-start mb-4">
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="font-bold text-[#1E3932] text-lg">{o.content}</h3>
                      {o.status === 'PENDING_SUPPLIER' && <span className="bg-yellow-50 text-yellow-700 border border-yellow-200 px-2 py-0.5 rounded text-[11px] font-bold">待补充资质</span>}
                      {o.status === 'PENDING_GUARD' && <span className="bg-blue-50 text-blue-700 border border-blue-200 px-2 py-0.5 rounded text-[11px] font-bold">等待入场</span>}
                      {o.status === 'IN_PROGRESS' && <span className="bg-green-50 text-[#006241] border border-green-200 px-2 py-0.5 rounded text-[11px] font-bold">施工中</span>}
                      {o.status === 'REJECTED' && <span className="bg-red-50 text-red-700 border border-red-200 px-2 py-0.5 rounded text-[11px] font-bold">资质驳回</span>}
                    </div>
                    <p className="text-sm font-mono text-gray-500 font-bold">单号: {o.id}</p>
                  </div>
                  <button className="text-[#006241] hover:underline font-bold text-sm bg-[#F2F0EB] px-4 py-2 rounded">查看详情</button>
               </div>
               
               <div className="grid grid-cols-3 gap-6 bg-[#F8F8F8] p-4 rounded text-sm text-gray-600">
                  <div><span className="block text-[11px] text-gray-400 uppercase tracking-widest font-bold mb-1">日期安排</span> <span className="font-mono text-[#1E3932] font-bold">{o.startTime.split(' ')[0]}</span></div>
                  <div><span className="block text-[11px] text-gray-400 uppercase tracking-widest font-bold mb-1">作业区域</span> <span className="font-bold text-[#1E3932]">{o.area}</span></div>
                  <div><span className="block text-[11px] text-gray-400 uppercase tracking-widest font-bold mb-1">系统状态</span> <span className="font-bold text-[#1E3932]">{o.status === 'PENDING_APPROVER' ? '甲方EHS审批中' : o.status === 'PENDING_SUPPLIER' ? '需录入人员资料' : '审批完成'}</span></div>
               </div>

               {(o.status === 'PENDING_SUPPLIER' || o.status === 'REJECTED') && (
                 <div className="mt-4 border-t border-dashed border-gray-200 pt-4 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-orange-600 font-bold">
                       <AlertTriangle size={16} /> 
                       {o.status === 'REJECTED' ? '作业人员特种资质过期或缺失，请重新上传！' : '该单据已获甲方许可，请尽快补充作业人员名单及车辆以便生成入园凭证。'}
                    </div>
                    <button className="bg-[#006241] text-white px-4 py-2 rounded shadow text-sm font-bold hover:bg-[#00754A]">
                      立即补充及提报
                    </button>
                 </div>
               )}
             </div>
           ))}
        </div>
      </div>
    </div>
  );
};
