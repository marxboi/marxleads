import { redirect } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { saveOnboarding } from "@/app/actions/auth";
export default async function OnboardingPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");
  const { error } = await searchParams;
  const roles = (user.user_metadata.account_types ?? ["customer"]) as string[];
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f8f8fc] px-4 py-12">
      <section className="w-full max-w-xl rounded-3xl border border-[#e8e8f1] bg-white p-8 shadow-xl shadow-[#17182b]/5 sm:p-10">
        <Link
          href="/"
          className="mb-8 inline-flex text-xl font-black text-[#17182b]"
        >
          Marx
          <span className="text-[#6658e8]">leads</span>
        </Link>
        <h1 className="text-2xl font-bold">Set up your profile</h1>
        <p className="mb-7 mt-2 text-sm text-[#666981]">
          A few details will help us tailor your Marxleads workspace.
        </p>
        {error && (
          <p className="mb-4 rounded-xl bg-red-50 p-3 text-sm text-red-700">
            {error}
          </p>
        )}
        <form action={saveOnboarding} className="space-y-4">
          <label className="block text-sm font-semibold">
            Full name
            <input
              className="auth-input mt-2"
              name="fullName"
              defaultValue={String(user.user_metadata.full_name ?? "")}
              required
            />
          </label>
          <label className="block text-sm font-semibold">
            Country
            <input
              className="auth-input mt-2"
              name="country"
              defaultValue="Nigeria"
              required
            />
          </label>
          <label className="block text-sm font-semibold">
            City
            <input
              className="auth-input mt-2"
              name="city"
              placeholder="e.g. Lagos"
            />
          </label>
          {roles.includes("business_owner") && (
            <label className="block text-sm font-semibold">
              Business name (optional)
              <input
                className="auth-input mt-2"
                name="businessName"
                placeholder="Your business name"
              />
            </label>
          )}
          <fieldset>
            <legend className="mb-2 text-sm font-semibold">
              Your account roles
            </legend>
            <div className="grid gap-2 sm:grid-cols-3">
              {[
                ["business_owner", "Business owner"],
                ["service_provider", "Service provider"],
                ["customer", "Customer"],
              ].map(([v, l]) => (
                <label
                  key={v}
                  className="flex items-center gap-2 rounded-xl border border-[#e8e8f1] p-3 text-sm"
                >
                  <input
                    type="checkbox"
                    name="accountTypes"
                    value={v}
                    defaultChecked={roles.includes(v)}
                    className="accent-[#6658e8]"
                  />
                  {l}
                </label>
              ))}
            </div>
          </fieldset>
          <button className="primary-button w-full" type="submit">
            Save and continue
          </button>
        </form>
      </section>
    </main>
  );
}
