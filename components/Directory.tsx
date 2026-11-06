// Props for icon components, allowing optional size customization
type IconProps = { size?: number };

const ArrowRight = ({ size = 15 }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M5 12h14" />
    <path d="m12 5 7 7-7 7" />
  </svg>
);
const CalendarDays = ({ size = 21 }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <rect x="3" y="4" width="18" height="17" rx="2" />
    <path d="M16 2v4M8 2v4M3 10h18M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01" />
  </svg>
);
const MessageCircle = ({ size = 21 }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M21 11.5a8.4 8.4 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.4 8.4 0 0 1-3.8-.9L3 21l1.9-5.7a8.4 8.4 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.4 8.4 0 0 1 3.8-.9h.5a8.5 8.5 0 0 1 8 8v.5Z" />
  </svg>
);
const Palette = ({ size = 21 }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M12 3a9 9 0 1 0 0 18h1.2a2 2 0 0 0 1.5-3.3 1.7 1.7 0 0 1 1.3-2.8H18a3 3 0 0 0 3-3c0-5-4-8.9-9-8.9Z" />
    <path d="M7.5 10h.01M10 7.5h.01M14 7.5h.01M16.5 10h.01" />
  </svg>
);
const Search = ({ size = 13 }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <circle cx="11" cy="11" r="7" />
    <path d="m20 20-4-4" />
  </svg>
);
const Store = ({ size = 21 }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M3 9 4.5 3h15L21 9" />
    <path d="M4 9v11h16V9M3 9a3 3 0 0 0 6 0 3 3 0 0 0 6 0 3 3 0 0 0 6 0M9 20v-6h6v6" />
  </svg>
);

const categories = [
  {
    id: 1,
    icon: Palette,
    title: "Creative professionals",
    text: "Designers, photographers, studios",
    tag: "Portfolio + enquiries",
  },
  {
    id: 2,
    icon: MessageCircle,
    title: "Consultants & coaches",
    text: "Experts, trainers, advisors",
    tag: "Bookings + follow-up",
  },
  {
    id: 3,
    icon: CalendarDays,
    title: "Appointment businesses",
    text: "Beauty, wellness, local services",
    tag: "Scheduling + clients",
  },
  {
    id: 4,
    icon: Store,
    title: "Online sellers",
    text: "Products, makers, small brands",
    tag: "Catalog + customer leads",
  },
];

type Category = {
  id: number;
  icon: React.ComponentType<IconProps>;
  title: string;
  text: string;
  tag: string;
};

function DirectoryCard({ category }: { category: Category }) {
  const Icon = category.icon;

  return (
    <article className="directory-card">
      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#f0edff] text-[#6658e8]">
        <Icon size={21} />
      </div>
      <h3 className="mt-5 text-[15px] font-bold text-[#24253e]">
        {category.title}
      </h3>
      <p className="mt-2 text-xs leading-5 text-[#777990]">{category.text}</p>
      <div className="mt-5 border-t border-[#eeeef5] pt-4">
        <span className="rounded-full bg-[#f7f6ff] px-2.5 py-1.5 text-[10px] font-bold text-[#6555d9]">
          {category.tag}
        </span>
      </div>
    </article>
  );
}

export function Directory() {
  return (
    <section id="solutions" className="section-pad bg-[#f8f8fc]">
      <div className="container">
        <div className="grid items-end gap-5 md:grid-cols-[1fr_.65fr]">
          <div>
            <div className="eyebrow">
              <Search size={13} /> YOUR WORK, DISCOVERABLE
            </div>
            <h2 className="mt-5 max-w-[590px] text-[32px] font-extrabold leading-[1.12] tracking-[-0.05em] sm:text-[43px]">
              A home for your business. A clearer path for your customers.
            </h2>
          </div>
          <p className="max-w-[410px] text-sm leading-7 text-[#6e7087] md:justify-self-end">
            Create a shareable business page and present your services clearly.
            The services directory can help customers explore providers by
            category as the community grows.
          </p>
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => (
            <DirectoryCard key={category.title} category={category} />
          ))}
        </div>
        <div className="mt-7 flex flex-col items-center justify-between gap-4 rounded-2xl border border-[#e9e7f8] bg-white p-5 sm:flex-row sm:px-7">
          <div>
            <p className="text-sm font-bold text-[#24253e]">
              Make your business easier to find and understand.
            </p>
            <p className="mt-1 text-xs text-[#777990]">
              Create a shareable profile for your services and contact details.
            </p>
          </div>
          <a href="#get-started" className="secondary-button !py-2.5">
            Create your business page <ArrowRight size={15} />
          </a>
        </div>
      </div>
    </section>
  );
}
