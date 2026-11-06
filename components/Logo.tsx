export function Logo() {
  return (
    <a
      href="#home"
      className="flex items-center gap-2.5"
      aria-label="Marxleads home"
    >
      <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-600 text-white shadow-md shadow-violet-200">
        <svg
          aria-hidden="true"
          width="19"
          height="19"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M13 2 4 14h7l-1 8 10-13h-7l1-7Z" />
        </svg>
      </span>
      <span className="text-[19px] font-extrabold tracking-[-0.055em] text-[#17182b]">
        marx<span className="text-brand-600">leads</span>
      </span>
    </a>
  );
}
