type IconProps = { size?: number; className?: string };

function ArrowUpRight({ size = 24, className }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M7 17 17 7M7 7h10v10" />
    </svg>
  );
}

function ChevronDown({ size = 24 }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

function LayoutDashboard({ size = 24 }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="3" width="7" height="9" rx="1" />
      <rect x="14" y="3" width="7" height="5" rx="1" />
      <rect x="14" y="12" width="7" height="9" rx="1" />
      <rect x="3" y="16" width="7" height="5" rx="1" />
    </svg>
  );
}

function Sparkles({ size = 24 }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m12 3 1.9 5.8L20 11l-6.1 2.2L12 19l-1.9-5.8L4 11l6.1-2.2L12 3Z" />
      <path d="m19 14 1.2 2.8L23 18l-2.8 1.2L19 22l-1.2-2.8L15 18l2.8-1.2L19 14ZM5 2l1 2.5L8.5 5.5 6 6.5 5 9 4 6.5 1.5 5.5 4 4.5 5 2Z" />
    </svg>
  );
}

const metrics = [
  { label: "New leads", value: "128", change: "+18.4%" },
  { label: "Bookings", value: "46", change: "+12.8%" },
  { label: "Profile visits", value: "2.4k", change: "+24.6%" },
];
const leads = [
  {
    initials: "AO",
    name: "Amara Okafor",
    service: "Brand identity",
    color: "bg-[#4f9f8d]",
  },
  {
    initials: "TK",
    name: "Tunde K.",
    service: "Consultation",
    color: "bg-[#b278d5]",
  },
  {
    initials: "ZM",
    name: "Zainab M.",
    service: "Website design",
    color: "bg-[#d18a63]",
  },
];

export function DashboardPreview() {
  return (
    <div className="dark-dashboard relative mx-auto w-full max-w-[560px] overflow-hidden rounded-[22px] border border-[#303149]">
      <div className="flex items-center justify-between border-b border-[#303149] px-5 py-4 sm:px-6">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#6658e8]">
            <LayoutDashboard size={17} />
          </div>
          <div>
            <p className="text-sm font-bold">Business overview</p>
            <p className="dashboard-muted mt-0.5 text-[10px]">
              Your workspace · Demo data
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 rounded-full border border-[#393b53] px-3 py-1.5 text-[10px] dashboard-muted">
          This month <ChevronDown size={12} />
        </div>
      </div>
      <div className="grid grid-cols-3 gap-2.5 p-4 sm:gap-3 sm:p-5">
        {metrics.map((metric) => (
          <div
            key={metric.label}
            className="dashboard-panel rounded-xl p-3 sm:p-4"
          >
            <p className="dashboard-muted text-[10px] sm:text-[11px]">
              {metric.label}
            </p>
            <p className="mt-2 text-xl font-bold tracking-tight sm:text-2xl">
              {metric.value}
            </p>
            <p className="mt-1 text-[9px] font-semibold text-emerald-400 sm:text-[10px]">
              {metric.change}{" "}
              <span className="dashboard-muted hidden font-normal sm:inline">
                vs last month
              </span>
            </p>
          </div>
        ))}
      </div>
      <div className="grid gap-3 px-4 pb-4 sm:grid-cols-[1.2fr_.8fr] sm:px-5 sm:pb-5">
        <div className="dashboard-panel rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold">Enquiry activity</p>
              <p className="dashboard-muted mt-1 text-[10px]">
                Illustrative weekly overview
              </p>
            </div>
            <ArrowUpRight size={16} className="dashboard-muted" />
          </div>
          <div className="mt-5 flex h-[102px] items-end gap-2">
            {[32, 48, 38, 68, 52, 78, 61, 90, 69, 82, 57, 74].map(
              (height, i) => (
                <div key={i} className="flex flex-1 items-end">
                  <div
                    className={`w-full rounded-t-[4px] ${i === 7 ? "bg-[#a69cff]" : "bg-[#6658e8]"}`}
                    style={{
                      height: `${height}%`,
                      opacity: i === 7 ? 1 : 0.45 + i / 24,
                    }}
                  />
                </div>
              ),
            )}
          </div>
          <div className="dashboard-muted mt-2 flex justify-between text-[9px]">
            <span>Mon</span>
            <span>Wed</span>
            <span>Fri</span>
            <span>Sun</span>
          </div>
        </div>
        <div className="dashboard-panel rounded-xl p-4">
          <p className="text-xs font-semibold">Recent enquiries</p>
          <div className="mt-4 space-y-4">
            {leads.map((lead) => (
              <div key={lead.name} className="flex items-center gap-2.5">
                <div
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${lead.color} text-[9px] font-bold text-white`}
                >
                  {lead.initials}
                </div>
                <div className="min-w-0">
                  <p className="truncate text-[10px] font-semibold">
                    {lead.name}
                  </p>
                  <p className="dashboard-muted mt-0.5 truncate text-[9px]">
                    {lead.service}
                  </p>
                </div>
                <span className="ml-auto h-1.5 w-1.5 shrink-0 rounded-full bg-[#a69cff]" />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="mx-4 mb-4 flex items-center gap-3 rounded-xl border border-[#3b3b58] bg-[#292a42] px-4 py-3 sm:mx-5 sm:mb-5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#3d376e] text-[#b6adff]">
          <Sparkles size={15} />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-[11px] font-semibold">
            Your business page is ready to share
          </p>
          <p className="dashboard-muted mt-1 truncate text-[9px]">
            marxleads.example/your-business
          </p>
        </div>
        <ArrowUpRight size={15} className="dashboard-muted" />
      </div>
    </div>
  );
}
