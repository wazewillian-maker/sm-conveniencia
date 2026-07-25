import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://sm-conveniencia.wazewillian.chatgpt.site"),
  title: "SM Conveniência | Tudo para o seu momento",
  description: "Bebidas geladas, gelo, salgadinhos, doces e muito mais para qualquer momento.",
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
