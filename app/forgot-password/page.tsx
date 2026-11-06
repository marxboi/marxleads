import Link from "next/link";
import { sendPasswordReset } from "@/app/actions/auth";
export default async function ForgotPasswordPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; message?: string }>;
}) {
  const { error, message } = await searchParams;
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
        <h1 className="text-2xl font-bold">Reset your password</h1>
        <p className="mb-7 mt-2 text-sm leading-6 text-[#666981]">
          Enter your account email and we'll send you a password reset link.
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
        <form action={sendPasswordReset} className="space-y-4">
          <label className="block text-sm font-semibold">
            Email address
            <input
              className="auth-input mt-2"
              type="email"
              name="email"
              required
            />
          </label>
          <button className="primary-button w-full" type="submit">
            Send reset link
          </button>
        </form>
        <Link
          href="/login"
          className="mt-6 block text-center text-sm font-semibold text-[#6658e8]"
        >
          Back to login
        </Link>
      </section>
    </main>
  );
}
