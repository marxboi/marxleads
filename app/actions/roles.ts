"use server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

const allowed = ["customer", "business_owner", "service_provider"] as const;
export async function switchActiveRole(formData: FormData) {
  const role = String(formData.get("role") || "");
  if (!allowed.includes(role as (typeof allowed)[number]))
    redirect("/dashboard");
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
    user.user_metadata.account_types ||
    []) as string[];
  if (!roles.includes(role)) redirect("/dashboard");
  const jar = await cookies();
  jar.set("marxleads_active_role", role, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });
  redirect("/dashboard");
}
