import Link from "next/link";
export default function PortfolioPage() {
  return (
    <section className="mx-auto max-w-3xl rounded-3xl border border-[#e9e9f2] bg-white p-8">
      <p className="text-xs font-bold uppercase tracking-[.16em] text-[#6658e8]">
        Provider workspace
      </p>
      <h1 className="mt-2 text-3xl font-black text-[#202136]">Portfolio</h1>
      <p className="mt-3 text-sm leading-6 text-[#77798d]">
        Portfolio upload and management will be connected in the next provider
        tools phase. Your portfolio table is already part of the dashboard
        schema.
      </p>
      <Link
        href="/dashboard/provider"
        className="mt-6 inline-flex rounded-xl bg-[#6658e8] px-4 py-3 text-sm font-bold text-white"
      >
        Back to overview
      </Link>
    </section>
  );
}
