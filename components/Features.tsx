type IconName =
  | "globe"
  | "users"
  | "calendar"
  | "wallet"
  | "store"
  | "chart"
  | "zap"
  | "arrow";

function Icon({ name, size = 20 }: { name: IconName; size?: number }) {
  const props = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true as const,
  };

  switch (name) {
    case "globe":
      return (
        <svg {...props}>
          <circle cx="12" cy="12" r="10" />
          <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10Z" />
        </svg>
      );
    case "users":
      return (
        <svg {...props}>
          <path d="M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M10 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM20 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      );
    case "calendar":
      return (
        <svg {...props}>
          <rect x="3" y="5" width="18" height="16" rx="2" />
          <path d="M16 3v4M8 3v4M3 11h18" />
        </svg>
      );
    case "wallet":
      return (
        <svg {...props}>
          <rect x="3" y="5" width="18" height="15" rx="2" />
          <path d="M3 9h18M16 15h.01M7 5V3h10v2" />
        </svg>
      );
    case "store":
      return (
        <svg {...props}>
          <path d="M3 10v10h18V10M2 4h20l-2 6a3 3 0 0 1-5 1 3 3 0 0 1-5 0 3 3 0 0 1-5-1L2 4ZM10 20v-6h4v6" />
        </svg>
      );
    case "chart":
      return (
        <svg {...props}>
          <path d="M3 3v18h18M18 17V9M13 17V5M8 17v-3" />
        </svg>
      );
    case "zap":
      return (
        <svg {...props}>
          <path d="m13 2-3 8h8L8 22l3-8H3L13 2Z" />
        </svg>
      );
    case "arrow":
      return (
        <svg {...props}>
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      );
  }
}

const features = [
  {
    icon: "globe",
    title: "Your business website",
    description:
      "Create a polished home for your brand, services, portfolio and contact details without starting from a blank page.",
  },
  {
    icon: "users",
    title: "Leads and customer follow-up",
    description:
      "Keep enquiries organized, see where each lead stands and make sure promising conversations do not get lost.",
  },
  {
    icon: "calendar",
    title: "Bookings and appointments",
    description:
      "Give customers a clear way to request a time, then manage appointments from your workspace.",
  },
  {
    icon: "wallet",
    title: "Payments and invoices",
    description:
      "Keep payment requests and invoice status together, with supported payment integrations when enabled.",
  },
  {
    icon: "store",
    title: "Services directory",
    description:
      "Showcase what you do and help potential customers understand your offer before they contact you.",
  },
  {
    icon: "chart",
    title: "Business insights",
    description:
      "Get a simple view of leads, bookings and business activity so you can decide what needs attention.",
  },
] as const;

export function Features() {
  return (
    <section id="features" className="section-pad">
      <div className="container">
        <div className="section-title">
          <div className="eyebrow">
            <Icon name="zap" size={13} /> LESS ADMIN, MORE MOMENTUM
          </div>
          <h2>
            Everything you need to{" "}
            <span className="gradient-text">run your business online.</span>
          </h2>
          <p>
            Bring your business presence and everyday customer tasks into one
            organized place, without the tool overload.
          </p>
        </div>
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <article className="feature-card" key={feature.title}>
              <div className="icon-tile">
                <Icon name={feature.icon} size={21} />
              </div>
              <h3 className="mt-5 text-[17px] font-bold tracking-[-0.025em] text-[#20213a]">
                {feature.title}
              </h3>
              <p className="mt-2.5 text-[13px] leading-6 text-[#6e7087]">
                {feature.description}
              </p>
              <a
                href="#get-started"
                className="mt-5 inline-flex items-center gap-2 text-xs font-bold text-brand-600 hover:text-brand-700"
              >
                Explore feature <Icon name="arrow" size={13} />
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
