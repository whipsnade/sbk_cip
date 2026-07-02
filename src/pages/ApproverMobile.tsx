import React, { useState, useEffect } from 'react';
import { useAppContext } from '../context/AppContext';
import { Search, ChevronRight, CheckCircle, XCircle, AlertTriangle, ShieldCheck, Phone, Key, Clock, Shield, LogOut, Check, Star, MessageSquare } from 'lucide-react';
import { Order, Evaluation } from '../types';

export const ApproverMobile = () => {
  const { orders, updateOrder, evaluations, approveEvaluation, rejectEvaluation, setRole, setView } = useAppContext();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [phone, setPhone] = useState('13900001111');
  const [code, setCode] = useState('');
  const [countdown, setCountdown] = useState(0);
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const [selectedEvalId, setSelectedEvalId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'ORDERS' | 'EVALUATIONS'>('ORDERS');
  const [rejectReason, setRejectReason] = useState('');
  const [showRejectModal, setShowRejectModal] = useState(false);

  // Filter orders needing EHS/安保/部门/区域审批
  const pendingOrders = orders.filter(o => 
    o.status === 'PENDING_APPROVER' || 
    o.status === 'PENDING_DEPT' || 
    o.status === 'PENDING_AREA' || 
    o.status === 'PENDING_EHS'
  );

  const pendingEvals = evaluations.filter(e => e.status === 'PENDING_APPROVER');

  useEffect(() => {
    let timer: any;
    if (countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [countdown]);

  const handleSendCode = () => {
    if (!/^1[3-9]\d{9}$/.test(phone)) {
      return alert('请输入合法的11位手机号');
    }
    setCountdown(60);
    alert('【星巴克 CIP】验证码已发送：8888');
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (code === '8888' || code === '1234') {
      setIsLoggedIn(true);
    } else {
      alert('验证码错误，演示环境请输入: 8888');
    }
  };

  const handleApproveOrder = (orderId: string) => {
    updateOrder(orderId, { status: 'PENDING_SUPPLIER' });
    alert('审批成功！已短信下发供应商进行人员资料提报。');
    setSelectedOrderId(null);
  };

  const handleRejectOrderSubmit = () => {
    if (!rejectReason) return alert('请输入驳回整改原因');
    if (selectedOrderId) {
      updateOrder(selectedOrderId, { status: 'REJECTED', rejectReason });
      alert('已将施工单退回至发起人整改');
      setShowRejectModal(false);
      setSelectedOrderId(null);
      setRejectReason('');
    }
  };

  const handleLogout = () => {
    setRole(null);
    setView('LOGIN');
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-full flex flex-col justify-between bg-white">
        <div className="px-6 pt-12">
          {/* Header */}
          <div className="flex flex-col items-center text-center mb-8">
            <div className="w-16 h-16 bg-[#006241] rounded-full flex items-center justify-center mb-4 shadow-md">
              <Shield className="text-white" size={32} />
            </div>
            <h2 className="text-xl font-bold text-[#1E3932]">星巴克 CIP · 审批移动端</h2>
            <p className="text-xs text-gray-500 mt-1 uppercase tracking-wider font-medium">Starbucks Contractor Integration Portal</p>
          </div>

          <div className="bg-[#F2F0EB] p-4 rounded border border-gray-200 mb-6 text-xs text-gray-700 leading-relaxed">
            <p className="font-bold mb-1 text-[#1E3932]">演示提示：</p>
            <p>审批人员直接通过短信链接一键跳转，输入预留手机号获取模拟验证码 <b>8888</b> 即可快捷登录。</p>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-[#1E3932] uppercase tracking-wider mb-1.5">手机号码</label>
              <div className="relative">
                <input 
                  required
                  type="tel" 
                  placeholder="请输入手机号"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-[#F8F8F8] border border-gray-200 rounded text-sm focus:outline-none focus:border-[#006241]"
                />
                <Phone size={16} className="absolute left-3 top-3.5 text-gray-400" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#1E3932] uppercase tracking-wider mb-1.5">短信验证码</label>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <input 
                    required
                    type="text" 
                    placeholder="输入验证码"
                    value={code}
                    onChange={e => setCode(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-[#F8F8F8] border border-gray-200 rounded text-sm focus:outline-none focus:border-[#006241]"
                  />
                  <Key size={16} className="absolute left-3 top-3.5 text-gray-400" />
                </div>
                <button 
                  type="button" 
                  disabled={countdown > 0}
                  onClick={handleSendCode}
                  className={`px-4 text-xs font-bold rounded border whitespace-nowrap ${countdown > 0 ? 'bg-gray-100 text-gray-400 border-gray-200' : 'bg-white border-[#006241] text-[#006241] hover:bg-[#E8F0ED]'}`}
                >
                  {countdown > 0 ? `${countdown}s` : '获取验证码'}
                </button>
              </div>
            </div>

            <button 
              type="submit" 
              className="w-full bg-[#006241] text-white py-3.5 rounded font-bold shadow hover:bg-[#00754A] transition-colors flex items-center justify-center gap-1.5 mt-6"
            >
              登 录 <ChevronRight size={18} />
            </button>
          </form>
        </div>

        <div className="p-6 text-center text-[10px] text-gray-400 border-t border-gray-100">
          星巴克 (Starbucks) 资产安保与安全生产合规团队
        </div>
      </div>
    );
  }

  // Active Screen is selected Order Detail
  if (selectedOrderId) {
    const order = orders.find(o => o.id === selectedOrderId);
    if (!order) return <div className="p-4">Order Not Found</div>;

    return (
      <div className="bg-[#F2F0EB] min-h-full pb-20 animate-in slide-in-from-right duration-300">
        {/* Detail Top Header */}
        <div className="bg-[#1E3932] text-white p-5 sticky top-0 z-10 flex items-center justify-between">
          <button onClick={() => setSelectedOrderId(null)} className="text-sm font-bold opacity-80 hover:opacity-100 flex items-center gap-1">
            ← 返回列表
          </button>
          <span className="text-xs bg-yellow-50 text-yellow-700 px-2 py-0.5 rounded font-bold">待审批</span>
        </div>

        <div className="p-4 space-y-4">
          {/* Main Info Card */}
          <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm space-y-4">
            <div>
              <span className="text-[10px] bg-[#E8F0ED] text-[#006241] px-2 py-0.5 rounded font-bold uppercase tracking-wider">{order.id}</span>
              <h2 className="text-lg font-bold text-[#1E3932] mt-1.5">{order.content}</h2>
            </div>

            <div className="border-t border-gray-100 pt-3 space-y-2 text-xs">
              <div className="flex justify-between"><span className="text-gray-500">施工单位:</span><span className="font-bold text-[#1E3932]">{order.supplier}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">施工区域:</span><span className="font-bold text-[#1E3932]">{order.area.join(', ')}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">施工时间:</span><span className="font-bold text-[#1E3932]">{order.startTime} ~ {order.endTime}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">发起人/部门:</span><span className="font-bold text-[#1E3932]">{order.createdBy}</span></div>
            </div>
          </div>

          {/* Risk assessment */}
          <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 space-y-2">
            <h3 className="text-xs font-bold text-orange-800 flex items-center gap-1.5">
              <AlertTriangle size={14} /> 安全与风险管控评估
            </h3>
            <p className="text-xs text-orange-950 font-bold leading-relaxed">
              {order.highRisk ? '★ 本单涉及高风险特种作业，须严格审查！' : '常规低风险改造作业。'}
            </p>
            {order.permits && order.permits.length > 0 && (
              <div className="flex gap-1.5 flex-wrap pt-1.5">
                {order.permits.map(p => (
                  <span key={p} className="text-[10px] bg-orange-100 text-orange-700 border border-orange-200 px-1.5 py-0.5 rounded font-bold">{p}</span>
                ))}
              </div>
            )}
            {order.ppe && order.ppe.length > 0 && (
              <div className="pt-2">
                <span className="text-[10px] text-gray-500 block mb-1">要求配备的 PPE：</span>
                <p className="text-xs text-gray-700">{order.ppe.join(', ')}</p>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-2">
            <button 
              onClick={() => handleApproveOrder(order.id)}
              className="flex-1 bg-[#006241] hover:bg-[#00754A] text-white py-3 rounded-lg font-bold shadow text-sm flex items-center justify-center gap-1.5"
            >
              <CheckCircle size={16} /> 同意并下发
            </button>
            <button 
              onClick={() => setShowRejectModal(true)}
              className="flex-1 bg-white border border-gray-300 hover:bg-gray-50 text-red-600 py-3 rounded-lg font-bold text-sm flex items-center justify-center gap-1.5"
            >
              <XCircle size={16} /> 驳回整改
            </button>
          </div>
        </div>

        {/* Reject Modal */}
        {showRejectModal && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl p-5 w-full max-w-sm space-y-4 shadow-xl">
              <h3 className="font-bold text-[#1E3932] text-sm">驳回整改原因</h3>
              <textarea 
                required
                placeholder="请输入详细的整改及控制要求..." 
                value={rejectReason}
                onChange={e => setRejectReason(e.target.value)}
                className="w-full bg-[#F8F8F8] border border-gray-200 rounded p-3 text-xs h-28 focus:outline-none focus:border-red-500"
              />
              <div className="flex gap-2">
                <button 
                  onClick={() => setShowRejectModal(false)}
                  className="flex-1 py-2 border border-gray-200 rounded text-xs font-bold text-gray-600 bg-white"
                >
                  取消
                </button>
                <button 
                  onClick={handleRejectOrderSubmit}
                  className="flex-1 py-2 bg-red-600 text-white rounded text-xs font-bold hover:bg-red-700"
                >
                  确定驳回
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Active Screen is selected Evaluation Detail
  if (selectedEvalId) {
    const ev = evaluations.find(e => e.id === selectedEvalId);
    if (!ev) return <div className="p-4">Evaluation Not Found</div>;

    const handleApproveEval = () => {
      approveEvaluation(ev.id);
      alert('已审批通过评价，评分已生效并记录在供应商评分中！');
      setSelectedEvalId(null);
    };

    const handleRejectEval = () => {
      rejectEvaluation(ev.id);
      alert('已驳回此评价意见');
      setSelectedEvalId(null);
    };

    return (
      <div className="bg-[#F2F0EB] min-h-full pb-20 animate-in slide-in-from-right duration-300">
        <div className="bg-[#1E3932] text-white p-5 sticky top-0 z-10 flex items-center justify-between">
          <button onClick={() => setSelectedEvalId(null)} className="text-sm font-bold opacity-80 hover:opacity-100 flex items-center gap-1">
            ← 返回列表
          </button>
          <span className="text-xs bg-orange-50 text-orange-700 px-2 py-0.5 rounded font-bold">待审核评价</span>
        </div>

        <div className="p-4 space-y-4">
          <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm space-y-4">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-[10px] bg-green-50 text-[#006241] border border-green-100 px-2 py-0.5 rounded font-bold uppercase tracking-wider">{ev.areaName}</span>
                <h3 className="text-lg font-bold text-[#1E3932] mt-1.5">{ev.supplierName}</h3>
              </div>
              <div className="flex items-center gap-1 bg-yellow-50 px-2.5 py-1 rounded text-yellow-600 font-bold text-sm">
                <Star size={14} fill="currentColor" /> {ev.score}
              </div>
            </div>

            <div className="border-t border-gray-100 pt-3 space-y-2 text-xs">
              <div><span className="text-gray-500">关联施工单:</span> <span className="font-bold text-[#1E3932]">{ev.orderContent}</span></div>
              <div><span className="text-gray-500">提报评价人:</span> <span className="font-bold text-[#1E3932]">{ev.evaluator} (区域主管)</span></div>
              <div><span className="text-gray-500">提报时间:</span> <span className="font-mono text-gray-500">{ev.createdAt}</span></div>
            </div>

            <div className="border-t border-gray-100 pt-3">
              <span className="text-[10px] text-gray-400 uppercase tracking-wider block mb-1">评价与投诉意见</span>
              <p className="text-xs bg-[#F8F8F8] p-3 rounded text-gray-700 leading-relaxed italic border border-gray-100">
                "{ev.complaint || '未填写具体说明，默认满分好评。'}"
              </p>
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <button 
              onClick={handleApproveEval}
              className="flex-1 bg-[#006241] hover:bg-[#00754A] text-white py-3 rounded-lg font-bold shadow text-sm flex items-center justify-center gap-1.5"
            >
              <Check size={16} /> 审核批准并计分
            </button>
            <button 
              onClick={handleRejectEval}
              className="flex-1 bg-white border border-gray-300 hover:bg-gray-50 text-red-600 py-3 rounded-lg font-bold text-sm flex items-center justify-center gap-1.5"
            >
              <XCircle size={16} /> 驳回
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#F2F0EB] min-h-full pb-10 flex flex-col">
      {/* Welcome Bar */}
      <div className="bg-[#1E3932] text-white p-5 rounded-b-[1.5rem] shadow-md relative overflow-hidden shrink-0">
        <div className="relative z-10 flex justify-between items-start">
          <div>
            <span className="text-[10px] bg-white/20 text-white px-2.5 py-0.5 rounded-full font-bold">EHS与安保团队</span>
            <h2 className="text-lg font-bold mt-1">您好, 审批负责人</h2>
            <p className="text-[11px] text-green-100/70 mt-0.5">请快速处理当日施工单与评价审核</p>
          </div>
          <button onClick={handleLogout} className="p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors">
            <LogOut size={16} />
          </button>
        </div>
        <div className="absolute right-0 bottom-0 w-24 h-24 bg-white/5 rounded-tl-full"></div>
      </div>

      {/* Tabs */}
      <div className="px-4 -mt-3 relative z-10 shrink-0">
        <div className="bg-white p-1 rounded-xl shadow border border-gray-100 flex">
          <button 
            onClick={() => setActiveTab('ORDERS')}
            className={`flex-1 py-2.5 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 ${activeTab === 'ORDERS' ? 'bg-[#006241] text-white shadow-sm' : 'text-gray-500'}`}
          >
            <Clock size={14} /> 待审批施工单 ({pendingOrders.length})
          </button>
          <button 
            onClick={() => setActiveTab('EVALUATIONS')}
            className={`flex-1 py-2.5 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 ${activeTab === 'EVALUATIONS' ? 'bg-[#006241] text-white shadow-sm' : 'text-gray-500'}`}
          >
            <MessageSquare size={14} /> 待审核评价 ({pendingEvals.length})
          </button>
        </div>
      </div>

      {/* List Area */}
      <div className="flex-1 p-4 overflow-y-auto">
        {activeTab === 'ORDERS' ? (
          pendingOrders.length === 0 ? (
            <div className="bg-white p-8 rounded-xl border border-dashed border-gray-200 text-center text-gray-400 space-y-2">
              <CheckCircle size={36} className="text-green-600 mx-auto" />
              <p className="text-sm font-bold text-gray-500">暂无待审批的施工单</p>
              <p className="text-xs">所有的外包施工单都已处理完毕</p>
            </div>
          ) : (
            <div className="space-y-3">
              {pendingOrders.map(o => (
                <div 
                  key={o.id} 
                  onClick={() => setSelectedOrderId(o.id)}
                  className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm hover:border-[#006241] transition-all cursor-pointer flex justify-between items-center group"
                >
                  <div className="space-y-1.5 flex-1 pr-4">
                    <div className="flex items-center gap-2">
                      <span className="text-[9px] bg-yellow-50 text-yellow-700 border border-yellow-200 px-1.5 py-0.5 rounded font-bold">待审批</span>
                      {o.highRisk && <span className="text-[9px] bg-red-50 text-red-600 px-1.5 rounded font-bold">★ 高风险</span>}
                    </div>
                    <h4 className="text-sm font-bold text-[#1E3932] line-clamp-1">{o.content}</h4>
                    <div className="text-[11px] text-gray-500 space-y-0.5">
                      <p>申请单位: {o.supplier}</p>
                      <p>计划时间: {o.startTime.split(' ')[0]}</p>
                    </div>
                  </div>
                  <ChevronRight size={16} className="text-gray-400 group-hover:translate-x-1 transition-transform" />
                </div>
              ))}
            </div>
          )
        ) : (
          pendingEvals.length === 0 ? (
            <div className="bg-white p-8 rounded-xl border border-dashed border-gray-200 text-center text-gray-400 space-y-2">
              <CheckCircle size={36} className="text-green-600 mx-auto" />
              <p className="text-sm font-bold text-gray-500">暂无待审核的评价单</p>
              <p className="text-xs">所有来自区域主管的主动评分均已处理</p>
            </div>
          ) : (
            <div className="space-y-3">
              {pendingEvals.map(e => (
                <div 
                  key={e.id} 
                  onClick={() => setSelectedEvalId(e.id)}
                  className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm hover:border-[#006241] transition-all cursor-pointer flex justify-between items-center group"
                >
                  <div className="space-y-1.5 flex-1 pr-4">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] bg-green-50 text-[#006241] px-2 rounded font-bold">{e.areaName}</span>
                      <div className="flex items-center gap-0.5 text-yellow-500 text-xs font-bold">
                        <Star size={11} fill="currentColor" /> {e.score}
                      </div>
                    </div>
                    <h4 className="text-xs font-bold text-gray-700">{e.supplierName}</h4>
                    <p className="text-[11px] text-gray-500 truncate italic">"{e.complaint || '未填写具体说明'}"</p>
                    <p className="text-[10px] text-gray-400">评价主管: {e.evaluator}</p>
                  </div>
                  <ChevronRight size={16} className="text-gray-400 group-hover:translate-x-1 transition-transform" />
                </div>
              ))}
            </div>
          )
        )}
      </div>
    </div>
  );
};
