import React from 'react';
import { Building, Upload, AlertCircle, FileText, CheckCircle2, UserPlus, Clock } from 'lucide-react';

export const SupplierWebCompany = () => {
  return (
    <div className="space-y-6 animate-in fade-in h-full">
      <h2 className="text-xl font-bold text-[#1E3932]">企业资质与信息</h2>
      <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
        <div className="grid grid-cols-2 gap-6 max-w-3xl">
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">企业全称</label>
            <p className="text-sm font-bold text-[#1E3932]">上海机械工程有限公司</p>
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">统一社会信用代码</label>
            <p className="text-sm font-mono text-[#1E3932]">91310000X123456789</p>
          </div>
          <div className="col-span-2">
            <label className="block text-xs font-bold text-gray-500 uppercase mb-2">资质文件上传</label>
            <div className="border border-dashed border-gray-300 rounded bg-gray-50 p-6 flex flex-col items-center justify-center text-gray-400">
               <Upload size={24} className="mb-2" />
               <p className="text-sm font-bold">拖拽或点击上传营业执照、资质证书 (PDF/PNG)</p>
            </div>
          </div>
          <div className="col-span-2 flex justify-end">
             <button className="bg-[#006241] text-white px-6 py-2 rounded text-sm font-bold shadow-sm">保存修改</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export const SupplierWebPersonnel = () => {
  return (
    <div className="space-y-6 animate-in fade-in h-full flex flex-col">
      <div className="flex justify-between items-center shrink-0">
        <h2 className="text-xl font-bold text-[#1E3932]">人员与车辆库</h2>
        <button className="bg-[#006241] text-white px-4 py-2 rounded flex items-center gap-2 text-sm font-bold shadow-sm">
          <UserPlus size={16} /> 新增人员
        </button>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg shadow-sm flex-1 overflow-hidden flex flex-col">
         <div className="p-4 border-b border-gray-100 bg-[#F7F9F8]">
            <input type="text" placeholder="搜索姓名/工种..." className="bg-white border border-gray-200 rounded px-3 py-2 text-sm w-64 focus:outline-[#006241]" />
         </div>
         <div className="flex-1 overflow-auto">
            <table className="w-full text-left text-sm text-[#1E3932]">
               <thead className="bg-[#E8F0ED] sticky top-0 z-10 text-xs uppercase">
                 <tr>
                   <th className="p-3 font-bold">姓名与证件</th>
                   <th className="p-3 font-bold">工种</th>
                   <th className="p-3 font-bold">健康证</th>
                   <th className="p-3 font-bold">特种作业证</th>
                   <th className="p-3 font-bold text-right">操作</th>
                 </tr>
               </thead>
               <tbody className="divide-y divide-gray-100">
                 <tr className="hover:bg-gray-50">
                   <td className="p-3"><p className="font-bold text-[#1E3932]">张三</p><p className="font-mono text-[10px] text-gray-500">310110199001018888</p></td>
                   <td className="p-3">弱电施工</td>
                   <td className="p-3"><span className="text-green-600 font-bold text-xs bg-green-50 border border-green-200 px-1.5 py-0.5 rounded">有效至 2024-12</span></td>
                   <td className="p-3 text-xs text-gray-400">无</td>
                   <td className="p-3 text-right">
                     <button className="text-[#006241] text-xs font-bold underline">编辑</button>
                   </td>
                 </tr>
                 <tr className="hover:bg-gray-50">
                   <td className="p-3"><p className="font-bold text-[#1E3932]">李四</p><p className="font-mono text-[10px] text-gray-500">320110198801017777</p></td>
                   <td className="p-3">电工</td>
                   <td className="p-3"><span className="text-green-600 font-bold text-xs bg-green-50 border border-green-200 px-1.5 py-0.5 rounded">有效至 2025-01</span></td>
                   <td className="p-3"><span className="bg-blue-50 text-blue-700 border border-blue-200 px-1.5 py-0.5 rounded text-[10px]">高低压电工作业</span></td>
                   <td className="p-3 text-right">
                     <button className="text-[#006241] text-xs font-bold underline">编辑</button>
                   </td>
                 </tr>
               </tbody>
            </table>
         </div>
      </div>
    </div>
  );
};

export const SupplierWebApprovals = () => {
  return (
    <div className="space-y-6 animate-in fade-in h-full">
      <h2 className="text-xl font-bold text-[#1E3932]">资质审批结果跟进</h2>
      
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
        <div className="flex items-start gap-4 p-4 border border-red-200 bg-red-50 rounded mb-6">
          <AlertCircle className="text-red-600 shrink-0 mt-0.5" />
          <div>
             <h4 className="font-bold text-red-800 text-sm mb-1">您的特种作业资质审核未通过</h4>
             <p className="text-xs text-red-600">原因: 李四的电工证已过期，请重新上传最新有效证件复印件。</p>
             <button className="mt-3 bg-red-600 text-white px-4 py-1.5 rounded text-xs font-bold">前往补充资料</button>
          </div>
        </div>

        <h3 className="text-sm font-bold text-[#1E3932] uppercase mb-4 flex items-center">
           <span className="w-2 h-2 bg-[#006241] rounded-full mr-2"></span> 历史审批记录
        </h3>
        <ul className="space-y-3">
           <li className="flex justify-between items-center p-3 border border-gray-100 rounded bg-gray-50 text-sm">
              <div className="flex items-center gap-3">
                 <CheckCircle2 size={16} className="text-[#006241]" />
                 <span className="font-bold text-[#1E3932]">2023年度长期服务商入库资质审查</span>
              </div>
              <span className="text-xs text-gray-500">2023-01-15</span>
           </li>
           <li className="flex justify-between items-center p-3 border border-gray-100 rounded bg-gray-50 text-sm">
              <div className="flex items-center gap-3">
                 <Clock size={16} className="text-orange-500" />
                 <span className="font-bold text-[#1E3932]">施工单 WO-20231024-001 资料报备审批</span>
              </div>
              <span className="text-xs text-gray-500">处理中...</span>
           </li>
        </ul>
      </div>
    </div>
  );
};
