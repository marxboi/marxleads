import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export default async function DashboardRouter() {
  const db = await createClient();
  const {
    data: { user },
  } = await db.auth.getUser();
  if (!user) redirect("/login");
  const { data: profile } = await db
    .from("profiles")
    .select("account_types")
    .eq("id", user.id)
    .maybeSingle();
  const roles = (profile?.account_types ||
    user.user_metadata.account_types || ["customer"]) as string[];
  const jar = await cookies();
  const active = jar.get("marxleads_active_role")?.value;
  const role =
    active && roles.includes(active) ? active : roles[0] || "customer";
  if (role === "business_owner") redirect("/dashboard/owner");
  if (role === "service_provider") redirect("/dashboard/provider");
  redirect("/dashboard/customer");
}
