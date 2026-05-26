import React, { useEffect } from 'react';
import { AppProvider, useAppContext } from './context/AppContext';
import { LoginView } from './pages/Login';
import { AdminLayout, MobileLayout } from './components/Layouts';
import { AdminDashboard, AdminOrderList, AdminNewOrder, AdminOrderDetail, AdminReports } from './pages/Admin';
import { AdminOrg, AdminRoles, AdminWorkflow } from './pages/SettingsPages';
import { ApproverList } from './pages/Approver';
import { SupplierSmsLink, SupplierForm, SupplierSuccess } from './pages/Supplier';
import { SupplierWebCompany, SupplierWebPersonnel, SupplierWebApprovals } from './pages/SupplierWeb';
import { GuardHome, GuardVerify } from './pages/Guard';

function AppContent() {
  const { view, role } = useAppContext();

  useEffect(() => {
     window.scrollTo(0, 0);
  }, [view]);

  if (view === 'LOGIN' || !role) {
    return <LoginView />;
  }

  if (role === 'SUPPLIER') {
    return (
      <MobileLayout>
        {view === 'SUPPLIER_SMS' && <SupplierSmsLink />}
        {view === 'SUPPLIER_FORM' && <SupplierForm />}
        {view === 'SUPPLIER_SUCCESS' && <SupplierSuccess />}
      </MobileLayout>
    );
  }

  return (
    <AdminLayout>
      {view === 'ADMIN_DASHBOARD' && <AdminDashboard />}
      {view === 'ADMIN_ORDER_LIST' && <AdminOrderList />}
      {view === 'ADMIN_NEW_ORDER' && <AdminNewOrder />}
      {view === 'ADMIN_ORDER_DETAIL' && <AdminOrderDetail />}
      {view === 'ADMIN_REPORTS' && <AdminReports />}
      {view === 'ADMIN_ORG' && <AdminOrg />}
      {view === 'ADMIN_ROLES' && <AdminRoles />}
      {view === 'ADMIN_WORKFLOW' && <AdminWorkflow />}
      
      {view === 'APPROVER_LIST' && <ApproverList />}
      
      {view === 'SUPPLIER_WEB_COMPANY' && <SupplierWebCompany />}
      {view === 'SUPPLIER_WEB_PERSONNEL' && <SupplierWebPersonnel />}
      {view === 'SUPPLIER_WEB_APPROVALS' && <SupplierWebApprovals />}

      {view === 'GUARD_HOME' && <GuardHome />}
      {view === 'GUARD_VERIFY' && <GuardVerify />}
      {view === 'GUARD_EXIT' && (
        <div className="flex flex-col items-center justify-center h-[60vh] text-center animate-in fade-in zoom-in-95">
           <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center text-gray-400 mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
           </div>
           <h2 className="text-2xl font-bold text-[#1E3932] mb-3">离厂注销登记模块</h2>
           <p className="text-gray-500 max-w-sm mx-auto leading-relaxed">
             演示环境未展开。<br/>实际流程门卫扫描临时通行卡，系统校验后回收卡片并发还身份证原件。
           </p>
        </div>
      )}
    </AdminLayout>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
