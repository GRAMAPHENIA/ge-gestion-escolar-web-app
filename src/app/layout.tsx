import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";

import { SpeedInsights } from "@vercel/speed-insights/next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Gestión Escolar",
  description:
    "Plataforma de gestión escolar que facilita la administración de instituciones educativas. Accede a un completo dashboard con herramientas como agenda, control de asistencia, gestión de calificaciones y más. Simplifica la organización y el seguimiento académico de alumnos y docentes.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {" "}
        <Toaster />
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}
