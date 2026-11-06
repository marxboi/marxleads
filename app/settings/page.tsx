import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { saveProfileSettings, signOut } from "@/app/actions/auth";

export default async function SettingsPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; message?: string }>;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");
  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .maybeSingle();
  const { error, message } = await searchParams;
  const roles = profile?.account_types ??
    user.user_metadata.account_types ?? ["customer"];

  return (
    <main className="min-h-screen bg-[#f7f7fb]">
      <header className="border-b border-[#e8e8f1] bg-white">
        <div className="container flex h-20 items-center justify-between">
          <Link href="/dashboard" className="text-xl font-black">
            Marx<span className="text-[#6658e8]">leads</span>
          </Link>
          <div className="flex items-center gap-3">
            <Link
              href="/dashboard"
              className="text-sm font-semibold text-[#666981]"
            >
              Dashboard
            </Link>
            <form action={signOut}>
              <button className="secondary-button !px-4 !py-2" type="submit">
                Sign out
              </button>
            </form>
          </div>
        </div>
      </header>
      <div className="container max-w-3xl py-12">
        <p className="text-sm font-semibold text-[#6658e8]">ACCOUNT</p>
        <h1 className="mt-2 text-3xl font-bold">Profile settings</h1>
        <p className="mt-2 text-[#666981]">
          Update your personal details and the roles attached to your Marxleads
          account.
        </p>
        {error && (
          <p
            role="alert"
            className="mt-6 rounded-xl bg-red-50 p-3 text-sm text-red-700"
          >
            {error}
          </p>
        )}
        {message && (
          <p
            role="status"
            className="mt-6 rounded-xl bg-green-50 p-3 text-sm text-green-700"
          >
            {message}
          </p>
        )}
        <form
          action={saveProfileSettings}
          className="mt-8 space-y-5 rounded-3xl border border-[#e8e8f1] bg-white p-6 sm:p-8"
        >
          <label className="block text-sm font-semibold">
            Full name
            <input
              className="auth-input mt-2"
              name="fullName"
              defaultValue={
                profile?.full_name ?? user.user_metadata.full_name ?? ""
              }
              required
            />
          </label>
          <label className="block text-sm font-semibold">
            Email address
            <input
              className="auth-input mt-2 cursor-not-allowed bg-gray-50"
              value={user.email ?? ""}
              readOnly
            />
            <span className="mt-1 block text-xs font-normal text-[#77798d]">
              Email changes can be added through a separate verification flow.
            </span>
          </label>
          <label className="block text-sm font-semibold">
            Country
            <input
              className="auth-input mt-2"
              name="country"
              defaultValue={profile?.country ?? "Nigeria"}
              required
            />
          </label>
          <label className="block text-sm font-semibold">
            City
            <input
              className="auth-input mt-2"
              name="city"
              defaultValue={profile?.city ?? ""}
              placeholder="e.g. Lagos"
            />
          </label>
          <label className="block text-sm font-semibold">
            Business name
            <input
              className="auth-input mt-2"
              name="businessName"
              defaultValue={profile?.business_name ?? ""}
              placeholder="Your business name (optional)"
            />
          </label>
          <fieldset>
            <legend className="mb-2 text-sm font-semibold">
              Account roles
            </legend>
            <div className="grid gap-2 sm:grid-cols-3">
              {[
                ["business_owner", "Business owner"],
                ["service_provider", "Service provider"],
                ["customer", "Customer"],
              ].map(([value, label]) => (
                <label
                  key={value}
                  className="flex items-center gap-2 rounded-xl border border-[#e8e8f1] p-3 text-sm"
                >
                  <input
                    type="checkbox"
                    name="accountTypes"
                    value={value}
                    defaultChecked={roles.includes(value)}
                    className="accent-[#6658e8]"
                  />
                  {label}
                </label>
              ))}
            </div>
          </fieldset>
          <button className="primary-button w-full" type="submit">
            Save changes
          </button>
        </form>
      </div>
    </main>
  );
}
