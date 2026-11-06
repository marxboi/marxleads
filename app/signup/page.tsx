import Link from "next/link";
import { signUp } from "@/app/actions/auth";
export default async function SignupPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f8f8fc] px-4 py-12">
      <section className="w-full max-w-xl rounded-3xl border border-[#e8e8f1] bg-white p-7 shadow-xl shadow-[#17182b]/5 sm:p-10">
        <Link
          href="/"
          className="mb-8 inline-flex text-xl font-black tracking-tight text-[#17182b]"
        >
          Marx
          <span className="text-[#6658e8]">leads</span>
        </Link>
        <h1 className="text-2xl font-bold tracking-tight">
          Create your Marxleads account
        </h1>
        <p className="mb-7 mt-2 text-sm leading-6 text-[#666981]">
          One account. Everything you need to move your business forward.
        </p>
        {error && (
          <p
            role="alert"
            className="mb-4 rounded-xl bg-red-50 p-3 text-sm text-red-700"
          >
            {error}
          </p>
        )}
        <form action={signUp} className="space-y-4">
          <label className="block text-sm font-semibold">
            Full name
            <input
              className="auth-input mt-2"
              name="fullName"
              autoComplete="name"
              required
              placeholder="Your full name"
            />
          </label>
          <label className="block text-sm font-semibold">
            Email address
            <input
              className="auth-input mt-2"
              name="email"
              type="email"
              autoComplete="email"
              required
              placeholder="you@example.com"
            />
          </label>
          <label className="block text-sm font-semibold">
            Password
            <input
              className="auth-input mt-2"
              name="password"
              type="password"
              autoComplete="new-password"
              minLength={8}
              required
              placeholder="At least 8 characters"
            />
          </label>
          <fieldset>
            <legend className="mb-2 text-sm font-semibold">
              How will you use Marxleads?
            </legend>
            <div className="grid gap-2 sm:grid-cols-3">
              {[
                ["business_owner", "Business owner"],
                ["service_provider", "Service provider"],
                ["customer", "Customer"],
              ].map(([v, l]) => (
                <label
                  key={v}
                  className="flex cursor-pointer items-center gap-2 rounded-xl border border-[#e8e8f1] p-3 text-sm"
                >
                  <input
                    type="checkbox"
                    name="accountTypes"
                    value={v}
                    defaultChecked={v === "business_owner"}
                    className="accent-[#6658e8]"
                  />
                  {l}
                </label>
              ))}
            </div>
            <p className="mt-2 text-xs text-[#77798d]">
              Select more than one if it applies. You can change this later.
            </p>
          </fieldset>
          <button className="primary-button w-full" type="submit">
            Create account
          </button>
        </form>
        <p className="mt-6 text-center text-sm text-[#666981]">
          Already have an account?
          <Link className="font-bold text-[#6658e8]" href="/login">
            Log in
          </Link>
        </p>
      </section>
    </main>
  );
}
