import { createClient } from "@/lib/supabase/server";
export default async function LeadsPage() {
  const db = await createClient();
  const {
    data: { user },
  } = await db.auth.getUser();
  const { data: rows, error } = await db
    .from("leads")
    .select("id,customer_name,customer_email,message,status,created_at")
    .eq("recipient_id", user!.id)
    .order("created_at", { ascending: false });
  return (
    <>
      <p className="text-xs font-bold uppercase tracking-[.18em] text-[#6658e8]">
        Workspace / Leads
      </p>
      <h1 className="mt-2 text-3xl font-black text-[#202136]">
        Leads & enquiries
      </h1>
      <p className="mt-2 text-sm text-[#77798d]">
        Review requests from people interested in your business or services.
      </p>
      <div className="mt-7 space-y-3">
        {error ? (
          <Notice text="The leads table is not ready yet. Run the dashboard setup SQL in Supabase." />
        ) : rows?.length ? (
          rows.map((x) => (
            <article
              key={x.id}
              className="rounded-2xl border border-[#e9e9f2] bg-white p-5"
            >
              <div className="flex flex-wrap justify-between gap-2">
                <b className="text-[#202136]">
                  {x.customer_name || "Customer enquiry"}
                </b>
                <span className="text-xs font-bold text-[#6658e8]">
                  {x.status}
                </span>
              </div>
              <p className="mt-1 text-xs text-[#85869a]">{x.customer_email}</p>
              <p className="mt-3 text-sm text-[#686a7e]">{x.message}</p>
            </article>
          ))
        ) : (
          <Empty text="No enquiries have arrived yet. When customers contact you through Marxleads, they will appear here." />
        )}
      </div>
    </>
  );
}
function Notice({ text }: { text: string }) {
  return (
    <p className="rounded-xl bg-amber-50 p-4 text-sm text-amber-800">{text}</p>
  );
}
function Empty({ text }: { text: string }) {
  return (
    <div className="rounded-2xl border border-dashed border-[#d8d7e6] bg-white p-8 text-center text-sm text-[#85869a]">
      {text}
    </div>
  );
}
