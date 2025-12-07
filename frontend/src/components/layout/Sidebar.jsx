import { useState } from "react";
import {
  HomeIcon,
  ClipboardDocumentListIcon,
  ChartBarIcon,
  UserGroupIcon,
  DocumentTextIcon,
  ChevronDownIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";

export default function Sidebar() {
  const [openServices, setOpenServices] = useState(true);
  const [openInvoices, setOpenInvoices] = useState(true);

  return (
    <div className="w-64 bg-gray-50 border-r border-gray-200 min-h-screen p-3">
      
      {/* Profile */}
      <div className="flex items-center gap-3 p-3 mb-4 bg-white rounded-lg shadow-sm">
        <HomeIcon className="w-8 h-8 p-1 bg-gray-900 text-white rounded-md" />
        <div>
          <p className="font-semibold text-gray-900">Vault</p>
          <p className="text-sm text-gray-600">Anurag Yadav</p>
        </div>
      </div>

      {/* Main Menu */}
      <nav className="space-y-1">

        <SidebarItem icon={<HomeIcon />} label="Dashboard" active />

        <SidebarItem icon={<ClipboardDocumentListIcon />} label="Nexus" />
        <SidebarItem icon={<ChartBarIcon />} label="Intake" />

        {/* Services Group */}
        <SidebarGroup
          label="Services"
          open={openServices}
          toggle={() => setOpenServices(!openServices)}
        >
          <SidebarSubItem label="Pre-active" />
          <SidebarSubItem label="Active" />
          <SidebarSubItem label="Blocked" />
          <SidebarSubItem label="Closed" />
        </SidebarGroup>

        {/* Invoices Group */}
        <SidebarGroup
          label="Invoices"
          open={openInvoices}
          toggle={() => setOpenInvoices(!openInvoices)}
        >
          <SidebarSubItem label="Proforma Invoices" />
          <SidebarSubItem label="Final Invoices" />
        </SidebarGroup>

      </nav>
    </div>
  );
}

function SidebarItem({ icon, label, active }) {
  return (
    <div
      className={`flex items-center gap-3 rounded-md px-3 py-2 cursor-pointer
      ${active ? "bg-gray-900 text-white font-medium" : "text-gray-700 hover:bg-gray-100"}
      `}
    >
      <span className="w-5 h-5 text-current">{icon}</span>
      {label}
    </div>
  );
}

function SidebarGroup({ label, children, open, toggle }) {
  return (
    <div>
      <button
        className="flex items-center justify-between w-full px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-md"
        onClick={toggle}
      >
        {label}
        {open ? (
          <ChevronDownIcon className="w-4 h-4" />
        ) : (
          <ChevronRightIcon className="w-4 h-4" />
        )}
      </button>

      {open && <div className="ml-6 space-y-1 mt-1">{children}</div>}
    </div>
  );
}

function SidebarSubItem({ label }) {
  return (
    <div className="px-3 py-1 text-sm text-gray-500 hover:text-gray-700 cursor-pointer">
      {label}
    </div>
  );
}
