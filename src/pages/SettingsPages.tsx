import React, { useState } from 'react';
import { UserCog, Building, Network, Plus, Search, ChevronRight, Edit2, Trash2, Check, Settings, X, GripVertical } from 'lucide-react';

export const AdminOrg = () => {
  return (
    <div className="space-y-6 animate-in fade-in duration-500 flex flex-col h-full">
      <div className="flex justify-between items-center shrink-0">
        <h2 className="text-xl font-bold text-[#1E3932]">组织架构管理</h2>
        <button className="bg-[#006241] hover:bg-[#00754A] text-white px-4 py-2 rounded flex items-center gap-2 text-sm font-bold transition-colors shadow">
          <Plus size={16} /> 新增部门
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 flex-1 overflow-hidden">
        {/* Left Side: Org Tree */}
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm flex flex-col overflow-hidden">
          <div className="p-4 border-b border-gray-100 bg-[#F7F9F8] shrink-0">
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input type="text" placeholder="搜索部门..." className="w-full bg-white border border-gray-200 rounded pl-9 pr-3 py-2 text-sm focus:outline-none focus:border-[#006241]" />
            </div>
          </div>
          <div className="p-4 overflow-y-auto flex-1">
            <ul className="space-y-1 text-sm">
              <li>
                <div className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded cursor-pointer font-bold text-[#1E3932]">
                  <ChevronRight size={16} className="text-gray-400 rotate-90" />
                  <Building size={16} className="text-[#006241]" />
                  <span>星巴克中国</span>
                </div>
                <ul className="pl-6 space-y-1 mt-1">
                  <li>
                     <div className="flex items-center gap-2 p-2 bg-[#F2F0EB] text-[#1E3932] rounded cursor-pointer font-bold border border-gray-200">
                        <ChevronRight size={16} className="text-gray-400 opacity-0" />
                        <Building size={16} className="text-gray-500" />
                        <span>昆山产业园</span>
                     </div>
                  </li>
                  <li>
                     <div className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded cursor-pointer text-gray-700">
                        <ChevronRight size={16} className="text-gray-400" />
                        <Building size={16} className="text-gray-500" />
                        <span>上海总部</span>
                     </div>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>

        {/* Right Side: Dept Details (Mock) */}
        <div className="col-span-2 bg-white border border-gray-200 rounded-lg shadow-sm flex flex-col overflow-hidden">
           <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-[#F7F9F8] shrink-0">
             <h3 className="font-bold text-[#1E3932]">昆山产业园</h3>
             <div className="flex gap-2">
                <button className="text-[#006241] border border-[#006241] px-3 py-1.5 rounded text-xs font-bold hover:bg-green-50">编辑信息</button>
             </div>
           </div>
           
           <div className="p-6 flex-1 overflow-y-auto space-y-6">
             <div className="grid grid-cols-2 gap-y-4 gap-x-8 text-sm">
                <div><span className="text-xs text-gray-500 block mb-1 uppercase tracking-wider font-bold">部门名称</span><span className="font-bold text-[#1E3932]">昆山产业园</span></div>
                <div><span className="text-xs text-gray-500 block mb-1 uppercase tracking-wider font-bold">部门编码</span><span className="font-mono text-gray-600">KS-IP-001</span></div>
                <div><span className="text-xs text-gray-500 block mb-1 uppercase tracking-wider font-bold">负责人</span><span className="font-bold text-[#1E3932]">王建国</span></div>
                <div><span className="text-xs text-gray-500 block mb-1 uppercase tracking-wider font-bold">员工人数</span><span className="font-bold text-[#1E3932]">342</span></div>
             </div>

             <h4 className="font-bold text-xs text-gray-500 uppercase tracking-wider mb-3 pt-4 border-t border-gray-100">下属员工</h4>
             <div className="border border-gray-200 rounded overflow-hidden">
                <table className="w-full text-left text-sm text-[#1E3932]">
                   <thead className="bg-[#E8F0ED] text-xs uppercase tracking-wider">
                     <tr>
                       <th className="p-3 font-bold border-b border-gray-200">姓名</th>
                       <th className="p-3 font-bold border-b border-gray-200">工号</th>
                       <th className="p-3 font-bold border-b border-gray-200">岗位</th>
                       <th className="p-3 font-bold border-b border-gray-200">联系电话</th>
                     </tr>
                   </thead>
                   <tbody className="divide-y divide-gray-100 text-gray-600">
                     <tr className="hover:bg-gray-50">
                       <td className="p-3 font-bold text-[#1E3932]">张明</td>
                       <td className="p-3 font-mono">E100582</td>
                       <td className="p-3">EHS经理</td>
                       <td className="p-3 font-mono">138****0022</td>
                     </tr>
                     <tr className="hover:bg-gray-50">
                       <td className="p-3 font-bold text-[#1E3932]">李华</td>
                       <td className="p-3 font-mono">E100583</td>
                       <td className="p-3">安保主管</td>
                       <td className="p-3 font-mono">139****1133</td>
                     </tr>
                     <tr className="hover:bg-gray-50">
                       <td className="p-3 font-bold text-[#1E3932]">赵建</td >
                       <td className="p-3 font-mono">E100585</td>
                       <td className="p-3">项目工程师</td>
                       <td className="p-3 font-mono">186****9944</td>
                     </tr>
                   </tbody>
                </table>
             </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export const AdminRoles = () => {
  return (
    <div className="space-y-4 animate-in fade-in duration-500 flex flex-col h-full">
      <div className="flex justify-between items-center shrink-0">
        <h2 className="text-xl font-bold text-[#1E3932]">角色与权限</h2>
        <button className="bg-[#006241] hover:bg-[#00754A] text-white px-4 py-2 rounded flex items-center gap-2 text-sm font-bold transition-colors shadow">
          <Plus size={16} /> 新增角色
        </button>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg shadow-sm flex flex-col flex-1 overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex gap-4 bg-[#F7F9F8] items-center shrink-0">
          <div className="relative">
             <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"/>
             <input type="text" placeholder="搜索角色名称..." className="bg-white border border-gray-200 rounded pl-9 pr-3 py-2 text-sm w-64 focus:outline-none focus:border-[#006241]" />
          </div>
        </div>
        <div className="flex-1 overflow-auto">
          <table className="w-full text-left text-sm text-[#1E3932]">
            <thead className="bg-[#E8F0ED] text-[#1E3932] sticky top-0 z-10 border-b border-gray-200 text-xs uppercase tracking-wider">
              <tr>
                <th className="p-3 font-bold">角色名称</th>
                <th className="p-3 font-bold">角色描述</th>
                <th className="p-3 font-bold">权限清单 (示例)</th>
                <th className="p-3 font-bold">关联人数</th>
                <th className="p-3 font-bold text-right">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
               {[
                 { role: '系统管理员', desc: '拥有系统内所有高级配置与数据权限', scopes: ['所有权限'], users: 2 },
                 { role: 'EHS审批人', desc: '处理施工单高危作业审批与现场核验', scopes: ['工单审批', '审批流转'], users: 5 },
                 { role: '安保负责人', desc: '外来人员/车辆审核及现场巡检', scopes: ['门卫核验', '入园审核'], users: 12 },
                 { role: '业务发起人', desc: '发起外包施工需求表单', scopes: ['发起单据', '查看单据'], users: 145 },
               ].map((item, i) => (
                <tr key={i} className="hover:bg-gray-50 transition-colors">
                  <td className="p-3 font-bold">{item.role}</td>
                  <td className="p-3 text-gray-600">{item.desc}</td>
                  <td className="p-3">
                     <div className="flex gap-2 flex-wrap">
                       {item.scopes.map(s => <span key={s} className="bg-[#F2F0EB] border border-gray-200 px-2 py-0.5 rounded text-[11px] font-bold text-gray-600">{s}</span>)}
                     </div>
                  </td>
                  <td className="p-3"><span className="bg-green-50 text-[#006241] px-2 py-1 rounded-full text-xs font-bold border border-green-100">{item.users} 人</span></td>
                  <td className="p-3 text-right">
                    <button className="text-[#006241] hover:underline font-bold text-[11px] bg-[#F7F9F8] border border-gray-200 px-2 py-1.5 rounded mr-2">设置权限</button>
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

export const AdminWorkflow = () => {
  return (
    <div className="space-y-4 animate-in fade-in duration-500 flex flex-col h-full">
      <div className="flex justify-between items-center shrink-0">
        <div>
          <h2 className="text-xl font-bold text-[#1E3932]">审批流引擎</h2>
          <p className="text-xs text-gray-500 mt-1">拖拽定义施工单流程节点与审批逻辑</p>
        </div>
        <div className="flex gap-3">
           <button className="bg-white border border-gray-300 text-gray-600 hover:bg-gray-50 px-4 py-2 rounded text-sm font-bold transition-colors shadow-sm">
             恢复默认
           </button>
           <button className="bg-[#006241] hover:bg-[#00754A] text-white px-4 py-2 rounded flex items-center gap-2 text-sm font-bold transition-colors shadow">
             保存并发布
           </button>
        </div>
      </div>

      <div className="bg-gray-50 border border-gray-200 rounded-lg shadow-inner flex flex-col flex-1 overflow-hidden relative p-8">
         
         <div className="max-w-3xl mx-auto w-full space-y-4 relative">
            <div className="absolute left-[31px] top-6 bottom-6 w-0.5 bg-[#006241]/20 -z-0"></div>
            
            {/* Start Node */}
            <div className="flex gap-6 items-center relative z-10 group">
               <div className="w-16 h-16 bg-[#1E3932] text-white rounded-full flex items-center justify-center shrink-0 shadow-lg border-4 border-gray-50">
                  <span className="font-bold text-sm tracking-wider uppercase">Start</span>
               </div>
               <div className="bg-white p-5 rounded border border-gray-200 shadow-sm flex-1 flex justify-between items-center">
                  <div>
                    <h3 className="font-bold text-[#1E3932] mb-1">业务部门发起申请</h3>
                    <p className="text-xs text-gray-500">发起人提交施工内容、供应商及时间计划</p>
                  </div>
               </div>
            </div>

            {/* Node 1 */}
            <div className="flex gap-6 items-center relative z-10 group">
               <div className="w-16 h-16 bg-[#006241] text-white rounded-full flex items-center justify-center shrink-0 shadow border-4 border-gray-50 cursor-grab active:cursor-grabbing">
                  <Network size={20} />
               </div>
               <div className="bg-white p-5 rounded border border-[#006241] shadow-sm flex-1 flex justify-between items-center group-hover:border-[#006241] transition-colors relative">
                  <div className="absolute -left-[4px] top-1/2 -translate-y-1/2 w-2 h-8 bg-[#006241] rounded-r"></div>
                  <div>
                    <h3 className="font-bold text-[#1E3932] mb-1 flex items-center gap-2">EHS与安保联合审批 <span className="text-[10px] bg-red-50 text-red-600 px-1.5 py-0.5 rounded border border-red-100 uppercase tracking-wider font-bold">高风险必备</span></h3>
                    <p className="text-xs text-gray-500">评估风险等级并给出控制措施（会签）</p>
                  </div>
                  <div className="flex gap-2">
                     <button className="p-1.5 text-gray-400 hover:text-[#006241] bg-gray-50 rounded"><Settings size={16} /></button>
                  </div>
               </div>
            </div>

            {/* Node 2 */}
            <div className="flex gap-6 items-center relative z-10 group">
               <div className="w-16 h-16 bg-[#006241] text-white rounded-full flex items-center justify-center shrink-0 shadow border-4 border-gray-50 cursor-grab active:cursor-grabbing">
                  <Network size={20} />
               </div>
               <div className="bg-white p-5 rounded border border-gray-200 shadow-sm flex-1 flex justify-between items-center group-hover:border-[#006241] transition-colors">
                  <div>
                    <h3 className="font-bold text-[#1E3932] mb-1">供应商录入资料</h3>
                    <p className="text-xs text-gray-500">通过短链接补充作业人员、特种资质及车辆</p>
                  </div>
                  <div className="flex gap-2">
                     <button className="p-1.5 text-gray-400 hover:text-[#006241] bg-gray-50 rounded"><Settings size={16} /></button>
                     <button className="p-1.5 text-gray-400 hover:text-red-500 bg-gray-50 rounded"><Trash2 size={16} /></button>
                  </div>
               </div>
            </div>

            {/* End Node */}
            <div className="flex gap-6 items-center relative z-10">
               <div className="w-16 h-16 bg-gray-300 text-gray-600 rounded-full flex items-center justify-center shrink-0 shadow-sm border-4 border-gray-50">
                  <Check size={24} />
               </div>
               <div className="bg-white p-5 rounded border border-gray-200 shadow-sm flex-1 flex justify-between items-center opacity-70">
                  <div>
                    <h3 className="font-bold text-gray-700 mb-1">审批通过</h3>
                    <p className="text-xs text-gray-500">生成入园通行核验码</p>
                  </div>
               </div>
            </div>

            <div className="pl-24 pt-4 relative z-10">
               <button className="flex items-center gap-2 text-[#006241] font-bold text-sm bg-white border border-dashed border-[#006241] px-4 py-2 rounded hover:bg-[#E8F0ED] transition-colors">
                 <Plus size={16} /> 插入新节点
               </button>
            </div>
         </div>
         
      </div>
    </div>
  );
};
