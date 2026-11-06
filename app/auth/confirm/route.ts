import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const requestedNext = searchParams.get("next") ?? "/onboarding";
  // Only allow local paths to prevent open-redirect vulnerabilities.
  const next =
    requestedNext.startsWith("/") && !requestedNext.startsWith("//")
      ? requestedNext
      : "/onboarding";

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user)
        return NextResponse.redirect(
          new URL("/login?error=Please+log+in+to+continue.", origin),
        );
      const { data: profile } = await supabase
        .from("profiles")
        .select("full_name,country,account_types")
        .eq("id", user.id)
        .maybeSingle();
      const complete = Boolean(
        profile?.full_name?.trim() &&
        profile?.country?.trim() &&
        profile?.account_types?.length,
      );
      return NextResponse.redirect(
        new URL(complete ? "/dashboard" : "/onboarding", origin),
      );
    }
  }
  return NextResponse.redirect(
    new URL(
      "/login?error=Unable+to+verify+your+email.+Request+a+new+link.",
      origin,
    ),
  );
}
