import Link from "next/link";
import { updatePassword } from "@/app/actions/auth";
export default async function UpdatePasswordPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f8f8fc] px-4 py-12">
      <section className="w-full max-w-md rounded-3xl border border-[#e8e8f1] bg-white p-8 shadow-xl shadow-[#17182b]/5">
        <Link
          href="/"
          className="mb-8 inline-flex text-xl font-black text-[#17182b]"
        >
          Marx
          <span className="text-[#6658e8]">leads</span>
        </Link>
        <h1 className="text-2xl font-bold">Choose a new password</h1>
        <p className="mb-7 mt-2 text-sm text-[#666981]">
          Use at least 8 characters for your new password.
        </p>
        {error && (
          <p
            role="alert"
            className="mb-4 rounded-xl bg-red-50 p-3 text-sm text-red-700"
          >
            {error}
          </p>
        )}
        <form action={updatePassword} className="space-y-4">
          <label className="block text-sm font-semibold">
            New password
            <input
              className="auth-input mt-2"
              type="password"
              name="password"
              minLength={8}
              autoComplete="new-password"
              required
            />
          </label>
          <button className="primary-button w-full" type="submit">
            Update password
          </button>
        </form>
      </section>
    </main>
  );
}
