import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { createClient } from "@/lib/supabase/server";
import Sidebar from "@/components/dashboard/Sidebar";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");
  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name,account_types")
    .eq("id", user.id)
    .maybeSingle();
  const roles = (profile?.account_types ||
    user.user_metadata.account_types || ["customer"]) as string[];
  const jar = await cookies();
  const savedRole = jar.get("marxleads_active_role")?.value;
  const activeRole =
    savedRole && roles.includes(savedRole) ? savedRole : roles[0] || "customer";
  return (
    <div className="min-h-screen bg-[#f7f7fb] md:flex">
      <Sidebar
        name={profile?.full_name || ""}
        email={user.email || ""}
        roles={roles}
        activeRole={activeRole}
      />
      <main className="min-w-0 w-full flex-1 overflow-x-hidden p-4 sm:p-6 md:p-8 lg:p-9">
        {children}
      </main>
    </div>
  );
}
