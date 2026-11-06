import { Logo } from "@/components/Logo";

export function Footer() {
  return (
    <footer className="border-t border-[#eeeef5] bg-white py-8">
      <div className="container flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-center">
        <div>
          <Logo />
          <p className="mt-3 text-[11px] text-[#85869b]">
            Your business. Your brand. One workspace.
          </p>
        </div>
        <div className="flex flex-wrap gap-x-5 gap-y-3 text-[11px] font-semibold text-[#777990]">
          <a href="#features" className="hover:text-brand-600">
            Features
          </a>
          <a href="#solutions" className="hover:text-brand-600">
            Solutions
          </a>
          <a href="#pricing" className="hover:text-brand-600">
            Pricing
          </a>
          <a href="mailto:hello@marxleads.com" className="hover:text-brand-600">
            Contact
          </a>
          <a href="#get-started" className="hover:text-brand-600">
            Privacy & terms
          </a>
        </div>
        <p className="text-[10px] text-[#9a9bad]">
          © {new Date().getFullYear()} Marxleads. Concept preview.
        </p>
      </div>
    </footer>
  );
}
