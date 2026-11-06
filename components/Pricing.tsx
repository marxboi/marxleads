type IconProps = { size?: number; className?: string };

function ArrowRight({ size = 14, className }: IconProps) {
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
      className={className}
    >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}

function Check({ size = 14, className }: IconProps) {
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
      className={className}
    >
      <path d="m5 12 4 4L19 6" />
    </svg>
  );
}

function WalletCards({ size = 13 }: IconProps) {
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
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 10h18" />
      <path d="M16 15h.01" />
    </svg>
  );
}

const plans = [
  {
    name: "Starter",
    price: "Free",
    description: "For getting your business online.",
    features: [
      "Business profile page",
      "Basic service listings",
      "Customer contact links",
      "Essential enquiry overview",
    ],
    featured: false,
  },
  {
    name: "Growth",
    price: "₦7,500",
    period: "/ month",
    description: "For businesses ready to get organized.",
    features: [
      "Everything in Starter",
      "Lead and enquiry tracking",
      "Booking management",
      "Business page customization",
      "Basic activity insights",
    ],
    featured: true,
  },
  {
    name: "Business+",
    price: "₦20,000",
    period: "/ month",
    description: "For teams managing more activity.",
    features: [
      "Everything in Growth",
      "Team access (planned)",
      "Advanced business insights",
      "Priority support (planned)",
      "Expanded customization",
    ],
    featured: false,
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="section-pad bg-[#fafaff]">
      <div className="container">
        <div className="section-title">
          <div className="eyebrow">
            <WalletCards size={13} /> SIMPLE, TRANSPARENT PRICING
          </div>
          <h2>
            Start small.{" "}
            <span className="gradient-text">Grow when you’re ready.</span>
          </h2>
          <p>
            Suggested launch pricing for validation. Final plan limits and
            prices should be tested with real business owners.
          </p>
        </div>
        <div className="mt-12 grid gap-4 lg:grid-cols-3">
          {plans.map((plan) => (
            <article
              key={plan.name}
              className={`relative rounded-2xl border p-6 ${plan.featured ? "border-brand-500 bg-white shadow-soft ring-1 ring-brand-100" : "border-[#e8e8f1] bg-white"}`}
            >
              {plan.featured && (
                <div className="absolute -top-3 left-6 rounded-full bg-brand-600 px-3 py-1 text-[10px] font-bold text-white">
                  RECOMMENDED TO TEST
                </div>
              )}
              <h3 className="text-sm font-bold text-[#272842]">{plan.name}</h3>
              <p className="mt-2 min-h-[40px] text-xs leading-5 text-[#777990]">
                {plan.description}
              </p>
              <div className="mt-5 flex items-baseline gap-1">
                <span className="text-[32px] font-extrabold tracking-[-0.06em] text-[#1b1c31]">
                  {plan.price}
                </span>
                {plan.period && (
                  <span className="text-xs text-[#777990]">{plan.period}</span>
                )}
              </div>
              <a
                href="#get-started"
                className={
                  plan.featured
                    ? "primary-button mt-5 w-full"
                    : "secondary-button mt-5 w-full"
                }
              >
                {plan.name === "Starter"
                  ? "Get started free"
                  : `Choose ${plan.name}`}{" "}
                <ArrowRight size={14} />
              </a>
              <div className="my-6 border-t border-[#eeeef5]" />
              <p className="text-[10px] font-extrabold uppercase tracking-[.12em] text-[#85869b]">
                What’s included
              </p>
              <ul className="mt-4 space-y-3">
                {plan.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex gap-2.5 text-xs text-[#55566f]"
                  >
                    <Check
                      size={14}
                      className="mt-0.5 shrink-0 text-emerald-600"
                    />
                    {feature}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
        <p className="mt-5 text-center text-[10px] leading-5 text-[#85869b]">
          Prices are illustrative, not live offers. Confirm taxes, feature
          limits and payment costs before publishing.
        </p>
      </div>
    </section>
  );
}
