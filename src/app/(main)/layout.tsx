
import { Geist, Geist_Mono } from "next/font/google";
import "@/app/globals.css";
import Header from "@/app/Components/Header/Header"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const navLinks = [
  { name: "Home", href: "/Home" },
  { name: "About", href: "/About" }
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body >
        <Header />
        <div className="pageContent">
          {children}
        </div>
      </body>
    </html>
  );
}


