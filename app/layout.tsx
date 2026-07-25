import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SM Conveniência | Tudo para o seu momento",
  description: "Bebidas, gelo, snacks, doces e muito mais para deixar qualquer momento completo.",
  icons: { icon: "/favicon.svg" },
  openGraph: {
    title: "SM Conveniência",
    description: "Tudo o que você precisa, quando você precisa.",
    images: ["/og.png"],
  },
  twitter: { card: "summary_large_image", images: ["/og.png"] },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="pt-BR"><body>{children}</body></html>;
}
