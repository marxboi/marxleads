import Link from "next/link";
export default function Page() {
  return (
    <section className="mx-auto max-w-3xl rounded-3xl border border-[#e9e9f2] bg-white p-8 sm:p-10">
      <p className="text-xs font-bold uppercase tracking-[.16em] text-[#6658e8]">
        Customer space
      </p>
      <h1 className="mt-2 text-3xl font-black text-[#202136]">My bookings</h1>
      <p className="mt-3 text-sm leading-6 text-[#77798d]">
        Your requested and confirmed appointments will appear here.
      </p>
      <Link
        href="/dashboard/customer"
        className="mt-6 inline-flex rounded-xl bg-[#6658e8] px-4 py-3 text-sm font-bold text-white"
      >
        Back to overview
      </Link>
    </section>
  );
}
