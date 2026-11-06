function ArrowDownRight({ size = 15 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M7 7 17 17" />
      <path d="M17 7v10H7" />
    </svg>
  );
}

function ArrowRight({ size = 15 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}

function Zap({ size = 23, fill = "none" }: { size?: number; fill?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={fill}
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z" />
    </svg>
  );
}

export function FinalCTA() {
  return (
    <section id="get-started" className="px-4 pb-16 sm:pb-20">
      <div className="relative mx-auto max-w-[1160px] overflow-hidden rounded-[28px] bg-[#6658e8] px-6 py-12 text-center text-white sm:px-12 sm:py-16">
        <div className="pointer-events-none absolute -left-16 -top-20 h-64 w-64 rounded-full border border-white/10" />
        <div className="pointer-events-none absolute -bottom-36 -right-12 h-80 w-80 rounded-full border border-white/10" />
        <div className="relative mx-auto max-w-[650px]">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15">
            <Zap size={23} fill="currentColor" />
          </div>
          <h2 className="mt-5 text-[32px] font-extrabold leading-[1.1] tracking-[-0.05em] sm:text-[46px]">
            Ready to run your business smarter?
          </h2>
          <p className="mx-auto mt-4 max-w-[510px] text-sm leading-7 text-white/80">
            Bring your online presence and everyday business tasks together in
            one workspace.
          </p>
          <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
            <a
              href="mailto:hello@marxleads.com?subject=Early%20access%20to%20Marxleads"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/30 px-5 py-3.5 text-sm font-bold text-white transition hover:bg-white/10"
            >
              Request early access <ArrowRight size={15} />
            </a>
            <a
              href="#features"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/30 px-5 py-3.5 text-sm font-bold text-white transition hover:bg-white/10"
            >
              Explore features <ArrowDownRight size={15} />
            </a>
          </div>
          <p className="mt-4 text-[10px] text-white/65">
            Early concept · Features are under development
          </p>
        </div>
      </div>
    </section>
  );
}
