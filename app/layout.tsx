import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import LandingPage from "@/components/LandingPage";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { ThemeContextProvider } from "@/store/";



const geistSans = localFont({
  src: "../public/fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "../public/fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "DH",
  description: "DH's Website",
  icons: {
    icon: "/DH-meta-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeContextProvider>
          <LandingPage>
            {children}
          </LandingPage>
        </ThemeContextProvider>
        <SpeedInsights />
      </body>
    </html>
  );
}
