import type { ReactNode } from "react";
import "@/public/fonts/icomoon/style.css";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function RootLayout({ children }: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <body>

        <Header />

        <main>
          {children}
        </main>

        <Footer />

      </body>
    </html>
  );
}
