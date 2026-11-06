import { CalendarDays, Palette, Store, Users } from "lucide-react";

export function TrustStrip() {
  return (
    <section className="border-y border-[#eeeef5] bg-[#fcfcff] py-7">
      <div className="container flex flex-col items-center gap-5 sm:flex-row sm:justify-between">
        <p className="max-w-[240px] text-center text-xs font-semibold leading-5 text-[#85869b] sm:text-left">Built for the people building businesses every day</p>
        <div className="flex flex-wrap items-center justify-center gap-x-7 gap-y-3 text-sm font-bold tracking-tight text-[#a0a1b2] sm:gap-x-9">
          <span className="flex items-center gap-2"><Palette size={17} /> CREATORS</span>
          <span className="flex items-center gap-2"><Users size={17} /> CONSULTANTS</span>
          <span className="flex items-center gap-2"><Store size={17} /> SMALL BUSINESS</span>
          <span className="flex items-center gap-2"><CalendarDays size={17} /> SERVICE PROS</span>
        </div>
      </div>
    </section>
  );
}
