import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import {
  Building2,
  BriefcaseBusiness,
  Users,
  CalendarDays,
  Plus,
  ArrowUpRight,
} from "lucide-react";
import OverviewCard from "@/components/dashboard/OverviewCard";
export default async function OwnerOverview() {
  const db = await createClient();
  const {
    data: { user },
  } = await db.auth.getUser();
  if (!user) redirect("/login");
  const [
    { data: profile },
    { count: businesses },
    { count: services },
    { count: leads },
    { count: bookings },
  ] = await Promise.all([
    db.from("profiles").select("full_name").eq("id", user.id).maybeSingle(),
    db
      .from("businesses")
      .select("id", { count: "exact", head: true })
      .eq("owner_id", user.id),
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
  ]);
  return (
    <>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-[.18em] text-[#6658e8]">
            Business workspace
          </p>
          <h1 className="mt-2 text-3xl font-black text-[#202136]">
            Welcome back, {profile?.full_name?.split(" ")[0] || "there"}.
          </h1>
          <p className="mt-2 text-sm text-[#77798d]">
            Manage your business, offerings and customer relationships.
          </p>
        </div>
        <Link
          href="/dashboard/business"
          className="inline-flex items-center gap-2 rounded-xl bg-[#6658e8] px-4 py-3 text-sm font-bold text-white"
        >
          <Plus size={17} />
          Manage business
        </Link>
      </div>
      <section className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <OverviewCard
          label="Business profiles"
          value={businesses ?? 0}
          detail="Businesses you manage"
          href="/dashboard/business"
          icon={<Building2 />}
        />
        <OverviewCard
          label="Services & products"
          value={services ?? 0}
          detail="Your published offerings"
          href="/dashboard/services"
          icon={<BriefcaseBusiness />}
        />
        <OverviewCard
          label="Customer leads"
          value={leads ?? 0}
          detail="Enquiries received"
          href="/dashboard/leads"
          icon={<Users />}
        />
        <OverviewCard
          label="Bookings"
          value={bookings ?? 0}
          detail="Bookings assigned to you"
          href="/dashboard/bookings"
          icon={<CalendarDays />}
        />
      </section>
      <section className="mt-8 rounded-2xl border border-[#e9e9f2] bg-white p-6">
        <h2 className="text-lg font-extrabold text-[#202136]">
          Build your business presence
        </h2>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-[#77798d]">
          Set up your public business profile, publish your services and respond
          promptly when customers contact you.
        </p>
        <div className="mt-5 grid gap-3 md:grid-cols-3">
          {[
            ["01", "Complete your business profile", "/dashboard/business"],
            ["02", "Add services and products", "/dashboard/services"],
            ["03", "Respond to customer leads", "/dashboard/leads"],
          ].map(([n, t, h]) => (
            <Link
              key={n}
              href={h}
              className="flex items-center gap-3 rounded-xl bg-[#fafaff] p-4"
            >
              <b className="text-[#6658e8]">{n}</b>
              <span className="flex-1 text-sm font-bold text-[#34354a]">
                {t}
              </span>
              <ArrowUpRight size={16} />
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
