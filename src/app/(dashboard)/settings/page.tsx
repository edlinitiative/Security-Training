"use client";

import { useState } from "react";
import { Settings, Bell, Shield, Users, Eye, ChevronDown } from "lucide-react";

type EmployeeKey = "security" | "notifications";

export default function SettingsPage() {
  const [open, setOpen] = useState<EmployeeKey | null>(null);

  const [twoFactor, setTwoFactor] = useState(false);
  const [activitySharing, setActivitySharing] = useState(true);
  const [emailReminders, setEmailReminders] = useState(true);
  const [weeklyDigest, setWeeklyDigest] = useState(false);
  const [dueSoonAlerts, setDueSoonAlerts] = useState(true);

  function toggle(key: EmployeeKey) {
    setOpen((curr) => (curr === key ? null : key));
  }

  return (
    <div className="px-4 sm:px-6 lg:px-10 py-6 sm:py-10 max-w-3xl mx-auto">
      <div className="mb-10">
        <p className="text-sm font-semibold uppercase tracking-widest text-teal-600 mb-2">
          Configuration
        </p>
        <h1 className="text-2xl font-bold text-slate-900">Settings</h1>
        <p className="text-slate-500 mt-1">Manage your account and preferences.</p>
      </div>

      <div className="space-y-4">
        {/* Security & Privacy */}
        <SettingCard
          icon={Shield}
          title="Security & Privacy"
          description="Manage authentication settings and privacy preferences."
          tag="Employee"
          isOpen={open === "security"}
          onToggle={() => toggle("security")}
        >
          <ToggleRow
            title="Two-factor authentication"
            description="Add an extra layer of security when signing in."
            value={twoFactor}
            onChange={setTwoFactor}
          />
          <ToggleRow
            title="Share training activity with managers"
            description="Allow your manager to view your detailed module progress."
            value={activitySharing}
            onChange={setActivitySharing}
          />
        </SettingCard>

        {/* Notifications */}
        <SettingCard
          icon={Bell}
          title="Notifications"
          description="Control how and when you receive training reminders."
          tag="Employee"
          isOpen={open === "notifications"}
          onToggle={() => toggle("notifications")}
        >
          <ToggleRow
            title="Email reminders"
            description="Get notified by email about new and pending modules."
            value={emailReminders}
            onChange={setEmailReminders}
          />
          <ToggleRow
            title="Due-soon alerts"
            description="Receive an alert 3 days before a module is due."
            value={dueSoonAlerts}
            onChange={setDueSoonAlerts}
          />
          <ToggleRow
            title="Weekly progress digest"
            description="A summary of your training activity every Monday."
            value={weeklyDigest}
            onChange={setWeeklyDigest}
          />
        </SettingCard>

        {/* Admin-locked */}
        <LockedCard
          icon={Users}
          title="Role Management"
          description="Assign and manage employee and admin roles."
          tag="Admin Only"
        />
        <LockedCard
          icon={Eye}
          title="Module Visibility"
          description="Control which modules are visible to employees."
          tag="Admin Only"
        />
        <LockedCard
          icon={Settings}
          title="Platform Settings"
          description="Configure branding, sync settings, and integrations."
          tag="Super Admin"
        />
      </div>

      <p className="mt-8 text-xs text-slate-400 text-center">
        Full settings management will be available in the Admin Dashboard (V3).
      </p>
    </div>
  );
}

function SettingCard({
  icon: Icon,
  title,
  description,
  tag,
  isOpen,
  onToggle,
  children,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
  tag: string;
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="w-full text-left p-5 flex items-start gap-4 hover:bg-slate-50 transition-colors"
      >
        <div className="h-10 w-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center flex-shrink-0">
          <Icon className="h-5 w-5 text-slate-500" />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-[15px] font-semibold text-slate-900">{title}</h3>
            <span className="text-xs rounded-full px-2 py-0.5 font-medium bg-teal-50 text-teal-700">
              {tag}
            </span>
          </div>
          <p className="text-sm text-slate-500">{description}</p>
        </div>
        <ChevronDown
          className={`h-5 w-5 text-slate-400 flex-shrink-0 mt-1 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      {isOpen && (
        <div className="border-t border-slate-100 px-5 py-4 space-y-4 bg-slate-50/40">
          {children}
        </div>
      )}
    </div>
  );
}

function LockedCard({
  icon: Icon,
  title,
  description,
  tag,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
  tag: string;
}) {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm flex items-start gap-4 opacity-60">
      <div className="h-10 w-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center flex-shrink-0">
        <Icon className="h-5 w-5 text-slate-500" />
      </div>
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-1">
          <h3 className="text-[15px] font-semibold text-slate-900">{title}</h3>
          <span className="text-xs rounded-full px-2 py-0.5 font-medium bg-slate-100 text-slate-500">
            {tag}
          </span>
        </div>
        <p className="text-sm text-slate-500">{description}</p>
      </div>
      <div className="flex-shrink-0 text-xs text-slate-400 bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5">
        Requires Admin
      </div>
    </div>
  );
}

function ToggleRow({
  title,
  description,
  value,
  onChange,
}: {
  title: string;
  description: string;
  value: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <div className="flex items-start justify-between gap-4">
      <div className="flex-1">
        <p className="text-sm font-semibold text-slate-900">{title}</p>
        <p className="text-xs text-slate-500 mt-0.5">{description}</p>
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={value}
        onClick={() => onChange(!value)}
        className={`relative inline-flex h-6 w-11 flex-shrink-0 items-center rounded-full transition-colors ${
          value ? "bg-teal-500" : "bg-slate-300"
        }`}
      >
        <span
          className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition-transform ${
            value ? "translate-x-5" : "translate-x-0.5"
          }`}
        />
      </button>
    </div>
  );
}
