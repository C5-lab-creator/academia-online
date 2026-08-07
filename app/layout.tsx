import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./components/header";
import WhatsappButton from "./components/WhatsappButton";
import Schema from "./components/schema";

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
    default: "Academia Mente Abierta | Academia y Terapia Ocupacional",
    template: "%s | Academia Mente Abierta",
  },

  description:
    "Academia Selectividad, clases particulares de Química y Matemáticas y terapia educativa. Apoyo personalizado para estudiantes, mejora tus resultados y alcanza tus objetivos.",

  keywords: [
    "academia online",
    "academia química",
    "academia matemáticas",
    "preparación selectividad",
    "integracion sensorial",
    "selectividad alimentaria",
    "PAU",
    "terapia ocupacional",
    "estimulación cognitiva",
    "demencias",
    "autismo",
    "rehabilitación física",
    "Academia Mente Abierta",
  ],

  authors: [
    {
      name: "Academia Mente Abierta",
    },
  ],

  creator: "Academia Mente Abierta",

  publisher: "Academia Mente Abierta",

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },

  openGraph: {
    title: "Academia Mente Abierta",
    description:
      "Academia online especializada en química, matemáticas y preparación para Selectividad. Terapia ocupacional para rehabilitación física, estimulación cognitiva, demencias y trastorno del espectro autista.",
    url: "https://www.academia-menteabierta.com",
    siteName: "Academia Mente Abierta",
    locale: "es_ES",
    type: "website",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "Academia Mente Abierta",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Academia Mente Abierta",
    description:
      "Academia online especializada en química, matemáticas y selectividad. Terapia Ocupacional en rehabilitación física, demencias y trastorno del espectro autista",
    images: ["/logo.png"],
  },

  icons: {
    icon: "/icon.png",
    apple: "/apple-icon.png",
  },
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
      <body className="min-h-screen flex flex-col">
         <Schema />
        <Header />

        <main className="flex-1">
          {children}
        </main>

        <WhatsappButton />
      </body>
    </html>
  );
}