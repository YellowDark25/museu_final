import type { Metadata } from "next";
// AIDEV: Polyfill global para Promise.withResolvers (necessário para pdfjs-dist em Node < 22)
import "@/lib/polyfills/promiseWithResolvers";
import "./globals.css";
import { AccessibilityProvider, SkipLinks, AccessibilityControls } from "@/components/accessibility/AccessibilityProvider";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Museu Casa Borges | Preservando a Memória de Mato Grosso",
  description: "Museu Casa Borges - Preservando a memória e cultura de Mato Grosso através do legado de Herculano Borges e da rica história regional.",
  keywords: "museu, casa borges, herculano borges, mato grosso, cultura, história, acervo, exposições",
  authors: [{ name: "Museu Casa Borges" }],
  openGraph: {
    title: "Museu Casa Borges",
    description: "Preservando a memória e cultura de Mato Grosso",
    type: "website",
    locale: "pt_BR",
  },
  robots: {
    index: true,
    follow: true,
  },
  viewport: "width=device-width, initial-scale=1",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className="font-sans antialiased min-h-screen flex flex-col bg-[var(--museu-white)]">
        <AccessibilityProvider>
          <SkipLinks />
          <AccessibilityControls />
          <Header />
          <main className="flex-1" role="main" aria-label="Conteúdo principal">
            {children}
          </main>
          <Footer />
        </AccessibilityProvider>
      </body>
    </html>
  );
}
