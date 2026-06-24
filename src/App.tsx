import React, { useEffect } from 'react';
import { AppProvider, useAppContext } from './context/AppContext';
import { LoginView } from './pages/Login';
import { AdminLayout, MobileLayout } from './components/Layouts';
import { AdminDashboard, AdminOrderList, AdminNewOrder, AdminOrderDetail, AdminReports } from './pages/Admin';
import { AdminContractors, AdminContractorDetail, AdminNewContractor } from './pages/AdminContractors';
import { AdminOrg, AdminRoles, AdminWorkflow } from './pages/SettingsPages';
import { ApproverList } from './pages/Approver';
import { SupplierSmsLink, SupplierForm, SupplierSuccess, SupplierMobileHome, SupplierMobilePersonnel, SupplierMobileVehicles } from './pages/Supplier';
import { SupplierWebCompany, SupplierWebPersonnel, SupplierWebApprovals } from './pages/SupplierWeb';
import { GuardHome, GuardVerify, GuardExit, GuardExitHome } from './pages/Guard';

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
        {view === 'SUPPLIER_MOBILE_HOME' && <SupplierMobileHome />}
        {view === 'SUPPLIER_MOBILE_PERSONNEL' && <SupplierMobilePersonnel />}
        {view === 'SUPPLIER_MOBILE_VEHICLES' && <SupplierMobileVehicles />}
        {view === 'SUPPLIER_SMS' && <SupplierSmsLink />}
        {view === 'SUPPLIER_FORM' && <SupplierForm />}
        {view === 'SUPPLIER_SUCCESS' && <SupplierSuccess />}
      </MobileLayout>
    );
  }

  return (
    <AdminLayout>
      {view === 'ADMIN_DASHBOARD' && <AdminDashboard />}
      {view === 'ADMIN_CONTRACTORS' && <AdminContractors />}
      {view === 'ADMIN_CONTRACTOR_DETAIL' && <AdminContractorDetail />}
      {view === 'ADMIN_NEW_CONTRACTOR' && <AdminNewContractor />}
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
      {view === 'GUARD_EXIT' && <GuardExitHome />}
      {view === 'GUARD_EXIT_DETAIL' && <GuardExit />}
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
