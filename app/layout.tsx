import "./globals.css";
import type { ReactNode } from "react";

export const metadata = {
  title: "Marxleads — Your business, moving forward",
  description:
    "Build your online presence, manage customer enquiries, showcase your services and grow your business from one simple workspace.",
  openGraph: {
    title: "Marxleads — Your business, moving forward",
    description:
      "Your online business presence, customer leads and services in one workspace.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
