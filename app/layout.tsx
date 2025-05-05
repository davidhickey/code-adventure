import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import LandingPage from "@/components/LandingPage";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { ThemeContextProvider } from "@/store/";
import Providers from "@/components/Providers";

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
  icons: [
    {
      url: "../public/DH-meta-icon.png",
      sizes: '100x100',
      type: 'image/png',
    },
  ]
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
        <Providers>
          <ThemeContextProvider>
            <LandingPage>
              {children}
            </LandingPage>
          </ThemeContextProvider>
        </Providers>
        <SpeedInsights />
      </body>
    </html>
  );
}
