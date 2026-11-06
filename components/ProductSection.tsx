import { ArrowRight, Check, LayoutDashboard } from "lucide-react";
import { DashboardPreview } from "@/components/DashboardPreview";

export function ProductSection() {
  const features = [
    "See new enquiries at a glance",
    "Keep follow-ups from slipping through",
    "Understand your activity without complex reports",
  ];

  return (
    <section className="overflow-hidden bg-[#171827] py-16 text-white sm:py-20">
      <div className="container grid items-center gap-10 lg:grid-cols-[.8fr_1.2fr]">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-[#393956] bg-[#22233a] px-3 py-2 text-[11px] font-bold text-[#c2bcff]">
            <LayoutDashboard size={13} /> ONE CLEAR VIEW
          </div>
          <h2 className="mt-6 text-[34px] font-extrabold leading-[1.1] tracking-[-0.05em] sm:text-[44px]">
            A calmer way to run the busy parts of business.
          </h2>
          <p className="mt-5 text-sm leading-7 text-[#b0b2c8]">
            Your public business page brings customers in. Your private
            workspace helps you keep track of the conversations and activity
            that follow.
          </p>
          <ul className="mt-6 space-y-3">
            {features.map((item) => (
              <li
                key={item}
                className="flex items-start gap-2.5 text-sm text-[#e4e4f0]"
              >
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#34315e] text-[#b9b0ff]">
                  <Check size={12} />
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <a href="#get-started" className="primary-button mt-8">
            Explore the workspace <ArrowRight size={15} />
          </a>
        </div>
        <div className="relative">
          <div className="absolute -inset-10 hidden rounded-full bg-[#5a4bd0]/20 blur-[80px] sm:block" />
          <div className="relative">
            <DashboardPreview />
          </div>
          <div
            className="mt-3 inline-block rounded border border-[#393956] bg-[#22233a] px-3 py-2 text-[11px] font-semibold text-[#8f91ad]"
            aria-label="Note: Dashboard preview uses illustrative sample data for demonstration purposes."
          >
            Dashboard preview uses{" "}
            <span className="underline">illustrative sample data</span>.
          </div>
        </div>
      </div>
    </section>
  );
}
