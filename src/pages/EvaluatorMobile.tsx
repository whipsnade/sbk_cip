import React, { useState, useEffect } from 'react';
import { useAppContext } from '../context/AppContext';
import { QrCode, Search, ChevronRight, CheckCircle, Star, ThumbsUp, LogOut, Phone, ShieldAlert, Award, MessageSquare, ClipboardList, Send, AlertTriangle, Key } from 'lucide-react';

export const EvaluatorMobile = () => {
  const { areaMappings, orders, evaluations, addEvaluation, setRole, setView } = useAppContext();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [phone, setPhone] = useState('13800138001'); // default matches 张明
  const [code, setCode] = useState('');
  const [countdown, setCountdown] = useState(0);
  const [matchedManager, setMatchedManager] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<'ORDERS' | 'HISTORY'>('ORDERS');
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);

  // Form states for active evaluation
  const [ratingScore, setRatingScore] = useState(5);
  const [complaintText, setComplaintText] = useState('');
  const [isSuccessScreen, setIsSuccessScreen] = useState(false);

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
    const found = areaMappings.find(m => m.managerPhone.trim() === phone.trim());
    if (!found) {
      return alert(`未找到该手机对应的绑定配置，请前往“管理后台” -> “区域主管与评价配置”中先配置绑定该手机号。演示可用：13800138001`);
    }
    setCountdown(60);
    alert('【星巴克 CIP】验证码已发送：8888');
  };

  const handlePhoneLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (code !== '8888' && code !== '1234') {
      return alert('验证码错误，演示环境请输入: 8888');
    }
    const found = areaMappings.find(m => m.managerPhone.trim() === phone.trim());
    if (found) {
      setMatchedManager(found);
      setIsLoggedIn(true);
    } else {
      alert(`未找到该手机对应的绑定配置，请前往“管理后台” -> “区域主管与评价配置”中先配置绑定该手机号。演示可用：13800138001`);
    }
  };

  const handleQrLoginDemo = () => {
    // Simulate QR code scanning by picking the first pre-configured manager
    if (areaMappings.length > 0) {
      const target = areaMappings[0];
      setPhone(target.managerPhone);
      setCode('8888');
      setMatchedManager(target);
      setIsLoggedIn(true);
      alert(`[扫码登录成功] 自动识别到：${target.managerName}（负责区域: ${target.areaName}），已免验证码快捷登入。`);
    } else {
      alert('系统中尚无配置映射，请先使用管理后台添加配置');
    }
  };

  // Filter orders matching the manager's responsible area
  const managerOrders = matchedManager 
    ? orders.filter(o => o.area.some((a: string) => a.includes(matchedManager.areaName) || matchedManager.areaName.includes(a)))
    : [];

  // Filter history submitted by this manager
  const myHistory = matchedManager
    ? evaluations.filter(e => e.evaluator === matchedManager.managerName)
    : [];

  const handleLogout = () => {
    setRole(null);
    setView('LOGIN');
  };

  const handleOpenEvaluation = (orderId: string) => {
    setSelectedOrderId(orderId);
    setRatingScore(5);
    setComplaintText('');
    setIsSuccessScreen(false);
  };

  const handleSubmitEvaluation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedOrderId || !matchedManager) return;

    const order = orders.find(o => o.id === selectedOrderId);
    if (!order) return;

    addEvaluation({
      orderId: order.id,
      orderContent: order.content,
      supplierId: order.contractorId,
      supplierName: order.supplier,
      areaName: matchedManager.areaName,
      evaluator: matchedManager.managerName,
      score: ratingScore,
      complaint: complaintText
    });

    setIsSuccessScreen(true);
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-full flex flex-col justify-between bg-white">
        <div className="px-6 pt-10">
          {/* Header */}
          <div className="flex flex-col items-center text-center mb-6">
            <div className="w-16 h-16 bg-[#006241] rounded-full flex items-center justify-center mb-4 shadow-md">
              <QrCode className="text-white" size={32} />
            </div>
            <h2 className="text-xl font-bold text-[#1E3932]">星巴克 CIP · 评价移动端</h2>
            <p className="text-xs text-gray-500 mt-1 uppercase tracking-wider font-medium">区域管理人员扫码考核</p>
          </div>

          <div className="bg-[#FCF8F3] p-4 rounded border border-orange-200 mb-6 text-xs text-gray-700 space-y-2">
            <p className="font-bold text-orange-800 flex items-center gap-1"><AlertTriangle size={14} /> 功能指引：</p>
            <p className="leading-relaxed">
              现场区域管理人员可扫描施工现场的<b>评价二维码</b>快速跳转登录，查看该区域内的在场施工单，并进行考核评分、投诉反馈。
            </p>
            <button 
              type="button" 
              onClick={handleQrLoginDemo}
              className="w-full mt-2 bg-white text-[#006241] border border-[#006241] hover:bg-[#E8F0ED] py-2 rounded text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-1.5"
            >
              <QrCode size={14} /> 模拟现场扫码一键登录
            </button>
          </div>

          {/* Form */}
          <div className="relative flex py-2 items-center">
            <div className="flex-grow border-t border-gray-200"></div>
            <span className="flex-shrink mx-4 text-xs text-gray-400 font-bold uppercase">或通过手机号+验证码登录</span>
            <div className="flex-grow border-t border-gray-200"></div>
          </div>

          <form onSubmit={handlePhoneLogin} className="space-y-4 mt-4">
            <div>
              <label className="block text-xs font-bold text-[#1E3932] uppercase tracking-wider mb-1.5">手机号码</label>
              <div className="relative">
                <input 
                  required
                  type="tel" 
                  placeholder="请输入预留手机号"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-[#F8F8F8] border border-gray-200 rounded text-sm focus:outline-none focus:border-[#006241]"
                />
                <Phone size={16} className="absolute left-3 top-3.5 text-gray-400" />
              </div>
              <p className="text-[10px] text-gray-400 mt-1">系统会自动关联您的姓名和负责厂区，演示可用：13800138001</p>
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
              className="w-full bg-[#006241] text-white py-3 rounded font-bold shadow hover:bg-[#00754A] transition-colors flex items-center justify-center gap-1.5"
            >
              验证并进入
            </button>
          </form>
        </div>

        <div className="p-6 text-center text-[10px] text-gray-400 border-t border-gray-100">
          星巴克 (Starbucks) 资产安保与安全生产合规团队
        </div>
      </div>
    );
  }

  // Active Screen is selected Order Evaluation form
  if (selectedOrderId) {
    const order = orders.find(o => o.id === selectedOrderId);
    if (!order) return <div className="p-4">Order Not Found</div>;

    return (
      <div className="bg-[#F2F0EB] min-h-full pb-10 animate-in slide-in-from-right duration-300 flex flex-col">
        <div className="bg-[#1E3932] text-white p-5 flex items-center justify-between shrink-0">
          <button onClick={() => setSelectedOrderId(null)} className="text-sm font-bold opacity-80 hover:opacity-100 flex items-center gap-1">
            ← 返回
          </button>
          <span className="text-xs bg-green-50/20 px-2 py-0.5 rounded font-bold">{matchedManager.areaName}</span>
        </div>

        <div className="flex-1 p-4 overflow-y-auto">
          {!isSuccessScreen ? (
            <form onSubmit={handleSubmitEvaluation} className="space-y-4">
              {/* Order summary card */}
              <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm space-y-3">
                <span className="text-[9px] bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded font-bold">单据号: {order.id}</span>
                <h3 className="font-bold text-[#1E3932] text-md">{order.content}</h3>
                <div className="text-xs text-gray-500 space-y-1">
                  <p>施工单位：{order.supplier}</p>
                  <p>计划时间：{order.startTime} ~ {order.endTime}</p>
                </div>
              </div>

              {/* Evaluation rating card */}
              <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm space-y-5">
                <div className="text-center space-y-2">
                  <h4 className="text-sm font-bold text-[#1E3932]">1. 请您为本次施工表现打分</h4>
                  <p className="text-xs text-gray-400">评分直接计入承包商的星级得分中</p>
                  
                  {/* Interactive Star component */}
                  <div className="flex justify-center gap-2 pt-2">
                    {[1, 2, 3, 4, 5].map(star => (
                      <button 
                        key={star}
                        type="button"
                        onClick={() => setRatingScore(star)}
                        className="text-yellow-500 transform active:scale-125 transition-transform"
                      >
                        <Star 
                          size={32} 
                          fill={star <= ratingScore ? "currentColor" : "none"} 
                          className={star <= ratingScore ? "text-yellow-500" : "text-gray-200"}
                        />
                      </button>
                    ))}
                  </div>
                  <span className="text-xs font-bold text-[#006241] mt-1.5 block">
                    {ratingScore === 5 && '非常满意 - 施工规范，完全清理'}
                    {ratingScore === 4 && '满意 - 施工规范，但细节略有不足'}
                    {ratingScore === 3 && '一般 - 出现轻微违规或垃圾未倒'}
                    {ratingScore === 2 && '不满意 - 存在施工瑕疵或轻微安全隐患'}
                    {ratingScore === 1 && '严重警告 - 违规动火/未戴安全帽等恶性行为'}
                  </span>
                </div>

                <div className="border-t border-gray-100 pt-4 space-y-2">
                  <h4 className="text-xs font-bold text-[#1E3932] uppercase tracking-wider">2. 提报具体意见或投诉 (选填)</h4>
                  <textarea 
                    placeholder="如遇不戴安全防护装备、垃圾未倒、超时施工等违规行为，请在此补充描述..."
                    value={complaintText}
                    onChange={e => setComplaintText(e.target.value)}
                    className="w-full bg-[#F8F8F8] border border-gray-200 rounded p-3 text-xs h-28 focus:outline-none focus:border-[#006241] text-gray-700"
                  />
                </div>
              </div>

              <button 
                type="submit" 
                className="w-full bg-[#006241] text-white py-3.5 rounded-lg font-bold shadow hover:bg-[#00754A] transition-colors flex items-center justify-center gap-1.5"
              >
                <Send size={16} /> 提交区域评价表单
              </button>
            </form>
          ) : (
            <div className="bg-white rounded-xl p-8 border border-gray-200 text-center space-y-6 shadow-sm my-6">
              <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto text-[#006241]">
                <CheckCircle size={40} />
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-bold text-[#1E3932]">评价提报成功！</h3>
                <p className="text-xs text-gray-500 leading-relaxed">
                  您的现场评价及考核结果已流转至<b>审批人员</b>，待审核确认后将自动记入该承包商的健康度画像评分库中。
                </p>
              </div>

              <div className="bg-[#F8F8F8] border border-gray-100 rounded p-4 text-left text-xs space-y-1 text-gray-600">
                <p><span className="font-bold text-[#1E3932]">承包商：</span>{order.supplier}</p>
                <p><span className="font-bold text-[#1E3932]">打分星级：</span><span className="text-yellow-500 font-bold">{ratingScore} 星</span></p>
                <p><span className="font-bold text-[#1E3932]">评价主管：</span>{matchedManager.managerName}</p>
              </div>

              <button 
                type="button"
                onClick={() => { setSelectedOrderId(null); setActiveTab('HISTORY'); }}
                className="w-full bg-[#006241] text-white py-2.5 rounded font-bold hover:bg-[#00754A]"
              >
                查看我的提交记录
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#F2F0EB] min-h-full pb-10 flex flex-col">
      {/* Welcome Header */}
      <div className="bg-[#1E3932] text-white p-5 rounded-b-[1.5rem] shadow-md shrink-0">
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <span className="text-[10px] bg-white/20 text-white px-2.5 py-0.5 rounded-full font-bold">区域管理人员</span>
            <h2 className="text-lg font-bold">您好，{matchedManager.managerName}</h2>
            <p className="text-[11px] text-green-100/70">负责区域: <span className="font-bold underline">{matchedManager.areaName}</span></p>
          </div>
          <button onClick={handleLogout} className="p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors">
            <LogOut size={16} />
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="px-4 -mt-3 relative z-10 shrink-0">
        <div className="bg-white p-1 rounded-xl shadow border border-gray-100 flex">
          <button 
            onClick={() => setActiveTab('ORDERS')}
            className={`flex-1 py-2.5 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 ${activeTab === 'ORDERS' ? 'bg-[#006241] text-white shadow-sm' : 'text-gray-500'}`}
          >
            <Award size={14} /> 辖区内在场施工 ({managerOrders.length})
          </button>
          <button 
            onClick={() => setActiveTab('HISTORY')}
            className={`flex-1 py-2.5 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 ${activeTab === 'HISTORY' ? 'bg-[#006241] text-white shadow-sm' : 'text-gray-500'}`}
          >
            <ClipboardList size={14} /> 我的评价记录 ({myHistory.length})
          </button>
        </div>
      </div>

      {/* Main List Area */}
      <div className="flex-1 p-4 overflow-y-auto">
        {activeTab === 'ORDERS' ? (
          managerOrders.length === 0 ? (
            <div className="bg-white p-8 rounded-xl border border-dashed border-gray-200 text-center text-gray-400 space-y-2">
              <CheckCircle size={36} className="text-gray-300 mx-auto" />
              <p className="text-sm font-bold text-gray-500">当前辖区暂无正在进行的施工</p>
              <p className="text-xs">若有新施工单，请在管理后台为其关联 <b>{matchedManager.areaName}</b></p>
            </div>
          ) : (
            <div className="space-y-3">
              {managerOrders.map(o => {
                // Check if already evaluated
                const alreadyEval = evaluations.find(e => e.orderId === o.id && e.evaluator === matchedManager.managerName);
                return (
                  <div 
                    key={o.id}
                    className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm flex flex-col gap-3"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="text-[9px] bg-green-50 text-[#006241] px-1.5 py-0.5 rounded font-bold border border-green-100">
                          {o.area.join(', ')}
                        </span>
                        <h4 className="text-sm font-bold text-[#1E3932] mt-1">{o.content}</h4>
                      </div>
                      <span className={`text-[9px] px-1.5 rounded font-bold ${
                        o.status === 'IN_PROGRESS' ? 'bg-[#006241]/10 text-[#006241]' : 'bg-gray-100 text-gray-600'
                      }`}>
                        {o.status === 'IN_PROGRESS' ? '施工中' : '待派工/其他'}
                      </span>
                    </div>

                    <div className="text-[11px] text-gray-500 border-t border-gray-50 pt-2 flex justify-between items-center">
                      <div>
                        <p className="font-bold">{o.supplier}</p>
                        <p>{o.startTime} 至 {o.endTime}</p>
                      </div>
                      {alreadyEval ? (
                        <span className="text-[11px] text-gray-400 font-bold flex items-center gap-0.5">
                          已评价 ({alreadyEval.score}星)
                        </span>
                      ) : (
                        <button 
                          onClick={() => handleOpenEvaluation(o.id)}
                          className="bg-[#006241] text-white px-3 py-1.5 rounded text-xs font-bold hover:bg-[#00754A] shadow-sm transition-colors"
                        >
                          进行评价/投诉
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )
        ) : (
          myHistory.length === 0 ? (
            <div className="bg-white p-8 rounded-xl border border-dashed border-gray-200 text-center text-gray-400">
              <p className="text-sm font-bold text-gray-500 mb-1">暂无提交记录</p>
              <p className="text-xs">您提交的所有评价表单会显示在这里</p>
            </div>
          ) : (
            <div className="space-y-3">
              {myHistory.map(h => (
                <div key={h.id} className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-mono text-gray-400">{h.createdAt}</span>
                    <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                      h.status === 'APPROVED' ? 'bg-green-50 text-green-700' : 
                      h.status === 'REJECTED' ? 'bg-red-50 text-red-700' : 'bg-orange-50 text-orange-700'
                    }`}>
                      {h.status === 'APPROVED' ? '已计分' : h.status === 'REJECTED' ? '已退回' : '审核中'}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-[#1E3932]">{h.supplierName}</h4>
                  <div className="flex items-center gap-1.5">
                    <div className="flex text-yellow-500">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star 
                          key={i} 
                          size={11} 
                          fill={i < h.score ? "currentColor" : "none"} 
                          className={i < h.score ? "text-yellow-500" : "text-gray-200"}
                        />
                      ))}
                    </div>
                    <span className="text-[11px] text-gray-500 font-bold">({h.score}分)</span>
                  </div>
                  <p className="text-xs text-gray-600 bg-gray-50 p-2.5 rounded border border-gray-100">
                    "{h.complaint || '星巴克现场卓越运营好评'}"
                  </p>
                </div>
              ))}
            </div>
          )
        )}
      </div>
    </div>
  );
};
