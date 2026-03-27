import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";
import { Navbar } from "@/components/Navbar";

export const metadata: Metadata = {
  title: "MyScript — Collaborative Screenwriting",
  description: "The next-generation collaborative screenwriting platform. Write, collaborate, and share your scripts with the world.",
  keywords: ["screenwriting", "screenplay", "collaborative", "script editor"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen antialiased">
        <ThemeProvider>
          <div className="min-h-screen" style={{ background: "var(--bg-primary)", color: "var(--text-primary)" }}>
            <Navbar />
            <main>{children}</main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
