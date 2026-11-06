import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import {
  Compass,
  Bookmark,
  MessageSquare,
  CalendarDays,
  ArrowUpRight,
} from "lucide-react";
import OverviewCard from "@/components/dashboard/OverviewCard";
export default async function CustomerOverview() {
  const db = await createClient();
  const {
    data: { user },
  } = await db.auth.getUser();
  if (!user) redirect("/login");
  const [{ data: profile }, { count: enquiries }, { count: bookings }] =
    await Promise.all([
      db.from("profiles").select("full_name").eq("id", user.id).maybeSingle(),
      db
        .from("leads")
        .select("id", { count: "exact", head: true })
        .eq("customer_id", user.id),
      db
        .from("bookings")
        .select("id", { count: "exact", head: true })
        .eq("customer_id", user.id),
    ]);
  return (
    <>
      <div>
        <p className="text-xs font-bold uppercase tracking-[.18em] text-[#6658e8]">
          Customer space
        </p>
        <h1 className="mt-2 text-3xl font-black text-[#202136]">
          Welcome, {profile?.full_name?.split(" ")[0] || "there"}.
        </h1>
        <p className="mt-2 text-sm text-[#77798d]">
          Discover trusted businesses, contact providers and keep track of your
          requests.
        </p>
      </div>
      <section className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <OverviewCard
          label="Explore businesses"
          value="Discover"
          detail="Find businesses and providers"
          href="/dashboard/customer/discover"
          icon={<Compass />}
        />
        <OverviewCard
          label="Saved businesses"
          value="—"
          detail="Your saved shortlist"
          href="/dashboard/customer/saved"
          icon={<Bookmark />}
        />
        <OverviewCard
          label="My enquiries"
          value={enquiries ?? 0}
          detail="Requests you've sent"
          href="/dashboard/customer/enquiries"
          icon={<MessageSquare />}
        />
        <OverviewCard
          label="My bookings"
          value={bookings ?? 0}
          detail="Your appointments"
          href="/dashboard/customer/bookings"
          icon={<CalendarDays />}
        />
      </section>
      <section className="mt-8 grid gap-5 lg:grid-cols-[1.3fr_.7fr]">
        <div className="rounded-2xl border border-[#e9e9f2] bg-white p-6">
          <h2 className="text-lg font-extrabold text-[#202136]">
            Your next steps
          </h2>
          <p className="mt-2 text-sm text-[#77798d]">
            Find the right business or professional, then send an enquiry or
            request a booking.
          </p>
          <div className="mt-5 space-y-3">
            {[
              [
                "Explore businesses and services",
                "Browse the Marxleads directory",
                "/dashboard/customer/discover",
              ],
              [
                "Track your enquiries",
                "Follow up on requests you have sent",
                "/dashboard/customer/enquiries",
              ],
              [
                "Manage your bookings",
                "Review upcoming and previous appointments",
                "/dashboard/customer/bookings",
              ],
            ].map(([t, d, h]) => (
              <Link
                key={h}
                href={h}
                className="flex items-center gap-3 rounded-xl bg-[#fafaff] p-4"
              >
                <span className="min-w-0 flex-1">
                  <b className="block text-sm text-[#34354a]">{t}</b>
                  <small className="text-xs text-[#85869a]">{d}</small>
                </span>
                <ArrowUpRight size={17} />
              </Link>
            ))}
          </div>
        </div>
        <div className="rounded-2xl bg-[#202136] p-6 text-white">
          <p className="text-xs font-bold uppercase tracking-[.16em] text-[#aaa2ff]">
            Your Marxleads account
          </p>
          <h2 className="mt-3 text-xl font-extrabold">
            One place for your business needs.
          </h2>
          <p className="mt-3 text-sm leading-6 text-[#c2c1d2]">
            Save useful providers, keep conversations organised and manage
            appointments from your customer space.
          </p>
        </div>
      </section>
    </>
  );
}
