import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { Plus, Search, Building, FileText, CheckCircle, AlertTriangle, Shield, Clock } from 'lucide-react';
import { Contractor, ContractorStatus } from '../types';

const StatusBadge: React.FC<{status: ContractorStatus}> = ({status}) => {
  const map: Record<ContractorStatus, {label: string, color: string}> = {
    'DRAFT': {label: '草稿', color: 'bg-gray-100 text-gray-700'},
    'PENDING_INFO': {label: '待完善', color: 'bg-orange-50 text-orange-700 border-orange-200'},
    'PENDING_REVIEW': {label: '待审核', color: 'bg-blue-50 text-blue-700 border-blue-200'},
    'PENDING_PD': {label: '待PD批准', color: 'bg-purple-50 text-purple-700 border-purple-200'},
    'QUALIFIED': {label: '合格', color: 'bg-[#006241]/10 text-[#006241] border-[#006241]/20'},
    'NEEDS_IMPROVEMENT': {label: '待改善', color: 'bg-yellow-50 text-yellow-700 border-yellow-200'},
    'RISK': {label: '风险', color: 'bg-red-50 text-red-700 border-red-200'},
    'INACTIVE': {label: '停用', color: 'bg-gray-100 text-gray-600 border-gray-200'},
  };
  const config = map[status] || map['DRAFT'];
  return <span className={`px-2 py-0.5 text-[11px] font-bold rounded border ${config.color}`}>{config.label}</span>;
}

const HealthBadge: React.FC<{score: number}> = ({score}) => {
  let label = '';
  let color = '';
  if (score >= 95) { label = '卓越'; color = 'text-green-600 bg-green-50 border-green-200'; }
  else if (score >= 90) { label = '优秀'; color = 'text-[#006241] bg-[#006241]/10 border-[#006241]/20'; }
  else if (score >= 80) { label = '良好'; color = 'text-blue-600 bg-blue-50 border-blue-200'; }
  else if (score >= 70) { label = '待改善'; color = 'text-orange-600 bg-orange-50 border-orange-200'; }
  else { label = '风险'; color = 'text-red-600 bg-red-50 border-red-200'; }
  
  return (
    <div className="flex items-center gap-1.5">
       <span className="font-mono font-bold">{score}</span>
       <span className={`px-1.5 py-0.5 text-[10px] rounded border ${color}`}>{label}</span>
    </div>
  )
}

export const AdminContractors = () => {
  const { contractors, setView, setCurrentContractorId } = useAppContext();

  const handleDetail = (id: string) => {
    setCurrentContractorId(id);
    setView('ADMIN_CONTRACTOR_DETAIL');
  }

  return (
    <div className="space-y-4 animate-in fade-in duration-500 flex flex-col h-full">
      <div className="flex justify-between items-center shrink-0">
        <h2 className="text-xl font-bold text-[#1E3932]">承包商档案</h2>
        <button onClick={() => setView('ADMIN_NEW_CONTRACTOR')} className="bg-[#006241] hover:bg-[#00754A] text-white px-4 py-2 rounded flex items-center gap-2 text-sm font-bold transition-colors shadow">
          <Plus size={16} /> 新增承包商
        </button>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg shadow-sm flex flex-col flex-1 overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex gap-4 bg-[#F7F9F8] items-center shrink-0">
          <div className="relative">
             <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"/>
             <input type="text" placeholder="搜索编号/名称..." className="bg-white border border-gray-200 rounded pl-9 pr-3 py-2 text-sm w-64 focus:outline-none focus:border-[#006241]" />
          </div>
          <select className="border border-gray-200 rounded px-3 py-2 text-sm focus:outline-none focus:border-[#006241] bg-white text-gray-700 font-bold">
            <option>所有状态</option>
            <option>合格</option>
            <option>待改善</option>
            <option>风险</option>
          </select>
          <select className="border border-gray-200 rounded px-3 py-2 text-sm focus:outline-none focus:border-[#006241] bg-white text-gray-700 font-bold">
            <option>所有类型</option>
            <option>长期承包商</option>
            <option>短期/临时</option>
          </select>
        </div>
        <div className="flex-1 overflow-auto">
          <table className="w-full text-left text-sm text-[#1E3932]">
            <thead className="bg-[#E8F0ED] text-[#1E3932] sticky top-0 z-10 border-b border-gray-200 text-xs uppercase tracking-wider">
              <tr>
                <th className="p-3 font-bold">承包商编号</th>
                <th className="p-3 font-bold">公司名称</th>
                <th className="p-3 font-bold">类型</th>
                <th className="p-3 font-bold">状态</th>
                <th className="p-3 font-bold">健康指数</th>
                <th className="p-3 font-bold">联系人</th>
                <th className="p-3 font-bold text-right">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {contractors.map(c => (
                <tr key={c.id} className="hover:bg-gray-50 transition-colors">
                  <td className="p-3 font-mono font-bold text-gray-600">{c.id}</td>
                  <td className="p-3 font-bold">{c.name}</td>
                  <td className="p-3 text-[11px] text-gray-600">
                     <span className="bg-gray-100 px-2 py-1 rounded">{c.type === 'LONG_TERM' ? '长期' : '短期/临时'}</span>
                  </td>
                  <td className="p-3"><StatusBadge status={c.status} /></td>
                  <td className="p-3">
                     {c.status !== 'DRAFT' && c.status !== 'PENDING_INFO' && c.status !== 'PENDING_REVIEW' && c.status !== 'PENDING_PD' 
                        ? <HealthBadge score={c.healthIndex} /> 
                        : <span className="text-gray-400 text-xs">-</span>
                     }
                  </td>
                  <td className="p-3 text-xs text-gray-600">
                     <p className="font-bold text-[#1E3932]">{c.contactName}</p>
                     <p className="font-mono">{c.contactPhone}</p>
                  </td>
                  <td className="p-3 text-right">
                    <button onClick={() => handleDetail(c.id)} className="text-[#006241] hover:underline font-bold text-[11px] bg-[#F7F9F8] border border-gray-200 px-2 py-1.5 rounded">查看详情</button>
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

export const AdminContractorDetail = () => {
  const { contractors, currentContractorId, setView, updateContractor } = useAppContext();
  const c = contractors.find(c => c.id === currentContractorId);

  if (!c) return <div>Contractor not found</div>;

  return (
    <div className="space-y-6 animate-in slide-in-from-right-4 fade-in duration-300 flex flex-col h-full">
      <div className="flex items-center gap-4 border-b border-gray-200 pb-4 shrink-0">
        <button onClick={() => setView('ADMIN_CONTRACTORS')} className="text-gray-500 hover:text-[#006241] text-sm flex items-center gap-1 group">
           <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="rotate-180 group-hover:-translate-x-1 transition-transform"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg> 返回
        </button>
        <h2 className="text-xl font-bold text-[#1E3932]">承包商详情</h2>
        <StatusBadge status={c.status} />
        {c.healthIndex > 0 && <HealthBadge score={c.healthIndex} />}
      </div>

      <div className="flex-1 overflow-y-auto space-y-6 pb-6">
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
          <h3 className="text-sm font-bold text-[#1E3932] mb-6 uppercase tracking-wider flex items-center">
             <span className="w-2 h-2 bg-[#006241] rounded-full mr-2"></span>
             工商与基本信息
          </h3>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-sm">
             <div><span className="block text-[11px] text-gray-500 font-bold mb-1 uppercase tracking-wider">公司名称</span> <span className="font-bold text-[#1E3932]">{c.name}</span></div>
             <div><span className="block text-[11px] text-gray-500 font-bold mb-1 uppercase tracking-wider">信用代码</span> <span className="font-mono text-gray-700">{c.creditCode}</span></div>
             <div><span className="block text-[11px] text-gray-500 font-bold mb-1 uppercase tracking-wider">承包商类型</span> <span className="text-gray-700">{c.type === 'LONG_TERM' ? '长期服务' : '短期/临时'}</span></div>
             <div><span className="block text-[11px] text-gray-500 font-bold mb-1 uppercase tracking-wider">联系人</span> <span className="text-gray-700">{c.contactName} ({c.contactPhone})</span></div>
             <div className="col-span-2 lg:col-span-4"><span className="block text-[11px] text-gray-500 font-bold mb-1 uppercase tracking-wider">服务范围</span> <span className="text-gray-700">{c.scope}</span></div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
          <h3 className="text-sm font-bold text-[#1E3932] mb-6 uppercase tracking-wider flex items-center">
             <span className="w-2 h-2 bg-[#006241] rounded-full mr-2"></span>
             人员与资质
          </h3>
          {c.workers.length === 0 ? (
            <div className="text-center py-6 text-sm text-gray-500 italic">暂无人员记录</div>
          ) : (
            <div className="border border-gray-200 rounded overflow-hidden">
               <table className="w-full text-left text-sm text-[#1E3932]">
                  <thead className="bg-[#E8F0ED] text-xs uppercase tracking-wider">
                     <tr>
                        <th className="p-3 font-bold border-b border-gray-200">姓名与身份</th>
                        <th className="p-3 font-bold border-b border-gray-200">工种</th>
                        <th className="p-3 font-bold border-b border-gray-200">入场培训</th>
                        <th className="p-3 font-bold border-b border-gray-200">健康证</th>
                        <th className="p-3 font-bold border-b border-gray-200">特种资质</th>
                     </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                     {c.workers.map((w, i) => (
                        <tr key={i} className="hover:bg-gray-50">
                           <td className="p-3">
                              <p className="font-bold">{w.name}</p>
                              <p className="text-[10px] font-mono text-gray-500">{w.idCard}</p>
                           </td>
                           <td className="p-3 text-xs">{w.type}</td>
                           <td className="p-3">
                              {w.trained ? <span className="text-green-600 font-bold text-xs">有效至 {w.trainingExpiry}</span> : <span className="text-red-600 font-bold text-xs">未完成</span>}
                           </td>
                           <td className="p-3">
                              {w.healthCert === '有效' ? <span className="text-green-600 font-bold text-xs">有效至 {w.healthCertExpiry}</span> : <span className="text-red-600 font-bold text-xs">{w.healthCert}</span>}
                           </td>
                           <td className="p-3 text-xs">{w.specialCert}</td>
                        </tr>
                     ))}
                  </tbody>
               </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
