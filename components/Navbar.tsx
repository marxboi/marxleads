"use client";

import { Logo } from "@/components/Logo";

function ArrowRightIcon({ size = 15 }: { size?: number }) {
  return (
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
}

function MenuIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <path d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <path d="m18 6-12 12M6 6l12 12" />
    </svg>
  );
}

const links = [
  ["Features", "#features"],
  ["Solutions", "#solutions"],
  ["How it works", "#how-it-works"],
  ["Pricing", "#pricing"],
];

import React, { useState } from "react";

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleMenuToggle = () => setMenuOpen((open) => !open);
  const handleMenuClose = () => setMenuOpen(false);

  return (
    <header className="sticky top-0 z-50 border-b border-[#eeeef5] bg-white/95 backdrop-blur-xl">
      <div className="container flex h-[76px] items-center justify-between">
        <Logo />
        <nav
          className="hidden items-center gap-4 md:flex lg:gap-8"
          aria-label="Main navigation"
        >
          {links.map(([label, href]) => (
            <a className="nav-link" href={href} key={label}>
              {label}
            </a>
          ))}
        </nav>
        <div className="hidden items-center gap-3 md:flex lg:gap-5">
          <a className="nav-link" href="/login">
            Log in
          </a>
          <a
            className="primary-button !rounded-[10px] !px-4 !py-2.5"
            href="/signup"
          >
            Get started <ArrowRightIcon />
          </a>
        </div>
        <div className="md:hidden">
          <button
            className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl border border-[#e9e9f2] text-[#272943] transition hover:bg-[#f7f6ff] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            aria-label={
              menuOpen ? "Close navigation menu" : "Open navigation menu"
            }
            onClick={handleMenuToggle}
            type="button"
          >
            {menuOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>
      {menuOpen && (
        <div
          id="mobile-navigation"
          className="mobile-navigation border-t border-[#eeeef5] bg-white px-4 pb-5 pt-3 shadow-lg shadow-[#17182b]/5 md:hidden"
        >
          <nav
            className="container flex flex-col gap-1"
            aria-label="Mobile navigation"
          >
            {links.map(([label, href]) => (
              <a
                key={label}
                href={href}
                onClick={handleMenuClose}
                className="rounded-lg px-3 py-3 text-sm font-semibold text-[#55566f] hover:bg-[#f7f6ff]"
              >
                {label}
              </a>
            ))}
            <a
              href="/signup"
              onClick={handleMenuClose}
              className="primary-button mt-2"
            >
              Get started <ArrowRightIcon size={16} />
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
