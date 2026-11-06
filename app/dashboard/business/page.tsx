import { createClient } from "@/lib/supabase/server";
import {
  createBusiness,
  updateBusiness,
  deleteBusiness,
} from "@/app/actions/workspace";

type Business = {
  id: string;
  name: string;
  category: string | null;
  city: string | null;
  description: string | null;
  created_at: string;
};

const inputClass =
  "mt-2 w-full min-w-0 rounded-xl border border-[#e5e5ef] bg-white px-3 py-2.5 text-sm outline-none transition focus:border-[#6658e8] focus:ring-2 focus:ring-[#6658e8]/10";
const buttonClass =
  "rounded-xl bg-[#6658e8] px-4 py-2.5 text-sm font-bold text-white transition hover:bg-[#5547d5]";

export default async function BusinessPage() {
  const db = await createClient();
  const {
    data: { user },
  } = await db.auth.getUser();

  if (!user) return null;

  const { data: rows, error } = await db
    .from("businesses")
    .select("id,name,category,city,description,created_at")
    .eq("owner_id", user.id)
    .order("created_at", { ascending: false });

  const businesses = (rows || []) as Business[];

  return (
    <section className="mx-auto w-full max-w-7xl">
      <p className="text-xs font-bold uppercase tracking-[.18em] text-[#6658e8]">
        Workspace / Business
      </p>
      <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-black text-[#202136] sm:text-3xl">
            My Business
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-[#77798d]">
            Create and manage the public business profiles attached to your
            account.
          </p>
        </div>
        <span className="w-fit rounded-full bg-[#efedff] px-3 py-1.5 text-xs font-bold text-[#6658e8]">
          {businesses.length}{" "}
          {businesses.length === 1 ? "business" : "businesses"}
        </span>
      </div>

      <div className="mt-7 grid min-w-0 gap-6 xl:grid-cols-[minmax(280px,.85fr)_minmax(0,1.4fr)]">
        <form
          action={createBusiness}
          className="h-fit min-w-0 rounded-2xl border border-[#e9e9f2] bg-white p-4 shadow-sm sm:p-6"
        >
          <h2 className="text-lg font-extrabold text-[#202136]">
            Add a business
          </h2>
          <p className="mt-1 text-xs leading-5 text-[#85869a]">
            Start with the basic details. You can refine your public profile
            later.
          </p>

          <label className="mt-5 block text-sm font-semibold text-[#34354a]">
            Business name *
            <input
              name="name"
              required
              maxLength={120}
              className={inputClass}
              placeholder="e.g. Marx Studio"
            />
          </label>
          <label className="mt-4 block text-sm font-semibold text-[#34354a]">
            Category
            <input
              name="category"
              maxLength={80}
              className={inputClass}
              placeholder="e.g. Design & Creative"
            />
          </label>
          <label className="mt-4 block text-sm font-semibold text-[#34354a]">
            City
            <input
              name="city"
              maxLength={80}
              className={inputClass}
              placeholder="e.g. Lagos"
            />
          </label>
          <label className="mt-4 block text-sm font-semibold text-[#34354a]">
            Description
            <textarea
              name="description"
              rows={4}
              maxLength={1000}
              className={inputClass}
              placeholder="Describe what your business does..."
            />
          </label>
          <button className={`${buttonClass} mt-5 w-full`}>
            Create business
          </button>
        </form>

        <div className="min-w-0 space-y-4">
          <h2 className="text-lg font-extrabold text-[#202136]">
            Your businesses
          </h2>
          {error ? (
            <p
              role="alert"
              className="break-words rounded-xl border border-red-100 bg-red-50 p-4 text-sm text-red-700"
            >
              {error.message}. Check that the dashboard database setup SQL has
              been run in Supabase.
            </p>
          ) : businesses.length ? (
            businesses.map((business) => (
              <article
                key={business.id}
                className="min-w-0 rounded-2xl border border-[#e9e9f2] bg-white p-4 shadow-sm sm:p-5"
              >
                <div className="flex min-w-0 flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div className="min-w-0">
                    <h3 className="break-words text-base font-bold text-[#202136]">
                      {business.name}
                    </h3>
                    <p className="mt-1 break-words text-xs text-[#85869a]">
                      {[business.category, business.city]
                        .filter(Boolean)
                        .join(" · ") || "Category and location not added"}
                    </p>
                  </div>
                  <span className="w-fit shrink-0 rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-bold text-emerald-700">
                    Your profile
                  </span>
                </div>
                <p className="mt-3 whitespace-pre-wrap break-words text-sm leading-6 text-[#686a7e]">
                  {business.description || "No description added yet."}
                </p>

                <details className="mt-4 border-t border-[#f0f0f5] pt-4">
                  <summary className="cursor-pointer text-sm font-bold text-[#6658e8]">
                    Edit business details
                  </summary>
                  <form
                    action={updateBusiness}
                    className="mt-4 grid min-w-0 gap-3 sm:grid-cols-2"
                  >
                    <input
                      type="hidden"
                      name="business_id"
                      value={business.id}
                    />
                    <label className="min-w-0 text-xs font-semibold text-[#55566a] sm:col-span-2">
                      Business name *
                      <input
                        name="name"
                        required
                        defaultValue={business.name}
                        maxLength={120}
                        className={inputClass}
                      />
                    </label>
                    <label className="min-w-0 text-xs font-semibold text-[#55566a]">
                      Category
                      <input
                        name="category"
                        defaultValue={business.category || ""}
                        maxLength={80}
                        className={inputClass}
                      />
                    </label>
                    <label className="min-w-0 text-xs font-semibold text-[#55566a]">
                      City
                      <input
                        name="city"
                        defaultValue={business.city || ""}
                        maxLength={80}
                        className={inputClass}
                      />
                    </label>
                    <label className="min-w-0 text-xs font-semibold text-[#55566a] sm:col-span-2">
                      Description
                      <textarea
                        name="description"
                        rows={3}
                        defaultValue={business.description || ""}
                        maxLength={1000}
                        className={inputClass}
                      />
                    </label>
                    <div className="flex flex-wrap gap-2 sm:col-span-2">
                      <button className={buttonClass}>Save changes</button>
                    </div>
                  </form>
                  <form action={deleteBusiness} className="mt-3">
                    <input
                      type="hidden"
                      name="business_id"
                      value={business.id}
                    />
                    <button className="rounded-xl border border-red-200 px-4 py-2.5 text-sm font-bold text-red-600 transition hover:bg-red-50">
                      Delete business
                    </button>
                  </form>
                </details>
              </article>
            ))
          ) : (
            <div className="rounded-2xl border border-dashed border-[#d8d7e6] bg-white p-8 text-center">
              <p className="font-bold text-[#34354a]">
                No business profiles yet
              </p>
              <p className="mt-2 text-sm leading-6 text-[#85869a]">
                Create your first business using the form. It will be saved to
                your account.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
