"use server";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
const value = (data: FormData, key: string) =>
  String(data.get(key) ?? "").trim();

export async function signUp(data: FormData) {
  const fullName = value(data, "fullName"),
    email = value(data, "email").toLowerCase(),
    password = value(data, "password");
  const accountTypes = data.getAll("accountTypes").map(String);
  if (!fullName || !email || password.length < 8 || !accountTypes.length)
    redirect(
      "/signup?error=Complete+all+fields.+Password+must+be+at+least+8+characters.",
    );
  const supabase = await createClient();
  const { data: result, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"}/auth/confirm?next=/onboarding`,
      data: { full_name: fullName, account_types: accountTypes },
    },
  });
  if (error) redirect(`/signup?error=${encodeURIComponent(error.message)}`);
  if (result.session) redirect("/onboarding");
  redirect("/login?message=Check+your+email+to+confirm+your+account.");
}
export async function signIn(data: FormData) {
  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({
    email: value(data, "email").toLowerCase(),
    password: value(data, "password"),
  });
  if (error) redirect(`/login?error=${encodeURIComponent(error.message)}`);
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");
  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name,country,account_types")
    .eq("id", user.id)
    .maybeSingle();
  if (!isProfileComplete(profile)) redirect("/onboarding");
  redirect("/dashboard");
}
export async function sendPasswordReset(data: FormData) {
  const supabase = await createClient();
  const { error } = await supabase.auth.resetPasswordForEmail(
    value(data, "email").toLowerCase(),
    {
      redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"}/auth/confirm?next=/update-password`,
    },
  );
  if (error)
    redirect(`/forgot-password?error=${encodeURIComponent(error.message)}`);
  redirect(
    "/forgot-password?message=If+an+account+exists,+a+reset+link+has+been+sent.",
  );
}
function isProfileComplete(
  profile: {
    full_name?: string | null;
    country?: string | null;
    account_types?: string[] | null;
  } | null,
) {
  return Boolean(
    profile?.full_name?.trim() &&
    profile?.country?.trim() &&
    profile?.account_types?.length,
  );
}

export async function saveOnboarding(data: FormData) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");
  const roles = data.getAll("accountTypes").map(String);
  const { error } = await supabase.from("profiles").upsert({
    id: user.id,
    full_name: value(data, "fullName") || user.user_metadata.full_name || "",
    country: value(data, "country"),
    city: value(data, "city") || null,
    business_name: value(data, "businessName") || null,
    account_types: roles.length
      ? roles
      : (user.user_metadata.account_types ?? ["customer"]),
    updated_at: new Date().toISOString(),
  });
  if (error) redirect(`/onboarding?error=${encodeURIComponent(error.message)}`);
  await supabase.auth.updateUser({
    data: {
      full_name: value(data, "fullName"),
      account_types: roles.length
        ? roles
        : (user.user_metadata.account_types ?? ["customer"]),
    },
  });
  redirect("/dashboard");
}
export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/login");
}

export async function updatePassword(data: FormData) {
  const password = value(data, "password");
  if (password.length < 8)
    redirect("/update-password?error=Password+must+be+at+least+8+characters.");
  const supabase = await createClient();
  const { error } = await supabase.auth.updateUser({ password });
  if (error)
    redirect(`/update-password?error=${encodeURIComponent(error.message)}`);
  redirect("/login?message=Your+password+has+been+updated.+Please+log+in.");
}

export async function saveProfileSettings(data: FormData) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");
  const roles = data
    .getAll("accountTypes")
    .map(String)
    .filter((role) =>
      ["business_owner", "service_provider", "customer"].includes(role),
    );
  const fullName = value(data, "fullName");
  const country = value(data, "country");
  if (!fullName || !country || !roles.length)
    redirect(
      "/settings?error=Please+complete+your+name,+country+and+at+least+one+account+role.",
    );
  const { error } = await supabase.from("profiles").upsert({
    id: user.id,
    full_name: fullName,
    country,
    city: value(data, "city") || null,
    business_name: value(data, "businessName") || null,
    account_types: roles,
    updated_at: new Date().toISOString(),
  });
  if (error) redirect(`/settings?error=${encodeURIComponent(error.message)}`);
  const { error: metadataError } = await supabase.auth.updateUser({
    data: { full_name: fullName, account_types: roles },
  });
  if (metadataError)
    redirect(`/settings?error=${encodeURIComponent(metadataError.message)}`);
  redirect("/settings?message=Your+profile+has+been+updated.");
}
