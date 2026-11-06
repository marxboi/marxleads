import { createClient } from "@/lib/supabase/server";
export default async function BookingsPage() {
  const db = await createClient();
  const {
    data: { user },
  } = await db.auth.getUser();
  const { data: rows, error } = await db
    .from("bookings")
    .select("id,customer_name,service_title,starts_at,status,created_at")
    .eq("provider_id", user!.id)
    .order("starts_at", { ascending: true });
  return (
    <>
      <p className="text-xs font-bold uppercase tracking-[.18em] text-[#6658e8]">
        Workspace / Bookings
      </p>
      <h1 className="mt-2 text-3xl font-black text-[#202136]">Bookings</h1>
      <p className="mt-2 text-sm text-[#77798d]">
        Keep track of customer appointments and service requests.
      </p>
      <div className="mt-7 space-y-3">
        {error ? (
          <p className="rounded-xl bg-amber-50 p-4 text-sm text-amber-800">
            The bookings table is not ready yet. Run the dashboard setup SQL in
            Supabase.
          </p>
        ) : rows?.length ? (
          rows.map((x) => (
            <article
              key={x.id}
              className="rounded-2xl border border-[#e9e9f2] bg-white p-5"
            >
              <div className="flex flex-wrap justify-between gap-2">
                <b className="text-[#202136]">{x.service_title}</b>
                <span className="text-xs font-bold text-[#6658e8]">
                  {x.status}
                </span>
              </div>
              <p className="mt-2 text-sm text-[#686a7e]">
                {x.customer_name} · {new Date(x.starts_at).toLocaleString()}
              </p>
            </article>
          ))
        ) : (
          <Empty text="No bookings yet. Customer appointments will appear here." />
        )}
      </div>
    </>
  );
}
function Empty({ text }: { text: string }) {
  return (
    <div className="rounded-2xl border border-dashed border-[#d8d7e6] bg-white p-8 text-center text-sm text-[#85869a]">
      {text}
    </div>
  );
}
