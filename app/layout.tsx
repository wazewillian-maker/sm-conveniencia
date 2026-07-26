import type { Metadata } from "next";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://sm-conveniencia.wazewillian.chatgpt.site";
const seoTitle = "SM Conveniência em Bombas, Bombinhas | Bebidas, Churrasco e Tabacaria";
const seoDescription = "Conheça a SM Conveniência em Bombas, Bombinhas. Bebidas, snacks, carvão, gelo, itens para churrasco, narguilés, essências e acessórios. Consulte disponibilidade pelo WhatsApp.";
const socialTitle = "SM Conveniência | Bombas, Bombinhas";
const socialDescription = "Bebidas, snacks, itens para churrasco, tabacaria e muito mais em Bombas, Bombinhas. Consulte produtos e disponibilidade pelo WhatsApp.";
const socialImage = "/images/redes-sociais/sm-conveniencia-compartilhamento.png";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: seoTitle,
  description: seoDescription,
  keywords: ["conveniência em Bombas", "conveniência em Bombinhas", "bebidas em Bombas", "carvão e gelo em Bombinhas", "tabacaria em Bombas", "narguilé em Bombinhas", "loja aberta até meia-noite"],
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  manifest: "/manifest.webmanifest",
  openGraph: {
    title: socialTitle,
    description: socialDescription,
    type: "website",
    url: "/",
    siteName: "SM Conveniência",
    locale: "pt_BR",
    images: [{ url: socialImage, width: 1200, height: 630, alt: "Logo da SM Conveniência em Bombas, Bombinhas" }],
  },
  twitter: {
    card: "summary_large_image",
    title: socialTitle,
    description: socialDescription,
    images: [socialImage],
  },
};

const localBusiness = {
  "@context": "https://schema.org",
  "@type": "ConvenienceStore",
  name: "SM Conveniência",
  url: siteUrl,
  image: `${siteUrl}${socialImage}`,
  telephone: "+55 47 9293-0951",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Av. Falcão, nº 170, Sala 03",
    addressLocality: "Bombinhas",
    addressRegion: "SC",
    addressCountry: "BR",
  },
  openingHoursSpecification: [
    { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "14:00", closes: "00:00" },
    { "@type": "OpeningHoursSpecification", dayOfWeek: ["Saturday", "Sunday"], opens: "11:00", closes: "00:00" },
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="pt-BR"><body>{children}<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness) }}/></body></html>;
}
