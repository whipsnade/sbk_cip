import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { Plus, Trash2, Edit2, Check, X, Star, MessageSquare, ShieldAlert, ThumbsUp, Users, MapPin, ClipboardList } from 'lucide-react';

export const AdminAreaConfig = () => {
  const { areaMappings, setAreaMappings, evaluations, approveEvaluation, rejectEvaluation, contractors } = useAppContext();
  const [activeTab, setActiveTab] = useState<'MAPPINGS' | 'EVALUATIONS'>('MAPPINGS');
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [formName, setFormName] = useState('');
  const [formPhone, setFormPhone] = useState('');
  const [formArea, setFormArea] = useState('烘焙车间1线');

  const areas = ['烘焙车间1线', '配电室', '成品仓库', '咖啡豆仓库', '包装车间2线', '一楼办公区', '动力站房', '户外绿化带'];

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName || !formPhone) return alert('请填写完整信息');
    if (!/^1[3-9]\d{9}$/.test(formPhone)) return alert('请输入合法的11位手机号');
    
    const newMapping = {
      id: `map-${Date.now()}`,
      managerName: formName,
      managerPhone: formPhone,
      areaName: formArea
    };
    setAreaMappings([...areaMappings, newMapping]);
    setIsAdding(false);
    resetForm();
    alert('配置新增成功！');
  };

  const handleEdit = (id: string) => {
    const item = areaMappings.find(m => m.id === id);
    if (item) {
      setEditingId(id);
      setFormName(item.managerName);
      setFormPhone(item.managerPhone);
      setFormArea(item.areaName);
    }
  };

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName || !formPhone) return alert('请填写完整信息');
    setAreaMappings(areaMappings.map(m => m.id === editingId ? {
      ...m,
      managerName: formName,
      managerPhone: formPhone,
      areaName: formArea
    } : m));
    setEditingId(null);
    resetForm();
    alert('配置更新成功！');
  };

  const handleDelete = (id: string) => {
    if (confirm('确定要删除此对应配置吗？')) {
      setAreaMappings(areaMappings.filter(m => m.id !== id));
    }
  };

  const resetForm = () => {
    setFormName('');
    setFormPhone('');
    setFormArea('烘焙车间1线');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500 h-full overflow-y-auto pb-10">
      <div className="flex justify-between items-center shrink-0">
        <div>
          <h2 className="text-xl font-bold text-[#1E3932]">区域主管与评价配置</h2>
          <p className="text-xs text-gray-500 mt-1">管理各厂区区域负责人，并审核移动端提报的评价及投诉</p>
        </div>
        <div className="flex border border-gray-200 rounded overflow-hidden bg-white shadow-sm">
          <button 
            onClick={() => setActiveTab('MAPPINGS')} 
            className={`px-4 py-2 text-xs font-bold transition-colors flex items-center gap-2 ${activeTab === 'MAPPINGS' ? 'bg-[#006241] text-white' : 'text-gray-600 hover:bg-gray-100'}`}
          >
            <Users size={14} /> 人员区域映射
          </button>
          <button 
            onClick={() => setActiveTab('EVALUATIONS')} 
            className={`px-4 py-2 text-xs font-bold transition-colors flex items-center gap-2 relative ${activeTab === 'EVALUATIONS' ? 'bg-[#006241] text-white' : 'text-gray-600 hover:bg-gray-100'}`}
          >
            <ClipboardList size={14} /> 评价单审核
            {evaluations.filter(e => e.status === 'PENDING_APPROVER').length > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[9px] rounded-full flex items-center justify-center font-bold">
                {evaluations.filter(e => e.status === 'PENDING_APPROVER').length}
              </span>
            )}
          </button>
        </div>
      </div>

      {activeTab === 'MAPPINGS' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Mapping table */}
          <div className="lg:col-span-2 bg-white border border-gray-200 rounded-lg shadow-sm flex flex-col overflow-hidden">
            <div className="p-4 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#1E3932] flex items-center gap-1">
                <MapPin size={16} className="text-[#006241]" />
                对应关系清单 ({areaMappings.length})
              </h3>
              {!isAdding && !editingId && (
                <button 
                  onClick={() => setIsAdding(true)} 
                  className="bg-[#006241] text-white px-3 py-1.5 rounded text-xs font-bold hover:bg-[#00754A] flex items-center gap-1 transition-colors"
                >
                  <Plus size={14} /> 新增绑定
                </button>
              )}
            </div>

            <div className="overflow-x-auto flex-1">
              <table className="w-full text-left text-sm text-[#1E3932]">
                <thead className="bg-[#E8F0ED] text-[11px] uppercase tracking-wider sticky top-0">
                  <tr>
                    <th className="p-3 font-bold border-b border-gray-200">区域主管/管理人员</th>
                    <th className="p-3 font-bold border-b border-gray-200">联系手机号</th>
                    <th className="p-3 font-bold border-b border-gray-200">负责厂区区域</th>
                    <th className="p-3 font-bold border-b border-gray-200 text-right">操作</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {areaMappings.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="p-8 text-center text-gray-400 italic text-sm">暂无匹配配置，请添加。</td>
                    </tr>
                  ) : (
                    areaMappings.map(m => (
                      <tr key={m.id} className="hover:bg-gray-50 transition-colors">
                        <td className="p-3 font-bold">{m.managerName}</td>
                        <td className="p-3 font-mono text-xs">{m.managerPhone}</td>
                        <td className="p-3">
                          <span className="bg-green-50 text-[#006241] border border-green-100 px-2 py-0.5 rounded text-xs font-bold">
                            {m.areaName}
                          </span>
                        </td>
                        <td className="p-3 text-right flex justify-end gap-2">
                          <button 
                            onClick={() => handleEdit(m.id)} 
                            className="p-1 text-gray-400 hover:text-[#006241] bg-gray-50 rounded border border-gray-100 transition-colors"
                            title="编辑"
                          >
                            <Edit2 size={14} />
                          </button>
                          <button 
                            onClick={() => handleDelete(m.id)} 
                            className="p-1 text-gray-400 hover:text-red-500 bg-gray-50 rounded border border-gray-100 transition-colors"
                            title="删除"
                          >
                            <Trash2 size={14} />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Form Side */}
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 h-fit">
            {(isAdding || editingId) ? (
              <form onSubmit={editingId ? handleUpdate : handleAdd} className="space-y-4">
                <div className="flex justify-between items-center border-b border-gray-100 pb-3 mb-2">
                  <h3 className="text-xs font-bold text-[#1E3932] uppercase tracking-wider">
                    {editingId ? '编辑绑定配置' : '新增绑定配置'}
                  </h3>
                  <button 
                    type="button" 
                    onClick={() => { setIsAdding(false); setEditingId(null); resetForm(); }}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X size={16} />
                  </button>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-500 mb-1.5 uppercase">人员姓名 <span className="text-red-500">*</span></label>
                  <input 
                    required 
                    type="text" 
                    placeholder="例如：张华"
                    value={formName} 
                    onChange={e => setFormName(e.target.value)} 
                    className="w-full bg-[#F8F8F8] border border-gray-200 rounded px-3 py-2 text-sm focus:outline-none focus:border-[#006241]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-500 mb-1.5 uppercase">手机号 (登录凭证) <span className="text-red-500">*</span></label>
                  <input 
                    required 
                    type="text" 
                    placeholder="11位手机号"
                    value={formPhone} 
                    onChange={e => setFormPhone(e.target.value)} 
                    className="w-full bg-[#F8F8F8] border border-gray-200 rounded px-3 py-2 text-sm font-mono focus:outline-none focus:border-[#006241]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-500 mb-1.5 uppercase">负责的厂区区域 <span className="text-red-500">*</span></label>
                  <select 
                    value={formArea} 
                    onChange={e => setFormArea(e.target.value)} 
                    className="w-full bg-[#F8F8F8] border border-gray-200 rounded px-3 py-2 text-sm focus:outline-none focus:border-[#006241]"
                  >
                    {areas.map(a => <option key={a} value={a}>{a}</option>)}
                  </select>
                </div>

                <div className="pt-2 flex gap-2">
                  <button 
                    type="button" 
                    onClick={() => { setIsAdding(false); setEditingId(null); resetForm(); }}
                    className="flex-1 py-2 border border-gray-200 text-xs text-gray-600 rounded font-bold bg-white hover:bg-gray-50 transition-colors"
                  >
                    取消
                  </button>
                  <button 
                    type="submit" 
                    className="flex-1 py-2 bg-[#006241] text-white text-xs rounded font-bold hover:bg-[#00754A] transition-colors shadow-sm"
                  >
                    保存配置
                  </button>
                </div>
              </form>
            ) : (
              <div className="text-center py-6 text-gray-400">
                <ShieldAlert className="mx-auto text-gray-300 mb-2" size={36} />
                <p className="text-xs font-bold text-gray-500 mb-1">使用须知</p>
                <p className="text-[11px] leading-relaxed max-w-[240px] mx-auto">
                  区域管理人员通过<b>评价移动端</b>扫码或输入配置好的手机号。系统将通过手机号自动匹配其负责的厂区，展示相关的施工单。
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === 'EVALUATIONS' && (
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden flex flex-col">
          <div className="p-4 border-b border-gray-100 bg-gray-50">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#1E3932] flex items-center gap-1">
              <MessageSquare size={16} className="text-[#006241]" />
              评价单流转与审批列表 ({evaluations.length})
            </h3>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-[#1E3932]">
              <thead className="bg-[#E8F0ED] text-[11px] uppercase tracking-wider">
                <tr>
                  <th className="p-3 font-bold border-b border-gray-200">提交时间</th>
                  <th className="p-3 font-bold border-b border-gray-200">施工单位/工单</th>
                  <th className="p-3 font-bold border-b border-gray-200">施工区域/评价人</th>
                  <th className="p-3 font-bold border-b border-gray-200">评分</th>
                  <th className="p-3 font-bold border-b border-gray-200">投诉/具体意见</th>
                  <th className="p-3 font-bold border-b border-gray-200">状态</th>
                  <th className="p-3 font-bold border-b border-gray-200 text-right">流转操作</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {evaluations.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="p-8 text-center text-gray-400 italic text-sm">暂无评价记录。</td>
                  </tr>
                ) : (
                  evaluations.map(ev => (
                    <tr key={ev.id} className="hover:bg-gray-50 transition-colors">
                      <td className="p-3 text-xs text-gray-500 whitespace-nowrap">{ev.createdAt}</td>
                      <td className="p-3">
                        <p className="font-bold">{ev.supplierName}</p>
                        <p className="text-[10px] text-gray-400 mt-0.5">工单: {ev.orderContent} ({ev.orderId})</p>
                      </td>
                      <td className="p-3">
                        <p className="text-xs font-bold">{ev.areaName}</p>
                        <p className="text-[10px] text-gray-500 mt-0.5">评价主管: {ev.evaluator}</p>
                      </td>
                      <td className="p-3">
                        <div className="flex text-yellow-500">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star 
                              key={i} 
                              size={12} 
                              fill={i < ev.score ? "currentColor" : "none"} 
                              className={i < ev.score ? "text-yellow-500" : "text-gray-200"}
                            />
                          ))}
                        </div>
                        <span className="text-[10px] font-bold text-gray-500 mt-1 block">({ev.score}分)</span>
                      </td>
                      <td className="p-3 max-w-[200px]">
                        <p className="text-xs text-gray-600 truncate" title={ev.complaint}>
                          {ev.complaint || <span className="text-gray-300 italic">无</span>}
                        </p>
                      </td>
                      <td className="p-3">
                        {ev.status === 'PENDING_APPROVER' && <span className="px-1.5 py-0.5 text-[10px] bg-orange-50 text-orange-700 border border-orange-100 rounded font-bold">待审核</span>}
                        {ev.status === 'APPROVED' && <span className="px-1.5 py-0.5 text-[10px] bg-green-50 text-green-700 border border-green-100 rounded font-bold">审核通过</span>}
                        {ev.status === 'REJECTED' && <span className="px-1.5 py-0.5 text-[10px] bg-red-50 text-red-700 border border-red-100 rounded font-bold">已拒绝</span>}
                      </td>
                      <td className="p-3 text-right whitespace-nowrap">
                        {ev.status === 'PENDING_APPROVER' ? (
                          <div className="flex justify-end gap-1.5">
                            <button 
                              onClick={() => { approveEvaluation(ev.id); alert('评价审核已通过，得分已累计记入该供应商的评分中！'); }}
                              className="px-2 py-1 bg-[#006241] text-white rounded text-[11px] font-bold hover:bg-[#00754A] flex items-center gap-0.5 shadow-sm"
                            >
                              <Check size={11} /> 批准
                            </button>
                            <button 
                              onClick={() => { rejectEvaluation(ev.id); alert('评价单已拒绝。'); }}
                              className="px-2 py-1 bg-white border border-gray-200 text-red-600 rounded text-[11px] font-bold hover:bg-red-50 flex items-center gap-0.5"
                            >
                              <X size={11} /> 拒绝
                            </button>
                          </div>
                        ) : ev.status === 'APPROVED' ? (
                          <span className="text-xs text-gray-400 italic font-medium flex items-center justify-end gap-1">
                            <ThumbsUp size={12} className="text-green-600" /> 已计入供应商评分
                          </span>
                        ) : (
                          <span className="text-xs text-gray-400 italic">已驳回</span>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
