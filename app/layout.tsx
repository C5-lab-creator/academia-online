import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./components/header";
import WhatsappButton from "./components/WhatsappButton";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.academia-menteabierta.com"),
  title: {
    default: "Mente Abierta",
    template: "%s | Mente Abierta",
  },
  description:
    "Academia especialziada en química y selectividad, terapia ocupacional en rehabilitación física, demencias y trastorno espectro autista.",
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-slate-50">
        
        <Header />

        <main className="flex-1">
          {children}
        </main>
       <WhatsappButton />
      </body>
    </html>
  );
}