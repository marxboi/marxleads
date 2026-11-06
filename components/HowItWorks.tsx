type IconProps = { size?: number };

const Store = ({ size = 22 }: IconProps) => (
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
    <path d="M3 10h18M5 10v10h14V10M3 10l2-6h14l2 6M9 20v-6h6v6" />
    <path d="M3 10a3 3 0 0 0 6 0 3 3 0 0 0 6 0 3 3 0 0 0 6 0" />
  </svg>
);

const Globe2 = ({ size = 22 }: IconProps) => (
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
    <circle cx="12" cy="12" r="10" />
    <path d="M2 12h20M12 2a15 15 0 0 1 0 20M12 2a15 15 0 0 0 0 20" />
  </svg>
);

const LayoutDashboard = ({ size = 22 }: IconProps) => (
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
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <path d="M3 9h18M9 21V9" />
  </svg>
);

const MousePointer2 = ({ size = 13 }: IconProps) => (
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
    <path d="m5 3 14 11-7 1-3 6L5 3Z" />
  </svg>
);

const steps = [
  {
    n: "01",
    title: "Set up your business",
    text: "Add your name, category, services and the best way for customers to reach you.",
    icon: Store,
  },
  {
    n: "02",
    title: "Build your online home",
    text: "Shape your business page around your brand, offer and the customers you want to reach.",
    icon: Globe2,
  },
  {
    n: "03",
    title: "Manage customer activity",
    text: "Keep enquiries, bookings and important business updates organized in one workspace.",
    icon: LayoutDashboard,
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="section-pad">
      <div className="container">
        <div className="section-title">
          <div className="eyebrow">
            <MousePointer2 size={13} /> A SIMPLE START
          </div>
          <h2>
            From business idea to{" "}
            <span className="gradient-text">online presence.</span>
          </h2>
          <p>
            Keep the setup straightforward, so you can spend more time serving
            customers.
          </p>
        </div>
        <div className="relative mt-14 grid gap-8 md:grid-cols-3 md:gap-7">
          <div className="absolute left-[17%] right-[17%] top-7 hidden border-t border-dashed border-[#d7d3fa] md:block" />
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <article key={step.n} className="relative text-center">
                <div className="relative mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-[#e4e0ff] bg-white text-brand-600 shadow-[0_5px_18px_rgba(82,68,190,.08)]">
                  <Icon size={22} />
                </div>
                <p className="mt-5 text-[10px] font-extrabold tracking-[.18em] text-brand-600">
                  STEP {step.n}
                </p>
                <h3 className="mt-2 text-lg font-bold tracking-tight text-[#20213a]">
                  {step.title}
                </h3>
                <p className="mx-auto mt-2 max-w-[290px] text-[13px] leading-6 text-[#777990]">
                  {step.text}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
