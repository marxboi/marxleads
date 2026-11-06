import { createClient } from "@/lib/supabase/server";
import {
  createService,
  updateService,
  deleteService,
} from "@/app/actions/workspace";

type Service = {
  id: string;
  title: string;
  description: string | null;
  price: number | string;
  currency: string;
  business_id: string | null;
  created_at: string;
};

type Business = { id: string; name: string };

const input =
  "mt-2 w-full min-w-0 rounded-xl border border-[#e5e5ef] bg-white px-3 py-2.5 text-sm outline-none transition focus:border-[#6658e8] focus:ring-2 focus:ring-[#6658e8]/10";
const primary =
  "rounded-xl bg-[#6658e8] px-4 py-2.5 text-sm font-bold text-white transition hover:bg-[#5547d5]";

function money(price: number | string, currency: string) {
  const value = Number(price);
  return value > 0
    ? `${currency} ${value.toLocaleString(undefined, { maximumFractionDigits: 2 })}`
    : "Contact for price";
}

export default async function ServicesPage() {
  const db = await createClient();
  const {
    data: { user },
  } = await db.auth.getUser();
  if (!user) return null;

  const [{ data: serviceRows, error }, { data: businessRows }] =
    await Promise.all([
      db
        .from("services")
        .select("id,title,description,price,currency,business_id,created_at")
        .eq("owner_id", user.id)
        .order("created_at", { ascending: false }),
      db
        .from("businesses")
        .select("id,name")
        .eq("owner_id", user.id)
        .order("name"),
    ]);

  const services = (serviceRows || []) as Service[];
  const businesses = (businessRows || []) as Business[];
  const businessNames = new Map(businesses.map((b) => [b.id, b.name]));

  return (
    <section className="mx-auto w-full max-w-7xl min-w-0">
      <p className="text-xs font-bold uppercase tracking-[.18em] text-[#6658e8]">
        Workspace / Services
      </p>
      <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-black text-[#202136] sm:text-3xl">
            Services
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-[#77798d]">
            Publish what you offer, set your starting price and connect each
            service to one of your businesses.
          </p>
        </div>
        <span className="w-fit rounded-full bg-[#efedff] px-3 py-1.5 text-xs font-bold text-[#6658e8]">
          {services.length} {services.length === 1 ? "service" : "services"}
        </span>
      </div>

      <div className="mt-7 grid min-w-0 gap-6 xl:grid-cols-[minmax(280px,.85fr)_minmax(0,1.4fr)]">
        <form
          action={createService}
          className="h-fit min-w-0 rounded-2xl border border-[#e9e9f2] bg-white p-4 shadow-sm sm:p-6"
        >
          <h2 className="text-lg font-extrabold text-[#202136]">
            Add a service
          </h2>
          <p className="mt-1 text-xs leading-5 text-[#85869a]">
            Describe the service clearly so potential customers know what you
            provide.
          </p>

          <label className="mt-5 block text-sm font-semibold text-[#34354a]">
            Service title *
            <input
              name="title"
              required
              maxLength={120}
              className={input}
              placeholder="e.g. Website design"
            />
          </label>
          <label className="mt-4 block text-sm font-semibold text-[#34354a]">
            Business profile
            <select name="business_id" className={input} defaultValue="">
              <option value="">Not linked to a business</option>
              {businesses.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.name}
                </option>
              ))}
            </select>
          </label>
          <label className="mt-4 block text-sm font-semibold text-[#34354a]">
            Description
            <textarea
              name="description"
              rows={4}
              maxLength={2000}
              className={input}
              placeholder="Describe the service and what's included..."
            />
          </label>
          <div className="mt-4 grid min-w-0 grid-cols-1 gap-3 sm:grid-cols-2">
            <label className="min-w-0 text-sm font-semibold text-[#34354a]">
              Starting price
              <input
                name="price"
                type="number"
                min="0"
                step="0.01"
                defaultValue="0"
                className={input}
                placeholder="0"
              />
            </label>
            <label className="min-w-0 text-sm font-semibold text-[#34354a]">
              Currency
              <select name="currency" className={input} defaultValue="NGN">
                <option value="NGN">NGN — Nigerian Naira</option>
                <option value="USD">USD — US Dollar</option>
                <option value="GBP">GBP — British Pound</option>
                <option value="EUR">EUR — Euro</option>
              </select>
            </label>
          </div>
          <button className={`${primary} mt-5 w-full`}>Publish service</button>
        </form>

        <div className="min-w-0 space-y-4">
          <h2 className="text-lg font-extrabold text-[#202136]">
            Your services
          </h2>
          {error ? (
            <p
              role="alert"
              className="break-words rounded-xl border border-red-100 bg-red-50 p-4 text-sm text-red-700"
            >
              {error.message}. Confirm the dashboard schema has been run in
              Supabase.
            </p>
          ) : services.length ? (
            services.map((service) => (
              <article
                key={service.id}
                className="min-w-0 rounded-2xl border border-[#e9e9f2] bg-white p-4 shadow-sm sm:p-5"
              >
                <div className="flex min-w-0 flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                  <div className="min-w-0">
                    <h3 className="break-words font-bold text-[#202136]">
                      {service.title}
                    </h3>
                    <p className="mt-1 break-words text-xs text-[#85869a]">
                      {service.business_id
                        ? businessNames.get(service.business_id) ||
                          "Linked business"
                        : "Independent service"}
                    </p>
                  </div>
                  <b className="w-fit shrink-0 text-sm text-[#6658e8]">
                    {money(service.price, service.currency)}
                  </b>
                </div>
                <p className="mt-3 whitespace-pre-wrap break-words text-sm leading-6 text-[#686a7e]">
                  {service.description || "No description added yet."}
                </p>

                <details className="mt-4 border-t border-[#f0f0f5] pt-4">
                  <summary className="cursor-pointer text-sm font-bold text-[#6658e8]">
                    Edit service
                  </summary>
                  <form
                    action={updateService}
                    className="mt-4 grid min-w-0 gap-3 sm:grid-cols-2"
                  >
                    <input type="hidden" name="service_id" value={service.id} />
                    <label className="min-w-0 text-xs font-semibold text-[#55566a] sm:col-span-2">
                      Service title *
                      <input
                        name="title"
                        required
                        defaultValue={service.title}
                        maxLength={120}
                        className={input}
                      />
                    </label>
                    <label className="min-w-0 text-xs font-semibold text-[#55566a] sm:col-span-2">
                      Business profile
                      <select
                        name="business_id"
                        className={input}
                        defaultValue={service.business_id || ""}
                      >
                        <option value="">Not linked to a business</option>
                        {businesses.map((b) => (
                          <option key={b.id} value={b.id}>
                            {b.name}
                          </option>
                        ))}
                      </select>
                    </label>
                    <label className="min-w-0 text-xs font-semibold text-[#55566a] sm:col-span-2">
                      Description
                      <textarea
                        name="description"
                        rows={3}
                        defaultValue={service.description || ""}
                        maxLength={2000}
                        className={input}
                      />
                    </label>
                    <label className="min-w-0 text-xs font-semibold text-[#55566a]">
                      Price
                      <input
                        name="price"
                        type="number"
                        min="0"
                        step="0.01"
                        defaultValue={Number(service.price)}
                        className={input}
                      />
                    </label>
                    <label className="min-w-0 text-xs font-semibold text-[#55566a]">
                      Currency
                      <select
                        name="currency"
                        className={input}
                        defaultValue={service.currency}
                      >
                        <option value="NGN">NGN</option>
                        <option value="USD">USD</option>
                        <option value="GBP">GBP</option>
                        <option value="EUR">EUR</option>
                      </select>
                    </label>
                    <button className={`${primary} sm:col-span-2`}>
                      Save changes
                    </button>
                  </form>
                  <form action={deleteService} className="mt-3">
                    <input type="hidden" name="service_id" value={service.id} />
                    <button className="rounded-xl border border-red-200 px-4 py-2.5 text-sm font-bold text-red-600 transition hover:bg-red-50">
                      Delete service
                    </button>
                  </form>
                </details>
              </article>
            ))
          ) : (
            <div className="rounded-2xl border border-dashed border-[#d8d7e6] bg-white p-8 text-center">
              <p className="font-bold text-[#34354a]">
                No services published yet
              </p>
              <p className="mt-2 text-sm leading-6 text-[#85869a]">
                Add your first service using the form. You can link it to a
                business profile if you have created one.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
