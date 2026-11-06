import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

const authRoutes = ["/login", "/signup", "/forgot-password"];
const protectedRoutes = ["/dashboard", "/settings"];
const roleHome = (role: string) =>
  role === "business_owner"
    ? "/dashboard/owner"
    : role === "service_provider"
      ? "/dashboard/provider"
      : "/dashboard/customer";

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({ request });
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll: () => request.cookies.getAll(),
        setAll(
          cookiesToSet: Array<{
            name: string;
            value: string;
            options?: Parameters<typeof response.cookies.set>[2];
          }>,
        ) {
          cookiesToSet.forEach(
            ({ name, value }: { name: string; value: string }) =>
              request.cookies.set(name, value),
          );
          response = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options),
          );
        },
      },
    },
  );
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const pathname = request.nextUrl.pathname;
  if (!user) {
    if (
      protectedRoutes.some(
        (route) => pathname === route || pathname.startsWith(`${route}/`),
      )
    ) {
      const url = request.nextUrl.clone();
      url.pathname = "/login";
      url.searchParams.set("next", pathname);
      return NextResponse.redirect(url);
    }
    return response;
  }
  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name,country,account_types")
    .eq("id", user.id)
    .maybeSingle();
  const roles = (profile?.account_types ||
    user.user_metadata.account_types ||
    []) as string[];
  const complete = Boolean(
    profile?.full_name?.trim() && profile?.country?.trim() && roles.length,
  );
  if (
    !complete &&
    !pathname.startsWith("/onboarding") &&
    !pathname.startsWith("/auth/")
  ) {
    const url = request.nextUrl.clone();
    url.pathname = "/onboarding";
    url.search = "";
    return NextResponse.redirect(url);
  }
  if (complete && pathname === "/onboarding") {
    const url = request.nextUrl.clone();
    url.pathname = "/dashboard";
    url.search = "";
    return NextResponse.redirect(url);
  }
  if (authRoutes.includes(pathname)) {
    const url = request.nextUrl.clone();
    url.pathname = complete ? "/dashboard" : "/onboarding";
    url.search = "";
    return NextResponse.redirect(url);
  }
  if (pathname.startsWith("/dashboard")) {
    const saved = request.cookies.get("marxleads_active_role")?.value;
    const active =
      saved && roles.includes(saved) ? saved : roles[0] || "customer";
    const allowed = pathname.startsWith("/dashboard/customer")
      ? active === "customer"
      : pathname.startsWith("/dashboard/owner") ||
          pathname.startsWith("/dashboard/business")
        ? active === "business_owner"
        : pathname.startsWith("/dashboard/provider")
          ? active === "service_provider"
          : pathname.startsWith("/dashboard/services") ||
              pathname.startsWith("/dashboard/leads") ||
              pathname.startsWith("/dashboard/analytics")
            ? ["business_owner", "service_provider"].includes(active)
            : pathname.startsWith("/dashboard/bookings") ||
                pathname.startsWith("/dashboard/messages")
              ? ["customer", "business_owner", "service_provider"].includes(
                  active,
                )
              : true;
    if (!allowed) {
      const url = request.nextUrl.clone();
      url.pathname = roleHome(active);
      url.search = "";
      return NextResponse.redirect(url);
    }
  }
  return response;
}
export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
