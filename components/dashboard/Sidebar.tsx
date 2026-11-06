"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  LayoutDashboard,
  Building2,
  BriefcaseBusiness,
  Users,
  CalendarDays,
  MessageSquare,
  ChartNoAxesCombined,
  Settings,
  Store,
  Menu,
  X,
  LogOut,
  Compass,
  Bookmark,
  UserRound,
  Images,
  Star,
} from "lucide-react";
import { signOut } from "@/app/actions/auth";
import { switchActiveRole } from "@/app/actions/roles";

type Role = "customer" | "business_owner" | "service_provider";
const labels: Record<Role, string> = {
  customer: "Customer",
  business_owner: "Business owner",
  service_provider: "Service provider",
};
const nav: Record<Role, { href: string; label: string; icon: any }[]> = {
  customer: [
    { href: "/dashboard/customer", label: "Overview", icon: LayoutDashboard },
    {
      href: "/dashboard/customer/discover",
      label: "Discover businesses",
      icon: Compass,
    },
    {
      href: "/dashboard/customer/saved",
      label: "Saved businesses",
      icon: Bookmark,
    },
    {
      href: "/dashboard/customer/enquiries",
      label: "My enquiries",
      icon: MessageSquare,
    },
    {
      href: "/dashboard/customer/bookings",
      label: "My bookings",
      icon: CalendarDays,
    },
    { href: "/dashboard/customer/reviews", label: "My reviews", icon: Star },
  ],
  business_owner: [
    { href: "/dashboard/owner", label: "Overview", icon: LayoutDashboard },
    { href: "/dashboard/business", label: "My business", icon: Building2 },
    {
      href: "/dashboard/services",
      label: "Services & products",
      icon: BriefcaseBusiness,
    },
    { href: "/dashboard/leads", label: "Customer leads", icon: Users },
    { href: "/dashboard/bookings", label: "Bookings", icon: CalendarDays },
    { href: "/dashboard/messages", label: "Messages", icon: MessageSquare },
    {
      href: "/dashboard/analytics",
      label: "Analytics",
      icon: ChartNoAxesCombined,
    },
  ],
  service_provider: [
    { href: "/dashboard/provider", label: "Overview", icon: LayoutDashboard },
    {
      href: "/dashboard/provider/profile",
      label: "Professional profile",
      icon: UserRound,
    },
    {
      href: "/dashboard/services",
      label: "My services",
      icon: BriefcaseBusiness,
    },
    { href: "/dashboard/provider/portfolio", label: "Portfolio", icon: Images },
    { href: "/dashboard/leads", label: "Client enquiries", icon: Users },
    {
      href: "/dashboard/bookings",
      label: "Bookings & availability",
      icon: CalendarDays,
    },
    { href: "/dashboard/messages", label: "Messages", icon: MessageSquare },
    {
      href: "/dashboard/analytics",
      label: "Analytics",
      icon: ChartNoAxesCombined,
    },
  ],
};
function Brand() {
  return (
    <Link
      href="/"
      className="flex items-center gap-2 text-xl font-black tracking-tight"
    >
      <span className="grid h-9 w-9 place-items-center rounded-xl bg-[#6658e8] text-white">
        <Store size={19} />
      </span>
      Marx<span className="-ml-2 text-[#6658e8]">leads</span>
    </Link>
  );
}
export default function Sidebar({
  name,
  email,
  roles,
  activeRole,
}: {
  name: string;
  email: string;
  roles: string[];
  activeRole: string;
}) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const role = (activeRole in labels ? activeRole : "customer") as Role;
  const items = nav[role];
  const navigation = (mobile = false) => (
    <>
      <div className="mb-5 rounded-xl bg-[#f7f6ff] p-3">
        <p className="mb-2 text-[10px] font-bold uppercase tracking-[.15em] text-[#9290ad]">
          Workspace role
        </p>
        {roles.length > 1 ? (
          <form action={switchActiveRole}>
            <select
              aria-label="Switch workspace"
              name="role"
              defaultValue={role}
              onChange={(e) => e.currentTarget.form?.requestSubmit()}
              className="w-full rounded-lg border border-[#e5e2ff] bg-white px-2 py-2 text-xs font-bold text-[#5145c5]"
            >
              {roles
                .filter((r): r is Role => r in labels)
                .map((r) => (
                  <option key={r} value={r}>
                    {labels[r]}
                  </option>
                ))}
            </select>
          </form>
        ) : (
          <p className="text-sm font-bold text-[#5145c5]">{labels[role]}</p>
        )}
      </div>
      <p className="mb-3 px-3 text-[10px] font-bold uppercase tracking-[.18em] text-[#a0a1b1]">
        {role === "customer" ? "Your account" : "Workspace"}
      </p>
      <nav className="flex-1 space-y-1">
        {items.map(({ href, label, icon: Icon }) => {
          const active =
            pathname === href ||
            (href !== "/dashboard/customer" &&
              href !== "/dashboard/owner" &&
              href !== "/dashboard/provider" &&
              pathname.startsWith(href + "/"));
          return (
            <Link
              key={href}
              href={href}
              onClick={() => mobile && setOpen(false)}
              aria-current={active ? "page" : undefined}
              className={`flex min-h-11 items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold transition ${active ? "bg-[#f1efff] text-[#6252dd]" : "text-[#62647a] hover:bg-[#f3f1ff] hover:text-[#6252dd]"}`}
            >
              <Icon size={18} />
              {label}
            </Link>
          );
        })}
      </nav>
      <Link
        href="/settings"
        onClick={() => mobile && setOpen(false)}
        className="mb-4 flex min-h-11 items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold text-[#62647a] hover:bg-[#f3f1ff]"
      >
        <Settings size={18} />
        Settings
      </Link>
      <div className="border-t border-[#eeeef4] pt-4">
        <p className="truncate text-sm font-bold text-[#202136]">
          {name || "Marxleads user"}
        </p>
        <p className="truncate text-xs text-[#9293a4]">{email}</p>
        <form action={signOut} className="mt-3">
          <button
            className="inline-flex min-h-10 items-center gap-2 text-xs font-bold text-[#6658e8]"
            type="submit"
          >
            <LogOut size={14} />
            Sign out
          </button>
        </form>
      </div>
    </>
  );
  return (
    <>
      <header className="sticky top-0 z-40 flex h-16 w-full items-center justify-between border-b border-[#e9e9f2] bg-white px-4 md:hidden">
        <Brand />
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Open navigation menu"
          aria-expanded={open}
          className="grid h-10 w-10 place-items-center rounded-xl border border-[#e9e9f2]"
        >
          <Menu size={21} />
        </button>
      </header>
      {open && (
        <div
          className="fixed inset-0 z-50 md:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Dashboard navigation"
        >
          <button
            type="button"
            aria-label="Close navigation menu"
            onClick={() => setOpen(false)}
            className="absolute inset-0 bg-[#17182b]/40"
          />
          <aside className="relative flex h-full w-[min(86vw,320px)] flex-col overflow-y-auto border-r border-[#e9e9f2] bg-white p-5 shadow-2xl">
            <div className="mb-7 flex items-center justify-between">
              <Brand />
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
              >
                <X size={20} />
              </button>
            </div>
            {navigation(true)}
          </aside>
        </div>
      )}
      <aside className="sticky top-0 hidden h-screen w-64 shrink-0 flex-col border-r border-[#e9e9f2] bg-white p-5 md:flex">
        <div className="mb-7">
          <Brand />
        </div>
        {navigation(false)}
      </aside>
    </>
  );
}
