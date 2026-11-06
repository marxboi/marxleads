import { createClient } from "@/lib/supabase/server";
export default async function AnalyticsPage() {
  const db = await createClient();
  const {
    data: { user },
  } = await db.auth.getUser();
  const [b, s, l, k] = await Promise.all([
    db
      .from("businesses")
      .select("id", { count: "exact", head: true })
      .eq("owner_id", user!.id),
    db
      .from("services")
      .select("id", { count: "exact", head: true })
      .eq("owner_id", user!.id),
    db
      .from("leads")
      .select("id", { count: "exact", head: true })
      .eq("recipient_id", user!.id),
    db
      .from("bookings")
      .select("id", { count: "exact", head: true })
      .eq("provider_id", user!.id),
  ]);
  return (
    <>
      <p className="text-xs font-bold uppercase tracking-[.18em] text-[#6658e8]">
        Workspace / Analytics
      </p>
      <h1 className="mt-2 text-3xl font-black text-[#202136]">Analytics</h1>
      <p className="mt-2 text-sm text-[#77798d]">
        A snapshot of the activity currently recorded in your workspace.
      </p>
      <div className="mt-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          ["Business profiles", b.count],
          ["Published services", s.count],
          ["Enquiries received", l.count],
          ["Bookings received", k.count],
        ].map(([label, value]) => (
          <div
            key={String(label)}
            className="rounded-2xl border border-[#e9e9f2] bg-white p-6"
          >
            <p className="text-sm text-[#77798d]">{label}</p>
            <p className="mt-3 text-3xl font-black text-[#202136]">
              {value ?? 0}
            </p>
          </div>
        ))}
      </div>
      <p className="mt-5 rounded-xl bg-blue-50 p-4 text-sm text-blue-800">
        These are live record counts, not yet traffic, conversion or revenue
        analytics. Those require event tracking and payment data.
      </p>
    </>
  );
}
