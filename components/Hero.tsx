import { DashboardPreview } from "@/components/DashboardPreview";
import type { ReactNode } from "react";

type IconProps = {
  size?: number;
  className?: string;
  fill?: string;
  children?: ReactNode;
};

function Icon({ size = 16, className, fill = "none", children }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={fill}
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {children}
    </svg>
  );
}

const ArrowRight = (props: IconProps) => (
  <Icon {...props}>
    <path d="M5 12h14M12 5l7 7-7 7" />
  </Icon>
);
const BarChart3 = (props: IconProps) => (
  <Icon {...props}>
    <path d="M3 3v18h18M18 17V9M13 17V5M8 17v-3" />
  </Icon>
);
const Check = (props: IconProps) => (
  <Icon {...props}>
    <path d="m5 12 4 4L19 6" />
  </Icon>
);
const MessageCircle = (props: IconProps) => (
  <Icon {...props}>
    <path d="M21 11.5a8.4 8.4 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.4 8.4 0 0 1-3.8-.9L3 21l1.9-5.7a8.4 8.4 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.4 8.4 0 0 1 3.8-.9h.5a8.5 8.5 0 0 1 8 8v.5z" />
  </Icon>
);
const Play = (props: IconProps) => (
  <Icon {...props}>
    <path d="m7 4 13 8-13 8z" />
  </Icon>
);
const Sparkles = (props: IconProps) => (
  <Icon {...props}>
    <path d="m12 3 1.9 5.8L20 11l-6.1 2.2L12 19l-1.9-5.8L4 11l6.1-2.2L12 3zM19 14l1.2 2.8L23 18l-2.8 1.2L19 22l-1.2-2.8L15 18l2.8-1.2L19 14z" />
  </Icon>
);
const Star = (props: IconProps) => (
  <Icon {...props}>
    <path d="m12 3 2.7 5.5 6.1.9-4.4 4.3 1 6.1-5.4-2.9-5.4 2.9 1-6.1-4.4-4.3 6.1-.9L12 3z" />
  </Icon>
);

export function Hero() {
  return (
    <section
      id="home"
      className="relative overflow-hidden pb-16 pt-14 sm:pb-24 sm:pt-20"
    >
      <div className="soft-grid pointer-events-none absolute inset-0 -z-10 opacity-35" />
      <div className="pointer-events-none absolute -right-28 top-8 -z-10 h-[380px] w-[380px] rounded-full bg-[#e9e5ff] blur-[100px]" />
      <div className="container grid items-center gap-12 lg:grid-cols-[.93fr_1.07fr] lg:gap-10">
        <div className="max-w-[570px]">
          <div className="eyebrow">
            <Sparkles size={13} /> THE BUSINESS GROWTH WORKSPACE
          </div>
          <h1 className="mt-6 text-[clamp(2.4rem,8vw,3.875rem)] font-extrabold leading-[1.05] tracking-[-0.065em] text-[#17182b] sm:text-[56px] lg:text-[62px]">
            Your business deserves{" "}
            <span className="gradient-text">more than social media.</span>
          </h1>
          <p className="mt-6 max-w-[490px] text-[16px] leading-8 text-[#666981] sm:text-[17px]">
            Build your online presence, manage customer enquiries, showcase your
            services, and keep your business organized, all from one simple
            platform.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a href="#get-started" className="primary-button w-full sm:w-auto">
              Start for free <ArrowRight size={16} />
            </a>
            <a
              href="#how-it-works"
              className="secondary-button w-full sm:w-auto"
            >
              <Play size={15} fill="currentColor" /> See how it works
            </a>
          </div>
          <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-3 text-xs text-[#777990]">
            <span className="flex items-center gap-1.5">
              <Check size={14} className="text-emerald-600" /> No coding needed
            </span>
            <span className="flex items-center gap-1.5">
              <Check size={14} className="text-emerald-600" /> Made for growing
              businesses
            </span>
          </div>
          <div className="mt-9 flex items-center gap-3 border-t border-[#e9e9f2] pt-6">
            <div className="flex -space-x-2">
              {["#d69a75", "#a67ad2", "#5a9b8b", "#d27c91"].map((color, i) => (
                <div
                  key={color}
                  className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-white text-[9px] font-bold text-white"
                  style={{ background: color }}
                >
                  {["AO", "TK", "ZM", "EO"][i]}
                </div>
              ))}
            </div>
            <div>
              <div className="flex items-center gap-1 text-[#e4a22c]">
                <Star size={12} fill="currentColor" />
                <Star size={12} fill="currentColor" />
                <Star size={12} fill="currentColor" />
                <Star size={12} fill="currentColor" />
                <Star size={12} fill="currentColor" />
                <span className="ml-1 text-[11px] font-semibold text-[#393a54]">
                  Built around real business needs
                </span>
              </div>
              <p className="mt-1 text-[10px] text-[#85869b]">
                A product concept for independent businesses
              </p>
            </div>
          </div>
        </div>
        <div className="relative lg:pl-2">
          <div className="absolute -left-4 top-12 z-10 hidden rounded-2xl border border-[#e7e4ff] bg-white p-3 shadow-soft sm:block">
            <div className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#e9f8f1] text-[#18815a]">
                <MessageCircle size={15} />
              </span>
              <div>
                <p className="text-[11px] font-bold">New enquiry</p>
                <p className="mt-0.5 text-[9px] text-[#7d8096]">
                  Website contact form
                </p>
              </div>
            </div>
          </div>
          <DashboardPreview />
          <div className="absolute -bottom-5 right-2 hidden items-center gap-3 rounded-2xl border border-[#e7e4ff] bg-white p-3 shadow-soft sm:flex">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#f0edff] text-[#6658e8]">
              <BarChart3 size={17} />
            </div>
            <div>
              <p className="text-[11px] font-bold text-[#24253e]">
                One workspace
              </p>
              <p className="mt-0.5 text-[9px] text-[#7d8096]">
                Less switching, more focus
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
