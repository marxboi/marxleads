import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import {
  BriefcaseBusiness,
  Users,
  CalendarDays,
  Images,
  ArrowUpRight,
} from "lucide-react";
import OverviewCard from "@/components/dashboard/OverviewCard";
export default async function ProviderOverview() {
  const db = await createClient();
  const {
    data: { user },
  } = await db.auth.getUser();
  if (!user) redirect("/login");
  const [
    { data: profile },
    { count: services },
    { count: leads },
    { count: bookings },
    { count: portfolio },
  ] = await Promise.all([
    db.from("profiles").select("full_name").eq("id", user.id).maybeSingle(),
    db
      .from("services")
      .select("id", { count: "exact", head: true })
      .eq("owner_id", user.id),
    db
      .from("leads")
      .select("id", { count: "exact", head: true })
      .eq("recipient_id", user.id),
    db
      .from("bookings")
      .select("id", { count: "exact", head: true })
      .eq("provider_id", user.id),
    db
      .from("portfolio_items")
      .select("id", { count: "exact", head: true })
      .eq("owner_id", user.id),
  ]);
  return (
    <>
      <div>
        <p className="text-xs font-bold uppercase tracking-[.18em] text-[#6658e8]">
          Provider workspace
        </p>
        <h1 className="mt-2 text-3xl font-black text-[#202136]">
          Hello, {profile?.full_name?.split(" ")[0] || "there"}.
        </h1>
        <p className="mt-2 text-sm text-[#77798d]">
          Showcase your expertise and manage client work in one place.
        </p>
      </div>
      <section className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <OverviewCard
          label="My services"
          value={services ?? 0}
          detail="Services you offer"
          href="/dashboard/services"
          icon={<BriefcaseBusiness />}
        />
        <OverviewCard
          label="Client enquiries"
          value={leads ?? 0}
          detail="Potential client requests"
          href="/dashboard/leads"
          icon={<Users />}
        />
        <OverviewCard
          label="Bookings"
          value={bookings ?? 0}
          detail="Your appointments"
          href="/dashboard/bookings"
          icon={<CalendarDays />}
        />
        <OverviewCard
          label="Portfolio items"
          value={portfolio ?? 0}
          detail="Work samples published"
          href="/dashboard/provider/portfolio"
          icon={<Images />}
        />
      </section>
      <section className="mt-8 rounded-2xl border border-[#e9e9f2] bg-white p-6">
        <h2 className="text-lg font-extrabold text-[#202136]">
          Strengthen your professional profile
        </h2>
        <p className="mt-2 text-sm leading-6 text-[#77798d]">
          Help customers understand what you do. Add a clear profile, publish
          your services and upload examples of your work.
        </p>
        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          {[
            ["Complete professional profile", "/dashboard/provider/profile"],
            ["Publish your services", "/dashboard/services"],
            ["Add portfolio samples", "/dashboard/provider/portfolio"],
            ["Review client enquiries", "/dashboard/leads"],
          ].map(([t, h]) => (
            <Link
              key={h}
              href={h}
              className="flex items-center justify-between rounded-xl bg-[#fafaff] p-4 text-sm font-bold text-[#34354a]"
            >
              {t}
              <ArrowUpRight size={16} />
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
