"use client";

function CircleHelp({ size = 13 }: { size?: number }) {
  return (
    <svg
      aria-hidden="true"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M9.1 9a3 3 0 0 1 5.8 1c0 2-3 3-3 3" />
      <path d="M12 17h.01" />
    </svg>
  );
}

function Plus({ size = 13 }: { size?: number }) {
  return (
    <svg
      aria-hidden="true"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    >
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}

function X({ size = 13 }: { size?: number }) {
  return (
    <svg
      aria-hidden="true"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    >
      <path d="m18 6-12 12M6 6l12 12" />
    </svg>
  );
}

const faqs = [
  {
    q: "Do I need technical skills to use Marxleads?",
    a: "The product goal is guided setup and simple tools for business owners who do not want to code. The first release will focus on a straightforward business profile and public page.",
  },
  {
    q: "Can I use it if my customers find me on WhatsApp or Instagram?",
    a: "Yes. The platform is designed to give you a central business page you can share from social profiles, messages, email and other channels.",
  },
  {
    q: "Will customers be able to pay me online?",
    a: "Online payments are planned through supported payment providers. Payment processing will only be available after integrations, verification and testing are complete.",
  },
  {
    q: "Is Marxleads available now?",
    a: "This is an early product concept. The homepage is a starting implementation; registration, the business dashboard and live integrations still need to be built and tested.",
  },
];

export function FAQ() {
  return (
    <section className="section-pad">
      <div className="container grid gap-10 md:grid-cols-[.7fr_1.3fr]">
        <div>
          <div className="eyebrow">
            <CircleHelp size={13} /> GOOD QUESTIONS
          </div>
          <h2 className="mt-5 text-[32px] font-extrabold leading-[1.12] tracking-[-0.05em] sm:text-[40px]">
            A few things you might want to know.
          </h2>
          <p className="mt-4 max-w-[320px] text-sm leading-7 text-[#777990]">
            Building a business takes enough work. Getting started with your
            tools should feel clear.
          </p>
        </div>
        <div className="divide-y divide-[#e9e9f2] border-y border-[#e9e9f2]">
          {" "}
          {faqs.map((faq, i) => (
            <details key={faq.q} open={i === 0} className="group">
              <summary className="flex w-full cursor-pointer list-none items-center justify-between gap-4 py-5 text-left">
                <span className="text-sm font-bold text-[#292a43]">
                  {faq.q}
                </span>
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#f1f0f8] text-[#62637c] group-open:bg-brand-600 group-open:text-white">
                  <span className="group-open:hidden">
                    <Plus size={13} />
                  </span>
                  <span className="hidden group-open:block">
                    <X size={13} />
                  </span>
                </span>
              </summary>
              <p className="max-w-[620px] pb-5 pr-8 text-[13px] leading-6 text-[#777990]">
                {faq.a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
