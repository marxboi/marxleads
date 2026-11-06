import Link from "next/link";
import { signIn } from "@/app/actions/auth";
export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; message?: string }>;
}) {
  const { error, message } = await searchParams;
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f8f8fc] px-4 py-12">
      <section className="w-full max-w-md rounded-3xl border border-[#e8e8f1] bg-white p-8 shadow-xl shadow-[#17182b]/5 sm:p-10">
        <Link
          href="/"
          className="mb-8 inline-flex text-xl font-black text-[#17182b]"
        >
          Marx
          <span className="text-[#6658e8]">leads</span>
        </Link>
        <h1 className="text-2xl font-bold">Welcome back</h1>
        <p className="mb-7 mt-2 text-sm text-[#666981]">
          Log in to continue to your workspace.
        </p>
        {error && (
          <p
            role="alert"
            className="mb-4 rounded-xl bg-red-50 p-3 text-sm text-red-700"
          >
            {error}
          </p>
        )}
        {message && (
          <p className="mb-4 rounded-xl bg-green-50 p-3 text-sm text-green-700">
            {message}
          </p>
        )}
        <form action={signIn} className="space-y-4">
          <label className="block text-sm font-semibold">
            Email address
            <input
              className="auth-input mt-2"
              type="email"
              name="email"
              autoComplete="email"
              required
            />
          </label>
          <label className="block text-sm font-semibold">
            Password
            <input
              className="auth-input mt-2"
              type="password"
              name="password"
              autoComplete="current-password"
              required
            />
          </label>
          <div className="text-right">
            <Link
              className="text-sm font-semibold text-[#6658e8]"
              href="/forgot-password"
            >
              Forgot password?
            </Link>
          </div>
          <button className="primary-button w-full" type="submit">
            Log in
          </button>
        </form>
        <p className="mt-6 text-center text-sm text-[#666981]">
          New to Marxleads?
          <Link className="font-bold text-[#6658e8]" href="/signup">
            Create an account
          </Link>
        </p>
      </section>
    </main>
  );
}
