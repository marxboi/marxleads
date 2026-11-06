import Link from "next/link";
import type { ReactNode } from "react";
export default function OverviewCard({
  label,
  value,
  detail,
  href,
  icon,
}: {
  label: string;
  value: string | number;
  detail: string;
  href: string;
  icon: ReactNode;
}) {
  return (
    <Link
      href={href}
      className="rounded-2xl border border-[#e9e9f2] bg-white p-5 transition hover:-translate-y-1 hover:shadow-lg"
    >
      <div className="grid h-10 w-10 place-items-center rounded-xl bg-[#f1efff] text-[#6658e8]">
        {icon}
      </div>
      <p className="mt-5 text-3xl font-black text-[#202136]">{value}</p>
      <p className="mt-1 text-sm font-bold text-[#34354a]">{label}</p>
      <p className="mt-1 text-xs text-[#85869a]">{detail}</p>
    </Link>
  );
}
